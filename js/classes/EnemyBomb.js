class EnemyBomb extends Sprite {
    constructor({ collisionBlocks = [], imageSrc, frameRate, animations, loop }) {
      super({ imageSrc, frameRate, animations, loop });
      this.position = {
        x: 550, // Set your desired initial x position
        y: 250, // Set your desired initial y position
      };
      this.velocity = {
        x: 0,
        y: 0,
      };
      this.sides = {
        bottom: this.position.y + this.height,
      };
      this.gravity = 0; // Set gravity to zero to disable falling
      this.collisionBlocks = collisionBlocks;
      this.frameCount = 0;
    }
  
    update() {
      // Implement the logic to update the position, velocity, and other properties of the enemyBomb
      this.velocity.y += this.gravity; // Simple gravity simulation
      this.position.x += this.velocity.x;
      this.position.y += this.velocity.y;
  
      // You can add collision detection or other logic here if needed
    }
  
    draw() {
        //c.fillStyle = 'rgba(255, 0,0,0.5)';
      //c.fillRect(this.position.x, this.position.y, this.width, this.height);
      const frameIndex = Math.floor(this.frameCount / this.frameRate) % 10; // assuming 10 frames

      // Calculate the width and height of each frame
      const frameWidth = this.image.width / 10; // assuming 10 frames
      const frameHeight = this.image.height;
    
        // Draw the image with the calculated dimensions
        c.drawImage(
          this.image,
          frameIndex * frameWidth,
          0,
          frameWidth,
          frameHeight,
         
          this.position.x,
          this.position.y,
          frameWidth,
          frameHeight
        );
       this.frameCount++
      }
     /* switchSprite(name){
        if (this.image === this.animations[name].image) return;
        this.currentFrame = 0;
        this.image = this.animations[name].image;
        this.frameRate = this.animations[name].frameRate;
        this.frameBuffer = this.animations[name].frameBuffer;
        this.loop = this.animations[name].loop;
        this.currentAnimation = this.animations[name];
      }*/
      // Add a bomb animation configuration to the EnemyBomb class


// Modify the switchSprite method in the EnemyBomb class
switchSprite(name) {
  if (this.image === this.animations[name].image) return;


  // If transitioning from throwing to bomb, set up onComplete callback
  if (name === 'boomon' && this.currentAnimation && this.currentAnimation.name === 'throwing' && !this.animations[name].onComplete) {
    this.animations[name].onComplete = () => {
      // Transition to idleRight once bomb has been released
      this.switchSprite('idleRight');
    };
    console.log('Bomb animation triggered!');
  }
 
  this.currentFrame = 0;
  this.image = this.animations[name].image;
  this.frameRate = this.animations[name].frameRate;
  this.frameBuffer = this.animations[name].frameBuffer;
  this.loop = this.animations[name].loop;
  this.currentAnimation = this.animations[name];
}


  
    updateHitbox() {
      this.hitbox = {
        position: {
          x: this.position.x + 58,
          y: this.position.y + 34,
        },
        width: 50,
        height:53,
      };
    }
  
    checkForHorizontalCollisions() {
      for (let i = 0; i < this.collisionBlocks.length; i++) {
        const collisionBlock = this.collisionBlocks[i];
        //if a collision exists use left side of player and right side of collision
        //use && for right side of player and left side of collision
        //check the top of player to bottom of collision for ceiling collision
        if (
          this.hitbox.position.x <= collisionBlock.position.x + collisionBlock.width &&
          this.hitbox.position.x + this.hitbox.width >= collisionBlock.position.x &&
          this.hitbox.position.y + this.hitbox.height >= collisionBlock.position.y &&
          this.hitbox.position.y <= collisionBlock.position.y + collisionBlock.height
        ) {
          //collision on x axis going to the left
          if (this.velocity.x < 0) {
            const offset = this.hitbox.position.x - this.position.x;
            this.position.x = collisionBlock.position.x + collisionBlock.width - offset + 0.01;
            break; // once collision is detected break so loop stops running and moves on
          }
          if (this.velocity.x > 0) {
            const offset = this.hitbox.position.x - this.position.x + this.hitbox.width;
  
            this.position.x = collisionBlock.position.x - offset - 0.01;
            break;
          }
        }
      }
    }
  
    applyGravity() {
      //apply gravity
      this.velocity.y += this.gravity;
      this.position.y += this.velocity.y;
    }
  
    checkForVerticalCollisions() {
      //check for vertical collisions
      for (let i = 0; i < this.collisionBlocks.length; i++) {
        const collisionBlock = this.collisionBlocks[i];
  
        if (
          this.hitbox.position.x <= collisionBlock.position.x + collisionBlock.width &&
          this.hitbox.position.x + this.hitbox.width >= collisionBlock.position.x &&
          this.hitbox.position.y + this.hitbox.height >= collisionBlock.position.y &&
          this.hitbox.position.y <= collisionBlock.position.y + collisionBlock.height
        ) {
          if (this.velocity.y < 0) {
            this.velocity.y = 0;
            const offset = this.hitbox.position.y - this.position.y;
            this.position.y = collisionBlock.position.y + collisionBlock.height - offset + 0.01;
            break; // once collision is detected break so loop stops running and moves on
          }
          if (this.velocity.y > 0) {
            this.velocity.y = 0;
            const offset = this.hitbox.position.y - this.position.y + this.hitbox.height;
            this.position.y = collisionBlock.position.y - offset - 0.01;
            break;
          }
        }
      }
    }
  }
  