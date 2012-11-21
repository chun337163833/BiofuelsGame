goog.provide('biofuelsGame.fieldHealthAction');

goog.require('biofuelsGame.mouseOverSprite');
goog.require('biofuelsGame.fieldHealthPopup');

//---------------------------------------------------------
// Field health icon subclass - subclass of lime.sprite
//---------------------------------------------------------
biofuelsGame.fieldHealthAction = function() 
{
    // must call super constructor
    biofuelsGame.mouseOverSprite.call(this);
  
    this.setFill('assets/field_health_icon.png');
    this.setSize(50,50);
    this.setOpacity(this.DEFAULT_OPACITY);

    // center popup on the planting icon
    this.healthActionPopup = new biofuelsGame.fieldHealthPopup().setPosition(-50,-55);
    this.appendChild(this.healthActionPopup);

	this.enableClickInteraction();	
};

goog.inherits(biofuelsGame.fieldHealthAction, biofuelsGame.mouseOverSprite);

//--------------------------------------------------------------------------------------------------
biofuelsGame.fieldHealthAction.prototype.enableClickInteraction = function() 
{	
	// Add click event
	goog.events.listen(this, ['mousedown', 'touchstart'], function(evt) 
	{
		popupSound.stop();
		popupSound.play();

		// get field and disable interactions so the popup can work
		this.getParent().disableFieldInteractionsForHealthPopup();
		
		this.healthActionPopup.showPopup();
		
		// bah, should already be set up correctly if mouse overs were working....
		this.setOpacity(1).setScale(this.MOUSEOVER_SCALE);
				
	}); // <mousedown listen event
};

//--------------------------------------------------------------------------------------------------
biofuelsGame.fieldHealthAction.prototype.enableInteractions = function() 
{
	biofuelsGame.mouseOverSprite.prototype.enableMouseOver.call(this);
	this.enableClickInteraction();
};

//--------------------------------------------------------------------------------------------------
biofuelsGame.fieldHealthAction.prototype.dispelPopup = function() 
{
	this.healthActionPopup.hidePopup();
	this.getParent().enableFieldInteractions();
	this.animateToDefaults();
};

