process.env.DATABASE = 'test';
process.env.PORT = 3002;

var chai  = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server');
var execsql = require('execsql');
var expect = chai.expect;
const uuidv4 = require('uuid/v4')

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

describe('Authentication controller', function() {
	before(function(done){
		execsql.config(dbConfig).exec(selectDB).execFile(sqlFile, function(err, results){
			if (err) throw err;
			console.log(results);
			done()
		}).end();
	})
	it('Rejects content-free requests', function(done){
		chai.request(server)
			.post('/api/login')
			.end((err, res) => {
				expect(res.status).to.equal(400);
				expect(res.body).to.have.property('url')
				done();
			})
	})
	it('Rejects requests with no stayLoggedIn parameter', function(done){
		let request = dummyUser
		chai.request(server)
			.post('/api/login')
			.send(request)
			.end((err, res) => {
				expect(res.status).to.equal(400);
				expect(res.body).to.have.property('url')
				done();
			})
	})
	it('Rejects requests from users that are not registered', function(done){
		let request = badUser
		request.stayLoggedIn = true
		chai.request(server)
			.post('/api/login')
			.send(request)
			.end((err, res) => {
				expect(res.status).to.equal(401);
				expect(res.body).to.have.property('success')
				done();
			})
	})
	it('Lets real users log in', function(done){
		let request = dummyUser
		request.stayLoggedIn = true
		chai.request(server)
			.post('/api/login')
			.send(request)
			.end((err, res) => {
				expect(res.status).to.equal(200);
				expect(res.body).to.have.property('success')
				expect(res.body).to.have.property('token')
				expect(res.body).to.have.property('user_id')
				done();
			})
	})
	it('Sends back a valid login token if it exists', function(done){
		let request = dummyUser
		request.stayLoggedIn = true
		chai.request(server)
			.post('/api/login')
			.send(request)
			.end((err, res) => {
				expect(res.status).to.equal(200);
				expect(res.body).to.have.property('success')
				expect(res.body).to.have.property('token')
				expect(res.body).to.have.property('user_id')
				let token = res.token
				request.token = token
				chai.request(server)
					.post('/api/login')
					.send(request)
					.end((err, res) =>{
						expect(res.status).to.equal(200);
						expect(res.body).to.have.property('success')
						expect(res.body).to.have.property('token')
						expect(res.body).to.have.property('user_id')
						expect(res.token).to.equal(token)
						done()
					})
			})
	})
	it('Lets a logged in user log in from another location', function(done){
		let request = dummyUser
		request.stayLoggedIn = true
		chai.request(server)
			.post('/api/login')
			.send(request)
			.end((err, res) => {
				expect(res.status).to.equal(200);
				expect(res.body).to.have.property('success')
				expect(res.body).to.have.property('token')
				expect(res.body).to.have.property('user_id')
				let token = res.token
				chai.request(server)
					.post('/api/login')
					.send(request)
					.end((err, res) =>{
						expect(res.status).to.equal(200);
						expect(res.body).to.have.property('success')
						expect(res.body).to.have.property('token')
						expect(res.body).to.have.property('user_id')
						expect(res.token).to.not.equal(token)
						done()
					})
			})
	})
	it('Lets a logged in user log out', function(done){
		let request = dummyUser
		request.stayLoggedIn = true
		chai.request(server)
			.post('/api/login')
			.send(request)
			.end((err, res) => {
				expect(res.status).to.equal(200);
				expect(res.body).to.have.property('success')
				expect(res.body).to.have.property('token')
				expect(res.body).to.have.property('user_id')
				let token = res.token
				request.token = token
				chai.request(server)
					.post('/api/logout')
					.send(request)
					.end((err, res) =>{
						expect(res.status).to.equal(200);
						expect(res.body).to.have.property('success')
						done()
					})
			})
	})
	it('Rejects a user from logging out if they fail to supply a token', function(done){
		chai.request(server)
			.post('/api/logout')
			.end((err, res) => {
				expect(res.status).to.equal(400)
				expect(res.body).to.have.property('url')
				done()
			})
	})
	it('Rejects tokens that do not exist (even if they are valid UUIDs)', function(done){
		chai.request(server)
			.post('/api/logout')
			.send({token:uuidv4()})
			.end((err, res) => {
				expect(res.status).to.equal(400)
				expect(res.body).to.have.property('url')
				done()
			})
	})
})