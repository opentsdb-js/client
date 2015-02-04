/* global describe, it, require */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	getHandler = require( './../lib/request/get_response.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'lib/request/get_response', function tests() {

	// TESTS //

	it( 'should export a function', function test() {
		expect( getHandler ).to.be.a( 'function' );
	});

	it( 'should throw an error if its first argument is not a function', function test() {
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
				getHandler( value, function(){} );
			};
		}
	});

	it( 'should be a function factory', function test() {
		expect( getHandler( function(){} ) ).to.be.a( 'function' );
	});

	// NOTE: additional functional tests are done through testing the get request module.

});
