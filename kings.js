let canvas = document.querySelector('canvas');
let c = canvas.getContext('2d');
canvas.width = 1024; // 64*16
canvas.height = 576; // 64*9
//set up levels
let parsedCollisions 
//console.log(parsedCollisions)
let collisionBlocks 
let background 
let doors 

const enemyBomb = new EnemyBomb({
  imageSrc:'./img/Pigthrowingabomb/idle.png',
  frameRate: 10,
  animations: {
    idleRight: {
      frameRate: 10,
      frameBuffer: 2,
      loop: true,
      imageSrc: './img/Pigthrowingabomb/idlelg.png',
    },
    throwing: {
      frameRate: 15,
      frameBuffer: 2,
      loop: false,
      imageSrc:'./img/Pigthrowingabomb/throwing.png',
    },
    pickingup: {
      frameRate: 5,
      frameBuffer: 2,
      loop: true,
      imageSrc: './img/Pigthrowingabomb/pickingbomb.png',
    },
  
    boomon: {
      frameRate: 4,
      frameBuffer: 2,
      loop: false,
      imageSrc: './img/Pigthrowingabomb/boomon.png',
    },
    boom: {
      frameRate: 5,
      frameBuffer: 0.5,
      imageSrc: './img/Pigthrowingabomb/boom.png',
    },
},})
const player = new Player({
  
  imageSrc:'./img/king/idle.png',
  frameRate: 11,
  animations: {
    idleRight: {
      frameRate: 11,
      frameBuffer: 2,
      loop: true,
      imageSrc: './img/king/idle.png',
    },
    idleLeft: {
      frameRate: 11,
      frameBuffer: 2,
      loop: true,
      imageSrc: './img/king/idleLeft.png',
    },
    runRight: {
      frameRate: 8,
      frameBuffer: 4,
      loop: true,
      imageSrc: './img/king/runRight.png',
    },
    runLeft: {
      frameRate: 8,
      frameBuffer: 4,
      loop: true,
      imageSrc: './img/king/runLeft.png',
    },
    attack: {
      frameRate: 3,       // Adjust the frame rate to control the overall speed
      frameBuffer: 4,   // Adjust the frame buffer to slow down each frame
      loop: true,
      imageSrc: 
        './img/king/attackhammer1.png',  // Frame 1
        
    },
    enterDoor: {
      frameRate: 8,
      frameBuffer: 4,
      loop: false,
      imageSrc: './img/king/enterDoor.png',
      onComplete: () =>{
        console.log('completed animation')
        //overlay.opacity 
        gsap.to(overlay, {  //pull in gsap library in index.html to create this effect 
          opacity: 1,
          onComplete: () =>{
            level++
            if (level === 4) level = 1 //eventually add more levels but first some pigs
            levels[level].init()
            player.switchSprite('idleRight')
            player.preventInput = false;
            gsap.to(overlay, {
              opacity: 0,
            })
          },
        })
      },
      
    },
  },
});

function getDistanceBetween(x1,y1,x2,y2) {
  const dx = x2 - x1     //define distance between x axis enemy and player
  const dy = y2 - y1      //define distance between y axis enemy and player
  return Math.sqrt(dx * dx + dy * dy)   // calculation using Pythagorean theorem to get teth distance in 2D
}
let level = 1 //start at level 1
//create object with all levels
let levels = {
  1: {
    init: () => {
      parsedCollisions = collisionsLevel1.parse2D();
      collisionBlocks = parsedCollisions.createObjectsFrom2D();
      player.collisionBlocks = collisionBlocks;
      enemyBomb.position.x = 540;
      enemyBomb.position.y = 225;
      if (player.currentAnimation) player.currentAnimation.isActive = false;
      if (enemyBomb.currentAnimation) enemyBomb.currentAnimation.isActive = false;
      background = new Sprite({
        position: { x: 0, y: 0 },
        imageSrc: './img/backgroundLevel1.png',
      });
      doors = [
        new Sprite({
          position: {
            x: 767,
            y: 274,
          },
          imageSrc: './img/doorOpen.png',
          frameRate: 5,
          frameBuffer: 5,
          loop: false,
          autoplay: false,
        }),
      ];

     
    },
  },
  
  2: {
    init: () => {
      parsedCollisions = collisionsLevel2.parse2D();
      collisionBlocks = parsedCollisions.createObjectsFrom2D();
      player.collisionBlocks = collisionBlocks;
      enemyBomb.position.x = 545;
      enemyBomb.position.y = 418;
      
      player.position.x = 46;
      player.position.y = 158;
      if (player.currentAnimation) player.currentAnimation.isActive = false;
      if (enemyBomb.currentAnimation) enemyBomb.currentAnimation.isActive = false;
      background = new Sprite({
        position: { x: 0, y: 0 },
        imageSrc: './img/backgroundLevel2.png',
      });
      doors = [
        new Sprite({
          position: {
            x: 772,
            y: 336,
          },
          imageSrc: './img/doorOpen.png',
          frameRate: 5,
          frameBuffer: 5,
          loop: false,
          autoplay: false,
        }),
      ];
  
     
    },
  },
  
    3:{
      init: () =>{
        parsedCollisions  = collisionsLevel3.parse2D() //create global and then add into each level
        //console.log(parsedCollisions)
        collisionBlocks = parsedCollisions.createObjectsFrom2D()
        player.collisionBlocks = collisionBlocks
        player.position.x = 750;
        player.position.y = 230;
        enemyBomb.position.x = 135;
        enemyBomb.position.y = 335;
        if (player.currentAnimation) player.currentAnimation.isActive = false;
        if (enemyBomb.currentAnimation) enemyBomb.currentAnimation.isActive = false;
        background = new Sprite({         //use object to make position descriptive and easier to read 
        position: {x: 0, y: 0},
        imageSrc: './img/backgroundLevel3.png',
})
      doors =[
        new Sprite({
          position: {
            x: 176,
            y: 335,
          }, 
          imageSrc: './img/doorOpen.png',
          frameRate: 5,
          frameBuffer: 5,
          loop: false,
          autoplay: false,
        })
      ]
      },
      
    },
}


const keys = {
  w: {
    pressed: false,
  },
  a: {
    pressed: false,
  },
  s:{
    pressed: false,
  },
  d: {
    pressed: false,
  },
}
const overlay = {
  opacity: 0,
}


let lastThrowTime = 0;  // Variable to track the last time the throw animation was triggered
const throwCooldown = 1000;  // Set a cooldown period in milliseconds

function animate() {
  window.requestAnimationFrame(animate);
  const currentTime = Date.now(); // Get the current time
  //calculate distance between player and enemy 
  const distance = getDistanceBetween(
    player.position.x,
    player.position.y,
    enemyBomb.position.x,
    enemyBomb.position.y
  ); 
  const triggerDistance = 175;    // set threshold for distance between that initiates switching sprite
  const playerInFront = player.position.x < enemyBomb.position.x;

  // Check distance between player and trigger distance
  if (distance <= triggerDistance && playerInFront) {
    // Check if cooldown has elapsed since the last throw animation
    if (currentTime - lastThrowTime > throwCooldown) {
      // Check if the bomb is not already in the throwing animation
      if (!enemyBomb.currentAnimation || enemyBomb.currentAnimation.name !== 'throwing') {
        enemyBomb.switchSprite('throwing');
        lastThrowTime = currentTime;
        console.log('enemy throws');
      }
    }
  } else {
    // If the player is outside the trigger distance or behind the enemy, switch back to idle animation
    enemyBomb.switchSprite('idleRight');
  }
  const frameIndex = Math.floor(enemyBomb.frameCount / enemyBomb.frameRate) % 10;
  if (frameIndex === 5 && enemyBomb.currentAnimation.name === 'throwing') {
    // Trigger the bomb animation and release
    enemyBomb.switchSprite('boomon');
  }
  
  background.draw();
  collisionBlocks.forEach(collisionBlock => {
    collisionBlock.draw();
  })
  doors.forEach(door => {
    door.draw();
  })
  player.handleInput(keys );
  player.draw();
  player.update();
  enemyBomb.draw();
  enemyBomb.update();
  c.save(); //saves
  c.globalAlpha = overlay.opacity; //dynamically fades in and out must assign above

  c.fillStyle ='black';
  c.fillRect(0, 0, canvas.width, canvas.height);//fades canvas
  c.restore(); //restores canvas
}

levels[level].init();
animate(); // calling animate



