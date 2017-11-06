var express = require('express'),
  app = express(),
  port = process.env.PORT || 3001,
  mysql = require('mysql'),
  Task = require('./api/models/serverModel'),
  bodyParser = require('body-parser');


global.con = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	database: 'deployment',
	insecureAuth: true
});

con.connect(function(err){
	if (err) throw err;
	console.log("Connected!");
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var routes = require('./api/routes/serverRoutes'); //importing route
routes(app); //register the route

app.use(function(req, res) {
  res.status(404).send({url: req.originalUrl + ' not found'})
});

app.listen(port);

console.log('Shared Spaces server processor started on ' + port);