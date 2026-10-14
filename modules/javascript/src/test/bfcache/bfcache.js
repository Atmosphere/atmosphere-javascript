/*
 * Copyright 2011-2026 Async-IO.org
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
'use strict';

// A page restored from the back/forward cache must reconnect: it receives a peer broadcast
// and its own push reaches the peer. Without the cache, going back loads a fresh page.
const c = require('./common');

async function controlRestored(browser) {
    const page = await (await browser.newContext()).newPage();
    await page.goto(c.BASE_URL + '/plain.html');
    const persisted = await c.awayAndBack(page);
    await page.context().close();
    return persisted;
}

async function restored(browser, transport, extra) {
    const peer = await c.openClient(browser, transport, c.PEER_JS);
    const page = await c.openClient(browser, transport, c.CLIENT_JS, extra);
    const checks = {};
    checks.receivedBeforeLeaving = await c.deliver(peer, page, c.token('before'));
    checks.restoredFromBfcache = await c.awayAndBack(page) === true;
    checks.receivedAfterRestore = await c.deliver(peer, page, c.token('after'));
    checks.pushedAfterRestore = await c.deliver(page, peer, c.token('self'));
    const log = await page.evaluate(() => window.__log);
    await peer.context().close();
    await page.context().close();
    return { name: 'bfcache on  ' + transport + (extra ? ' ' + new URLSearchParams(extra) : ''), checks, log };
}

async function reloaded(browser, transport) {
    const peer = await c.openClient(browser, transport, c.PEER_JS);
    const page = await c.openClient(browser, transport, c.CLIENT_JS);
    const checks = {};
    checks.loadedFresh = await c.awayAndBack(page) === false;
    checks.reopenedOnLoad = await c.waitFor(page, () => window.__opens >= 1, null, 10000);
    checks.receivedAfterLoad = await c.deliver(peer, page, c.token('fresh'));
    const log = await page.evaluate(() => window.__log);
    await peer.context().close();
    await page.context().close();
    return { name: 'bfcache off ' + transport, checks, log };
}

(async () => {
    const results = [];
    let browser = await c.launch(true);
    try {
        if (await controlRestored(browser) !== true) {
            throw new Error('the browser did not restore a plain page from the back/forward cache: '
                + 'use the full Chromium (npx playwright install chromium, or CHROME=<path>), not chrome-headless-shell');
        }
        for (const transport of c.TRANSPORTS) {
            results.push(await restored(browser, transport));
        }
        if (c.TRANSPORTS.indexOf('websocket') >= 0) {
            // Whether the old socket's close event comes before or after pageshow depends on timing:
            // force the late order so a replaced socket closing the new one always shows up
            results.push(await restored(browser, 'websocket', { lateClose: 'true' }));
        }
    } finally {
        await browser.close();
    }

    browser = await c.launch(false);
    try {
        for (const transport of c.TRANSPORTS) {
            results.push(await reloaded(browser, transport));
        }
    } finally {
        await browser.close();
    }
    c.report(results);
})().catch((e) => {
    console.error(e);
    process.exitCode = 1;
});
