
var bg,housebg_img;
var boy,boy_anim,boy_left_anim;
var wood,wood_img;
var coin,coin_img;
var woodspike,woodspike1,woodspike2;
var score,lives;
var ghost,ghost1,ghost_img;
var ghostGroup,ghostGroup1;
var restart,restart_img;
var gameover,gameover_img;
var boy_jump_anim;
var boy_collided;
var lava

var woodGroup,coinGroup;
var woodspikeGroup1,woodspikeGroup2,woodspikeGroup3;

var PLAY=2;
var START=1;
var END=0;
var gameState=START;


function preload()
{
  
  housebg_img=loadImage("housebg.png")
  
 
  boy_anim=loadAnimation("redhood1.png","redhood2.png","redhood3.png", "redhood4.png","redhood5.png","redhood6.png");
  
  
  boy_left_anim=loadAnimation("boy1.png","boy2.png","boy3.png","boy4.png","boy5.png","boy6.png");
  
  
  wood_img=loadImage("wood.png");
  
  coin_img=loadImage("coin.png");
  
  ghost_img=loadImage("ghost.png");
  
 
  gameover_img=loadImage("gameover.png");
  
  restart_img=loadImage("restart.png");
  
  lava_img=loadImage("lava.png")
  
  boy_jump_anim=loadImage("redhood_jump.png","redhood_jump-1");
  
  boy_collided=loadImage("redhood_collided.png");
}

function setup() 
{
  
  createCanvas(600,600);
  
  
  bg=createSprite(300,400);
  bg.scale=4
  
  bg.addImage(housebg_img);
  
  bg.velocityY=(2);
  
  
  boy=createSprite(300,450,10,10);
  
  
  boy.addAnimation("run",boy_anim);
  boy.addAnimation("leftrun",boy_left_anim);
  boy.addAnimation("jump",boy_jump_anim);
  boy.addAnimation("collided",boy_collided);
  boy.scale=0.7;
  
  
  score=0;
  lives=3;
  
  
  woodGroup=new Group();
  coinGroup=new Group();
  woodspikeGroup1=new Group();
  woodspikeGroup2=new Group();
  woodspikeGroup3=new Group();
  ghostGroup=new Group();
  ghostGroup1=new Group();
  
  
  gameover=createSprite(300,230,10,10);
  gameover.addImage(gameover_img);
  
  gameover.scale=0.8;
  
 
  restart=createSprite(300,350,10,10);
  restart.addImage(restart_img);
  restart.scale=0.4;
}

function draw() 
{
  
  background("white");
  //Start state
  if(gameState===START)
  {
    
    background("blue");
    
    
    gameover.visible=false;
    bg.visible=false;
    boy.visible=false;
    restart.visible=false;
    woodGroup.visible=false;
    ghostGroup.visible=false;
    
    
    textSize(20);
    fill("white");
    text("Listen carefully to the instructions prior starting",80,100);
    text("1.Use the space key to jump",50,140);
    text("2.Coins get you points",50,170);
    text("3.One can only land on the wooden planks",50,200);
    text("if not, the game ends",50,225);
    text("4.Jump on the wood to rest for sometime",50,255);
    text("5.Run away from the spooky witches",50,285);
    text("6.Falling into the lava will end your game too",50,315);
    text("7.Use left and right Arrow key to move the boy left and right",50,345);
    text("8.The higher the score, the challenging it gets",50,375);
    text("9.Try to score more and more as you can and share it",50,405);
 
    textSize(40);
    text("GOOD LUCK!!",160,500);
    
    textSize(28);
    text("Enter Space Key to Begin",140,550);
    
    
    if(keyDown("space"))
    {
      gameState=PLAY; 
    }
  }
  
  else if(gameState===PLAY)
  {
    
    bg.visible=true;
    boy.visible=true;
    gameover.visible=false;
    restart.visible=false;
    
    if(bg.y>400)
    {
      bg.y=height/2;  
    }   
  
    
    if(keyDown("space"))
    {
      
      boy.velocityY=-4.5;  
      boy.changeAnimation("jump");
    }
  
   
    boy.velocityY=boy.velocityY+0.8;
  
    if(keyDown(RIGHT_ARROW))
    {
      boy.changeAnimation("run"); 
      boy.velocityX=3;
    }
  
    if(keyDown(LEFT_ARROW))
    {
      boy.changeAnimation("leftrun");
      boy.velocityX=-3;
    }
  
    boy.collide(woodGroup);
 
   
    if(boy.isTouching(woodGroup))
    {
      boy.velocityY=0; 
    }
  
   
    if(boy.isTouching(coinGroup))
    {
      score=score+10;
      coinGroup.destroyEach();
    }
 
    if(boy.isTouching(ghostGroup))
    {
      lives=lives-1; 
      ghostGroup.destroyEach();
      boy.changeAnimation("collided");
    }
    
 
    if(boy.isTouching(ghostGroup1))
    {
      lives=lives-1; 
      ghostGroup1.destroyEach();
      boy.changeAnimation("collided");
    }
    
  
    spawnWood();
    spawnGhost();
    

    if(boy.y>600)
    {
      gameState=END;
    }
    
  
    if(boy.isTouching(woodspikeGroup3))
    {
      lives=lives-1; 
      woodspikeGroup1.destroyEach();
      boy.changeAnimation("collided");
    }
    
  
    if(boy.isTouching(woodspikeGroup1))
    {
      lives=lives-1; 
      woodspikeGroup1.destroyEach();
      boy.changeAnimation("collided");
    }
    
    if(boy.isTouching(woodspikeGroup2))
    {
      lives=lives-1; 
      woodspikeGroup2.destroyEach();
      boy.changeAnimation("collided");
    }
    
 
    if(lives===0)
    {
      gameState=END;
    }
  }
  
  else if(gameState===END)
  {
    
    boy.velocityX=0;
    boy.velocityY=0;
    gameover.visible=true;
    restart.visible=true;
    boy.visible=false;
    

    if(bg.y>400)
    {
      bg.y=height/2;  
    }   
    
   
    if(mousePressedOver(restart))
    {
      reset();
    }
  }

    drawSprites();
  
    
  fill("white");
  textSize(20);
  text("Score: "+score,50,50);
  text("lives: "+lives,450,50);
  
}

function spawnWood()
{

  if(frameCount%125===0)
  {
    wood=createSprite(Math.round(random(80,520)),0,10,10);
    
    wood.addImage(wood_img);
    
    wood.scale=0.05;
    
    wood.velocityY=(4.5+score/50);
    
    woodGroup.add(wood);
  
    wood.debug=false;
   
    wood.setCollider("rectangle",0,0,2500,300);
  
    wood.lifetime=width/wood.velocityY;
    
  
    coin=createSprite(wood.x,-40,10,10);
   
    coin.addImage(coin_img);
    
    coin.velocityY=(4.5+score/50);
    
    coin.scale=0.018;
  
    coinGroup.add(coin);
 
    coin.debug=false;
    coin.lifetime=width/coin.velocityY;
    woodspike=createSprite(wood.x,28,150,3);
    woodspike.velocityY=wood.velocityY;
    woodspike.visible=false;
    woodspike.debug=true;
    woodspikeGroup1.add(woodspike);
    woodspike.lifetime=width/woodspike.velocityY;

    woodspike1=createSprite(wood.x-105,-5,5,10);
 
    woodspike1.velocityY=wood.velocityY;
    
    woodspike1.visible=false;

    woodspike1.debug=true;
    
    woodspikeGroup2.add(woodspike1);
    
    woodspike1.lifetime=width/woodspike1.velocityY;
    woodspike2=createSprite(wood.x+105,5,5,15);
    woodspike2.velocityY=wood.velocityY;
    woodspike2.visible=false;
    woodspike2.debug=true;
  
    woodspikeGroup3.add(woodspike2);
  
    woodspike2.lifetime=width/woodspike2.velocityY;
   } 
}

function spawnGhost()
{
  if(frameCount%150===0)
  {
    ghost=createSprite(50,0,10,10);
    ghost.addImage(ghost_img);
    ghost.velocityX=(3+score/80);
    ghost.velocityY=(4+score/80);
    ghost.scale=0.1;
    ghostGroup.add(ghost);
    ghost.lifetime=width/ghost.velocityX;
    ghost1=createSprite(550,0,10,10);
    ghost1.addImage(ghost_img);
    ghost1.velocityX=-(3+score/100);
    ghost1.velocityY=(4+score/100);
    ghost1.scale=0.1;
    ghostGroup1.add(ghost1);
  }
  

}
function reset()
{
  gameState=PLAY;
  score=0;
  lives=3;

  gameover.visible=false;
  restart.visible=false;
  boy.visible=true;
  boy.y=500;
}