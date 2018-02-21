
function preloadStart() {
    game.load.image('start-page', 'assets/ui/start-page.png');
    game.load.spritesheet('pbutton', 'assets/ui/play-buttonx1.png', 116, 116, 3);
}

function createStart() {
    game.add.sprite(0, 0, 'start-page');
    pbutton = game.add.button(game.world.centerX - 58, 400, 'pbutton', startGame, this, 1, 0, 2);

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
