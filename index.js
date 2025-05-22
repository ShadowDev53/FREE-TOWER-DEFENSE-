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
    this.load.atlas('sprits', 'assets/spritesheet.png', 'assets/spritesheet.json');
    this.load.image('bullet', 'assets/bullet.png' );
    // load everything
}


let enemy = new Phaser.Class({
    Extends: Phaser.GameObjects.Image,

    initialize:

    function Enemy (scene)
    {
        Phaser.GameObjects.Image.call(this, scene, 0, 0, 'sprites', 'enemy')
        this.follower = { t: 0, vec: new Phaser.Math.Vector2() };
        
    },

    startOnPath: function () {
        this.follower.t = 0;
        path.getPoint(this.follower.t, this.follower.vec);
        this.setPosition(this.follower.vec.x, this.follower.vec.y)
    },
    update: function (time, delta) {
        this.follower.t += ENEMY_SPEED * delta;
        path.getPoint(this.follower.vec.x, this.follower.vec.y);
        if (this.follower.t>=1) {
            this.setActive(false);
            this.setVisible(false);
        }

    }
    

    
   


} )

let ENEMY_SPEED = 1/1000;



function create() {
    const graphics = this.add.graphics();
    path = this.add.path(96, -32);
    path.lineTo(96, 164);
    path.lineTo(480, 164);
    path.lineTo(480, 544);
    // create line parameters
    graphics.lineStyle(3, 0xffffff, 1); //width of 3, white, opacity of 1
    path.draw(graphics); //draw line
    enemies = this.add.group({classType: Enemy, runChildUpdate: true})



}


function update(time, delta) {


}