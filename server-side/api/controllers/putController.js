'use strict';

var common = require('../models/commonModel.js');

exports.update_group_info = function(request, response) {
	/* Specific auth: check that the user submitting the query is in the group
	UPDATE groups SET name=?, ground_rules=? WHERE id=?
	terrible async chain w/self referential functions & incrementation
	SELECT id FROM users WHERE group_id=?
	find the items that are in group but not in update
	find the items that are in update but not in group
	for the former:
	UPDATE users SET group_id=null WHERE id=? OR id=?... as needed
	for the latter:
	UPDATE users SET group_id=? WHERE id=? OR id=?... as needed
	structure of users in submission is as yet unknown */
	var attributes = ["groupName", "groundRules", "users"]
	var placeholders = ["groupName", "groundRules", "groupId"]
	var skeleton = "UPDATE groups SET group_name=?, ground_rules=? WHERE id=?"
	var userInfo = common.get_info_from_token(token)
	var authenticated = true
	if (!userInfo || userInfo.groupID != request.params.groupId){
		authenticated = false
	}
	global.pool.query("SELECT * FROM groups WHERE id=?", [request.params.groupId], function(err, task){
		if (task.length === 0){
			response.status(404).send({url: request.originalUrl + " not found"})
		}
		else if (request.params.groupId != userInfo.groupID) {
			authenticated = false
		}
		else {
			common.perform_query(attributes, placeholders, skeleton, authenticated, null, function(data, err, task, request, response){
				if (err){
					response.status(500).send(err)
				}
				else {
					common.perform_query([], ["groupId"], "SELECT id FROM users WHERE group_id=?", authenticated, null, function(data, err, task, request, response) {
						let toBeCleared = []
						let toBeUpdated = []
						let inGroupUsers = []
						let inUpdateUsers = request.body.users
						for (let i = 0; i < task.length; i++){
							inGroupUsers.push(task[i].id)
						}
						let allUsers = [...new Set([...inUpdateUsers, ...inGroupUsers])]
						for (let user of allUsers){
							if (inGroupUsers.indexOf(user) > -1 && !inUpdateUsers.indexOf(user) > -1){
								toBeCleared.push(user)
							}
							else if (!inGroupUsers.indexOf(user) > -1 && inUpdateUsers.indexOf(user) > -1){
								toBeUpdated.push(user)
							}
						}
						if (toBeCleared.length > 0){
							let skeleton = "UPDATE users SET group_id=null WHERE id=?"
							for (let i = 1; i < toBeCleared.length; i++){
								skeleton += " OR id=?"
							}
							global.pool.query(skeleton, toBeCleared, function(err, task){
								if (err){
									response.status(500).send(err)
								}
							})
						}
						if (toBeUpdated.length > 0){
							toBeUpdated.unshift(request.params.groupId)
							let skeleton = "UPDATE users SET group_id=null WHERE id=?"
							for (let j = 1; j < toBeCleared.length; j++){
								skeleton += " OR id=?"
							}
							global.pool.query(skeleton, toBeCleared, function(err, task){
								if (err){
									response.status(500).send(err)
								}
							})
						}
						if (!response.headersSent){
							response.json(200)
						}
					}
					, request, response)
				}
			}
			, request, response)
		}
	})
};

exports.update_user_info = function(request, response) {
	var attributes = ["first", "last", "email", "password", "phoneNumber", "facebook", "twitter", "instagram", "groupID"]
	var placeholders = ["first", "last", "email", "password", "phoneNumber", "facebook", "twitter", "instagram", "groupID", "userId"]
	var skeleton = "UPDATE user_accounts SET first_name=?, last_name=?, email=?, password=?, phone_number=?, facebook_profile=?, twitter_handle=?, instagram=?, group_id=? WHERE id=?;"
	var userInfo = common.get_info_from_token(token)
	var authenticated = true
	if (!userInfo || userInfo.userID != request.params.userId){
		authenticated = false
	}
	common.perform_query(attributes, placeholders, skeleton, authenticated, null, common.return_truefalse, request, response)
}

exports.update_group_debt = function(request, response) {
	var attributes = ["debtType", "amount"]
	var placeholders = ["debtType", "amount", "groupId", "debtId"]
	var skeleton = "UPDATE group_debt SET debt_type=?, amount=?, group_id=? WHERE id=?;"
	var userInfo = common.get_info_from_token(token)
	var authenticated = true
	if (!userInfo){
		authenticated = false
	}
	global.pool.query("SELECT group_id FROM group_debt WHERE id=?", [request.params.debtId], function(err, task){
		if (task.length === 0){
			response.status(404).send({url: request.originalUrl + " not found"})
		}
		else if (task[0].group_id != request.params.groupId || task[0].group_id != userInfo.groupID || request.params.groupId != userInfo.groupID) {
			authenticated = false
		}
		else {
			common.perform_query(attributes, placeholders, skeleton, authenticated, null, common.return_truefalse, request, response)
		}
	})
};

exports.update_personal_debt = function(request, response) {
	var attributes = ["amount", "lenderID", "borrowerID"]
	var placeholders = ["amount", "lenderID", "borrowerID", "debtId"]
	var skeleton = "UPDATE personal_debts SET amount=?, lender_id=?, borrower_id=? where id=?;"
	var userInfo = common.get_info_from_token(token)
	var authenticated = true
	if (!userInfo || (userInfo.userID != request.params.lenderID && userInfo.userID != request.params.borrowerID)){
		authenticated = false
	}
	global.pool.query("SELECT * FROM personal_debts WHERE id=?", [request.params.debtId], function(err, task){
		if (task.length === 0){
			response.status(404).send({url: request.originalUrl + " not found"})
		}
		else {
			common.perform_query(attributes, placeholders, skeleton, authenticated, null, common.return_truefalse, request, response)
		}
	})
};

exports.update_grocery_item = function(request, response) {
	var attributes = ["amount", "paid", "userID"]
	var placeholders = ["amount", "paid", "userID", "groupId", "groceryId"]
	var skeleton = "UPDATE groceries SET amount_due=?, paid_status=?, user_id=?, group_id=? WHERE id=?;"
	var userInfo = common.get_info_from_token(token)
	var authenticated = true
	if (!userInfo){
		authenticated = false
	}
	global.pool.query("SELECT group_id FROM groceries WHERE id=?", [request.params.groceryId], function(err, task){
		if (task.length === 0){
			response.status(404).send({url: request.originalUrl + " not found"})
		}
		else if (task[0].group_id != request.params.groupId || task[0].group_id != userInfo.groupID || request.params.groupId != userInfo.groupID) {
			authenticated = false
		}
		else {
			common.perform_query(attributes, placeholders, skeleton, authenticated, null, common.return_truefalse, request, response)
		}
	})
};

exports.update_chore_item = function(request, response) {
	var attributes = ["chore", "duedate", "complete", "userID"]
	var placeholders = ["chore", "duedate", "complete", "userID", "groupId", "choreId"]
	var skeleton = "UPDATE chores SET chore=?, due_date=?, chore_complete=?, user_id=?, group_id=? WHERE id=?;"
	var userInfo = common.get_info_from_token(token)
	var authenticated = true
	if (!userInfo){
		authenticated = false
	}
	global.pool.query("SELECT group_id FROM chores WHERE id=?", [request.params.choreId], function(err, task){
		if (task.length === 0){
			response.status(404).send({url: request.originalUrl + " not found"})
		}
		else if (task[0].group_id != request.params.groupId || task[0].group_id != userInfo.groupID || request.params.groupId != userInfo.groupID) {
			authenticated = false
		}
		else {
			common.perform_query(attributes, placeholders, skeleton, authenticated, null, common.return_truefalse, request, response)
		}
	})
};

exports.update_rent_info = function(request, response) {
	var attributes = ["amount", "paid", "userID"]
	var placeholders = ["amount", "paid", "userID", "groupId"]
	var skeleton = "UPDATE rent SET rent_amount=?, rent_paid=?, user_id=? WHERE group_id=?;"
	var userInfo = common.get_info_from_token(token)
	var authenticated = true
	if (!userInfo || userInfo.groupID != request.params.groupId){
		authenticated = false
	}
	global.pool.query("SELECT * FROM rent WHERE group_id=?", [request.params.groupId], function(err, task){
		if (task.length === 0){
			response.status(404).send({url: request.originalUrl + " not found"})
		}
		else if (task[0].group_id != request.params.groupId || task[0].group_id != userInfo.groupID || request.params.groupId != userInfo.groupID) {
			authenticated = false
		}
		else {
			common.perform_query(attributes, placeholders, skeleton, authenticated, null, common.return_truefalse, request, response)
		}
	})
};