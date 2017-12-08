'use strict';
module.exports = function(app) {
	var getController = require('../controllers/getController.js');
	var putController = require('../controllers/putController.js');
	var postController = require('../controllers/postController.js');
	var deleteController = require('../controllers/deleteController.js');
	var authenticationController = require('../controllers/authenticationController.js')

	app.route('/api/dummy') // THIS IS A DUMMY ENDPOINT FOR TESTING PURPOSES ONLY. **DO NOT USE ME IN PRODUCTION CODE**
		.get(getController.dummy_function)

	app.route('/api/groups') // deals with all groups or groups in the making
		.post(postController.create_new_group)

	app.route('/api/groups/:groupId')
		.get(getController.get_group_info)
		.put(putController.update_group_info)
		.delete(deleteController.delete_group)

	app.route('/api/users')
		.post(postController.create_new_user)
		.get(getController.search_users)

	app.route('/api/users/:userId')
		.get(getController.get_user_info)
		.put(putController.update_user_info)
		.delete(deleteController.delete_user)

	app.route('/api/login')
		.post(authenticationController.login)

	app.route('/api/logout')
		.post(authenticationController.logout)

	app.route('/api/groupDebts/:groupId')
		.get(getController.get_group_debt_list)
		.post(postController.create_group_debt)

	app.route('/api/groupDebts/:groupId/:debtId')
		.get(getController.get_group_debt_info)
		.put(putController.update_group_debt)
		.delete(deleteController.delete_group_debt)

	app.route('/api/personalDebts')
		.post(postController.create_new_personal_debt)

	app.route('/api/personalDebts/:userId')
		.get(getController.get_personal_debt_list)

	app.route('/api/personalDebts/:userId/:debtId')
		.get(getController.get_personal_debt_info)
		.put(putController.update_personal_debt)
		.delete(deleteController.delete_personal_debt)

	app.route('/api/groceries/:groupId')
		.get(getController.get_grocery_list)
		.post(postController.create_new_grocery_item)
		.delete(deleteController.delete_grocery_list)

	app.route('/api/groceries/:groupId/:groceryId')
		.get(getController.get_grocery_item)
		.put(putController.update_grocery_item)
		.delete(deleteController.delete_grocery_item)

	app.route('/api/chores/:groupId')
		.get(getController.get_chores_list)
		.post(postController.create_new_chore)
		.delete(deleteController.delete_chores_list)

	app.route('/api/chores/:groupId/:choreId')
		.get(getController.get_chore_info)
		.put(putController.update_chore_item)
		.delete(deleteController.delete_chore_item)

	app.route('/api/rent/:groupId')
		.get(getController.get_rent_info)
		.put(putController.update_rent_info)
		.post(postController.create_new_rent_item)

	// Enumerate all of the routes that should be taken by different requests.
	// The general form is:
	/*
		app.route('some path the client will visit to submit a request')
			.get(getController.the appropriate route)
			.put(putController.the appropriate route)
			.post(postController.the appropriate route)
			.delete(deleteController.the appropriate route)
	*/
	// A given method that is not supported for a certain task should be omitted here.
	// For example, DELETE is not supported on users; it's not possible to use the API to delete all user accounts.
	// The standard CRUD model is implemented by the four fundamental HTTP requests as follows:
	// GET is used for listing things
	// PUT is used for updating things
	// POST is used for adding things
	// DELETE is used for deleting things
}