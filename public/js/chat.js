$(function (){
	var $login = $('#login'),
		 $chat = $('#chat'),
		 $messages = $('#messages');

	var socket = io.connect('/');
	socket.on('connect', function(){
		console.log('Cliented with socket');
		init();
	});
	
	var init = function (){
   	$("#nickname").keyup(function (e){
			var code = e.which || e.keyCode;
			if(code == 13){
				setNickName($(this).val());
			}
		});
		$chat.hide();
	}	
	var setNickName = function (nickname){
		socket.emit('set_nickname', nickname, function (is_available){
			if(is_available){
				console.log('Nickname is available '+ nickname);
				setUpChat(nickname);
			}else{
				console.log('Nickname is not available '+nickname);
			};
		});	
	};
	var setUpChat = function(nickname){
		$login.hide();
		$chat.show();
		
		$('#submit-message').click(function(){
			sendMessage($('#message').val());
		});
		socket.on('message', function (nickname, message){
			console.log(nickname+' -- '+message);
			addMessage(nickname, message);
		});
	};
	var sendMessage = function (msg){
		socket.emit('message', msg);
	};
	var addMessage = function (nick, message){
		$messages.append($('<li>@'+nick+' : '+message+'</li>'));
	};
});
