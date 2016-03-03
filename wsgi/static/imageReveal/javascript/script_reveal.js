var red_full = new Array();
var green_full = new Array();
var blue_full = new Array();
var alpha_full = new Array();;

var red = new Array();
var green = new Array();
var blue = new Array();
var alpha = new Array();

function add_colour(colour_name) {

    var canv = document.getElementById("the_pic");
    var img_width = canv.width;
    var img_height = canv.height;
    //

    var wvnumx = Math.floor(10*Math.random())*(2*3.1414);
    var wvnumy = Math.floor(10*Math.random())*(2*3.1414);
    var shiftx = Math.random();
    var shifty = Math.random();
    var pertAmp = 5;
    var wavAmp = 15*(1+Math.random());

    for (var ipixel = 0; ipixel < red.length; ipixel++) {
        var row = Math.floor(ipixel/img_width);
        var col = ipixel - img_width*row;
        var y = row/img_height;
        var x = col/img_width; 
        var factor = wavAmp*(1.0-Math.sin(wvnumx*(x-shiftx))*Math.sin(wvnumy*(y-shifty)));
        var pert = pertAmp*(Math.random()-0.1);

        if (colour_name == 'red') {
            green[ipixel] = Math.max(green[ipixel] - Math.floor(factor+pert), green_full[ipixel]);
            blue[ipixel] = Math.max(blue[ipixel] - Math.floor(factor+pert), blue_full[ipixel]);
        } else if (colour_name == 'green') {
            red[ipixel] = Math.max(red[ipixel] - Math.floor(factor+pert), red_full[ipixel]);
            blue[ipixel] = Math.max(blue[ipixel] - Math.floor(factor+pert), blue_full[ipixel]);
        } else if (colour_name == 'blue') {
            red[ipixel] = Math.max(red[ipixel] - Math.floor(factor+pert), red_full[ipixel]);
            green[ipixel] = Math.max(green[ipixel] - Math.floor(factor+pert), green_full[ipixel]);
        }
    }

    drawCanvas();
    updateScore(-50);
    focusAnswer();
}

function colourFull() {
    for (var ipixel = 0; ipixel < red.length; ipixel++) {
        if ((green[ipixel] > green_full[ipixel]) || 
                (blue[ipixel] > blue_full[ipixel]) ||
                (red[ipixel] > red_full[ipixel]) ||
                (alpha[ipixel] > alpha_full[ipixel])) {
            return false;
        }
    }
    return true;
}

function revealStep(step) {
    for (var ipixel = 0; ipixel < red.length; ipixel++) {
        green[ipixel] = Math.max(green[ipixel] - step, green_full[ipixel]);
        blue[ipixel] = Math.max(blue[ipixel] - step, blue_full[ipixel]);
        red[ipixel] = Math.max(red[ipixel] - step, red_full[ipixel]);
        alpha[ipixel] = Math.max(alpha[ipixel] - step, alpha_full[ipixel]);
    }
    drawCanvas();
}

function fullReveal(step, delay, callback) {
    var counter = 0;
    var myRevealer = setInterval( function() {
        revealStep(step);
        if ((colourFull()) || (++counter > 100)) {
            clearInterval(myRevealer);
            callback();
        }
    }, delay);
}

function clearCanvas() {
    for (var ipixel = 0; ipixel < red.length; ipixel++) {
        red[ipixel] = 255;
        blue[ipixel] = 255;
        green[ipixel] = 255;
        alpha[ipixel] = 255;
    }

    drawCanvas();
}

function drawCanvas() {
    var canv = document.getElementById("the_pic");
    g = canv.getContext("2d");

    g.clearRect(0, 0, canv.width, canv.height);
    var myData = g.getImageData(0, 0, canv.width, canv.height);
    var newData = myData.data;

    for (var ipixel = 0; ipixel < red.length; ipixel++) {
        newData[4*ipixel+0] = red[ipixel];
        newData[4*ipixel+1] = green[ipixel];
        newData[4*ipixel+2] = blue[ipixel];
        newData[4*ipixel+3] = alpha[ipixel];
    }

    myData.data = newData;
    g.putImageData(myData, 0, 0);
    return 0;
}

function load_image() {

    // create a hidden canvas and get its context 
    var hidden_canvas = document.createElement('canvas');
    var hidden_context = hidden_canvas.getContext('2d');

    // target picture
    var canv = document.getElementById("the_pic");

    // get image from img tag in html
    var img = document.getElementById("full_pic");
    // console.log(img.width + ' ' + img.height);

    console.log('image naturalWidth: ' + img.naturalWidth);
    var notloaded = true;
    while (notloaded) {
        if ((typeof img.naturalWidth) != "undefined") {
            if (img.naturalWidth > 0) {
                notloaded = false;
                console.log('image loaded! ' + img.naturalWidth);
            }
        }
    }

    // draw the image to hidden canvas
    hidden_canvas.width = canv.width;
    hidden_canvas.height = canv.height;
    hidden_context.drawImage(img, 0, 0 );

    // extract image data from context of hidden canvas
    myData = hidden_context.getImageData(0, 0, canv.width, canv.height);

    var counter = 0;
    for (var ipixel = 0; ipixel < myData.data.length; ipixel += 4) {
        red_full[counter] = myData.data[ipixel];
        green_full[counter] = myData.data[ipixel+1];
        blue_full[counter] = myData.data[ipixel+2];
        alpha_full[counter] = myData.data[ipixel+3];

        red[counter] = 255;
        green[counter] = 255;
        blue[counter] = 255;
        alpha[counter] = 255;

        counter += 1;
    }

    drawCanvas();
}
