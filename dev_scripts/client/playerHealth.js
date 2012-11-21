goog.provide('biofuelsGame.playerHealth');

goog.require('lime.RoundedRect');
goog.require('lime.animation.FadeTo');
goog.require('lime.animation.ScaleTo');
goog.require('lime.fill.Stroke');
goog.require('lime.Polygon');
goog.require('lime.Label');

//--------------------------------------------------------------------------------------------------
// Total health of local player subclass - subclass of roundedRect
//--------------------------------------------------------------------------------------------------
biofuelsGame.playerHealth = function() 
{
    // must call super constructor
    lime.RoundedRect.call(this);

    this.HALF_SIZE_X = 100;
    this.HALF_SIZE_Y = 80;
    
    this.FRAME_BORDER_SIZE = 12;

    // graph "container" styling
    this.setSize(this.HALF_SIZE_X * 2, this.HALF_SIZE_Y * 2).setRadius(this.FRAME_BORDER_SIZE);
    this.setFill('#FEF8D0').setStroke(new lime.fill.Stroke(this.FRAME_BORDER_SIZE, '#664'));     
    
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
        	
	var graphTitle = makeLabel('Farmer Sustainability', 0, -(this.HALF_SIZE_Y - (this.FRAME_BORDER_SIZE / 2) + 2), 
									TITLE_FONT_SIZE, TITLE_FONT_COLOR, 'center');
	graphTitle.setSize(this.HALF_SIZE_X * 2, this.FRAME_BORDER_SIZE);
	this.appendChild(graphTitle);

	var right = this.HALF_SIZE_X - this.FRAME_BORDER_SIZE;
	var left = -(this.HALF_SIZE_X - this.FRAME_BORDER_SIZE);
	var top = -(this.HALF_SIZE_Y - this.FRAME_BORDER_SIZE);
	var bottom = this.HALF_SIZE_Y - this.FRAME_BORDER_SIZE;

	var gridLine = makeLine(GRID_WIDTH, 0, top, 0, bottom).setFill(GRID_COLOR);
	this.appendChild(gridLine);
	
	gridLine = makeLine(GRID_WIDTH, left, 0, right, 0).setFill(GRID_COLOR);
	this.appendChild(gridLine);

	var graphLabel = makeLabel('Emissions', 0, top + 5, LABEL_FONT_SIZE, LABEL_FONT_COLOR, 'center');
	this.appendChild(graphLabel);
	
	graphLabel = makeLabel('Economic Value', 0, bottom - 5, LABEL_FONT_SIZE, LABEL_FONT_COLOR, 'center');
	this.appendChild(graphLabel);

	graphLabel = makeLabel('Soil', right - 15, -5, LABEL_FONT_SIZE, LABEL_FONT_COLOR, 'center');
	this.appendChild(graphLabel);
	graphLabel = makeLabel('Health', right - 15, 5, LABEL_FONT_SIZE, LABEL_FONT_COLOR, 'center');
	this.appendChild(graphLabel);
	
	graphLabel = makeLabel('Energy', left + 24, -5, LABEL_FONT_SIZE, LABEL_FONT_COLOR, 'center');
	this.appendChild(graphLabel);
	graphLabel = makeLabel('Potential', left + 24, 5, LABEL_FONT_SIZE, LABEL_FONT_COLOR, 'center');
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

goog.inherits(biofuelsGame.playerHealth, lime.RoundedRect);

// TODO: some method to update the graph
//biofuelsGame.playerHealth.prototype.updatePlayerHealthGraph = function(datapoints...)

