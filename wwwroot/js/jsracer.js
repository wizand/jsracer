var config = {
    type: Phaser.WEBGL,
    width: 1200,
    height: 1200,
    backgroundColor: '#2d2d2d',
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var trackObj;
var speed;
var cursors;
var vehicle = {
    posX : 400,
    posY: 100,
    velX: 0,
    velY: 0,
    drag: 0.98,
    angle: 0,
    angularVel: 0,
    angularDrag: 0.92,
    power: 0.10,
    turnspeed: 0.07
};
var vehicleSprite;
var game = new Phaser.Game(config);

function preload ()
{
    this.load.image('track', 'assets/track1.png', { frameWidth: 2000, frameHeight: 2000 });
    this.load.image('vehicleSprite', 'assets/racer.png', { frameWidth: 16, frameHeight: 32 });
}

function create ()
{
    trackObj = this.add.image(1000,1000,'track').setDepth(1);
    cursors = this.input.keyboard.createCursorKeys();
    vehicle.vehicleSprite = this.add.sprite(vehicle.posX, vehicle.posY, 'vehicleSprite').setDepth(1);
    vehicle.vehicleSprite.flipY = true;
    vehicle.vehicleSprite.angle = 180;
    speed = Phaser.Math.GetSpeed(100, 1);
    this.cameras.main.setSize(1200, 1200);
    this.cameras.main.startFollow(vehicle.vehicleSprite);
}


function update(time, delta) {
    vehicle.posX = vehicle.posX - vehicle.velX;
    vehicle.posY = vehicle.posY - vehicle.velY;

    vehicle.velX *= vehicle.drag;
    vehicle.velY *= vehicle.drag;

    vehicle.angle = vehicle.angle + vehicle.angularVel;
    console.log("Angle: " + vehicle.angle + " vel: [" + vehicle.velX + "," + vehicle.velY + "] delta: " + delta);
    vehicle.angularVel *= vehicle.angularDrag;

    if (cursors.up.isDown) {
        var angleRad = Phaser.Math.DegToRad(vehicle.angle)
        vehicle.velX += Math.sin(angleRad) * vehicle.power;
        vehicle.velY += -Math.cos(angleRad) * vehicle.power;
    } else if (cursors.down.isDown)
    {
        vehicle.velX *= 0.98;
        vehicle.velY *= 0.98;
    }

    if (cursors.left.isDown) {
        vehicle.angularVel -= vehicle.turnspeed;
    }
    else if (cursors.right.isDown) {
        vehicle.angularVel += vehicle.turnspeed;
    }

    draw(vehicle);
}

function draw(vehicle)
{
    vehicle.vehicleSprite.x = vehicle.posX;
    vehicle.vehicleSprite.y = vehicle.posY;
    vehicle.vehicleSprite.angle = vehicle.angle;
}
