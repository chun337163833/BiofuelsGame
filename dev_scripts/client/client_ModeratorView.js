goog.provide('biofuelsGame.client_ModeratorView');

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
goog.require('biofuelsGame.createRoom');

// Silly, lame globals
var g_client_ModeratorView;

//---------------------------------------------------------
//
// Moderator Viewer entry point
//
//---------------------------------------------------------
biofuelsGame.client_ModeratorViewStart = function()
{
	g_client_ModeratorView = new biofuelsGame.client_ModeratorView();
}

goog.exportSymbol('biofuelsGame.client_ModeratorViewStart', biofuelsGame.client_ModeratorViewStart);

//---------------------------------------------------------
biofuelsGame.client_ModeratorView = function()
{
	// Add a moderator to the server
	this.connection = new biofuelsGame.client_Connection();
	    
    this.director = new lime.Director(document.body,1024,768);
    var scene = new lime.Scene();
	    
    this.login = new biofuelsGame.createRoom(this).setPosition(330,200);
    scene.appendChild(this.login);
    
    this.director.makeMobileWebAppCapable();
	    
    // set current scene active
    this.director.replaceScene(scene);	
}

//---------------------------------------------------------
biofuelsGame.client_ModeratorView.prototype.launchServer = function(roomName, roomPassword)
{
	this.login.setHidden(true);
    var scene = new lime.Scene();
    
    this.gamePhaseDisplay = new biofuelsGame.gamePhaseDisplay();
    this.gamePhaseDisplay.setPosition(330, 40);
    scene.appendChild(this.gamePhaseDisplay);

	this.director.replaceScene(scene);	
    
	this.connection.eventToServer('addModerator', roomName, roomPassword);

    this.connection.eventToServer('set', 'num_fields', 4);
	this.connection.eventToServer('set', 'use_contracts', 0);

};
