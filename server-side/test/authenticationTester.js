process.env.DATABASE = 'test';
process.env.PORT = 3002;

var chai  = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server');
var expect = chai.expect;

chai.use(chaiHttp);

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