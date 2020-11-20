
var monkey , monkey_running,moving, monkeyStop, stop;
var bananaImage, obstacle, obstacleImage,ground;
var FoodGroup, obstacleGroup;
var score = 0;
var PLAY = 1;
var END = 1;
var gamestate = PLAY;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  monkeyStop = loadAnimation("sprite_0.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() { 
  //createCanvas(400, 400);
  
  monkey = createSprite(80,315,20,20)
  monkey.addAnimation("moving",monkey_running);  
  monkey.scale = 0.1;

  ground = createSprite(600,350,900,10)
  ground.velocityX = -5;
  ground.x = ground.width /2;
  console.log(ground.x);
  
  

  obstacleGroup = createGroup();
  FoodGroup = createGroup();
  
  monkey.setCollider("circle",0,0,280);
  monkey.debug = false;
  
  
  score = 0;

}


function draw() {
  background("white");
  
  
  
    if (gamestate === PLAY){
      if (ground.x < 0){
      ground.x = ground.width/2;
    }
      score = 0
      stroke("white");
      textSize (20);
      fill("white");
      text("Score: "+ score,400,50);
      
      stroke("black");
      textSize(20);
      fill("black");
      score = Math.ceil(frameCount/frameRate());
      text("Score: "+ score,100,50);
   
     
    if(keyDown("space")&& monkey.y >= 140) {
        monkey.velocityY = -12;
       
    }
    
    //add gravity
    monkey.velocityY = monkey.velocityY + 0.8
  
    }
  
  
    if(obstacleGroup.isTouching(monkey)){
      gamestate = END;
      text ("MONKEY CAUGHT",200,150);
      textSize (22);
    }
  
  
    if (gamestate === END){
      obstacleGroup.destroyEach();
      FoodGroup.destroyEach();
      monkey.velocityX = 0;
    }
  
SpawnFood();
Spawnobstacle();
monkey.collide(ground);
 drawSprites(); 
}

function Spawnobstacle(){
  if (frameCount % 100 === 0){
     var obstacle = createSprite(400,310,30,30);
      obstacle.addImage(obstacleImage);
      obstacle.scale = 0.2;
    obstacle.velocityX = -5
    obstacleGroup.add(obstacle);
    
  }

}
function SpawnFood(){
  if (frameCount %80 === 0){
      var banana = createSprite(400,180,20,20);
      banana.y = Math.round(random(120,180));
      banana.addImage(bananaImage);
      banana.scale = 0.1;
      banana.velocityX = -5;
      FoodGroup.add(banana);
  
  }
  
}





