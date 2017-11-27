'use strict';

var mysql = require('mysql');
var common = require('../models/commonModel.js');

exports.delete_group = function(request, response) {
	attributes = []
	placeholders = ["groupId"]
	skeleton = "DELETE FROM groups WHERE id=?;"
	specificAuth = true
	common.perform_query(attributes, placeholders, skeleton, specificAuth, null, common.return_truefalse, request, response)
};

exports.delete_user = function(request, response) {
	attributes = [] 
	placeholders = ["userId"] 
	skeleton = "DELETE FROM users WHERE id=?;"
	specificAuth = true
	common.perform_query(attributes, placeholders, skeleton, specificAuth, null, common.return_truefalse, request, response)
};

exports.delete_group_debt = function(request, response) {
	attributes = [] 
	placeholders = ["debtId"] 
	skeleton = "DELETE FROM group_debt WHERE id=?;"
	specificAuth = true
	common.perform_query(attributes, placeholders, skeleton, specificAuth, null, common.return_truefalse, request, response)
};

exports.delete_personal_debt = function(request, response) {
	attributes = []
	placeholders = ["debtId"]
	skeleton = "DELETE FROM personal_debts WHERE id=?;"
	specificAuth = true
	common.perform_query(attributes, placeholders, skeleton, specificAuth, null, common.return_truefalse, request, response)
};

exports.delete_grocery_list = function(request, response) {
	attributes = []
	placeholders = ["groupId"]
	skeleton = "DELETE FROM groceries WHERE group_id=?;"
	specificAuth = true
	common.perform_query(attributes, placeholders, skeleton, specificAuth, null, common.return_truefalse, request, response)
};

exports.delete_grocery_item = function(request, response) {
	attributes = []
	placeholders = ["groceryId"]
	skeleton = "DELETE FROM groceries WHERE id=?"
	specificAuth = true
	common.perform_query(attributes, placeholders, skeleton, specificAuth, null, common.return_truefalse, request, response)
};

exports.delete_chores_list = function(request, response) {
	attributes = []
	placeholders = ["groupId"]
	skeleton = "DELETE FROM chores WHERE group_id=?"
	specificAuth = true
	common.perform_query(attributes, placeholders, skeleton, specificAuth, null, common.return_truefalse, request, response)
};

exports.delete_chore_item = function(request, response) {
	attributes = []
	placeholders = ["choreId"]
	skeleton = "DELETE FROM chores WHERE id=?"
	specificAuth = true
	common.perform_query(attributes, placeholders, skeleton, specificAuth, null, common.return_truefalse, request, response)
};