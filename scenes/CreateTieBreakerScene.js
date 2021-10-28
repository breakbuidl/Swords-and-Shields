export default class CreateTieBreakerScene extends Phaser.Scene {
    constructor() {
        super('CreateTieBreakerScene');
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
        let gameBoard = this.add.image(width / 2, height / 1.7, 'gameBoard').setScale(1.3);

        let label = this.make.text({
                        x: width / 2.45,
                        y: height / 2.3,
                        text: "Choose Tie-Breaker\nPattern",
                        style: {fontSize: '32px Arial',
                                fontStyle: 'bold',
                                fill: '#CB9A30',
                                align: 'center'}
                        });


        this.add.rexRoundRectangleCanvas(width / 2, height / 1.5, 350, 220, 30, 0xBF9001, 0xBF9001, 2);

        var tieBreakerPattern = "patternDefault";

        console.log(tieBreakerPattern);

        let create = this.add.image(width / 2, height / 1.08, 'create').setInteractive();
        create.on('pointerdown', function() {
            this.scene.start('PlayGameScene', {tieBreakerPattern: tieBreakerPattern});
        }, this);
    }
}
