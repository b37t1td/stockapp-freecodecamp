var express = require('express');
var http = require('http');
var app = express();
var path = require('path');
var db = null;

var server = http.createServer(app);
var io = require('socket.io').listen(server);

app.use(express.static('public'));
app.use(function(req, res, next) {
	res.setHeader('Content-Type', 'application/json');
	next();
});

db = new require('./database')(function() {

var stock = new require('./stock')(app);
require('./sockets')(io, db, stock);


  server.listen(process.env.PORT, function() {
    console.log('Application started on :' + process.env.PORT);
  });
});
