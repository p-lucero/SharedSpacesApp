'use strict';

var common = require('../models/commonModel.js');

// async boilerplate
// function foo(data, err, task, request, response){
// 	if (err){
// 		response.send(err);
// 	}
// 	else {
// 		common.perform_query(attributes, placeholders, skeleton, true, data, callback, request, response)
// 	}
// }

exports.dummy_function = function(request, response) {
	// verifies something or returns something or something as is needed for testing purposes
	// don't actually bother fleshing this out to do anything meaningful
	// you can access this by going to /api/dummy
}

function group_info_helper3(data, err, task, request, response) {
	if (err){
		response.status(400).send(err);
	}
	else {
		data.debts = task
		response.json(data);
	}
}

function group_info_helper2(data, err, task, request, response) {
	if (err){
		response.status(400).send(err);
	}
	else {
		data.users = task
		var skeleton = "SELECT * FROM group_debts WHERE group_id=?;"
		common.perform_query([], ["groupId"], skeleton, true, data, group_info_helper3, request, response)
	}
}

function group_info_helper1(data, err, task, request, response) {
	if (err){
		response.status(400).send(err);
	}
	else {
		data.group_info = task
		var skeleton = "SELECT * FROM user_accounts WHERE group_id=?;"
		common.perform_query([], ["groupId"], skeleton, true, data, group_info_helper2, request, response)
	}
}

exports.get_group_info = function(request, response) {
	var attributes = [] // this query has to progress in stages because there's no good way of meaningfully joining these tables
	var placeholders = ["groupId"]
	var skeleton = "SELECT group_name, id FROM groups WHERE id=?;"
	var specificAuth = true
	common.perform_query(attributes, placeholders, skeleton, specificAuth, {}, group_info_helper1, request, response)
};



exports.get_user_info = function(request, response) {
	var attributes = []
	var placeholders = ["userId"]
	var skeleton = "SELECT * FROM user_accounts WHERE id=?;"
	var specificAuth = true
	common.perform_query(attributes, placeholders, skeleton, specificAuth, null, null, request, response)
};

exports.get_group_debt_list = function(request, response) {
	var attributes = []
	var placeholders = ["groupId"]
	var skeleton = "SELECT * FROM group_debt WHERE group_id=?;"
	var specificAuth = true
	common.perform_query(attributes, placeholders, skeleton, specificAuth, null, null, request, response)
};

exports.get_group_debt_info = function(request, response) {
	var attributes = []
	var placeholders = ["debtId"]
	var skeleton = "SELECT * FROM group_debt WHERE id=?;"
	var specificAuth = true
	common.perform_query(attributes, placeholders, skeleton, specificAuth, null, null, request, response)
};

exports.get_personal_debt_list = function(request, response) {
	var attributes = []
	var placeholders = ["userId", "userId"]
	var skeleton = "SELECT * FROM personal_debts WHERE lender_id=? OR borrower_id=?;"
	var specificAuth = true
	common.perform_query(attributes, placeholders, skeleton, specificAuth, null, null, request, response)
};

exports.get_personal_debt_info = function(request, response) {
	var attributes = []
	var placeholders = ["debtId"]
	var skeleton = "SELECT * FROM personal_debts WHERE id=?;"
	var specificAuth = true
	common.perform_query(attributes, placeholders, skeleton, specificAuth, null, null, request, response)
};

exports.get_grocery_list = function(request, response) {
	var attributes = []
	var placeholders = ["groupId"]
	var skeleton = "SELECT * FROM groceries WHERE group_id=?;"
	var specificAuth = true
	common.perform_query(attributes, placeholders, skeleton, specificAuth, null, null, request, response)
};

exports.get_grocery_item = function(request, response) {
	var attributes = []
	var placeholders = ["groceryId"]
	var skeleton = "SELECT * FROM groceries WHERE id=?;"
	var specificAuth = true
	common.perform_query(attributes, placeholders, skeleton, specificAuth, null, null, request, response)
};

exports.get_chores_list = function(request, response) {
	var attributes = []
	var placeholders = ["groupId"]
	var skeleton = "SELECT * FROM chores WHERE group_id=?;"
	var specificAuth = true
	common.perform_query(attributes, placeholders, skeleton, specificAuth, null, null, request, response)
};

exports.get_chore_info = function(request, response) {
	var attributes = []
	var placeholders = ["choreId"]
	var skeleton = "SELECT * FROM chores WHERE chore_id=?;"
	var specificAuth = true
	common.perform_query(attributes, placeholders, skeleton, specificAuth, null, null, request, response)
};

exports.get_rent_info = function(request, response) {
	var attributes = []
	var placeholders = ["groupId"]
	var skeleton = "SELECT * FROM rent WHERE group_id=?;"
	var specificAuth = true
	common.perform_query(attributes, placeholders, skeleton, specificAuth, null, null, request, response)
};

/*
	exports.FUNCTIONNAME = function(request, response) {
		var attributes = [] // an array of strings containing all required attributes in the user's request
		var placeholders = [] // an array of strings containing all things to replace in skeleton(s); subset of attributes
		var skeleton = "" // the basic skeleton of a SQL query for this function
		body = common.ensure_attributes(request.body, attributes)
		if (!body) {
			response.status(400).send({url: request.originalUrl + " received a badly formatted request"})
		}
		else {
			commonAuth = common.ensure_login() // FIXME
			var specificAuth = true // FIXME, more specific authentication code should go here
			authenticated = commonAuth && specificAuth
			common.perform_query(authenticated, skeleton, body, placeholders, response)
		}
	};
*/

// Fire away at this server with the following Python code to beta test things:
// >>> import requests
// >>> r = requests.get(<address, probably localhost or ec2>, data=<dictionary containing lots of fields>)
// >>> r.content

// If this is running on the server, you can also test the routing by accessing SERVERNAME/api/* from outside