
goog.provide('biofuelsGame.client_Connection');

biofuelsGame.client_Connection = function(connectEvent, data)
{
	this.socket = io.connect('http://localhost:8080');
	if (connectEvent != undefined) {
		this.eventToServer(connectEvent, data);
	}
}

biofuelsGame.client_Connection.prototype.eventToServer = function(event, data1, data2)
{
	console.log('sending event to server: [' + event + '] [' + data1 + '] [' + data2 + ']');
	this.socket.emit(event, data1, data2);
}

biofuelsGame.client_Connection.prototype.messageServer = function(message)
{
	console.log('Messaging to server');
	this.socket.send(message);
}

