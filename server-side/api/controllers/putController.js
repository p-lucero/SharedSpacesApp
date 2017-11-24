'use strict';

var mysql = require('mysql');
var common = require('../models/commonModel.js');

exports.update_group_info = function(request, result) {
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

exports.update_user_info = function(request, result) {
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

exports.update_group_debt = function(request, result) {
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

exports.update_personal_debt = function(request, result) {
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

exports.update_grocery_list = function(request, result) {
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

exports.update_grocery_item = function(request, result) {
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

exports.update_chores_list = function(request, result) {
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

exports.update_chore_item = function(request, result) {
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

exports.update_rent_info = function(request, result) {
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