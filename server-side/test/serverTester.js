var chai  = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server');
var expect = chai.expect;

chai.use(chaiHttp);

process.env.DATABASE = 'test';
process.env.PORT = 3002;

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

describe('The server', function() {
	it('Launches', function(done){

	})
	it('Creates an expressJS app', function(done){

	})
	it('Connects to mySQL', function(done){

	})
	it('404s on garbage URLs', function(done){

	})
})