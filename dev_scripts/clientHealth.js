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
        
    this.setSize(200,200).setRadius(10);
    this.setFill('#FEF8D0');
	this.setStroke(new lime.fill.Stroke(10, '#664'));     
	
	this.graphTitle = makeLabel('Farmer Sustainability', 0, -95, 12, '#fff', 'center');
	this.appendChild(this.graphTitle);
	
	this.graphLabel1 = makeLabel('Emissions', 0, -85, 10, '#777', 'center');
	this.appendChild(this.graphLabel1);

	this.graphLabel2 = makeLabel('Economic Value', 0, 85, 10, '#777', 'center');
	this.appendChild(this.graphLabel2);

	this.graphLabel3a = makeLabel('Soil', 75, -5, 10, '#777', 'center');
	this.appendChild(this.graphLabel3a);
	this.graphLabel3b = makeLabel('Health', 75, 5, 10, '#777', 'center');
	this.appendChild(this.graphLabel3b);
	
	this.graphLabel4a = makeLabel('Energy', -69, -5, 10, '#777', 'center');
	this.appendChild(this.graphLabel4a);
	this.graphLabel4b = makeLabel('Potential', -69, 5, 10, '#777', 'center');
	this.appendChild(this.graphLabel4b);
	
	this.graphGrid1 = makeLine(1, 0, -90, 0, 90).setFill('#888');
	this.appendChild(this.graphGrid1);
	
	this.graphGrid2 = makeLine(1, 90, 0, -90, 0).setFill('#888');
	this.appendChild(this.graphGrid2);
	
	// Show normalized plot?
	this.graph = new lime.Polygon();
	this.graph.addPoint(new goog.math.Coordinate(0, -30));
	this.graph.addPoint(new goog.math.Coordinate(30,0));
	this.graph.addPoint(new goog.math.Coordinate(0,30));
	this.graph.addPoint(new goog.math.Coordinate(-30, 0));
	this.graph.setStroke(new lime.fill.Stroke(1, '#35d'));
	this.graph.setFill(30,50,100,0.25);
	this.appendChild(this.graph);

	this.graph2 = new lime.Polygon();
	var coord = Math.random() * (-70 - -5) + -5;
	this.graph2.addPoint(new goog.math.Coordinate(0, coord));
	var coord = Math.random() * (70 - 5) + 5;
	this.graph2.addPoint(new goog.math.Coordinate(coord,0));
	var coord = Math.random() * (70 - 5) + 5;
	this.graph2.addPoint(new goog.math.Coordinate(0,coord));
	var coord = Math.random() * (-70 - -5) + -5;
	this.graph2.addPoint(new goog.math.Coordinate(coord, 0));
	this.graph2.setStroke(new lime.fill.Stroke(2, '#d5d'));
	this.appendChild(this.graph2);
};

goog.inherits(biofuelsGame.clientHealth, lime.RoundedRect);



