goog.provide('biofuelsGame.gamePhaseDisplay');

goog.require('lime.RoundedRect');
goog.require('lime.animation.FadeTo');
goog.require('lime.animation.ScaleTo');
goog.require('lime.animation.Resize');
goog.require('lime.animation.ColorTo');
goog.require('lime.animation.MoveTo');
goog.require('lime.fill.Stroke');
goog.require('lime.Circle');
goog.require('lime.Label');

//---------------------------------------------------------
biofuelsGame.gamePhaseDisplay = function() 
{
    // must call super constructor
    lime.RoundedRect.call(this);
    
    this.activePhaseIndex = -1;
    
    this.setSize(660,60).setRadius(12*2);
    this.setFill('#FEF8D0');
	this.setStroke(new lime.fill.Stroke(12*2, '#664'));
	
	var graphTitle = makeLabel('Round Progression', 0, -25, 14, '#fff', 'center');
	graphTitle.setShadow('#110', 2, 0 , 2);
	this.appendChild(graphTitle);

	this.phaseChannel = new lime.RoundedRect().setPosition(0,5).setSize(500,5).setFill('#888').setStroke(new lime.fill.Stroke(2, '#000'));
	this.appendChild(this.phaseChannel);

	// placed on first so it draws behind the main phase circle markers
	this.phaseMovingMarker = new lime.Circle().setPosition(-250, 5).setSize(10,10).setFill('#f00').setStroke(new lime.fill.Stroke(2, '#000'));
	this.appendChild(this.phaseMovingMarker);
	
	this.setUpPhases();	
	
	//---------------------------
	// TEMP ... Add click event just to test the animation basics
	//---------------------------
	goog.events.listen(this, ['mousedown', 'touchstart'], function(evt) 
	{
		var next = 0;
		if (this.activePhaseIndex + 1 < this.phasesArray.length) {
			next = this.activePhaseIndex + 1;
		}
		
		this.setActivePhase(next);
	});
}

goog.inherits(biofuelsGame.gamePhaseDisplay, lime.RoundedRect);

//---------------------------------------------------------
biofuelsGame.gamePhaseDisplay.prototype.setUpPhases = function()
{
	this.phasesArray = new Array();
	
	this.phasesArray.push("Contract Phase");
	this.phasesArray.push("Planting Phase");
	this.phasesArray.push("Round Wrap-Up");

	this.phasesLabelArray = new Array();
	this.phasesMarkerArray = new Array();
	
	var x = -250;
	var stepX = (500 / (this.phasesArray.length - 1));
	
	for (var idx = 0; idx < this.phasesArray.length; idx++)
	{
		var label = makeLabel(this.phasesArray[idx], x, -10, 10, '#000', 'center');
		this.appendChild(label);
		this.phasesLabelArray.push(label);
		
		var marker = new lime.Circle().setPosition(x, 5).setSize(15,15).setFill('#fff').setStroke(new lime.fill.Stroke(2, '#000'));
		this.appendChild(marker);
		this.phasesMarkerArray.push(marker);
		
		x += stepX;
	}
	
	this.setActivePhase(0);
}

// TODO: setting or advancing the phase should either come from server logic...
//	or else from the moderator advancing it...
//---------------------------------------------------------
biofuelsGame.gamePhaseDisplay.prototype.setActivePhase = function(newPhaseIndex)
{
	// TODO: there asserts or exceptions I could use here?
	if (this.activePhaseIndex == newPhaseIndex || newPhaseIndex >= this.phasesMarkerArray.length) 
	{
		return;
	}
	
	var nextObj = this.phasesMarkerArray[newPhaseIndex];
	
	if (this.activePhaseIndex >= 0) {
		var curObj = this.phasesMarkerArray[this.activePhaseIndex];
		curObj.runAction( new lime.animation.Resize(15,15).setDuration(0.5));
		curObj.runAction( new lime.animation.ColorTo('#fff').setDuration(0.5));
		
		// MAYBE TEMP?  only animate in a forward direction...on resetting back to first phase, just teleport marker instantly
		if (newPhaseIndex > this.activePhaseIndex)
		{
			this.phaseMovingMarker.runAction( new lime.animation.MoveTo(nextObj.getPosition()).setDuration(0.5));
		}
		else
		{ // teleport!
			this.phaseMovingMarker.setPosition(nextObj.getPosition());
		}
	}
	
	nextObj.runAction( new lime.animation.Resize(20,20).setDuration(0.5));
	nextObj.runAction( new lime.animation.ColorTo('#d00').setDuration(0.5));
	
	this.activePhaseIndex = newPhaseIndex;
}
