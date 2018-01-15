// Javascript for the main game

var playerShip;

function preloadMain() {
    game.load.image('sea', 'assets/sea.png');
    game.load.spritesheet('ship1', 'assets/ship_init.jpg', 32, 26);
}

function createMain() {
    game.add.sprite(0, 0, 'sea');
    playerShip =  game.add.sprite(400, 450, 'ship1');
}

function updateMain() {
}