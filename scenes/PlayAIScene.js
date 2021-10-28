const NOBODY = 0;
const PLAYER_SWORD = 1;
const PLAYER_AI = 2;

var BOARD = new Array();
var choice = [];
var winner = 0;

// Simulation level limit used in COMPUTER algorithm
var depthLimit = 9;

export default class PlayAIScene extends Phaser.Scene {
    constructor() {
        super('PlayAIScene');
    }

    create() {

        let width = this.game.config.width;
        let height = this.game.config.height;

        let self = this;
        self.gameOver = false;
        self.whoseTurn = PLAYER_SWORD;

        self.boardArray = []; // one with details, playerSprite etc.
        self.board = [];  // one to move around
        self.totalCellsOccupied = 0;

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

        //cell.png: width 70, height 71
        let x = (width / 2) - (295 / 2) + 30;
        let y = (height / 2) -(299 / 2);
        let cellKey = 0;

        for (var row = 0; row < 4; row++) {
            y = y + 76;

            for (var col = 0; col < 4; col++) {
                let cell = this.add.sprite(x + (col * 75), y, 'cell').setInteractive();;
                cell.cellKey = cellKey++;
                cell.occupiedBy = NOBODY;
				cell.on('pointerdown', self.handleClick);

                BOARD.push(NOBODY);
                self.boardArray.push({
					occupiedBy: NOBODY,
					playerSprite: null,
                    x: cell.x,
                    y: cell.y
				});
            }
        }

        //add whoseTurnIsIt text
        this.label = this.add.text(width / 2, height / 1.33, "Your turn",
                                   { fontSize: '28px Arial', fontStyle: 'bold', fill: '#BF9001' });
        this.label.setOrigin(0.5, 0.5);
    }

    whoseTurnIsIt() {
        let self = this;
        let t = (this.whoseTurn == PLAYER_SWORD ? "Your turn" : "AI is thinking");

        if (winner) {
            switch (winner) {
                case 1:
                    t = "YOU WON!";
                    break;
                case 2:
                    t = "YOU LOST";
                    break;
                case 3:
                    t = "IT'S A TIE!";
                    break;
            }
            this.label.setText(t);
            self.scene.start('PlayAgainScene', {text: t,
                                                   previousScene: "PlayAIScene"});
            // setTimeout(function() {
            //     self.scene.start('PlayAgainScene',
            //                      {text: t, previousScene: "PlayAIScene"});
            // }, 800);
        }
        this.label.setText(t);
    }

    handleClick(event) {
        let offset = this.cellKey;
        let owner = this.scene;

        if (owner.gameOver) {
            return true;
        }

        let occupiedBy = owner.boardArray[offset].occupiedBy;

        let playerSprite;
        if (occupiedBy == NOBODY && owner.whoseTurn == PLAYER_SWORD) {
            playerSprite = owner.add.sprite(this.x, this.y, 'sword', 1);
            occupiedBy = PLAYER_SWORD;

            BOARD[offset] = PLAYER_SWORD;
            owner.boardArray[offset].occupiedBy = occupiedBy;
            owner.boardArray[offset].playerSprite = playerSprite;
            owner.totalCellsOccupied++;

            winner = owner.checkForWinner(BOARD);

            owner.switchTurn();
            owner.whoseTurnIsIt();
            // setTimeout(function() {
            //     owner.AIMove(offset);
            // }, 200);
            owner.AIMove(offset);
        }
    }

    AIMove(userMove) {
        if (this.gameOver) {
            return true;
        }

        let self = this;
        let playerSprite;

        if (this.totalCellsOccupied == 1) {
            this.getStaticMove(userMove);
        }
        else {
            this.alphaBetaMinimax(BOARD, 0, -Infinity, +Infinity);
        }

        playerSprite = this.add.sprite(this.boardArray[choice].x,
                                       this.boardArray[choice].y,
                                       'shield', 1);

        BOARD[choice] = PLAYER_AI;
        this.boardArray[choice].occupiedBy = PLAYER_AI;
        this.boardArray[choice].playerSprite = playerSprite;
        this.totalCellsOccupied++;

        winner = this.checkForWinner(BOARD);

        this.switchTurn();
        this.whoseTurnIsIt();
    }

    alphaBetaMinimax(node, depth, alpha, beta) {
        // If game is over or too long, return simulation score
        let gameState = this.checkForWinner(node);
        if (gameState !== 0 || depth > depthLimit)
            return this.gameScore(gameState, depth);

        // Simulation setup
        depth += 1;
        var availableMoves = this.getAvailableMoves(node);
        var move, result;

        if (this.whoseTurn === PLAYER_AI) {
            // Run alphaBetaMinimax for every UNOCCUPIED move
            for (var i = 0; i < availableMoves.length; i++) {
                move = availableMoves[i];
                // Get new simulation score
                result = this.alphaBetaMinimax(this.getNewState(move, node), depth, alpha, beta);
                // Reset node
                node = this.undoMove(node, move);
                // Pick best result
                if (result > alpha) {
                    alpha = result;

                    if (depth == 1)
                        choice = move;
                }
                else if (alpha >= beta) {
                    return alpha;
                }
            }
            return alpha;
        }
        else {
            for (let i = 0; i < availableMoves.length; i++) {
                // Run alphaBetaMinimax for every UNOCCUPIED move
                move = availableMoves[i];
                // Get simulation score
                result = this.alphaBetaMinimax(this.getNewState(move, node), depth, alpha, beta);
                // Reset node
                node = this.undoMove(node, move);
                // Pick best result
                if (result < beta) {
                    beta = result;
                    if (depth == 1)
                        choice = move;
                }
                else if (beta <= alpha) {
                    return beta;
                }
            }
            return beta;
        }
    }

    // Gets an array of moves not claimed by either player
    getAvailableMoves(board) {
      var possibleMoves = new Array();
      for (let i = 0; i < this.boardArray.length; i++) {
          if (this.boardArray[i].occupiedBy === NOBODY)
              possibleMoves.push(i);
      }
      return possibleMoves;
    }


    // Gives a simulated board rating based on number of moves and winner
    gameScore(gameState, depth) {
      switch (gameState) {
        case 3:
          // Tie
          return 0;
        case 2:
          // AI wins
          return depth - 16;
        case 1:
          // USER wins
          return 16 - depth;
        case 0:
          // Simulation is too deep
          return 0;
      }
    }

    getStaticMove(userMove) {
        switch (userMove) {
          case 0:
            choice = 5;
            break;
          case 1:
            choice = 5;
            break;
          case 2:
            choice = 9;
            break;
          case 3:
            choice = 5;
            break;
          case 4:
            choice = 7;
            break;
          case 5:
            choice = 6;
            break;
          case 6:
            choice = 5;
            break;
          case 7:
            choice = 1;
            break;
          case 8:
            choice = 3;
            break;
          case 9:
            choice = 5;
            break;
          case 10:
            choice = 6;
            break;
          case 11:
            choice = 9;
            break;
          case 12:
            choice = 1;
            break;
          case 13:
            choice = 10;
            break;
          case 14:
            choice = 2;
            break;
          case 15:
            choice = 12;
            break;
        }
    }

    // Checks if given board has a winning combination
    checkForWinner(board) {
      // Check for horizontal wins
      for (var i = 0; i <= 12; i += 4) {
        if (
          board[i] !== NOBODY &&
          board[i] === board[i + 1] &&
          board[i] === board[i + 2] &&
          board[i] === board[i + 3]
        )
          return board[i] == PLAYER_SWORD ? 1 : 2;
      }

      // Check for vertical wins
      for (var i = 0; i <= 3; i++) {
        if (
          board[i] !== NOBODY &&
          board[i] === board[i + 4] &&
          board[i] === board[i + 8] &&
          board[i] === board[i + 12]
        )
          return board[i] == PLAYER_SWORD ? 1 : 2;
      }

      // Check for main diagonal win
      if (
        board[0] !== NOBODY &&
        board[0] === board[5] &&
        board[0] === board[10] &&
        board[0] === board[15]
      ) {
        return board[0] == PLAYER_SWORD ? 1 : 2;
      }
      // Check for secondary diagonal win
      if (
        board[3] !== NOBODY &&
        board[3] === board[6] &&
        board[3] === board[9] &&
        board[3] === board[12]
      ) {
        return board[3] == PLAYER_SWORD ? 1 : 2;
      }

      // Game is not over
      for (var i = 0; i < 16; i++) {
        if (board[i] === NOBODY)
            return 0;
      }

      // It is a tie
      return 3;
    }

    // Simulates board with a possible move
    getNewState(move, board) {
        board[move] = this.whoseTurn;
        this.switchTurn();
        return board;
    }

    switchTurn() {
        if (this.whoseTurn === PLAYER_SWORD)
            this.whoseTurn = PLAYER_AI;
        else
            this.whoseTurn = PLAYER_SWORD;
    }

    // Cleans the move COMPUTER created in #alphaBetaMinimax for simulated board
    undoMove(board, move) {
      board[move] = NOBODY;
      this.switchTurn();
      return board;
    }
}
