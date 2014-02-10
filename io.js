module.exports = function(io){
	io.configure(function (){
		io.disable('log');
	});

	io.sockets.on('connection', function(socket){
		console.log('Client connected');
		socket.on('set_nickname', function (nickname, callback){
			console.log('trying to set nickname '+nickname );
			//socket.nickname = nickname;
			var isAvailable = isNicknameAvailable(nickname);
			if(isAvailable)
				socket.nickname = nickname;
			callback(isAvailable);
			
			sendMessage('SERVER','User @'+nickname+' has connected.');
		});
		socket.on('message', function (msg){
			sendMessage(socket.nickname, msg);
		});
		socket.on('disconnect', function(){
			sendMessage('SERVER','User @'+socket.nickname+' has disconnected.');
		});
	});
	
	var sendMessage = function (nick, message){
		console.log('NickName : '+nick+' message : '+message);
		io.sockets.emit('message', nick, message);
	};
	
	var isNicknameAvailable = function(nickname){
		//console.dir(io.sockets.clients());
		var clients = io.sockets.clients();
		for ( var client in clients ){
			if	(clients.hasOwnProperty(client)){
				client = clients[client];
				if	(client.nickname == nickname){
					return false;
				};
			};
		};
		return true;
	};
};
