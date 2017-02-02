## Welcome to Atmosphere: The Asynchronous WebSocket/Comet Framework
The Atmosphere Framework contains client and server side components for building Asynchronous Web Applications. The majority of [popular frameworks](https://github.com/Atmosphere/atmosphere/wiki/Atmosphere-PlugIns-and-Extensions) are either supporting Atmosphere or supported natively by the framework. The Atmosphere Framework supports all major [Browsers and Servers](https://github.com/Atmosphere/atmosphere/wiki/Supported-WebServers-and-Browsers)

Follow us on [Twitter](http://www.twitter.com/atmo_framework) or get the latest news [here](http://async-io.org)

Atmosphere transparently supports WebSockets, Server Sent Events (SSE), Long-Polling, HTTP Streaming (Forever frame) and JSONP.

* [Node.js client](https://github.com/Atmosphere/atmosphere.js-node)
* [Browser client](https://raw.github.com/Atmosphere/atmosphere-javascript/master/modules/javascript/src/main/webapp/javascript/atmosphere.js)
* [Browser client as a jQuery plugin (deprecated for 2.3.x)](https://raw.github.com/Atmosphere/atmosphere-javascript/javascript-2.2.x/modules/jquery/src/main/webapp/jquery/jquery.atmosphere.js)

Note: In version 2.2.x, there are two versions of the scripts a jquery plugin version jquery.atmosphere.js and a plain javascript version atmosphere.js. As keeping both versions requires overhead and also confuses the users which to choose, in 2.3.x, only the plain javascript version will be supported. If you are currently using the 2.2.x jquery version, please consider migrating to the plain javascript version.

## Install

### manually
You can get atmosphere.js in several ways. If you use a script tag whose src attribute is set to the below one, browser may not load it because the content type served by raw.github.com is text/plain.

* [atmosphere v2.3.2](https://raw.github.com/Atmosphere/atmosphere-javascript/javascript-project-2.3.2/modules/javascript/src/main/webapp/javascript/atmosphere.js)

Also it is available from the following places, but there may be delays between a release and its availability. We don't manage these ways officially but they are managed by open source community so you can contribute.
* CDNJS CDN - [atmosphere](http://cdnjs.com/libraries/atmosphere/)
* WebJars - [atmosphere](http://search.maven.org/#search%7Cga%7C1%7Cg%3A%22org.webjars%22%20AND%20a%3A%22atmosphere-javascript%22)

### maven

```xml
<dependency>
    <groupId>org.atmosphere.client</groupId>
    <artifactId>javascript</artifactId>
    <version>2.3.2</version>
</dependency>
```

### npm

```shell
npm install atmosphere.js
```

### bower

```shell
bower install atmosphere
```

## Docs
Full API documentation can be read [here](https://github.com/Atmosphere/atmosphere/wiki/atmosphere.js-API) and a lot of samples [here](https://github.com/Atmosphere/atmosphere-samples)

* 2.3.0+ => Tested with Atmosphere Runtime 2.2.7+, 2.3.x, 2.4.x , may have some regression with lower version
* 2.2.12+ => Tested with Atmosphere Runtime 2.2.7+, 2.3.x, 2.4.x , may have some regression with lower version
* 2.2.1+ => Tested with Atmosphere Runtime 2.2.x , may work with lower version
* 2.1.x  => Tested with Atmosphere Runtime 2.1.x , may work with lower version
* 2.0.x  => Tested with Atmosphere Runtime 2.0.x and 1.0.13+

It is recommended to always use the version that matches Atmosphere's runtime.

Latest version may work with lower version, but not officially tested.

### Changelogs
* 2.3 release: [2.3.2](https://goo.gl/uqo3Pc) [2.3.1](https://goo.gl/Xs6gV6) [2.3.0](https://goo.gl/Ey4K7M)
* 2.2 release: [2.2.13](https://goo.gl/T7PFlS) [2.2.12](https://goo.gl/Ishqc8)[2.2.10] (http://goo.gl/ECSBiE) [2.2.9](http://goo.gl/GzQJG7) [2.2.8](http://goo.gl/NZPlEq) [2.2.7](http://goo.gl/k4aAWS) [2.2.6](http://goo.gl/cVdMDo) [2.2.5](http://goo.gl/fep4MN) [2.2.4] (http://goo.gl/zeTxji) [2.2.3] (http://goo.gl/Tm8CF7) [2.2.2] (http://goo.gl/JuuqxI) [2.2.1] (http://goo.gl/Fq6oQI) [2.2.0] (http://goo.gl/I9zBre)
* 2.1 release: [2.1.7] (http://goo.gl/zS2Xzw) [2.1.6] (http://goo.gl/bKgBMw) [2.1.5] (http://goo.gl/KTjIZt) [2.1.4] (http://goo.gl/T7lmYn) [2.1.3] (http://goo.gl/mcRKF1) [2.1.2] (http://goo.gl/wECg76) [2.1.1] (http://goo.gl/nFf7JD) [2.1.0] (http://goo.gl/KdTPpU)
* 2.0 release: [2.0.10] (http://goo.gl/TIQri5) [2.0.8] (http://goo.gl/AGT3sc) [2.0.7] (http://goo.gl/divfqp) [2.0.6] (http://goo.gl/JEb6dI) [2.0.5] (http://goo.gl/aWouaJ) [2.0.4] (http://goo.gl/oN0V72) 

[![Analytics](https://ga-beacon.appspot.com/UA-31990725-2/Atmosphere/atmosphere-javascript)]
