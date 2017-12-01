'use strict';

var common = require('../models/commonModel.js');
var auth = require('./authenticationController.js');
const validator = require('validator')

exports.create_new_group = function(request, response){
	var attributes = ["groupName"]
	var placeholders = ["groupName"]
	var skeleton = "INSERT INTO groups (group_name) VALUES (?);"
	var userInfo = common.get_info_from_token(request.body.token)
	var authenticated = true
	if (!userInfo){
		authenticated = false
	}
	global.pool.query("SELECT group_id FROM user_accounts WHERE id=?", [userInfo.userID], function(err, task){
		if (task.length !== 0){
			request.status(409).send({url: request.originalUrl + " received a request to create a group, but is already in a group"})
		}
		else {
			common.perform_query(attributes, placeholders, skeleton, authenticated, null, function (data, err, task, request, response){
				if (err){
					response.status(500).send(err);
				}
				else {
					common.perform_query(["groupName"], ["groupName"], "SELECT id FROM groups WHERE group_name=?;", true, null, function (data, err, task, request, response) {
						if (err){
							response.status(500).send(err);
						}
						else {
							global.pool.query("UPDATE user_accounts SET group_id=? WHERE email=?", [task[0].id, userInfo.email], function (err, task){
								if (err){
									if (!response.headersSent){
										response.status(500).send(err);
									}
								}
							})
							if (!response.headersSent){
								response.json(task)
							}
						}
					}, request, response)
				}
			}, request, response)
		}
	})
};

exports.create_new_user = function(request, response) {
	request.body.stayLoggedIn = true
	var attributes = ["first", "last", "email", "password", "phoneNumber"]
	var placeholders = ["first", "last", "email", "password", "phoneNumber", "facebook", "twitter", "instagram", "groupID"]
	var skeleton = "INSERT INTO user_accounts (first_name, last_name, email, password, phone_number, facebook_profile, twitter_handle, instagram, group_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);"
	if (!validator.isEmail(request.body.email + '')) { // ensure we don't throw an error on passing in a null into validator; also catches nulls properly
		response.status(400).send({url: request.originalUrl + " received a request to create an account, but the email address was invalid"}) // reject non-email emails
	}
	else {
		global.pool.query("SELECT * FROM user_accounts WHERE email=?", [request.body.email], function(err, task) {
			if (task.length > 0){
				response.status(409).send({url: request.originalUrl + " received a request to create an account for an email that is already registered"})
			}
			else {
				common.perform_query(attributes, placeholders, skeleton, true, null, function (data, err, task, request, response){
					if (err){
						response.status(500).send(err);
					}
					else {
						auth.login(request, response) // now that the user's created an account, give them a login token for said new account
					}
				}, request, response)
			}
		});
	}
};

exports.create_group_debt = function(request, response) {
	var attributes = ["debtType", "amount"]
	var placeholders = ["debtType", "amount", "groupId"]
	var skeleton = "INSERT INTO group_debt(debt_type, amount, group_id) VALUES (?, ?, ?);"
	var userInfo = common.get_info_from_token(request.body.token)
	var authenticated = true
	if (!userInfo || request.params.groupId != userInfo.groupID){
		authenticated = false
	}
	common.perform_query(attributes, placeholders, skeleton, authenticated, null, common.return_truefalse, request, response)
};

exports.create_new_personal_debt = function(request, response) {
	var attributes = ["amount", "lender", "borrower"]
	var placeholders = ["amount", "lender", "borrower"]
	var skeleton = "INSERT INTO personal_debts (amount, lender_id, borrower_id) VALUES (?, ?, ?);"
	var userInfo = common.get_info_from_token(request.body.token)
	var authenticated = true
	if (!userInfo || (userInfo.userID != request.body.lender && userInfo.userID != request.body.borrower)){
		authenticated = false
	}
	common.perform_query(attributes, placeholders, skeleton, authenticated, null, common.return_truefalse, request, response)
};

exports.create_new_grocery_item = function(request, response) {
	var attributes = ["amount", "userID"]
	var placeholders = ["amount", "userID", "groupId"]
	var skeleton = "INSERT INTO groceries (amount_due, paid_status, user_id, group_id) VALUES (?, false, ?, ?);"
	var userInfo = common.get_info_from_token(request.body.token)
	var authenticated = true
	if (!userInfo || userInfo.groupID != request.params.groupId){
		authenticated = false
	}
	common.perform_query(attributes, placeholders, skeleton, authenticated, null, common.return_truefalse, request, response)
};

exports.create_new_chore = function(request, response) {
	var attributes = ["chore", "due_date", "userID"]
	var placeholders = ["chore", "due_date", "userID", "groupId"]
	var skeleton = "INSERT INTO chores (chore, due_date, chore_complete, user_id, group_id) VALUES (?, ?, false, ?, ?);"
	var userInfo = common.get_info_from_token(request.body.token)
	var authenticated = true
	if (!userInfo || userInfo.groupID != request.params.groupId){
		authenticated = false
	}
	common.perform_query(attributes, placeholders, skeleton, authenticated, null, common.return_truefalse, request, response)
};

exports.create_new_rent_item = function(request, response) {
	var attributes = ["amount", "userID"]
	var placeholders = ["amount", "userID", "groupId"]
	var skeleton = "INSERT INTO rent (rent_amount, rent_paid, user_id, group_id) VALUES (?, false, ?, ?);"
	var userInfo = common.get_info_from_token(request.body.token)
	var authenticated = true
	if (!userInfo || userInfo.groupID != request.params.groupId){
		authenticated = false
	}
	common.perform_query(attributes, placeholders, skeleton, authenticated, null, common.return_truefalse, request, response)
};