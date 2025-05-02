let img;
let numSegments = 50;
let segments = [];
let drawSegments = false;

let imgDrwPrps = {
  aspect: 0,
  width: 0,
  height: 0,
  xOffset: 0,
  yOffset: 0
};

let canvasAspectRatio = 0;

function preload() {
  img = loadImage('/assets/Mona_Lisa_by_Leonardo_da_Vinci_500_x_700.jpg');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  imgDrwPrps.aspect = img.width / img.height;
  calculateImageDrawProps();

  let segmentWidth = img.width / numSegments;
  let segmentHeight = img.height / numSegments;

  segments = []; // Clear previous segments
  for (let y = 0; y < img.height; y += segmentHeight) {
    for (let x = 0; x < img.width; x += segmentWidth) {
      let c = img.get(x + segmentWidth / 2, y + segmentHeight / 2);
      segments.push(new ImageSegment(x, y, segmentWidth, segmentHeight, c));
    }
  }
}

function draw() {
  background(220);
  if (drawSegments) {
    for (const segment of segments) {
      segment.draw();
    }
  } else {
    image(
      img,
      imgDrwPrps.xOffset,
      imgDrwPrps.yOffset,
      imgDrwPrps.width,
      imgDrwPrps.height
    );
  }
}

function keyPressed() {
  if (key === ' ') {
    drawSegments = !drawSegments;
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  calculateImageDrawProps();
}

function calculateImageDrawProps() {
  let canvasAspect = width / height;

  if (imgDrwPrps.aspect > canvasAspect) {
    imgDrwPrps.width = width;
    imgDrwPrps.height = width / imgDrwPrps.aspect;
    imgDrwPrps.xOffset = 0;
    imgDrwPrps.yOffset = (height - imgDrwPrps.height) / 2;
  } else if (imgDrwPrps.aspect < canvasAspect) {
    imgDrwPrps.height = height;
    imgDrwPrps.width = height * imgDrwPrps.aspect;
    imgDrwPrps.yOffset = 0;
    imgDrwPrps.xOffset = (width - imgDrwPrps.width) / 2;
  } else {
    imgDrwPrps.width = width;
    imgDrwPrps.height = height;
    imgDrwPrps.xOffset = 0;
    imgDrwPrps.yOffset = 0;
  }
}

class ImageSegment {
  constructor(srcImgSegXPosInPrm,srcImgSegYPosInPrm,srcImgSegWidthInPrm,srcImgSegHeightInPrm,srcImgSegColourInPrm) {
    this.srcImgSegXPos = srcImgSegXPosInPrm;
    this.srcImgSegYPos = srcImgSegYPosInPrm;
    this.srcImgSegWidth = srcImgSegWidthInPrm;
    this.srcImgSegHeight = srcImgSegHeightInPrm;
    this.srcImgSegColour = srcImgSegColourInPrm;
  }

  draw() {
    stroke(0);
    fill(this.srcImgSegColour);
    rect(this.srcImgSegXPos, this.srcImgSegYPos, this.srcImgSegWidth, this.srcImgSegHeight);
  }
}
