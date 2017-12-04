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

describe('The server', function() {
	it('Launches', function(done){
		expect(server).to.not.be.empty;
		done()
	})
	it('Creates an expressJS app', function(done){
		expect(server).to.have.nested.property('_router.stack')
		expect(server._router.stack).to.have.lengthOf(22)
		done()
	})
	it('Connects to mySQL', function(done){
		expect(global.pool).to.not.be.empty;
		done()
	})
	it('404s on garbage URLs', function(done){
		chai.request(server)
			.post('/api/garbage')
			.end((err, res) => {
				expect(res.status).to.equal(404);
				done();
			})
	})
})