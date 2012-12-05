
var server = new biofuelsServer(8080);

function settings()
{
}

//----------------------------------------------------------------------------
function room()
{
	// Room name must be unique
	this.roomName = 0;
	
	// array of user/player sockets - moderator and global view sockets are not in here
	this.users = new Array();
		
	// references to certain sockets that are for very custom clients
	this.moderator = undefined;
	this.globalView = undefined;

	this.settings = new settings();
	
	// TODO: add any default other room settings 
	this.settings['num_fields'] = 4;
	this.settings['use_contracts'] = 1;
};

var g_room;

// Biofuels Server Test
//----------------------------------------------------------------------------
function biofuelsServer(port) 
{
	g_room = new room();
	g_room.roomName = 'TestRoom';
	
	// socket.io module test
	var app = require('http').createServer();
	var io = require('socket.io').listen(app);

	app.listen(port);

	io.sockets.on('connection', onConnect);
	
	console.log('Server running at http://127.0.0.1:' + port);
}

//----------------------------------------------------------------------------
function onConnect(socket) 
{
	console.log('Connection request handled from socket with ID:' + socket.id);

	// serverLog(socket);
	
	socket.on('addGlobalView', function(roomName, password) {
		// TODO: global view should specify a room that they are entering
		socket.room = g_room;
		
		socket.join(socket.room.roomName);
		socket.room.globalView = socket;
		
		// Update any clients that have already connected
		trySendClientList(socket.room);
	});
	
	socket.on('addModerator', function (roomName, password) {
		// TODO: roomName is passed in here...create a new room	
		// TODO: allow a moderator to enter a custom room, or more likely, they enter a room that they create
		socket.room = g_room;
		
		socket.join(socket.room.roomName);
		socket.room.moderator = socket;
		
		// Set can only be accessed off of addModerator
		socket.on('set', function (setting, value) {
			socket.room.settings[setting] = value;
		});
	});
	
	socket.on('addUserToRoom', function (roomName, password) {
		// TODO: allow a user to enter a custom room
		socket.room = g_room;
		
		socket.userName = '***';
		socket.join(socket.room.roomName);
		
		socket.room.users.push(socket);
		trySendClientList(socket.room);
		
		// Set can only be accessed off of addUserToRoom
		socket.on('setUserName', function (userName) {
			socket.userName = userName;
			trySendClientList(socket.room);
		});
	});  

	socket.on('get', function(setting) {
		console.log("get request for setting: " + setting);
		socket.emit('fromGetRequest', setting, socket.room.settings[setting]); 	
	});
	
	socket.on('disconnect', function() {
		onDisconnect(socket);
	});
};

// pass in a room object - and emits
//----------------------------------------------------------------------------
function trySendClientList(forRoom) 
{
	var clientList = '';

	if (forRoom.globalView == undefined) {
		return;
	}
	
	for (var i = 0; i < forRoom.users.length; i++) {
		clientList += forRoom.users[i].userName + " ";
	}
	
	forRoom.globalView.in(forRoom.roomName).emit('sendClientList', clientList);
}

//----------------------------------------------------------------------------
function onDisconnect(socket)
{
	// Is the disconnecting socket the moderator?  If so, now what?
	if (typeof socket.room.moderator != 'undefined' && socket.id == socket.room.moderator.id) 
	{
		// broadcasts to everyone in room named room.roomName
		io.sockets.in(socket.room.roomName).emit('moderatorShutdown');
		socket.room.moderator = undefined;
	}
	else if (typeof socket.room.globalView != 'undefined' && socket.id == socket.room.globalView.id) 
	{
		socket.room.globalView = undefined;
		// TODO: any cleanup needed if globalView shutsdown, nothing major comes to mind just now
	}
	else // client disconnect 
	{
		for (var i = 0; i < socket.room.users.length; i++) 
		{
			if (socket.id == socket.room.users[i].id) 
			{
				// remove client from array and update the global view
				socket.room.users.splice(i,1);
				trySendClientList(socket.room);
				break;
			}
		}	
	}
	
	// TODO: needs to check any known rooms
	console.log('Disconnect received for socket ID:' + socket.id);
}

//----------------------------------------------------------------------------
function serverLog(socket) 
{
	(function() {
		var emit = socket.emit;
		socket.emit = function() {
			console.log('***','emit', Array.prototype.slice.call(arguments));
			emit.apply(socket, arguments);
		};
		var $emit = socket.$emit;
		socket.$emit = function() {
			console.log('***','on',Array.prototype.slice.call(arguments));
			$emit.apply(socket, arguments);
		};
	})();
}

