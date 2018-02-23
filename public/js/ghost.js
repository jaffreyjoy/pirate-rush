var ghost;
var nextVolley;
var volleyDelay;
var gFireDelay;
var cFireDelay;
var bomberDelay;
var bombFleet;

function preloadGhost() {
    tillDeath();

    game.load.image('sea', 'assets/sea-tile.png');
    game.load.image('cannon', 'assets/cannonx.png');
    game.load.image('cannonball', 'assets/cannonballx.png');
    game.load.image('heartLogo', 'assets/ui/heartLogo.png');
    game.load.image('cannonLogo', 'assets/ui/cannonLogo.png');
    game.load.image('ghost', 'assets/ghost.png');
    game.load.image('bomber', 'assets/bomber.png');
    game.load.spritesheet('shipx', 'assets/shipx.png');
    game.load.spritesheet('kaboom', 'assets/explosion.png', 64, 64, 24);
    game.load.spritesheet('mapDrop', 'assets/t_map.png');
    game.load.bitmapFont('gem', 'assets/fonts/gem.png', 'assets/fonts/gem.xml');
}

function createGhost() {
    game.physics.startSystem(Phaser.Physics.ARCADE);

    game.add.sprite(0, 0, 'sea');

    // Player ship and its properties
    playerShip = game.add.sprite(400, 520, 'shipx');
    playerShip.scale.setTo(0.8, 0.8);
    playerShip.anchor.setTo(0.5, 0.5);
    game.physics.arcade.enable(playerShip);
    playerShip.body.collideWorldBounds = true;
    playerShip.maxHealth = 100;
    playerShip.health = playerShip.maxHealth;

    // ship Cannon and its properties
    shipCannon = game.add.sprite(400, 550, 'cannon');
    shipCannon.scale.setTo(0.8, 0.8);
    //anchor for rotation performed in update function
    shipCannon.anchor.setTo(0.5, 0.8);

    //  Our cannons group
    cannonballs = game.add.group();
    cannonballs.enableBody = true;
    cannonballs.physicsBodyType = Phaser.Physics.ARCADE;
    cannonballs.createMultiple(lvlCannons, 'cannonball', 0, false);
    cannonballs.setAll('anchor.x', 0.5);
    cannonballs.setAll('anchor.y', 0.5);
    cannonballs.setAll('outOfBoundsKill', true);
    cannonballs.setAll('checkWorldBounds', true);

    // The big boss
    ghost = game.add.sprite(400, 120, 'ghost');
    ghost.scale.setTo(2.2, 2.2);
    ghost.anchor.setTo(0.5, 0.5);
    game.physics.arcade.enable(ghost);
    ghost.maxHealth = 1000;
    ghost.health = ghost.maxHealth;
    ghost.events.onKilled.addOnce( function() {
        map.reset(ghost.x, ghost.y);
        map.visible = true;
        map.data.hasDropped = true;
    });

    // The bomber ships
    bombFleet = game.add.group();
    bombFleet.enableBody = true;
    bombFleet.physicsBodyType = Phaser.Physics.ARCADE;
    bombFleet.createMultiple(5, 'bomber');
    bombFleet.setAll('scale.x', 0.5);
    bombFleet.setAll('scale.y', 0.5);
    bombFleet.setAll('anchor.x', 0.5);
    bombFleet.setAll('anchor.y', 0.5);
    bombFleet.setAll('outOfBoundsKill', true);
    bombFleet.setAll('checkWorldBounds', true);

    // Enemy cannons group
    eCannonballs = game.add.group();
    eCannonballs.enableBody = true;
    eCannonballs.physicsBodyType = Phaser.Physics.ARCADE;
    eCannonballs.createMultiple(40, 'cannonball');
    eCannonballs.setAll('anchor.x', 0.5);
    eCannonballs.setAll('anchor.y', 0.5);
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

    // The map drop sprite
    map = game.add.sprite(0, 0, 'mapDrop');
    map.visible = false;
    map.data.shouldDrop = false;
    map.data.hasDropped = false;
    game.physics.arcade.enable(map);

    heartLogo = game.add.sprite(12, 550, 'heartLogo');
    heartLogo.scale.setTo(0.15, 0.15);
    LifeText = game.add.bitmapText(heartLogo.x + 50, heartLogo.y, 'gem', playerShip.health.toString(), 30 );
    LifeText.tint = 0x223344;

    cannonLogo = game.add.sprite(LifeText.x + 80, heartLogo.y, 'cannonLogo');
    cannonLogo.scale.setTo(0.15, 0.15);
    cannonsLeftText = game.add.bitmapText(cannonLogo.x + 50, heartLogo.y, 'gem', lvlCannons.toString(), 30);
    cannonsLeftText.tint = 0x223344;
}

function updateGhost() {
    if ( (cannonballsDead >= noCannons[level] && !map.data.hasDropped) || !playerShip.alive) {
        // game.state.states['End'].finalScore = lvlScore;
        gameScore += lvlScore;
        game.state.start('End');
    }

    LifeText.text = playerShip.health.toString();

    game.physics.arcade.overlap(cannonballs, bombFleet, bomberKill, null, this);
    game.physics.arcade.overlap(playerShip, map, levelComplete, null, this);
    game.physics.arcade.overlap(playerShip, ghost, iAmDone, null, this);
    game.physics.arcade.collide(playerShip, eCannonballs, killPlayerShip, null, this);
    game.physics.arcade.collide(playerShip, bombFleet, bomberHit, null, this);

    // Reset player ship velocity
    playerShip.body.velocity.x = 0;
    playerShip.body.velocity.y = 0;

    //set position of cannon sprite to the front of the ship deck
    shipCannon.x = playerShip.x;
    shipCannon.y = playerShip.y;

    //change cannon rotation based on mouse pointer
    //(1.6 offset added as the vertical side of the img was pointing to the mouse pointer (if not added))
    shipCannon.rotation = game.physics.arcade.angleToPointer(shipCannon) + 1.6;

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

    var attackStatus = game.time.now;
    if ( attackStatus > nextVolley){
        nextVolley = game.time.now + volleyDelay;
        var type = game.rnd.integerInRange(0, 100);

        if ( type > 75 && attackStatus > bomberDelay) {
            bomberDelay += attackStatus;
            deployBombers();
        }
        else if ( type > 50 && attackStatus > cFireDelay) {
            cFireDelay += attackStatus;
            chainFire();
        }
        else if ( type < 50 && attackStatus > gFireDelay) {
            gFireDelay += attackStatus;
            ghostFire();
        }
    }
    
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
            cannonsLeftText.text = lvlCannons.toString();
        }
    }
}

function ghostFire() {
    target = [
        { x : playerShip.x, y : playerShip.y },
        { x : playerShip.x - 50, y : playerShip.y + 50},
        { x : playerShip.x + 50, y : playerShip.y - 50},
        { x : playerShip.x + 100, y : playerShip.y - 100},
        { x : playerShip.x - 100, y : playerShip.y + 100}
    ];

    for ( i = 0; i < 5; i++) {
        var eCBall = eCannonballs.getFirstExists(false);
        eCBall.reset(ghost.x, ghost.y);
        game.physics.arcade.moveToXY(eCBall, target[i].x, target[i].y, 200);
    }
}

function chainFire() {
    var count = 0;
    var s = setInterval( function() {
        var eCBall = eCannonballs.getFirstExists(false);
        eCBall.reset(ghost.x, ghost.y);
        game.physics.arcade.moveToObject(eCBall, playerShip, 250);
        count++;
        if (count > 4) 
            clearInterval(s);
    }, 100);
}

function deployBombers() {
    var count = 0;
    var offX = 20;
    var offY = -20;
    var s = setInterval( function() {
        var bomberShip = bombFleet.getFirstExists(false);
        bomberShip.reset(ghost.left + offX, ghost.bottom + offY);
        game.physics.arcade.moveToObject(bomberShip, playerShip, 120);
        offX += ghost.width / 2 - 10;

        count++;
        if (count > 2)
            clearInterval(s);
    }, 500);
}

function killPlayerShip(playerShip, eCBall) {
    var boom = game.add.sprite(0, 0, 'kaboom');
    boom.anchor.setTo(0.5, 0.5);
    boom.reset(eCBall.x, eCBall.y);
    boom.animations.add('explode', null, 24, false);
    boom.animations.play('explode', null, false, true);
    eCBall.kill();
    playerShip.damage(40);
}

function bomberKill(playerShip, bomberShip) {
    var boom = game.add.sprite(0, 0, 'kaboom');
    boom.anchor.setTo(0.5, 0.5);
    boom.reset(bomberShip.x, bomberShip.y);
    boom.animations.add('explode', null, 24, false);
    boom.animations.play('explode', null, false, true);
    bomberShip.kill();
}

function bomberHit(playerShip, bomberShip) {
    var boom = game.add.sprite(0, 0, 'kaboom');
    boom.anchor.setTo(0.5, 0.5);
    boom.reset(playerShip.x, playerShip.y);
    boom.animations.add('explode', null, 24, false);
    boom.animations.play('explode', null, false, true);
    bomberShip.kill();
    playerShip.damage(80);
}

function iAmDone(playerShip, ghost) {
    playerShip.kill();
}

function tillDeath() {
    level = 3;
    lvlCannons = noCannons[level];
    nextVolley = 4000;
    volleyDelay = 2000;
    gFireDelay = 2000;
    cFireDelay = 3500;
    bomberDelay = 5000;
    lvlScore = 0;
    hits = 0;
    enemiesKilled = 0;
    cannonballsDead = 0;
    dropStatus = 0;
    mapDropped = false;
    lvlStart = game.time.now;

    console.log('Level: ', level, ' G7 - Bosssssssss');
}