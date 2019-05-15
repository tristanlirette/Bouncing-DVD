//Creation of the image object using jQuery
$(document.body).append('<img id="logo" src="img/logo.png" alt="N/A"/>');
var elem = $("#logo");

//Setting the size of the image and its CSS position attribute to absolute so its position is relative to its parent
elem.css("height", "200px");
elem.css("width", "334px");
elem.css("position", "absolute");

//Boundaries of the window, taking in account the size of the image
var maxY = $(document).height() - elem.height();
var maxX = $(document).width() - elem.width();

//Starting values for x and y
var y = maxY;
var x = 0;

//forward in both directions : true means moving forward and false means moving backwards.
var fwdX = false;
var fwdY = true;

var fps = 120;
var speed = 2;

var then = Date.now();
var now, elapsed;

function frame() {

    window.requestAnimationFrame(frame);

    now = Date.now();
    elapsed = now - then;

    if(elapsed > 1000/fps) {

        for(var i = 0; i <= speed; i++) {
            updateCoordinates();
        }

        then = now - (elapsed % 1000/fps);

        //Finally, this will apply the change in the CSS of the image, using again jQuery.
        elem.css("bottom", y + "px");
        elem.css("left", x + "px");
    }
}

function updateCoordinates() {
    //If one of the side walls are hit, the direction in x is reversed
    if((x == 0) || (x == maxX)) {
        fwdX = !fwdX;
    }
    //Accordingly, if either the upper or lower wall are hit, the direction in y is reversed
    if((y == 0) || (y == maxY)) {
        fwdY = !fwdY;
    }
    //Since the image can only hit one wall per those two previous conditions at the same time, the
    // direction will be reversed two times when two walls are hit, making the angle change by 180 degrees.

    //Incrementing or decrementing both x and y depending on the direction of the image in both axis
    if(fwdX)
        x++;
    else
        x--;

    if(fwdY)
        y++;
    else
        y--;
}

window.requestAnimationFrame(frame);