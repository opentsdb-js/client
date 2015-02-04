'use strict';

// NOTE: before running this example, tailor the client configuration to your OpenTSDB endpoint; e.g., `metric`, `tags`, `host`, and `port`.

var client = require( './../lib' )(),
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
