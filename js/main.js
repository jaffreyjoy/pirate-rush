// Javascript for the main game

var playerShip;
var shipCannon;
var cannonballs;

var enemyFleet;

// Should be fire delay, as implemented the larger the value the larger will be delay between cannon fires
//var fireRate = 150;
var fireRate = 300;
var cballSpeed = 500;
var nextFire = 0;
// var eFireDelay = 300;
var shipDelay = 1000;

var cursors;

function preloadMain() {
    game.load.image('sea', 'assets/sea-tile.png');
    game.load.image('cannon', 'assets/cannon.png');
    game.load.image('cannonball', 'assets/cannonball.png');
    game.load.spritesheet('ship2', 'assets/ship_init.jpg', 31,26);
    game.load.spritesheet('ship1', 'assets/ship_init_trans.png', 18,32,2);
    game.load.spritesheet('kaboom', 'assets/explosion.png', 64, 64, 24);
}

function createMain() {
	// Add Physics to system
	game.physics.startSystem(Phaser.Physics.ARCADE);

    game.add.sprite(0, 0, 'sea');

    // Player ship and its properties
    playerShip =  game.add.sprite(400, 550, 'ship1');
    playerShip.scale.setTo(2, 2);
    playerShip.anchor.setTo(0.5, 0.1);
    game.physics.arcade.enable(playerShip);
    playerShip.body.collideWorldBounds = true;
    playerShip.animations.add('move', [0, 1], 10, true);

    // ship Cannon and its properties
    shipCannon = game.add.sprite(400, 550, 'cannon');
    shipCannon.scale.setTo(0.8, 0.8);
    //anchor for rotation performed in update function
    shipCannon.anchor.setTo(0.5, 0.8);

    // Add cursor controls
    cursors = game.input.keyboard.createCursorKeys();

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
    // console.log(shipCannon.angle);

	// Movement of player ship
	if (cursors.left.isDown) {
		//Move left
		playerShip.body.velocity.x = -150;
		playerShip.animations.play('move');
	}
	else if(cursors.right.isDown) {
		//Move right
		playerShip.body.velocity.x = 150;
		playerShip.animations.play('move');
	}
	else if(cursors.up.isDown) {
		//Move up
		playerShip.body.velocity.y = -150;
		playerShip.animations.play('move');
	}
	else if(cursors.down.isDown) {
		//Move down
		playerShip.body.velocity.y = 150;
		playerShip.animations.play('move');
	}
	else {
		//Stop motion
		playerShip.animations.stop();
		playerShip.frame = 1;
    }

    if (game.input.activePointer.isDown) {
        //  Boom!
        fireCannon();
    }

    createEnemy();
}

function fireCannon() {
    if (game.time.now > nextFire && cannonballs.countDead() > 0) {
        nextFire = game.time.now + fireRate;
        var cannonball = cannonballs.getFirstExists(false);
        console.log(cannonball);
        cannonball.reset(shipCannon.x, shipCannon.y);
        //cannonball.rotation = game.physics.arcade.moveToPointer(cannonball, 400, game.input.activePointer);
        cannonball.rotation = game.physics.arcade.moveToPointer(
            cannonball,
            cballSpeed,
            game.input.activePointer,
            0
        );
    }
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
    boom.lifespan = 1100    // autokill after 1 second
    boom.animations.add('explode', null, 24, false);
    boom.animations.play('explode');
    cBall.kill();
    eShip.kill();

    // Kill explosion sprite after 1 second, since complete animation take 1 sec here
    /*while(boom.alive) {
        if(game.time.now > start + 1000)
            boom.kill();
    }*/
}