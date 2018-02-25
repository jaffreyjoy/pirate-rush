var gameCompleteMusic;

function preloadGcomp() {
    // game.load.image('game-complete', 'assets/ui/game-complete.png');
    // game.load.spritesheet('hbutton', 'assets/ui/home-button.png', 116, 116, 3);
    // game.load.spritesheet('lbutton', 'assets/ui/leader-button.png', 116, 116, 3);
    // game.load.bitmapFont('zilla-slab', 'assets/fonts/zilla-slab/zilla-slab.png', 'assets/fonts/zilla-slab/zilla-slab.fnt');
}

function createGcomp() {

    game.add.sprite(0, 0, 'game-complete');

    var gcompScore = game.add.bitmapText(160, 360, 'zilla-slab', gameScore.toString(), 45);
    gcompScore.tint = 0x223344;

    hbutton = game.add.button(30, 468, 'hbutton', goToStartPageFromGC, this, 1, 0);
    hbutton.scale.setTo(0.8,0.8);
    lbutton = game.add.button(hbutton.x + 120, hbutton.y, 'lbutton', goToLeaderBoardFromGC, this, 1, 0);
    lbutton.scale.setTo(0.8, 0.8);

    // prevButton.scale.setTo(0.7, 0.7);
    gameCompleteMusic = game.add.audio('gcomplete', 1, true);
    gameCompleteMusic.play();
}

function over() {

}

function out() {

}

function updateGcomp() {

}

function goToStartPageFromGC() {
    prevState = "gcomplete";
    gameCompleteMusic.stop();
    game.state.start('Start');
}

function goToLeaderBoardFromGC() {
    prevState = "gcomplete";
    gameCompleteMusic.stop();
    game.state.start('leaderBoard');
}
