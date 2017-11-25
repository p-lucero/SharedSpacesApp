'use strict';

var mysql = require('mysql');
var common = require('../models/commonModel.js');

function create_group_helper(data, err, task, request, response){
	if (err){
		response.send(err);
	}
	else {
		common.perform_query(["groupName"], ["groupName"], "SELECT id FROM groups WHERE group_name=groupName;", true, null, null, request, response)
	}
}

exports.create_new_group = function(request, response){
	attributes = ["groupName"]
	placeholders = ["groupName"]
	skeleton = "INSERT INTO groups (group_name) VALUES (groupName)"
	specificAuth = true
	common.perform_query(attributes, placeholders, skeleton, specificAuth, null, create_group_helper, request, response)
};

function create_user_helper(data, err, task, request, response){
	if (err){
		response.send(err);
	}
	else {
		common.perform_query(["_email"], ["_email"], "SELECT id from user_accounts WHERE email=_email;", true, null, null, request, response)
	}
}

exports.create_new_user = function(request, response) {
	attributes = ["first", "last", "_email", "pw", "phoneNumber"]
	placeholders = ["first", "last", "_email", "pw", "phoneNumber", "facebook", "twitter", "insta", "groupID"]
	skeleton = "INSERT INTO user_accounts (first_name, last_name, email, password, phone_number, facebook_profile, twitter_handle, instagram, group_id)\
	VALUES (first, last, _email, pw, phoneNumber, facebook, twitter, insta, groupID);"
	request.body._email = request.body.email // deal with name shadowing
	request.body.pw = request.body.password
	request.body.insta = request.body.instagram
	specificAuth = true // this doesn't need to be fixed; anyone should be able to create user accounts without any specific authentication
	common.perform_query(attributes, placeholders, skeleton, specificAuth, null, create_user_helper, request, response)
};

exports.create_group_debt = function(request, response) {
	attributes = ["debtType", "_amount"]
	placeholders = ["debtType", "_amount", "groupId"]
	skeleton = "INSERT INTO group_debt(debt_type, amount, group_id) VALUES (debtType, _amount, groupId);"
	request.body._amount = request.body.amount // deal with name shadowing
	specificAuth = true
	common.perform_query(attributes, placeholders, skeleton, specificAuth, request, response)
};

exports.create_new_personal_debt = function(request, response) {
	attributes = ["lender", "borrower"]
	placeholders = ["_amount", "lender", "borrower"]
	skeleton = "INSERT INTO personal_debts (amount, lender_id, borrower_id) VALUES (_amount, lender, borrower);"
	specificAuth = true
	common.perform_query(attributes, placeholders, skeleton, specificAuth, request, response)
};

exports.create_new_grocery_item = function(request, response) {
	attributes = ["amount", "userID"]
	placeholders = ["amount", "userID", "groupId"]
	skeleton = "INSERT INTO groceries (amount_due, paid_status, user_id, group_id) VALUES (amount, false, userID, groupId);"
	specificAuth = true
	common.perform_query(attributes, placeholders, skeleton, specificAuth, request, response)
};

exports.create_new_chore = function(request, response) {
	attributes = ["_chore", "duedate", "userID"]
	placeholders = ["_chore", "duedate", "userID", "groupId"]
	skeleton = "INSERT INTO chores (chore, due_date, chore_complete, user_id, group_id) VALUES (_chore, duedate, false, userID, groupId);"
	request.body._chore = request.body.chore // deal with name shadowing
	request.body.duedate = request.body.due_date
	specificAuth = true
	common.perform_query(attributes, placeholders, skeleton, specificAuth, request, response)
};

exports.create_new_rent_item = function(request, response) {
	attributes = ["amount", "userID"]
	placeholders = ["amount", "userID", "groupId"]
	skeleton = "INSERT INTO rent (rent_amount, rent_paid, user_id, group_id) VALUES (amount, false, userID, groupId)"
	specificAuth = true
	common.perform_query(attributes, placeholders, skeleton, specificAuth, request, response)
};