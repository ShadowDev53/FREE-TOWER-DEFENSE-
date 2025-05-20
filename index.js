const config = {
    type: Phaser.AUTO,
    parent: 'content',
    width: 640,
    height: 512,   
    scene: {
        key: 'main',
        preload: preload,
        create: create,
        update: update
    }
};

const game = new Phaser.Game(config);
let graphics;
let path;


function preload() {
    this.load.spriteSheet('sprits', 'assets/spritesheet.png', 'assets/spritesheet.json')

}


function create() {


}


function update() {


}