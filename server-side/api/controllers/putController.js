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
	placeholders = ["groupId"]
	skeleton = ""
	specificAuth = true
	common.perform_query(attributes, placeholders, skeleton, specificAuth, request, response)
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
	attributes = ["_first", "_last", "_email", "pw", "phoneNumber", "_facebook", "_insta", "_twitter", "groupID"]
	placeholders = ["_first", "_last", "_email", "pw", "phoneNumber", "_facebook", "_insta", "_twitter", "groupID", "userId"]	
	request.body._email = request.body.email // deal with name shadowing
	request.body.pw = request.body.password
	request.body._insta = request.body.instagram
	request.body._facebook = request.body.facebook
	request.body._twitter = request.body.twitter
	request.body._first = request.body.first
	request.body._last = request.body.last
	skeleton = "UPDATE user_accounts SET first_name=_first, last_name=_last, email=_email, password=pw, phone_number=phoneNumber, \
	facebook_profile=_facebook, twitter_handle=_twitter, instagram=_insta, group_id=groupID WHERE id=userId"
	specificAuth = true
	common.perform_query(attributes, placeholders, skeleton, specificAuth, request, response)
}

exports.update_group_debt = function(request, response) {
	attributes = ["debtType", "_amount"]
	placeholders = ["debtType", "_amount", "groupId", "debtId"]
	request.body._amount = request.body.amount
	skeleton = "UPDATE group_debt SET debt_type=debtType, amount=_amount, group_id=groupId WHERE id=debtId"
	specificAuth = true
	common.perform_query(attributes, placeholders, skeleton, specificAuth, request, response)
};

exports.update_personal_debt = function(request, response) {
	attributes = ["_amount", "lenderID", "borrowerID"]
	placeholders = ["_amount", "lenderID", "borrowerID", "debtId"]
	request.body._amount = request.body.amount
	skeleton = "UPDATE personal_debts SET amount=_amount, lender_id=lenderID, borrower_id=borrowerID where id=debtId"
	specificAuth = true
	common.perform_query(attributes, placeholders, skeleton, specificAuth, request, response)
};

exports.update_grocery_item = function(request, response) {
	attributes = []
	placeholders = []
	skeleton = ""
	specificAuth = true
	common.perform_query(attributes, placeholders, skeleton, specificAuth, request, response)
};

exports.update_chore_item = function(request, response) {
	attributes = []
	placeholders = []
	skeleton = ""
	specificAuth = true
	common.perform_query(attributes, placeholders, skeleton, specificAuth, request, response)
};

exports.update_rent_info = function(request, response) {
	attributes = []
	placeholders = []
	skeleton = ""
	specificAuth = true
	common.perform_query(attributes, placeholders, skeleton, specificAuth, request, response)
};