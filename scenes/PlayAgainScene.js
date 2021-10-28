export default class PlayAgainScene extends Phaser.Scene {

    constructor() {
		super('PlayAgainScene');
	}

    init(data) {
        this.winnerInfo = data.text;
        this.previousScene = data.previousScene;
    }

	create() {

        let width = this.game.config.width;
        let height = this.game.config.height;

        // TODO - window size adjustable
        this.make.image({
            x: width / 2,
            y: height / 2,
            key: 'background',
            //scale according to brower window
            scale: {x: width / (1.2 * 3840), y: height / 2160}
        });

        // Add logo
        this.add.image(width / 2, height / 6.8, 'logo').setScale(2.2);

        // Add GameBoard
        var gameBoard = this.add.image(width / 2, height / 1.7, 'gameBoard').setScale(1.3);

        // Winner Information text
        this.add.text(width / 2, height / 2.3, this.winnerInfo, {
                      fontSize: '32px Arial',
                      fontStyle: 'bold',
                      fill: '#BF9001'})
                      .setOrigin(0.5, 0.5);

        // PlayAgain button, play another round with same mode (AI/2 Player)
        var playAgain = this.add.image(width / 2, height / 1.8, 'playAgain').setInteractive();
        playAgain.on('pointerdown', function () {
            if (this.previousScene == "PlayAIScene") {
                this.scene.start('PlayAIScene');
            }
            else {
                this.scene.start('PlayGameScene');
            }
        }, this);

        // Quit button, takes back to HomeScene
        var quit = this.add.image(width / 2, height / 1.4, 'quit').setInteractive();
        quit.on('pointerdown', function () {
            this.scene.start('HomeScene');
        }, this);
	}
}
