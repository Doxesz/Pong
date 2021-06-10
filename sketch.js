// variables of ball
let xBall = 300;
let yBall = 200;
let diameter = 15;
let ray = diameter / 2;

//speed of ball
let speedXBall = 6;
let speedYBall = 6;
let wRect = 10;
let hRect = 100;

//rect variables
let xRect = 5;
let yRect = 150;

//variables of enemy
let xRectEnemy = 585;
let yRectEnemy = 150;
let speedYEnemy;

let collide = false;

let chanceToMiss = 0;

//scoreboard
let myPoints = 0;
let enemyPoints = 0;

//Sounds
let raquetada;
let ponto;

function preload(){
  raquetada = loadSound("Sounds/raquetada.mp3");
  ponto = loadSound("Sounds/ponto.mp3");
}

function setup() {
  createCanvas(600, 400);
}

function draw() {
  background(0);
  showBall();
  movementBall();
  ballColision();
  showRect(xRect, yRect);
  movementRect();
  verifyCollideRect(xRect, yRect);
  showRect(xRectEnemy, yRectEnemy);
  movementRectEnemy();
  verifyCollideRect(xRectEnemy, yRectEnemy);
  scoreboard();
  scorePoints();
}

function showBall(){
    circle(xBall, yBall, diameter);
}

function movementBall (){
  xBall += speedXBall;
  yBall += speedYBall;
}

function ballColision(){
  if(xBall  + ray > width || xBall - ray < 0) {
    speedXBall *= -1;
  }
  
  if(yBall  + ray > height || yBall - ray < 0) {
    speedYBall *= -1;
  }
}

function showRect(x, y){
  rect(x, y, wRect, hRect);
}

function movementRect(){
  if(keyIsDown(DOWN_ARROW)){
    yRect += 10;
  }
  if(keyIsDown(UP_ARROW)){
    yRect -= 10;
  }
}

function verifyCollideRect(x, y){
  collide = collideRectCircle(x, y, wRect, hRect, xBall, yBall, ray);
  if (collide){
    speedXBall *= -1;
    raquetada.play();
  }
}

function movementRectEnemy(){
  speedYEnemy = yBall - yRectEnemy - wRect / 2 - 30;
  yRectEnemy += speedYEnemy + chanceToMiss;
  calculateChanceToMiss()
}

function calculateChanceToMiss(){
  if (enemyPoints >= myPoints){
    chanceToMiss += 1;
    if (chanceToMiss >= 39){
      chanceToMiss = 40;
    }
  } else {
    chanceToMiss -= 1;
    if (chanceToMiss <= 35){
      chanceToMiss = 35;
    }
  }
}

function scoreboard(){
  stroke(255);
  textSize(16);
  textAlign(CENTER);
  fill(color(255, 140, 0));
  rect(150, 10, 40, 20);
  fill(255);
  text(myPoints, 170, 26);
  fill(color(255, 140, 0));
  rect(450, 10, 40, 20);
  fill(255);
  text(enemyPoints, 470, 26);
}

function scorePoints(){
  if(xBall > 590){
    myPoints += 1;
    ponto.play();
  }
  if(xBall < 10){
    enemyPoints += 1;
  ponto.play();
  }
}