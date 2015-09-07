// PRELOAD
var preload = function () {
  var TWO_PI = Math.PI * 2, 

   createCanvas = function() {
    var canvas;
    canvas = document.createElement("canvas");
    canvas.width = screen.width;
    canvas.height = screen.height;
    return canvas;
  };

  canvas = createCanvas();
  document.body.appendChild(canvas);
  var c = canvas.getContext("2d");
  var trails = createCanvas();
  var ct = trails.getContext("2d");

  clear = function() {
    c.fillStyle = "black";
    c.fillRect(0, 0, screen.width, screen.height);
    ct.fillStyle = "black";
    ct.fillRect(0, 0, screen.width, screen.height);
  };
  clear();

  var DrawingThing = (function() {
    function DrawingThing(x, y) {
      this.x = x;
      this.y = y;
      this.radii = [30, 60, 90, 120, 150, 180, 210, 240, 270, 300];
      this.num = this.radii.length;
      this.thetas = [Math.random() * TWO_PI, Math.random() * TWO_PI, Math.random() * TWO_PI, Math.random() * TWO_PI, Math.random() * TWO_PI, Math.random() * TWO_PI, Math.random() * TWO_PI, Math.random() * TWO_PI, Math.random() * TWO_PI, Math.random() * TWO_PI];
      this.thetasInc = [Math.random() * 0.2 - 0.1, Math.random() * 0.2 - 0.1, Math.random() * 0.2 - 0.1, Math.random() * 0.2 - 0.1, Math.random() * 0.2 - 0.1, Math.random() * 0.2 - 0.1, Math.random() * 0.2 - 0.1, Math.random() * 0.2 - 0.1, Math.random() * 0.2 - 0.1, Math.random() * 0.2 - 0.1];
    }

    DrawingThing.prototype.draw = function() {
      var i, j, ref, x, y;
      ct.strokeStyle = "rgba(255,114,20,0.1)";
      for (i = j = 0, ref = this.num; 0 <= ref ? j < ref : j > ref; i = 0 <= ref ? ++j : --j) {
        x = this.x + this.radii[i] * Math.cos(this.thetas[i]);
        y = this.y + this.radii[i] * Math.sin(this.thetas[i]);
        if (i > 10) {
          clear();
          ct.beginPath();
          ct.moveTo(x, y);
        }
        if (i === 0) {
          ct.beginPath();
          ct.moveTo(x, y);
        } else {
          ct.lineTo(x, y);
        }
        c.strokeStyle = "rgba(255,550,100,0)";
        c.fillStyle = "white";
        c.beginPath();
        c.arc(this.x, this.y, this.radii[i], 0, TWO_PI, false);
        c.stroke();
        c.beginPath();
        c.arc(x, y, 2, 0, TWO_PI, false);
        c.fill();
        this.thetas[i] += this.thetasInc[i];
      }
      ct.closePath();
      ct.stroke();
    };
    return DrawingThing;
  })();

  var drawingThings = [new DrawingThing(screen.width / 2, screen.height / 2)];

  i = 0;
  setInterval(function() {
    var drawThing, j, len, results;
    c.drawImage(trails, 0, 0);
    i += 1;
    if (i > 1200) {
      clear();
      i = 0;
    }
    results = [];
    for (j = 0, len = drawingThings.length; j < len; j++) {
      drawThing = drawingThings[j];
      results.push(drawThing.draw());
    }
    return results;
  }, 30);

  return;
}
