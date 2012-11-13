goog.provide('biofuelsGame.gamePhaseDisplay');

goog.require('lime.RoundedRect');
goog.require('lime.animation.FadeTo');
goog.require('lime.animation.ScaleTo');
goog.require('lime.fill.Stroke');
goog.require('lime.Circle');
goog.require('lime.Label');

biofuelsGame.gamePhaseDisplay = function() 
{
    // must call super constructor
    lime.RoundedRect.call(this);
        
    this.setSize(660,60).setRadius(10);
    this.setFill('#FEF8D0');
	this.setStroke(new lime.fill.Stroke(10, '#664'));
	
	this.graphTitle = makeLabel('Round Progression', 0, -25, 12, '#fff', 'center');
	this.appendChild(this.graphTitle);

	this.phaseChannel = new lime.RoundedRect().setPosition(0,5).setSize(500,5).setFill('#888').setStroke(new lime.fill.Stroke(1, '#000'));
	this.appendChild(this.phaseChannel);

	// TODO: how many actual rounds???  Just add some placeholder ones
	this.phase1Title = makeLabel('Contract Phase', -250, -10, 11, '#000', 'center');
	this.appendChild(this.phase1Title);
		
	this.phase1Marker = new lime.Circle().setPosition(-250, 5).setSize(20,20).setFill('#f00').setStroke(new lime.fill.Stroke(1, '#000'));
	this.appendChild(this.phase1Marker);
	
	this.phase2Title = makeLabel('Planting Phase', 0, -10, 10, '#000', 'center' );
	this.appendChild(this.phase2Title);
	
	this.phase2Marker = new lime.Circle().setPosition(0, 5).setSize(15,15).setFill('#fff').setStroke(new lime.fill.Stroke(1, '#000'));
	this.appendChild(this.phase2Marker);
	
	this.phase3Title = makeLabel('Round Wrapup', 250, -10, 10, '#000', 'center' );
	this.appendChild(this.phase3Title);
	
	this.phase3Marker = new lime.Circle().setPosition(250, 5).setSize(15,15).setFill('#fff').setStroke(new lime.fill.Stroke(1, '#000'));
	this.appendChild(this.phase3Marker);
}

goog.inherits(biofuelsGame.gamePhaseDisplay, lime.RoundedRect);
