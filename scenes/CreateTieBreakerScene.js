export default class CreateTieBreakerScene extends Phaser.Scene {
    constructor() {
        super('CreateTieBreakerScene');
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
        this.add.image(width / 2, height / 6.8, 'logo').setScale(2.2);

        var gameBoard = this.add.image(width / 2, height / 1.7, 'gameBoard').setScale(1.3);

        var label = this.make.text({x: width / 2.45,
                                    y: height / 2.3,
                                    text: "Choose Tie-Breaker\nPattern",
                                    style: {fontSize: '32px Arial',
                                            fontStyle: 'bold',
                                            fill: '#CB9A30',
                                            align: 'center'}
                                        });


        this.add.rexRoundRectangleCanvas(width / 2, height / 1.5, 350, 220, 30, 0xBF9001, 0xBF9001, 2);
        // this.add.image(width / 2, )

        var tieBreakerPattern = "patternDefault";

        console.log(tieBreakerPattern);

        // pattern4.drag = this.plugins.get('rexdragplugin').add(pattern4);
        // pattern4.drag.drag();

        let create = this.add.image(width / 2, height / 1.08, 'create').setInteractive();
        create.on('pointerdown', function() {
            this.scene.start('PlayGameScene', {tieBreakerPattern: tieBreakerPattern});
        }, this);

    }
}
