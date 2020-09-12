//var gameOver = false;
import Player from './Player.js';
import Virus from './Virus.js';
import Mask from './Mask.js';

export default class Game extends Phaser.Scene {
	constructor() {
		super({ key: 'playgame' });
	}
	preload() {
		this.load.image('background', 'assets/image/background.png');
		this.load.image('ground', 'assets/image/line.png');
		this.load.image('dead', 'assets/image/dead.png');
		this.load.spritesheet('virus', 'assets/image/virus1.png', { frameWidth: 56, frameHeight: 26 });
		this.load.image('mask', 'assets/image/mask.png');
		this.load.spritesheet('character',
			'assets/image/character.png', { frameWidth: 75, frameHeight: 95 });
		this.load.audio('back', 'assets/audio/back.mp3');
		this.load.audio('hit', 'assets/audio/hit.mp3');

	}

	create() {
		this.gameover = false;
		//this.add.image(300, 60, 'background');
		this.bg = this.add.tileSprite(0, 75, this.game.config.width * 2, this.game.config.height * 1.6, 'background');

		//this.cursors = this.input.keyboard.createCursorKeys()

		this.anims.create({
			key: 'left',
			frames: this.anims.generateFrameNumbers('character', { start: 0, end: 2 }),
			frameRate: 10,
			repeat: -1
		});

		this.anims.create({
			key: 'turn',
			frames: [{ key: 'character', frame: 0 }],
			frameRate: 20
		});

		this.anims.create({
			key: 'right',
			frames: this.anims.generateFrameNumbers('character', { start: 0, end: 2 }),
			frameRate: 10,
			repeat: -1
		});

		this.anims.create({
			key: 'down',
			frames: this.anims.generateFrameNumbers('character', { start: 0, end: 2 }),
			frameRate: 10,
			repeat: -1
		});

		this.anims.create({
			key: 'ninjaLeft',
			frames: this.anims.generateFrameNumbers('character', { start: 3, end: 5 }),
			frameRate: 10,
			repeat: -1
		});

		this.anims.create({
			key: 'ninjaTurn',
			frames: [{ key: 'character', frame: 3 }],
			frameRate: 20
		});

		this.anims.create({
			key: 'ninjaRight',
			frames: this.anims.generateFrameNumbers('character', { start: 3, end: 5 }),
			frameRate: 10,
			repeat: -1
		});

		
		this.anims.create({
			key: 'ninjaDown',
			frames: this.anims.generateFrameNumbers('character', { start: 3, end: 5 }),
			frameRate: 10,
			repeat: -1
		});

		this.anims.create({
			key: 'viru',
			frames: this.anims.generateFrameNumbers('virus', { start: 0, end: 2 }),
			frameRate: 10,
			repeat: -1
		});

		this.player = new Player(this, 30, 75);
		this.player.setScale(0.45);

		this.platforms = this.physics.add.staticGroup();
		this.platforms.create(300, 150, 'ground').setScale(2).refreshBody();

		this.viruses = this.physics.add.group({
			allowGravity: false
		});

		this.masks = this.physics.add.group({
			allowGravity: false
		});

		this.time.addEvent({
			delay: 1000,
			callback: addVirus,
			callbackScope: this,
			loop: true
		});

		this.time.addEvent({
			delay: 5000,
			callback: addMask,
			callbackScope: this,
			loop: true
		});

		function addMask() {
			this.x = Phaser.Math.Between(600 * 0.2, 600 * 0.7);
			this.y = Phaser.Math.Between(0, 150 - 32);
			this.mask = new Mask(this, this.x, this.y);
			this.masks.add(this.mask);

			//mask = masks.create(x, y, 'mask');
		}
		function addVirus() {
			this.y = Phaser.Math.Between(0, 150 - 40);
			this.virus = new Virus(this, 600, this.y);
			this.viruses.add(this.virus);
		}

		// Sonido
		const config = {
			mute: false,
			volume: 0.6,
			rate: 1,
			detune: 0,
			seek: 0,
			loop: false,
			delay: 0
		};

		this.hit = this.sound.add('hit', config);

		this.bgm = this.sound.add('back', config);
		this.bgm.setLoop(true);
		this.bgm.play();

	}

	update(titleme, delta) {
		this.bg.tilePositionX += 2;
		this.physics.add.collider(this.player, this.platforms);

		this.physics.add.collider(
			this.player,
			this.viruses,
			function (player, viruses) {
				viruses.destroy();
				this.hit.play();
				if (this.player.getIsNinja() == false) {
					this.player.updateLife();
				}
				else this.player.setIsNinja(false);
			}.bind(this));

		this.physics.add.collider(
			this.player,
			this.masks,
			function (player, masks) {
				//mask.disableBody(true, true);
				this.hit.play();
				this.player.setIsNinja(true);
				masks.destroy();

			}.bind(this));

		if (this.player.getLife() <= 0) {
			this.player.setTexture('dead');
			this.scene.pause('playgame');
			this.scene.launch('sceneEnd');
			this.bgm.stop();
		}
	}
}