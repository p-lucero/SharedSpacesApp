'use strict';
module.exports = function(app) {
	var controller = require('../controllers/serverController.js');

	app.route('/api/creategroup')
		.get(controller.creategroup)

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
}