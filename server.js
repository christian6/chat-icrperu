var express = require('express'),
	http = require('http');
//var app = express.createServer();
var app = express();
var server = http.createServer(app);
var PORT = 4000;
var io = require('socket.io').listen(server);
//server.listen(PORT);

server.listen(PORT, function (){
	console.log('Listening on Port 4000');
});

app.configure(function (){
	app.set('view options', {
		layout: false
	});	
	app.use(express.static(__dirname + '/public'));
});

app.get('/', function(request, response){
	//response.send("Hello World");
	response.render('main.jade')
});

io.sockets.on('connetion', function(socket){
	console.log("client Connect");
	socket.on('set_nickname', function(nickname){
		console.log('Trying to set nickname '+nickname);
	});
});
