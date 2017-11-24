'use strict';

var mysql = require('mysql');
var common = require('../models/commonModel.js');

exports.delete_group = function(request, result) {
	attributes = [] // an array of strings containing all required attributes in the user's request
	placeholders = [] // an array of strings containing all things to replace in skeleton(s); subset of attributes
	skeleton = "" // the basic skeleton of a SQL query for this function
	body = common.ensure_attributes(request.body, attributes)
	if (!body) {
		result.status(400).send({url: request.originalUrl + " received a badly formatted request"})
	}
	else {
		commonAuth = common.ensure_login() // FIXME
		specificAuth = true // FIXME, more specific authentication code should go here
		authenticated = commonAuth && specificAuth
		common.perform_query(authenticated, skeleton, body, placeholders, result)
	}
};

exports.delete_user = function(request, result) {
	attributes = [] // an array of strings containing all required attributes in the user's request
	placeholders = [] // an array of strings containing all things to replace in skeleton(s); subset of attributes
	skeleton = "" // the basic skeleton of a SQL query for this function
	body = common.ensure_attributes(request.body, attributes)
	if (!body) {
		result.status(400).send({url: request.originalUrl + " received a badly formatted request"})
	}
	else {
		commonAuth = common.ensure_login() // FIXME
		specificAuth = true // FIXME, more specific authentication code should go here
		authenticated = commonAuth && specificAuth
		common.perform_query(authenticated, skeleton, body, placeholders, result)
	}
};

exports.delete_group_debt = function(request, result) {
	attributes = [] // an array of strings containing all required attributes in the user's request
	placeholders = [] // an array of strings containing all things to replace in skeleton(s); subset of attributes
	skeleton = "" // the basic skeleton of a SQL query for this function
	body = common.ensure_attributes(request.body, attributes)
	if (!body) {
		result.status(400).send({url: request.originalUrl + " received a badly formatted request"})
	}
	else {
		commonAuth = common.ensure_login() // FIXME
		specificAuth = true // FIXME, more specific authentication code should go here
		authenticated = commonAuth && specificAuth
		common.perform_query(authenticated, skeleton, body, placeholders, result)
	}
};

exports.delete_personal_debt = function(request, result) {
	attributes = [] // an array of strings containing all required attributes in the user's request
	placeholders = [] // an array of strings containing all things to replace in skeleton(s); subset of attributes
	skeleton = "" // the basic skeleton of a SQL query for this function
	body = common.ensure_attributes(request.body, attributes)
	if (!body) {
		result.status(400).send({url: request.originalUrl + " received a badly formatted request"})
	}
	else {
		commonAuth = common.ensure_login() // FIXME
		specificAuth = true // FIXME, more specific authentication code should go here
		authenticated = commonAuth && specificAuth
		common.perform_query(authenticated, skeleton, body, placeholders, result)
	}
};

exports.delete_grocery_list = function(request, result) {
	attributes = [] // an array of strings containing all required attributes in the user's request
	placeholders = [] // an array of strings containing all things to replace in skeleton(s); subset of attributes
	skeleton = "" // the basic skeleton of a SQL query for this function
	body = common.ensure_attributes(request.body, attributes)
	if (!body) {
		result.status(400).send({url: request.originalUrl + " received a badly formatted request"})
	}
	else {
		commonAuth = common.ensure_login() // FIXME
		specificAuth = true // FIXME, more specific authentication code should go here
		authenticated = commonAuth && specificAuth
		common.perform_query(authenticated, skeleton, body, placeholders, result)
	}
};

exports.delete_grocery_item = function(request, result) {
	attributes = [] // an array of strings containing all required attributes in the user's request
	placeholders = [] // an array of strings containing all things to replace in skeleton(s); subset of attributes
	skeleton = "" // the basic skeleton of a SQL query for this function
	body = common.ensure_attributes(request.body, attributes)
	if (!body) {
		result.status(400).send({url: request.originalUrl + " received a badly formatted request"})
	}
	else {
		commonAuth = common.ensure_login() // FIXME
		specificAuth = true // FIXME, more specific authentication code should go here
		authenticated = commonAuth && specificAuth
		common.perform_query(authenticated, skeleton, body, placeholders, result)
	}
};

exports.delete_chores_list = function(request, result) {
	attributes = [] // an array of strings containing all required attributes in the user's request
	placeholders = [] // an array of strings containing all things to replace in skeleton(s); subset of attributes
	skeleton = "" // the basic skeleton of a SQL query for this function
	body = common.ensure_attributes(request.body, attributes)
	if (!body) {
		result.status(400).send({url: request.originalUrl + " received a badly formatted request"})
	}
	else {
		commonAuth = common.ensure_login() // FIXME
		specificAuth = true // FIXME, more specific authentication code should go here
		authenticated = commonAuth && specificAuth
		common.perform_query(authenticated, skeleton, body, placeholders, result)
	}
};

exports.delete_chore_item = function(request, result) {
	attributes = [] // an array of strings containing all required attributes in the user's request
	placeholders = [] // an array of strings containing all things to replace in skeleton(s); subset of attributes
	skeleton = "" // the basic skeleton of a SQL query for this function
	body = common.ensure_attributes(request.body, attributes)
	if (!body) {
		result.status(400).send({url: request.originalUrl + " received a badly formatted request"})
	}
	else {
		commonAuth = common.ensure_login() // FIXME
		specificAuth = true // FIXME, more specific authentication code should go here
		authenticated = commonAuth && specificAuth
		common.perform_query(authenticated, skeleton, body, placeholders, result)
	}
};