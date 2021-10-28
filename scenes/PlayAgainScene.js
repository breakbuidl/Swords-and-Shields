export default class PlayAgainScene extends Phaser.Scene {

    constructor() {
		super('PlayAgainScene');
	}

	preload() {
	}

    init(data) {
        this.winnerInfo = data.text;
        this.previousScene = data.previousScene;
    }

	create() {

        var width = this.game.config.width;
        var height = this.game.config.height;

        // todo - if image loaded in smaller/different (not full screen) sized  window
        //  and then window size changed, e j image scale thase, e change karvanu che
        this.make.image({
            x: width / 2,
            y: height / 2,
            key: 'background',
            //koi pan size ni browser window kholo, barobar scale mate
            scale: {x: width / (1.2 * 3840), y: height / 2160}
        });

        // Add logo
        this.add.image(width / 2, height / 6.8, 'logo').setScale(2.2);

        // Add GameBoard
        var gameBoard = this.add.image(width / 2, height / 1.7, 'gameBoard').setScale(1.3);


        this.add.text(width / 2, height / 2.3, this.winnerInfo,
                      { fontSize: '32px Arial', fontStyle: 'bold',
                      fill: '#BF9001' }).setOrigin(0.5, 0.5);

        var playAgain = this.add.image(width / 2, height / 1.8, 'playAgain').setInteractive();
        playAgain.on('pointerdown', function () {
            if (this.previousScene == "PlayAIScene") {
                this.scene.start('PlayAIScene');
            }
            else {
                this.scene.start('PlayGameScene');
            }
        }, this);
        var quit = this.add.image(width / 2, height / 1.4, 'quit').setInteractive();
        quit.on('pointerdown', function () {
            this.scene.start('HomeScene');
        }, this);

	}
}
