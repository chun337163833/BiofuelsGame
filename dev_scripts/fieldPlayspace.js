goog.provide('biofuelsGame.fieldPlayspace');

// get requirements
goog.require('lime.Layer');
goog.require('lime.Sprite');

goog.require('biofuelsGame.field');

//---------------------------------------------------------
// Main entrypoint
//---------------------------------------------------------
biofuelsGame.fieldPlayspace = function(fieldCount)
{
	// must call super class
	lime.Layer.call(this);
	
	var grassBlocksNeededY = Math.ceil(fieldCount / 2.0) + 1;
	
    // fill in a grass background
    for (var y = 0; y < grassBlocksNeededY; y++) {
    	for (var x = 0; x < 3; x++ ) {
    		var backdrop = new lime.Sprite().setFill('assets/grass.png');
    		backdrop.setSize(151,151); // bah, make 1 pixel larger to prevent texture seams
    		backdrop.setAnchorPoint(0,0); // set upper left corner
    		backdrop.setPosition(x * 150, y * 150);
    		this.appendChild(backdrop);
    	}
    }
 
    var roundRect = new lime.RoundedRect().setSize(452,grassBlocksNeededY * 150 + 20).setRadius(12).setAnchorPoint(0.5,0).setPosition(225,-10);
	roundRect.setStroke(new lime.fill.Stroke(12, '#565636')); // #664 looks too light...fudge a bit darker...
	this.appendChild(roundRect);
	
	var x = 0, y = 0;
    
    // layer some fields on top
    for (var fieldIndex = 0; fieldIndex < fieldCount; fieldIndex++ ) {
    	var field = new biofuelsGame.field().setPosition(x * 200 + 125, y * 200 + 100);
    	this.appendChild(field);
    	x++;
    	if (x > 1) {
    		x = 0;
    		y++;
    	}
    }
};

// this is required for outside access after code is compiled in ADVANCED_COMPILATIONS mode
goog.inherits(biofuelsGame.fieldPlayspace, lime.Layer);
