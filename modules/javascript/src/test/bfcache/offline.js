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

// offline, then pagehide and pageshow with persisted: pageshow must not reopen while offline,
// and the online event must reopen exactly one connection. The browser cannot navigate while
// offline, so the events are dispatched on the page.
const c = require('./common');

async function offlineRestore(browser, transport) {
    const peer = await c.openClient(browser, transport, c.PEER_JS);
    const page = await c.openClient(browser, transport, c.CLIENT_JS);
    const checks = {};
    await page.evaluate(() => {
        window.dispatchEvent(new Event('offline'));
        window.dispatchEvent(new PageTransitionEvent('pagehide', { persisted: true }));
        window.dispatchEvent(new PageTransitionEvent('pageshow', { persisted: true }));
    });
    await page.waitForTimeout(2000);
    const whileOffline = c.token('offline');
    await c.push(peer, whileOffline);
    checks.notReopenedWhileOffline = !await c.received(page, whileOffline, 3000);

    await page.evaluate(() => window.dispatchEvent(new Event('online')));
    checks.receivedAfterOnline = await c.deliver(peer, page, c.token('online'));
    const once = c.token('once');
    await c.push(peer, once);
    await c.received(page, once, 5000);
    await page.waitForTimeout(2000);
    checks.receivedExactlyOnce = await c.count(page, once) === 1;
    const log = await page.evaluate(() => window.__log);
    await peer.context().close();
    await page.context().close();
    return { name: 'offline     ' + transport, checks, log };
}

(async () => {
    const results = [];
    const browser = await c.launch(false);
    try {
        for (const transport of c.TRANSPORTS) {
            results.push(await offlineRestore(browser, transport));
        }
    } finally {
        await browser.close();
    }
    c.report(results);
})().catch((e) => {
    console.error(e);
    process.exitCode = 1;
});
