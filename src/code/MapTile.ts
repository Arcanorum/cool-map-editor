const TILE_SIZE = 16;
const TILE_SCALE = 1;
const SCALED_TILE_SIZE = TILE_SIZE * TILE_SCALE;

/**
 * Extend the basic image game object.
 * Could use Sprite instead, but Image is a bit lighter so better for having many tiles.
 */
class MapTile extends Phaser.GameObjects.Image {

    sprite: Phaser.GameObjects.Image;
    
    constructor(scene: Phaser.Scene, row: number, col: number) {
        super(
            scene,
            SCALED_TILE_SIZE + col * TILE_SIZE * TILE_SCALE,
            SCALED_TILE_SIZE + row * TILE_SIZE * TILE_SCALE,
            // Use dirt by default so Phaser knows how big to make the image based on the texture size.
            // This shouldn't be shown at first, so could be any texture.
            'empty'
        );

        this.setScale(TILE_SCALE);
        
        // The grid should appear empty by default.
        // Use transparency instead of visiblity to maintain input events, as invisible sprites can't be interacted with.
        // this.alpha = 0.5;

        // Need to manually add this new display object to the scene render list as it (annoyingly)
        // isn't automatically added by Phaser when you pass the scene to the display object's constructor.
        scene.add.existing(this);

        this.setInteractive();

        this.on('pointerover', () => {
            // Make it pop a bit when hovered over.
            this.setScale(TILE_SCALE * 0.9);
        });
        this.on('pointerout', () => {
            // Reset scale when cursor leaves.
            this.setScale(TILE_SCALE);
        });
    }

    onPressed(tileName: string) {

    }
}

export default MapTile;