'use strict';

var mysql = require('mysql');

// Each of the required functions that should be achieved by the server should be implemented as a function with the form
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
// Hopefully establishing a connection to the mysql instance in the server and then having the include chain should be sufficient for con to exist here
// Otherwise things are going to get very complicated