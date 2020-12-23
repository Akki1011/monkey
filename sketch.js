
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, ObstacleGroup
var score = 0;
var survivaltime = 0;
var ground;

var PLAY = 1;
var END = 0;
var gameState = PLAY;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  
  createCanvas(400,400);
  
  FoodGroup = new Group();
  ObstacleGroup = new Group();
  
  monkey = createSprite(80,315,20,20);
  monkey.addAnimation("moving",monkey_running);
  monkey.scale = 0.1;
  
  ground = createSprite(400,350,900,10);
  ground.velocityX = -4;
  ground.x = ground.width/2;
  
  

  
}


function draw() {
  background(220);
  
  stroke("black");
  fill("black");
  textSize(20);
  text("SurvivalTime : "+survivaltime , 100,50);
  survivaltime = Math.ceil(frameCount/frameRate());
  
  stroke("black");
  fill("blue");
  textSize(20);
  text("Score : "+score, 300,50);
  
  monkey.collide(ground);
  
  if(gameState === PLAY){
    
    monkey.changeAnimation("moving",monkey_running);
    
    if(ground.x<0){
      
      ground.x = ground.width/2;
    }
    
    if(keyDown("space")){
      
      monkey.velocityY = -12;
      
    }
    
    if(FoodGroup.isTouching(monkey)){
      
      FoodGroup.destroyEach();
      score = score+1;
    }
    
    monkey.velocityY = monkey.velocityY+0.8;
    
    ObstacleGroup.setLifetime = -1;
    food();
    obstacles();
    
    if(ObstacleGroup.isTouching(monkey)){
      
      gameState = END;
    }
  }
  
  if(gameState === END){
    
    ObstacleGroup.destroyEach();
    FoodGroup.destroyEach();
    
    
    survivaltime.visible = false;
    
    
    
    stroke("black");
    fill("red");
    textSize(20);
    text("Game Over",110,200);
    
    stroke("black");
    fill("brown");
    textSize(20);
    text("Monkey is dead",150,250);
    
    
    
  }
  drawSprites();

  
}

function food(){
  if(frameCount%80 === 0){
  banana = createSprite(300,200,20,20);
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    
    banana.velocityX = -(3+ 3*score/4);
    banana.lifetime = 200;
    
    FoodGroup.add(banana);
}
}
  function obstacles(){
    
    if(frameCount%300 === 0){
      obstacle = createSprite(250,325,20,20);
      obstacle.addImage(obstacleImage);
      obstacle.scale = 0.1;
      
      obstacle.velocityX = -3;
      obstacle.lifetime = 200;
      
      ObstacleGroup.add(obstacle);
    }
  }




