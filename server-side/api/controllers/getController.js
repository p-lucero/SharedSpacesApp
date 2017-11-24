'use strict';

var mysql = require('mysql');
var common = require('../models/commonModel.js');

exports.dummy_function = function(request, result) {
	// verifies something or returns something or something as is needed for testing purposes
	// don't actually bother fleshing this out to do anything meaningful
}

/*
	exports.FUNCTIONNAME = function(request, result) {
		attributes = [] // an array of strings containing all required attributes in the user's request
		skeleton = "" // the basic skeleton of a SQL query for this function
		body = common.ensure_attributes(request.body, attributes)
		if (!body) {
			result.status(400).send({url: request.originalUrl + " received a badly formatted request"})
		}
		else {
			commonAuth = common.ensure_login() // FIXME
			specificAuth = true // FIXME, more specific authentication code should go here
			authenticated = commonAuth && specificAuth
			common.perform_query(authenticated, skeleton, body, attributes, result)
		}
	};
*/

// Fire away at this server with the following Python code to beta test things:
// >>> import requests
// >>> r = requests.get(<address, probably localhost or ec2>, data=<dictionary containing lots of fields>)
// >>> r.content

// If this is running on the server, you can also test the routing by accessing SERVERNAME/api/* from outside