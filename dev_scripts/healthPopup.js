goog.provide('biofuelsGame.healthPopup');

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
// Plant popup subclass - subclass of lime.sprite
//--------------------------------------------------------------------------------------------------
biofuelsGame.healthPopup = function() 
{
    // must call super constructor
    lime.RoundedRect.call(this);
        
    this.setSize(180,180).setRadius(10);
    this.setFill('#FEF8D0').setOpacity(0.9);
	this.setStroke(new lime.fill.Stroke(10, '#664'));     
    this.setScale(0.25);
	this.runAction( new lime.animation.ScaleTo(1).setDuration(0.1) );
	
	this.graphTitle = makeLabel('Individual Sustainability', 0, -85, 10, '#000', 'center');
	this.appendChild(this.graphTitle);
	
	this.graphLabel1 = makeLabel('Emissions', 0, -75, 10, '#777', 'center');
	this.appendChild(this.graphLabel1);

	this.graphLabel2 = makeLabel('Economic Value', 0, 75, 10, '#777', 'center');
	this.appendChild(this.graphLabel2);

	this.graphLabel3a = makeLabel('Soil', 65, -5, 10, '#777', 'center');
	this.appendChild(this.graphLabel3a);
	this.graphLabel3b = makeLabel('Health', 65, 5, 10, '#777', 'center');
	this.appendChild(this.graphLabel3b);
	
	this.graphLabel4a = makeLabel('Energy', -59, -5, 10, '#777', 'center');
	this.appendChild(this.graphLabel4a);
	this.graphLabel4b = makeLabel('Potential', -59, 5, 10, '#777', 'center');
	this.appendChild(this.graphLabel4b);
	
	this.graphGrid1 = makeLine(1, 0, -80, 0, 80).setFill('#888');
	this.appendChild(this.graphGrid1);
	
	this.graphGrid2 = makeLine(1, 80, 0, -80, 0).setFill('#888');
	this.appendChild(this.graphGrid2);
	
	// Show normalized plot?
	this.graph = new lime.Polygon();
	this.graph.addPoint(new goog.math.Coordinate(0, -30));
	this.graph.addPoint(new goog.math.Coordinate(30,0));
	this.graph.addPoint(new goog.math.Coordinate(0,30));
	this.graph.addPoint(new goog.math.Coordinate(-30, 0));
	this.graph.setStroke(new lime.fill.Stroke(1, '#35d'));
	this.appendChild(this.graph);

	this.graph = new lime.Polygon();
	this.graph.addPoint(new goog.math.Coordinate(0, -50));
	this.graph.addPoint(new goog.math.Coordinate(20,0));
	this.graph.addPoint(new goog.math.Coordinate(0,40));
	this.graph.addPoint(new goog.math.Coordinate(-10, 0));
	this.graph.setStroke(new lime.fill.Stroke(2, '#d5d'));
	this.appendChild(this.graph);
	
	//---------------------------
	// Add click event
	//---------------------------
	goog.events.listen(this, ['mousedown', 'touchstart'], function(evt) 
	{
		delete this.popupSelectionResult;
	
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
};

goog.inherits(biofuelsGame.healthPopup, lime.RoundedRect);



