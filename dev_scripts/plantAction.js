goog.provide('biofuelsGame.plantAction');

goog.require('biofuelsGame.mouseOverSprite');
goog.require('lime.animation.FadeTo');
goog.require('lime.animation.ScaleTo');
goog.require('biofuelsGame.plantPopup');

//--------------------------------------------------------------------------------------------------
// Plant action icon subclass - subclass of lime.sprite
//--------------------------------------------------------------------------------------------------
biofuelsGame.plantAction = function() 
{
    // must call super constructor
    biofuelsGame.mouseOverSprite.call(this);
	
    this.setFill('assets/planting_icon.png');
    this.setSize(50,50);
    this.setOpacity(this.DEFAULT_OPACITY);
	
	this.enableClickInteraction();	
};

goog.inherits(biofuelsGame.plantAction, biofuelsGame.mouseOverSprite);

//--------------------------------------------------------------------------------------------------
biofuelsGame.plantAction.prototype.enableClickInteraction = function() 
{	
	// Add click event
	goog.events.listen(this, ['mousedown', 'touchstart'], function(evt) 
	{
		popupSound.stop();
		popupSound.play();

		// get field and disable interactions so the popup can work
		this.getParent().disableFieldInteractionsForPlantPopup();
		
		this.popup = new biofuelsGame.plantPopup();
		// Center popup on the planting icon
		this.popup.setPosition(0,0); 
		// bah, should already be set up correctly if mouse overs were working....
		this.setOpacity(1).setScale(this.MOUSEOVER_SCALE);
		this.appendChild(this.popup);
		
	}); // <mousedown listen event
};

//--------------------------------------------------------------------------------------------------
biofuelsGame.plantAction.prototype.enableInteractions = function() 
{
	biofuelsGame.mouseOverSprite.prototype.enableMouseOver.call(this);
	this.enableClickInteraction();
};

//--------------------------------------------------------------------------------------------------
biofuelsGame.plantAction.prototype.dispelPopup = function() 
{
	if (typeof this.popup === 'undefined') {
		return;
	}	
	this.popup.runAction( new lime.animation.FadeTo(0).setDuration(0.1) );

	this.getParent().setUpCrop(this.popup.popupSelectionResult);

	delete this.popup;
	this.getParent().enableFieldInteractions();
	this.animateToDefaults();
};

