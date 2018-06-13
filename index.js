var canvas = document.querySelector('canvas')
//Sets canvas to size of window
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
//variables to hold mouse pos
var mouse = {
  x: undefined,
  y: undefined
}
//array of colours
var colourArray = [
  '#b8d8d8',
  '#7a9e9f',
  '#4f6367',
  '#eef5db',
  '#fe5f55'
];
//max circle radius
var maxRadius = 50;
//number of particles generated
var particleNum = 1000
//canvas objext
var c = canvas.getContext("2d");
//evnet listener for mouse movement
window.addEventListener('mousemove', function(event) {
  mouse.x = event.x;
  mouse.y = event.y;
})
//event listener for window resize
window.addEventListener('resize', function(event) {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  circleArray = new CircleArray(particleNum);
})


//circle object
function Circle(x,y,dx,dy,radius) {
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.radius = radius;
  this.originalRadius = radius;
  this.fillColour = Math.floor(Math.random() * colourArray.length);
  this.draw = function() {
    c.beginPath();
    c.arc(this.x,this.y,this.radius,0,Math.PI*2,false);
    c.fillStyle = colourArray[this.fillColour]
    c.fill();
  }
  this.update = function() {
    if (this.x+this.radius > innerWidth || this.x-this.radius < 0) {
      this.dx = -this.dx;
    }

    if (this.y+this.radius > innerHeight || this.y-this.radius < 0) {
      this.dy = -this.dy;
    }
    this.y+= this.dy;
    this.x+= this.dx;

    if (Math.abs(mouse.x-this.x) < 50 && Math.abs(mouse.y-this.y) < 50) {
      if (this.radius < maxRadius) this.radius += 1;
    }
    else if (this.radius > this.originalRadius) this.radius -=1;

    this.draw();
  }
}
//circle array object
function CircleArray(size) {
  this.Array = [];
  for (i = 0; i < size; i++) {
    var radius = Math.random() * 4 + 1;
    var x = Math.random() * (innerWidth - (radius * 2)) + radius;
    var y = Math.random() * (innerHeight - (radius * 2)) + radius;
    var dx = (Math.random() - 0.5) * 2;
    var dy = (Math.random() - 0.5) * 2;
    this.Array.push(new Circle(x,y,dx,dy,radius))
  }
  this.update = function() {
    for (i = 0; i < size; i++) {
      this.Array[i].update();
    }
  }
}

//responsible for updating screen
function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0,0,innerWidth,innerHeight);
  circleArray.update();
}
//creates an array of particles
c.font = "Bold 35px Arial";
c.textAlign = "center";
c.fillStyle ="black";
c.fillText("Website",100,100);
c.strokeStyle = "black";
c.strokeText("Website",100,100);
c.textBaseline = "bottom";

var circleArray = new CircleArray(particleNum);
animate();
