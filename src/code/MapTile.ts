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
            // +10 so it isn't right up against the border.
            10 + col * TILE_SIZE * TILE_SCALE,
            10 + row * TILE_SIZE * TILE_SCALE,
            // Use a special empty texture by default so Phaser knows how big to make the image based on the texture size.
            // Could just give it 0 transparency to start with to make in invisible, but then it is liable to show
            // whatever is behind it (i.e. the game canvas colour), which may be unpredictable.
            'empty'
        );

        // Need to manually add this new display object to the scene render list as it (annoyingly)
        // isn't automatically added by Phaser when you pass the scene to the display object's constructor.
        scene.add.existing(this);

        this.setScale(TILE_SCALE);

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
}

export default MapTile;