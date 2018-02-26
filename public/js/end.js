var socket = io();

var gameOverMusic;

function preloadEnd() {
    // game.load.image('end-page', 'assets/ui/end-page.png');
    // game.load.spritesheet('rbutton', 'assets/ui/restart-buttonx.png', 116, 116, 2);
    // game.load.spritesheet('hbutton', 'assets/ui/home-buttonx.png', 116, 116, 2);
    // game.load.bitmapFont('gem', 'assets/fonts/gem.png', 'assets/fonts/gem.xml');
}

function createEnd() {
    //gameScore += lvlScore;
    game.add.sprite(0, 0, 'end-page');
    rbutton = game.add.button(game.world.centerX - 160, 400, 'rbutton', restartGame , this, 1, 0);
    hbutton = game.add.button(rbutton.x + 150, rbutton.y, 'hbutton', goToStartPage, this, 1, 0);
    scoreText = game.add.bitmapText(game.world.centerX - 220, 300, 'gem', "Your Score : " + gameScore.toString(), 55);
    scoreText.tint = 0xffffff;

    gameOverMusic = game.add.audio('g-over', 1, true);
    gameOverMusic.play();

    socket.emit("sendScore", gameScore);
}

function over() {
}

function out() {
}

function updateEnd() {

}

function restartGame() {
    gameReset();
    gameOverMusic.stop();
    game.state.start('Main');
}

function goToStartPage() {
    gameReset();
    gameOverMusic.stop();
    game.state.start('Start');
}

