## Welcome to Atmosphere: The Asynchronous WebSocket/Comet Framework
The Atmosphere Framework contains client and server side components for building Asynchronous Web Applications. The majority of [popular frameworks](https://github.com/Atmosphere/atmosphere/wiki/Atmosphere-PlugIns-and-Extensions) are either supporting Atmosphere or supported natively by the framework. The Atmosphere Framework supports all major [Browsers and Servers](https://github.com/Atmosphere/atmosphere/wiki/Supported-WebServers-and-Browsers)

Follow us on [Twitter](http://www.twitter.com/atmo_framework) or get the latest news [here](http://async-io.org)

Atmosphere transparently supports WebSockets, Server Side Events (SSE), Long-Polling, HTTP Streaming (Forever frame) and JSONP.

* [Node.js client](https://github.com/flowersinthesand/atmosphere.js-node)
* [Browser client](https://raw.github.com/Atmosphere/atmosphere-javascript/master/modules/javascript/src/main/webapp/javascript/atmosphere.js)
* [Browser client as a jQuery plugin](https://raw.github.com/Atmosphere/atmosphere-javascript/master/modules/jquery/src/main/webapp/jquery/jquery.atmosphere.js)

## Install
You can get atmosphere.js and jquery.atmosphere.js. If you use a script tag whose src attribute is set to one of the below one, browser may not load it because the content type served by raw.github.com is text/plain. About Node.js client, see [here](https://github.com/flowersinthesand/atmosphere.js-node)

* [atmosphere v2.2.1(https://raw.github.com/Atmosphere/atmosphere-javascript/javascript-project-2.2.1/modules/javascript/src/main/webapp/javascript/atmosphere.js)
* [jquery-atmosphere v2.2.1](https://raw.github.com/Atmosphere/atmosphere-javascript/javascript-project-2.2.1/modules/jquery/src/main/webapp/jquery/jquery.atmosphere.js)

Also they are available in the following ways, but there may be delays between a release and its availability. We don't manage these ways officially but they are managed by open source community so you can contribute.
* CDNJS CDN - [atmosphere](http://cdnjs.com/libraries/atmosphere/) and [jquery-atmosphere](http://cdnjs.com/libraries/jquery.atmosphere/)
* WebJars - [atmosphere](http://search.maven.org/#search%7Cga%7C1%7Cg%3A%22org.webjars%22%20AND%20a%3A%22atmosphere%22) and [jquery-atmosphere](http://search.maven.org/#search%7Cgav%7C1%7Cg%3A%22org.webjars%22%20AND%20a%3A%22jquery-atmosphere%22)

### Maven

```xml
<dependency>
    <groupId>org.atmosphere.client</groupId>
    <artifactId>{jquery|javascript}</artifactId>
    <version>2.0.9|2.1.5|2.2.1</version>
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

* 2.2.0 => Tested with Atmosphere Runtime 2.2.x , may work with lower version
* 2.1.x => Tested with Atmosphere Runtime 2.1.x , may work with lower version
* 2.0.x => Tested with Atmosphere Runtime 2.0.x and 1.0.13+

It is recommended to always use the version that match Atmosphere's runtime.

Latest version may work with lower version, but not officially tested.

[![githalytics.com alpha](https://cruel-carlota.pagodabox.com/834d88e08fda4345fef8e361d9216aa7 "githalytics.com")](http://githalytics.com/Atmosphere/atmosphere-javascript.git)
