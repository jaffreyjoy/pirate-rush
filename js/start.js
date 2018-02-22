
function preloadStart() {
    game.load.image('start-page', 'assets/ui/start-page.png');
    game.load.spritesheet('pbutton', 'assets/ui/play-buttonx.png', 116, 116, 3);
    game.load.spritesheet('lbutton', 'assets/ui/leader-button.png', 116, 116, 3);
}

function createStart() {
    game.scale.pageAlignHorizontally = true;
    game.scale.pageAlignVertically = true;

    game.add.sprite(0, 0, 'start-page');
    pbutton = game.add.button(game.world.centerX - 130, 400, 'pbutton', startGame, this, 1, 0, 2);
    lbutton = game.add.button(pbutton.x + 200, 400, 'lbutton', goToLeaderBoard, this, 1, 0);

    pbutton.onInputOver.add(over, this);
    pbutton.onInputOut.add(out, this);
    pbutton.onInputUp.add(up, this);
}

function up() {
    console.log('button up', arguments);
}

function over() {
    console.log('button over');
}

function out() {
    console.log('button out');
}


function updateStart() {

}

function startGame() {
    game.state.start('Main');
}
function goToLeaderBoard() {
    game.state.start('leaderBoard');
}
