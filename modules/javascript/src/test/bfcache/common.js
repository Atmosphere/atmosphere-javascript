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

const { chromium } = require('playwright');

const BASE_URL = process.env.BASE_URL || 'http://127.0.0.1:8080';
const ATMOSPHERE_PATH = process.env.ATMOSPHERE_PATH || '/atmosphere/chat';
const CLIENT_JS = process.env.CLIENT_JS || '/atmosphere.js';
const PEER_JS = process.env.PEER_JS || '/atmosphere.js';
const TRANSPORTS = (process.env.TRANSPORTS || 'websocket,sse,long-polling,streaming').split(',');

function launch(bfcache) {
    const options = { headless: true };
    // chrome-headless-shell never restores a page from the back/forward cache: use the full Chromium
    if (process.env.CHROME) {
        options.executablePath = process.env.CHROME;
    } else {
        options.channel = 'chromium';
    }
    // Playwright disables the back/forward cache by default
    if (bfcache) {
        options.ignoreDefaultArgs = ['--disable-back-forward-cache'];
    }
    return chromium.launch(options);
}

async function waitFor(page, fn, arg, ms) {
    try {
        await page.waitForFunction(fn, arg, { timeout: ms });
        return true;
    } catch (e) {
        return false;
    }
}

async function openClient(browser, transport, js, extra) {
    const page = await (await browser.newContext()).newPage();
    const query = new URLSearchParams(Object.assign({ transport, path: ATMOSPHERE_PATH, js }, extra));
    await page.goto(BASE_URL + '/client.html?' + query);
    if (!await waitFor(page, () => window.__opens >= 1, null, 10000)) {
        throw new Error(transport + ': ' + js + ' never fired onOpen');
    }
    return page;
}

function received(page, text, ms) {
    return waitFor(page, (t) => window.__msgs.some((m) => m.indexOf(t) >= 0), text, ms);
}

function count(page, text) {
    return page.evaluate((t) => window.__msgs.filter((m) => m.indexOf(t) >= 0).length, text);
}

function push(page, text) {
    return page.evaluate((t) => window.__socket.push(JSON.stringify({ author: 'bfcache-test', message: t })), text);
}

// Pushes from one page until another receives it: a reopened connection may not be registered on the
// server yet, and the SSE transport only fires onOpen with the first message it receives
async function deliver(from, to, text) {
    for (let i = 0; i < 10; i++) {
        await push(from, text);
        if (await received(to, text, 1000)) {
            return true;
        }
    }
    return false;
}

// Navigates away and back, returning the persisted flag of the pageshow event that followed
async function awayAndBack(page) {
    await page.goto(BASE_URL + '/other.html');
    await page.waitForTimeout(500);
    // A page restored from the back/forward cache does not fire load again
    await page.goBack({ waitUntil: 'commit' });
    await waitFor(page, () => typeof window.__pageshows === 'number' && window.__pageshows >= 1, null, 5000);
    return page.evaluate(() => window.__persisted);
}

function token(name) {
    return name + '-' + Date.now() + '-' + Math.random().toString(36).slice(2, 8);
}

function report(results) {
    let failed = 0;
    for (const r of results) {
        const bad = Object.keys(r.checks).filter((k) => r.checks[k] !== true);
        failed += bad.length;
        console.log((bad.length ? 'FAIL ' : 'PASS ') + r.name + (bad.length ? '  failed: ' + bad.join(', ') : ''));
        if (bad.length || process.env.VERBOSE) {
            console.log('     ' + JSON.stringify(r.checks));
            console.log('     log: ' + JSON.stringify(r.log));
        }
    }
    process.exitCode = failed ? 1 : 0;
}

module.exports = {
    BASE_URL, CLIENT_JS, PEER_JS, TRANSPORTS,
    launch, waitFor, openClient, received, count, push, deliver, awayAndBack, token, report
};
