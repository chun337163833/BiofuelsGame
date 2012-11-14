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
	
    this.setSize(50,50).setFill('assets/planting_icon.png');;
    this.setOpacity(this.DEFAULT_OPACITY);
	
    // center popup on the planting icon
    this.plantActionPopup = new biofuelsGame.plantPopup().setPosition(0,0);
    this.appendChild(this.plantActionPopup);
    
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
		
		// bah, should already be set up correctly if mouse overs were working....
		this.setOpacity(1).setScale(this.MOUSEOVER_SCALE);
		
		this.plantActionPopup.showPopup();
		
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
	// TODO: forget why this was needed...verify that it is even necessary...
	if (this.plantActionPopup.getHidden()) {
		return;
	}	

	this.getParent().setUpCrop(this.plantActionPopup.popupSelectionResult);

	this.getParent().enableFieldInteractions();
	this.animateToDefaults();
};

