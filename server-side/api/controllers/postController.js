'use strict';

var mysql = require('mysql');
var common = require('../models/commonModel.js');

function create_group_helper(data, err, task, request, response){
	if (err){
		response.status(400).send(err);
	}
	else {
		common.perform_query(["groupName"], ["groupName"], "SELECT id FROM groups WHERE group_name=?;", true, null, null, request, response)
	}
}

exports.create_new_group = function(request, response){
	attributes = ["groupName"]
	placeholders = ["groupName"]
	skeleton = "INSERT INTO groups (group_name) VALUES (?);"
	specificAuth = true
	common.perform_query(attributes, placeholders, skeleton, specificAuth, null, create_group_helper, request, response)
};

function create_user_helper(data, err, task, request, response){
	if (err){
		response.status(400).send(err);
	}
	else {
		common.perform_query(["email"], ["email"], "SELECT id from user_accounts WHERE email=?;", true, null, null, request, response)
	}
}

exports.create_new_user = function(request, response) { // FIXME this should probably check if a user with that email is already in the database and refuse to create if so
	attributes = ["first", "last", "email", "password", "phoneNumber"]
	placeholders = ["first", "last", "email", "password", "phoneNumber", "facebook", "twitter", "instagram", "groupID"]
	skeleton = "INSERT INTO user_accounts (first_name, last_name, email, password, phone_number, facebook_profile, twitter_handle, instagram, group_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);"
	specificAuth = true // this doesn't need to be fixed; anyone should be able to create user accounts without any specific authentication
	common.perform_query(attributes, placeholders, skeleton, specificAuth, null, create_user_helper, request, response)
};

exports.create_group_debt = function(request, response) {
	attributes = ["debtType", "amount"]
	placeholders = ["debtType", "amount", "groupId"]
	skeleton = "INSERT INTO group_debt(debt_type, amount, group_id) VALUES (?, ?, ?);"
	specificAuth = true
	common.perform_query(attributes, placeholders, skeleton, specificAuth, null, common.return_truefalse, request, response)
};

exports.create_new_personal_debt = function(request, response) {
	attributes = ["amount", "lender", "borrower"]
	placeholders = ["amount", "lender", "borrower"]
	skeleton = "INSERT INTO personal_debts (amount, lender_id, borrower_id) VALUES (?, ?, ?);"
	specificAuth = true
	common.perform_query(attributes, placeholders, skeleton, specificAuth, null, common.return_truefalse, request, response)
};

exports.create_new_grocery_item = function(request, response) {
	attributes = ["amount", "userID"]
	placeholders = ["amount", "userID", "groupId"]
	skeleton = "INSERT INTO groceries (amount_due, paid_status, user_id, group_id) VALUES (?, false, ?, ?);"
	specificAuth = true
	common.perform_query(attributes, placeholders, skeleton, specificAuth, null, common.return_truefalse, request, response)
};

exports.create_new_chore = function(request, response) {
	attributes = ["chore", "due_date", "userID"]
	placeholders = ["chore", "due_date", "userID", "groupId"]
	skeleton = "INSERT INTO chores (chore, due_date, chore_complete, user_id, group_id) VALUES (?, ?, false, ?, ?);"
	specificAuth = true
	common.perform_query(attributes, placeholders, skeleton, specificAuth, null, common.return_truefalse, request, response)
};

exports.create_new_rent_item = function(request, response) {
	attributes = ["amount", "userID"]
	placeholders = ["amount", "userID", "groupId"]
	skeleton = "INSERT INTO rent (rent_amount, rent_paid, user_id, group_id) VALUES (?, false, ?, ?);"
	specificAuth = true
	common.perform_query(attributes, placeholders, skeleton, specificAuth, null, common.return_truefalse, request, response)
};