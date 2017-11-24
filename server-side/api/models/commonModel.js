'use strict';

function ensure_login() {
	// Checks if the user submitting the query is a valid user and is logged in.
	// Currently does nothing.
	return true;
}

function ensure_attributes(body, desiredAttributes) {
	for (attribute of desiredAttributes){
		if (typeof attribute === "undefined"){
			return false;
		}
	}
	return body;
}

exports.perform_query = function(attributes, placeholders, skeleton, specificAuth, request, result) {
	commonAuth = ensure_login()
	authenticated = commonAuth && specificAuth
	if (!authenticated){
		result.status(403).send({url: request.originalUrl + " forbidden"})
	}
	else {
		body = ensure_attributes(request.body, attributes)
		if (!body){
			result.status(400).send({url: request.originalUrl + " received a badly formatted request"})
		}
		else {
			for (param of request.params) {
				// transfer all thingies FIXME
			}
			for (ph of placeholders) {
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
	}
}