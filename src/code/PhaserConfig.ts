import MapEditor from "./MapEditor";

const config = {
    type: Phaser.AUTO,
    backgroundColor: '#125555',
    width: 800,
    height: 600,
    scene: MapEditor
};

// Export a reference to the finished game object so it can be used elsewhere if needed.
export const game = new Phaser.Game(config);
