process.env.DATABASE = 'test';
process.env.PORT = 3002;

var chai  = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server');
var webServer = server.server
var app = server.app
var execsql = require('execsql');
var expect = chai.expect;
let retcode

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

var lUser = {
	id: 5,
	first_name: 'Lame',
	last_name: 'Loser',
	email: 'lameloser@gmail.com',
	password: 'password',
	phone_number: 3333333333
}

describe('The delete endpoints', function(){
	before(function(done){ // Refresh the database contents and give our users login tokens before doing any tests.
		execsql.config(dbConfig).exec(selectDB).execFile(sqlFile, function(err, results){
			if (err) throw err;
			console.log(results);
			let request = dummyUser
			request.stayLoggedIn = true
			chai.request(app)
				.post('/api/login')
				.send(request)
				.end((err, res) => {
					expect(res.status).to.equal(200);
					expect(res.body).to.have.property('success')
					expect(res.body).to.have.property('token')
					expect(res.body).to.have.property('user_id')
					dummyUser.token = res.body.token
					let otherRequest = lUser
					chai.request(app)
						.post('/api/login')
						.send(otherRequest)
						.end((err, res) => {
							expect(res.status).to.equal(200);
							expect(res.body).to.have.property('success')
							expect(res.body).to.have.property('token')
							expect(res.body).to.have.property('user_id')
							lUser.token = res.body.token
							done();
						})
				})
			}).end();
	})
	afterEach(function(done){ // Ensure that the return code isn't any of the following
		expect(retcode).to.not.equal(404);
		expect(retcode).to.not.equal(500);
		expect(retcode).to.not.equal(502);
	})
	describe('Delete group debt', function(){
		it('Rejects empty requests', function(done){
			chai.request(app)
				.delete('/api/groupDebts/1/1')
				.end((err, res) => {
					retcode = res.status
					expect(res.status).to.equal(401)
					done()
				})
		})
		it('Forbids a user from deleting things that they are unrelated to', function(done){
			chai.request(app)
				.delete('/api/groupDebts/1/1')
				.send(lUser)
				.end((err, res) => {
					retcode = res.status
					expect(res.status).to.equal(401)
					done()
				})
		})
		it('Allows an authorized user to perform deletes', function(done){
			chai.request(app)
				.delete('/api/groupDebts/1/1')
				.send(dummyUser)
				.end((err, res) => {
					retcode = res.status
					expect(res.status).to.equal(200)
					done()
				})
		})
	})
	describe('Delete personal debt', function(){
		it('Rejects empty requests', function(done){
			chai.request(app)
				.delete('/api/personalDebts/1/1')
				.end((err, res) => {
					retcode = res.status
					expect(res.status).to.equal(401)
					done()
				})
		})
		it('Forbids a user from deleting things that they are unrelated to', function(done){
			chai.request(app)
				.delete('/api/personalDebts/1/1')
				.send(lUser)
				.end((err, res) => {
					retcode = res.status
					expect(res.status).to.equal(401)
					done()
				})
		})
		it('Allows an authorized user to perform deletes', function(done){
			chai.request(app)
				.delete('/api/personalDebts/1/1')
				.send(dummyUser)
				.end((err, res) => {
					retcode = res.status
					expect(res.status).to.equal(200)
					done()
				})
		})
	})
	describe('Delete grocery item', function(){
		it('Rejects empty requests', function(done){
			chai.request(app)
				.delete('/api/groceries/1/1')
				.end((err, res) => {
					retcode = res.status
					expect(res.status).to.equal(401)
					done()
				})
		})
		it('Forbids a user from deleting things that they are unrelated to', function(done){
			chai.request(app)
				.delete('/api/groceries/1/1')
				.send(lUser)
				.end((err, res) => {
					retcode = res.status
					expect(res.status).to.equal(401)
					done()
				})
		})
		it('Allows an authorized user to perform deletes', function(done){
			chai.request(app)
				.delete('/api/groceries/1/1')
				.send(dummyUser)
				.end((err, res) => {
					retcode = res.status
					expect(res.status).to.equal(200)
					done()
				})
		})
	})
	describe('Delete grocery list', function(){
		it('Rejects empty requests', function(done){
			chai.request(app)
				.delete('/api/groceries/1/1')
				.end((err, res) => {
					retcode = res.status
					expect(res.status).to.equal(401)
					done()
				})
		})
		it('Forbids a user from deleting things that they are unrelated to', function(done){
			chai.request(app)
				.delete('/api/groceries/1/1')
				.send(lUser)
				.end((err, res) => {
					retcode = res.status
					expect(res.status).to.equal(401)
					done()
				})
		})
		it('Allows an authorized user to perform deletes', function(done){
			chai.request(app)
				.delete('/api/groceries/1/1')
				.send(dummyUser)
				.end((err, res) => {
					retcode = res.status
					expect(res.status).to.equal(200)
					done()
				})
		})
	})
	describe('Delete group', function(){
		it('Rejects empty requests', function(done){
			chai.request(app)
				.delete('/api/something/1')
				.end((err, res) => {
					retcode = res.status
					expect(res.status).to.equal(401)
					done()
				})
		})
		it('Forbids a user from deleting things that they are unrelated to', function(done){
			chai.request(app)
				.delete('/api/something/1')
				.send(lUser)
				.end((err, res) => {
					retcode = res.status
					expect(res.status).to.equal(401)
					done()
				})
		})
		it('Allows an authorized user to perform deletes', function(done){
			chai.request(app)
				.delete('/api/something/1')
				.send(dummyUser)
				.end((err, res) => {
					retcode = res.status
					expect(res.status).to.equal(200)
					done()
				})
		})
	})
	describe('Delete user', function(){
		it('Rejects empty requests', function(done){
			chai.request(app)
				.delete('/api/users/1')
				.end((err, res) => {
					retcode = res.status
					expect(res.status).to.equal(401)
					done()
				})
		})
		it('Forbids a user from deleting things that they are unrelated to', function(done){
			chai.request(app)
				.delete('/api/users/1')
				.send(lUser)
				.end((err, res) => {
					retcode = res.status
					expect(res.status).to.equal(401)
					done()
				})
		})
		it('Allows an authorized user to perform deletes', function(done){
			chai.request(app)
				.delete('/api/users/1')
				.send(dummyUser)
				.end((err, res) => {
					retcode = res.status
					expect(res.status).to.equal(200)
					done()
				})
		})
	})
	after(function(done){
		webServer.close()
		done()
	})
})

