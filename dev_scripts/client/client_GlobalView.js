goog.provide('biofuelsGame.client_GlobalView');

// get requirements
goog.require('lime.Director');
goog.require('lime.Scene');
goog.require('lime.Layer');
goog.require('lime.Sprite');
goog.require('lime.audio.Audio');

goog.require('biofuelsGame.fieldPlayspace');
goog.require('biofuelsGame.contractPane');
goog.require('biofuelsGame.gamePhaseDisplay');

goog.require('biofuelsGame.localEarningsGraph');
goog.require('biofuelsGame.aggregateGraphEarnings');

goog.require('biofuelsGame.client_Connection');

// Silly, lame global
var g_client_GlobalView;

//---------------------------------------------------------
//
// Global/Aggregate Viewer entry point
//
//---------------------------------------------------------
biofuelsGame.client_GlobalViewStart = function()
{
	g_client_GlobalView = new biofuelsGame.client_GlobalView();
}

goog.exportSymbol('biofuelsGame.client_GlobalViewStart', biofuelsGame.client_GlobalViewStart);

//---------------------------------------------------------
biofuelsGame.client_GlobalView = function()
{
	// add a global view connection to the server
	this.connection = new biofuelsGame.client_Connection('addGlobalView', 'someRoomName', 'somePassword');

    var director = new lime.Director(document.body,1024,768);
    var scene = new lime.Scene();
    scene.setQuality(2);

    var gamePhaseDisplay = new biofuelsGame.gamePhaseDisplay();
    gamePhaseDisplay.setPosition(330, 40);
    scene.appendChild(gamePhaseDisplay);

    this.aggregateGraphEarnings = new biofuelsGame.aggregateGraphEarnings();
    this.aggregateGraphEarnings.setPosition(330, 180);
    scene.appendChild(this.aggregateGraphEarnings);

 	this.clientList = makeLabel('jdischler craig chad leggers fun bad now', 330, 500, 14, '#000', 'center').setSize(1 ,100);
 	scene.appendChild(this.clientList);
    
    director.makeMobileWebAppCapable();
	    
    // set current scene active
    director.replaceScene(scene);
    
    this.connection.socket.on('sendClientList', function (usernames) {
    	console.log(usernames);
    	// FIXME: ugh, lame.  anything 'this' does not work here?  Why?
    	//this.clientList.setText(usernames);
    	// FIXME: in fact, this doesn't work either?  Why?
    	//biofuelsGame.globalViewClient.updateUserList.call(globalViewClient, usernames);
    	g_client_GlobalView.clientList.setText(usernames);
	});
}
/*
biofuelsGame.globalViewClient.prototype.updateUserList = function(userList)
{
	this.clientList.setText(userList);
}
*/
