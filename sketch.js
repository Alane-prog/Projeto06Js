var path,boy, leftBoundary,rightBoundary;
var pathImg,boyImg;
var i;
var drink,drinkImg;
var power,powerImg;
var bomb,bombImg;
var coin,coinImg;
var coinGroup,bombGroup,drinkGroup;
var count = 0;

function preload(){
  pathImg = loadImage("path.png");
  boyImg = loadAnimation("Runner-1.png","Runner-2.png");
  drinkImg = loadImage("energyDrink.png");
  powerImg = loadImage("power.png");
  bombImg = loadImage("bomb.png");
  coinImg = loadImage("coin.png");
}

function setup(){
  
  createCanvas(400,400);
  
// Moving background
path=createSprite(200,200);
path.addImage(pathImg);
path.velocityY = 4;
path.scale=1.2;

//creating boy running
boy = createSprite(180,340,30,30);
boy.scale=0.08;
boy.addAnimation("JakeRunning",boyImg);

power = createSprite(200,200);
power.addImage("poder",powerImg);
power.scale = 0.3;
power.visible = false;
// create left Boundary
leftBoundary = createSprite(0,0,100,800);
//leftBoundary.invisible = false;
//leftBoundary.visible = true;
//leftBoundary.isvisible = false;
leftBoundary.visible = false;

//create right Boundary
rightBoundary=createSprite(410,0,100,800);
rightBoundary.visible = false;

coinGroup = new Group;
bombGroup = new Group;
drinkGroup = new Group;
}

function draw() {
  background(0);
  
  path.velocityY = 4;

  // boy moving on Xaxis with mouse
  boy.x = World.mouseX;
  
  edges= createEdgeSprites();
  boy.collide(edges[3]);
  boy.collide(leftBoundary);
  boy.collide(rightBoundary);
  
  //code to reset the background
  /*if(path.y < 400 ){
    path.y = height*2;
  } */

    /*if(path.y > 400 ){
    path.y = height/2;
  } */

   if(path.y > 400 ){
    path.y = width/2;
  } 

   if(boy.isTouching(coinGroup)){
    coin.destroy();
    count = count + 1;
   }

   if(boy.isTouching(drinkGroup)){
    drink.destroy();
    power.visible = true;
    power.lifetime = 200;
   }

   if(boy.isTouching(bombGroup)){
    bomb.destroy();
   }

  spawnCoin();
  spawnBomb(); 
  spawnDrink();
  drawSprites();
}

function spawnDrink(){
  if(frameCount % 200 === 0) {
    drink = createSprite(200,30,40,40);
    drink.addImage("drink_eng",drinkImg);
    drink.x = Math.round(random(80,320));
    drink.scale = 0.15;
    drink.velocityY = 4;
    drink.lifetime = 300;
    drink.setCollider("circle",0,10,90);
    //drink.debug = true
    drinkGroup.add(drink);

    drink.depth = boy.depth;
    boy.depth = boy.depth + 1;
  }
  
}

function spawnBomb(){
  if(frameCount % 190 === 0) {
    bomb = createSprite(200,30,40,40);
    bomb.addImage("bomba",bombImg);
    bomb.x = Math.round(random(80,320));
    bomb.scale = 0.1;
    bomb.velocityY = 4;
    bomb.lifetime = 300;
    bomb.setCollider("circle",0,10,150);
    // bomb.debug = true;
    bombGroup.add(bomb);

    bomb.depth = boy.depth;
    boy.depth = boy.depth + 1;
  }
  
}

function spawnCoin(){
  if(frameCount % 70 === 0) {
    coin = createSprite(200,30,40,40);
    coin.addImage("Moeda",coinImg);
    coin.x = Math.round(random(100,300));
    coin.scale = 0.3;
    coin.velocityY = 4;
    coin.lifetime = 300;
    coin.setCollider("circle",0,10,40);
    // coin.debug = true;
    coinGroup.add(coin);

    coin.depth = boy.depth;
    boy.depth = boy.depth + 1;
  }
}