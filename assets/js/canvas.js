// Initiate with jQuery
$.noConflict();
jQuery( document ).ready(function( $ ) {

// Parameters
var numMovers = 128;
var circleRadius = 3;

var clear = 1;

var innerOffset = 16*4;
var outerOffset = 16*4;

// Frames per Second
var fps = 25;
var loop = 1;
var duration = 2*1000; // Duration until Timeout in ms

// Global Variables
var running;
var canvas, ctx;
var canvasW, canvasH, canvasMin;
var radCirc = Math.PI*2;
var PHI = ( 1 + Math.sqrt(5) ) / 2;
var goldenAngle = 360 / PHI; // = 222.5°
// var gregorianYear = 31556952000; // ms


// jQuery.stage Information
var showStage = function (stage, stageOld) {
  $.each( stage, function (name, value) {
      $(".info .value." + name).html(value);
  });
};
showStage($.stage(), null);
$(window).stage(function (ev, stage, stageOld) {
    showStage(stage, stageOld);
});

console.log( "$.stage().dp: " + $.stage().dp + "px");

// Dimensions

  // Maximum Radius ( Viewport Diagonal / 2 )
  var radiusMax = $.stage().dp / 2;


// Mover Array
var movers = [];

var phase; // $.now(); // /timeSpan*100;

setup();
if ( loop ) { startAnimation(); }


function setup() {

  // Setup Canvas
  canvas = document.getElementById('c');
  ctx = canvas.getContext('2d');
  calcDimensions(canvas);
  // on Click: Toggle Animation
  canvas.addEventListener('click',function(){if(running){stopAnimation()}else{startAnimation()}},false);

  // Create Movers
  for (i=0;i<numMovers;i++) {
    var m = new Mover();
    m.size = circleRadius;
    m.color = getRandomRGB();
    movers[i] = m;
  }
}

var rad = Math.PI/180;
var counter = 0;
function run() {
  counter++;
  clearCanvas(ctx); // Clear canvas if necessary

  var phase = 0; // counter / goldenAngle * 100;
  var angle = goldenAngle*counter; //  + phase;

  // Recalculate nowTime is propably too much
  // - instead use a simple counter
  // phase = $.now()/1000;

  // console.log(phase);
  for (i=0;i<numMovers;i++) {
    m = movers[i];


    radians = 0 + i/rad*goldenAngle + rad*counter
    ;

    radius = (canvasMin/2)*(i+1)/(numMovers);

    m.x = canvasW/2 + Math.sin(radians) * radius;
    m.y = canvasH/2 + Math.cos(radians) * radius;

    // Store Mover
    movers[i] = m;

    mX = m.x;
    mY = m.y;

    // mSize = m.size

    mColor = m.color;
    // Draw Mover
    ctx.beginPath();

    ctx.arc( mX, mY, m.size, 0, radCirc);
    ctx.fillStyle = mColor;
    ctx.fill();
  }
}

function startAnimation() {
  console.log("Start();");
  mainInterval = window.setInterval(run, 1/fps*1000); // msPerFrame
  running = 1;
}

function stopAnimation() {
  console.log("Stop();");
  clearInterval(mainInterval)
  running = 0;
}

// Mover Class
function Mover() {
  // Properties

    // Color - Generate random on creation
    this.color = 'white'; // getRandomRGB();

    // Position
    this.y     = 0;
    this.x     = 0;

    // Accelleration ( Speed, Direction )
    // this.vX    = 0;
    // this.vY    = 0;

    // Size
    this.size  = 0;

}

// Additional functions

function getRandomRGB() {
  return "rgb(" + Math.floor( Math.random()*255 ) + "," + Math.floor( Math.random()*255 ) + "," + Math.floor( Math.random()*255 ) + ")";
}

function getRandomRGBa() {
  return "rgba(" + Math.floor( Math.random()*255 ) + "," + Math.floor( Math.random()*255 ) + "," + Math.floor( Math.random()*255 ) + "," + Math.floor( Math.random()*100 )/100 + ")";
}

function drawDevShapes(ctx) {
}

function clearCanvas(ctx) {
  if (clear) {
    ctx.globalCompositeOperation = 'destination-over';
    ctx.clearRect(0,0,canvasW,canvasH); // clear canvas
    // ctx.globalCompositeOperation = 'source-over'; // Quelle über?
  }
}

function calcDimensions(canvas) {
  canvas.width = document.body.clientWidth;
  canvas.height = document.body.clientHeight;
  canvasW = canvas.width;
  canvasH = canvas.height;
  canvasMin = Math.min(canvasW, canvasH);
}

}); // jQuery End