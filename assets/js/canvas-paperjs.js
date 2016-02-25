


// Base Calculations
var PHI = ( 1 + Math.sqrt(5) ) / 2;
var goldenAngle = 360 / PHI; // 222.5;

var canvasW = view.size.width;
var canvasH = view.size.height;
// console.log( 'Canvas: ' + canvasW + 'x' + canvasH );


var rectangle = new Rectangle(
                  new Point(0, 0),
                  new Size(canvasW/2, canvasH)
                );
var path = new Path.Rectangle(rectangle);
// path.strokeColor = 'black';
path.fillColor = 'hsla(120,75%,50%,0.75)';
path.opacity = .5;

var rectangle = new Rectangle(
                  new Point(0, 0),
                  new Size(canvasW, canvasH/2)
                );
var path = new Path.Rectangle(rectangle);
// path.strokeColor = 'black';
path.fillColor = 'hsla(300,75%,50%,0.75)';
path.opacity = .5;

var size = 200;

var shape = new Path.Ellipse({
    center: view.center, // [X, Y],
    radius: size,
    fillColor: 'black'
});
shape.opacity = .5;





function onFrame(event) {

  var i = event.count;

  // var n = 1/128;
  // var mod = Math.sqrt(i);
  var angle = goldenAngle * i;

  // var m = 10;

  // shape.translate([
  //   Math.cos(angle)*i,
  //   Math.sin(angle)*i
  // ]);

  // the number of times the frame event was fired:
  // console.log(event.count);

  // The total amount of time passed since
  // the first frame event in seconds:
  // console.log(event.time);

  // The time passed in seconds since the last frame event:
  // console.log(event.delta);

}
