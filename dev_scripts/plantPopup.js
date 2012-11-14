goog.provide('biofuelsGame.plantPopup');

//goog.require('lime.Layer');
goog.require('biofuelsGame.mouseOverSprite');
goog.require('lime.animation.FadeTo');
goog.require('lime.animation.ScaleTo');

//--------------------------------------------------------------------------------------------------
// Plant popup subclass - subclass of lime.sprite
//--------------------------------------------------------------------------------------------------
biofuelsGame.plantPopup = function() 
{
    // must call super constructor
    lime.Sprite.call(this);
        
    this.setSize(90,90).setFill('assets/planting_popup_bg.png');
	    
    // 'false' so mouse over sprite starts off disabled
    this.cornIcon = new biofuelsGame.mouseOverSprite(false);
    this.cornIcon.setFill('assets/corn_icon.png');
    this.cornIcon.setPosition(-22,-20).setSize(40,40);
    this.appendChild(this.cornIcon);
    
    this.grassIcon = new biofuelsGame.mouseOverSprite(false); // start disabled
    this.grassIcon.setFill('assets/grass_icon.png');
    this.grassIcon.setPosition(22,-20).setSize(40,40);
    this.appendChild(this.grassIcon);
    
    this.nothingIcon = new biofuelsGame.mouseOverSprite(false); // start disabled
    this.nothingIcon.setFill('assets/nothing_icon.png');
    this.nothingIcon.setPosition(0,20).setSize(40,40);
    this.appendChild(this.nothingIcon);
  
    this.setHidden(true);
};		

goog.inherits(biofuelsGame.plantPopup, lime.Sprite);

//--------------------------------------------------------------------------------------------------
biofuelsGame.plantPopup.prototype.showPopup = function()
{
    this.setScale(0).setOpacity(1).setHidden(false);
	this.runAction( new lime.animation.ScaleTo(1).setDuration(0.05) );

	this.grassIcon.enableMouseOver();
	this.cornIcon.enableMouseOver();
	this.nothingIcon.enableMouseOver();

	//---------------------------
	// Add click event
	//---------------------------
	goog.events.listen(this, ['mousedown', 'touchstart'], function(evt) 
	{
		delete this.popupSelectionResult;

		if (this.cornIcon.hitTest(evt)) 
		{
			this.popupSelectionResult = "corn";
		}
		else if (this.grassIcon.hitTest(evt)) 
		{
			this.popupSelectionResult = "grass";
		}
		else if (this.nothingIcon.hitTest(evt)) 
		{
			this.popupSelectionResult = "nothing";
		}

		if (this.popupSelectionResult) 
		{
			clickSound.stop();
			clickSound.play();
		}
		
		goog.events.removeAll(this);
		// TODO: kinda lame.  Need a better way to message back to the field object what
		//	the result was
		this.getParent().dispelPopup();
		this.hidePopup();
		
	}); // <mousedown listen event
	
	
	//---------------------------
	// Add mouse over event
	//---------------------------
	goog.events.listen(this, 'mouseover', function(evt) 
	{
		// Add a new temporary listener that watches mousemove and if mouse off of sprite,
		//	then revert sprite to normal/default state and clear the mousemove listener.
		var key = goog.events.listen(this.getScene(), 'mousemove', 
			function(e) 
			{
				if (!this.hitTest(e))
				{
					goog.events.unlistenByKey(key);
					goog.events.removeAll(this);
					// TODO: kinda lame.  Need a better way to message back to the field object what
					//	the result was
				 	this.getParent().dispelPopup();
				 	this.hidePopup();
				}	
			},
		null,this);
	}); // <mouseover listen event
}

//--------------------------------------------------------------------------------------------------
biofuelsGame.plantPopup.prototype.hidePopup = function()
{
	var hideDelay = 0.1;
		
	this.grassIcon.disableInteractions(true); // revert sprite if needed
	this.cornIcon.disableInteractions(true); // revert sprite if needed
	this.nothingIcon.disableInteractions(true); // revert sprite if needed

	// fade and call setHidden after fadeDelay done
	this.runAction( new lime.animation.FadeTo(0).setDuration(hideDelay) );
	lime.scheduleManager.callAfter(function()
		{
			this.setHidden(true);
		}
		,this, hideDelay);
}
