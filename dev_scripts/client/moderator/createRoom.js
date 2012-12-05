goog.provide('biofuelsGame.createRoom');

goog.require('lime.RoundedRect');
goog.require('lime.animation.FadeTo');
goog.require('lime.animation.ScaleTo');
goog.require('lime.fill.Stroke');
goog.require('lime.Polygon');
goog.require('lime.Label');
goog.require('lime.GlossyButton');
goog.require('goog.editor.Field');
goog.require('goog.events.EventType');
goog.require('goog.events.KeyCodes');
goog.require('goog.events.KeyHandler');
goog.require('goog.events.KeyHandler.EventType');
goog.require('goog.async.Delay');

// FIXME - NOTE: Ok, so text inputs in LimeJS are pretty nasty, unless there's some sweet way
//	to do them that I haven't uncovered yet?
//
// TODO: would be nice to have a green/red LED image next to the room name...as the
//	moderator types, could validate and ensure unique?  Green is GO red is NO
//--------------------------------------------------------------------------------------------------
// Moderator create room - subclass of roundedRect
//--------------------------------------------------------------------------------------------------
biofuelsGame.createRoom = function(caller) 
{
    // must call super constructor
    lime.RoundedRect.call(this);
        
    this.setOpacity(0);
    
   // graph "container" styling - TODO: any common stylings should end up in one place
    this.setSize(300,160).setRadius(12*2);
    this.setFill('#FEF8D0').setStroke(new lime.fill.Stroke(12*2, '#664'));     
 
    // graph element properties - TODO: any common stylings should end up in one place
	var TITLE_FONT_SIZE = 14;
	var TITLE_FONT_COLOR = '#fff';
	
	var LABEL_FONT_SIZE = 10;
	var LABEL_FONT_COLOR = '#777';
	
	// Titles + graph labels
	var graphTitle = makeLabel('Create Room', 0, -75, TITLE_FONT_SIZE, TITLE_FONT_COLOR, 'center');
	graphTitle.setShadow('#110', 2, 0 , 2);	
	this.appendChild(graphTitle);
	
	var graphLabel = makeLabel('Room Name', -80, -40, LABEL_FONT_SIZE, LABEL_FONT_COLOR, 'right');
	this.appendChild(graphLabel);

	graphLabel = makeLabel('Room Password', -90, 0, LABEL_FONT_SIZE, LABEL_FONT_COLOR, 'right');
	this.appendChild(graphLabel);

    var createButton = new lime.GlossyButton("Create Room").setAnchorPoint(0.5, 0).setPosition(0, 40).setSize(120,30).setColor('#885');
    this.appendChild(createButton);
	
	// FIXME: NASTY, NASTY stuff...found some hax to make an input box....start with a label... bah
	var roomInput = new lime.Label().setAnchorPoint(0,0.5).setPosition(-40,-40).setFill('#fff').setSize(160,30);
    roomInput.getDeepestDomElement().setAttribute('id','roomInput');
    this.appendChild(roomInput);

    var roomPassword = new lime.Label().setAnchorPoint(0, 0.5).setPosition(-40, -30).setFill('#fff').setSize(160,30);
    roomPassword.getDeepestDomElement().setAttribute('id','roomPassword');
    this.appendChild(roomPassword);

    // FIXME: and the BAD part...requires a properly set up DOM element, apparenlty, which will not exist 
    //	until the next render frame
    //	hence a tragic delay to allow something like that to happen.  Likely fragile...
	var delay = new goog.async.Delay(function() 
	{
		// FIXME: Also this step makes the fields editable...but also causes the whole layout to shift
		var textBox = new goog.editor.Field(roomInput.getDeepestDomElement().getAttribute('id'));
		textBox.setHtml(true, '');
		textBox.makeEditable();
		textBox.focus();
		roomInput.textBox = textBox;

		textBox = new goog.editor.Field(roomPassword.getDeepestDomElement().getAttribute('id'));
		textBox.setHtml(true, '');
		textBox.makeEditable();
		roomPassword.textBox = textBox;
		
		// FIXME: so to hide the nasty layout shift, just hide the boggly bits and fade it in
		this.runAction(new lime.animation.FadeTo(1).setDuration(0.05));
    }, 250, this);
    delay.start();

    goog.events.listen(createButton, "click", function(evt) {
    	var roomN = roomInput.textBox.field.textContent;
    	var roomP = roomPassword.textBox.field.textContent;
    	caller.launchServer(roomN, roomP);
    });
};

goog.inherits(biofuelsGame.createRoom, lime.RoundedRect);

