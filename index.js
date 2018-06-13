console.log("test");
var canvas = document.querySelector('canvas')
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var mouse = {
  x: undefined,
  y: undefined
}

var c = canvas.getContext("2d");
window.addEventListener('mousemove', function(event) {
  mouse.x = event.x;
  mouse.y = event.y;
})

function Circle(x,y,dx,dy,radius) {
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.radius = radius;
  this.originalRadius = radius;
  this.draw = function() {
    c.beginPath();

    c.arc(this.x,this.y,this.radius,0,Math.PI*2,false);
    c.strokeStyle = "blue";
    c.stroke();
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
      if (this.radius < this.originalRadius * 3) this.radius += 1;
    }
    else if (this.radius > this.originalRadius) this.radius -=1;

    this.draw();
  }
}

function CircleArray(size) {
  this.Array = [];
  for (i = 0; i < size; i++) {
    var radius = Math.random() * 20 + 20;
    var x = Math.random() * (innerWidth - (radius * 2)) + radius;
    var y = Math.random() * (innerHeight - (radius * 2)) + radius;
    var dx = (Math.random() - 1) * 2;
    var dy = (Math.random() - 1) * 2;
    this.Array.push(new Circle(x,y,dx,dy,radius))
  }
  this.update = function() {
    for (i = 0; i < size; i++) {
      this.Array[i].update();
    }
  }
}

var circleArray = new CircleArray(500);

function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0,0,innerWidth,innerHeight);
  circleArray.update();


}

animate();
