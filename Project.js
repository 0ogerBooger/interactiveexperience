//Joshua Payette
//Pascal Huynh
//502-A22-LA Web & FX: From Theory To Practice.00002
//Hungry Sun
//https://openprocessing.org/sketch/1861242

//(INSTRUCTIONS)
//Use the arrow keys to move the sun (yellow circle) or, use the mouse to move the stars (white circles)

//(ARTIST STATEMENT)
//This tells the story of a Star that gets bigger from consuming everything that is around it. This interaction kind of shows how most planets are formed, formed by many impacts. I wanted to create something like this because I love space and i wanted to make something somewhat satisfying to look at. An interaction that you could just stare at or interact with or both. its up to you how you want to play this interaction. all ways are satisfying and fun to look at.

let yPos;
let xPos;
let timer = 0;
let interval = 500;// 0.5 seconds
let stars = [];
let sunSize = 50; // current size of the sun
let showInstructions=true;// flag to show or hide the instructions
let instructionTimer=0;
let textDisplayTime=5000; //5 seconds

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
  yPos = 500;
  xPos = 500;
}

function draw() {
  background(0);
  event();
  sun();

  // Iterate over all the stars and apply a force towards or away from the mouse
  for (let i = 0; i < stars.length; i++) {
    let d = dist(mouseX, mouseY, stars[i].x, stars[i].y);
    let force = createVector(mouseX - stars[i].x, mouseY - stars[i].y);
    force.normalize(); // Normalize the force vector to have a length of 1
    force.mult(10/d); // Scale the force inversely proportional to the distance between the mouse and the star
    stars[i].velocity.add(force); // Add the force to the star's velocity
    stars[i].velocity.limit(5); // Limit the maximum velocity to prevent excessive acceleration
    stars[i].x += stars[i].velocity.x;
    stars[i].y += stars[i].velocity.y;
    
    // Draw the star as a white circle
    noStroke();
    fill(255);
    circle(stars[i].x, stars[i].y, stars[i].r);
  }
  //Instructions
  if (showInstructions){
    instructionTimer += deltaTime;
    textSize(32);
    fill(255);
    textAlign(CENTER,BOTTOM);
    text("Use the arrow keys to move the sun to make it grow. Press left mouse to reset the experience.", width/2, height-50);
  }
  // Move the sun based on the arrow keys
  if (keyIsDown(LEFT_ARROW)) {
    xPos -= 5;
  } else if (keyIsDown(RIGHT_ARROW)) {
    xPos += 5;
  } else if (keyIsDown(UP_ARROW)) {
    yPos -= 5;
  } else if (keyIsDown(DOWN_ARROW)) {
    yPos += 5;
  }
  //Restarts the experience when the leftmouse is pressed
  if(mouseIsPressed && mouseButton===LEFT){
    yPos=500;
    xPos=500;
    timer=0;
    interval=500;
    stars=[];
    sunSize=50;
    showInstructions=true;
    instructionTimer=0;
    background(0);
  }
}

function sun() {
  let collided = false; // flag to track if the sun collided with any stars
  
  noStroke();
  fill(255, 255, 0);
  circle(xPos, yPos, sunSize);
  for (let i = 0; i < stars.length; i++) {
    let d = dist(xPos, yPos, stars[i].x, stars[i].y);
    if (d < sunSize/2 + stars[i].r) { // check for collision
      collided = true;
      sunSize += 10; // add the size of the collided star to the sun's size
      stars.splice(i, 1); // remove the collided star from the array
      break; // exit the loop since we removed an element
    }
  
    circle(xPos, yPos, sunSize);
  }
}
// draws the stars
function event() {
  if (millis() - timer > interval) {
    stars.push({
      x: random(width - 10),
      y: random(height - 10),
      r: 10,
      velocity: createVector(0, 0)
    });
    timer = millis();
  }
}
