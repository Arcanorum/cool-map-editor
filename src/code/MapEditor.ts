import 'phaser';
import MapGrid from './MapGrid';
import SelectionList from './SelectionList';

export default class MapEditor extends Phaser.Scene
{
    constructor ()
    {
        super('MapEditor');
    }

    preload ()
    {
        this.load.image('empty', 'assets/empty.png');
        this.load.image('dirt', 'assets/dirt.png');
        this.load.image('grass', 'assets/grass.png');
    }

    create ()
    {
        const grid = new MapGrid(this);

        const selectionList = new SelectionList(this, grid);
    }
}