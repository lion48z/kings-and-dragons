window.addEventListener('keydown', (event) => {
    //console.log(event); testing event listener
    switch (event.key) {
      case 'w':
        if (player.velocity.y === 0)  player.velocity.y = -25;
        //console.log("i pressed w")
        break;
        case 'a': 
        keys.a.pressed = true;
        //move player left
        break;
        case 'd':
         keys.d.pressed = true;
          //move player right 
        break;
        
    } 
  })
  window.addEventListener('keyup', (event) => {
    //console.log('Key up:', event.key);
    switch (event.key) {
        case 'a':
          // stop moving player to the left
          keys.a.pressed = false;
          player.velocity.x = 0; // set x velocity to 0
          break;
        case 'd':
          // stop moving player to the right
          keys.d.pressed = false;
          player.velocity.x = 0; // set x velocity to 0
          break;
      }
  })