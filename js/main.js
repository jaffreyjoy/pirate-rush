// Javascript for the main game

var playerShip;
var shipCannon;
var cannonballs;
var currentSpeed = 0;

var enemyFleet;
var enemyTime = [];
var eCannonballs;
var enemyProps;
var nextFleet = 2000;

// Should be fire delay, as implemented the larger the value the larger will be delay between cannon fires
var fireDelay = 300;
var cballSpeed = 500;
var nextFire = 0;

var gst = "Current Score : ";

var nct = "Cannons Left : ";

var cursors;
var wasd;

var enemiesKilled;
var lvlCannons;
var hits;
var lvlStart;
var lvlEnd;
var lvlScore;
var cannonballsDead;

function preloadMain() {
    initializeLevel();

    game.load.image('sea', 'assets/sea-tile.png');
    game.load.image('cannon', 'assets/cannonx.png');
    game.load.image('cannonball', 'assets/cannonballx.png');
    game.load.spritesheet('ship0', 'assets/ship_0.png');
    game.load.spritesheet('ship1', 'assets/ship_1.png');
    //game.load.spritesheet('ship10', 'assets/ship_10r.png');
    //game.load.spritesheet('ship11', 'assets/ship_11r.png');
    game.load.spritesheet('ship20', 'assets/ship_20r.png');
    game.load.spritesheet('ship21', 'assets/ship_21r.png');
    game.load.spritesheet('ship22', 'assets/ship_22r.png');
    game.load.spritesheet('shipx', 'assets/shipx.png');
    game.load.spritesheet('kaboom', 'assets/explosion.png', 64, 64, 24);
    game.load.bitmapFont('gem', 'assets/fonts/gem.png', 'assets/fonts/gem.xml');
}

function createMain() {
    // Add Physics to system
    game.physics.startSystem(Phaser.Physics.ARCADE);

    game.add.sprite(0, 0, 'sea');

    //Add score text
    scoreText = game.add.bitmapText(535, 570, 'gem', gst+lvlScore.toString(), 25);
    scoreText.tint = 0x223344;
    // scoreText.text = lvlScore.toString();
    //Add canonns left text
    cannonsLeftText = game.add.bitmapText(15, 570, 'gem', nct+lvlCannons.toString(), 25);
    cannonsLeftText.tint = 0x223344;
    // cannonsLeftText.text = lvlCannons.toString();

    // Player ship and its properties
    playerShip = game.add.sprite(400, 520, 'shipx');
    playerShip.scale.setTo(0.8, 0.8);
    // playerShip.rotation = 3.2;
    playerShip.anchor.setTo(0.5, 0.5);
    game.physics.arcade.enable(playerShip);
    playerShip.body.collideWorldBounds = true;
    playerShip.maxHealth = 100;
    playerShip.health = playerShip.maxHealth;
    console.log("Health: ", playerShip.health);
    // playerShip.animations.add('move', [0, 1], 10, true);

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
    cannonballs.createMultiple(lvlCannons, 'cannonball', 0, false);
    cannonballs.setAll('anchor.x', 0.5);
    cannonballs.setAll('anchor.y', 0.5);
    cannonballs.setAll('outOfBoundsKill', true);
    cannonballs.setAll('checkWorldBounds', true);

    // Enemy ships group
    enemyFleet = game.add.group();
    enemyFleet.enableBody = true;
    enemyFleet.physicsBodyType = Phaser.Physics.ARCADE;
    enemyFleet.createMultiple(enemyProps.spawns, enemyProps.sprites, 0, false);
    if (level != 0) {
        enemyFleet.setAll('scale.x', 0.7);
        enemyFleet.setAll('scale.y', 0.7);
    }
    enemyFleet.setAll('outOfBoundsKill', true);
    enemyFleet.setAll('checkWorldBounds', true);
    for(i = 0; i < (enemyProps.spawns * enemyProps.sprites.length); i++) {
        enemyTime.push(0);
    }

    // Enemy cannons group
    eCannonballs = game.add.group();
    eCannonballs.enableBody = true;
    eCannonballs.physicsBodyType = Phaser.Physics.ARCADE;
    eCannonballs.createMultiple(40, 'cannonball');
    eCannonballs.setAll('outOfBoundsKill', true);
    eCannonballs.setAll('checkWorldBounds', true);

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
    if (cannonballsDead >= noCannons[level] || !playerShip.alive) {
        // game.state.states['End'].finalScore = lvlScore;
        game.state.start('End');
    }

    if (enemiesKilled >= enemyProps.totalEnemies) {
        lvlEnd = game.time.now;
        game.state.start('mapUnlock');
    }

    game.physics.arcade.overlap(cannonballs, enemyFleet, eKill, null, this);
    game.physics.arcade.collide(playerShip, eCannonballs, damagePlayerShip, null, this);
    game.physics.arcade.collide(playerShip, enemyFleet, ramShip, null, this);

    // Reset player ship velocity
    playerShip.body.velocity.x = 0;
    playerShip.body.velocity.y = 0;

    //set position of cannon sprite to the front of the ship deck
    shipCannon.x = playerShip.x;
    shipCannon.y = playerShip.y;

    //change cannon rotation based on mouse pointer
    //(1.6 offset added as the vertical side of the img was pointing to the mouse pointer (if not added))
    shipCannon.rotation = game.physics.arcade.angleToPointer(shipCannon) + 1.6;

    //console.log(shipCannon.angle);

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

   var start = game.time.now;
   enemyFleet.forEachAlive( function (eShip) {
       if (start - enemyTime[enemyFleet.getIndex(eShip)] >= 1000 &&
            eShip.data.isMoving && !eShip.data.hasFired) {
        eShip.body.stop();
        eShip.data.isMoving = false;
        eShip.data.hasFired = true;
        eFire(eShip);
        setTimeout( function() {
            eShip.angle = game.rnd.integerInRange(0, 180);
            game.physics.arcade.velocityFromRotation(Phaser.Math.degToRad(eShip.angle), 70, eShip.body.velocity);
        },enemyProps.wait);
       }
   }, this);
}

function initializeLevel() {
    lvlCannons = noCannons[level];
    lvlScore = 0;
    hits = 0;
    enemiesKilled = 0;
    cannonballsDead = 0;
    lvlStart = game.time.now;

    if (level === 0)
        enemyProps = l0;
    else if (level === 1)
        enemyProps = l1;
    else if (level === 2)
        enemyProps = l2;
}

function fireCannon() {
    if(lvlCannons > 0) {
        if (game.time.now > nextFire && cannonballs.countDead() > 0) {
            nextFire = game.time.now + fireDelay;
            var cannonball = cannonballs.getFirstExists(false);
            console.log("cannonballDead: ", cannonballsDead);
            cannonball.reset(shipCannon.x, shipCannon.y);
            cannonball.rotation = game.physics.arcade.moveToPointer(
                cannonball,
                cballSpeed,
                game.input.activePointer,
                0 );
            cannonball.events.onKilled.addOnce( function() {
                cannonballsDead++;
            });
            lvlCannons--;
            cannonsLeftText.text = nct+lvlCannons.toString();
        }
    }
}

function createEnemy() {
    if (game.time.now > nextFleet && enemyFleet.countLiving() < enemyFleet.length) {
        nextFleet = game.time.now + enemyProps.delay;
        var enemyShip = enemyFleet.getFirstExists(false);

        enemyShip.reset(game.world.randomX, 60);
        enemyTime[enemyFleet.getIndex(enemyShip)] = game.time.now;
        enemyShip.body.velocity.x = 100;
        enemyShip.data.isMoving = true;
        enemyShip.data.hasFired = false;
        enemyShip.anchor.setTo(0.5, 0.5);
        enemyShip.angle = 0;
        enemyShip.health = enemyProps.health;
    }
}

function eFire(eShip) {
    var eCBall = eCannonballs.getFirstExists(false);
    console.log("Enemy cannonball");
    eCBall.reset(eShip.x, eShip.y);
    game.physics.arcade.moveToObject(eCBall, playerShip, 200);
}

function eKill(cBall, eShip) {
    var boom = game.add.sprite(cBall.x, cBall.y, 'kaboom');
    boom.animations.add('explode', null, 24, false);
    boom.animations.play('explode', null, false, true); //(animation_name,frame_rate,loop,killOnComplete_flag)

    cBall.kill();
    hits++;

    if (eShip.health - 50 <= 0) {
        enemiesKilled++;
        lvlScore += enemyProps.killPoints;
        scoreText.text = gst + lvlScore.toString();
    }
    eShip.damage(50);
}

function damagePlayerShip(playerShip, cBall) {  //collideCallback(sprite, group) always
    var boom = game.add.sprite(cBall.x, cBall.y, 'kaboom');
    boom.animations.add('explode', null, 24, false);
    boom.animations.play('explode', null, false, true);
    cBall.kill();
    console.log(cBall.exists);
    playerShip.damage(enemyProps.damage);
    console.log("Health: ", playerShip.health);
}

function ramShip(playerShip, eShip) {
    var boom = game.add.sprite(playerShip.x, playerShip.y, 'kaboom');
    boom.animations.add('explode', null, 24, false);
    boom.animations.play('explode', null, false, true);
    eShip.kill();
    playerShip.damage(50);
    enemiesKilled++;
    console.log("Health: ", playerShip.health);
}