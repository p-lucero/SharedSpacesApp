var mysql = require('mysql');
require('module');

//This is a module to be used in other files. Syntax: const ConnectFile = require('./connection.js'); ... var connection = ConnectFile.Connect(connection);
exports.Connect = (connection) => {
	return (
		connection = mysql.createConnection({
			host: '127.0.0.1',		//Location of database server, can also be localhost
			user: 'Dann', 			//Username to access database (possible to use an admin account?)
			password: 'password', 	//password obv
			database: 'deployment'	//Database name
	}));
}

