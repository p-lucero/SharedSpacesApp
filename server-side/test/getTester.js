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

var endpoints = [{
	name: 'Get group info',
	uri: '/api/get/groups/1',
	requiredAttributes: [
		// group_info: 'object',
		// users: 'array',
		// debts: 'array',
		// 'group_info.group_name': 'string',
		// 'group_info.id': 'number'
	]
},
{
	name: 'Get user info',
	uri: '/api/get/users/1',
	requiredAttributes: [
		// '0.id': 'number',
		// '0.first_name': 'string',
		// '0.last_name': 'string',
		// '0.email': 'string',
		// '0.phone_number': 'string',
		// '0.facebook_profile': 'string',
		// '0.twitter_handle': 'string',
		// '0.instagram': 'string',
		// '0.group_id': 'number'
	]
},
{
	name: 'Get group debt list',
	uri: '/api/get/groupDebts/1',
	requiredAttributes: [
		// '0': 'array',
		// '0'
	]
},
{
	name: 'Get group debt info',
	uri: '/api/get/groupDebts/1/1',
	requiredAttributes: [
		// id: 'number',
		// debt_type: 'string',
		// amount: 'number',
		// group_id: 'number'
	]
},
{
	name: 'Get personal debt list',
	uri: '/api/get/personalDebts/1',
	requiredAttributes: [
		// '0': 'array'
	]
},
{
	name: 'Get personal debt info',
	uri: '/api/get/personalDebts/1/1',
	requiredAttributes: [

	]
},
{
	name: 'Get grocery list',
	uri: '/api/get/groceries/1',
	requiredAttributes: [

	]
},
{
	name: 'Get grocery item info',
	uri: '/api/get/groceries/1/1',
	requiredAttributes: [

	]
},
{
	name: 'Get chores list',
	uri: '/api/get/chores/1',
	requiredAttributes: [

	]
},
{
	name: 'Get chores info',
	uri: '/api/get/chores/1/1',
	requiredAttributes: [

	]
},
{
	name: 'Get rent info',
	uri: '/api/get/rent/1',
	requiredAttributes: [

	]
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



describe('The get endpoints', function(){
	before(function(done){
		cp.exec('mysql --user="server" --password="a" test < testing_db_data.sql', function(a, b, c){
			let request = dummyUser
			request.stayLoggedIn = true
			chai.request(app)
				.post('/api/post/login')
				.send(request)
				.end((err, res) => {
					expect(res.status).to.equal(200);
					expect(res.body).to.have.property('success')
					expect(res.body).to.have.property('token')
					expect(res.body).to.have.property('user_id')
					dummyUser.token = res.body.token
					let otherRequest = lUser
					otherRequest.stayLoggedIn = true
					chai.request(app)
						.post('/api/post/login')
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
					.post(endpoint.uri)
					.end((err, res) => {
						retcode = res.status
						expect(res.status).to.equal(401)
						done()
					})
			})
			it('Forbids a user from getting things they are unrelated to', function(done){
				chai.request(app)
					.post(endpoint.uri)
					.send(lUser)
					.end((err, res) => {
						retcode = res.status
						expect(res.status).to.equal(401)
						done()
					})
			})
			it('Allows an authorized user to perform gets and returns good data', function(done){
				chai.request(app)
					.post(endpoint.uri)
					.send(dummyUser)
					.end((err, res) => {
						retcode = res.status
						expect(res.status).to.equal(200)
						for (let attr of endpoint.requiredAttributes){
							expect(res.body).to.have.property(attr) //.that.is.a(requiredAttributes[attr])
						}
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