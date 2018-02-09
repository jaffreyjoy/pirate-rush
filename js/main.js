// Javascript for the main game

var playerShip;
var shipCannon;
var cannonballs;
var currentSpeed = 0;
var enemyFleet;

var fireRate = 300;
var cballSpeed = 500;
var nextFire = 0;
// var eFireDelay = 300;
var shipDelay = 1000;
// var noCannons = 15;

var cursors;
var wasd;

function preloadMain() {
    game.load.image('sea', 'assets/sea-tile.png');
    game.load.image('cannon', 'assets/cannon.png');
    game.load.image('cannonball', 'assets/cannonball.png');
    game.load.spritesheet('shipx', 'assets/shipx.png');
    game.load.spritesheet('ship2', 'assets/ship_init.jpg', 31, 26);
    game.load.spritesheet('ship1', 'assets/ship_init_trans.png', 18, 32, 2);
    game.load.spritesheet('kaboom', 'assets/explosion.png', 64, 64, 24);
}

function createMain() {
    // Add Physics to system
    game.physics.startSystem(Phaser.Physics.ARCADE);

    game.add.sprite(0, 0, 'sea');

    // Player ship and its properties
    playerShip = game.add.sprite(400, 550, 'shipx');
    playerShip.scale.setTo(0.8, 0.8);
    // playerShip.rotation = 3.2;
    playerShip.anchor.setTo(0.5, 0.5);
    game.physics.arcade.enable(playerShip);
    playerShip.body.collideWorldBounds = true;
    playerShip.animations.add('move', [0, 1], 10, true);

    // ship Cannon and its properties
    shipCannon = game.add.sprite(400, 550, 'cannon');
    shipCannon.scale.setTo(0.8, 0.8);
    //anchor for rotation performed in update function
    shipCannon.anchor.setTo(0.5, 0.8);


    this.cbGroup = game.add.group();


    //  Our cannons group
    cannonballs = game.add.group();
    cannonballs.enableBody = true;
    cannonballs.physicsBodyType = Phaser.Physics.ARCADE;
    cannonballs.createMultiple(30, 'cannonball', 0, false);
    cannonballs.setAll('anchor.x', 0.5);
    cannonballs.setAll('anchor.y', 0.5);
    cannonballs.setAll('outOfBoundsKill', true);
    cannonballs.setAll('checkWorldBounds', true);

    // Enemy ships group
    enemyFleet = game.add.group();
    enemyFleet.enableBody = true;
    enemyFleet.physicsBodyType = Phaser.Physics.ARCADE;
    enemyFleet.createMultiple(5, 'ship2', 0, false);
    enemyFleet.setAll('outOfBoundsKill', true);

    // game.input.onDown.add(function () {
    //     console.log("clicked");
    //     console.log(shipCannon.width);
    //     let x = shipCannon.x - shipCannon.width/5.12;
    //     let y= shipCannon.y - shipCannon.height;
    //     let shipAngle = shipCannon.angle;
    //     // let newx = x - shipCannon.height * Math.sin(Math.PI/180*shipCannon.angle);
    //     // let newy = y - (shipCannon.height - shipCannon.height * Math.cos(Math.PI/180*shipCannon.angle));
    //     this.cbGroup.create(x,y , 'cannonball');
    // },
    //     this
    // );

    // Add cursor controls
    cursors = game.input.keyboard.createCursorKeys();
    // Add WASD controls
    wasd = {
        up: game.input.keyboard.addKey(Phaser.Keyboard.W),
        down: game.input.keyboard.addKey(Phaser.Keyboard.S),
        left: game.input.keyboard.addKey(Phaser.Keyboard.A),
        right: game.input.keyboard.addKey(Phaser.Keyboard.D),
    };

}

function updateMain() {

    game.physics.arcade.overlap(cannonballs, enemyFleet, eKill, null, this);

    // Reset player ship velocity
    playerShip.body.velocity.x = 0;
    playerShip.body.velocity.y = 0;

    //set position of cannon sprite to the front of the ship deck
    shipCannon.x = playerShip.x;
    shipCannon.y = playerShip.y;

    //change cannon rotation based on mouse pointer(1.6 offset added as the vertical side of the img was pointing to the mouse pointer (if not added))
    shipCannon.rotation = game.physics.arcade.angleToPointer(shipCannon) + 1.6;

    console.log(shipCannon.angle);

    // Rotation of player ship
    if (cursors.left.isDown || wasd.left.isDown) {
        //Move left
        playerShip.angle -= 5;
        // playerShip.animations.play('move');
    }
    else if (cursors.right.isDown || wasd.right.isDown) {
        //Move right
        playerShip.angle += 5;
        // playerShip.animations.play('move');
    }


    // Movement of player ship
    if (cursors.up.isDown || wasd.up.isDown) {
        //Move up
        currentSpeed = 150;
        // playerShip.body.velocity.y = -150;
    }

    else {
        //Stop motion
        if (currentSpeed > 0) {
            currentSpeed -= 5;
        }
    }

    if (currentSpeed > 0) {
        game.physics.arcade.velocityFromRotation(playerShip.rotation - 1.6, currentSpeed, playerShip.body.velocity);
    }

    if (game.input.activePointer.isDown) {
        //  Boom!
        fireCannon();
    }

    createEnemy();
}

function fireCannon() {
    // if(noCannons > 0){
        if (game.time.now > nextFire && cannonballs.countDead() > 0) {
            nextFire = game.time.now + fireRate;
            var cannonball = cannonballs.getFirstExists(false);
            console.log(cannonball);
            cannonball.reset(shipCannon.x, shipCannon.y);
            cannonball.rotation = game.physics.arcade.moveToPointer(
                cannonball,
                cballSpeed,
                game.input.activePointer,
                0
            );
        }
    // }
}

function createEnemy() {
    if (game.time.now > shipDelay && enemyFleet.countLiving() < 5) {
        shipDelay = game.time.now + 1000;
        var enemyShip = enemyFleet.getFirstExists(false);
        enemyShip.reset(0, 60);
        enemyShip.body.velocity.x = 100;
    }
}

function eKill(cBall, eShip) {
    var start = game.time.now;
    var boom = game.add.sprite(eShip.x, eShip.y, 'kaboom');
    boom.animations.add('explode', null, 24, false);
    boom.animations.play('explode', null, false, true); //(animation_name,frame_rate,loop,killOnComplete_flag)
    cBall.kill();
    eShip.kill();

    // Kill explosion sprite after 1 second, since complete animation take 1 sec here
    /*while(boom.alive) {
        if(game.time.now > start + 1000)
            boom.kill();
    }*/
}