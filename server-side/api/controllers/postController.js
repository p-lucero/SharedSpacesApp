'use strict';

var mysql = require('mysql');
var common = require('../models/commonModel.js');

exports.create_new_group = function(request, result){
	attributes = ["groupName"]
	placeholders = ["groupName"]
	skeleton = "INSERT INTO groups (group_name) VALUES ('groupName')"
	specificAuth = true
	common.perform_query(attributes, placeholders, skeleton, specificAuth, request, result)
};

exports.create_new_user = function(request, result) {
	attributes = ["first_name, last_name, email, password"]
	placeholders = [""]
	skeleton = "INSERT INTO user_accounts (first_name, last_name, email, password, phone_number, facebook_profile, twitter_handle, instagram, group_id)\
	VALUES (first, last, _email, pw, phoneNumber, facebook, twitter, insta, groupID)"
	specificAuth = true // this doesn't need to be fixed; anyone should be able to create user accounts without any specific authentication
	common.perform_query(attributes, placeholders, skeleton, specificAuth, request, result)
};

exports.create_group_debt = function(request, result) {
	attributes = []
	placeholders = []
	skeleton = ""
	specificAuth = true
	common.perform_query(attributes, placeholders, skeleton, specificAuth, request, result)
};

exports.create_new_personal_debt = function(request, result) {
	attributes = []
	placeholders = []
	skeleton = ""
	specificAuth = true
	common.perform_query(attributes, placeholders, skeleton, specificAuth, request, result)
};

exports.create_new_grocery_item = function(request, result) {
	attributes = []
	placeholders = []
	skeleton = ""
	specificAuth = true
	common.perform_query(attributes, placeholders, skeleton, specificAuth, request, result)
};

exports.create_new_chore = function(request, result) {
	attributes = []
	placeholders = []
	skeleton = ""
	specificAuth = true
	common.perform_query(attributes, placeholders, skeleton, specificAuth, request, result)
};

exports.create_new_rent_item = function(request, result) {
	attributes = []
	placeholders = []
	skeleton = ""
	specificAuth = true
	common.perform_query(attributes, placeholders, skeleton, specificAuth, request, result)
};