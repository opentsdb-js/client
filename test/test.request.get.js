/* global describe, it, before, after, require */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// TSDB server:
	createApp = require( 'opentsdb-mock-server' ),

	// Module to be tested:
	getData = require( './../lib/request/get.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'lib/request/get', function tests() {

	var db, server;

	before( function ( done ) {
		db = createApp();
		server = db.createServer( function onListen() {
			done();
		});
	});


	// TEARDOWN //

	after( function() {
		server.close();
	});


	// TESTS //

	it( 'should export a function', function test() {
		expect( getData ).to.be.a( 'function' );
	});

	it( 'should throw an error if its first argument is not a string', function test() {
		var values = [
				5,
				true,
				null,
				undefined,
				NaN,
				[],
				{},
				function(){}
			];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( TypeError );
		}

		function badValue( value ) {
			return function() {
				getData( value, function(){} );
			};
		}
	});

	it( 'should throw an error if its second argument is not a function', function test() {
		var values = [
				5,
				true,
				null,
				undefined,
				NaN,
				[],
				{},
				'5'
			];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( TypeError );
		}

		function badValue( value ) {
			return function() {
				getData( db.url, value );
			};
		}
	});

	it( 'should be a function factory', function test() {
		expect( getData( db.url, function(){} ) ).to.be.a( 'function' );
	});

	it( 'should return a 502 error if request to a remote resource returns an error', function test( done ) {
		var request, url;
		url = 'bad_protocol://bad/url';
		request = getData( url, onResponse );
		request();
		return;
		function onResponse( error, data ) {
			if ( error ) {
				assert.strictEqual( error.status, 502 );
				done();
				return;
			}
			assert.notOk( true, 'No error returned.' );
			done();
		}
	});

	it( 'should return a 404 error if request to a remote resource does not return data', function test( done ) {
		var request, url;
		url = db.url + '/bad_body';
		request = getData( url, onResponse );
		request();
		return;
		function onResponse( error, data ) {
			if ( error ) {
				assert.strictEqual( error.status, 404 );
				done();
				return;
			}
			assert.notOk( true, 'No error returned.' );
			done();
		}
	});

	it( 'should return a 502 error if request to a remote resource does not return valid JSON', function test( done ) {
		var request, url;
		url = db.url + '/bad_json';
		request = getData( url, onResponse );
		request();
		return;
		function onResponse( error, data ) {
			if ( error ) {
				assert.strictEqual( error.status, 502 );
				done();
				return;
			}
			assert.notOk( true, 'No error returned.' );
			done();
		}
	});

	it( 'should return a 404 error if request to a remote resource returns an empty array', function test( done ) {
		var request,  url;
		url = db.url + '/no_data';
		request = getData( url, onResponse );
		request();
		return;
		function onResponse( error, data ) {
			if ( error ) {
				assert.strictEqual( error.status, 404 );
				done();
				return;
			}
			assert.notOk( true, 'No error returned.' );
			done();
		}
	});

	it( 'should not return an error if request successfully returns data', function test( done ) {
		var request, url;
		url = db.url + '/good_data';
		request = getData( url, onResponse );
		request();
		return;
		function onResponse( error, data ) {
			if ( error ) {
				assert.notOk( true, 'Error returned.' );
				done();
				return;
			}
			assert.ok( true );
			done();
		}
	});

	it( 'should return data if request is successful', function test( done ) {
		var request, url;
		url = db.url + '/good_data';
		request = getData( url, onResponse );
		request();
		return;
		function onResponse( error, data ) {
			if ( error ) {
				assert.notOk( true, 'Error returned.' );
				done();
				return;
			}
			if ( !data ) {
				assert.notOk( true, 'No data.' );
				done();
				return;
			}
			assert.ok( true );
			done();
		}
	});

});
