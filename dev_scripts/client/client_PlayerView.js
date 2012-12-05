goog.provide('biofuelsGame.client_PlayerView');

// get requirements
goog.require('lime.Director');
goog.require('lime.Scene');
goog.require('lime.Layer');
goog.require('lime.Sprite');
goog.require('lime.audio.Audio');

goog.require('biofuelsGame.fieldPlayspace');
goog.require('biofuelsGame.contractPane');
goog.require('biofuelsGame.playerHealth');
goog.require('biofuelsGame.gamePhaseDisplay');

goog.require('biofuelsGame.localEarningsGraph');
goog.require('biofuelsGame.aggregateGraphEarnings');

goog.require('biofuelsGame.client_Connection');

// lame globals
var clickSound;
var popupSound;

var g_client_PlayerView;

//---------------------------------------------------------
// Main entrypoint
//---------------------------------------------------------
biofuelsGame.client_PlayerViewStart = function()
{
	g_client_PlayerView = new biofuelsGame.client_PlayerView();
}

// this is required for outside access after code is compiled in ADVANCED_COMPILATIONS mode
goog.exportSymbol('biofuelsGame.client_PlayerViewStart', biofuelsGame.client_PlayerViewStart);

//---------------------------------------------------------
biofuelsGame.client_PlayerView = function()
{
	var NUM_FIELDS = 6;
	
	var director = new lime.Director(document.body,1024,768);
	var scene = new lime.Scene();//.setRenderer(lime.Renderer.CANVAS);
	scene.setQuality(2);
	
	try
	{
		this.connection = new biofuelsGame.client_Connection();
		this.connection.eventToServer('addUserToRoom', 'someRoomName', 'somePassword');
		this.connection.eventToServer('setUserName', 'jdischler');
	
		this.connection.eventToServer('get', 'num_fields');
    
		this.connection.socket.on('fromGetRequest', function(data1, data2) {
			if (data1 === 'num_fields') {
				NUM_FIELDS = data2;
			}
		});
	}
	catch(err)
	{
		console.log(err);
	}
	
	// bah, load some global sounds here
    clickSound = new lime.audio.Audio('assets/click.mp3');
    popupSound = new lime.audio.Audio('assets/popup.mp3');    

	var gamePhaseDisplay = new biofuelsGame.gamePhaseDisplay();
	gamePhaseDisplay.setPosition(330, 40);
	scene.appendChild(gamePhaseDisplay);

	this.fieldPlayspace = new biofuelsGame.fieldPlayspace(NUM_FIELDS).setAnchorPoint(0.5, 0).setPosition(0, 90);
	scene.appendChild(this.fieldPlayspace);
	
	var cornContract = new biofuelsGame.contractPane("Corn Contract", 'assets/corn_icon.png');
	cornContract.setPosition(560, 80);
	scene.appendChild(cornContract);

	var switchgrassContract = new biofuelsGame.contractPane("Switchgrass Contract", 'assets/grass_icon.png');
	switchgrassContract.setPosition(560, 180); 
	scene.appendChild(switchgrassContract);
	
	var farmerHealth = new biofuelsGame.playerHealth();
	farmerHealth.setPosition(560,360);
	scene.appendChild(farmerHealth);
		
	var graphEarnings = new biofuelsGame.localEarningsGraph();
	graphEarnings.setPosition(560,520);
	scene.appendChild(graphEarnings);
	
	director.makeMobileWebAppCapable();
		
	// set current scene active
	director.replaceScene(scene);    
};

