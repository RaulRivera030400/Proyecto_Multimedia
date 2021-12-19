// import Bootloader from './Bootloader.js';
// import Menu from './scenes/Menu.js';
import LoadScene from "./scenes/LoadScene.js";


const config = {
    title: "Parte_1",
    version: "0.0.1",
    type: Phaser.AUTO,
    scale: {
        parent: "phaser_container",
        width: 800,
        height: 600,
        // width: window.innerWidth*3,
        // height:window.innerHeight*3,
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    backgroundColor: "#4834d4",
    pixelArt: true,
    physics: {
        default: "arcade",
        "arcade": {
            gravity: {
                y: 500
            },
            debug: true
        }
    },
    scene: [
        LoadScene
        // Menu,
        // Bootloader
    ]
};

new Phaser.Game(config);