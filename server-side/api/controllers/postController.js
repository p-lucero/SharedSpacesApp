'use strict';

var mysql = require('mysql');
var common = require('../models/commonModel.js');

exports.create_new_group = function(request, result){
	// DUMMY FUNCTION
	var parsed_request = "use deployment;"; // Dummy request for now; this should be whatever we get out of the parsing code to be written above!
	var authenticated = true; // Dummy boolean for now; this should be whatever the above authentication code returned
	if (authenticated) {
		global.pool.query(parsed_request, function(err, task) {
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