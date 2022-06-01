import MapGrid from "./MapGrid";

const OPTION_SPACING = 20;

class TileOption {
    index: number;
    gameObject: Phaser.GameObjects.Image;

    constructor(index: number, gameObject: Phaser.GameObjects.Image){
        this.index = index;
        this.gameObject = gameObject;
    }
}

class SelectionList extends Phaser.GameObjects.Container {

    tileOptions: Array<TileOption> = [];

    selectedTile: TileOption;

    constructor(scene: Phaser.Scene, mapGrid: MapGrid) {
        super(scene, scene.cameras.main.width - 20, 20);
        scene.add.existing(this);

        const options = [
            'dirt',
            'grass'
        ]

        options.forEach((option, index) => {
            this.addOption(scene, option, index);
        });

        const spaceKey = scene.input.keyboard.addKey('SPACE');
        spaceKey.on('down', () => {
            mapGrid.updateTile(this.selectedTile.gameObject.frame.texture.key);
        });

        const upKey = scene.input.keyboard.addKey('UP');
        upKey.on('down', () => {
            // Go up by 1 from the index of the current selection.
            this.setSelection(this.selectedTile.index - 1);
        })

        const downKey = scene.input.keyboard.addKey('DOWN');
        downKey.on('down', () => {
            // Go down by 1 from the index of the current selection.
            this.setSelection(this.selectedTile.index + 1);
        })

        // Select the first available tile option as the default.
        this.setSelection(0);
    }

    addOption(scene: Phaser.Scene, texture: string, row: number) {
        const option = new TileOption(
            row,
            scene.add.image(0, row * OPTION_SPACING, texture),
        );

        this.tileOptions.push(option);

        this.add(option.gameObject);
    }

    setSelection(index: number) {
        // Check the index would be valid.
        if(!this.tileOptions[index]) return;

        // Reset the scale of the current selection, if one is selected (might the the first
        // time being called, so won't have a current selection).
        if(this.selectedTile) this.selectedTile.gameObject.x = 0;

        this.selectedTile = this.tileOptions[index];
        // Make it pop a bit to the side show it is selected.
        this.selectedTile.gameObject.x -= 10;
    }
}

export default SelectionList;