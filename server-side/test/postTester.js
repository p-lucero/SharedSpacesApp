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
	name: 'Create group',
	uri: '/api/groups',
	badQuery: {
		'nroupGame': 'groupName'
	},
	goodQuery: {
		groupName: 'Definitely Not Shared Spaces'
	}
},
{
	name: 'Create user',
	uri: '/api/users',
	badQuery: {
		email:'foo@bar.com',
		password:'foofoofoo',
		phoneNumber:'1111111111'
	},
	goodQuery: {
		first:'Foo',
		last:'Bar',
		email:'foo@bar.com',
		password:'feefiefoofum',
		phoneNumber:'999999999'
	},
	invalidEmailQuery: {
		first:'Foo',
		last:'Bar',
		email:'foobarfoobarfoobar',
		password:'feefiefoofum',
		phoneNumber:'999999999'
	},
	alreadyRegisteredQuery: {
		first:'John',
		last:'Digweed',
		email:'jd@gmail.com',
		password:'wordpass',
		phoneNumber:'5555555555'
	}
},
{
	name: 'Create group debt',
	uri: '/api/groupDebts/2',
	badQuery: {
		debtType: 'House burned down'
	},
	goodQuery: {
		debtType: 'House burned down',
		amount: 9999999999
	},
},
{
	name: 'Create personal debt',
	uri: '/api/personalDebts',
	badQuery: {
		amount: 999999999
	},
	goodQuery: {
		lender: 3,
		borrower: 2,
		amount: 999999999
	},
},
{
	name: 'Create grocery item',
	uri: '/api/groceries/2',
	badQuery: {
		amount: 444444444
	},
	goodQuery: {
		amount: 444444444,
		userID: 5
	},
},
{
	name: 'Create chore',
	uri: '/api/chores/2',
	badQuery: {
		chore: 'Clean the goddamn sink'
	},
	goodQuery: {
		chore: 'Clean the goddamn sink',
		due_date: '02-02-2020', // may break things; what formats can mysql accept dates in? need to input fuzz this
		userID: 5
	},
},
{
	name: 'Create rent',
	uri: '/api/rent/2',
	badQuery: {
		amount: 'six billion and two'
	},
	goodQuery: {
		amount: 1,
		userID: 5
	},
},
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

describe('The post endpoints', function(){
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
					otherRequest.stayLoggedIn = true
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
						expect(res.status).to.equal(401)
						done()
					})
			})
			it('Rejects requests that only have some valid parameters', function(done){
				if (endpoint.uri.endsWith('2')){
					endpoint.badQuery.token = dummyUser.token
				}
				else {
					endpoint.badQuery.token = lUser.token
				}
				chai.request(app)
					.post(endpoint.uri)
					.send(endpoint.badQuery)
					.end((err, res) => {
						retcode = res.status
						expect(res.status).to.equal(400)
						done()
					})
			})
			if (endpoint.name !== "Create user"){
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
			}
			if (endpoint.name === "Create group"){
				it('Rejects valid requests from users that are already part of a group', function(done){
					endpoint.goodQuery.token = dummyUser.token
					chai.request(app)
						.post(endpoint.uri)
						.send(endpoint.goodQuery)
						.end((err, res) => {
							retcode = res.status
							expect(res.status).to.equal(409)
							expect(res.body).to.have.property('url').that.is.a('string')
							done()
						})
				})
			}
			if (endpoint.name === "Create user"){
				it('Rejects invalid email addresses', function(done){
					chai.request(app)
						.post(endpoint.uri)
						.send(endpoint.invalidEmailQuery)
						.end((err, res) => {
							retcode = res.status
							expect(res.status).to.equal(400)
							expect(res.body).to.have.property('url').that.is.a('string') // HACK
							done()
						})
				})
				it('Rejects valid requests from users that are already registered', function(done){
					chai.request(app)
						.post(endpoint.uri)
						.send(endpoint.alreadyRegisteredQuery)
						.end((err, res) => {
							retcode = res.status
							expect(res.status).to.equal(409)
							expect(res.body).to.have.property('url').that.is.a('string')
							done()
						})
				})
			}
			if (endpoint.uri.endsWith('2') || endpoint.name == "Create personal debt"){
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
			}
			it ('Accepts valid requests', function(done){
				endpoint.goodQuery.token = lUser.token
				chai.request(app)
					.post(endpoint.uri)
					.send(endpoint.goodQuery)
					.end((err, res) => {
						retcode = res.status
						expect(res.status).to.equal(200)
						if (endpoint.name === "Create group"){
							expect(res.body).to.have.property('id')
						}
						if (endpoint.name === "Create user"){
							expect(res.body).to.have.property('token')
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