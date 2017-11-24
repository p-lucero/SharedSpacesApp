'use strict';

var mysql = require('mysql');
var common = require('../models/commonModel.js');

exports.delete_group = function(request, result) {
	attributes = []
	placeholders = ["groupId"]
	skeleton = "DELETE FROM groups WHERE id=groupId;"
	specificAuth = true
	common.perform_query(attributes, placeholders, skeleton, specificAuth, request, result)
};

exports.delete_user = function(request, result) {
	attributes = [] 
	placeholders = ["userId"] 
	skeleton = "DELETE FROM users WHERE id=userId;"
	specificAuth = true
	common.perform_query(attributes, placeholders, skeleton, specificAuth, request, result)
};

exports.delete_group_debt = function(request, result) {
	attributes = [] 
	placeholders = ["debtId"] 
	skeleton = "DELETE FROM group_debt WHERE id=debtId;"
	specificAuth = true
	common.perform_query(attributes, placeholders, skeleton, specificAuth, request, result)
};

exports.delete_personal_debt = function(request, result) {
	attributes = []
	placeholders = ["debtId"]
	skeleton = "DELETE FROM personal_debts WHERE id=debtId;"
	specificAuth = true
	common.perform_query(attributes, placeholders, skeleton, specificAuth, request, result)
};

exports.delete_grocery_list = function(request, result) {
	attributes = []
	placeholders = ["groupId"]
	skeleton = "DELETE FROM groceries WHERE group_id=groupId;"
	specificAuth = true
	common.perform_query(attributes, placeholders, skeleton, specificAuth, request, result)
};

exports.delete_grocery_item = function(request, result) {
	attributes = []
	placeholders = ["groceryId"]
	skeleton = "DELETE FROM groceries WHERE id=groceryId"
	specificAuth = true
	common.perform_query(attributes, placeholders, skeleton, specificAuth, request, result)
};

exports.delete_chores_list = function(request, result) {
	attributes = []
	placeholders = ["groupId"]
	skeleton = "DELETE FROM chores WHERE group_id=groupId"
	specificAuth = true
	common.perform_query(attributes, placeholders, skeleton, specificAuth, request, result)
};

exports.delete_chore_item = function(request, result) {
	attributes = []
	placeholders = ["choreId"]
	skeleton = "DELETE FROM chores WHERE id=choreId"
	specificAuth = true
	common.perform_query(attributes, placeholders, skeleton, specificAuth, request, result)
};