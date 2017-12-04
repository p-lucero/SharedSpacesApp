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
	name: 'Update group information',
	uri: '/api/groups/1',
	badQuery: {
		groupName: 'Absolutely Not Shared Spaces',
		groundRules: 'Don\'t be that guy'
	},
	goodQuery: {
		groupName: 'Totally Shared Spaces',
		groundRules: 'Be that guy',
		users: [1,2,3,4]
	}
},
{
	name: 'Update user information',
	uri: '/api/users/1',
	badQuery: {
		first:'foo'
	},
	goodQuery: {
		first:'Kyle',
		last:'McDevitt',
		email:'kyle@ymail.com',
		password:'wordpass',
		phoneNumber:1,
		facebook:'kmcd',
		twitter:'@kmcd',
		instagram:'@kmcd',
		groupID:1
	}
},
{
	name: 'Update group debt',
	uri: '/api/groupDebts/1/1',
	badQuery: {
		debtType: 'Painted the town green'
	},
	goodQuery: {
		debtType: 'Painted the town green',
		amount: 8
	}
},
{
	name: 'Update personal debt',
	uri: '/api/personalDebts/1/1',
	badQuery: {
		amount: 2
	},
	goodQuery: {
		amount: 2,
		lenderID: 1,
		borrowerID: 4
	}
},
{
	name: 'Update grocery item',
	uri: '/api/groceries/1/1',
	badQuery: {
		amount: 12
	},
	goodQuery: {
		amount: 14,
		paid: true,
		userID: 3
	}
},
{
	name: 'Update chore item',
	uri: '/api/chores/1/1',
	badQuery: {
		complete:false
	},
	goodQuery: {
		chore: 'Leave the apartment forever and never come back',
		duedate: '08-30-2017',
		complete: false,
		userID: 2
	}
},
{
	name: 'Update rent information',
	uri: '/api/rent/1',
	badQuery: {
		amount: 1000000000
	},
	goodQuery: {
		amount: 1000000000,
		paid: true,
		userID: 1
	}
}
]

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

describe('The put endpoints', function(){
	before(function(done){
		cp.exec('mysql --user="server" --password="a" test < testing_db_data.sql', function(a, b, c){
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
			it('Rejects content-free requests', function(done){
				chai.request(app)
					.post(endpoint.uri)
					.end((err, res) => {
						retcode = res.status
						expect(res.status).to.equal(400)
						done()
					})
			})
			it('Rejects requests that only have some valid parameters', function(done){
				endpoint.badQuery.token = dummyUser.token
				chai.request(app)
					.post(endpoint.uri)
					.send(endpoint.badQuery)
					.end((err, res) => {
						retcode = res.status
						expect(res.status).to.equal(400)
						done()
					})
			})
			it('Rejects valid requests from users that are not logged in', function(done){
				chai.request(app)
					.post(endpoint.uri)
					.send(endpoint.goodQuery)
					.end((err, res) => {
						retcode = res.status
						expect(res.status).to.equal(401)
						done()
					})
			})
			it('Rejects valid requests from users that are not in that group', function(done){
				endpoint.goodQuery.token = dummyUser.token
				chai.request(app)
					.post(endpoint.uri)
					.send(endpoint.goodQuery)
					.end((err, res) => {
						retcode = res.status
						expect(res.status).to.equal(401)
						done()
					})
			})
			it ('Accepts valid requests', function(done){
				endpoint.goodQuery.token = lUser.token
				chai.request(app)
					.post(endpoint.uri)
					.send(endpoint.goodQuery)
					.end((err, res) => {
						retcode = res.status
						expect(res.status).to.equal(200)
						done()
					})
			})
		})
	})
})