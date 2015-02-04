Client
======
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coverage Status][coveralls-image]][coveralls-url] [![Dependencies][dependencies-image]][dependencies-url]

> HTTP client for querying [OpenTSDB](http://opentsdb.net).


### Install

For use in Node.js,

``` bash
$ npm install opentsdb-client
```

For use in the browser, use [browserify](https://github.com/substack/node-browserify).


### Usage

To use the module,

``` javascript
var createClient = require( 'opentsdb-client' );
```

To create a new client,

``` javascript
var client = createClient();
```

A client is configurable and has the following methods...


<a name="client-host"></a>
#### client.host( [host] )

This method is a setter/getter. If no `host` is provided, the method returns the configured `host`. By default, the client `host` is `127.0.0.1`. To point to a remote `host`,

``` javascript
client.host( '192.168.92.11' );
```


<a name="client-port"></a>
#### client.port( [port] )

This method is a setter/getter. If no `port` is provided, the method returns the configured `port`. By default, the client port is `4242`. To set a different `port`,

``` javascript
client.port( 8080 );
```


<a name="client-ms"></a>
#### client.ms( [bool] )

This method is a setter/getter. If no boolean flag is provided, the method returns the flag indicating whether time should be output at millisecond resolution. By default, millisecond resolution is on, so as to ensure timestamps are 13 digit UNIX timestamps. To turn off millisecond resolution,

``` javascript
client.ms( false );
```


<a name="client-arrays"></a>
#### client.arrays( [bool] )

This method is a setter/getter. If no boolean flag is provided, the method returns the flag indicating whether data is output as an `array`. By default, `array` output is on. To turn off `array` output,

``` javascript
client.arrays( false );
```


<a name="client-tsuids"></a>
#### client.tsuids( [bool] )

This method is a setter/getter. If no boolean flag is provided, the method returns the flag indicating whether TSUIDs accompany data output. By default, TSUIDs are not returned. To turn on TSUID output,

``` javascript
client.tsuids( true );
```


<a name="client-annotations"></a>
#### client.annotations( [option] )

This method is a setter/getter. If no option is provided, the method returns the option indicating whether annotations should accompany data output. OpenTSDB supports two types of annotations: local and global. By default, annotations are not returned. 

Three options are possible: `none`, `local`, and `all`. `none` indicates to return no annotations. `local` indicates to return only local annotations; i.e., annotations specific to a timeseries. `all` indicates to return both local and global annotations. OpenTSDB does not support returning only global annotations.

To set annotation output,

``` javascript
client.annotations( 'all' );
```


<a name="client-start"></a>
#### client.start( [time] )

This method is a setter/getter. If no `time` is provided, the method returns the configured query start `time`. Before making an OpenTSDB query, a start time is __required__. To do so,

``` javascript
// UNIX timestamp:
client.start( Date.now()-1000 );

// Absolute time:
client.start( '2014/10/18 09:45' );

// Relative time:
client.start( '72m-ago' );
```


<a name="client-end"></a>
#### client.end( [time | null] )

This method is a setter/getter. If no `time` is provided, the method returns the configured query end `time`. An end time is optional when making an OpenTSDB query. If no end time is set upon making a query, OpenTSDB defaults to the time at which the request is made.

``` javascript
// UNIX timestamp:
client.end( Date.now() );

// Absolute time:
client.end( '2014/10/18 09:47' );

// Relative time:
client.end( '70m-ago' );
```

If at time `t1` you specify an end time and later decide at `t2` to make a request which does not specify an end time, you can `null` the configuration value.

``` javascript
client.end( null );
```


<a name="client-queries"></a>
#### client.queries( [query1, query2, query3,...] )

This method is a setter/getter. If no queries are provided, the method returns any previously set queries. Queries must be set before making an OpenTSDB data request.

``` javascript
client.queries( mQuery, mQuery, tQuery );
```

For more information on how to create queries, see [opentsdb-mquery](https://github.com/opentsdb-js/mquery) and [opentsdb-tquery](https://github.com/opentsdb-js/tquery).


<a name="client-url"></a>
#### client.url()

Generate an OpenTSDB request URL based on a client's configuration. Both queries and a start time are __required__ before running this method.

``` javascript
var url = client.url();
```

An example returned `url`:

```
http://127.0.0.1:4242/api/query?ms=true&arrays=true&show_tsuids=true&no_annotations=true&global_annotations=false&start=72000ms-ago&end=60s-ago&m=avg:5s-avg:cpu.utilization{nid=*}&m=avg:5s-avg:mem.utilization{nid=*}
```


<a name="client-get"></a>
#### client.get( clbk )

Make a data request from OpenTSDB. Results are passed along to the provided callback.

``` javascript
client.get( function onData( error, data ) {
	if ( error ) {
		console.error( JSON.stringify( error ) );
		return;
	}
	console.log( JSON.stringify( data ) );
});
```


<a name="client-aggregators"></a>
#### client.aggregators( clbk )

Requests the current list of supported aggregation operators from OpenTSDB. Results are passed along to the provided callback.

``` javascript
client.aggregators( function onResponse( error, aggregators ) {
	if ( error ) {
		console.error( JSON.stringify( error ) );
		return;
	}
	console.log( JSON.stringify( aggregators ) );
});
```


<a name="client-metrics"></a>
#### client.metrics( clbk )

Requests the current list of stored metrics from OpenTSDB. Results are passed along to the provided callback.

``` javascript
client.metrics( function onResponse( error, metrics ) {
	if ( error ) {
		console.error( JSON.stringify( error ) );
		return;
	}
	console.log( JSON.stringify( metrics ) );
});
```


<a name="client-config"></a>
#### client.config( clbk )

Requests the current OpenTSDB [configuration](http://opentsdb.net/docs/build/html/api_http/config.html). Results are passed along to the provided callback.

``` javascript
client.config( function onResponse( error, config ) {
	if ( error ) {
		console.error( JSON.stringify( error ) );
		return;
	}
	console.log( JSON.stringify( config ) );
});
```


<a name="client-version"></a>
#### client.version( clbk )

Requests the current OpenTSDB [version](http://opentsdb.net/docs/build/html/api_http/version.html). Results are passed along to the provided callback.

``` javascript
client.version( function onResponse( error, version ) {
	if ( error ) {
		console.error( JSON.stringify( error ) );
		return;
	}
	console.log( JSON.stringify( version ) );
});
```


<a name="client-dropcaches"></a>
#### client.dropcaches( clbk )

Instructs an OpenTSDB to purge its in-memory [caches](http://opentsdb.net/docs/build/html/api_http/dropcaches.html). The response is passed along to the provided callback.

``` javascript
client.dropcaches( function onResponse( error, body ) {
	if ( error ) {
		console.error( JSON.stringify( error ) );
		return;
	}
	console.log( JSON.stringify( body ) );
});
```


## Examples

``` javascript
var client = require( 'opentsdb-client' )(),
	mQuery = require( 'opentsdb-mquery' )(),
	end = Date.now(),
	start = end - 1000;

mQuery
	.aggregator( 'sum' )
	.downsample( '5m-avg' )
	.rate( false )
	.metric( 'mem.utilization' )
	.tags( 'nid', '1234,5678' )
	.tags( 'name', 'beep,boop' );

client
	.host( '192.168.92.111' )
	.port( 8080 )
	.ms( true )
	.arrays( true )
	.tsuids( true )
	.annotations( 'all' )
	.start( start )
	.end( end )
	.queries( mQuery )
	.get( function onData( error, data ) {
		if ( error ) {
			console.error( JSON.stringify( error ) );
			return;
		}
		console.log( JSON.stringify( data ) );
	});
```

To run the example code from the top-level application directory,

``` bash
$ node ./examples/index.js
```

NOTE: before running the example, tailor the client configuration to your OpenTSDB endpoint; e.g., `metric`, `tags`, `host`, and `port`.


## Tests

### Unit

Unit tests use the [Mocha](http://visionmedia.github.io/mocha) test framework with [Chai](http://chaijs.com) assertions. To run the tests, execute the following command in the top-level application directory:

``` bash
$ make test
```

All new feature development should have corresponding unit tests to validate correct functionality.


### Test Coverage

This repository uses [Istanbul](https://github.com/gotwarlost/istanbul) as its code coverage tool. To generate a test coverage report, execute the following command in the top-level application directory:

``` bash
$ make test-cov
```

Istanbul creates a `./reports/coverage` directory. To access an HTML version of the report,

``` bash
$ make view-cov
```

---
## License

[MIT license](http://opensource.org/licenses/MIT). 


## Copyright

Copyright &copy; 2014. Athan Reines.


[npm-image]: http://img.shields.io/npm/v/opentsdb-client.svg
[npm-url]: https://npmjs.org/package/opentsdb-client

[travis-image]: http://img.shields.io/travis/opentsdb-js/client/master.svg
[travis-url]: https://travis-ci.org/opentsdb-js/client

[coveralls-image]: https://img.shields.io/coveralls/opentsdb-js/client/master.svg
[coveralls-url]: https://coveralls.io/r/opentsdb-js/client?branch=master

[dependencies-image]: http://img.shields.io/david/opentsdb-js/client.svg
[dependencies-url]: https://david-dm.org/opentsdb-js/client

[dev-dependencies-image]: http://img.shields.io/david/dev/opentsdb-js/client.svg
[dev-dependencies-url]: https://david-dm.org/dev/opentsdb-js/client

[github-issues-image]: http://img.shields.io/github/issues/opentsdb-js/client.svg
[github-issues-url]: https://github.com/opentsdb-js/client/issues
