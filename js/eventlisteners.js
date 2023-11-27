window.addEventListener('keydown', (event) => {
  if (player.preventInput) return
  switch (event.key) {
    case 'w':
      for (let i = 0; i < doors.length; i++) {
        const door = doors[i]

        if (
          player.hitbox.position.x + player.hitbox.width <=
            door.position.x + door.width &&
          player.hitbox.position.x >= door.position.x &&
          player.hitbox.position.y + player.hitbox.height >= door.position.y &&
          player.hitbox.position.y <= door.position.y + door.height
        ) 
        
        //console.log('we are colliding with door');
        {
          player.velocity.x = 0
          player.velocity.y = 0
          player.preventInput = true
          player.switchSprite('enterDoor')
          door.play()
          return
        }
      }
      if (player.velocity.y === 0) player.velocity.y = -25

      break
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