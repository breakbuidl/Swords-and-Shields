const NOBODY = 0;
const PLAYER_SWORD = 1;
const PLAYER_SHIELD = 2;

export default class PlayGameScene extends Phaser.Scene {

    constructor() {
        super('PlayGameScene');
    }

    create() {

        var width = this.game.config.width;
        var height = this.game.config.height;

        let self = this;
        self.gameOver = false;
        self.whoseTurn = PLAYER_SWORD;

        self.boardArray = [];

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

        // hard-coded for the time being
        let x = 840;
        let y = 340;
        let cellKey = 0;

        for (var row = 0; row < 4; row++) {
            y = y + 76;

            for (var col = 0; col < 4; col++) {
                let cell = this.add.image(x + (col * 75), y, 'cell');
                cell.cellKey = cellKey++;
                cell.occupiedBy = NOBODY;
				cell.setInteractive();
				cell.on('pointerdown', self.handleClick);

                self.boardArray.push({
					occupiedBy: NOBODY,
					playerImage: null,
				});
            }
        }

        self.whoseTurnIsIt();
    }

    handleClick(event) {
        console.log(this);
        let offset = this.cellKey;
        let owner = this.scene;

        if (owner.gameOver) {
            return true;
        }

        let occupiedBy = owner.boardArray[offset].occupiedBy;

        let playerImage;
        if (occupiedBy == NOBODY) {
			if (owner.whoseTurn == PLAYER_SWORD) {
				playerImage = owner.add.image(this.x, this.y,
					'sword', 1);

				occupiedBy = PLAYER_SWORD;
			}
            else {
				playerImage = owner.add.image(this.x, this.y,
					'shield', 0);

				occupiedBy = PLAYER_SHIELD;
			}

			owner.boardArray[offset].occupiedBy = occupiedBy;
            owner.boardArray[offset].playerImage = playerImage;

            owner.checkForWinner(owner.whoseTurn);

            if (owner.whoseTurn == PLAYER_SWORD) {
				owner.whoseTurn = PLAYER_SHIELD;
			} else {
				owner.whoseTurn = PLAYER_SWORD;
			}

		}

		owner.whoseTurnIsIt();
	}

    whoseTurnIsIt() {
        let x = this.game.config.width / 2;
        let y = this.game.config.height / 1.35;
        let t = (this.whoseTurn == PLAYER_SWORD ? "Player 1's turn" : "Player 2's turn");

        let label = this.add.text(x, y, t, { fontSize: '32px Arial', fontStyle: 'bold', fill: '#CB9A30' });
        label.setOrigin(0.5, 0.5);

        //todo - make the concerned label permanent
        this.tweens.add({
			targets: label,
			alpha: 0,
			ease: 'Power1',
            duration: 4000,
		});
    }

    checkForWinner(playerID) {
        let possibleWins = [
            [0,1,2,3],
            [4,5,6,7],
            [8,9,10,11],
            [12,13,14,15],
            [0,4,8,12],
            [1,5,9,13],
            [2,6,10,11],
            [3,7,11,15],
            [0,5,10,15],
            [3,6,9,12]
        ];

        for (let line = 0; line < possibleWins.length; line++) {
			let winLine = possibleWins[line];

			if ((this.boardArray[winLine[0]].occupiedBy == playerID) &&
				(this.boardArray[winLine[1]].occupiedBy == playerID) &&
                (this.boardArray[winLine[2]].occupiedBy == playerID) &&
				(this.boardArray[winLine[3]].occupiedBy == playerID)) {
                    this.broadcastWinner(playerID, winLine);
					return true;
			}
		}

        let movesLeft = false;
		for (let n = 0; n < this.boardArray.length; n++) {
			if (this.boardArray[n].occupiedBy == NOBODY) {
				movesLeft = true;
			}
		}

        if (!movesLeft) {
			this.broadcastWinner(NOBODY);
		}

		return false;
    }

	broadcastWinner(playerID, winLine) {
		this.gameOver = true;
        console.log(playerID + " wins");

        this.scene.start('PlayGameScene');
	}
}
