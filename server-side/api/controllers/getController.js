'use strict';

var mysql = require('mysql');

exports.dummy_function = function(request, result) {
	// verifies something or returns something or something as is needed for testing purposes
	// don't actually bother fleshing this out to do anything meaningful
}

/*
	exports.FUNCTIONNAME = function(request, result) {
		// Parse the request into a valid SQL query with some common parser code from models
		// If the request is invalid, return 400 status code (bad request). Make sure the client has code to process this?
		// request['body'] (maybe also request.body since it's JS?) contains the body of the request
		// Call some common authentication code (this can maybe be stored in models and take the form of a meaningful authentication model for each of these)
		// It's possible that some common code may be able to authenticate if the user exists and is logged in
		// and depending on the request type, we can then pass that to a more specific function that ensures the user has valid permissions to do such a thing
		// Once we're sure we've got a valid SQL query to submit, we can then query the server
		// Example code:

		var parsed_request = parse_request(request);
		if (parsed_request) { // this is a valid null check!
			result.status(400).send({url: request.originalUrl + " received a badly formatted request"})
		}
		var request_type = some request type // FIXME
		var authenticated = common_authenticate(request, request_type);
		if (authenticated) {
			global.con.query(parsed_request, function(err, task) {
				if (err) {
					result.send(err); // This must be interpreted by the client. Make a way to do this in the UI!
				}
				else
					result.json(task); // Return the results of the SQL query to the client to be interpreted and pretty-printed by the React UI
			});
		}
		else {
			result.status(403).send({url: request.originalUrl + " forbidden"})
		}
	};
*/