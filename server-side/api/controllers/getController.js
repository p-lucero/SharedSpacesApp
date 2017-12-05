'use strict';

var common = require('../models/commonModel.js');

exports.dummy_function = function(request, response) {
	// verifies something or returns something or something as is needed for testing purposes
	// don't actually bother fleshing this out to do anything meaningful
	// you can access this by going to /api/dummy
	response.json(200)
}

exports.get_group_info = function(request, response) {
	var attributes = [] // this query has to progress in stages because there's no good way of meaningfully joining these tables
	var placeholders = ["groupId"]
	var skeleton = "SELECT group_name, id FROM groups WHERE id=?;"
	var userInfo = common.get_info_from_token(request.body.token)
	var authenticated = true
	if (!userInfo || userInfo.groupID != request.params.groupId){
		authenticated = false
	}
	common.perform_query(attributes, placeholders, skeleton, authenticated, {}, function (data, err, task, request, response) {
		if (err){
			response.status(500).send(err);
		}
		else {
			data.group_info = task
			var skeleton = "SELECT id, first_name, last_name, email, phone_number, facebook_profile, twitter_handle, instagram, group_id FROM user_accounts WHERE group_id=?;"
			common.perform_query([], ["groupId"], skeleton, true, data, function (data, err, task, request, response) {
				if (err){
					response.status(500).send(err);
				}
				else {
					data.users = task
					var skeleton = "SELECT * FROM group_debt WHERE group_id=?;"
					common.perform_query([], ["groupId"], skeleton, true, data, function (data, err, task, request, response) {
						if (err){
							response.status(500).send(err);
						}
						else {
							data.debts = task
							response.json(data);
						}
					}, request, response)
				}
			}, request, response)
		}
	}, request, response)
};

exports.get_user_info = function(request, response) {
	var attributes = []
	var placeholders = ["userId"]
	var skeleton = "SELECT id, first_name, last_name, email, phone_number, facebook_profile, twitter_handle, instagram, group_id FROM user_accounts WHERE id=?;"
	var userInfo = common.get_info_from_token(request.body.token)
	var authenticated = true
	if (!userInfo || userInfo.userID != request.params.userId){
		response.status(401).send({url: request.originalUrl + " not allowed for this user, or not signed in"})
	}
	else {
		global.pool.query("SELECT group_id from user_accounts WHERE email=?", [userInfo.email], function(err, task) {
			if (task[0].group_id != userInfo.groupID && request.params.userId != userInfo.userID){
				authenticated = false
			}
			common.perform_query(attributes, placeholders, skeleton, authenticated, null, null, request, response)
		})
	}
};

exports.get_group_debt_list = function(request, response) {
	var attributes = []
	var placeholders = ["groupId"]
	var skeleton = "SELECT * FROM group_debt WHERE group_id=?;"
	var userInfo = common.get_info_from_token(request.body.token)
	var authenticated = true
	if (!userInfo || request.params.groupId != userInfo.groupID){
		authenticated = false
	}
	common.perform_query(attributes, placeholders, skeleton, authenticated, null, null, request, response)
};

exports.get_group_debt_info = function(request, response) {
	var attributes = []
	var placeholders = ["debtId"]
	var skeleton = "SELECT * FROM group_debt WHERE id=?;"
	var userInfo = common.get_info_from_token(request.body.token)
	var authenticated = true
	if (!userInfo || request.params.groupId != userInfo.groupID){
		authenticated = false
	}
	common.perform_query(attributes, placeholders, skeleton, authenticated, null, null, request, response)
};

exports.get_personal_debt_list = function(request, response) {
	var attributes = []
	var placeholders = ["userId", "userId"]
	var skeleton = "SELECT * FROM personal_debts WHERE lender_id=? OR borrower_id=?;"
	var userInfo = common.get_info_from_token(request.body.token)
	var authenticated = true
	if (!userInfo || request.params.userId != userInfo.userID){
		authenticated = false
	}
	common.perform_query(attributes, placeholders, skeleton, authenticated, null, null, request, response)
};

exports.get_personal_debt_info = function(request, response) {
	var attributes = []
	var placeholders = ["debtId"]
	var skeleton = "SELECT * FROM personal_debts WHERE id=?;"
	var userInfo = common.get_info_from_token(request.body.token)
	var authenticated = true
	if (!userInfo){
		authenticated = false
	}
	global.pool.query("SELECT lender_id, borrower_id FROM personal_debts WHERE id=?", [request.params.debtId], function(err, task){
		if (task.length === 0){
			response.status(404).send({url: request.originalUrl + " not found"})
		}
		if (authenticated) {
			if ((task[0].lender_id != request.params.userId || task[0].lender_id != userInfo.userID || request.params.userId != userInfo.userID) && (task[0].borrower_id != request.params.userId || task[0].borrower_id != userInfo.userID || request.params.userId != userInfo.userID)) {
				authenticated = false
			}
		}
		if (task.length !== 0) {
			common.perform_query(attributes, placeholders, skeleton, authenticated, null, null, request, response)
		}
	})
};

exports.get_grocery_list = function(request, response) {
	var attributes = []
	var placeholders = ["groupId"]
	var skeleton = "SELECT * FROM groceries WHERE group_id=?;"
	var userInfo = common.get_info_from_token(request.body.token)
	var authenticated = true
	if (!userInfo || request.params.groupId != userInfo.groupID){
		authenticated = false
	}
	common.perform_query(attributes, placeholders, skeleton, authenticated, null, null, request, response)
};

exports.get_grocery_item = function(request, response) {
	var attributes = []
	var placeholders = ["groceryId"]
	var skeleton = "SELECT * FROM groceries WHERE id=?;"
	var userInfo = common.get_info_from_token(request.body.token)
	var authenticated = true
	if (!userInfo){
		authenticated = false
	}
	global.pool.query("SELECT group_id FROM groceries WHERE id=?", [request.params.groceryId], function(err, task){
		if (task.length === 0){
			response.status(404).send({url: request.originalUrl + " not found"})
		}
		if (authenticated) {
			if (task[0].group_id != request.params.groupId || task[0].group_id != userInfo.groupID || request.params.groupId != userInfo.groupID) {
				authenticated = false
			}
		}
		if (task.length !== 0) {
			common.perform_query(attributes, placeholders, skeleton, authenticated, null, null, request, response)
		}
	})
};

exports.get_chores_list = function(request, response) {
	var attributes = []
	var placeholders = ["groupId"]
	var skeleton = "SELECT * FROM chores WHERE group_id=?;"
	var userInfo = common.get_info_from_token(request.body.token)
	var authenticated = true
	if (!userInfo || request.params.groupId != userInfo.groupID){
		authenticated = false
	}
	common.perform_query(attributes, placeholders, skeleton, authenticated, null, null, request, response)
};

exports.get_chore_info = function(request, response) {
	var attributes = []
	var placeholders = ["choreId"]
	var skeleton = "SELECT * FROM chores WHERE chore_id=?;"
	var userInfo = common.get_info_from_token(request.body.token)
	var authenticated = true
	if (!userInfo || request.params.groupId != userInfo.groupID){
		authenticated = false
	}
	global.pool.query("SELECT group_id FROM chores WHERE id=?", [request.params.choreId], function(err, task){
		if (task.length === 0){
			response.status(404).send({url: request.originalUrl + " not found"})
		}
		if (authenticated) {
			if (task[0].group_id != request.params.groupId || task[0].group_id != userInfo.groupID || request.params.groupId != userInfo.groupID) {
				authenticated = false
			}
		}
		if (task.length !== 0) {
			common.perform_query(attributes, placeholders, skeleton, authenticated, null, null, request, response)
		}
	})
};

exports.get_rent_info = function(request, response) {
	var attributes = []
	var placeholders = ["groupId"]
	var skeleton = "SELECT * FROM rent WHERE group_id=?;"
	var userInfo = common.get_info_from_token(request.body.token)
	var authenticated = true
	if (!userInfo || request.params.groupId != userInfo.groupID){
		authenticated = false
	}
	common.perform_query(attributes, placeholders, skeleton, authenticated, null, null, request, response)
};

// Fire away at this server with the following Python code to beta test things:
// >>> import requests
// >>> r = requests.get(<address, probably localhost or ec2>, data=<dictionary containing lots of fields>)
// >>> r.content

// If this is running on the server, you can also test the routing by accessing SERVERNAME/api/* from outside