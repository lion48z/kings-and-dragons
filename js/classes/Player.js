
class Player extends Sprite {
    constructor({ collisionBlocks = [], imageSrc, frameRate }) {
      super({ imageSrc, frameRate });
      this.position = {
        x: 200,
        y: 200,
      };
      this.velocity = {
        x: 0,
        y: 0,
      }
     
      this.sides = {
        bottom: this.position.y + this.height
        }
      this.gravity = 1;
      this.collisionBlocks = collisionBlocks;
      //console.log(this.collisionBlocks);
    }
   /* draw() {
      // create character
      c.fillStyle = 'red';
      c.fillRect(this.position.x, this.position.y, this.width, this.height);
    }*/
    update() {
      this.position.x += this.velocity.x;
      //check horizontal collisions
      this.checkForHorizontalCollisions();
      this.applyGravity();
      this.checkForVerticalCollisions();
      
        
    }
    checkForHorizontalCollisions(){
      for (let i = 0; i < this.collisionBlocks.length; i++) {
        const collisionBlock = this.collisionBlocks[i];
        //if a collision exists use left side of player and right side of collision
        //use && for right side of player and left side of collision
        //check the top of player to bottom of collision for ceiling collision
        if (this.position.x <= collisionBlock.position.x + collisionBlock.width &&
          this.position.x + this.width >= collisionBlock.position.x &&
          this.position.y + this.height >= collisionBlock.position.y &&
          this.position.y <= collisionBlock.position.y + collisionBlock.height) {
            //collision on x axis going to the left 
            if (this.velocity.x < 0){
              this.position.x = collisionBlock.position.x + collisionBlock.width + 0.01
              break // once collision is detected break so loop stops running and moves on 
            }
            if (this.velocity.x > 0) {
              this.position.x = collisionBlock.position.x - this.width -0.01
              break
            }
        }
      } 
    }
    applyGravity(){
      //apply gravity
      this.velocity.y += this.gravity 
      this.position.y += this.velocity.y
    }
    checkForVerticalCollisions(){ 
            //check for vertical collisions 
            for (let i = 0; i < this.collisionBlocks.length; i++) {
              const collisionBlock = this.collisionBlocks[i];
             
              if (this.position.x <= collisionBlock.position.x + collisionBlock.width &&
                this.position.x + this.width >= collisionBlock.position.x &&
                this.position.y + this.height >= collisionBlock.position.y &&
                this.position.y <= collisionBlock.position.y + collisionBlock.height) {
                 
                  if (this.velocity.y < 0){
                    this.velocity.y = 0;
                    this.position.y = collisionBlock.position.y + collisionBlock.height + 0.01
                    break // once collision is detected break so loop stops running and moves on 
                  }
                  if (this.velocity.y > 0) {
                    this.velocity.y = 0
                    this.position.y = collisionBlock.position.y - this.height -0.01
                    break
                  }
              }
            }
  }
} 