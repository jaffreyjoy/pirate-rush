// Javascript for the main game

var playerShip;
var cursors;

function preloadMain() {
    game.load.image('sea', 'assets/sea.png');
    // game.load.spritesheet('ship1', 'assets/ship_init.jpg', 31,26);
    game.load.spritesheet('ship1', 'assets/ship_init_trans.png', 23,32,2);
}

function createMain() {
	// Add Physics to system
	game.physics.startSystem(Phaser.Physics.ARCADE);

    game.add.sprite(0, 0, 'sea');

    // Player ship and its properties
    playerShip =  game.add.sprite(400, 500, 'ship1');
    playerShip.scale.setTo(1.5, 1.5);
    game.physics.arcade.enable(playerShip);
    playerShip.body.collideWorldBounds = true;
    playerShip.animations.add('move', [0, 1], 10, true);

    // Add cursor controls
    cursors = game.input.keyboard.createCursorKeys();
}

function updateMain() {
	// Reset player ship velocity
	playerShip.body.velocity.x = 0;
	playerShip.body.velocity.y = 0;

	// Movement of player ship
	if (cursors.left.isDown) {
		//Move left
		playerShip.body.velocity.x = -200;
		playerShip.animations.play('move');
	}
	else if(cursors.right.isDown) {
		//Move right
		playerShip.body.velocity.x = 200;
		playerShip.animations.play('move');
	}
	else if(cursors.up.isDown) {
		//Move up
		playerShip.body.velocity.y = -200;
		playerShip.animations.play('move');
	}
	else if(cursors.down.isDown) {
		//Move down
		playerShip.body.velocity.y = 200;
		playerShip.animations.play('move');
	}
	else {
		//Stop motion
		playerShip.animations.stop();
		playerShip.frame = 1;
	}
}