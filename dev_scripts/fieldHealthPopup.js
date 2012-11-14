goog.provide('biofuelsGame.fieldHealthPopup');

goog.require('lime.RoundedRect');
goog.require('lime.animation.FadeTo');
goog.require('lime.animation.ScaleTo');
goog.require('lime.fill.Stroke');
goog.require('lime.Polygon');
goog.require('lime.Label');

// Fancy...don't see any line support and polygon drawing doesn't seem like much help since the
//	shape has to be closed...just rotate and scale a sprite
//--------------------------------------------------------------------------------------------------
function makeLine(size, x1, y1, x2, y2)
{ 
  var dx = Math.abs(x2-x1); 
  var dy = Math.abs(y2-y1); 
  var width = Math.sqrt(dx*dx+dy*dy)+size; 
  return new lime.Sprite().setSize(width, size).setAnchorPoint(size/2/width, .5).setRotation( 
    -Math.atan2(y2-y1, x2-x1)*180/Math.PI 
    ).setPosition(x1, y1); 
} 

//--------------------------------------------------------------------------------------------------
function makeLabel(text, pos_x, pos_y, size, color, align) 
{
	return new lime.Label(text).setPosition(pos_x, pos_y).setFontSize(size).setFontColor(color).setAlign(align);
}

//--------------------------------------------------------------------------------------------------
// field health popup subclass - subclass of roundedRect
//--------------------------------------------------------------------------------------------------
biofuelsGame.fieldHealthPopup = function() 
{
    // must call super constructor
    lime.RoundedRect.call(this);
        
   // graph "container" styling
    this.setSize(180,180).setRadius(10).setScale(0.25);
    this.setFill('#FEF8D0').setStroke(new lime.fill.Stroke(10, '#664'));     
 
    // graph element properties - TODO: any common stylings should end up in one place, ideally
	var TITLE_FONT_SIZE = 12;
	var TITLE_FONT_COLOR = '#fff';
	
	var LABEL_FONT_SIZE = 10;
	var LABEL_FONT_COLOR = '#777';
	
	var GRID_WIDTH = 1;
	var GRID_COLOR = '#888';
	
	// fill color and stroke styles for the normalized plot
	var NORM_STROKE_WIDTH = 1;
	var NORM_STROKE_COLOR = '#35d'; // blueish
	
	var NORM_FILL_R = 30;
	var NORM_FILL_G = 50;
	var NORM_FILL_B = 100;
	var NORM_FILL_A = 0.25;
	
	// The actual data plot style (currently not filled)
	var PLOT_STROKE_WIDTH = 2;
	var PLOT_STROKE_COLOR  = '#d5d';
 
	// Not a true close sprite...can click anywhere on the popup to close it...or just mouse off of it...
	var closeSprite = new lime.Sprite().setFill('assets/close_icon.png');
	closeSprite.setPosition(95,-95).setAnchorPoint(1,0);
	this.appendChild(closeSprite);

	// grid lines
	var gridLine = makeLine(GRID_WIDTH, 0, -80, 0, 80).setFill(GRID_COLOR);
	this.appendChild(gridLine);
	
	gridLine = makeLine(GRID_WIDTH, 80, 0, -80, 0).setFill(GRID_COLOR);
	this.appendChild(gridLine);
	
	// Titles + graph labels
	var graphTitle = makeLabel('Field Sustainability', 0, -85, TITLE_FONT_SIZE, TITLE_FONT_COLOR, 'center');
	this.appendChild(graphTitle);
	
	var graphLabel = makeLabel('Emissions', 0, -75, LABEL_FONT_SIZE, LABEL_FONT_COLOR, 'center');
	this.appendChild(graphLabel);

	graphLabel = makeLabel('Economic Value', 0, 75, LABEL_FONT_SIZE, LABEL_FONT_COLOR, 'center');
	this.appendChild(graphLabel);

	// TODO: making a label that splits across a line, would be nice if this could just be one label with wordwrap?
	graphLabel = makeLabel('Soil', 65, -5, LABEL_FONT_SIZE, LABEL_FONT_COLOR, 'center');
	this.appendChild(graphLabel);
	graphLabel = makeLabel('Health', 65, 5, LABEL_FONT_SIZE, LABEL_FONT_COLOR, 'center');
	this.appendChild(graphLabel);
	
	// TODO: making a label that splits across a line, would be nice if this could just be one label with wordwrap?
	graphLabel = makeLabel('Energy', -59, -5, LABEL_FONT_SIZE, LABEL_FONT_COLOR, 'center');
	this.appendChild(graphLabel);
	graphLabel = makeLabel('Potential', -59, 5, LABEL_FONT_SIZE, LABEL_FONT_COLOR, 'center');
	this.appendChild(graphLabel);
		
	// Normalized plot
	var plot = new lime.Polygon();
	plot.setFill(NORM_FILL_R, NORM_FILL_G, NORM_FILL_B, NORM_FILL_A);
	plot.setStroke(new lime.fill.Stroke(NORM_STROKE_WIDTH, NORM_STROKE_COLOR));
	plot.addPoint(new goog.math.Coordinate(0, -30));
	plot.addPoint(new goog.math.Coordinate(30,0));
	plot.addPoint(new goog.math.Coordinate(0,30));
	plot.addPoint(new goog.math.Coordinate(-30, 0));
	this.appendChild(plot);

	// Placeholder plot object
	this.graphPlot = new lime.Polygon();
	this.graphPlot.setStroke(new lime.fill.Stroke(PLOT_STROKE_WIDTH, PLOT_STROKE_COLOR));
	this.appendChild(this.graphPlot);
	
	this.setHidden(true);
};

goog.inherits(biofuelsGame.fieldHealthPopup, lime.RoundedRect);

//--------------------------------------------------------------------------------------------------
biofuelsGame.fieldHealthPopup.prototype.showPopup = function()
{
    this.setScale(0).setOpacity(1).setHidden(false);
	this.runAction( new lime.animation.ScaleTo(1).setDuration(0.1) );
	
	// Setting with nothing gonna clear it out, I hope?
	this.graphPlot.setPoints();
	
	// TEMP: just to plot some basic shape
	var coord = Math.random() * (-70 - -5) + -5;
	this.graphPlot.addPoint(new goog.math.Coordinate(0, coord));
	var coord = Math.random() * (70 - 5) + 5;
	this.graphPlot.addPoint(new goog.math.Coordinate(coord,0));
	var coord = Math.random() * (70 - 5) + 5;
	this.graphPlot.addPoint(new goog.math.Coordinate(0,coord));
	var coord = Math.random() * (-70 - -5) + -5;
	this.graphPlot.addPoint(new goog.math.Coordinate(coord, 0));
	
	//---------------------------
	// Add click event
	//---------------------------
	goog.events.listen(this, ['mousedown', 'touchstart'], function(evt) 
	{
		goog.events.removeAll(this);
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
				 	 this.getParent().dispelPopup();
				 }	
		
			},
		null,this);
	}); // <mouseover listen event
}

//--------------------------------------------------------------------------------------------------
biofuelsGame.fieldHealthPopup.prototype.hidePopup = function()
{
	var hideDelay = 0.1;
	
	// fade and call setHidden after fadeDelay done
	this.runAction( new lime.animation.FadeTo(0).setDuration(hideDelay) );
	lime.scheduleManager.callAfter(function()
		{
			this.setHidden(true);
		}
		,this, hideDelay);
}
