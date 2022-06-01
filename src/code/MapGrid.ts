import MapTile from "./MapTile";

const GRID_ROWS = 4;
const GRID_COLS = 4;

class MapGrid {
    tiles: Array<Array<MapTile>> = [];

    constructor(scene: Phaser.Scene) {
        for(let row=0; row<GRID_ROWS; row+=1){
            // Add a new row for the cols to be added to.
            this.tiles.push([]);

            for(let col=0; col<GRID_COLS; col+=1){
                this.tiles[row].push(new MapTile(scene, row, col));
            }
        }
    }

    /**
     * Since we are using spacebar to activate the pasting of the selected tile, we don't get pointer events (i.e. 'pointerdown'),
     * so we need to do this manually by checking each tile in the grid against the current cursor position to find any that overlap.
     */
    checkTileCollisions() {
        for(const row of this.tiles){
            for(const tile of row) {
                if(tile
                    .getBounds()
                    .contains(
                        tile.scene.input.activePointer.x,
                        tile.scene.input.activePointer.y
                    )
                ){
                    return tile;
                }
            }
        }
    }

    updateTile(textureName: string) {
        const tile = this.checkTileCollisions();
        
        // Check a tile was actually found.
        tile?.setTexture(textureName);
    }
}

export default MapGrid;