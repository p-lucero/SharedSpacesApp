var express = require('express'),
  app = express(),
  port = process.env.PORT || 3001,
  mysql = require('mysql'),
  bodyParser = require('body-parser');


global.pool = mysql.createPool({
	connectionLimit: 10,
	host: 'localhost',
	user: 'root',
	database: 'deployment',
	insecureAuth: true
});

global.loginCache = []

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var routes = require('./api/routes/serverRoutes'); //importing route
routes(app); //register the route

app.use(function(req, res) {
  res.status(404).send({url: req.originalUrl + ' not found'})
});

app.listen(port);

console.log('Shared Spaces server processor started on ' + port);