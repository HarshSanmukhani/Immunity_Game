var PLAY =1;
var END =0;
var gameState = PLAY;

var player;
var playerImage
var coronaVirus, mask;
var immunityBuildingFoods;
var immunity;
var x=0;
var ground;
var food1Image, food2Image, food3Image, food4Image, food5Image;
var coronaVirusImage, maskImage;
var groundImage;
var backGround;
var immunityBuildingFoodsGroup, coronaVirusGroup, maskGroup;
var restart, restartImage


function preload(){
  food1Image= loadImage("amla.jpg");
  food2Image= loadImage("ginger.jpg");
  food3Image= loadImage("honey.jpg");
  food4Image= loadImage("lemon.jpg");
  food5Image= loadImage("orange.jpg");

  maskImage= loadImage("mask.jpg");
  coronaVirusImage= loadImage("corona.jpg");
  
  groundImage= loadImage("ground.png");
  restartImage= loadImage("restart.jpg");

  playerImage= loadAnimation("player1.jpg", "player2.jpg", "player3.jpg", "player4.jpg");
  
}

function setup(){
  createCanvas(800,400);
  
  backGround= createSprite(400,200,1000,200);
  backGround.addImage(groundImage);
  backGround.scale= 2.2;
  
  ground= createSprite(400,350,400,10);
  ground.velocityX
  ground.visible= false;


  player= createSprite(200,280,30,30);
  player.addAnimation("player",playerImage);
  player.scale= 0.3;

  immunityBuildingFoodsGroup= new Group();
  coronaVirusGroup= new Group();
  maskGroup= new Group();

  immunity=0;

  fill("black");
  stroke("red");
  textSize(20);
  text("Immunity: " + immunity,200,150);


  restart= createSprite(650,350,30,30);
  restart.addImage(restartImage);
  restart.scale=0.2;
  restart.visible= false;
}

function draw(){
  background("white");
  immunity= immunity+10;

  console.log(immunity);
  player.collide(ground);

  if(gameState=== PLAY){

  if(ground.x<200){
    ground.x= ground.width/2;
  }

  ground.velocityX= -2;

  if(keyDown("space")&& player.y>200){
    player.velocityY= -7;
  }
 
  player.velocityY= player.velocityY+0.1;
  
  spawnImmunityBuildingFoods();
  spawnCoronaVirus();
  spawnMask();
  

  if(immunity>12){
   ground.velocityX= -3;
   immunityBuildingFoodsGroup.velocityX= -3;
   coronaVirusGroup.velocityX= -3;
   maskGroup.velocityX= -3;
  }

  if(immunity>20){
    ground.velocityX= -4;
    immunityBuildingFoodsGroup.velocityX= -4;
    coronaVirusGroup.velocityX= -4;
    maskGroup.velocityX= -4;
   }

  if(immunity===25){
    text("YOU WON", 400,200);
    gameState= END;
  }

  if(immunity=0){
    text("YOU LOSE", 400 ,200);
    gameState= END;
  }

 

  if(mousePressedOver(restart)){
    reset();
  }

}
  else if(gameState=== END){
    console.log("end game************")
  ground.velocityX=0;
  immunityBuildingFoodsGroup.velocityX=0;
  coronaVirusGroup.velocityX=0;
  maskGroup.velocityX=0;
  restart.visible= true;
  
}
 

 
  drawSprites();
  fill("black");
  stroke("red");
  textSize(20);
  x=x+1;
  text("Immunity: " + x,200,150);


  
}

function spawnImmunityBuildingFoods(){
  if(frameCount % 100 === 0){
     immunityBuildingFoods = createSprite(790,200,30,30);
     immunityBuildingFoods.y= Math.round(random(50,230));
     immunityBuildingFoods.velocityX= -2;

     var rand= Math.round(random(1,5));
     switch(rand){
       case 1: immunityBuildingFoods.addImage(food1Image);
               break;
       case 2: immunityBuildingFoods.addImage(food2Image);
               break;
       case 3: immunityBuildingFoods.addImage(food3Image);
               break;
       case 4: immunityBuildingFoods.addImage(food4Image);
               break;
       case 5: immunityBuildingFoods.addImage(food5Image);
               break;
       default:break;
     }
     immunityBuildingFoods.scale=0.2;
     immunityBuildingFoodsGroup.add(immunityBuildingFoods);
  }
  if(immunityBuildingFoodsGroup.isTouching(player)){
    immunity= immunity+1;
    immunityBuildingFoodsGroup.destroyEach();
  }
  
}

function spawnCoronaVirus(){
  if(frameCount%180=== 0){
    coronaVirus= createSprite(790,270,30,30);
    coronaVirus.y= Math.round(random(50,230));
    coronaVirus.addImage(coronaVirusImage);
    coronaVirus.scale= 0.2;
    coronaVirus.velocityX= -2;
    coronaVirusGroup.add(coronaVirus);
  }
  if(player.isTouching(coronaVirusGroup)){
    immunity= immunity-3;
    coronaVirusGroup.destroyEach();
  }
}

function spawnMask(){
  if(frameCount%280===0){
    mask= createSprite(790,220,30,30);
    mask.y= Math.round(random(50,230));
    mask.addImage(maskImage);
    mask.scale=0.2;
    mask.velocityX= -2;
    maskGroup.add(mask);
  }
  if(player.isTouching(maskGroup)){
    immunity= immunity+3;
    maskGroup.destroyEach();
  }
}

function reset(){
  alert("in reset")
    gameState= PLAY;
    immunity=0;
    restart.visible= false;
}

