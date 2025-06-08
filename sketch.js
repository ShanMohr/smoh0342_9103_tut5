let shapes = [];
let theme = 'warm';
let bird;

function setup() {
  createCanvas(800, 800);
  noStroke();
  defineShapes(theme);
  updateBird();
}

function draw() {
  drawBackground();
  bird.draw();
}

// === BACKGROUND ===

function drawBackground() {
  background(220, 50, 50);

  for (let shape of shapes) {
    fill(shape.c);
    beginShape();
    for (let v of shape.vertices) {
      vertex(v[0], v[1]);
    }
    endShape(CLOSE);
  }
}

function mousePressed() {
  for (let shape of shapes) {
    shape.c = color(random(255), random(255), random(255));
  }
}

function keyPressed() {
  theme = theme === 'warm' ? 'cool' : 'warm';
  defineShapes(theme);
}

function defineShapes(mode) {
  const warmPalette = [
    color(255, 99, 71),
    color(255, 165, 0),
    color(255, 215, 0),
    color(240, 128, 128),
    color(255, 160, 122),
  ];

  const coolPalette = [
    color(70, 130, 180),
    color(0, 191, 255),
    color(102, 205, 170),
    color(123, 104, 238),
    color(72, 209, 204),
  ];

  let palette = mode === 'warm' ? warmPalette : coolPalette;

  shapes = [
    { vertices: [[0, 0], [400, 0], [200, 200]], c: random(palette) },
    { vertices: [[400, 0], [800, 0], [600, 200]], c: random(palette) },
    { vertices: [[200, 200], [400, 0], [600, 200]], c: random(palette) },
    { vertices: [[0, 400], [200, 200], [0, 0]], c: random(palette) },
    { vertices: [[0, 400], [200, 200], [300, 400]], c: random(palette) },
    { vertices: [[600, 200], [800, 0], [800, 400]], c: random(palette) },
    { vertices: [[300, 400], [200, 200], [600, 200], [500, 400]], c: random(palette) },
    { vertices: [[500, 400], [600, 200], [700, 400]], c: random(palette) },
    { vertices: [[200, 600], [300, 400], [0, 400]], c: random(palette) },
    { vertices: [[200, 600], [300, 400], [400, 600]], c: random(palette) },
    { vertices: [[400, 600], [500, 400], [600, 600]], c: random(palette) },
    { vertices: [[600, 600], [700, 400], [800, 400]], c: random(palette) },
    { vertices: [[500, 600], [600, 600], [550, 700]], c: random(palette) },
    { vertices: [[200, 600], [400, 800], [0, 800]], c: random(palette) },
    { vertices: [[200, 600], [400, 800], [600, 600]], c: random(palette) },
    { vertices: [[600, 600], [800, 800], [400, 800]], c: random(palette) },
    { vertices: [[800, 800], [800, 400], [600, 600]], c: random(palette) },
  ];
}

function windowResized() {
  resizeCanvas(800, 800);
  updateBird();
}

function updateBird() {
  let scaleFactor = 800 / 900;
  let offsetX = width / 2 - (450 * scaleFactor);
  let offsetY = height / 2 - (425 * scaleFactor);
  bird = new Bird(scaleFactor, offsetX, offsetY);
}

// === BIRD CLASS ===

class Bird {
  constructor(scaleFactor = 1, offsetX = 0, offsetY = 0) {
    this.scaleFactor = scaleFactor;
    this.offsetX = offsetX;
    this.offsetY = offsetY;
    this.colors = {
      gold: '#d4af37',
      black: '#000000',
      green: '#008000',
      orange: '#ff6e00',
      cream: '#f0e68c',
      blue: '#0096c7',
      red: '#ff2c2c'
    };
  }

  applyTransform() {
    push();
    translate(this.offsetX, this.offsetY);
    scale(this.scaleFactor);
    noStroke();
  }

  drawHead() {
    fill(this.colors.gold);
    beginShape();
    vertex(570, 100);
    vertex(610, 98);
    vertex(750, 150);
    vertex(660, 210);
    vertex(650, 250);
    vertex(520, 300);
    endShape(CLOSE);
    fill(this.colors.black);
    ellipse(605, 140, 35, 35);
  }

  drawNape() {
    fill(this.colors.green);
    beginShape();
    vertex(450, 200);
    vertex(520, 300);
    vertex(570, 100);
    endShape(CLOSE);
  }

  drawNeck() {
    fill(this.colors.orange);
    beginShape();
    vertex(650, 250);
    vertex(520, 300);
    vertex(680, 400);
    endShape(CLOSE);
  }

  drawBody() {
    fill(this.colors.cream);
    beginShape();
    vertex(450, 200);
    vertex(520, 300);
    vertex(340, 330);
    endShape(CLOSE);

    fill(this.colors.red);
    beginShape();
    vertex(340, 330);
    vertex(220, 455);
    vertex(432, 530);
    endShape(CLOSE);

    fill(this.colors.cream);
    beginShape();
    vertex(220, 455);
    vertex(340, 330);
    vertex(100, 300);
    endShape(CLOSE);

    fill(this.colors.blue);
    beginShape();
    vertex(680, 400);
    vertex(650, 500);
    vertex(520, 300);
    endShape(CLOSE);

    fill(this.colors.gold);
    beginShape();
    vertex(340, 330);
    vertex(520, 300);
    vertex(650, 500);
    vertex(445, 560);
    endShape(CLOSE);
  }

  drawWing() {
    fill(this.colors.gold);
    beginShape();
    vertex(340, 330);
    vertex(230, 200);
    vertex(433, 220);
    endShape(CLOSE);

    fill(this.colors.cream);
    beginShape();
    vertex(230, 200);
    vertex(100, 50);
    vertex(340, 80);
    endShape(CLOSE);

    fill(this.colors.blue);
    beginShape();
    vertex(340, 80);
    vertex(450, 200);
    vertex(433, 220);
    vertex(230, 200);
    endShape(CLOSE);
  }

  drawTail() {
    fill(this.colors.orange);
    beginShape();
    vertex(220, 455);
    vertex(100, 630);
    vertex(80, 550);
    vertex(0, 520);
    vertex(181, 405);
    endShape(CLOSE);
  }

  drawFeather() {
    fill(this.colors.red);
    beginShape();
    vertex(445, 560);
    vertex(500, 800);
    vertex(150, 800);
    vertex(170, 760);
    vertex(350, 700);
    endShape(CLOSE);

    fill(this.colors.gold);
    beginShape();
    vertex(170, 760);
    vertex(350, 700);
    vertex(350, 501);
    vertex(300, 483);
    endShape(CLOSE);

    fill(this.colors.green);
    beginShape();
    vertex(350, 700);
    vertex(350, 501);
    vertex(432, 530);
    vertex(445, 560);
    endShape(CLOSE);
  }

  drawOliveBranch() {
    let centerX = 750;
    let centerY = 160;

    stroke(34, 139, 34);
    strokeWeight(10);
    noFill();
    bezier(centerX, centerY + 60, centerX + 10, centerY - 30, centerX - 10, centerY - 120, centerX, centerY - 150);

    fill(34, 139, 34);
    noStroke();

    push();
    translate(centerX, centerY - 145);
    rotate(radians(-59));
    this.drawLeaf(60);
    pop();

    push();
    translate(centerX + 5, centerY - 10);
    rotate(radians(-20));
    this.drawLeaf(50);
    pop();

    push();
    translate(centerX - 50, centerY - 100);
    rotate(radians(30));
    this.drawLeaf(50);
    pop();
  }

  drawLeaf(length) {
    beginShape();
    vertex(0, 0);
    bezierVertex(length * 0.25, -length * 0.5, length * 0.75, -length * 0.5, length, 0);
    bezierVertex(length * 0.75, length * 0.5, length * 0.25, 0.5 * length, 0, 0);
    endShape(CLOSE);
  }

  draw() {
    this.applyTransform();
    this.drawHead();
    this.drawOliveBranch();
    this.drawNape();
    this.drawNeck();
    this.drawBody();
    this.drawWing();
    this.drawTail();
    this.drawFeather();
    pop();
  }
}
