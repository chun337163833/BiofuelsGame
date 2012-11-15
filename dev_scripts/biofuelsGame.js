// set main namespace
goog.provide('biofuelsGame');

// get requirements
goog.require('lime.Director');
goog.require('lime.Scene');
goog.require('lime.Layer');
goog.require('lime.Sprite');
goog.require('lime.audio.Audio');

goog.require('biofuelsGame.fieldPlayspace');
goog.require('biofuelsGame.contractPane');
goog.require('biofuelsGame.clientHealth');
goog.require('biofuelsGame.gamePhaseDisplay');

goog.require('biofuelsGame.localEarningsGraph');
goog.require('biofuelsGame.aggregateGraphEarnings');

// lame globals
var clickSound;
var popupSound;

//---------------------------------------------------------
// Main entrypoint
//---------------------------------------------------------
biofuelsGame.start = function()
{
	var NUM_FIELDS = 6;
	
    var director = new lime.Director(document.body,1024,768);
    var scene = new lime.Scene();

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
    
    var farmerHealth = new biofuelsGame.clientHealth();
    farmerHealth.setPosition(560,360);
    scene.appendChild(farmerHealth);
        
    var graphEarnings = new biofuelsGame.localEarningsGraph();
    graphEarnings.setPosition(560,520);
    scene.appendChild(graphEarnings);
    
    director.makeMobileWebAppCapable();
	    
    // set current scene active
    director.replaceScene(scene);
    
    // bah, load some global sounds here
    clickSound = new lime.audio.Audio('assets/click.mp3');
    popupSound = new lime.audio.Audio('assets/popup.mp3');
};

// this is required for outside access after code is compiled in ADVANCED_COMPILATIONS mode
goog.exportSymbol('biofuelsGame.start', biofuelsGame.start);

// TODO: probably move this into its own file?
//---------------------------------------------------------
// Global/Aggregate Viewer entry point
//---------------------------------------------------------
biofuelsGame.globalViewStart = function()
{
    var director = new lime.Director(document.body,1024,768);
    var scene = new lime.Scene();

    var gamePhaseDisplay = new biofuelsGame.gamePhaseDisplay();
    gamePhaseDisplay.setPosition(330, 50);
    scene.appendChild(gamePhaseDisplay);

    this.aggregateGraphEarnings = new biofuelsGame.aggregateGraphEarnings();
    this.aggregateGraphEarnings.setPosition(330, 190);
    scene.appendChild(this.aggregateGraphEarnings);

    director.makeMobileWebAppCapable();
	    
    // set current scene active
    director.replaceScene(scene);
}

goog.exportSymbol('biofuelsGame.globalViewStart', biofuelsGame.globalViewStart);
