// set main namespace
goog.provide('biofuelsGame');

// get requirements
goog.require('lime.Director');
goog.require('lime.Scene');
goog.require('lime.Layer');
goog.require('lime.Sprite');
goog.require('lime.audio.Audio');

goog.require('biofuelsGame.field');
goog.require('biofuelsGame.contractPane');
goog.require('biofuelsGame.clientHealth');
goog.require('biofuelsGame.gamePhaseDisplay');

// lame globals
var clickSound;
var popupSound;

//---------------------------------------------------------
// Main entrypoint
//---------------------------------------------------------
biofuelsGame.start = function(){

    var director = new lime.Director(document.body,1024,768);
    var scene = new lime.Scene();

    var gamePhaseDisplay = new biofuelsGame.gamePhaseDisplay();
    gamePhaseDisplay.setPosition(330, 50);
    scene.appendChild(gamePhaseDisplay);

    // fill in a grass background
    for (var y = 0; y < 4; y++) {
    	for (var x = 0; x < 3; x++ ) {
    		var backdrop = new lime.Sprite().setFill('assets/grass.png');
    		backdrop.setSize(151,151); // bah, make 1 pixel larger to prevent texture seams
    		backdrop.setAnchorPoint(0,0); // set upper left corner
    		backdrop.setPosition(x * 150, y * 150 + 100);
    		scene.appendChild(backdrop);
    	}
    }
 
    var roundRect = new lime.RoundedRect().setSize(452,620).setRadius(12).setAnchorPoint(0.5,0).setPosition(225,90);
//    this.setFill('#FEF8D0').setOpacity(0.8);
	roundRect.setStroke(new lime.fill.Stroke(12, '#434325'));     
	scene.appendChild(roundRect);
	
    var countOfFields = 6, x = 0, y = 0;
    
    // layer some fields on top
    for (var fieldIndex = 0; fieldIndex < countOfFields; fieldIndex++ ) {
    	var field = new biofuelsGame.field().setPosition(x * 200 + 125, y * 200 + 200);
    	scene.appendChild(field);
    	x++;
    	if (x > 1) {
    		x = 0;
    		y++;
    	}
    }

    var cornContract = new biofuelsGame.contractPane("Corn Contract", 'assets/corn_icon.png');
    cornContract.setPosition(560, 90);
    scene.appendChild(cornContract);

    var switchgrassContract = new biofuelsGame.contractPane("Switchgrass Contract", 'assets/grass_icon.png');
    switchgrassContract.setPosition(560, 190);
    scene.appendChild(switchgrassContract);
    
    var farmerHealth = new biofuelsGame.clientHealth();
    farmerHealth.setPosition(560,390);
    scene.appendChild(farmerHealth);
        
    director.makeMobileWebAppCapable();
	    
    // set current scene active
    director.replaceScene(scene);
    
    // bah, load some global sounds here
    clickSound = new lime.audio.Audio('assets/click.mp3');
    popupSound = new lime.audio.Audio('assets/popup.mp3');
};

// this is required for outside access after code is compiled in ADVANCED_COMPILATIONS mode
goog.exportSymbol('biofuelsGame.start', biofuelsGame.start);
