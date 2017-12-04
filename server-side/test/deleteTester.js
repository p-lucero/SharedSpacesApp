process.env.DATABASE = 'test';
process.env.PORT = 3002;

var chai  = require('chai');
var chaiHttp = require('chai-http');
var cp = require('child_process');
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

var endpoints = [{
	name: 'Delete group debt',
	uri: '/api/groupDebts/1/1'
},
{
	name: 'Delete personal debt',
	uri: '/api/personalDebts/1/1'
},
{
	name: 'Delete grocery item',
	uri: '/api/groceries/1/1'
},
{
	name: 'Delete grocery list',
	uri: '/api/groceries/1'
},
{
	name: 'Delete chore item',
	uri: '/api/chores/1/1'
},
{
	name: 'Delete chores list',
	uri: '/api/chores/1',
},
{
	name: 'Delete group', 
	uri: '/api/groups/1'
},
{
	name: 'Delete user',
	uri: '/api/users/1'
}]

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
		cp.exec('mysql --username=server password=a test < ../testing_db_data.sql', function(a, b, c){
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
		});
	})
	afterEach(function(done){ // Ensure that the return code isn't any of the following
		expect(retcode).to.not.equal(404);
		expect(retcode).to.not.equal(500);
		expect(retcode).to.not.equal(502);
		done()
	})
	endpoints.forEach(function(endpoint){
		describe(endpoint.name, function(){
		it('Rejects empty requests', function(done){
			chai.request(app)
				.delete(endpoint.uri)
				.end((err, res) => {
					retcode = res.status
					expect(res.status).to.equal(401)
					done()
				})
		})
		it('Forbids a user from deleting things that they are unrelated to', function(done){
			chai.request(app)
				.delete(endpoint.uri)
				.send(lUser)
				.end((err, res) => {
					retcode = res.status
					expect(res.status).to.equal(401)
					done()
				})
		})
		it('Allows an authorized user to perform deletes', function(done){
			chai.request(app)
				.delete(endpoint.uri)
				.send(dummyUser)
				.end((err, res) => {
					retcode = res.status
					expect(res.status).to.equal(200)
					done()
				})
			})
		})
	})
	after(function(done){
		webServer.close()
		done()
	})
})

