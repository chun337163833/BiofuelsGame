goog.provide('biofuelsGame.aggregateGraphEarnings');

goog.require('lime.RoundedRect');
goog.require('lime.animation.FadeTo');
goog.require('lime.animation.ScaleTo');
goog.require('lime.fill.Stroke');
goog.require('lime.Polygon');
goog.require('lime.Label');

// TEMP: just to get some data to graph
//--------------------------------------------------------------------------------------------------
function bakeFakeEarningsData(yearCount, farmerCount)
{
	var minDollars = 10000;
	var maxDollars = 100000;
	var years = new Array(yearCount);
	
	for (var yr = 0; yr < yearCount; yr++)
	{
		years[yr] = new Array(farmerCount);
		for (var idx = 0; idx < farmerCount; idx++)
		{
			years[yr][idx] = Math.random() * (maxDollars - minDollars) + minDollars;
		}
	}
	
	return years;
}

//--------------------------------------------------------------------------------------------------
// Aggregate earnings subclass - subclass of roundedRect
//--------------------------------------------------------------------------------------------------
biofuelsGame.aggregateGraphEarnings = function() 
{
    // must call super constructor
    lime.RoundedRect.call(this);

    this.HALF_SIZE_X = 330;
    this.HALF_SIZE_Y = 100;
    
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
	
	// The actual data plot style (currently not filled)
	var PLOT_STROKE_WIDTH = 2;
	var PLOT_STROKE_COLOR  = '#d5d';
        	
	var graphTitle = makeLabel('Farmer Earnings', 0, -(this.HALF_SIZE_Y - (this.FRAME_BORDER_SIZE / 2) + 2), 
									TITLE_FONT_SIZE, TITLE_FONT_COLOR, 'center');
	graphTitle.setSize(this.HALF_SIZE_X * 2, this.FRAME_BORDER_SIZE);
	this.appendChild(graphTitle);
	
	// TEMP: make some fake data for dev'ing graph - 10 years, 8 farmers
	this.earningsData = bakeFakeEarningsData(10, 8);
	
	this.updateGraph(this.earningsData);
};

goog.inherits(biofuelsGame.aggregateGraphEarnings, lime.RoundedRect);

// Helper - could be part of the class but would really just be private anyway
//	returns a two element array [min, max] from an earnings array earnings[years][farmers]
//-----------------------------------------------------------------------------------
function getDollarRange(earnings)
{
	// if no years...or a year but no farmers, just return some default
	if (earnings.length <= 0 || earnings[0].length <= 0) 
	{
		return [0, 50]; // eh, 0 dollars to 50k dollars
	}
	
	// init from first element
	var min = earnings[0][0];
	var max = min;
	
	for (var year = 0; year < earnings.length; year++)
	{
		for (var farmer = 0; farmer < earnings[year].length; farmer++)
		{
			if (earnings[year][farmer] > max) 
			{
				max = earnings[year][farmer];
			}
			else if (earnings[year][farmer] < min)
			{
				min = earnings[year][farmer]
			}
		}
	}
	
	return [min, max];
}

// datapoints currently expected to be a two-D array like this: earnings[years][farmers]
// TODO: allocates new lines/labels every call...either need to delete the old ones and
//	remove them from the scene graph/tree...or maybe recycle ones that were already allocated.
//-----------------------------------------------------------------------------------
biofuelsGame.aggregateGraphEarnings.prototype.updateGraph = function(earnings)
{
	var leftPad = 40;
	var rightPad = -10;
	var bottomPad = -15;
	var topPad = 10;
	
	// the actual graph resides within a portion of the whole frame, to allow for
	//	extra room to plot graph labels, etc.
	var right = this.HALF_SIZE_X - this.FRAME_BORDER_SIZE + rightPad;
	var left = -(this.HALF_SIZE_X - this.FRAME_BORDER_SIZE) + leftPad;
	var top = -(this.HALF_SIZE_Y - this.FRAME_BORDER_SIZE) + topPad;
	var bottom = this.HALF_SIZE_Y - this.FRAME_BORDER_SIZE + bottomPad;
	
	var yearSpacing = (right - left) / (earnings.length - 1);
		
	var atX = left;
	for (var year = 0; year < earnings.length; year++)
	{
		var line = makeLine(1, atX, top, atX, bottom).setFill('#aaa');
		this.appendChild(line);
		
		var label = makeLabel(year + 1, atX, bottom - (bottomPad / 2), 10, '#000', 'center');
		this.appendChild(label);
		
		atX += yearSpacing;
	}
	
	// get range (mostly just care about max) and expand max a bit so it doesn't end up exactly at the top 
	var dollarRange = getDollarRange(earnings);
	var maxDollar = dollarRange[1] * 1.1;
	var dollarScaling = (bottom - top) / maxDollar;
	var horzLines = 10;
	
	for (var idx = 0; idx < horzLines; idx++)
	{
		var dollar = (idx / (horzLines - 1)) * maxDollar;
		var atY = bottom - (dollar * dollarScaling);

		var line = makeLine(1, left, atY, right, atY).setFill('#aaa');
		this.appendChild(line);
		
		var label = makeLabel("$" + (dollar/1000).toFixed(0) + "k", left - (leftPad / 2), atY, 10, '#000', 'center');
		this.appendChild(label);
	}
	
	var strokeSize = 2;
	for (var farmer = 0; farmer < earnings[0].length; farmer++)
	{
		var fill = '#ccb';
		// eh, quick test of rendering a bunch of lines grey...and then the one on top in a color
		if (farmer == earnings[0].length - 1) 
		{
			fill = '#d40';
		}
		
		var prevDollar = earnings[0][farmer];
		atX = left;
		for (var year = 0; year < earnings.length; year++)
		{
			var currentDollar = earnings[year][farmer];
			
			if (year > 0)
			{
				var line = makeLine(strokeSize, atX - yearSpacing, bottom - prevDollar * dollarScaling,
										atX, bottom - currentDollar * dollarScaling).setFill(fill);
				this.appendChild(line);
			}
			
			prevDollar = currentDollar;
			atX += yearSpacing;
		}
	}
}

