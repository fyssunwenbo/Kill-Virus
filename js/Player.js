export default class Player extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y) {
      super(scene, x, y, 'character');
      this.score = 0;
      this.aux = 0;
      this.life = 3;
      this.isNinja = false;
      
      this.scene.add.existing(this);
      this.scene.physics.add.existing(this);
      this.scene.sys.displayList.add(this);
      this.scene.sys.updateList.add(this);
      this.scene.sys.arcadePhysics.world.enableBody(this, 0);
      this.body.setCollideWorldBounds(true);
      this.body.setBounce(0.2);
        
      this.cursors = this.scene.input.keyboard.createCursorKeys();
      this.label1 = this.scene.add.text(450, 16, this.score, {font: "20px", fill: '#000'});
      this.label2 = this.scene.add.text(16, 16, this.life, {font: "20px", fill: '#000'});

      this.label1.text ="Score: " + this.score;
      this.label2.text ="Life: " + this.life;
    }
  
    point(num) {
      this.score = this.score + num;
      this.updateScore();
    }

    updateLife() {
      this.life--;
      this.label2.text ="Life: "+ this.life;
    }

    setIsNinja(valor){
        this.isNinja = valor;
    }

    getIsNinja(){
       return this.isNinja;
    }

    getLife(){
      if(this.life <= 0){
       this.life = 0;
      }
      return this.life;
    }
  
    preUpdate(t,d) {
        super.preUpdate(t,d);
        this.aux++;
        if(this.aux % 50 == 0){
          this.score++;
          this.label1.text ="Score: " + this.score;
        }
        if (this.cursors.left.isDown) {
            this.body.setVelocityX(-160);
            console.log("dpwn");

            this.isNinja ? this.play('ninjaLeft', true) : this.play('left', true);
        }
        else if (this.cursors.right.isDown) {
            this.body.setVelocityX(160);

            this.isNinja ? this.play('ninjaRight', true) : this.play('right', true);
        }
        else if (this.cursors.down.isDown) {
          this.body.setVelocityY(200);

          this.isNinja ? this.play('ninjaRight', true) : this.play('right', true);
      }
        else {
            this.body.setVelocityX(0);

            this.isNinja ? this.play('ninjaTurn', true) : this.play('turn', true);
        }

        if (this.cursors.up.isDown && this.body.touching.down) {
            this.body.setVelocityY(-320);
        }
  
    }
  }
  