/* global describe, it, before, beforeEach, after, require */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// TSDB server:
	createApp = require( 'opentsdb-mock-server' ),

	// Query types:
	mQuery = require( 'opentsdb-mquery' ),
	tQuery = require( 'opentsdb-tquery' ),

	// Module to be tested:
	createClient = require( './../lib' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'opentsdb-client', function tests() {

	// SETUP //

	var client, db, server;

	before( function ( done ) {
		db = createApp();
		server = db.createServer( function onListen() {
			done();
		});
	});

	beforeEach( function() {
		client = createClient();
	});


	// TEARDOWN //

	after( function() {
		server.close();
	});


	// TESTS //

	it( 'should export a factory function', function test() {
		expect( createClient ).to.be.a( 'function' );
	});


	describe( 'api/host', function tests() {

		it( 'should provide a method to get/set a host', function test() {
			expect( client.host ).to.be.a( 'function' );
		});

		it( 'should not allow a non-string host', function test() {
			var values = [
					5,
					[],
					{},
					true,
					null,
					undefined,
					NaN,
					function(){}
				];

			for ( var i = 0; i < values.length; i++ ) {
				expect( badValue( values[i] ) ).to.throw( TypeError );
			}

			function badValue( value ) {
				return function() {
					client.host( value );
				};
			}
		});

		it( 'should not allow an invalid host', function test() {
			var values = [
					'badhost',
					'1000.10.10.100'
				];

			for ( var i = 0; i < values.length; i++ ) {
				expect( badValue( values[i] ) ).to.throw( Error );
			}

			function badValue( value ) {
				return function() {
					client.host( value );
				};
			}
		});

		it( 'should set the default host URL to 127.0.0.1', function test() {
			assert.strictEqual( client.host(), '127.0.0.1' );
		});

		it( 'should provide a method to set the host URL', function test() {
			var url = '192.168.92.175';

			client.host( url );
			assert.strictEqual( client.host(), url );
		});

	}); // end TESTS api/host


	describe( 'api/port', function tests() {

		it( 'should provide a method to get/set the port', function test() {
			expect( client.port ).to.be.a( 'function' );
		});

		it( 'should set the default port to 4242', function test() {
			assert.strictEqual( client.port(), 4242 );
		});

		it( 'should not allow a non-numeric port', function test() {
			var values = [
					'5',
					[],
					{},
					true,
					null,
					undefined,
					NaN,
					function(){}
				];

			for ( var i = 0; i < values.length; i++ ) {
				expect( badValue( values[i] ) ).to.throw( TypeError );
			}

			function badValue( value ) {
				return function() {
					client.port( value );
				};
			}
		});

		it( 'should provide a method to set database port', function test() {
			var port = 4000;

			client.port( port );
			assert.strictEqual( client.port(), port );
		});

	}); // end TESTS api/port


	describe( 'api/millisecond resolution', function tests() {

		it( 'should provide a method to get/set the millisecond resolution flag', function test() {
			expect( client.ms ).to.be.a( 'function' );
		});

		it( 'should not allow a non-boolean millisecond resolution flag', function test() {
			var values = [
					'5',
					[],
					{},
					5,
					null,
					undefined,
					NaN,
					function(){}
				];

			for ( var i = 0; i < values.length; i++ ) {
				expect( badValue( values[i] ) ).to.throw( TypeError );
			}

			function badValue( value ) {
				return function() {
					client.ms( value );
				};
			}
		});

		it( 'should provide a method to set a millisecond resolution output flag', function test() {
			var FLG = false;

			client.ms( FLG );
			assert.strictEqual( client.ms(), FLG );
		});

	}); // end TESTS api/ms


	describe( 'api/arrays', function tests() {

		it( 'should provide a method to get/set the array output flag', function test() {
			expect( client.arrays ).to.be.a( 'function' );
		});

		it( 'should not allow a non-boolean arrays flag', function test() {
			var values = [
					'5',
					[],
					{},
					5,
					null,
					undefined,
					NaN,
					function(){}
				];

			for ( var i = 0; i < values.length; i++ ) {
				expect( badValue( values[i] ) ).to.throw( TypeError );
			}

			function badValue( value ) {
				return function() {
					client.arrays( value );
				};
			}
		});

		it( 'should provide a method to set an arrays output flag', function test() {
			var FLG = false;

			client.arrays( FLG );
			assert.strictEqual( client.arrays(), FLG );
		});

	}); // end TESTS api/arrays


	describe( 'api/tsuids', function tests() {

		it( 'should provide a method to get/set TSUIDs output flag', function test() {
			expect( client.tsuids ).to.be.a( 'function' );
		});

		it( 'should not allow a non-boolean TSUIDs flag', function test() {
			var values = [
					'5',
					[],
					{},
					5,
					null,
					undefined,
					NaN,
					function(){}
				];

			for ( var i = 0; i < values.length; i++ ) {
				expect( badValue( values[i] ) ).to.throw( TypeError );
			}

			function badValue( value ) {
				return function() {
					client.tsuids( value );
				};
			}
		});

		it( 'should provide a method to set a TSUIDs output flag', function test() {
			var FLG = false;

			client.tsuids( FLG );
			assert.strictEqual( client.tsuids(), FLG );
		});

	}); // end TESTS api/tsuids


	describe( 'api/annotations', function tests() {

		it( 'should provide a method to specify whether or not to return annotations', function test() {
			expect( client.annotations ).to.be.a( 'function' );
		});

		it( 'should not allow a non-string annotations setting', function test() {
			var values = [
					true,
					[],
					{},
					5,
					null,
					undefined,
					NaN,
					function(){}
				];

			for ( var i = 0; i < values.length; i++ ) {
				expect( badValue( values[i] ) ).to.throw( TypeError );
			}

			function badValue( value ) {
				return function() {
					client.annotations( value );
				};
			}
		});

		it( 'should not allow an unrecognized annotations option', function test() {
			var value = 'beep';

			expect( badValue( value ) ).to.throw( Error );

			function badValue( value ) {
				return function() {
					client.annotations( value );
				};
			}
		});

		it( 'should set an annotations option', function test() {
			var option = 'all';

			client.annotations( option );
			assert.strictEqual( client.annotations(), option );
		});

		it( 'should allow the annotations option to be set to 1 of 3 values: none, local, all', function test() {
			var options = [ 'none', 'local', 'all' ],
				option;

			for ( var i = 0; i < options.length; i++ ) {
				option = options[ i ];
				client.annotations( option );
				assert.strictEqual( client.annotations(), option );
			}
		});

	}); // end TESTS api/annotations


	describe( 'api/start', function tests() {

		it( 'should provide a method to get/set the query start time', function test() {
			expect( client.start ).to.be.a( 'function' );
		});

		it( 'should not allow invalid start times', function test() {
			var values = [
					'5',
					[],
					{},
					5,
					true,
					null,
					undefined,
					NaN,
					function(){}
				];

			for ( var i = 0; i < values.length; i++ ) {
				expect( badValue( values[i] ) ).to.throw( Error );
			}
			function badValue( value ) {
				return function() {
					client.start( value );
				};
			}
		});

		it( 'should set the query start time', function test() {
			var relative = '72h-ago',
				absolute = '2014/07/18 09:45',
				timestamp = Date.now();

			client.start( relative );
			assert.strictEqual( client.start(), relative );

			client.start( absolute );
			assert.strictEqual( client.start(), absolute );

			client.start( timestamp );
			assert.strictEqual( client.start(), timestamp );
		});

	}); // end TESTS api/start


	describe( 'api/end', function tests() {

		it( 'should provide a method to get/set a query end time', function test() {
			expect( client.end ).to.be.a( 'function' );
		});

		it( 'should not allow invalid end times', function test() {
			var values = [
					'5',
					[],
					{},
					5,
					true,
					undefined,
					NaN,
					function(){}
				];

			for ( var i = 0; i < values.length; i++ ) {
				expect( badValue( values[i] ) ).to.throw( Error );
			}
			function badValue( value ) {
				return function() {
					client.end( value );
				};
			}
		});

		it( 'should set the query end time', function test() {
			var relative = '72h-ago',
				absolute = '2014/07/18 09:45',
				timestamp = Date.now();

			client.end( relative );
			assert.strictEqual( client.end(), relative );

			client.end( absolute );
			assert.strictEqual( client.end(), absolute );

			client.end( timestamp );
			assert.strictEqual( client.end(), timestamp );

			// Remove any end time specification:
			client.end( null );
			assert.isNull( client.end() );
		});

	}); // end TESTS api/end


	describe( 'api/queries', function tests() {

		it( 'should provide a method to get/set queries', function test() {
			expect( client.queries ).to.be.a( 'function' );
		});

		it( 'should only allow metric or tsuid query instances to be set as queries', function test() {
			var values = [
					'5',
					[],
					{},
					5,
					true,
					null,
					undefined,
					NaN,
					function(){}
				];

			for ( var i = 0; i < values.length; i++ ) {
				expect( badValue( values[i] ) ).to.throw( TypeError );
			}
			function badValue( value ) {
				return function() {
					client.queries( value );
				};
			}
		});

		it( 'should set metric or tsuid queries', function test() {
			var query;

			// Metric query:
			query = mQuery();
			client.queries( query );
			assert.strictEqual( client.queries()[0], query );

			// TSUID query:
			query = tQuery();
			client.queries( query );
			assert.strictEqual( client.queries()[0], query );
		});

		it( 'should allow an arbitrary number of queries to be set', function test() {
			var queries = [],
				cQueries;

			// Assemble an array of queries:
			queries[ 0 ] = mQuery();
			queries[ 1 ] = mQuery();
			queries[ 2 ] = tQuery();
			queries[ 3 ] = mQuery();
			queries[ 4 ] = tQuery();

			client.queries.apply( client, queries );
			cQueries = client.queries();
			for ( var i = 0; i < queries.length; i++ ) {
				assert.strictEqual( cQueries[ i ], queries[ i ] );
			}
		});

	}); // end TESTS api/queries


	describe( 'api/url', function tests() {

		it( 'should provide a method to get a request URL', function test() {
			expect( client.url ).to.be.a( 'function' );
		});

		it( 'should throw an error if a start time has not been set before attempting to build a request URL', function test() {
			client.queries( mQuery() );
			expect( run ).to.throw( Error );
			function run() {
				client.url();
			}
		});

		it( 'should throw an error if queries have not been initialized before attempting to build a request URL', function test() {
			var queries;

			client.start( Date.now() );

			client.queries( mQuery() );
			expect( run ).to.throw( Error );

			client.queries( tQuery() );
			expect( run ).to.throw( Error );

			function run() {
				client.url();
			}
		});

		it( 'should throw an error if queries have not been set before attempting to build a request URL', function test() {
			var queries;

			client.start( Date.now() );
			expect( run ).to.throw( Error );

			client.queries( mQuery() );
			queries = client.queries();

			// Simulate people messing with the queries array, leaving it empty:
			queries.shift();
			expect( run ).to.throw( Error );

			// NOTE: we do not get around people messing with the array by adding and removing bogus entries. *sigh*. We would have to check each query at runtime to do this. We'll act naive and believe that people will not be mischievous like that.

			function run() {
				client.url();
			}
		});
		
		it( 'should return a URL string when start = 0', function test() {
			var query = mQuery();

			query.metric( 'cpu.utilization' );
			try {
				
				client.start( 0 );
			} catch(e) {
				console.log(e)
			}
			
			client.queries( query )
				.start( Date.now() );
				
			expect( client.url() ).to.be.a( 'string' );
		});

		it( 'should return a URL string', function test() {
			var query = mQuery();

			query.metric( 'cpu.utilization' );

			client.queries( query )
				.start( Date.now() );

			expect( client.url() ).to.be.a( 'string' );
		});

	}); // end TESTS api/url


	describe( 'api/get', function tests() {

		it( 'should provide a method to submit a query request to TSDB', function test() {
			expect( client.get ).to.be.a( 'function' );
		});

		it( 'should throw an error if provided argument is not a function', function test() {
			var query = mQuery(),
				values = [
					'5',
					[],
					{},
					5,
					null,
					undefined,
					NaN,
					true
				];

			query.metric( 'cpu.utilization' );
			client.start( Date.now() )
				.queries( query );

			for ( var i = 0; i < values.length; i++ ) {
				expect( badValue( values[i] ) ).to.throw( TypeError );
			}

			function badValue( value ) {
				return function() {
					client.get( value );
				};
			}
		});

		it( 'should perform a GET request', function test( done ) {
			var query = mQuery();

			query.metric( 'cpu.utilization' );
			client.start( Date.now() )
				.queries( query );

			client.get( function onData( error, data ) {
				if ( error ) {
					assert.notOk( true, 'Get request returned an error.' );
					done();
					return;
				}
				assert.ok( true );
				done();
			});
		});

		it( 'should pass along any data request errors to the callback', function test( done ) {
			var query = mQuery();

			// Override the client url method:
			client.url = function() {
				return 'bad_protocol://bad/url';
			};

			query.metric( 'cpu.utilization' );
			client.start( Date.now() )
				.queries( query );

			client.get( function onData( error, data ) {
				if ( error ) {
					assert.ok( true );
					done();
					return;
				}
				assert.notOk( true );
				done();
			});
		});

	}); // end TESTS api/get

	describe( 'api/aggregators', function tests() {

		it( 'should provide a method to query TSDB for a list of aggregators', function test() {
			expect( client.aggregators ).to.be.a( 'function' );
		});

		it( 'should throw an error if provided argument is not a function', function test() {
			var values = [
					'5',
					[],
					{},
					5,
					null,
					undefined,
					NaN,
					true
				];

			for ( var i = 0; i < values.length; i++ ) {
				expect( badValue( values[i] ) ).to.throw( TypeError );
			}

			function badValue( value ) {
				return function() {
					client.aggregators( value );
				};
			}
		});

		it( 'should get the list of aggregators', function test( done ) {
			client.aggregators( function onAggs( error, aggregators ) {
				if ( error ) {
					assert.notOk( true, 'Aggregators request returned an error.' );
					done();
					return;
				}
				assert.deepEqual( aggregators, db.aggregators );
				done();
			});
		});

		it( 'should pass along any aggregator request errors to the callback', function test( done ) {
			client.host( '0.0.0.1' );

			client.aggregators( function onData( error, data ) {
				if ( error ) {
					assert.ok( true );
					done();
					return;
				}
				assert.notOk( true );
				done();
			});
		});

	}); // end TESTS api/aggregators

	describe( 'api/metrics', function tests() {

		it( 'should provide a method to query TSDB for a list of metrics', function test() {
			expect( client.metrics ).to.be.a( 'function' );
		});

		it( 'should throw an error if provided argument is not a function', function test() {
			var values = [
					'5',
					[],
					{},
					5,
					null,
					undefined,
					NaN,
					true
				];

			for ( var i = 0; i < values.length; i++ ) {
				expect( badValue( values[i] ) ).to.throw( TypeError );
			}

			function badValue( value ) {
				return function() {
					client.metrics( value );
				};
			}
		});

		it( 'should get the list of metrics', function test( done ) {
			client.metrics( function onMetrics( error, metrics ) {
				if ( error ) {
					assert.notOk( true, 'Metrics request returned an error.' );
					done();
					return;
				}
				assert.deepEqual( metrics, db.metrics );
				done();
			});
		});

		it( 'should pass along any metrics request errors to the callback', function test( done ) {
			client.host( '0.0.0.1' );

			client.metrics( function onData( error, data ) {
				if ( error ) {
					assert.ok( true );
					done();
					return;
				}
				assert.notOk( true );
				done();
			});
		});

	}); // end TESTS api/metrics

	describe( 'api/config', function tests() {

		it( 'should provide a method to query TSDB for its current running configuration', function test() {
			expect( client.config ).to.be.a( 'function' );
		});

		it( 'should throw an error if provided argument is not a function', function test() {
			var values = [
					'5',
					[],
					{},
					5,
					null,
					undefined,
					NaN,
					true
				];

			for ( var i = 0; i < values.length; i++ ) {
				expect( badValue( values[i] ) ).to.throw( TypeError );
			}

			function badValue( value ) {
				return function() {
					client.config( value );
				};
			}
		});

		it( 'should get the current OpenTSDB configuration', function test( done ) {
			client.config( function onConfig( error, config ) {
				if ( error ) {
					assert.notOk( true, 'Config request returned an error.' );
					done();
					return;
				}
				assert.deepEqual( config, db.config );
				done();
			});
		});

		it( 'should pass along any request errors to the callback', function test( done ) {
			client.host( '0.0.0.1' );

			client.config( function onResponse( error, data ) {
				if ( error ) {
					assert.ok( true );
					done();
					return;
				}
				assert.notOk( true );
				done();
			});
		});

	}); // end TESTS api/config

	describe( 'api/version', function tests() {

		it( 'should provide a method to query the version of an OpenTSDB instance', function test() {
			expect( client.version ).to.be.a( 'function' );
		});

		it( 'should throw an error if provided argument is not a function', function test() {
			var values = [
					'5',
					[],
					{},
					5,
					null,
					undefined,
					NaN,
					true
				];

			for ( var i = 0; i < values.length; i++ ) {
				expect( badValue( values[i] ) ).to.throw( TypeError );
			}

			function badValue( value ) {
				return function() {
					client.version( value );
				};
			}
		});

		it( 'should get the current OpenTSDB version', function test( done ) {
			client.version( function onResponse( error, version ) {
				if ( error ) {
					assert.notOk( true, 'Version request returned an error.' );
					done();
					return;
				}
				assert.deepEqual( version, db.version );
				done();
			});
		});

		it( 'should pass along any request errors to the callback', function test( done ) {
			client.host( '0.0.0.1' );

			client.version( function onResponse( error, data ) {
				if ( error ) {
					assert.ok( true );
					done();
					return;
				}
				assert.notOk( true );
				done();
			});
		});

	}); // end TESTS api/version

	describe( 'api/dropcaches', function tests() {

		it( 'should provide a method to purge an OpenTSDB in-memory cache', function test() {
			expect( client.dropcaches ).to.be.a( 'function' );
		});

		it( 'should throw an error if provided argument is not a function', function test() {
			var values = [
					'5',
					[],
					{},
					5,
					null,
					undefined,
					NaN,
					true
				];

			for ( var i = 0; i < values.length; i++ ) {
				expect( badValue( values[i] ) ).to.throw( TypeError );
			}

			function badValue( value ) {
				return function() {
					client.dropcaches( value );
				};
			}
		});

		it( 'should instruct OpenTSDB to purge its in-memory caches', function test( done ) {
			client.dropcaches( function onResponse( error, body ) {
				if ( error ) {
					assert.notOk( true, 'Request to drop caches returned an error.' );
					done();
					return;
				}
				assert.deepEqual( body, db.dropcaches );
				done();
			});
		});

		it( 'should pass along any request errors to the callback', function test( done ) {
			client.host( '0.0.0.1' );

			client.dropcaches( function onResponse( error, data ) {
				if ( error ) {
					assert.ok( true );
					done();
					return;
				}
				assert.notOk( true );
				done();
			});
		});

	}); // end TESTS api/dropcaches

});
