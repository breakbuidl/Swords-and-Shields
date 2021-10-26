import BootScene from '/scenes/BootScene.js';
import HomeScene from '/scenes/HomeScene.js';
import PlayGameScene from '/scenes/PlayGameScene.js';

window.onload = function() {

    var config = {
        type: Phaser.AUTO,
        parent: gameDiv,
        width: window.innerWidth * window.devicePixelRatio,
        height: window.innerHeight * window.devicePixelRatio,
        scene: [BootScene, HomeScene, PlayGameScene],
        pixelArt: true,
        scale: {
            mode: Phaser.Scale.FIT,
            autoCenter: Phaser.Scale.CENTER_BOTH,
        }
    };

    var game = new Phaser.Game(config);
}
