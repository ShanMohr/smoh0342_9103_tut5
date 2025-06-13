//GLOBAL VARIENTS 
// Scale & Transform State
let isShrunk = false;
let currentScale = 1;
let targetScale = 1;

// Random Seeds
let treeSeed = 12345; // or Date.now() for dynamic trees
let seed;

// Tree & Branch State
let showTree = false;
let isFlyingSequenceActive = false;
let sequenceStartTime = 0;
let birdY = 0;
let birdX = 0;
let branchY = 0;
let isBranchDropped = false;
let branchHasLanded = false;
let branchLandTime = 0;
let branchLandedAndDone = false;
let birdHasFlownAway = false;

// Tree Leaf Animation
let showLeaves = false;
let leafTimerStarted = false;
let leafStartTime = 0;
let leavesShown = 0;
let maxLeavesToShow = 5000;
let leafCounter = 0;

// Sky & Background State
let skyColorProgress = 0;
let dotsFadeStartTime = 0;
let dotsFadeProgress = 0;
let dotsAreFading = false;
let showFinalSky = false;
let finalSkyStartTime = 0;
let finalSkyProgress = 0;

// Clouds & Background Objects
let showClouds = false;
let cloudStartTime = 0;
let clouds = [];

// Ground & Grass Features
let grassBlades = [];
let groundFeatures = [];
let grassGrowStartTime = 0;
let featuresStartTime = 0;
let grassInitialized = false;
let featuresInitialized = false;

// Tree Animation
let treeSwayStartTime = 0;
let treeSwaying = false;
let groundCycleStartTime = 0;
let groundTimeActive = false;

// Bunny Animation
let bunnyX = -100;
let bunnyY = 0;
let bunnyHopStartTime = 0;
let bunnyActive = false;
let bunnyPause = false;
let bunnyFinished = false;
let bunnyHopTimer = 0;
let isBunnyInAir = false;
let bunnyYVelocity = 0;

// Seasonal Transition
let fallStartTime = 0;
let isFallSequenceActive = false;
let fallingLeaves = [];
let winterProgress = 0;
let summerProgress = 0;
let summerStartTime = 0;
let isSummer = false;

// Dove Reset & Loop
let doveReturning = false;
let dovePickingUp = false;
let doveExiting = false;
let doveResetX = 0;
let doveResetY = 0;

// Floating Leaves
let floatingLeaves = [];
let leafFloatStarted = false;
let leafFloatStartTime = 0;
let leavesWhirlStartTime = 0;
let leavesWhirlStarted = false;
let leavesWhirlComplete = false;
let floatingLeavesShouldFade = false;
let floatingLeavesFadeStart = 0;
let floatingLeavesFadeDuration = 3000;

// Olive Branch & Fireworks
let oliveBranchFormed = false;
let oliveFadeStartTime = 0;
let oliveFadeProgress = 0;
let triggerOliveFade = false;
let oliveShowDelay = 2000;
let fireworks = [];
let fireworkStartTime = 0;
let showFireworks = false;

// Loop Reset
let loopResetTriggered = false;
let loopResetDelay = 2000;


class Bird {
  constructor(scaleFactor = 1, offsetX = 0, offsetY = 0) {
    this.scaleFactor = scaleFactor; // Scale relative to canvas size
    this.offsetX = offsetX; // Offset to center the bird
    this.offsetY = offsetY; // Offset to center the bird
    this.colors = {
      pale: [233, 230, 226], // #E9E6E2
      black: [0, 0, 0], // #000000
      ghost: [220, 220, 220], // #DCDCDC
      white: [240, 234, 226], // #F0EAE2
      cream: [249, 249, 249], // #F9F9F9
      greylight: [234, 234, 234], // #EAEAEA
      grey: [221, 221, 221], // #DDDDDD
    };
  }

  // Applying translation (to shift the coordinate system's origin), scaling (for proportionality in size during window resizing), and set noStroke once
  applyTransform(scalePulse = 1) {
    push();
    translate(this.offsetX, this.offsetY);
    scale(this.scaleFactor * scalePulse); // breathing scale
    noStroke();
  }
  

  drawGlow(scalePulse = 1) {
    push();
    translate(this.offsetX, this.offsetY);
    scale(this.scaleFactor * scalePulse);
  
  
    drawingContext.shadowBlur = 25;
    drawingContext.shadowColor = 'rgba(255, 255, 255, 0.2)';
  
    noStroke();
    fill(255, 255, 255, 80); // Brighter glow
  
    this.drawHead();
    this.drawNape();
    this.drawNeck();
    this.drawBody();
    this.drawWing();
    this.drawTail();
    this.drawFeather();
  
    pop();
  }
  
  // Creating a function for the head and beak shape
  drawHead() {
    fill(this.colors.pale);
    beginShape();
    vertex(570, 100);
    vertex(610, 98);
    vertex(750, 150);
    vertex(660, 210);
    vertex(650, 250);
    vertex(520, 300);
    endShape(CLOSE);

    // Eye
    fill(this.colors.black);
    ellipse(605, 140, 35, 35);
  }

  // Creating a function for the nape shape
  drawNape() {
    fill(this.colors.ghost);
    beginShape();
    vertex(450, 200);
    vertex(520, 300);
    vertex(570, 100);
    endShape(CLOSE);
  }

  // Creating a function for the neck shape
  drawNeck() {
    fill(this.colors.ghost);
    beginShape();
    vertex(650, 250);
    vertex(520, 300);
    vertex(680, 400);
    endShape(CLOSE);
  }

  // Creating a function for the body shapes
  drawBody() {
    // Back
    fill(this.colors.greylight);
    beginShape();
    vertex(450, 200);
    vertex(520, 300);
    vertex(340, 330);
    endShape(CLOSE);

    // Side
    fill(this.colors.grey);
    beginShape();
    vertex(340, 330);
    vertex(220, 455);
    vertex(432, 530);
    endShape(CLOSE);

    // Chest
    fill(this.colors.cream);
    beginShape();
    vertex(220, 455);
    vertex(340, 330);
    vertex(100, 300);
    endShape(CLOSE);

    // Throat
    fill(this.colors.greylight);
    beginShape();
    vertex(680, 400);
    vertex(650, 500);
    vertex(520, 300);
    endShape(CLOSE);

    // Belly
    fill(this.colors.white);
    beginShape();
    vertex(340, 330);
    vertex(520, 300);
    vertex(650, 500);
    vertex(445, 560);
    endShape(CLOSE);
  }

  // Creating a function for the wing shapes
  drawWing() {
    push();
    translate(340, 330); // Base of wing
  
    // 🕊️ Animate flap with rotation
    rotate(0); // no flap


  
    // Wing shape group
    fill(this.colors.pale);
    beginShape();
    vertex(0, 0);
    vertex(-110, -130);
    vertex(93, -110);
    endShape(CLOSE);
  
    fill(this.colors.cream);
    beginShape();
    vertex(-110, -130);
    vertex(-240, -280);
    vertex(0, -250);
    endShape(CLOSE);
  
    fill(this.colors.grey);
    beginShape();
    vertex(0, -250);
    vertex(110, -130);
    vertex(93, -110);
    vertex(-110, -130);
    endShape(CLOSE);
  
    pop();
  }
  

  // Creating a function for the tail shape
  drawTail() {
    fill(this.colors.white);
    beginShape();
    vertex(220, 455);
    vertex(100, 630);
    vertex(80, 550);
    vertex(0, 520);
    vertex(181, 405);
    endShape(CLOSE);
  }

  // Creating a function for the feather shapes
  drawFeather() {
    fill(this.colors.ghost);
    beginShape();
    vertex(445, 560);
    vertex(500, 800);
    vertex(150, 800);
    vertex(170, 760);
    vertex(350, 700);
    endShape(CLOSE);

    fill(this.colors.white);
    beginShape();
    vertex(170, 760);
    vertex(350, 700);
    vertex(350, 501);
    vertex(300, 483);
    endShape(CLOSE);

    fill(this.colors.greylight);
    beginShape();
    vertex(350, 700);
    vertex(350, 501);
    vertex(432, 530);
    vertex(445, 560);
    endShape(CLOSE);
  }

  // Main draw method to render the entire bird
  draw(scalePulse = 1) {
    this.applyTransform(scalePulse);
    this.drawNape();
    this.drawNeck();
    this.drawBody();
    this.drawHead();
    this.drawTail();
    this.drawFeather();
    pop();
  }
  
} 



class Background {
  constructor(numDots = 300) {
    this.numDots = numDots;
    this.dots = [];
    this.initializeDots();
  }

  //Initialise dots with random positions and velocities
  initializeDots() {
    this.dots = [];
    for (let i = 0; i < this.numDots; i++) {
      this.dots.push({
        x: random(width),
        y: random(height),
        size: random(2, 6),
        speed: p5.Vector.random2D().mult(random(0.3, 1))
      });
    }
  }

  // Update and draw dots
  draw() {
    // ✨ Calculate fading progress
    let alpha = 60;
    if (dotsAreFading) {
      dotsFadeProgress = constrain((millis() - dotsFadeStartTime) / 5000, 0, 1);
      alpha = lerp(60, 0, dotsFadeProgress);
    }
  
    for (let d of this.dots) {
      let chaosSpeedMultiplier = isShrunk ? 3 : 1;
      d.x += d.speed.x * chaosSpeedMultiplier;
      d.y += d.speed.y * chaosSpeedMultiplier;

      if (groundTimeActive) {
        d.y -= 0.2; // bubbles float up slightly
      }
      
  
      // Reset dot if out of bounds
      if (d.x < -50 || d.x > width + 50 || d.y < -50 || d.y > height + 50) {
        d.x = random(width);
        d.y = random(height);
        d.speed = p5.Vector.random2D().mult(random(0.3, 1));
      }
  
      // 🌈 Bubble logic when groundTimeActive (cycling sky)
      if (groundTimeActive) {
        let t = (millis() - groundCycleStartTime) / 10000;
        let cycle = (t % 1);
  
        // Change color based on sky cycle
        let bubbleColor;
        if (cycle < 1 / 3) {
          bubbleColor = color(255, 200, 255, 100); // Morning pink
        } else if (cycle < 2 / 3) {
          bubbleColor = color(200, 255, 255, 90); // Daylight aqua
        } else {
          bubbleColor = color(180, 180, 255, 70); // Night blue
        }
  
        fill(bubbleColor);
        stroke(255, 255, 255, 30);
        strokeWeight(1);
        ellipse(d.x, d.y, d.size * 2 + sin(frameCount * 0.05 + d.x) * 1.5); // bubble shimmer
      } else {
        // Regular dot (stars)
        noStroke();
        fill(255, 255, 255, alpha);
        circle(d.x, d.y, d.size);
      }
    }
  
    // Trigger background sky change once dots fully fade
    if (dotsAreFading && dotsFadeProgress >= 1 && !showFinalSky) {
      showFinalSky = true;
      finalSkyStartTime = millis();
    }
  }
  
  
  
  // Reinitialize dots on canvas resize
  resize() {
    this.initializeDots();
  }
}

class Cloud {
  constructor(x, y, size = 100) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.speed = random(0.2, 0.5);
  }

  update() {
    this.x += this.speed;
    if (this.x > width + this.size) {
      this.x = -this.size;
    }
  }

  draw() {
    noStroke();
    fill(255, 240);
    ellipse(this.x, this.y, this.size, this.size * 0.6);
    ellipse(this.x + this.size * 0.4, this.y - 10, this.size * 0.7, this.size * 0.5);
    ellipse(this.x - this.size * 0.4, this.y - 5, this.size * 0.6, this.size * 0.4);
  }
}


// Global instances
let bird;
let bg; 

// Store scaling/offset for reuse
let scaleFactor, offsetX, offsetY;

function setup() {
  createCanvas(windowWidth, windowHeight);
  rectMode(CENTER);
  angleMode(DEGREES);

  bg = new Background(300);

  updateTransforms(); // This initializes the bird

  seed = Date.now(); // for random tree structure

  bunnyY = height - 140; // Adjust to match grass/ground height


  // Ensure initial values are clean
  dotsAreFading = false;
  dotsFadeProgress = 0;
  showFinalSky = false;
  finalSkyProgress = 0;
  showClouds = false;

  bunnyX = -100;
bunnyY = height - 140;
bunnyHopStartTime = millis();
bunnyActive = true;
bunnyPause = false;
bunnyFinished = false;

}




function draw() {
  // Background sky logic
  let bgColor;

  if (groundTimeActive) {
    let t = (millis() - groundCycleStartTime) / 10000;
    let cycle = t % 1;
    let skyMorning = color(255, 200, 140);
    let skyNoon = color(135, 206, 235);
    let skyEvening = color(30, 20, 60);

    if (cycle < 1 / 3) {
      bgColor = lerpColor(skyMorning, skyNoon, cycle * 3);
    } else if (cycle < 2 / 3) {
      bgColor = lerpColor(skyNoon, skyEvening, (cycle - 1 / 3) * 3);
    } else {
      bgColor = lerpColor(skyEvening, skyMorning, (cycle - 2 / 3) * 3);
    }
  } else if (showFinalSky) {
    finalSkyProgress = constrain((millis() - finalSkyStartTime) / 3000, 0, 1);
    bgColor = lerpColor(color(0, 0, 0), color(255, 200, 140), finalSkyProgress);
  } else {
    bgColor = color(0, 0, 0);
  }

  background(bgColor);

  // Background stars or bubbles
  bg.draw();

  // Tree + ground
  if (showTree || birdHasFlownAway || isFlyingSequenceActive || isFallSequenceActive) {
    drawTreeAndGround();
  }

  // Bird setup
  let elapsedTime = millis() / 1000;
  let scalePulse = 1; // disable breathing
  currentScale = lerp(currentScale, targetScale, 0.05);
  let finalScale = scalePulse * currentScale;

  let baseX = width / 2;
  let baseY = height / 2;
  let posX = baseX;
  let posY = baseY;
  let birdOffsetX = -450;
  let birdOffsetY = -425;
  const treeGroundY = height - 230;
  const bottomY = height - 40;

  // Flying animation
  if (isFlyingSequenceActive) {
    let elapsed = millis() - sequenceStartTime;
    const descendDuration = 2000;
    const dropDuration = 1000;
    const liftOffDelay = 3000;

    if (elapsed < descendDuration) {
      birdY = map(elapsed, 0, descendDuration, 0, treeGroundY - baseY);
      posY = baseY + birdY;
    } else if (elapsed < descendDuration + dropDuration) {
      if (!isBranchDropped && isShrunk) {
        isBranchDropped = true;
        branchY = baseY + birdY;
        landedX = birdX;
        landedY = birdY;
        hasLanded = true;
      }
      posY = baseY + (treeGroundY - baseY);
    } else {
      birdX = landedX + (elapsed - liftOffDelay) * 0.15;
      birdY = landedY - (elapsed - liftOffDelay) * 0.05;
      posX = baseX + birdX;
      posY = baseY + (treeGroundY - baseY) + birdY;

      if (posY + birdOffsetY < -100) {
        isFlyingSequenceActive = false;
        birdHasFlownAway = true;
      }
    }

    push();
    translate(posX, posY);
    scale(scaleFactor * finalScale);
    translate(birdOffsetX, birdOffsetY);
    bird.drawGlow(scalePulse);
    bird.draw(scalePulse);
    bird.drawWing();
    pop();

    if (!isBranchDropped) {
      push();
      translate(posX, posY);
      scale(scaleFactor * finalScale);
      translate(birdOffsetX, birdOffsetY);
      drawOliveBranch();
      pop();
    }

    if (isBranchDropped && branchY !== null) {
      branchY += 3;
      if (branchY >= bottomY) {
        branchY = bottomY;
        if (!branchHasLanded) {
          branchHasLanded = true;
          branchLandTime = millis();
          bunnyActive = true;
        }
      }

      push();
      translate(baseX, branchY);
      scale(scaleFactor * finalScale);
      translate(birdOffsetX, birdOffsetY);
      drawOliveBranch();
      pop();
    }
  } else if (!birdHasFlownAway) {
    push();
    translate(posX, posY);
    scale(scaleFactor * finalScale);
    translate(birdOffsetX, birdOffsetY);
    bird.drawGlow(scalePulse);
    bird.draw(scalePulse);
    bird.drawWing();
    drawOliveBranch();
    pop();
  }

  // Clouds
  if (groundTimeActive && !showClouds) {
    showClouds = true;
    cloudStartTime = millis();
    for (let i = 0; i < 12; i++) {
      clouds.push(new Cloud(
        random(width),
        random(height / 10, height / 3),
        random(80, 160)
      ));
    }
    dotsAreFading = true;
    dotsFadeStartTime = millis();
  }

  if (showClouds) {
    for (let c of clouds) {
      c.update();
      c.draw();
    }
  }

  // Bunny hop
  if (bunnyActive && !bunnyFinished && branchHasLanded) {
    if (!isBunnyInAir && millis() - bunnyHopTimer > 400) {
      bunnyYVelocity = -10;
      isBunnyInAir = true;
      bunnyHopTimer = millis();
    }

    if (isBunnyInAir) {
      bunnyYVelocity += 0.5;
      bunnyY += bunnyYVelocity;

      if (bunnyY >= height - 140) {
        bunnyY = height - 140;
        bunnyYVelocity = 0;
        isBunnyInAir = false;
      }
    }

    bunnyX += 2.2;

    if (bunnyX > width + 100) {
      bunnyFinished = true;

      if (!isFallSequenceActive) {
        isFallSequenceActive = true;
        fallStartTime = millis();
        fallingLeaves = [];
        leavesShown = maxLeavesToShow;
        showLeaves = true;
        branchHasLanded = true;
      }
    }

    drawBunny(bunnyX, bunnyY);
  }

  // Dove loop return
  if (!doveReturning && summerProgress >= 1 && !dovePickingUp) {
    doveReturning = true;
    doveResetX = birdX;
    doveResetY = birdY;
  }

  if (doveReturning) {
    birdX = lerp(birdX, width / 2, 0.02);
    birdY = lerp(birdY, height / 2 - 200, 0.02);

    if (dist(birdX, birdY, width / 2, height / 2 - 200) < 5) {
      doveReturning = false;
      dovePickingUp = true;
    }
  }

  if (dovePickingUp) {
    isBranchDropped = false;
    birdX = lerp(birdX, doveResetX, 0.02);
    birdY = lerp(birdY, doveResetY, 0.02);

    if (dist(birdX, birdY, doveResetX, doveResetY) < 5) {
      dovePickingUp = false;
      doveExiting = true;
    }
  }

  if (doveExiting) {
    birdX -= 2;
    if (birdX < -100) {
      doveExiting = false;
      resetAllStates();
    }
  }

  drawFallingLeaves();

  if (!leavesWhirlStarted && floatingLeaves.every(l => l.settled)) {
    if (millis() - leafFloatStartTime > 3000) {
      leavesWhirlStarted = true;
      leavesWhirlStartTime = millis();
    }
  }

  // Draw massive fireworks
  if (showFireworks) {
    for (let fw of fireworks) {
      fw.update();
      fw.draw();
    }

    // ⌛ Trigger fade to black
    if (millis() - fireworkStartTime > 3000 && !canvasFadeToBlack) {
      canvasFadeToBlack = true;
    }
  }

  
  }




function drawBunny(x, y) {
  push();
  translate(x, y);
  scale(-0.6, 0.6); // flip horizontally
  noStroke();

  // Body
  fill(180);
  ellipse(0, 0, 40, 30);

  // Head
  ellipse(-20, -20, 25, 25);

  // Ears
  ellipse(-25, -40, 8, 25);
  ellipse(-15, -40, 8, 25);

  // Eye
  fill(0);
  ellipse(-23, -22, 4, 4);

  // Legs
  fill(150);
  ellipse(10, 15, 10, 20);
  ellipse(-5, 15, 10, 20);

  pop();
}





// To ensure that the canvas is resized and the bird updated when the window size changes
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  updateTransforms();
  bg.resize();
}

// Update the bird's scale and position based on canvas size
function updateTransforms() {
  scaleFactor = min(windowWidth, windowHeight) / 900;
  bird = new Bird(scaleFactor, 0, 0); // offset handled inside draw()
}

function initGrass() {
  grassBlades = [];

  let spacingX = 5;
  let spacingY = 12;
  let groundHeight = 300; // matches the rect height used for ground

  for (let x = 0; x < width; x += spacingX) {
    for (let y = 0; y < groundHeight; y += spacingY) {
      grassBlades.push({
        x: x,
        y: y,
        baseHeight: random(10, 30),
        noiseOffset: random(1000)
      });
    }
  }

  grassGrowStartTime = millis();
  grassInitialized = true;
}


function initGroundFeatures() {
  groundFeatures = [];
  for (let i = 0; i < 30; i++) {
    let x = random(width);
    let y = height - 100 + noise(i * 0.1) * 10;
    groundFeatures.push({
      x,
      y,
      type: random() > 0.5 ? 'rock' : 'flower',
      timeToShow: millis() + i * 150
    });
  }
  featuresStartTime = millis();
  featuresInitialized = true;
}


function drawOliveBranch(offsetX = 0, offsetY = 0) {
  push();
  translate(710 + offsetX, 160 + offsetY); // Beak anchor point
  rotate(radians(-20)); // Tilt branch slightly for realism

  // Stem
  stroke(34, 139, 34); // Olive green
  strokeWeight(8);
  noFill();
  bezier(0, 80, 30, -25, -50, -120, 0, -155);

  // Leaves
  noStroke();
  fill(34, 139, 34);

  push(); translate(-3, -150); rotate(radians(-35)); drawLeaf(80); pop();
  push(); translate(5, -20); rotate(radians(-20)); drawLeaf(80); pop();
  push(); translate(-95, -105); rotate(radians(30)); drawLeaf(80); pop();

  pop();
}
 

function drawLeaf(length) {
  beginShape();
  vertex(0, 0);
  bezierVertex(length * 0.25, -length * 0.5, length * 0.50, -length * 0.5, length, 0);
  bezierVertex(length * 0.75, length * 0.5, length * 0., length * 0.5, 0, 0);
  endShape(CLOSE);
}

function drawTree() {
  push();
  translate(width / 2, height - 100);
  branch(120);
  pop();
}

function drawTreeAndGround() {
  push();
  translate(width / 2, height - 100);

  randomSeed(treeSeed);
  noiseSeed(treeSeed + 50);
  leafCounter = 0;

  let fromColor = color(60, 40, 20);
  let toColor = color(34, 139, 34);
  let groundColor;

  if (branchHasLanded) {
    let elapsed = millis() - branchLandTime;
    groundFadeProgress = constrain(elapsed / 2000, 0, 1);

    if (!groundTimeActive && leavesShown >= maxLeavesToShow) {
      groundTimeActive = true;
      groundCycleStartTime = millis();
    }

    if (groundTimeActive) {
      let t = (millis() - groundCycleStartTime) / 10000;
      let cycle = t % 1;
      let morning = color(180, 120, 60);
      let noon = color(34, 139, 34);
      let evening = color(40, 90, 80);

      if (cycle < 1 / 3) {
        groundColor = lerpColor(morning, noon, cycle * 3);
      } else if (cycle < 2 / 3) {
        groundColor = lerpColor(noon, evening, (cycle - 1 / 3) * 3);
      } else {
        groundColor = lerpColor(evening, morning, (cycle - 2 / 3) * 3);
      }
    } else {
      groundColor = lerpColor(fromColor, toColor, groundFadeProgress);
    }

    if (groundFadeProgress === 1) {
      if (!leafTimerStarted) {
        leafTimerStarted = true;
        leafStartTime = millis();
      }
      if (!grassInitialized) initGrass();
      if (!featuresInitialized) initGroundFeatures();
      if (!treeSwaying && leavesShown >= maxLeavesToShow) {
        treeSwaying = true;
        treeSwayStartTime = millis();
      }
    }

    if (leafTimerStarted) {
      let timeSinceStart = millis() - leafStartTime;
      leavesShown = constrain(floor(timeSinceStart / 1), 0, maxLeavesToShow);
      showLeaves = true;
    }

    if (!dotsAreFading) {
      dotsAreFading = true;
      dotsFadeStartTime = millis();
    }
  } else {
    groundColor = fromColor;
  }

  // Draw ground
  noStroke();
  fill(groundColor);
  rect(-width / 2, 0, width * 2, 300);

  drawGrass();
  drawGroundFeatures();

  // Handle tree + fade to olive branch
  if (!oliveBranchFormed && triggerOliveFade) {
    oliveFadeProgress = constrain((millis() - oliveFadeStartTime) / 2000, 0, 1);

    if (oliveFadeProgress >= 1 && millis() - oliveFadeStartTime >= 2000 + oliveShowDelay) {
      oliveBranchFormed = true;

      // Trigger floating leaf fade
      if (!floatingLeavesShouldFade) {
        floatingLeavesShouldFade = true;
        floatingLeavesFadeStart = millis();
      }

      // Trigger fireworks
      if (!showFireworks) {
        showFireworks = true;
        fireworkStartTime = millis();
        for (let i = 0; i < 5; i++) {
          fireworks.push(new Firework(random(width), random(height)));
        }
      }
    }
  }

  // Tree visuals (fading or swaying)
  if (!oliveBranchFormed && triggerOliveFade) {
    let alpha = 255 * (1 - oliveFadeProgress);
    push();
    tint(255, alpha);
    let swayAngle = treeSwaying ? sin((millis() - treeSwayStartTime) * 0.002) * 3 : 0;
    branch(120, leavesShown, swayAngle);
    noTint();
    pop();
  } else if (!oliveBranchFormed && !triggerOliveFade) {
    let swayAngle = treeSwaying ? sin((millis() - treeSwayStartTime) * 0.002) * 3 : 0;
    branch(120, leavesShown, swayAngle);
  }

  if (oliveBranchFormed) {
    drawFinalOliveBranch();
  }

  if (isFallSequenceActive) updateFallingLeaves();

  pop();

  if (leafFloatStarted && floatingLeaves.length > 0) {
    drawFloatingLeaves();
  }
}


function branch(len, limit, angle = 0) {
  push();

  // Sway trunk only (main branch of full length)
  if (treeSwaying && len === 120) {
    let sway = sin((millis() - treeSwayStartTime) * 0.002) * 6; // doubled sway
    rotate(radians(sway));
  }

  if (len > 10) {
    let newLen = len * 0.8;
    strokeWeight(map(len, 10, 120, 1, 20));
    let baseColor = color(70, 40, 20);      // original bark
    let winterColor = color(180, 180, 200); // pale winter bark
    let brown = color(70, 40, 20);         // original trunk color
    let winterBark = color(180, 180, 200); // pale grey-blue for winter
    let trunkColor = lerpColor(brown, winterBark, winterProgress);
    
    // If summer has started, return to brown
    if (summerProgress > 0) {
      trunkColor = lerpColor(winterBark, brown, summerProgress);
    }
    
    stroke(trunkColor);
        line(0, 0, 0, -len);
    translate(0, -len);

    rotate(-25 + angle);
    branch(newLen, limit, angle);

    rotate(50);
    branch(newLen, limit, angle);
  } else {
    if (showLeaves && leafCounter < limit) {
      let baseColor = color(200, 120, 200, 150); // pre-fall purple
      let orangeColor = color(255, 140, 0, 180); // fall
      let greenColor = color(60, 180, 75, 220);  // summer
    
      let leafCol = baseColor;
    
      if (isFallSequenceActive && !isSummer) {
        leafCol = orangeColor;
      }
    
      if (summerProgress > 0) {
        // Fade from whatever was before to green
        leafCol = lerpColor(leafCol, greenColor, summerProgress);
      }
    
      fill(leafCol);
      noStroke();
      ellipse(0, 0, 10, 15);
      leafCounter++;
    }
  }

  pop();
}



function leaf(r, g, b, a) {
  fill(r + random(-20, 20), g + random(-20, 20), b + random(-20, 20), a);
  noStroke();

  beginShape();
  for (let i = 45; i < 135; i++) {
    let rad = 15;
    let x = rad * cos(i);
    let y = rad * sin(i);
    vertex(x, y);
  }
  for (let i = 135; i > 45; i--) {
    let rad = 15;
    let x = rad * cos(i);
    let y = rad * sin(-i) + 20;
    vertex(x, y);
  }
  endShape(CLOSE);
}

function updateFallingLeaves() {
  let winterElapsed = millis() - fallStartTime;
  winterProgress = constrain(winterElapsed / 6000, 0, 1);

  // Start summer after winter finishes
  if (!isSummer && winterProgress >= 1) {
    summerStartTime = millis();
    isSummer = true;
  }

  if (isSummer) {
    let summerElapsed = millis() - summerStartTime;
    summerProgress = constrain(summerElapsed / 4000, 0, 1); // summer grows over 4s
  }
}



function drawFallingLeaves() {
   // Falling leaves disabled
   if (summerProgress >= 1 && !leafFloatStarted) {
    leafFloatStarted = true;
    leafFloatStartTime = millis();
    initFloatingLeaves();  // ← generate floating leaves from tree
  }
  
}

function initFloatingLeaves() {
  floatingLeaves = [];

  for (let i = 0; i < 200; i++) {
    let angle = random(-PI / 3, PI / 3);
    let radius = random(40, 120);

    let centerX = width / 2;
    let centerY = height / 2 - 150;

    let startX = centerX + cos(angle) * radius;
    let startY = centerY + sin(angle) * radius;

    floatingLeaves.push({
      x: startX,
      y: startY,
      angle: random(TWO_PI),
      speedX: random(-0.5, 0.5),
      speedY: random(0.3, 1.2),
      rotation: random(-0.05, 0.05),
      alpha: 255,
      size: random(10, 18),
      settled: false // Add this
    });
  }
}



function drawFloatingLeaves() {
  let fadeProgress = 0;
  let alphaOverride = 255;

  if (floatingLeavesShouldFade) {
    fadeProgress = constrain((millis() - floatingLeavesFadeStart) / floatingLeavesFadeDuration, 0, 1);
    alphaOverride = 255 * (1 - fadeProgress);
  }

  for (let leaf of floatingLeaves) {
    // Skip fully faded leaves
    if (alphaOverride <= 0) continue;

    push();
    translate(leaf.x, leaf.y);
    rotate(leaf.angle);
    fill(60, 180, 75, alphaOverride); // green with fading alpha
    noStroke();
    ellipse(0, 0, leaf.size, leaf.size * 1.4);
    pop();

    if (!leaf.settled) {
      leaf.x += leaf.speedX;
      leaf.y += leaf.speedY;
      leaf.angle += leaf.rotation;

      if (leaf.y >= height - 120) {
        leaf.y = height - 120;
        leaf.settled = true;
      }
    }
  }
}


function drawGrass() {
  if (!grassInitialized) return;

  let t = millis() - grassGrowStartTime;
  let growth = constrain(t / 3000, 0, 1);

  stroke(34, 139, 34);
  strokeWeight(1);

  for (let g of grassBlades) {
    let h = g.baseHeight * growth;
    let sway = map(noise(g.noiseOffset + frameCount * 0.01), 0, 1, -2, 2);

    let x = g.x - width / 2;
    let y = 155 - g.y;

    line(x, y, x + sway, y - h);
  }
}




function drawGroundFeatures() {
  if (!featuresInitialized) return;

  for (let f of groundFeatures) {
    if (millis() > f.timeToShow) {
      if (f.type === 'rock') {
        fill(100);
        ellipse(f.x, f.y, 12, 9);
      } else {
        fill(255, 160, 180);
        ellipse(f.x, f.y, 8, 8);
      }
    }
  }
}

function drawFinalOliveBranch() {
  push();
  translate(0, -100); // move up slightly to where tree was
  rotate(radians(-10)); // gentle tilt

  // Stem
  stroke(34, 139, 34);
  strokeWeight(10);
  noFill();
  bezier(0, 80, 30, -25, -50, -120, 0, -155);

  // Leaves
  noStroke();
  fill(34, 139, 34);

  push(); translate(-3, -150); rotate(radians(-35)); drawLeaf(80); pop();
  push(); translate(5, -20); rotate(radians(-20)); drawLeaf(80); pop();
  push(); translate(-81, -105); rotate(radians(30)); drawLeaf(80); pop();

  pop();
}

class Firework {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.particles = [];

    for (let i = 0; i < 150; i++) {
      this.particles.push({
        angle: random(TWO_PI),
        speed: random(2, 8), // Faster and wider
        radius: 0,
        alpha: 255,
        size: random(6, 12) // Bigger sparkles
      });
    }
  }

  update() {
    for (let p of this.particles) {
      p.radius += p.speed;
      p.alpha -= 2.2;
    }
  }

  draw() {
    for (let p of this.particles) {
      let px = this.x + cos(p.angle) * p.radius;
      let py = this.y + sin(p.angle) * p.radius;
      fill(34, 255, 34, p.alpha); // Neon green
      noStroke();
      ellipse(px, py, p.size);
    }
  }

  isDone() {
    return this.particles.every(p => p.alpha <= 0);
  }
}





function resetAllStates() {
  // Reset bird
  birdX = 0;
  birdY = height / 2 - 300;
  isBranchDropped = false;
  branchHasLanded = false;

  // Reset seasons
  fallStartTime = millis();
  winterProgress = 0;
  isSummer = false;
  summerProgress = 0;

  // Reset tree
  staticTreeLeaves = [];
  leafCounter = 0;

  // Reset flags
  doveReturning = false;
  dovePickingUp = false;
  doveExiting = false;
}


function keyPressed() {
  if (key === ' ') {
    isShrunk = !isShrunk;
    targetScale = isShrunk ? 0.2 : 1;
  }

  if (key === '1') {
    showTree = true;
  }

  if (key === '2') {
    bunnyX = -100;
    bunnyY = height - 140;
    bunnyHopStartTime = millis();
    bunnyActive = true;
    bunnyPause = false;
    bunnyFinished = false;
  }

  if (key === '3') {
    showTree = true;
    isFallSequenceActive = true;
    fallStartTime = millis();
    fallingLeaves = [];
    leavesShown = maxLeavesToShow;  // ensures visible leaves
    showLeaves = true;
  }
  
  if (key === '4') {
    showTree = true;
    isFallSequenceActive = true;
    fallStartTime = millis();
    fallingLeaves = [];
    leavesShown = maxLeavesToShow;  // ensures visible leaves
    showLeaves = true;
    branchHasLanded = true;
    console.log("Leaf fall triggered!");
  }

  if (key === '5') {
    triggerOliveFade = true;
    oliveFadeStartTime = millis();
    console.log("Fade out triggered manually.");
  }
  
  
  
}



function mousePressed() {
  isFlyingSequenceActive = true;
  sequenceStartTime = millis();
  birdX = 0;
  birdY = 0;
  branchY = null;
  isBranchDropped = false;
  isShrunk = true;
  targetScale = 0.2;
  showTree = true;
  isFlapping = true;
  bunnyActive = false; // wait for branch to land
  bunnyFinished = false;
}



