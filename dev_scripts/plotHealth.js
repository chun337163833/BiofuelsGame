goog.provide('biofuelsGame.plotHealth');

goog.require('biofuelsGame.mouseOverSprite');
goog.require('biofuelsGame.healthPopup');

//---------------------------------------------------------
// Plot Health icon subclass - subclass of lime.sprite
//---------------------------------------------------------
biofuelsGame.plotHealth = function() 
{
    // must call super constructor
    biofuelsGame.mouseOverSprite.call(this);
  
    this.setFill('assets/field_health_icon.png');
    this.setSize(50,50);
    this.setOpacity(this.DEFAULT_OPACITY);

	this.enableClickInteraction();	
};

goog.inherits(biofuelsGame.plotHealth, biofuelsGame.mouseOverSprite);

//--------------------------------------------------------------------------------------------------
biofuelsGame.plotHealth.prototype.enableClickInteraction = function() 
{	
	// Add click event
	goog.events.listen(this, ['mousedown', 'touchstart'], function(evt) 
	{
		popupSound.stop();
		popupSound.play();

		// get field and disable interactions so the popup can work
		this.getParent().disableFieldInteractionsForHealthPopup();
		
		this.popup = new biofuelsGame.healthPopup();
		// Center popup on the planting icon
		this.popup.setPosition(-55,-55);  
		
		// bah, should already be set up correctly if mouse overs were working....
		this.setOpacity(1).setScale(this.MOUSEOVER_SCALE);
		this.appendChild(this.popup);
				
	}); // <mousedown listen event
};

//--------------------------------------------------------------------------------------------------
biofuelsGame.plotHealth.prototype.enableInteractions = function() 
{
	biofuelsGame.mouseOverSprite.prototype.enableMouseOver.call(this);
	this.enableClickInteraction();
};

//--------------------------------------------------------------------------------------------------
biofuelsGame.plotHealth.prototype.dispelPopup = function() 
{
	if (typeof this.popup === 'undefined') {
		return;
	}	
	this.popup.runAction( new lime.animation.FadeTo(0).setDuration(0.1) );

	delete this.popup;
	this.getParent().enableFieldInteractions();
	this.animateToDefaults();
};

