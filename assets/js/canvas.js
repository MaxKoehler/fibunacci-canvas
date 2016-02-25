// jQuery Quatsch
$.noConflict();
jQuery( document ).ready(function( $ ) {

// Constants
// Eigentlich nicht wirklich ein Parameter, aber hier wird bestimmt, wie weit die Zeichen Funktion dem Kreisradius folgt. Ein mal "Math.PI" ist dabei 180°, also mal zwei dann eine ganze Drehung. Das sollte so bleiben! 
var radCirc = Math.PI*2;
var PHI = ( 1 + Math.sqrt(5) ) / 2;
var goldenAngle = 360 / PHI; // = 222.5°
var degree = Math.PI/180;
// var gregorianYear = 31556952000; // ms

// Typographie
var fontSize = 16; // px
var lineHeight = 1.5; // em

// Global Variables
var running;
var canvas, ctx;
var canvasW, canvasH, canvasMin;
var movers = [];

//                     //
//  P A R A M E T E R  //
//                     //




var numMovers = 256;
var circleRadius = 2;

var optionRandomColor = 0;
var optionRandomColorAlpha = 0;
 
function getHSLa(hue,sat,light,alpha) {
  return "hsla(" + hue + "," + sat + "%," + light + "%," + alpha + ")";
}
var circleFillColor = "hsla(0,0%,100%,1)"; // getHSLa(0,0,0,1/128);
console.log("circleFillColor: " + circleFillColor);

var innerOffset = fontSize*lineHeight*0; // Innerer Abstand
var outerOffset = fontSize*lineHeight*4; // Äußerer Abstand

var clear = 1;

var fps = 25; // Bilder pro Sekunde
var loop = 1; // Nur einmal oder immer wieder?


// Dimensions

// Maximum Radius ( ViewportDiagonal / 2 )
var maxRadius = $.stage().dp / 2;
// console.log(maxRadius);


// Der Ursprung allen Übels

var origin = calcOrigin();

// "Ab geht die Post" - Funktion

var startTime = $.now();
// console.log(startTime/1000/60/60/24/7/4/12);

var phase = startTime*degree;

// Geschwindigkeit

// var time = 1; // 1/25/60/60/24; // /7; // /4; // /12;

// console.log(canvasMin);
var maxSize; // = ((canvasMin/2)-outerOffset-innerOffset)/numMovers;

setup();

console.log("maxSize: " + maxSize + "px");

var frame = 0;
function run() {
  frame++; 
  clearCanvas(ctx);

  var passedSeconds = frame/25;

  // Spin the whole thing

  var spinSpeed = 0; // degrees per second 
  var spin = spinSpeed*passedSeconds*degree;
  // console.log( passedSeconds*degree );

  for (i=0;i<numMovers;i++) {

    m = movers[i]; // Hole den aktuellen Punkt, solange bis jeder einmal drankam.

    var morphSpeed = 1/8;
    var morph = i * ( morphSpeed*passedSeconds*degree + phase );

    // speed = (frame)/25/60/10;
    // position = goldenAngle*i;
    // radians = speed*degree + position*degree;

    // Die gleichmäßige Verteilung der Punkte auf dem bestimmten Radius.

    radius = (maxSize/numMovers)*i+innerOffset; // i;    

    m.x = origin.x + Math.sin(morph + spin) * radius;
    m.y = origin.y + Math.cos(morph + spin) * radius;

    // Speicher / Male den Punkt
    movers[i] = m;
    ctx.beginPath();
    ctx.arc( m.x, m.y, m.size, 0, radCirc);
    ctx.fillStyle = m.color;
    ctx.fill();
  }
}

function setup() {
  // Setup Canvas
  canvas = document.getElementById('c');
  ctx = canvas.getContext('2d');
  calcDimensions(canvas);

  // Visualisiere den äußeren Abstand

  // radius = (canvasMin/2)-outerOffset;
  // ctx.beginPath();
  // ctx.arc( origin.x, origin.y, radius, 0, radCirc);
  // ctx.fillStyle = 'hsla(0,0%,0%,.025)';
  // ctx.fill();

  // Visualisiere den inneren Abstand

  // radius = innerOffset;
  // ctx.beginPath();
  // ctx.arc( origin.x, origin.y, radius, 0, radCirc);
  // ctx.fillStyle = 'hsla(0,0%,0%,1)';
  // ctx.fill();

  // on Click: Toggle Animation
  canvas.addEventListener('click',function(){if(running){stopAnimation()}else{startAnimation()}},false);

  // Create Movers
  for (i=0;i<numMovers;i++) {

    var m = new Mover();

    // console.log(i);
    if ( i == 0 ) {
      // console.log("i==0: " + (i==0));
      m.size = 1;
    } else {
      m.size = circleRadius;
    }

    if(optionRandomColor) {
      if(optionRandomColorAlpha){
        m.color = getRandomRGBa();
      } else {
        m.color = getRandomRGB();
      }
    } else {
      m.color = circleFillColor;
    }
    movers[i] = m;

  }

  if ( loop ) { 
    startAnimation(); 
  }
}

// jQuery.stage Calculations
var showStage = function (stage, stageOld) {
  $.each( stage, function (name, value) {
      $(".info .value." + name).html(value);
  });
};
// jQuery.stage Informations
showStage($.stage(), null);
$(window).stage(function (ev, stage, stageOld) {
    showStage(stage, stageOld);
});

// console.log( "$.stage().dp: " + $.stage().dp + "px");

function startAnimation() {
  console.log("// Start");
  mainInterval = window.setInterval(run, 1/fps*1000); // msPerFrame
  running = 1;
}

function stopAnimation() {
  console.log("// Stop");
  clearInterval(mainInterval)
  running = 0;
}

// Mover Class
function Mover() {
  // Properties
    this.color = 'white'; // getRandomRGB();
    this.size  = 0;
    this.y     = 0; 
    this.x     = 0;
    // Accelleration ( Speed, Direction )
    // this.vX    = 0;
    // this.vY    = 0;
}

function Point() {
  this.y = 0;
  this.x = 0;
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
    // ctx.globalCompositeOperation = 'destination-over';
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
  maxSize = ((canvasMin/2)-outerOffset-innerOffset);
}

// Berechne den Ursprung allen Übels

function calcOrigin(){
  var origin = new Point();
  origin.x = $.stage().w / 2;
  origin.y = $.stage().h / 2;
  origin.min = Math.min(origin.x, origin.y);
  return origin;
};

}); // jQuery End