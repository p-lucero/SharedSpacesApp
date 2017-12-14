'use strict';

function ensure_attributes(body, desiredAttributes) {
	var attributesEnsured = []
	for (let attribute of desiredAttributes){
		if (typeof body[attribute] !== "undefined"){
			attributesEnsured.push(attribute)
		}
	}
	return attributesEnsured
}

exports.get_info_from_token = function(token) {
	for (let cachedLogin of global.loginCache) {
		if (cachedLogin.loginTokens.indexOf(token) > -1){
			return cachedLogin
		}
	}
	return null
}

exports.return_truefalse = function(data, err, task, request, response) { // Returns 200 OK if the request was successful. Returns the error otherwise.
	if (err) {
		response.status(400).send(err)
	}
	else {
		response.json(200) // this is apparently valid expressJS code
	}
}

/*
Parameters are as follows:

	attributes is the array of strings containing all required attributes that the request body should have.
	placeholders is the array of strings (or regexps) which will be used in doing parameter substitution later on.
	skeleton is the query skeleton to be used in parameter substitution later.
	authenticated is a boolean value indicating whether the authentication checks in the caller passed.
	data is an object containing any data from prior queries, if applicable. Optional, should be null if the operation can be done in one query.
	callback is a callback function which will be called if it exists. Used for when multiple queries are needed. Optional, should be null in same case as above.
	request is the built-in request object that the user sent us.
	response is the object which deals with how we're going to reply to the user.
*/

exports.perform_query = function(attributes, placeholders, skeleton, authenticated, data, callback, request, response) {
	var parameters = []
	if (!authenticated){
		response.status(401).send({url: request.originalUrl + " not allowed for this user or not signed in"})
	}
	else {
		var attributesEnsured = ensure_attributes(request.body, attributes)
		if (attributesEnsured.length !== attributes.length){
			response.status(400).send({url: request.originalUrl + " received a badly formatted request; expected parameters " + JSON.stringify(attributes) + " but only received " + JSON.stringify(attributesEnsured)})
		}
		else {
			var body = request.body
			for (let param in request.params) { // move anything that was specified in the URL to the request body
				body[param] = request.params[param]
			}
			for (let ph of placeholders) { // prepare parameters to be substituted into the query skeleton
				parameters.push(body[ph])
			}
			if (callback !== null) { // there are more queries required and this is only one of several
				global.pool.query(skeleton, parameters, function(err, task) {
					if (err){
						callback(data, err, null, request, response); // which produces absolutely disgusting code
					}
					else {
						callback(data, null, task, request, response);
					}
				});
			}
			else {
				global.pool.query(skeleton, parameters, function(err, task) {
					if (err) {
						response.status(500).send(err); // This must be interpreted by the client. Make a way to do this in the UI!
					}
					else {
						response.json(task); // Return the responses of the SQL query to the client to be interpreted and pretty-printed by the React UI
					}
				});
			}
		}
	}
}

/*
function foo(data, err, task, request, response) {
	// async code goes here
}
*/