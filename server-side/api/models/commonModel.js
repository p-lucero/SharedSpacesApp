'use strict';

function ensure_login() {
	// Checks if the user submitting the query is a valid user and is logged in.
	// Currently does nothing.
	return true;
}

function ensure_attributes(body, desiredAttributes) {
	for (attribute of desiredAttributes){
		if (typeof body[attribute] === "undefined"){
			return false;
		}
	}
	return body;
}

exports.perform_query = function(attributes, placeholders, skeleton, specificAuth, request, result) {
	commonAuth = ensure_login()
	if (skeleton.includes("INSERT INTO user_accounts")) {
		commonAuth = true // hack to ensure that a user account can always be created
	}
	authenticated = commonAuth && specificAuth
	if (!authenticated){
		result.status(403).send({url: request.originalUrl + " forbidden"})
		return true;
	}
	else {
		body = ensure_attributes(request.body, attributes)
		if (!body){
			result.status(400).send({url: request.originalUrl + " received a badly formatted request"})
			return true;
		}
		else {
			for (param in request.params) {
				body[param] = request.params[param]
			}
			for (ph of placeholders) {
				let replacement = ""
				if (typeof(body[ph]) === "undefined"){
					replacement = "null" // deal with any optional parameters that aren't present
				}
				else if (isNaN(body[ph])){
					replacement = "'" + body[ph] + "'" // non-numerical values should be in single quotes
				}
				else {
					replacement = body[ph] // numerical values should be just numeric, no quotes
				}
				skeleton = skeleton.replace(ph, replacement)
			}
			if skeleton.includes("INSERT") {
				global.pool.query(skeleton) // no callback, MAY BREAK EVERYTHING
				return false; // yield control back to the caller so that it may perform an additional query to get the ID etc.
			}
			else {
				global.pool.query(skeleton, function(err, task) {
					if (err) {
						result.send(err); // This must be interpreted by the client. Make a way to do this in the UI!
						return true;
					}
					else {
						result.json(task); // Return the results of the SQL query to the client to be interpreted and pretty-printed by the React UI
						return true;
					}
				});
			}
		}
	}
}