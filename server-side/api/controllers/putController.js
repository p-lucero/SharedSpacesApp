'use strict';

var common = require('../models/commonModel.js');

exports.update_group_info = function(request, response) {
	/* Specific auth: check that the user submitting the query is in the group
	UPDATE groups SET name=?, ground_rules=? WHERE id=?
	terrible async chain w/self referential functions & incrementation
	SELECT id FROM users WHERE group_id=?
	find the items that are in group but not in update
	find the items that are in update but not in group
	for the former:
	UPDATE users SET group_id=null WHERE id=? OR id=?... as needed
	for the latter:
	UPDATE users SET group_id=? WHERE id=? OR id=?... as needed
	structure of users in submission is as yet unknown */
	var attributes = []
	var placeholders = []
	var skeleton = "SELECT 1;"
	var authenticated = true
	common.perform_query(attributes, placeholders, skeleton, authenticated, null, common.return_truefalse, request, response)
};

exports.update_user_info = function(request, response) {
	var attributes = ["first", "last", "email", "password", "phoneNumber", "facebook", "twitter", "instagram", "groupID"]
	var placeholders = ["first", "last", "email", "password", "phoneNumber", "facebook", "twitter", "instagram", "groupID", "userId"]
	var skeleton = "UPDATE user_accounts SET first_name=?, last_name=?, email=?, password=?, phone_number=?, facebook_profile=?, twitter_handle=?, instagram=?, group_id=? WHERE id=?;"
	var authenticated = true
	common.perform_query(attributes, placeholders, skeleton, authenticated, null, common.return_truefalse, request, response)
}

exports.update_group_debt = function(request, response) {
	var attributes = ["debtType", "amount"]
	var placeholders = ["debtType", "amount", "groupId", "debtId"]
	var skeleton = "UPDATE group_debt SET debt_type=?, amount=?, group_id=? WHERE id=?;"
	var authenticated = true
	common.perform_query(attributes, placeholders, skeleton, authenticated, null, common.return_truefalse, request, response)
};

exports.update_personal_debt = function(request, response) {
	var attributes = ["amount", "lenderID", "borrowerID"]
	var placeholders = ["amount", "lenderID", "borrowerID", "debtId"]
	var skeleton = "UPDATE personal_debts SET amount=?, lender_id=?, borrower_id=? where id=?;"
	var authenticated = true
	common.perform_query(attributes, placeholders, skeleton, authenticated, null, common.return_truefalse, request, response)
};

exports.update_grocery_item = function(request, response) {
	var attributes = ["amount", "paid", "userID"]
	var placeholders = ["amount", "paid", "userID", "groupId", "groceryId"]
	var skeleton = "UPDATE groceries SET amount_due=?, paid_status=?, user_id=?, group_id=? WHERE id=?;"
	var authenticated = true
	common.perform_query(attributes, placeholders, skeleton, authenticated, null, common.return_truefalse, request, response)
};

exports.update_chore_item = function(request, response) {
	var attributes = ["chore", "duedate", "complete", "userID"]
	var placeholders = ["chore", "duedate", "complete", "userID", "groupId", "choreId"]
	var skeleton = "UPDATE chores SET chore=?, due_date=?, chore_complete=?, user_id=?, group_id=? WHERE id=?;"
	var authenticated = true
	common.perform_query(attributes, placeholders, skeleton, authenticated, null, common.return_truefalse, request, response)
};

exports.update_rent_info = function(request, response) {
	var attributes = ["amount", "paid", "userID"]
	var placeholders = ["amount", "paid", "userID", "groupId"]
	var skeleton = "UPDATE rent SET rent_amount=?, rent_paid=?, user_id=? WHERE group_id=?;"
	var authenticated = true
	common.perform_query(attributes, placeholders, skeleton, authenticated, null, common.return_truefalse, request, response)
};