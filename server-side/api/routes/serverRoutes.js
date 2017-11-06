'use strict';
module.exports = function(app) {
	var controller = require('../controllers/serverController.js');

	app.route('/api/groups') // deals with managing groups on the server
		.get(controller.group_info)
		// .put(controller.group_update)
		// .post(controller.group_create)
		// .delete(controller.group_delete)

	// Enumerate all of the routes that should be taken by different requests.
	// The general form is:
	/*
		app.route('some path the client will visit to submit a request')
			.get('controller.the appropriate route')
			.post('controller.the appropriate route')
			.put('controller.the appropriate route')
			.delete('controller.the appropriate route')
	*/
	// A given method that is not supported for a certain task should be omitted here.
	// For example, a list of debts cannot be outright deleted.
	// The standard CRUD model is implemented by the four fundamental HTTP requests as follows:
	// GET is used for listing things
	// PUT is used for updating things
	// POST is used for adding things
	// DELETE is used for deleting things
}