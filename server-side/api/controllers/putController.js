'use strict';

var mysql = require('mysql');
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

exports.update_group_info = function(request, response) {
	attributes = []
	placeholders = []
	skeleton = "SELECT 1;"
	specificAuth = true
	common.perform_query(attributes, placeholders, skeleton, specificAuth, null, common.return_truefalse, request, response)
};

/*
exports.update_user_info = function(request, response) {
	attributes = []
	placeholders = []	
	request.body._email = request.body.email // deal with name shadowing
	request.body.pw = request.body.password
	request.body._insta = request.body.instagram
	request.body._facebook = request.body.facebook
	request.body._twitter = request.body.twitter
	request.body._first = request.body.first
	request.body._last = request.body.last
	possible_attributes = {"first_name":"_first", "last_name":"_last", "email":"_email", "password":"pw",
	"phone_number":"phoneNumber", "facebook_profile":"_facebook", "twitter_handle":"_twitter", "instagram":"_insta", "group_id":"groupID"}
	skeleton = "UPDATE user_accounts SET "
	for (attr in possible_attributes) {
		if (typeof(request.body[possible_attributes[attr]]) !== "undefined"){ // see if the updated data contains this attribute
			skeleton += attr
			skeleton += "="
			skeleton += request.body[possible_attributes[attr]]
		}
	}
	if (!skeleton.contains("=")) {
		response.status(400).send({url: request.originalUrl + " received a badly formatted request"})
	}
	else {
		skeleton = skeleton.slice(0, -1);
		skeleton += " WHERE id = userId"
		specificAuth = true
		common.perform_query(attributes, placeholders, skeleton, specificAuth, request, response)
	}
};
*/

/*
Simpler implementation of the above in the case where unchanged data is also sent to the server rather than just deltas.
Enable or disable as needed.
*/

exports.update_user_info = function(reqeust, response) {
	attributes = ["first", "last", "email", "password", "phoneNumber", "facebook", "twitter", "instagram", "groupID"]
	placeholders = ["first", "last", "email", "password", "phoneNumber", "facebook", "twitter", "instagram", "groupID", "userId"]
	skeleton = "UPDATE user_accounts SET first_name=?, last_name=?, email=?, password=?, phone_number=?, facebook_profile=?, twitter_handle=?, instagram=?, group_id=? WHERE id=?;"
	specificAuth = true
	common.perform_query(attributes, placeholders, skeleton, specificAuth, null, common.return_truefalse, request, response)
}

exports.update_group_debt = function(request, response) {
	attributes = ["debtType", "amount"]
	placeholders = ["debtType", "amount", "groupId", "debtId"]
	skeleton = "UPDATE group_debt SET debt_type=?, amount=?, group_id=? WHERE id=?;"
	specificAuth = true
	common.perform_query(attributes, placeholders, skeleton, specificAuth, null, common.return_truefalse, request, response)
};

exports.update_personal_debt = function(request, response) {
	attributes = ["amount", "lenderID", "borrowerID"]
	placeholders = ["amount", "lenderID", "borrowerID", "debtId"]
	skeleton = "UPDATE personal_debts SET amount=?, lender_id=?, borrower_id=? where id=?;"
	specificAuth = true
	common.perform_query(attributes, placeholders, skeleton, specificAuth, null, common.return_truefalse, request, response)
};

exports.update_grocery_item = function(request, response) {
	attributes = ["amount", "paid", "userID"]
	placeholders = ["amount", "paid", "userID", "groupId", "groceryId"]
	skeleton = "UPDATE groceries SET amount_due=?, paid_status=?, user_id=?, group_id=? WHERE id=?;"
	specificAuth = true
	common.perform_query(attributes, placeholders, skeleton, specificAuth, null, common.return_truefalse, request, response)
};

exports.update_chore_item = function(request, response) {
	attributes = ["chore", "duedate", "complete", "userID"]
	placeholders = ["chore", "duedate", "complete", "userID", "groupId", "choreId"]
	skeleton = "UPDATE chores SET chore=?, due_date=?, chore_complete=?, user_id=?, group_id=? WHERE id=?;"
	specificAuth = true
	common.perform_query(attributes, placeholders, skeleton, specificAuth, null, common.return_truefalse, request, response)
};

exports.update_rent_info = function(request, response) {
	attributes = ["amount", "paid", "userID"]
	placeholders = ["amount", "paid", "userID", "groupId"]
	skeleton = "UPDATE rent SET rent_amount=?, rent_paid=?, user_id=? WHERE group_id=?;"
	specificAuth = true
	common.perform_query(attributes, placeholders, skeleton, specificAuth, null, common.return_truefalse, request, response)
};