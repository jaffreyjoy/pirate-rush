function preloadEnd() {
    game.load.image('end-page', 'assets/ui/end-page.png');
    game.load.spritesheet('rbutton', 'assets/ui/restart-buttonx.png', 116, 116, 2);
    game.load.spritesheet('hbutton', 'assets/ui/home-buttonx.png', 116, 116, 2);
    game.load.bitmapFont('gem', 'assets/fonts/gem.png', 'assets/fonts/gem.xml');
}

function createEnd() {
    gameScore += lvlScore;
    game.add.sprite(0, 0, 'end-page');
    rbutton = game.add.button(game.world.centerX - 160, 400, 'rbutton', restartGame , this, 1, 0);
    hbutton = game.add.button(rbutton.x + 150, rbutton.y, 'hbutton', goToStartPage, this, 1, 0);
    scoreText = game.add.bitmapText(game.world.centerX - 220, 300, 'gem', "Your Score : " + gameScore.toString(), 55);
    scoreText.tint = 0xffffff;
}

function over() {
    console.log('button over');
}

function out() {
    console.log('button out');
}

function updateEnd() {

}

function restartGame() {
    gameReset();
    game.state.start('Main');
}

function goToStartPage() {
    gameReset();
    game.state.start('Start');
}

