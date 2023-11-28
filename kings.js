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
      imageSrc: './img/Pigthrowingabomb/idle.png',
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

let level = 1 //start at level 1
//create object with all levels
let levels = {
  1: {
    init: () => {
      parsedCollisions = collisionsLevel1.parse2D();
      collisionBlocks = parsedCollisions.createObjectsFrom2D();
      player.collisionBlocks = collisionBlocks;
      enemyBomb.position.x = 550;
      enemyBomb.position.y = 250;
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
      enemyBomb.position.x = 550;
      enemyBomb.position.y = 440;
      
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
        enemyBomb.position.x = 145;
        enemyBomb.position.y = 360;
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
  d: {
    pressed: false,
  },
}
const overlay = {
  opacity: 0,
}

function animate() {
  window.requestAnimationFrame(animate);
  
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



