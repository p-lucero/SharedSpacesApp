require('mysql');
//Access the connection module
const ConnectFile = require('./connection.js');

//Test function to use modules for the initial connection and to query the database
function tQuery(){
	var connection = ConnectFile.Connect(connection); 								//Using a module to return the connection stream in order to use queries
	connection.query('select * from user_accounts', function(err, rows, fields){	//Dummy query to database for initial testing
		if (err) throw err;
		console.log('User Accounts: ', rows)										//Prints output of query
	});
	connection.end();																//Closes the stream
}

tQuery();