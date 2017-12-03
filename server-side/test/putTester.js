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
	email: 'kyle@gmail.com',
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

describe('The put endpoints', function(){
	before(function(done){
		execsql.config(dbConfig).exec(selectDB).execFile(sqlFile, function(err, results){
			if (err) throw err;
			console.log(results);
			done()
		}).end();
	})
	describe('Update group info', function(){
		it('Exists', function(done){

		})
		it('Rejects content-free requests', function(done){

		})
		it('Rejects requests that only have some valid parameters', function(done){

		})
		it('Rejects valid requests from users that are not logged in', function(done){

		})
		it('Does not throw 502s or 500s', function(done){
			
		})
	})
	describe('Update user', function(){
		it('Exists', function(done){

		})
		it('Rejects content-free requests', function(done){

		})
		it('Rejects requests that only have some valid parameters', function(done){

		})
		it('Rejects valid requests from users that are not logged in', function(done){

		})
		it('Does not throw 502s or 500s', function(done){
			
		})
	})
	describe('Update group debt', function(){
		it('Exists', function(done){

		})
		it('Rejects content-free requests', function(done){

		})
		it('Rejects requests that only have some valid parameters', function(done){

		})
		it('Rejects valid requests from users that are not logged in', function(done){

		})
		it('Does not throw 502s or 500s', function(done){
			
		})
	})
	describe('Update personal debt', function(){
		it('Exists', function(done){

		})
		it('Rejects content-free requests', function(done){

		})
		it('Rejects requests that only have some valid parameters', function(done){

		})
		it('Rejects valid requests from users that are not logged in', function(done){

		})
		it('Does not throw 502s or 500s', function(done){
			
		})
	})
	describe('Update grocery item', function(){
		it('Exists', function(done){

		})
		it('Rejects content-free requests', function(done){

		})
		it('Rejects requests that only have some valid parameters', function(done){

		})
		it('Rejects valid requests from users that are not logged in', function(done){

		})
		it('Does not throw 502s or 500s', function(done){
			
		})
	})
	describe('Update chore item', function(){
		it('Exists', function(done){

		})
		it('Rejects content-free requests', function(done){

		})
		it('Rejects requests that only have some valid parameters', function(done){

		})
		it('Rejects valid requests from users that are not logged in', function(done){

		})
		it('Does not throw 502s or 500s', function(done){
			
		})
	})
	describe('Update rent info', function(){
		it('Exists', function(done){

		})
		it('Rejects content-free requests', function(done){

		})
		it('Rejects requests that only have some valid parameters', function(done){

		})
		it('Rejects valid requests from users that are not logged in', function(done){

		})
		it('Does not throw 502s or 500s', function(done){
			
		})
	})
})