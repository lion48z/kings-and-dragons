class EnemyBomb extends Sprite {
    constructor({ collisionBlocks = [], imageSrc, frameRate, animations, loop }) {
      super({ imageSrc, frameRate, animations, loop });
      this.position = {
        x: 200,
        y: 200,
      };
      this.velocity = {
        x: 0,
        y: 0,
      };
      this.sides = {
        bottom: this.position.y + this.height,
      };
      this.gravity = 1;
      this.collisionBlocks = collisionBlocks;
      //console.log(this.collisionBlocks);
    }
  
    update() {
      // Implement the logic to update the position, velocity, and other properties of the enemyBomb
      this.velocity.y += this.gravity; // Simple gravity simulation
      this.position.x += this.velocity.x;
      this.position.y += this.velocity.y;
  
      // You can add collision detection or other logic here if needed
    }
  
    draw() {
      // Implement the logic to draw the enemyBomb on the canvas
      c.drawImage(
        this.image,
        this.position.x,
        this.position.y,
        this.width,
        this.height
      );
    }
  
    updateHitbox() {
      this.hitbox = {
        position: {
          x: this.position.x + 58,
          y: this.position.y + 34,
        },
        width: 50,
        height: 53,
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
  