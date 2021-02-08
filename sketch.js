var sword,sword1,sword2,friut,fruit1,fruit2,fruit3,fruit4,monster,monster1;

var PLAY = 1;
var END = 0;
var gameState = 1;

var score = 0;

var swordSound;
var gameOversound;


function preload(){

  sword1 = loadImage("sword.png");
  sword2 = loadImage("gameover.png");
  fruit1 = loadImage("fruit1.png");
  fruit2 = loadImage("fruit2.png");
  fruit3 = loadImage("fruit3.png");
  fruit4 = loadImage("fruit4.png");
  monster1 =loadAnimation("alien1.png","alien2.png");
  
  swordSound = loadSound("knifeSwooshSound.mp3");
  gameOverSound = loadSound("gameover.mp3");

  
}

function setup(){
  
  sword = createSprite(200,200,10,10);
  sword.addImage(sword1);
  sword.scale = 0.7;
  sword.depth = 2;
  
  fruitGroup = new Group();
  fruitGroup2 = new Group();
  enemyGroup = new Group();
  enemyGroup2 = new Group();
}

function draw(){

  background("skyblue");
  
  if(gameState === PLAY){
    sword.y = World.mouseY;
    sword.x = World.mouseX;
    
    Enemy();
    fruits();
    
    if(fruitGroup.isTouching(sword)){
      swordSound.play();
      fruitGroup.destroyEach();
      score = score+2;
    }
    
    if(fruitGroup2.isTouching(sword)){
      swordSound.play();
      fruitGroup2.destroyEach();
      score = score+2;
    }
    
    sword.addImage(sword1);
     
    if(enemyGroup.isTouching(sword)){
      gameOverSound.play();
      gameState = END;
      sword.addImage(sword2);
      sword.x = 200;
      sword.y = 200;
    }
    
    if(enemyGroup2.isTouching(sword)){
      gameOverSound.play();
      gameState = END;
      sword.addImage(sword2);
      sword.x = 200;
      sword.y = 200;
    }
      
    } else if(gameState === END){
      fruitGroup.destroyEach();
      enemyGroup.destroyEach();
      fruitGroup.setVelocityEach(0);
      enemyGroup.setVelocityEach(0);
    
  }
  
  
  fill("black");
  textSize(20);
  text("score:" + score,170,20);
  
  drawSprites();
}

function fruits(){
  if(World.frameCount % 80 === 0){
    fruit=createSprite(400,200,20,20);
    fruit.scale = 0.2;
    r=Math.round(random(1,4));
    if (r == 1){
      fruit.addImage(fruit1);
    } else if (r == 2){
      fruit.addImage(fruit2);
    } else if (r == 3){
      fruit.addImage(fruit3);
    } else if (r == 4) {
      fruit.addImage(fruit4);
    }
    fruit.y = Math.round(random(50,340));
    
    fruit.velocityX = -(7 + (score/4));
    fruit.setLifetime = 100;
    
    fruitGroup.add(fruit);
    
    position = Math.round(random(1,4));
    fruit = createSprite(400,200,20,20);
    
      if(position === 1){
        fruit.x = 0;
        fruit.velocityX = (7 + (score/4));
        fruit.addImage(fruit1);
        fruit.scale = 0.2;
      
      } else if(position === 2){
        fruit.x = 0
        fruit.velocityX = (7 + (score/4));
        fruit.addImage(fruit2);
        fruit.scale = 0.2;
              
      } else if(position === 3){
        fruit.x = 0
        fruit.velocityX = (7 + (score/4));
        fruit.addImage(fruit3);
        fruit.scale = 0.2;
        
      } else if(position === 4){
        fruit.x = 0
        fruit.velocityX = (7 + (score/4));
        fruit.addImage(fruit4);
        fruit.scale = 0.2;
      }
        fruitGroup2.add(fruit);
}
}

function Enemy(){
  if(World.frameCount % 200 === 0){
    monster=createSprite(400,200,20,20);
    monster.depth = 1;
    monster.addAnimation("moving",monster1);
    monster.y = Math.round(random(100,300));
    monster.velocityX = -(8 + (score/10));
    monster.setLifetime = 50;
    
    enemyGroup.add(monster);
    
    if(World.frameCount % 200 === 0){
    monster=createSprite(0,200,20,20);
    monster.depth = 1;
    monster.addAnimation("moving",monster1);
    monster.y = Math.round(random(100,300));
    monster.velocityX = (8 + (score/10));
    monster.setLifetime = 50;
    
    enemyGroup2.add(monster);
  }
  }
}