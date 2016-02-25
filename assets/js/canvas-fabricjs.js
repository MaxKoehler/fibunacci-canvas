
var numMovers = 128;




// Global Parameters
var fps = 25; // 25;
var globalTimeout = 4 * 1000; // ms


// Parameters
var diameter = 24;
var size = diameter/2;

var color = 'hsla(0,0%,100%,.8)';

// Global Background Color
var canvasBackgroundColor = 'hsla( 180, 100%, 12%, 1)';

var innerOffset = 10;
var outerOffset = 10;

// fabricJs
var circleRadius = 2; // px
var circleColor = 'hsla( 0, 0%, 100%, 1 )';

// Base Calculations

var PHI = ( 1 + Math.sqrt(5) ) / 2;
var goldenAngle = 360 / PHI; // 222.5;

console.log("PHI: " + PHI);
console.log("goldenAngle: " + goldenAngle);


var radCirc = Math.PI*2;
var mspf = (1/fps)*1000; // Milliseconds per frame


var innerSpace;

// Globals
var $j = jQuery.noConflict();
var canvas, canvasW, canvasH, canvasMin;
var movers = [];
var innerSpace, outerSpace;

init();

function init() {

    // Create Facrib Canvas Element
    canvas = new fabric.Canvas('c', {
        backgroundColor: canvasBackgroundColor // rHsla, // 'hsla( 240, 2%, 50%,1)'
    });

    // Initiate Canvas
    if( canvas.getContext )
    {
        // Call Setup Configuration
        setup();

        // Loop
        var startLoop = false;
        if ( startLoop ) {
          var intervalID = setInterval( run , mspf ); // 40 // default: 33
          setTimeout(
              function(){
                  clearInterval( intervalID );
                  console.log("// End <3");
              },
              globalTimeout
          );
        } else {
          console.log("// Loop deactivated");
        }
    }
}

function setup()
{
    console.log("// Start // setup()");

    // Resize canvas to full size
    canvas.setWidth(document.body.clientWidth);
    canvas.setHeight(document.body.clientHeight);
    canvas.calcOffset();

    // Store canvas dimensions
    canvasW = canvas.getWidth();
    canvasH = canvas.getHeight();
    canvasMin = Math.min(canvasW,canvasH);

    // Calculate inner/outer offset constants
    innerSpace = canvasMin/2 * innerOffset/100;
    outerSpace = canvasMin/2 * outerOffset/100 + innerSpace;

    var i = numMovers;
    console.log(i);

    while( i-- )
    {
        // Last: i = 0
        console.log(i);

        var m = new Mover();
        m.color = getRandomHsla(); // color;
        m.size = size;

        // The current Mover Angle
        var angle = goldenAngle * i;
        console.log(angle);
        console.log("canvasMin: " + canvasMin);

        // Example: numMovers = 1 => numMovers-1 = 0 => x/0 => Fail

        // Divide the minimum of canvas Width/Height into equal parts depending on i.
        // So that the area is filled fully, subtracting the inner/outer space.
        var radius = (canvasMin/2 - outerSpace) / numMovers * i + innerSpace;
        console.log("Radius: " + radius);

        // Set Mover X,Y Coordinates
        m.x = Math.cos(angle)*radius + canvasW/2;
        m.y = Math.sin(angle)*radius + canvasH/2;

        console.log(m.x + 'x' + m.y);


        // Store
        movers[i] = m;

        // Get
        var m  = movers[i];

        var circle = new fabric.Circle({
          radius: m.size,
          fill: m.color,
          left: m.x,
          top: m.y
        });

        // var spin = 10;
        // var duration = 24000;
        // circle.animate('left', '+=' + canvasW/2, {
        //   duration: duration,
        //   onChange: canvas.renderAll.bind(canvas)
        // });
        // circle.animate('top', '+=' + canvasH/2, {
        //   duration: duration,
        //   onChange: canvas.renderAll.bind(canvas)
        // });

        var spin = 1/64; // Degree

        circle.animate({
              left: '+=' + Math.cos(spin)*i,
              top: '+=' + Math.sin(spin)*i
            }, {
            duration: 4000,
            onChange: canvas.renderAll.bind(canvas),
            onComplete: function() {
              //callback code goes here
            },
            abort: function(){
              var someConditionWhichAbortsAnimationWhenItsTrue = 0;
              return someConditionWhichAbortsAnimationWhenItsTrue;
            }
        });

        canvas.add(circle);

    }
}

function run() {

    // ctx.globalCompositeOperation = "source-over";
    // ctx.fillStyle = "rgba(8,8,12,.65)";
    // ctx.fillRect( 0 , 0 , canvasW , canvasH );
    // ctx.globalCompositeOperation = "lighter";

    // console.log(rHsla);
    // canvas = new fabric.Canvas('c', {
    //     backgroundColor: rHsla, // 'hsla( 240, 2%, 50%,1)'
    // });

    // var rHsla = getRandomHsla();
    // canvas.setBackgroundColor(
    //     canvasBackgroundColor,
    //     // rHsla,
    //     canvas.renderAll.bind(canvas)
    // );

    var i = numMovers;
    while( i-- )
    {

    }
    // // mouseVX    = mouseX - prevMouseX;
    // // mouseVY    = mouseY - prevMouseY;
    // // prevMouseX = mouseX;
    // // prevMouseY = mouseY;

    // // var toDist   = canvasW / 1.15;
    // // var stirDist = canvasW / 8;
    // // var blowDist = canvasW / 2;

    // var Mrnd   = Math.random;
    // var Mabs   = Math.abs;
    // var Msqrt  = Math.sqrt;
    // var Mcos   = Math.cos;
    // var Msin   = Math.sin;
    // var Matan2 = Math.atan2;
    // var Mmax   = Math.max;
    // var Mmin   = Math.min;

    // var i = numMovers;
    // while( i-- )
    // {
    //     // Dublicate Mover Attributes
    //     var m  = movers[i];
    //     var x  = m.x;
    //     var y  = m.y;
    //     var vX = m.vX;
    //     var vY = m.vY;

        // var dX = x - mouseX;
        // var dY = y - mouseY;
        // var d = Msqrt( dX * dX + dY * dY );
        // var a = Matan2( dY , dX );
        // var cosA = Mcos( a );
        // var sinA = Msin( a );

        // if( isMouseDown )
        // {
        //     if( d < blowDist )
        //     {
        //         var blowAcc = ( 1 - ( d / blowDist ) ) * 2;
        //         vX += cosA * blowAcc + .5 - Mrnd();
        //         vY += sinA * blowAcc + .5 - Mrnd();
        //     }
        // }

        // if( d < toDist )
        // {
        //     var toAcc = ( 1 - ( d / toDist ) ) * canvasW * .0014;
        //     vX -= cosA * toAcc;
        //     vY -= sinA * toAcc;
        // }

        // if( d < stirDist )
        // {
        //     var mAcc = ( 1 - ( d / stirDist ) ) * canvasW * .00022;
        //     vX += mouseVX * mAcc;
        //     vY += mouseVY * mAcc;
        // }


        // vX *= friction;
        // vY *= friction;

        // var avgVX = Mabs( vX );
        // var avgVY = Mabs( vY );
        // var avgV = ( avgVX + avgVY ) * .5;

        // if( avgVX < .1 ) vX *= Mrnd() * 3;
        // if( avgVY < .1 ) vY *= Mrnd() * 3;

        // var sc = avgV * .45;
        // sc = Mmax( Mmin( sc , 3.5 ) , .4 );

        // var nextX = x + vX;
        // var nextY = y + vY;


        // Colision canvas borders
        // if( nextX > canvasW )
        // {
        //     nextX = canvasW;
        //     vX *= -1;
        // }
        // else if( nextX < 0 )
        // {
        //     nextX = 0;
        //     vX *= -1;
        // }

        // if( nextY > canvasH )
        // {
        //     nextY = canvasH;
        //     vY *= -1;
        // }
        // else if( nextY < 0 )
        // {
        //     nextY = 0;
        //     vY *= -1;
        // }


    // }

    //rect( ctx , mouseX - 3 , mouseY - 3 , 6 , 6 );
}


// function onDocMouseMove( e )
// {
//     var ev = e ? e : window.event;
//     mouseX = ev.clientX - outerDiv.offsetLeft - canvasDiv.offsetLeft;
//     mouseY = ev.clientY - outerDiv.offsetTop  - canvasDiv.offsetTop;
// }

// function onDocMouseDown( e )
// {
//     isMouseDown = true;
//     return false;
// }

// function onDocMouseUp( e )
// {
//     isMouseDown = true;
//     return false;
// }



// ==========================================================================================


function Mover()
{
    // this.color = "rgb(" + Math.floor( Math.random()*255 ) + "," + Math.floor( Math.random()*255 ) + "," + Math.floor( Math.random()*255 ) + ")";

    this.color = circleColor;
    this.y     = 0;
    this.x     = 0;
    this.vX    = 0;
    this.vY    = 0;
    this.size  = 0;
}


// ==========================================================================================


// Gibt eine Zufallszahl zwischen 0 (inklusive) und 1 (exklusive) zurück

function getRandom() {
  return Math.random();
}

// Gibt eine Zufallszahl zwischen min (inklusive) und max (exklusive) zurück

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

// Rundet eine Zahl auf 3 Nachkommastellen

function roundDecimal(num) {
  return Math.round(num * 100) / 100;
}

// Gibt eine zufällige Farbe in hsla zurück

function getRandomHsla() {
  var hue = getRandomArbitrary(0,360);
  var sat = getRandomArbitrary(0,101);
  var light = getRandomArbitrary(0,101);
  var alpha = getRandomArbitrary(0,101)/100;
  return 'hsla(' + roundDecimal(hue) + ',' + roundDecimal(sat) + '%,' + roundDecimal(light) + '%,' + roundDecimal(alpha) + ')';
}

