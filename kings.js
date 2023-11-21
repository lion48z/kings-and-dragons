let canvas = document.querySelector('canvas');
let c = canvas.getContext('2d');
canvas.width = 1024; // 64*16
canvas.height = 576; // 64*9



const player = new Player();

function animate() {
  window.requestAnimationFrame(animate);
  // create canvas
  c.fillStyle = 'white';
  c.fillRect(0, 0, canvas.width, canvas.height); // clear to make it look like the box is moving using canvas fillRect
  player.draw();
  player.update();
}

animate(); // calling animate


window.addEventListener('keydown', (event) => {
  //console.log(event); testing event listener
  switch (event.key) {
    case 'w':
      if (player.velocity.y === 0)  player.velocity.y = -10;
      //console.log("i pressed w")
    
  } 
})
