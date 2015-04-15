## Welcome to Atmosphere: The Asynchronous WebSocket/Comet Framework
The Atmosphere Framework contains client and server side components for building Asynchronous Web Applications. The majority of [popular frameworks](https://github.com/Atmosphere/atmosphere/wiki/Atmosphere-PlugIns-and-Extensions) are either supporting Atmosphere or supported natively by the framework. The Atmosphere Framework supports all major [Browsers and Servers](https://github.com/Atmosphere/atmosphere/wiki/Supported-WebServers-and-Browsers)

Follow us on [Twitter](http://www.twitter.com/atmo_framework) or get the latest news [here](http://async-io.org)

Atmosphere transparently supports WebSockets, Server Sent Events (SSE), Long-Polling, HTTP Streaming (Forever frame) and JSONP.

* [Node.js client](https://github.com/Atmosphere/atmosphere.js-node)
* [Browser client](https://raw.github.com/Atmosphere/atmosphere-javascript/master/modules/javascript/src/main/webapp/javascript/atmosphere.js)
* [Browser client as a jQuery plugin](https://raw.github.com/Atmosphere/atmosphere-javascript/master/modules/jquery/src/main/webapp/jquery/jquery.atmosphere.js)

## Install
You can get atmosphere.js and jquery.atmosphere.js. If you use a script tag whose src attribute is set to one of the below one, browser may not load it because the content type served by raw.github.com is text/plain. About Node.js client, see [here](https://github.com/flowersinthesand/atmosphere.js-node)

* [atmosphere v2.2.10](https://raw.github.com/Atmosphere/atmosphere-javascript/javascript-project-2.2.10/modules/javascript/src/main/webapp/javascript/atmosphere.js)
* [jquery-atmosphere v2.2.10](https://raw.github.com/Atmosphere/atmosphere-javascript/javascript-project-2.2.10/modules/jquery/src/main/webapp/jquery/jquery.atmosphere.js)

Also they are available in the following ways, but there may be delays between a release and its availability. We don't manage these ways officially but they are managed by open source community so you can contribute.
* CDNJS CDN - [atmosphere](http://cdnjs.com/libraries/atmosphere/) and [jquery-atmosphere](http://cdnjs.com/libraries/jquery.atmosphere/)
* WebJars - [atmosphere](http://search.maven.org/#search%7Cga%7C1%7Cg%3A%22org.webjars%22%20AND%20a%3A%22atmosphere-javascript%22) and [jquery-atmosphere](http://search.maven.org/#search%7Cgav%7C1%7Cg%3A%22org.webjars%22%20AND%20a%3A%22jquery-atmosphere%22)

### Maven

```xml
<dependency>
    <groupId>org.atmosphere.client</groupId>
    <artifactId>{jquery|javascript}</artifactId>
    <version>2.2.10</version>
 </dependency>
```

### Bower

```shell
bower install atmosphere
```
```shell
bower install jquery-atmosphere
```

## Docs

Full API documentation can be read [here](https://github.com/Atmosphere/atmosphere/wiki/jQuery.atmosphere.js-atmosphere.js-API) and a lot of samples [here](https://github.com/Atmosphere/atmosphere-samples)

* 2.2.10+ => Tested with Atmosphere Runtime 2.2.7 , may have some regression with lower version
* 2.2.1+ => Tested with Atmosphere Runtime 2.2.x , may work with lower version
* 2.1.x  => Tested with Atmosphere Runtime 2.1.x , may work with lower version
* 2.0.x  => Tested with Atmosphere Runtime 2.0.x and 1.0.13+

It is recommended to always use the version that matches Atmosphere's runtime.

Latest version may work with lower version, but not officially tested.

### Changelogs

* 2.2 release: [2.2.10](http://goo.gl/ECSBiE) [2.2.9](http://goo.gl/GzQJG7) [2.2.8](http://goo.gl/NZPlEq) [2.2.7](http://goo.gl/k4aAWS) [2.2.6](http://goo.gl/cVdMDo) [2.2.5](http://goo.gl/fep4MN) [2.2.4] (http://goo.gl/zeTxji) [2.2.3] (http://goo.gl/Tm8CF7) [2.2.2] (http://goo.gl/JuuqxI) [2.2.1] (http://goo.gl/Fq6oQI) [2.2.0] (http://goo.gl/I9zBre)
* 2.1 release: [2.1.7] (http://goo.gl/zS2Xzw) [2.1.6] (http://goo.gl/bKgBMw) [2.1.5] (http://goo.gl/KTjIZt) [2.1.4] (http://goo.gl/T7lmYn) [2.1.3] (http://goo.gl/mcRKF1) [2.1.2] (http://goo.gl/wECg76) [2.1.1] (http://goo.gl/nFf7JD) [2.1.0] (http://goo.gl/KdTPpU)
* 2.0 release: [2.0.10] (http://goo.gl/TIQri5) [2.0.8] (http://goo.gl/AGT3sc) [2.0.7] (http://goo.gl/divfqp) [2.0.6] (http://goo.gl/JEb6dI) [2.0.5] (http://goo.gl/aWouaJ) [2.0.4] (http://goo.gl/oN0V72) 

[![Analytics](https://ga-beacon.appspot.com/UA-31990725-2/Atmosphere/atmosphere-javascript)]
