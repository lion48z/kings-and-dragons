let canvas = document.querySelector('canvas');
let c = canvas.getContext('2d');
canvas.width = 1024; // 64*16
canvas.height = 576; // 64*9
class Sprite {
  constructor ({position}) {
    this.position = position;
    this.image = new Image();
    this.image.src ='img/backgroundLevel1.png' 
  }
  draw() {
    c.drawImage(this.image, this.position.x, this.position.y)
  }
}

const backgroundLevel1 = new Sprite({
  position: {x: 0, y: 0},
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
  if (keys.d.pressed) player.velocity.x = 5
    
  else if (keys.a.pressed)player.velocity.x = -5
  
  player.draw();
  player.update();
}

animate(); // calling animate



