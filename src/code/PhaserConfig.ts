import MapEditor from "./MapEditor";

const config = {
    type: Phaser.AUTO,
    backgroundColor: '#125555',
    width: 100,
    height: 100,
    scene: MapEditor,
    pixelArt: true,
    antialias: false,
    scale: {
        mode: Phaser.Scale.FIT,
    },
};

// Export a reference to the finished game object so it can be used elsewhere if needed.
export const game = new Phaser.Game(config);
