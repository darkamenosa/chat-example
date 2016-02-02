var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket) {
	console.log("An user is connected");

	socket.on('disconnect', function() {
		console.log("User is disconnected")
	});

	socket.on('chat', function(msg) {
		console.log("Chat Msg: " + msg);
		io.emit('chat', msg);
	});
});


var server_port = process.env.OPENSHIFT_NODEJS_PORT || 3000
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1'


http.listen(server_port, server_ip_address, function(){
  console.log('listening on *:3000');
});