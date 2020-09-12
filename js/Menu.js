import Game from './Game.js';

export default class Menu extends Phaser.Scene {
	constructor() {
	    super({ key: 'menu' });
	}
	preload() {  
		  this.load.image('preloaderBackground', 'assets/image/background.png');
		  this.load.image('title', 'assets/image/title2.png');
			this.load.image('inicio', 'assets/image/mask.png');
		}

	create() {
		  this.add.image(300, 75, 'preloaderBackground');
		  this.add.image(300, 40, 'title');
		  this.playButton = this.add.image(300, 80, 'inicio').setInteractive();
		

	    this.playButton.on('pointerdown', function(){
	    	this.scene.scene.stop('menu');
			this.scene.scene.start('playgame');
	    });
	}

	
}