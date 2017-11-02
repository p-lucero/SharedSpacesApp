'use strict';

var mysql = require('mysql');

exports.creategroup = function(request, result){
	// parse request into valid SQL query
	// the real meat of the request (the information that we would parse) is contained in request['body']
	// this IS ITSELF basically a dictionary and contains whatever parameters have been set by the sender
	// authenticate that the user sending the request can make the request
	parsed_request = "use deployment;"; // Dummy request for now; this should be whatever we get out of the parsing code to be written above!
	authenticated = true; // Dummy boolean for now; this should be whatever the above authentication code returned
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

/*
	exports.FUNCTIONNAME = function(request, result) {
		// authentication checks should probably go here?
		con.query(request, function(err, task) {
			if (err)
				result.send(err);
			result.json(task);
		});
	};
*/
// Can we generate a common authentication code to keep things dry?
// Fire away at this server with the following Python code to beta test things:
// >>> import requests
// >>> r = requests.get(<address, probably localhost or ec2>, data=<dictionary containing lots of fields>)
// >>> r.content