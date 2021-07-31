var player, playeridle, playerrun, playerjump, playerhealth = 10,
  playerdeath;
var playerattack1, playerattack2, playerattack3, pleyerattackArea;
var imagestate = "left",
  gamestate = "start",
  menu_opened = false;
var creator_pixie, creatorhealth = 10,
  creator_pixie_image;
var retry, ground, bg;
var furnace, furnace_menu, furnaceopened = false,
  inventory, furnace_item_slot, furnace_fuel_slot;
var emptyslot_image, oreslot_image, coalslot_image;
var slot1, slot2, slot3;
var slot1_content = "empty",
  slot2_content = "empty",
  slot3_content = "empty",
  furnace_item_slot_value = 0,
  furnace_fuel_slot_content = "empty",
  slot1_selected = false,
  slot2_selected = false,
  slot3_selected = false,
  furnace_item_slot_content = "empty",
  furnace_fuel_slot_value = 0,
  slot_selected = 0;
var slot1_value = 0,
  slot2_value = 0,
  slot3_value = 0,
  burnable_items = ["ore_crystal"];
  fuels=["coal"]
var ore_crystal, ore_crystal_image;
var story, storybox_image, story_isrunning = true;


function preload() {
  bg = loadImage("forestDay.png")
  playeridle = loadAnimation("movement/adventurer-idle-00.png", "movement/adventurer-idle-01.png",
    "movement/adventurer-idle-02.png", "movement/adventurer-idle-03.png");
  playerrun = loadAnimation("movement/adventurer-run-00.png", "movement/adventurer-run-01.png", "movement/adventurer-run-02.png", "movement/adventurer-run-03.png", "movement/adventurer-run-04.png", "movement/adventurer-run-05.png")
  playerjump = loadAnimation("movement/adventurer-jump-00.png", "movement/adventurer-jump-01.png", "movement/adventurer-jump-02.png", "movement/adventurer-jump-03.png", "movement/adventurer-fall-00.png", "movement/adventurer-fall-01.png")
  playerdeath = loadAnimation("movement/adventurer-die-00.png", "movement/adventurer-die-01.png", "movement/adventurer-die-02.png", "movement/adventurer-die-03.png", "movement/adventurer-die-04.png", "movement/adventurer-die-05.png", "movement/adventurer-die-06.png");
  playerhurt = loadAnimation("movement/adventurer-hurt-00.png")
  playerattack1 = loadAnimation("movement/adventurer-attack1-00.png", "movement/adventurer-attack1-01.png", "movement/adventurer-attack1-02.png", "movement/adventurer-attack1-03.png", "movement/adventurer-attack1-04.png");
  playerattack2 = loadAnimation("movement/adventurer-attack2-00.png", "movement/adventurer-attack2-01.png", "movement/adventurer-attack2-02.png", "movement/adventurer-attack2-03.png", "movement/adventurer-attack2-04.png", "movement/adventurer-attack2-05.png");
  playerattack3 = loadAnimation("movement/adventurer-attack3-00.png", "movement/adventurer-attack3-01.png", "movement/adventurer-attack3-02.png", "movement/adventurer-attack3-03.png", "movement/adventurer-attack3-04.png", "movement/adventurer-attack3-05.png");
  // enemyimage =loadImage("druid/ezgif.com-gif-maker.gif");
  // creator_pixie = createImg("druid/ezgif.com-gif-maker.gif");
  furnaceImage = loadImage("utility_images/furnace_image.png")
  furnace_menu_image = loadImage("utility_images/furnace_menu_image.png")
  inventory_image = loadImage("utility_images/inventory_image.png")
  creator_pixie_image = loadImage("utility_images/creator_pixie_image.png")
  emptyslot_image = loadImage("utility_images/emptyslot_image.png");
  oreslot_image = loadImage("utility_images/ore_slot_image.png")
  ore_crystal_image = loadImage("utility_images/ore_piece_image.png");
  coalslot_image = loadImage("utility_images/single_fuel_image.png");
  storybox_image = loadImage("utility_images/player_story_box_image.png")
}

function setup() {
  createCanvas(windowWidth, windowHeight - 5);
  ground = createSprite(337.5, 615, 10000, 20);
  ground.visible = true;
  ground.shapeColor = "brown";
  //ground.setCollider("rectangle",0,0,895,20);
  player = createSprite(700, 200, 10, 10);
  player.setCollider("rectangle", 0, 0, 15, 35);
  player.addAnimation("idle", playeridle);
  player.scale = 2.35;
  // player.velocityY=4;
  creator_pixie = createSprite(700, 337, 50, 50);
  creator_pixie.addImage(creator_pixie_image);
  creator_pixie.scale = 0.5

  playerinteractionArea = createSprite(15, 20, 50, 60)
  playerinteractionArea.visible = false;

  furnace = createSprite(500, 550, 60, 70);
  furnace.addImage(furnaceImage);
  furnace.scale = 0.60;
  furnace.setCollider("rectangle", 0, 0, 100, 175);

  ore_crystal = createSprite(204, 564, 20, 30)
  ore_crystal.addImage(ore_crystal_image)

  furnace_menu = createSprite(windowWidth / 2, windowHeight / 2, 0, 0);
  furnace_menu.addImage(furnace_menu_image);
  furnace_menu.visible = false;

  furnace_fuel_slot = createSprite(furnace_menu.x - 250, furnace_menu.y + 160, 0, 0);
  furnace_fuel_slot.addImage(emptyslot_image);
  furnace_fuel_slot.visible = false;
  furnace_item_slot = createSprite(furnace_menu.x - 250, furnace_menu.y - 105, 0, 0);
  furnace_item_slot.addImage(emptyslot_image);
  furnace_item_slot.visible = false;

  inventory = createSprite(windowWidth / 2, 70, 0, 0);
  inventory.addImage(inventory_image);
  inventory.scale = 0.5;

  slot1 = createSprite(inventory.x - 140, inventory.y + 5, 20, 20);
  slot1.addImage(emptyslot_image);
  slot1.scale = 0.53;

  slot2 = createSprite(inventory.x + 2, inventory.y + 5, 20, 20);
  slot2.addImage(emptyslot_image);
  slot2.scale = 0.53;

  slot3 = createSprite(inventory.x + 143, inventory.y + 5, 20, 20);
  slot3.addImage(emptyslot_image);
  slot3.scale = 0.53;
  story = createSprite(windowWidth / 2, ground.y - 100, 10, 10);
  story.addImage(storybox_image)
  story.visible = false;
  // 
}

function draw() {
  background(bg);

  player.debug = false;
  ore_crystal.debug = false;

  /*camera.position.x=player.x+200;
  camera.position.y=player.y-200;
  camera.position.z=-200;
  camera.position.x = player.x+200;
  camera.position.y = player.y;*/
  //if(story_isrunning===false){
  if (keyDown(UP_ARROW) && player.isTouching(ground)) {
    player.velocityY = -10;
  } else {
    player.collide(ground);
    player.velocityY = player.velocityY + 0.8;
  }

  playerinteractionArea.y = player.y;

  if (imagestate === "right") {
    playerinteractionArea.x = player.x - 40;
  } else if (imagestate === "left") {
    playerinteractionArea.x = player.x + 40;
  }

  if (menu_opened === true) {
    player.velocityX = 0;
    player.velocityY = 0;
  }

  if (creator_pixie.isTouching(player)) {
    creator_pixie.velocityX = 0;
    creator_pixie.velocityY = 0;
  } else {
    if (player.y - 50 > creator_pixie.y) {
      creator_pixie.velocityY = 2;
    } else if (player.y < creator_pixie.y) {
      creator_pixie.velocityY = -1.5;
    }
    if (player.x > creator_pixie.x) {
      creator_pixie.velocityX = 2;
    } else if (player.x < creator_pixie.x) {
      creator_pixie.velocityX = -2;
    }
  }
  creator_pixie.collide(player);

  Playerright();
  Playerleft();
  FurnaceWork();
  SlotContainer();
  if (playerinteractionArea.isTouching(ore_crystal) && keyWentDown("z")) {
    OreCrystal_extraction();
  }
  if (keyWentDown("x")) {
    coal_genetartion();
  }
  SlotDumper();

  //playerattack();


  fill("white")
  text("HEALTH=" + playerhealth, player.x - 20, player.y - 50)
  text("health=" + creatorhealth, creator_pixie.x - 25, creator_pixie.y - 30)
  //}
  drawSprites();
}


function Playerright() {
  /*  if (keyDown(RIGHT_ARROW)) 
    {
     player.x=player.x+4;
    } */

  if (keyWentDown(RIGHT_ARROW) && imagestate === "right") {
    player.mirrorX(player.mirrorX() * -1);
    imagestate = "left";
  }
  if (keyWentDown(RIGHT_ARROW)) {
    player.velocityX = 4.5;
    player.addAnimation("idle", playerrun);
  }
  if (keyWentUp(RIGHT_ARROW)) {
    player.velocityX = 0;
    player.addAnimation("idle", playeridle)
    /*   if(keyDown(LEFT_ARROW)){
           player.addAnimation("idle",playerrun);
          }*/
  }

  if (keyWentUp(RIGHT_ARROW) && keyDown(LEFT_ARROW)) {
    player.velocityX = -4.5;
    player.addAnimation("idle", playerrun);
    if (imagestate === "left") {
      player.mirrorX(player.mirrorX() * -1);
      imagestate = "right";
    }
  }

}

function Playerleft() {
  /*   if (keyDown(LEFT_ARROW)) 
     {
        player.x=player.x-4;
     }*/

  if (keyWentDown(LEFT_ARROW) && imagestate === "left") {
    player.mirrorX(player.mirrorX() * -1);
    imagestate = "right";
  }
  if (keyWentDown(LEFT_ARROW)) {
    player.velocityX = -4.5;
    player.addAnimation("idle", playerrun);
  }
  if (keyWentUp(LEFT_ARROW)) {
    player.velocityX = 0;
    player.addAnimation("idle", playeridle);
    /*     if(keyDown(RIGHT_ARROW))
       {
        player.addAnimation("idle",playerrun);
       }*/
  }

  if (keyWentUp(LEFT_ARROW) && keyDown(RIGHT_ARROW)) {

    player.velocityX = 4.5;
    player.addAnimation("idle", playerrun);
    if (imagestate === "right") {
      player.mirrorX(player.mirrorX() * -1);
      imagestate = "left";
    }
  }
}

async function FurnaceWork() {
  if (furnaceopened===true){
    fill("black")
    text("HI KARTHIKEYA",furnace_menu.x,furnace_menu.y)
  }
  if (playerinteractionArea.isTouching(furnace) && keyWentDown("e") && furnaceopened === false) {
    furnace_menu.visible = true;
    furnaceopened = true;
    menu_opened = true;
    furnace_fuel_slot.visible = true;
    furnace_item_slot.visible = true;
  } else if (keyWentDown("e") && furnaceopened === true) {
    furnace_menu.visible = false;
    furnaceopened = false;
    menu_opened = false;
    furnace_fuel_slot.visible = false;
    furnace_item_slot.visible = false;
  }

  if (keyWentDown("a") && furnaceopened === true) {
    if (slot1_selected === true&&slot1_content === "ore_crystal") {
      furnace_item_slot_value = furnace_item_slot_value + slot1_value;
      furnace_item_slot_content = slot1_content;
      slot1_value = 0;
      furnace_item_slot.addImage(oreslot_image)
    } else if (slot2_selected === true&&slot2_content === "ore_crystal") {
      furnace_item_slot_value = furnace_item_slot_value + slot2_value;
      furnace_item_slot_content = slot2_content;
      slot2_value = 0;
      furnace_item_slot.addImage(oreslot_image)
    } else if (slot3_selected === true&&slot3_content === "ore_crystal") {
      furnace_item_slot_value = furnace_item_slot_value + slot3_value;
      furnace_item_slot_content = slot3_content;
      slot3_value = 0;
      furnace_item_slot.addImage(oreslot_image)
    }
  }
  if (keyWentDown("f") && furnaceopened === true) {
    if (slot1_selected === true&&slot1_content === "coal") {
      furnace_fuel_slot_value = furnace_fuel_slot_value + slot1_value;
      furnace_fuel_slot_content = slot1_content;
      slot1_value = 0;
      furnace_fuel_slot.addImage(coalslot_image)
    } else if (slot2_selected === true&&slot2_content === "coal") {
      furnace_fuel_slot_value = furnace_fuel_slot_value + slot2_value;
      furnace_fuel_slot_content = slot2_content;
      slot2_value = 0;
      furnace_fuel_slot.addImage(coalslot_image)
    } else if (slot3_selected === true&&slot3_content === "coal") {
      furnace_fuel_slot_value = furnace_fuel_slot_value + slot3_value;
      furnace_fuel_slot_content = slot3_content;
      slot3_value = 0;
      furnace_fuel_slot.addImage(coalslot_image)
    }
  }


  if (playerinteractionArea.isTouching(furnace)) {
    fill("white")
    text("press E to interact", furnace.x - 35, furnace.y - 60);
  }
}

function SlotContainer() {
  if (keyWentDown("1")) {
    slot_selected = 1;
  } else if (keyWentDown("2")) {
    slot_selected = 2;
  } else if (keyWentDown("3")) {
    slot_selected = 3;
  }


  switch (slot_selected) {
    case 1:
      slot1_selected = true;
      slot2_selected = false;
      slot3_selected = false;
      break;
    case 2:
      slot1_selected = false;
      slot2_selected = true;
      slot3_selected = false;
      break;
    case 3:
      slot1_selected = false;
      slot2_selected = false;
      slot3_selected = true;
      break;
  }
  if (slot1_value === 10) {
    fill("white")
    text("You are full", slot1.x - 30, slot1.y + 100)
  } else {
    fill("white")
    text("item =" + slot1_value, slot1.x - 30, slot1.y + 100)
  }
  if (slot2_value === 10) {
    fill("white")
    text("You are full", slot2.x - 30, slot2.y + 100)
  } else {
    fill("white")
    text("item =" + slot2_value, slot2.x - 30, slot2.y + 100)
  }
  if (slot3_value === 10) {
    fill("white")
    text("You are full", slot3.x - 30, slot3.y + 100)
  } else {
    fill("white")
    text("item =" + slot3_value, slot3.x - 30, slot3.y + 100)
  }
}

async function OreCrystal_extraction() {
  if (slot1_content === "empty" || slot1_content === "ore_crystal") {
    if (slot1_value < 10 && slot1_selected === true) {
      slot1.addImage(oreslot_image)
      slot1_value = slot1_value + 1;
      slot1_content = "ore_crystal"
    }
  }
  if (slot2_content === "empty" || slot2_content === "ore_crystal") {
    if (slot2_value < 10 && slot2_selected === true) {
      slot2.addImage(oreslot_image)
      slot2_value = slot2_value + 1;
      slot2_content = "ore_crystal"
    }
  }
  if (slot3_content === "empty" || slot3_content === "ore_crystal") {
    if (slot3_value < 10 && slot3_selected === true) {
      slot3.addImage(oreslot_image)
      slot3_value = slot3_value + 1;
      slot3_content = "ore_crystal"
    }
  }
}

async function coal_genetartion() {
  if (slot1_content === "empty" || slot1_content === "coal") {
    if (slot1_value < 10 && slot1_selected === true) {
      slot1.addImage(coalslot_image)
      slot1_value = slot1_value + 1;
      slot1_content = "coal"
    }
  }
  if (slot2_content === "empty" || slot2_content === "coal") {
    if (slot2_value < 10 && slot2_selected === true) {
      slot2.addImage(coalslot_image)
      slot2_value = slot2_value + 1;
      slot2_content = "coal"
    }
  }
  if (slot3_content === "empty" || slot3_content === "coal") {
    if (slot3_value < 10 && slot3_selected === true) {
      slot3.addImage(coalslot_image)
      slot3_value = slot3_value + 1;
      slot3_content = "coal"
    }
  }
}

function SlotDumper() {
  if (keyWentDown("q")) {
    if (slot1_value > 0 && slot1_selected === true) {
      slot1_value = slot1_value - 1;
    }
    if (slot2_value > 0 && slot2_selected === true) {
      slot2_value = slot2_value - 1;
    }
    if (slot3_value > 0 && slot3_selected === true) {
      slot3_value = slot3_value - 1;
    }
  }
  if (slot1_value === 0 && slot1_content !== "empty") {
    slot1_content = "empty";
    slot1.addImage(emptyslot_image);
  }
  if (slot2_value === 0 && slot2_content !== "empty") {
    slot2_content = "empty";
    slot2.addImage(emptyslot_image);
  }
  if (slot3_value === 0 && slot3_content !== "empty") {
    slot3_content = "empty";
    slot3.addImage(emptyslot_image);
  }
}
/*function playerattack(){

  

  if(keyWentDown("c")){
    player.addAnimation("idle",playerattack3);
  }
  if(keyDown(LEFT_ARROW)||keyDown(RIGHT_ARROW)){
    if(keyWentDown("c")){
      player.addAnimation("idle",playerrun)
    }
  }
  if(keyDown("c")){
    if(keyWentDown(LEFT_ARROW)||keyWentDown(RIGHT_ARROW)){
      player.addAnimation(playerrun);
    }
  }
}*/


/*

  if (creator_pixie.isTouching(player) && imagestate === "right") {
    creator_pixie.x = creator_pixie.x - 100;
  }
  if (creator_pixie.isTouching(player) && imagestate === "left") {
    creator_pixie.x = creator_pixie.x + 100;
  }

  */