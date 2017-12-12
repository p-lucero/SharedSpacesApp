const repl = require('repl')
const net = require('net')
let connections = 0

net.createServer((socket) => {
  connections += 1;
  repl.start({
    prompt: 'Node.js via TCP socket> ',
    input: socket,
    output: socket
  }).on('exit', () => {
    socket.end();
  });
}).listen(5001);

var express = require('express'),
  app = express(),
  port = process.env.PORT || 3001, // allow for using the test port
  mysql = require('mysql'),
  bodyParser = require('body-parser');


global.pool = mysql.createPool({
	connectionLimit: 10,
	host: 'localhost',
	user: 'root',
	database: process.env.DATABASE || 'deployment', // allow for using the test database
	insecureAuth: true
});

global.loginCache = [{email:'', loginTokens:[], groupID:-2147483647, userID:-2147483647}]

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var routes = require('./api/routes/serverRoutes'); //importing route
routes(app); //register the route

app.use(function(req, res) {
  res.status(404).send({url: req.originalUrl + ' not found'})
});

server = app.listen(port);

console.log('Shared Spaces server processor started on ' + port);

module.exports = {
	app: app,
	server: server
};