var backMusic;

function preloadStart() {
    // game.load.image('start-page', 'assets/ui/start-page.png');
    // game.load.spritesheet('ibutton', 'assets/ui/inst-button.png', 116, 116, 3);
    // game.load.spritesheet('pbutton', 'assets/ui/play-buttonx.png', 116, 116, 3);
    // game.load.spritesheet('lbutton', 'assets/ui/leader-button.png', 116, 116, 3);
}

function createStart() {

    game.add.sprite(0, 0, 'start-page');

    pbutton = game.add.button(game.world.centerX - 58, 400, 'pbutton', startGame, this, 1, 0, 2);
    ibutton = game.add.button(pbutton.x - 150, 400, 'ibutton', goToInstructions, this, 1, 0);
    lbutton = game.add.button(pbutton.x + 150, 400, 'lbutton', goToLeaderBoard, this, 1, 0);

    backMusic= game.add.audio('start-back',1,true);

    backMusic.play();

}


function updateStart() {

}

function goToInstructions() {
    backMusic.stop();
    game.state.start('instructions');
}

function startGame() {
    backMusic.stop();
    game.state.start('Main');
}

function goToLeaderBoard() {
    backMusic.stop();
    prevState = "Start";
    game.state.start('leaderBoard');
}
