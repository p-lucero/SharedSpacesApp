'use strict';

var mysql = require('mysql');
var common = require('../models/commonModel.js');

exports.delete_group = function(request, result) {
	attributes = []
	placeholders = ["GroupID"]
	skeleton = "DELETE FROM groups WHERE id=GroupID;"
	body = common.ensure_attributes(request.body, attributes)
	if (!body) {
		result.status(400).send({url: request.originalUrl + " received a badly formatted request"})
	}
	else {
		body.GroupID = request.params.groupId
		commonAuth = common.ensure_login() // FIXME
		specificAuth = true // FIXME, more specific authentication code should go here
		authenticated = commonAuth && specificAuth
		common.perform_query(authenticated, skeleton, body, placeholders, result)
	}
};

exports.delete_user = function(request, result) {
	attributes = [] 
	placeholders = ["userID"] 
	skeleton = "DELETE FROM users WHERE id=UserID;"
	body = common.ensure_attributes(request.body, attributes)
	if (!body) {
		result.status(400).send({url: request.originalUrl + " received a badly formatted request"})
	}
	else {
		body.UserID = request.params.userId
		commonAuth = common.ensure_login() // FIXME
		specificAuth = true // FIXME, more specific authentication code should go here
		authenticated = commonAuth && specificAuth
		common.perform_query(authenticated, skeleton, body, placeholders, result)
	}
};

exports.delete_group_debt = function(request, result) {
	attributes = [] 
	placeholders = ["DebtID"] 
	skeleton = "DELETE FROM group_debt WHERE id=DebtID;" // the basic skeleton of a SQL query for this function
	body = common.ensure_attributes(request.body, attributes)
	if (!body) {
		result.status(400).send({url: request.originalUrl + " received a badly formatted request"})
	}
	else {
		body.DebtID = request.params.debtId
		commonAuth = common.ensure_login() // FIXME
		specificAuth = true // FIXME, more specific authentication code should go here
		authenticated = commonAuth && specificAuth
		common.perform_query(authenticated, skeleton, body, placeholders, result)
	}
};

exports.delete_personal_debt = function(request, result) {
	attributes = []
	placeholders = ["DebtID"]
	skeleton = "DELETE FROM personal_debts WHERE id=DebtID;" // the basic skeleton of a SQL query for this function
	body = common.ensure_attributes(request.body, attributes)
	if (!body) {
		result.status(400).send({url: request.originalUrl + " received a badly formatted request"})
	}
	else {
		body.DebtID = requests.params.debtId
		commonAuth = common.ensure_login() // FIXME
		specificAuth = true // FIXME, more specific authentication code should go here
		authenticated = commonAuth && specificAuth
		common.perform_query(authenticated, skeleton, body, placeholders, result)
	}
};

exports.delete_grocery_list = function(request, result) {
	attributes = []
	placeholders = ["GroupID"]
	skeleton = "DELETE FROM groceries WHERE group_id=GroupID;" // the basic skeleton of a SQL query for this function
	body = common.ensure_attributes(request.body, attributes)
	if (!body) {
		result.status(400).send({url: request.originalUrl + " received a badly formatted request"})
	}
	else {
		body.GroupID = request.params.groupId
		commonAuth = common.ensure_login() // FIXME
		specificAuth = true // FIXME, more specific authentication code should go here
		authenticated = commonAuth && specificAuth
		common.perform_query(authenticated, skeleton, body, placeholders, result)
	}
};

exports.delete_grocery_item = function(request, result) {
	attributes = []
	placeholders = ["GroceryID"]
	skeleton = "DELETE FROM groceries WHERE id=GroceryID" // the basic skeleton of a SQL query for this function
	body = common.ensure_attributes(request.body, attributes)
	if (!body) {
		result.status(400).send({url: request.originalUrl + " received a badly formatted request"})
	}
	else {
		body.GroceryID = request.params.groceryId
		commonAuth = common.ensure_login() // FIXME
		specificAuth = true // FIXME, more specific authentication code should go here
		authenticated = commonAuth && specificAuth
		common.perform_query(authenticated, skeleton, body, placeholders, result)
	}
};

exports.delete_chores_list = function(request, result) {
	attributes = []
	placeholders = ["GroupID"]
	skeleton = "DELETE FROM chores WHERE group_id=GroupID" // the basic skeleton of a SQL query for this function
	body = common.ensure_attributes(request.body, attributes)
	if (!body) {
		result.status(400).send({url: request.originalUrl + " received a badly formatted request"})
	}
	else {
		body.GroupID = request.params.groupId
		commonAuth = common.ensure_login() // FIXME
		specificAuth = true // FIXME, more specific authentication code should go here
		authenticated = commonAuth && specificAuth
		common.perform_query(authenticated, skeleton, body, placeholders, result)
	}
};

exports.delete_chore_item = function(request, result) {
	attributes = []
	placeholders = ["ChoreID"]
	skeleton = "DELETE FROM chores WHERE id=ChoreID" // the basic skeleton of a SQL query for this function
	body = common.ensure_attributes(request.body, attributes)
	if (!body) {
		result.status(400).send({url: request.originalUrl + " received a badly formatted request"})
	}
	else {
		body.ChoreID = request.params.choreId
		commonAuth = common.ensure_login() // FIXME
		specificAuth = true // FIXME, more specific authentication code should go here
		authenticated = commonAuth && specificAuth
		common.perform_query(authenticated, skeleton, body, placeholders, result)
	}
};