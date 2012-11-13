goog.provide('biofuelsGame.field');

goog.require('lime.Sprite');
goog.require('lime.Layer');

goog.require('biofuelsGame.fertilizer');
goog.require('biofuelsGame.plantAction');
goog.require('biofuelsGame.fieldHealthAction');

//--------------------------------------------------------------------------------------------------
// Field representation
//--------------------------------------------------------------------------------------------------
biofuelsGame.field = function() 
{
    // must call super constructor
    lime.Sprite.call(this);
	
    this.cropType = "nothing";
    
    this.DEFAULT_SIZE_X = 150;
    this.DEFAULT_SIZE_Y = 150;
    
    this.PLANT_ACTION_X = -52;
    this.PLANT_ACTION_Y = 65;
    
    this.FERTILIZER_X = 0;
    this.FERTILIZER_Y = 75;        

    this.PLOT_HEALTH_X = 52;
    this.PLOT_HEALTH_Y = 65;
    
    this.setFill('assets/plowed_field.png').setSize(this.DEFAULT_SIZE_X, this.DEFAULT_SIZE_Y);

    // use a layer for the crop so we can easily fade it in as a unit.  Also note that the plant layer should
    //	be added before the icons so that the layer will draw first, under the icons
    this.plantLayer = new lime.Layer();
    this.appendChild(this.plantLayer);
    this.plantingArray = new Array();
    var offX = 1;
    for (var y = -50; y <= 50; y += 25 ) 
    {
    	for (var x = -40; x <= 40; x += 40) 
    	{
    		var plant = new lime.Sprite();
    		plant.setFill('assets/corn_plant.png');
    		
    		// offset every other row for fun
    		plant.setPosition(x - 10 + (offX & 1) * 20, y);
    		// anchor horizontal center and bottom
    		plant.setAnchorPoint(0.5, 1);
    		plant.setSize(40, 40);

    		this.plantLayer.appendChild(plant);    		
    		this.plantingArray.push(plant);
    	}
    	offX++;
    }
    this.plantLayer.setOpacity(0);
    
	// Add order here makes a difference as to what order they render...fertilizer never needs to draw on anything as a result of the
	//	click actions for these three items, so add it first...
    this.fertilizerIcon = new biofuelsGame.fertilizer().setPosition(this.FERTILIZER_X, this.FERTILIZER_Y);
    this.appendChild(this.fertilizerIcon);
    
    // plant action popup is large enough that it needs to go on top of fertilizer
	this.plantActionIcon = new biofuelsGame.plantAction().setPosition(this.PLANT_ACTION_X, this.PLANT_ACTION_Y);
    this.appendChild(this.plantActionIcon);

    // health of field can draw over everything on the field so add that last
    this.fieldHealthIcon = new biofuelsGame.fieldHealthAction().setPosition(this.PLOT_HEALTH_X, this.PLOT_HEALTH_Y);
    this.appendChild(this.fieldHealthIcon);
};

goog.inherits(biofuelsGame.field, lime.Sprite);

// crop type can be 'corn', 'grass', 'nothing'
//--------------------------------------------------------------------------------------------------
biofuelsGame.field.prototype.setUpCrop = function(crop_type)
{
	if (this.cropType == crop_type) 
	{
		return;
	}
	
	if (crop_type == "nothing" ) 
	{
		// fade current crop out
		this.plantLayer.runAction( new lime.animation.FadeTo(0).setDuration(1) );
	}
	else if (crop_type == "corn" ) 
	{
		this.growNewCrop('assets/corn_plant.png', 0.5, 1);
	}
	else if (crop_type == "grass" )
	{
		this.growNewCrop('assets/grass_plant.png', 0.5, 1);
	}
	
	this.cropType = crop_type;
}

//--------------------------------------------------------------------------------------------------
biofuelsGame.field.prototype.growNewCrop = function(crop_asset, min_time, max_time)
{
	this.plantLayer.setOpacity(0);
	this.plantLayer.runAction( new lime.animation.FadeTo(1).setDuration(0.25) );
	
	for (var idx = 0; idx < this.plantingArray.length; idx++ )
	{
		var plant = this.plantingArray[idx];
		var time = Math.random() * (max_time - min_time) + min_time;

		plant.setFill(crop_asset);
		plant.setScale(0.1);
		plant.runAction( new lime.animation.ScaleTo(1).setDuration(time) );
	}
}

//--------------------------------------------------------------------------------------------------
biofuelsGame.field.prototype.disableFieldInteractionsForPlantPopup = function() 
{
	this.fertilizerIcon.disableInteractions(1); // revert sprite if active
	this.plantActionIcon.disableInteractions(0); // don't revert active sprite
	this.fieldHealthIcon.disableInteractions(1);// revert sprite if active
}

//--------------------------------------------------------------------------------------------------
biofuelsGame.field.prototype.disableFieldInteractionsForHealthPopup = function() 
{
	this.fertilizerIcon.disableInteractions(1); // revert sprite if active
	this.plantActionIcon.disableInteractions(1); // revert sprite if active
	this.fieldHealthIcon.disableInteractions(0);// don't revert active sprite
}

//--------------------------------------------------------------------------------------------------
biofuelsGame.field.prototype.enableFieldInteractions = function()
{
	this.fertilizerIcon.enableInteractions();
	this.plantActionIcon.enableInteractions();
	this.fieldHealthIcon.enableInteractions();	
}
