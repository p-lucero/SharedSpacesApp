'use strict';
module.exports = function(app) {
	var controller = require('../controllers/serverController.js');

	app.route('/api/groups') // deals with all groups or groups in the making
		.post(controller.create_new_group)

	app.route('/api/groups/:groupId')
		.get(controller.get_group_info)
		.put(controller.update_group_info)
		.delete(controller.delete_group)

	app.route('/api/users')
		.post(controller.create_new_user)

	app.route('/api/users/:userId')
		.get(controller.get_user_info)
		.put(controller.update_user_info)
		.delete(controller.delete_user)

	app.route('/api/groupDebts/:groupId')
		.get(controller.get_group_debt_list)
		.post(controller.create_group_debt)

	app.route('/api/groupDebts/:groupId/:debtId')
		.get(controller.get_group_debt_info)
		.put(controller.update_group_debt)
		.delete(controller.delete_group_debt)

	app.route('/api/personalDebts')
		.post(controller.create_new_personal_debt)

	app.route('/api/personalDebts/:userId')
		.get(controller.list_personal_debts)

	app.route('/api/personalDebts/:userId/:debtId')
		.get(controller.get_personal_debt_info)
		.put(controller.update_personal_debt)
		.delete(controller.delete_personal_debt)

	app.route('/api/groceries/:groupId')
		.get(controller.get_grocery_list)
		.put(controller.update_grocery_list)
		.post(controller.create_new_grocery_item)
		.delete(controller.delete_grocery_list)

	app.route('/api/groceries/:groupId/:groceryId')
		.get(controller.get_grocery_item)
		.put(controller.update_grocery_item)
		.delete(controller.delete_grocery_item)

	app.route('/api/chores/:groupId')
		.get(controller.get_chores_list)
		.put(controller.update_chores_list)
		.post(controller.create_new_chore)
		.delete(controller.delete_chores_list)

	app.route('/api/chores/:groupId/:choreId')
		.get(controller.get_chore_info)
		.put(controller.update_chore_item)
		.delete(controller.delete_chore_item)

	app.route('/api/rent/:groupId')
		.get(controller.get_rent_info)
		.put(controller.update_rent_info)
		.post(controller.create_new_rent_item)

	// Enumerate all of the routes that should be taken by different requests.
	// The general form is:
	/*
		app.route('some path the client will visit to submit a request')
			.get(controller.the appropriate route)
			.put(controller.the appropriate route)
			.post(controller.the appropriate route)
			.delete(controller.the appropriate route)
	*/
	// A given method that is not supported for a certain task should be omitted here.
	// For example, DELETE is not supported on users; it's not possible to use the API to delete all user accounts.
	// The standard CRUD model is implemented by the four fundamental HTTP requests as follows:
	// GET is used for listing things
	// PUT is used for updating things
	// POST is used for adding things
	// DELETE is used for deleting things
}