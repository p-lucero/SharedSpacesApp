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

describe('The post endpoints', function(){
	before(function(done){
		execsql.config(dbConfig).exec(selectDB).execFile(sqlFile, function(err, results){
			if (err) throw err;
			console.log(results);
			done()
		}).end();
	})
	describe('Create group', function(){
		it('Exists', function(done){

		})
		it('Rejects content-free requests', function(done){

		})
		it('Rejects requests that only have some valid parameters', function(done){

		})
		it('Rejects valid requests from users that are not logged in', function(done){

		})
		it('Does not throw 500s or 502s', function(done){

		})
		it('Rejects valid requests from users that are already part of a group', function(done){

		})
	})
	describe('Create user', function(){
		it('Exists', function(done){

		})
		it('Rejects content-free requests', function(done){

		})
		it('Rejects requests that only have some valid parameters', function(done){

		})
		it('Rejects valid requests from users that are already registered', function(done){

		})
		it('Does not throw 500s or 502s', function(done){

		})
	})
	describe('Create group debt', function(){
		it('Exists', function(done){

		})
		it('Rejects content-free requests', function(done){

		})
		it('Rejects requests that only have some valid parameters', function(done){

		})
		it('Rejects valid requests from users that are not logged in', function(done){

		})
		it('Does not throw 500s or 502s', function(done){

		})
	})
	describe('Create personal debt', function(){
		it('Exists', function(done){

		})
		it('Rejects content-free requests', function(done){

		})
		it('Rejects requests that only have some valid parameters', function(done){

		})
		it('Rejects valid requests from users that are not logged in', function(done){

		})
		it('Does not throw 500s or 502s', function(done){

		})
	})
	describe('Create grocery item', function(){
		it('Exists', function(done){

		})
		it('Rejects content-free requests', function(done){

		})
		it('Rejects requests that only have some valid parameters', function(done){

		})
		it('Rejects valid requests from users that are not logged in', function(done){

		})
		it('Does not throw 500s or 502s', function(done){

		})
	})
	describe('Create chore', function(){
		it('Exists', function(done){

		})
		it('Rejects content-free requests', function(done){

		})
		it('Rejects requests that only have some valid parameters', function(done){

		})
		it('Rejects valid requests from users that are not logged in', function(done){

		})
		it('Does not throw 500s or 502s', function(done){

		})
	})
	describe('Create rent', function(){
		it('Exists', function(done){

		})
		it('Rejects content-free requests', function(done){

		})
		it('Rejects requests that only have some valid parameters', function(done){

		})
		it('Rejects valid requests from users that are not logged in', function(done){

		})
		it('Does not throw 500s or 502s', function(done){

		})
	})
})