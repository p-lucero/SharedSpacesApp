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

describe('The get endpoints', function(){
	describe('Get group', function(){
		it('Exists', function(done){

		})
		it('Returns a non-empty result', function(done){

		})
		it('Does not throw 500s or 502s', function(done){
			
		})
	})
	describe('Get user', function(){
		it('Exists', function(done){

		})
		it('Returns a non-empty result', function(done){

		})
		it('Does not throw 500s or 502s', function(done){
			
		})
	})
	describe('Get group debt list', function(){
		it('Exists', function(done){

		})
		it('Returns a non-empty result', function(done){

		})
		it('Does not throw 500s or 502s', function(done){
			
		})
	})
	describe('Get group debt info', function(){
		it('Exists', function(done){

		})
		it('Returns a non-empty result', function(done){

		})
		it('Does not throw 500s or 502s', function(done){
			
		})
	})
	describe('Get personal debt list', function(){
		it('Exists', function(done){

		})
		it('Returns a non-empty result', function(done){

		})
		it('Does not throw 500s or 502s', function(done){
			
		})
	})
	describe('Get personal debt info', function(){
		it('Exists', function(done){

		})
		it('Returns a non-empty result', function(done){

		})
		it('Does not throw 500s or 502s', function(done){
			
		})
	})
	describe('Get grocery list', function(){
		it('Exists', function(done){

		})
		it('Returns a non-empty result', function(done){

		})
		it('Does not throw 500s or 502s', function(done){
			
		})
	})
	describe('Get grocery item', function(){
		it('Exists', function(done){

		})
		it('Returns a non-empty result', function(done){

		})
		it('Does not throw 500s or 502s', function(done){
			
		})
	})
	describe('Get chores list', function(){
		it('Exists', function(done){

		})
		it('Returns a non-empty result', function(done){

		})
		it('Does not throw 500s or 502s', function(done){
			
		})
	})
	describe('Get chores info', function(){
		it('Exists', function(done){

		})
		it('Returns a non-empty result', function(done){

		})
		it('Does not throw 500s or 502s', function(done){
			
		})
	})
})

describe('First level of testing', function() {
	describe('Second level of testing', function() {
		it('Does a thing', function(done){
			expect(2).to.equal(2);
			done();
		})
	})
})