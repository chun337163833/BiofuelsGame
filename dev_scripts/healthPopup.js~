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
        
    this.setSize(90,90);
    this.setFill('assets/planting_popup_bg.png');
	    
    this.cornIcon = new biofuelsGame.mouseOverSprite();
    this.cornIcon.setFill('assets/corn_icon.png');
    this.cornIcon.setPosition(-22,-20).setSize(40,40);
    this.appendChild(this.cornIcon);
    
    this.grassIcon = new biofuelsGame.mouseOverSprite();
    this.grassIcon.setFill('assets/grass_icon.png');
  	this.grassIcon.setPosition(22,-20).setSize(40,40);
    this.appendChild(this.grassIcon);
    
    this.nothingIcon = new biofuelsGame.mouseOverSprite();
    this.nothingIcon.setFill('assets/nothing_icon.png');
    this.nothingIcon.setPosition(0,20).setSize(40,40);
    this.appendChild(this.nothingIcon);
    
    this.setScale(0.25);
	this.runAction( new lime.animation.ScaleTo(1).setDuration(0.05) );
		
	//---------------------------
	// Add click event
	//---------------------------
	goog.events.listen(this, ['mousedown', 'touchstart'], function(evt) 
	{
		delete this.popupSelectionResult;

		if (this.cornIcon.hitTest(evt)) {
			this.popupSelectionResult = "corn";
		}
		else if (this.grassIcon.hitTest(evt)) {
			this.popupSelectionResult = "grass";
		}
		else if (this.nothingIcon.hitTest(evt)) {
			this.popupSelectionResult = "nothing";
		}

		if (this.popupSelectionResult) {
			clickSound.stop();
			clickSound.play();
		}
		
		goog.events.removeAll(this);
		delete this.grassIcon;
		delete this.nothingIcon;
		delete this.cornIcon;
		this.getParent().dispelPopup();
		
	}); // <mousedown listen event
	
	
	//---------------------------
	// Add mouse over event
	//---------------------------
	goog.events.listen(this, 'mouseover', function(evt) 
	{
		// Add a new temporary listener that watches mousemove and if mouse off of
		//	sprite, then revert sprite to normal/default state and clear the
		//	mousemove listener
		var key = goog.events.listen(this.getScene(), 'mousemove', 
			function(e) 
			{
				 if (!this.hitTest(e))
				 {
					 goog.events.unlistenByKey(key);
					 goog.events.removeAll(this);
					 delete this.grassIcon;
					 delete this.nothingIcon;
					 delete this.cornIcon;
				 	 this.getParent().dispelPopup();
				 }	
		
			},
		null,this);
	}); // <mouseover listen event
};

goog.inherits(biofuelsGame.plantPopup, lime.Sprite);



