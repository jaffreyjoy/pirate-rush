
function preloadInst() {
    game.load.image('instructions', 'assets/ui/instructions.png');
    game.load.spritesheet('prevButton', 'assets/ui/prev-button.png', 116, 116, 3);
    // game.load.bitmapFont('zilla-slab', 'assets/fonts/zilla-slab/zilla-slab.png', 'assets/fonts/zilla-slab/zilla-slab.fnt');
}

function createInst() {

    game.add.sprite(0, 0, 'instructions');
    prevButton = game.add.button(10, game.world.centerY - 30, 'prevButton', goBack, this, 1, 0);
    prevButton.scale.setTo(0.7, 0.7);

}

function over() {
    console.log('button over');
}

function out() {
    console.log('button out');
}

function updateInst() {

}

function goBack() {
    game.state.start('Start');
}
