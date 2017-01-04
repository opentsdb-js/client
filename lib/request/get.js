/**
*
*	OPENTSDB: GET/
*
*
*	DESCRIPTION:
*		- Performs a GET request from OpenTSDB.
*
*
*	NOTES:
*		[1]
*
*
*	TODO:
*		[1]
*
*
*	LICENSE:
*		MIT
*
*	Copyright (c) 2014. Athan Reines.
*
*
*	AUTHOR:
*		Athan Reines. kgryte@gmail.com.
*
*/

'use strict';

// MODULES //

var // Request module:
	request = require( 'request' ),

	// Response handler:
	getHandler = require( './get_response.js' );


// QUERY //

/**
* FUNCTION: query( url, clbk )
*	Returns a function to query an OpenTSDB endpoint. Wraps the provided url and clbk in a closure.
*
* @param {String} url - OpenTSDB url endpoint
* @param {Function} clbk - callback to invoke upon receiving a response. Function should accept two arguments: [ error, data ]. If no errors, `error` is null. If error, `error` is an object with status and message fields.
* @returns {Function} function to query a OpenTSDB
*/
function query( url, clbk ) {
	if ( typeof url !== 'string' ) {
		throw new TypeError( 'query()::invalid input argument. URL must be a string.' );
	}
	if ( typeof clbk !== 'function' ) {
		throw new TypeError( 'query()::invalid input argument. Callback must be a function.' );
	}
	// Get a response handler:
	var handler = getHandler( function onResponse( error, data ) {
		if ( error ) {
			clbk( error );
			return;
		}
		clbk( null, data );
	});

	/**
	* FUNCTION: get()
	*	Function to query an OpenTSDB endpoint.
	*
	* @private
	*/
	return function get() {
		request({
			'method': 'GET',
			'uri': url,
			headers:this._headers
		}, handler );
	}; // end FUNCTION get()
} // end FUNCTION query()


// EXPORTS //

module.exports = query;
