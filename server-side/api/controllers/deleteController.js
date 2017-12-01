'use strict';

var common = require('../models/commonModel.js');

exports.delete_group = function(request, response) {
	var attributes = []
	var placeholders = ["groupId"]
	var skeleton = "DELETE FROM groups WHERE id=?;"
	var userInfo = common.get_info_from_token(request.body.token)
	var authenticated = true
	if (!userInfo || userInfo.groupID != request.params.groupId){
		authenticated = false
	}
	common.perform_query(attributes, placeholders, skeleton, authenticated, null, common.return_truefalse, request, response)
};

exports.delete_user = function(request, response) {
	var attributes = [] 
	var placeholders = ["userId"] 
	var skeleton = "DELETE FROM user_accounts WHERE id=?;"
	var userInfo = common.get_info_from_token(request.body.token)
	var authenticated = true;
	if (!userInfo || userInfo.userID != request.params.userId){
		authenticated = false
	}
	common.perform_query(attributes, placeholders, skeleton, authenticated, null, function(data, err, task, request, response){
		for (let cachedLogin of global.loginCache) {
			if (cachedLogin.email === email){
				global.loginCache.splice(global.loginCache.indexOf(cachedLogin), 1) // log out user from everywhere since their account has been deleted
			}
		}
		common.return_truefalse(data, err, task, request, response)
	}
	, request, response)
};

exports.delete_group_debt = function(request, response) {
	var attributes = [] 
	var placeholders = ["debtId"] 
	var skeleton = "DELETE FROM group_debt WHERE id=?;"
	var userInfo = common.get_info_from_token(request.body.token)
	var authenticated = true
	if (!userInfo){
		authenticated = false
	}
	global.pool.query("SELECT group_id FROM group_debt WHERE id=?", [request.params.debtId], function(err, task){
		if (task.length === 0){
			request.status(404).send({url: request.originalUrl + " not found"})
		}
		else if (task[0].group_id != request.params.groupId || task[0].group_id != userInfo.groupID || request.params.groupId != userInfo.groupID) {
			authenticated = false
		}
		else {
			common.perform_query(attributes, placeholders, skeleton, authenticated, null, common.return_truefalse, request, response)
		}
	})
};

exports.delete_personal_debt = function(request, response) {
	var attributes = []
	var placeholders = ["debtId"]
	var skeleton = "DELETE FROM personal_debts WHERE id=?;"
	var userInfo = common.get_info_from_token(request.body.token)
	var authenticated = true
	if (!userInfo){
		authenticated = false
	}
	global.pool.query("SELECT group_id FROM personal_debts WHERE id=?", [request.params.debtId], function(err, task){
		if (task.length === 0){
			request.status(404).send({url: request.originalUrl + " not found"})
		}
		else if (task[0].group_id != request.params.groupId || task[0].group_id != userInfo.groupID || request.params.groupId != userInfo.groupID) {
			authenticated = false
		}
		else {
			common.perform_query(attributes, placeholders, skeleton, authenticated, null, common.return_truefalse, request, response)
		}
	})
};

exports.delete_grocery_list = function(request, response) {
	var attributes = []
	var placeholders = ["groupId"]
	var skeleton = "DELETE FROM groceries WHERE group_id=?;"
	var userInfo = common.get_info_from_token(request.body.token)
	var authenticated = true
	if (!userInfo || userInfo.groupID != request.params.groupId){
		authenticated = false
	}
	common.perform_query(attributes, placeholders, skeleton, authenticated, null, common.return_truefalse, request, response)
};

exports.delete_grocery_item = function(request, response) {
	var attributes = []
	var placeholders = ["groceryId"]
	var skeleton = "DELETE FROM groceries WHERE id=?"
	var userInfo = common.get_info_from_token(request.body.token)
	var authenticated = true
	if (!userInfo){
		authenticated = false
	}
	global.pool.query("SELECT group_id FROM groceries WHERE id=?", [request.params.groceryId], function(err, task){
		if (task.length === 0){
			request.status(404).send({url: request.originalUrl + " not found"})
		}
		else if (task[0].group_id != request.params.groupId || task[0].group_id != userInfo.groupID || request.params.groupId != userInfo.groupID) {
			authenticated = false
		}
		else {
			common.perform_query(attributes, placeholders, skeleton, authenticated, null, common.return_truefalse, request, response)
		}
	})
};

exports.delete_chores_list = function(request, response) {
	var attributes = []
	var placeholders = ["groupId"]
	var skeleton = "DELETE FROM chores WHERE group_id=?"
	var userInfo = common.get_info_from_token(request.body.token)
	var authenticated = true
	if (!userInfo || userInfo.groupID != request.params.groupId){
		authenticated = false
	}
	common.perform_query(attributes, placeholders, skeleton, authenticated, null, common.return_truefalse, request, response)
};

exports.delete_chore_item = function(request, response) {
	var attributes = []
	var placeholders = ["choreId"]
	var skeleton = "DELETE FROM chores WHERE id=?"
	var userInfo = common.get_info_from_token(request.body.token)
	var authenticated = true
	if (!userInfo){
		authenticated = false
	}	
	global.pool.query("SELECT group_id FROM chores WHERE id=?", [request.params.choreId], function(err, task){
		if (task.length === 0){
			request.status(404).send({url: request.originalUrl + " not found"})
		}
		else if (task[0].group_id != request.params.groupId || task[0].group_id != userInfo.groupID || request.params.groupId != userInfo.groupID) {
			authenticated = false
		}
		else {
			common.perform_query(attributes, placeholders, skeleton, authenticated, null, common.return_truefalse, request, response)
		}
	})
};