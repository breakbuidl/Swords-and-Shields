export default class BootScene extends Phaser.Scene {

    constructor() {
		super('BootScene');
	}

	preload() {
        this.load.setBaseURL('assets/');
        this.load.image('background', 'act1scene1/background.png');
        this.load.image('logo', 'act1scene1/logo.png');
        this.load.image('gameBoard', 'act1scene1/gameBoard.png');
        this.load.image('cell', 'act1scene1/cell.png');
        this.load.image('sword', 'act1scene1/X.png');
        this.load.image('shield', 'act1scene1/O.png');
        this.load.image('play', 'act1scene1/play.png');
        this.load.image('playAgain', 'act1scene1/playAgain.png');
        this.load.image('quit', 'act1scene1/quit.png');
	}

	create() {
        this.scene.start('HomeScene');
	}
}
