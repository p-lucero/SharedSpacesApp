'use strict';

const uuidv4 = require('uuid/v4')

exports.login = function(request, response){
	var email = request.body.email
	var password = request.body.password
	var stayLoggedIn = request.body.stayLoggedIn
	if (typeof email === "undefined" or typeof password === "undefined" or (stayLoggedIn != "true" and stayLoggedIn != "false")){
		response.status(400).send({url: request.originalUrl + " received a badly formatted request"}) // validate parameters
	}
	else {
		let alreadyLoggedIn = false;
		for (let cachedLogin of global.loginCache) { // check if user's already logged in
			if (cachedLogin.loginTokens.indexOf(request.body.token) > -1) { // will fail anyways if the user has no login token, which is fine
				response.status(200).send({"success":"login successful", "token":token});
				alreadyLoggedIn = true
				break
			}
		}
		if (!alreadyLoggedIn) {
			global.pool.query("SELECT * FROM users WHERE email = ?", [email], function(err, task) { // check if the user gave us valid login credentials
				if (err){
					response.status(400).send(err)
				}
				else {
					if (task.length > 0){
						if (task[0].password == password){
							let token = uuidv4() // generate token
							response.status(200).send({"success":"login successful", "token":token});
							var cached = false
							for (let cachedLogin of global.loginCache) { // if user has no login thingies, create one for them
								if (cachedLogin.email === email) {
									cachedLogin.loginTokens.push(token)
									cached = true
									break
								}
							}
							if (!cached){
								global.loginCache.push({email:email, loginTokens:[token]}) // scales very poorly but who cares
							}
							if (stayLoggedIn){
								setTimeout(forceLogout, 1000 * 60 * 60 * 24 * 30, token) // login expires in a month
							}
							else {
								setTimeout(forceLogout, 1000 * 60 * 60 * 24, token) // login expires in a day
							}
						}
						else {
							response.status(401).send({"success":"invalid email or password"});
						}
					}
					else {
						response.status(401).send({"success":"account does not exist"});
					}
				}
			});
		}
	}
}

exports.logout = function(request, response){
	var token = request.body.token
	if (typeof token === "undefined"){
		response.status(400).send({url: request.originalUrl + " received a badly formatted request"}) // validate parameters
	}
	let isLoggedInSomewhere = false;
	for (let cachedLogin of global.loginCache){
		if (cachedLogin.email === email) {
			isLoggedInSomewhere = true;
			let idx = cachedLogin.loginTokens.indexOf(request.body.token)
			if (idx > -1){
				cachedLogin.splice(idx, 1)
				response.status(200).send({"success":"successfully logged out"})
			}
			else {
				response.status(401).send({url: request.originalUrl + " received a logout request from a user that is not logged in on this device"})
			}
			if (cachedLogin.loginTokens.length === 0){
				global.loginCache.splice(global.loginCache.indexOf(cachedLogin), 1)
			}
		}
	}
	if (!isLoggedInSomewhere) {
		response.status(401).send({url: request.originalUrl + " received a logout request from a user that is not logged in on this device"})
	}
}

function forceLogout(token) {
	for (let cachedLogin of global.loginCache){
		let idx = cachedLogin.loginTokens.indexOf(request.body.token)
		if (idx > -1){
			cachedLogin.splice(idx, 1)
		}
		if (cachedLogin.loginTokens.length === 0){
			global.loginCache.splice(global.loginCache.indexOf(cachedLogin), 1)
		}
	}
}