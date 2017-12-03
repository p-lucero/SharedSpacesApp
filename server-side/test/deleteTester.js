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

describe('The delete endpoints', function(){
	describe('Delete group', function(){
		it('Exists', function(done){
			
		})
		it('Does not throw 502s or 500s', function(done){
			
		})
	})
	describe('Delete user', function(){
		it('Exists', function(done){
			
		})
		it('Does not throw 502s or 500s', function(done){
			
		})
	})
	describe('Delete group debt', function(){
		it('Exists', function(done){
			
		})
		it('Does not throw 502s or 500s', function(done){
			
		})
	})
	describe('Delete personal debt', function(){
		it('Exists', function(done){
			
		})
		it('Does not throw 502s or 500s', function(done){
			
		})
	})
	describe('Delete grocery list', function(){
		it('Exists', function(done){
			
		})
		it('Does not throw 502s or 500s', function(done){
			
		})
	})
	describe('Delete grocery item', function(){
		it('Exists', function(done){
			
		})
		it('Does not throw 502s or 500s', function(done){
			
		})
	})
})

