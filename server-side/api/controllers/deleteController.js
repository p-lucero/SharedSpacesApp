'use strict';

var mysql = require('mysql');
var common = require('../models/commonModel.js');

exports.delete_group = function(request, result) {
	attributes = []
	placeholders = ["GroupID"]
	skeleton = "DELETE FROM groups WHERE id=GroupID;"
	specificAuth = true
	common.perform_query(attributes, placeholders, skeleton, specificAuth, request, result)
};

exports.delete_user = function(request, result) {
	attributes = [] 
	placeholders = ["userID"] 
	skeleton = "DELETE FROM users WHERE id=UserID;"
	specificAuth = true
	common.perform_query(attributes, placeholders, skeleton, specificAuth, request, result)
};

exports.delete_group_debt = function(request, result) {
	attributes = [] 
	placeholders = ["DebtID"] 
	skeleton = "DELETE FROM group_debt WHERE id=DebtID;"
	specificAuth = true
	common.perform_query(attributes, placeholders, skeleton, specificAuth, request, result)
};

exports.delete_personal_debt = function(request, result) {
	attributes = []
	placeholders = ["DebtID"]
	skeleton = "DELETE FROM personal_debts WHERE id=DebtID;"
	specificAuth = true
	common.perform_query(attributes, placeholders, skeleton, specificAuth, request, result)
};

exports.delete_grocery_list = function(request, result) {
	attributes = []
	placeholders = ["GroupID"]
	skeleton = "DELETE FROM groceries WHERE group_id=GroupID;"
	specificAuth = true
	common.perform_query(attributes, placeholders, skeleton, specificAuth, request, result)
};

exports.delete_grocery_item = function(request, result) {
	attributes = []
	placeholders = ["GroceryID"]
	skeleton = "DELETE FROM groceries WHERE id=GroceryID"
	specificAuth = true
	common.perform_query(attributes, placeholders, skeleton, specificAuth, request, result)
};

exports.delete_chores_list = function(request, result) {
	attributes = []
	placeholders = ["GroupID"]
	skeleton = "DELETE FROM chores WHERE group_id=GroupID"
	specificAuth = true
	common.perform_query(attributes, placeholders, skeleton, specificAuth, request, result)
};

exports.delete_chore_item = function(request, result) {
	attributes = []
	placeholders = ["ChoreID"]
	skeleton = "DELETE FROM chores WHERE id=ChoreID"
	specificAuth = true
	common.perform_query(attributes, placeholders, skeleton, specificAuth, request, result)
};