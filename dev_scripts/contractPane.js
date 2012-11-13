goog.provide('biofuelsGame.contractPane');

goog.require('lime.RoundedRect');
goog.require('lime.animation.FadeTo');
goog.require('lime.animation.ScaleTo');
goog.require('lime.fill.Stroke');
goog.require('lime.Polygon');
goog.require('lime.Label');

//--------------------------------------------------------------------------------------------------
// Contract pane subclass - subclass of RoundedRect
//--------------------------------------------------------------------------------------------------
biofuelsGame.contractPane = function(title, iconAsset) 
{
    // must call super constructor
    lime.RoundedRect.call(this);
        
    this.setSize(200,90).setRadius(12).setAnchorPoint(0.5,0);
    this.setFill('#FEF8D0').setOpacity(0.8);
	this.setStroke(new lime.fill.Stroke(12, '#664'));     
	
	this.icon = new lime.Sprite();
    this.icon.setFill(iconAsset);
    this.icon.setPosition(-70,30).setSize(40,40);
    this.appendChild(this.icon);

	this.graphTitle = makeLabel(title, 0, 6, 12, '#FFF', 'center');
	this.appendChild(this.graphTitle);
		
	this.text1 = makeLabel('TODO: some amount of', 15, 30, 10,  '#000', 'center');
	this.appendChild(this.text1);

	this.text2 = makeLabel('TODO: stuff for some dollars', 15, 45, 10,  '#000', 'center');
	this.appendChild(this.text2);

	this.text3 = makeLabel('TODO: and anything else here', 5, 60, 10,  '#000', 'center');
	this.appendChild(this.text3);
	
	//---------------------------
	// Add click event
	//---------------------------
	goog.events.listen(this, ['mousedown', 'touchstart'], function(evt) 
	{
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
				 }	
		
			},
		null,this);
	}); // <mouseover listen event
};

goog.inherits(biofuelsGame.contractPane, lime.RoundedRect);



