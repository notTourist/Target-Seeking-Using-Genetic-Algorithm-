// import { Vector } from "c:/users/acer/.vscode/extensions/samplavigne.p5-vscode-1.2.13/p5types/index";

// import { SoundFile } from "c:/users/acer/.vscode/extensions/samplavigne.p5-vscode-1.2.13/p5types/index";

var mxPopulationSize = 40;
var mxForce = 1;
const lifeOfRobo = 300;
var currAge = 0;
var mutuationRate; //1%
var population;
var target;
var generationNo = 0;
var hitTarget = 0;
var hitAudio;
let obstaclesArray = [];
var x, y, w, h;



function setup() {
  createCanvas(windowWidth, windowHeight);
  population = new Population();
  target = createVector(width / 2, height / 4);
  hitAudio = new Audio('hitSound.mp3');

  obstaclesArray = [];
  x = 0, y = 0, w = 0, h = 0;
  rectMode(CORNER);
  mutuationRate = 0.01;
}

function draw() {
  background(0);
  currAge++;

  for (let obstacles of obstaclesArray) {
    fill('red');
    rect(obstacles.x, obstacles.y, obstacles.w, obstacles.h);
    rectMode(CORNER);
  }

  if (currAge === lifeOfRobo) {
    if (hitTarget > 0) {
      mutuationRate = 0;
    }
    else {
      mutuationRate = 0.1;
    }
    population.fillReproductiveChamber();
    population.generateNextGeneration();
    currAge = 0;
    // console.log(hitTarget);
    console.log(mutuationRate);

    hitTarget = 0;
    generationNo++;
  }
  else {
    population.showPopulation();
  }
  console.log(mutuationRate);
  fill('green');
  circle(width / 2, height / 4, 40);

  textSize(40);
  text("Generation: " + generationNo, width / 1.5, 50);
  textSize(40);
  text("Acquired Target: " + hitTarget + "/40", width / 1.5, 100);
}

function mousePressed() {
  x = mouseX;
  y = mouseY;
}

function mouseDragged() {
  w = mouseX - x;
  h = mouseY - y;
}

function mouseReleased() {
  if (w > 5 && h > 5) {
    obstaclesArray.push({ x: x, y: y, w: w, h: h });
  }
  x = 0, y = 0, w = 0, h = 0;
}


