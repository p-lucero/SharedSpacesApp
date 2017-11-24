'use strict';

exports.ensure_login = function() {
	// Checks if the user submitting the query is a valid user and is logged in.
	// Currently does nothing.
	return true;
}

exports.ensure_attributes = function(body, desiredAttributes) {
	for (attribute of desiredAttributes){
		if (typeof attribute === "undefined"){
			return null;
		}
	}
	return body;
}

exports.perform_query = function(authenticated, skeleton, body, placeholders, result) {
	if (authenticated) {
		for (ph of placeholders){
			skeleton = skeleton.replace(ph, body[ph])
		}
		global.pool.query(skeleton, function(err, task) {
			if (err) {
				result.send(err); // This must be interpreted by the client. Make a way to do this in the UI!
			}
			else {
				result.json(task); // Return the results of the SQL query to the client to be interpreted and pretty-printed by the React UI
			}
		});
	}
	else {
		result.status(403).send({url: request.originalUrl + " forbidden"})
	}
}