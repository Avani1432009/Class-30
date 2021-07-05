const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var ground;
var rope;
var watermelon;
var watermelonLink;
var backgroundImg,watermelonImg,rabbitImg;
var bunny;
var button;

function preload(){
backgroundImg = loadImage("background.png");
watermelonImg = loadImage("melon.png");
rabbitImg = loadImage("Rabbit-01.png");
}

function setup() 
{
  createCanvas(500,700);
  frameRate(80);
  engine = Engine.create();
  world = engine.world;
  ground = new Ground(200,680,600,20);
  rope = new Rope(6,{x:245,y:30});

  var fruit_options = {
    density:0.001
  }
  watermelon = Bodies.circle(300,300,15,fruit_options);
  Matter.Composite.add(rope.body,watermelon);

  watermelonLink = new Link(rope,watermelon);

  bunny = createSprite(250,650,100,100);
  bunny.addImage(rabbitImg);
  bunny.scale = 0.2;

  button = createImg('cut_btn.png');
  button.position(220,30);
  button.size(50,50);
  button.mouseClicked(drop);

  rectMode(CENTER);
  imageMode (CENTER);
  ellipseMode(RADIUS);
  textSize(50);
  
  
}

function draw() 
{
  background(51);
  image(backgroundImg,width/2,height/2,500,700)
  ground.show();
  rope.show();

  image(watermelonImg,watermelon.position.x,watermelon.position.y,60,60)
  
  Engine.update(engine);
  

   drawSprites();
   
}
function drop(){
  rope.break();
  watermelonLink.detach();
  watermelonLink = null;
}