'use strict';

var common = require('../models/commonModel.js');

exports.delete_group = function(request, response) {
	var attributes = []
	var placeholders = ["groupId"]
	var skeleton = "DELETE FROM groups WHERE id=?;"
	var specificAuth = true
	common.perform_query(attributes, placeholders, skeleton, specificAuth, null, common.return_truefalse, request, response)
};

exports.delete_user = function(request, response) {
	var attributes = [] 
	var placeholders = ["userId"] 
	var skeleton = "DELETE FROM users WHERE id=?;"
	var email = common.get_email_from_token
	common.perform_query(attributes, placeholders, skeleton, specificAuth, null, common.return_truefalse, request, response)
	for (let cachedLogin of global.loginCache) {
		if (cachedLogin.email === email){
			global.loginCache.splice(global.loginCache.indexOf(cachedLogin), 1) // log out user from everywhere since their account has been deleted
		}
	}
};

exports.delete_group_debt = function(request, response) {
	var attributes = [] 
	var placeholders = ["debtId"] 
	var skeleton = "DELETE FROM group_debt WHERE id=?;"
	var specificAuth = true
	common.perform_query(attributes, placeholders, skeleton, specificAuth, null, common.return_truefalse, request, response)
};

exports.delete_personal_debt = function(request, response) {
	var attributes = []
	var placeholders = ["debtId"]
	var skeleton = "DELETE FROM personal_debts WHERE id=?;"
	var specificAuth = true
	common.perform_query(attributes, placeholders, skeleton, specificAuth, null, common.return_truefalse, request, response)
};

exports.delete_grocery_list = function(request, response) {
	var attributes = []
	var placeholders = ["groupId"]
	var skeleton = "DELETE FROM groceries WHERE group_id=?;"
	var specificAuth = true
	common.perform_query(attributes, placeholders, skeleton, specificAuth, null, common.return_truefalse, request, response)
};

exports.delete_grocery_item = function(request, response) {
	var attributes = []
	var placeholders = ["groceryId"]
	var skeleton = "DELETE FROM groceries WHERE id=?"
	var specificAuth = true
	common.perform_query(attributes, placeholders, skeleton, specificAuth, null, common.return_truefalse, request, response)
};

exports.delete_chores_list = function(request, response) {
	var attributes = []
	var placeholders = ["groupId"]
	var skeleton = "DELETE FROM chores WHERE group_id=?"
	var specificAuth = true
	common.perform_query(attributes, placeholders, skeleton, specificAuth, null, common.return_truefalse, request, response)
};

exports.delete_chore_item = function(request, response) {
	var attributes = []
	var placeholders = ["choreId"]
	var skeleton = "DELETE FROM chores WHERE id=?"
	var specificAuth = true
	common.perform_query(attributes, placeholders, skeleton, specificAuth, null, common.return_truefalse, request, response)
};