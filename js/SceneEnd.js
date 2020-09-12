export default class SceneEnd extends Phaser.Scene {
	constructor() {
	    super({ key: 'sceneEnd' });
	}

	preload() {  
          this.load.image('endImage', 'assets/image/gameover.png');
          this.load.image('restart', 'assets/image/restart.png');
	}

	create() {
		this.add.image(300, 75, 'endImage');
        this.add.image(300, 100, 'restart');
       
        this.input.once('pointerdown', function () {
			this.scene.scene.start('playgame');
        });
	}

	
}