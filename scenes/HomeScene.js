export default class HomeScene extends Phaser.Scene {

    constructor() {
		super('HomeScene');
	}

	preload() {
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

        this.add.image(width / 2, height / 2.8, 'logo').setScale(2.2);

        let play = this.add.image(width / 2, height / 1.3, 'play').setInteractive();
        play.on('pointerdown', function() {
			this.scene.start('PlayGameScene', {tieBreakerPattern: "patternDefault"});
		}, this);

        let ai = this.add.image(width / 2.5, height / 1.7, 'ai').setInteractive();
        ai.on('pointerdown', function() {
			this.scene.start('PlayAIScene');
		}, this);

        let create = this.add.image(width / 1.7, height / 1.7, 'create').setInteractive();
        create.on('pointerdown', function() {
            this.scene.start('CreateTieBreakerScene');
        }, this);
	}
}
