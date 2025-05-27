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
let enemies;
let map = [[ 0,-1, 0, 0, 0, 0, 0, 0, 0, 0],
[ 0,-1, 0, 0, 0, 0, 0, 0, 0, 0],
[ 0,-1,-1,-1,-1,-1,-1,-1, 0, 0],
[ 0, 0, 0, 0, 0, 0, 0,-1, 0, 0],
[ 0, 0, 0, 0, 0, 0, 0,-1, 0, 0],
[ 0, 0, 0, 0, 0, 0, 0,-1, 0, 0],
[ 0, 0, 0, 0, 0, 0, 0,-1, 0, 0],
[ 0, 0, 0, 0, 0, 0, 0,-1, 0, 0]];

function preload() {
    this.load.atlas('sprites', 'assets/spritesheet.png', 'assets/spritesheet.json');
    this.load.image('bullet', 'assets/bullet.png');
}

let Enemy = new Phaser.Class({
    Extends: Phaser.GameObjects.Image,

    initialize: function Enemy (scene) {
        Phaser.GameObjects.Image.call(this, scene, 0, 0, 'sprites', 'enemy');
        this.follower = { t: 0, vec: new Phaser.Math.Vector2() };
    },

    startOnPath: function () {
        this.follower.t = 0;
        path.getPoint(this.follower.t, this.follower.vec);
        this.setPosition(this.follower.vec.x, this.follower.vec.y);
    },

    update: function (time, delta) {
        this.follower.t += ENEMY_SPEED * delta;
        path.getPoint(this.follower.t, this.follower.vec);
        this.setPosition(this.follower.vec.x, this.follower.vec.y);
        if (this.follower.t >= 1) {
            this.setActive(false);
            this.setVisible(false);
        }
    }
});

let Turret = new Phaser.Class({
    Extends: Phaser.GameObjects.Image,
    initialize:
    function Turret (scene)
    {
        Phaser.GameObjects.Image.call(this, scene, 0, 0, 'sprites', 'turret');
        this.nextTic = 0;
    },
    //  according to the grid
    place: function(i, j) {            
        this.y = i * 64 + 64/2;
        this.x = j * 64 + 64/2;
        map[i][j] = 1;            
    },
    update: function (time, delta)
    {
        // time to shoot
        if(time > this.nextTic) {                
            this.nextTic = time + 1000;
        }
    }
});



let ENEMY_SPEED = 1 / 10000;

function create() {
    graphics = this.add.graphics();
    path = this.add.path(96, -32);
    path.lineTo(96, 164);
    path.lineTo(480, 164);
    path.lineTo(480, 544);
    graphics.lineStyle(3, 0xffffff, 1); // width of 3, white, opacity of 1
    path.draw(graphics);

    enemies = this.add.group({ classType: Enemy, runChildUpdate: true});
    this.nextEnemy = 0;
    turrets = this.add.group ({classType: Turret, runChildUpdate: true});
    this.input.on('pointerdown', placeTurret);
}

function update(time, delta) {
    if (time > this.nextEnemy) {
        let newEnemy = enemies.get();
        if (newEnemy) {
            newEnemy.setActive(true);
            newEnemy.setVisible(true);
            newEnemy.startOnPath();
            this.nextEnemy = time + 2000;
        }
    }
}

function drawGrid(graphics) {
    graphics.lineStyle(1, 0x0000ff, 0.8);
    for(let i = 0; i < 8; i++) {
       graphics.moveTo(0, i * 64);
       graphics.lineTo(640, i * 64);

    }
    for(let j = 0; j < 10; j++) {
        graphics.moveTo(j * 64);
        graphics.lineTo(j * 64, 512);
    }
    graphics.strokePath();
}

function canPlaceTurret(i, j) {
    return map[i][j] === 0;
}
let newGraphics = this.add.graphics();
 drawGrid(newGraphics)

 function placeTurret(pointer) {
    let i = Math.floor(pointer.y/64);
    let j = Math.floor(pointer.x/64);
    if(canPlaceTurret(i, j)) {
        let turret = turrets.get();
        if (turret) {
            turret.setActive(true);
            turret.setVisible(true);
            turret.place(i, j);
        }

    }
 }

 