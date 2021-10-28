import BootScene from '/scenes/BootScene.js';
import HomeScene from '/scenes/HomeScene.js';
import PlayGameScene from '/scenes/PlayGameScene.js';
import PlayAIScene from '/scenes/PlayAIScene.js';
import PlayAgainScene from '/scenes/PlayAgainScene.js';
import RoundRectangleCanvasPlugin from '/node_modules/phaser3-rex-plugins/plugins/roundrectanglecanvas-plugin.js';

window.onload = function() {

    var config = {
        type: Phaser.AUTO,
        parent: gameDiv,
        width: window.innerWidth * window.devicePixelRatio,
        height: window.innerHeight * window.devicePixelRatio,
        scene: [BootScene, HomeScene, PlayGameScene,
                PlayAIScene, PlayAgainScene],
        pixelArt: true,
        scale: {
            mode: Phaser.Scale.FIT,
            autoCenter: Phaser.Scale.CENTER_BOTH,
        },
        plugins: {
            global: [{
                key: 'rexRoundRectangleCanvasPlugin',
                plugin: RoundRectangleCanvasPlugin,
                start: true
            }]
        }
    };

    var game = new Phaser.Game(config);
}
