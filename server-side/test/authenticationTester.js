process.env.DATABASE = 'test';
process.env.PORT = 3002;

var chai  = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server');
var execsql = require('execsql');
var expect = chai.expect;

chai.use(chaiHttp);

var dbConfig = {
	host: 'localhost',
	user: 'root',
	insecureAuth: true
}
var selectDB = `use ${process.env.DATABASE};`
var sqlFile = __dirname + '/../testing_db_data.sql'

// http://chaijs.com/api/bdd/ contains the documentation for how things work here

var dummyUser = {
	id: 1,
	first_name: 'Kyle',
	last_name: 'McDevitt',
	email: 'jd@gmail.com',
	password: 'password',
	phone_number: 9876543210
}

var badUser = {
	id: 999999,
	first_name: 'User',
	last_name: 'Test',
	email: 'user.test@gmail.com',
	password: 'oof',
	phone_number: 9999999999
}

describe('Authentication controller', function() {
	before(function(done){
		execsql.config(dbConfig).exec(selectDB).execFile(sqlFile, function(err, results){
			if (err) throw err;
			console.log(results);
			done()
		}).end();
	})
	it('Rejects content-free requests', function(done){

	})
	it('Rejects requests with no stayLoggedIn parameter', function(done){

	})
	it('Lets real users log in', function(done){
		
	})
	it('Sends back a valid login token if it exists', function(done){

	})
	it('Lets a logged in user log in from another location', function(done){

	})
	it('Lets a logged in user log out', function(done){

	})
	it('Avoids crashing if the login token is invalid', function(done){

	})
})