var cols, rows;
var scl = 20;
var w = 700;
var h = 1000;
var flying = 0;
var terrain = [];

function setup() {
  createCanvas(600, 600, WEBGL);
  cols = floor(w / scl);
  rows = floor(h / scl);
  terrain = new Array(cols);
  for (var x = 0; x < cols; x++) {
    terrain[x] = new Array(rows);
  }
}

function draw() {
  flying -= 0.1 * 0.3; // 30% of the original value
  var yoff = flying;
  for (var y = 0; y < rows; y++) {
    var xoff = 0;
    for (var x = 0; x < cols; x++) {
      terrain[x][y] = map(noise(xoff + mouseX * 0.01, yoff + mouseY * 0.01), 0, 1, -100, 100); // Adding mouse interaction
      xoff += 0.2;
    }
    yoff += 0.2;
  }

  background(20);
  translate(0, 0); // Centering the terrain
  rotateX(PI / 4); // Adjusting the view angle

  for (var y = 0; y < rows - 1; y++) {
    beginShape(TRIANGLE_STRIP);
    for (var x = 0; x < cols; x++) {
      vertex(x * scl - w / 2, y * scl - h / 2, terrain[x][y]);
      vertex(x * scl - w / 2, (y + 1) * scl - h / 2, terrain[x][y + 1]);
    }
    endShape();
  }
}
