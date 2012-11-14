goog.provide('biofuelsGame.clientHealth');

goog.require('lime.RoundedRect');
goog.require('lime.animation.FadeTo');
goog.require('lime.animation.ScaleTo');
goog.require('lime.fill.Stroke');
goog.require('lime.Polygon');
goog.require('lime.Label');

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
// Total health of local client subclass - subclass of roundedRect
//--------------------------------------------------------------------------------------------------
biofuelsGame.clientHealth = function() 
{
    // must call super constructor
    lime.RoundedRect.call(this);

    // graph "container" styling
    this.setSize(200,200).setRadius(12);
    this.setFill('#FEF8D0').setStroke(new lime.fill.Stroke(12, '#664'));     
    
    // graph element properties - TODO: any common stylings should end up in one place, ideally
	var TITLE_FONT_SIZE = 13;
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
        	
	var graphTitle = makeLabel('Farmer Sustainability', 0, -95, TITLE_FONT_SIZE, TITLE_FONT_COLOR, 'center');
	this.appendChild(graphTitle);
	
	var gridLine = makeLine(GRID_WIDTH, 0, -85, 0, 85).setFill(GRID_COLOR);
	this.appendChild(gridLine);
	
	gridLine = makeLine(GRID_WIDTH, 85, 0, -85, 0).setFill(GRID_COLOR);
	this.appendChild(gridLine);

	var graphLabel = makeLabel('Emissions', 0, -80, LABEL_FONT_SIZE, LABEL_FONT_COLOR, 'center');
	this.appendChild(graphLabel);
	
	graphLabel = makeLabel('Economic Value', 0, 80, LABEL_FONT_SIZE, LABEL_FONT_COLOR, 'center');
	this.appendChild(graphLabel);

	graphLabel = makeLabel('Soil', 70, -5, LABEL_FONT_SIZE, LABEL_FONT_COLOR, 'center');
	this.appendChild(graphLabel);
	graphLabel = makeLabel('Health', 70, 5, LABEL_FONT_SIZE, LABEL_FONT_COLOR, 'center');
	this.appendChild(graphLabel);
	
	graphLabel = makeLabel('Energy', -64, -5, LABEL_FONT_SIZE, LABEL_FONT_COLOR, 'center');
	this.appendChild(graphLabel);
	graphLabel = makeLabel('Potential', -64, 5, LABEL_FONT_SIZE, LABEL_FONT_COLOR, 'center');
	this.appendChild(graphLabel);
		
	// Show normalized plot?
	var plot = new lime.Polygon();
	plot.addPoint(new goog.math.Coordinate(0, -30));
	plot.addPoint(new goog.math.Coordinate(30,0));
	plot.addPoint(new goog.math.Coordinate(0,30));
	plot.addPoint(new goog.math.Coordinate(-30, 0));
	plot.setStroke(new lime.fill.Stroke(NORM_STROKE_WIDTH, NORM_STROKE_COLOR));
	plot.setFill(NORM_FILL_R, NORM_FILL_G, NORM_FILL_B, NORM_FILL_A);
	this.appendChild(plot);

	this.graph2 = new lime.Polygon();
	var coord = Math.random() * (-70 - -5) + -5;
	this.graph2.addPoint(new goog.math.Coordinate(0, coord));
	var coord = Math.random() * (70 - 5) + 5;
	this.graph2.addPoint(new goog.math.Coordinate(coord,0));
	var coord = Math.random() * (70 - 5) + 5;
	this.graph2.addPoint(new goog.math.Coordinate(0,coord));
	var coord = Math.random() * (-70 - -5) + -5;
	this.graph2.addPoint(new goog.math.Coordinate(coord, 0));
	this.graph2.setStroke(new lime.fill.Stroke(PLOT_STROKE_WIDTH, PLOT_STROKE_COLOR));
	this.appendChild(this.graph2);
};

goog.inherits(biofuelsGame.clientHealth, lime.RoundedRect);

// TODO: some method to update the graph
//biofuelsGame.clientHealth.prototype.updateClientHealthGraph = function(datapoints...)

