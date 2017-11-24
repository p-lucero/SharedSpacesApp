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

exports.create_new_user = function(request, result) {
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

exports.create_group_debt = function(request, result) {
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

exports.create_new_personal_debt = function(request, result) {
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

exports.create_new_grocery_item = function(request, result) {
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

exports.create_new_chore = function(request, result) {
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

exports.create_new_rent_item = function(request, result) {
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