export default class HomeScene extends Phaser.Scene {

    constructor() {
		super('HomeScene');
	}

	preload() {
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

        // logo
        this.add.image(width / 2, height / 2.8, 'logo').setScale(2.2);

        //
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
