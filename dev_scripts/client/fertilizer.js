goog.provide('biofuelsGame.fertilizer');

goog.require('biofuelsGame.mouseOverSprite');

//--------------------------------------------------------------------------------------------------
// Fertilizer icon subclass test - subclass of mouse_over_sprite
//--------------------------------------------------------------------------------------------------
biofuelsGame.fertilizer = function() 
{
    // must call super constructor
    biofuelsGame.mouseOverSprite.call(this);
	
    this.fertilizer_state = 0;

    this.setFill('assets/fertilizer_no_icon.png');
    this.setSize(50,50);
    this.setOpacity(this.DEFAULT_OPACITY);	

    this.enableClickInteraction();
};

goog.inherits(biofuelsGame.fertilizer, biofuelsGame.mouseOverSprite);

//--------------------------------------------------------------------------------------------------
biofuelsGame.fertilizer.prototype.enableClickInteraction = function()
{
	// Add click event
	goog.events.listen(this, ['mousedown', 'touchstart'], function(evt) 
	{
		clickSound.stop();
		clickSound.play();

		// Toggle state and adjust icon image
		this.fertilizer_state = !this.fertilizer_state;
		if (this.fertilizer_state == 0) 
		{
			this.setFill('assets/fertilizer_no_icon.png');
		}
		else 
		{
			this.setFill('assets/fertilizer_yes_icon.png');
		}
	
	}); // <mousedown listen event
};

//--------------------------------------------------------------------------------------------------
biofuelsGame.fertilizer.prototype.enableInteractions = function() 
{
	biofuelsGame.mouseOverSprite.prototype.enableMouseOver.call(this);
	this.enableClickInteraction();
};

