goog.provide('biofuelsGame.mouseOverSprite');

goog.require('lime.Sprite');
goog.require('lime.animation.FadeTo');
goog.require('lime.animation.ScaleTo');

//--------------------------------------------------------------------------------------------------
// Mouse over sprite subclass - subclass of lime.sprite
//--------------------------------------------------------------------------------------------------
biofuelsGame.mouseOverSprite = function(startDisabled) 
{
    // must call super constructor
    lime.Sprite.call(this);
	
    this.ANIMATION_SPEED_IN = 0.05;
    this.ANIMATION_SPEED_OUT = 0.15;
    this.DEFAULT_SCALE = 1.0;
    this.MOUSEOVER_SCALE = 1.1;
	
    this.DEFAULT_OPACITY = 0.5;
    this.MOUSEOVER_OPACITY = 1.0;

    this.setOpacity(this.DEFAULT_OPACITY);
    if (!goog.isDef(startDisabled) || (goog.isDef(startDisabled) && !startDisabled))  
    {
    	this.enableMouseOver();
    }
};

goog.inherits(biofuelsGame.mouseOverSprite, lime.Sprite);

//--------------------------------------------------------------------------------------------------
biofuelsGame.mouseOverSprite.prototype.animateToDefaults = function() 
{
	this.runAction( new lime.animation.FadeTo(this.DEFAULT_OPACITY).setDuration(this.ANIMATION_SPEED_OUT) );
	this.runAction( new lime.animation.ScaleTo(this.DEFAULT_SCALE).setDuration(this.ANIMATION_SPEED_OUT) );
};

//--------------------------------------------------------------------------------------------------
biofuelsGame.mouseOverSprite.prototype.enableMouseOver = function() {

	// Add mouse over event
	goog.events.listen(this, 'mouseover', function(evt) 
	{
		this.runAction( new lime.animation.FadeTo(this.MOUSEOVER_OPACITY).setDuration(this.ANIMATION_SPEED_IN) );
		this.runAction( new lime.animation.ScaleTo(this.MOUSEOVER_SCALE).setDuration(this.ANIMATION_SPEED_IN) );
		
		// Add a new temporary listener that watches mousemove and if mouse off of sprite, then
		//	revert the sprite to normal/default state and clear the mousemove listener
		var key = goog.events.listen(this.getScene(), 'mousemove', 
			function(event) 
			{
				 if (!this.hitTest(event))
				 {
				 	 this.animateToDefaults();
					 goog.events.unlistenByKey(key);
				 }	
		
			},
		false,this);
	}); // <mouseover listen event};
}

//--------------------------------------------------------------------------------------------------
biofuelsGame.mouseOverSprite.prototype.disableInteractions = function(revertSpriteToDefaults) {

	if (revertSpriteToDefaults) {
		this.animateToDefaults();
	}
	
	// remove all listen events on us
	goog.events.removeAll(this);
	goog.events.removeAll(this.getScene());
};

