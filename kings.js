let canvas = document.querySelector('canvas');
let c = canvas.getContext('2d');
canvas.width = 1024; // 64*16
canvas.height = 576; // 64*9
const collisionBlocks = []
 const parsedCollisions = collisionsLevel1.parse2D()
 //console.log(parsedCollisions)
 parsedCollisions.forEach((row, y) => {
    //console.log(row) 
    row.forEach((symbol, x) => {
        //console.log(symbol)
        if (symbol === 292) {
           //push a new collision into collision blocks array
           collisionBlocks.push(new CollisonBlock({
                position: {
                    x: x *64,
                    y: y * 64,
                },
           })
           )
        }
    })
})

const backgroundLevel1 = new Sprite({         //use object to make position descriptive and easier to read 
  position: {x: 0, y: 0},
  imageSrc: './img/backgroundLevel1.png',
})
const player = new Player();
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

function animate() {
  window.requestAnimationFrame(animate);
  
  backgroundLevel1.draw();
  collisionBlocks.forEach(collisionBlock => {
    collisionBlock.draw();
  })
  player.velocity.x = 0
  if (keys.d.pressed) player.velocity.x = 5
    
  else if (keys.a.pressed)player.velocity.x = -5
  
  player.draw();
  player.update();
}

animate(); // calling animate



