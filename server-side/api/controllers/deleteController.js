'use strict';

var mysql = require('mysql');
var common = require('../models/commonModel.js');

exports.delete_group = function(request, result) {
	attributes = []
	placeholders = ["groupID"]
	skeleton = "DELETE FROM groups WHERE id=groupID;"
	specificAuth = true
	common.perform_query(attributes, placeholders, skeleton, specificAuth, request, result)
};

exports.delete_user = function(request, result) {
	attributes = [] 
	placeholders = ["userID"] 
	skeleton = "DELETE FROM users WHERE id=userID;"
	specificAuth = true
	common.perform_query(attributes, placeholders, skeleton, specificAuth, request, result)
};

exports.delete_group_debt = function(request, result) {
	attributes = [] 
	placeholders = ["debtID"] 
	skeleton = "DELETE FROM group_debt WHERE id=debtID;"
	specificAuth = true
	common.perform_query(attributes, placeholders, skeleton, specificAuth, request, result)
};

exports.delete_personal_debt = function(request, result) {
	attributes = []
	placeholders = ["debtID"]
	skeleton = "DELETE FROM personal_debts WHERE id=debtID;"
	specificAuth = true
	common.perform_query(attributes, placeholders, skeleton, specificAuth, request, result)
};

exports.delete_grocery_list = function(request, result) {
	attributes = []
	placeholders = ["groupID"]
	skeleton = "DELETE FROM groceries WHERE group_id=groupID;"
	specificAuth = true
	common.perform_query(attributes, placeholders, skeleton, specificAuth, request, result)
};

exports.delete_grocery_item = function(request, result) {
	attributes = []
	placeholders = ["GgoceryID"]
	skeleton = "DELETE FROM groceries WHERE id=groceryID"
	specificAuth = true
	common.perform_query(attributes, placeholders, skeleton, specificAuth, request, result)
};

exports.delete_chores_list = function(request, result) {
	attributes = []
	placeholders = ["GgoupID"]
	skeleton = "DELETE FROM chores WHERE group_id=groupID"
	specificAuth = true
	common.perform_query(attributes, placeholders, skeleton, specificAuth, request, result)
};

exports.delete_chore_item = function(request, result) {
	attributes = []
	placeholders = ["CcoreID"]
	skeleton = "DELETE FROM chores WHERE id=choreID"
	specificAuth = true
	common.perform_query(attributes, placeholders, skeleton, specificAuth, request, result)
};