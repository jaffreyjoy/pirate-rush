var instMusic;

function preloadInst() {
    // game.load.image('instructions', '../assets/ui/instructions.png');
    // game.load.spritesheet('prevButton', '../assets/ui/prev-button.png', 116, 116, 2);
    // game.load.spritesheet('fire-inst', '../assets/ui/inst-gifs/fire.png', 277, 184);
    // game.load.spritesheet('up-inst', '../assets/ui/inst-gifs/up.png', 277, 184);
    // game.load.spritesheet('left-inst', '../assets/ui/inst-gifs/left.png', 277, 184);
    // game.load.spritesheet('right-inst', '../assets/ui/inst-gifs/right.png', 277, 184);
    // game.load.bitmapFont('zilla-slab', 'assets/fonts/zilla-slab/zilla-slab.png', 'assets/fonts/zilla-slab/zilla-slab.fnt');
}

function createInst() {

    game.add.sprite(0, 0, 'instructions');
    prevButton = game.add.button(10, game.world.centerY - 30, 'prevButton', goBack, this, 1, 0);
    prevButton.scale.setTo(0.7, 0.7);


    var upInst = game.add.sprite(129, 95, 'up-inst');
    upInst.animations.add('up-play');
    upInst.animations.play('up-play', 6, true);

    var fireInst = game.add.sprite(484, 95, 'fire-inst');
    fireInst.animations.add('fire-play');
    fireInst.animations.play('fire-play', 10, true);

    var leftInst = game.add.sprite(129, 351, 'left-inst');
    leftInst.animations.add('left-play');
    leftInst.animations.play('left-play', 10, true);

    var rightInst = game.add.sprite(485, 351, 'right-inst');
    rightInst.animations.add('right-play');
    rightInst.animations.play('right-play', 10, true);

    instMusic =  game.add.audio('inst', 1, true);
    instMusic.play();

}

function over() {
}

function out() {
}

function updateInst() {

}

function goBack() {
    instMusic.stop();
    game.state.start('Start');
}
