console.log("test");
var canvas = document.querySelector('canvas')
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext("2d");

function Circle(x,y,dx,dy,radius) {
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.radius = radius;
  this.draw = function() {
    c.beginPath();
    c.arc(this.x,this.y,this.radius,0,Math.PI*2,false);
    c.strokeStyle = "blue";
    c.stroke();
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
    this.draw();
  }
}

function CircleArray(size) {
  this.Array = [];
  for (i = 0; i < size; i++) {
    var x = Math.random() * innerWidth;
    var y = Math.random() * innerHeight;
    var dx = (Math.random() - 1) * 10;
    var dy = (Math.random() - 1) * 10;
    var radius = Math.random() * 20 + 20;
    this.Array.push(new Circle(x,y,dx,dy,radius))
  }
  this.update = function() {
    for (i = 0; i < size; i++) {
      this.Array[i].update();
    }
  }
}

var circleArray = new CircleArray(100);

function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0,0,innerWidth,innerHeight);
  circleArray.update();


}

animate();
