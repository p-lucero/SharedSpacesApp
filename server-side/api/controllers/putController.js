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
	skeleton = "UPDATE "
	specificAuth = true
	common.perform_query(attributes, placeholders, skeleton, specificAuth, request, response)
};

exports.update_user_info = function(request, response) {
	attributes = []
	placeholders = []
	skeleton = ""
	specificAuth = true
	common.perform_query(attributes, placeholders, skeleton, specificAuth, request, response)
};

exports.update_group_debt = function(request, response) {
	attributes = []
	placeholders = []
	skeleton = ""
	specificAuth = true
	common.perform_query(attributes, placeholders, skeleton, specificAuth, request, response)
};

exports.update_personal_debt = function(request, response) {
	attributes = []
	placeholders = []
	skeleton = ""
	specificAuth = true
	common.perform_query(attributes, placeholders, skeleton, specificAuth, request, response)
};

exports.update_grocery_list = function(request, response) {
	attributes = []
	placeholders = []
	skeleton = ""
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

exports.update_chores_list = function(request, response) {
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