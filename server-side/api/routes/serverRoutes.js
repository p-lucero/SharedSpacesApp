'use strict';
module.exports = function(app) {
	var getController = require('../controllers/getController.js');
	var putController = require('../controllers/putController.js');
	var postController = require('../controllers/postController.js');
	var deleteController = require('../controllers/deleteController.js');
	var authenticationController = require('../controllers/authenticationController.js')

	app.route('/api/dummy') // THIS IS A DUMMY ENDPOINT FOR TESTING PURPOSES ONLY. **DO NOT USE ME IN PRODUCTION CODE**
		.get(getController.dummy_function)

	app.route('/api/post/groups') // deals with all groups or groups in the making
		.post(postController.create_new_group)

	app.route('/api/get/groups/:groupId')
		.post(getController.get_group_info)

	app.route('/api/put/groups/:groupId')
		.post(putController.update_group_info)

	app.route('/api/delete/groups/:groupId')
		.post(deleteController.delete_group)

	app.route('/api/post/users')
		.post(postController.create_new_user)

	app.route('/api/get/users')
		.post(getController.search_users)

	app.route('/api/get/users/:userId')
		.post(getController.get_user_info)

	app.route('/api/put/users/:userId')
		.post(putController.update_user_info)

	app.route('/api/delete/users/:userId')
		.post(deleteController.delete_user)

	app.route('/api/post/login')
		.post(authenticationController.login)

	app.route('/api/post/logout')
		.post(authenticationController.logout)

	app.route('/api/get/groupDebts/:groupId')
		.post(getController.get_group_debt_list)

	app.route('/api/post/groupDebts/:groupId')
		.post(postController.create_group_debt)

	app.route('/api/get/groupDebts/:groupId/:debtId')
		.post(getController.get_group_debt_info)

	app.route('/api/put/groupDebts/:groupId/:debtId')
		.post(putController.update_group_debt)

	app.route('/api/delete/groupDebts/:groupId/:debtId')
		.post(deleteController.delete_group_debt)

	app.route('/api/post/personalDebts')
		.post(postController.create_new_personal_debt)

	app.route('/api/get/personalDebts/:userId')
		.post(getController.get_personal_debt_list)

	app.route('/api/get/personalDebts/:userId/:debtId')
		.post(getController.get_personal_debt_info)

	app.route('/api/put/personalDebts/:userId/:debtId')
		.post(putController.update_personal_debt)

	app.route('/api/delete/personalDebts/:userId/:debtId')
		.post(deleteController.delete_personal_debt)

	app.route('/api/get/groceries/:groupId')
		.post(getController.get_grocery_list)

	app.route('/api/post/groceries/:groupId')
		.post(postController.create_new_grocery_item)

	app.route('/api/delete/groceries/:groupId')
		.post(deleteController.delete_grocery_list)

	app.route('/api/get/groceries/:groupId/:groceryId')
		.post(getController.get_grocery_item)

	app.route('/api/put/groceries/:groupId/:groceryId')
		.post(putController.update_grocery_item)

	app.route('/api/delete/groceries/:groupId/:groceryId')
		.post(deleteController.delete_grocery_item)

	app.route('/api/get/chores/:groupId')
		.post(getController.get_chores_list)

	app.route('/api/post/chores/:groupId')
		.post(postController.create_new_chore)

	app.route('/api/delete/chores/:groupId')
		.post(deleteController.delete_chores_list)

	app.route('/api/get/chores/:groupId/:choreId')
		.post(getController.get_chore_info)

	app.route('/api/put/chores/:groupId/:choreId')
		.post(putController.update_chore_item)

	app.route('/api/delete/chores/:groupId/:choreId')
		.post(deleteController.delete_chore_item)

	app.route('/api/get/rent/:groupId')
		.post(getController.get_rent_info)

	app.route('/api/put/rent/:groupId')
		.post(putController.update_rent_info)

	app.route('/api/post/rent/:groupId')
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