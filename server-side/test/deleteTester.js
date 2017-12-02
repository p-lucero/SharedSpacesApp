var expect  = require('chai').expect;
var request = require('request');

var dummyUser = {
	id: 999,
	first_name: 'Test',
	last_name: 'User',
	email: 'test.user@gmail.com',
	password: 'foo',
	phone_number: 1111111111
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

