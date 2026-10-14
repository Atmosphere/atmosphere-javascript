# Back/forward cache tests

Browser tests for how `atmosphere.js` behaves when a page enters and leaves the back/forward cache
(`pagehide` / `pageshow`). They drive Chromium through [Playwright](https://playwright.dev) against a
running Atmosphere server and are not part of the Maven build.

| Script | Checks |
|--------|--------|
| `bfcache.js` | A page restored from the back/forward cache receives a broadcast from a second client and its own push reaches that client, on every transport. A `lateClose=true` WebSocket case delivers the old socket's close event after `pageshow`, the order the browser uses when the page is frozen before the close completes. With the back/forward cache disabled, going back loads a fresh page that connects. |
| `offline.js` | After `offline`, a `pagehide`/`pageshow` with `persisted` does not reopen the connection; the `online` event reopens it once and a broadcast arrives exactly once. The browser cannot navigate while offline, so these events are dispatched on the page. |

`bfcache.js` first checks that a page without `atmosphere.js` comes back with `pageshow.persisted === true`
and stops if it does not: `chrome-headless-shell` never restores a page from the back/forward cache.

## Server

The pages and the client must be served from the same origin as an Atmosphere endpoint that broadcasts
what it receives. `samples/spring-boot-chat` in
[Atmosphere/atmosphere](https://github.com/Atmosphere/atmosphere) does this at `/atmosphere/chat` on every
transport. Build it as its README describes, then start it from the root of this repository:

```shell
java -jar atmosphere-spring-boot-chat-<version>.jar \
    --server.port=8080 \
    --atmosphere.web-transport.enabled=false \
    --spring.web.resources.static-locations=file:modules/javascript/src/test/bfcache/webapp/,file:modules/javascript/src/main/webapp/javascript/
```

`/atmosphere.js` is then the client under test from `src/main/webapp/javascript`.

## Run

```shell
cd modules/javascript/src/test/bfcache
npm install
npx playwright install chromium
npm test
```

`npx playwright install` removes the browsers of other Playwright versions from the shared browser cache
when it does not know about them. To use a Chromium that is already installed instead, set `CHROME` to its
executable (a full Chrome or Chrome for Testing, not `chrome-headless-shell`).

| Variable | Default | |
|----------|---------|-|
| `BASE_URL` | `http://127.0.0.1:8080` | Server serving the pages, the client and the endpoint |
| `ATMOSPHERE_PATH` | `/atmosphere/chat` | Atmosphere endpoint |
| `CLIENT_JS` | `/atmosphere.js` | Client loaded by the page that goes back and forth |
| `PEER_JS` | `/atmosphere.js` | Client loaded by the second page |
| `TRANSPORTS` | `websocket,sse,long-polling,streaming` | Comma-separated transports |
| `CHROME` | | Chromium executable instead of Playwright's `chromium` channel |
| `VERBOSE` | | Print the checks and the page log of passing cases too |

Each failing case prints its checks and the page log, and the script exits with status 1.

## Comparing with an earlier release

Serve an earlier client next to the current one and point `CLIENT_JS` at it. 4.0.2 fails the checks after
the restore on every transport:

```shell
mkdir -p /tmp/atmosphere-baseline
git show javascript-project-4.0.2:modules/javascript/src/main/webapp/javascript/atmosphere.js > /tmp/atmosphere-baseline/atmosphere-4.0.2.js
# add file:/tmp/atmosphere-baseline/ to --spring.web.resources.static-locations, then
CLIENT_JS=/atmosphere-4.0.2.js node bfcache.js
```
