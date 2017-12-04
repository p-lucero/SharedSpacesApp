'use strict';

const uuidv4 = require('uuid/v4')
const common = require('../models/commonModel')

exports.login = function(request, response){
	var email = request.body.email
	var password = request.body.password
	var stayLoggedIn = request.body.stayLoggedIn
	if (typeof email === "undefined" || typeof password === "undefined" || (stayLoggedIn != true && stayLoggedIn != false && stayLoggedIn != "true" && stayLoggedIn != "false")){
		response.status(400).send({url: request.originalUrl + " received a badly formatted request"}) // validate parameters
	}
	else {
		let alreadyLoggedIn = false;
		for (let cachedLogin of global.loginCache) { // check if user's already logged in
			if (cachedLogin.loginTokens.indexOf(request.body.token) > -1) { // will fail anyways if the user has no login token, which is fine
				response.status(200).send({"success":"login successful", "token":request.body.token});
				alreadyLoggedIn = true
				break
			}
		}
		if (!alreadyLoggedIn) {
			global.pool.query("SELECT * FROM user_accounts WHERE email = ?", [email], function(err, task) { // check if the user gave us valid login credentials
				if (err){
					response.status(500).send(err)
				}
				else {
					if (task.length > 0){
						if (task[0].password == password){
							let token = uuidv4() // generate token
							response.status(200).send({"success":"login successful", "token":token, "user_id":task[0].id});
							var cached = false
							for (let cachedLogin of global.loginCache) { // if user has no login thingies, create one for them
								if (cachedLogin.email === email) {
									cachedLogin.loginTokens.push(token)
									cached = true
									break
								}
							}
							if (!cached){
								global.loginCache.push({email:email, loginTokens:[token], groupID:task[0].group_id, userID:task[0].id}) // scales very poorly but who cares
							}
							if (stayLoggedIn == "true"){
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
	var userInfo = common.get_info_from_token(request.body.token)
	var email = userInfo.email
	if (typeof token === "undefined" || !userInfo){
		response.status(400).send({url: request.originalUrl + " received a badly formatted request"}) // validate parameters
	}
	else {
		let idx = userInfo.loginTokens.indexOf(request.body.token)
		if (idx > -1){
			userInfo.loginTokens.splice(idx, 1)
			response.status(200).send({"success":"successfully logged out"})
		}
		if (userInfo.loginTokens.length === 0){
			global.loginCache.splice(global.loginCache.indexOf(userInfo), 1)
		}
	}
}

function forceLogout(token) {
	for (let cachedLogin of global.loginCache){
		let idx = cachedLogin.loginTokens.indexOf(token)
		if (idx > -1){
			cachedLogin.loginTokens.splice(idx, 1)
		}
		if (cachedLogin.loginTokens.length === 0){
			global.loginCache.splice(global.loginCache.indexOf(cachedLogin), 1)
		}
	}
}