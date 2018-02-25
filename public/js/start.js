var backMusic;

function preloadStart() {
    // game.load.image('start-page', 'assets/ui/start-page.png');
    // game.load.spritesheet('ibutton', 'assets/ui/inst-button.png', 116, 116, 3);
    // game.load.spritesheet('pbutton', 'assets/ui/play-buttonx.png', 116, 116, 3);
    // game.load.spritesheet('lbutton', 'assets/ui/leader-button.png', 116, 116, 3);
}

function createStart() {

    game.add.sprite(0, 0, 'start-page');

    abutton = game.add.button(10, 10, 'abutton', changeSoundFlag, this);
    // abutton.frame = abuttonFrame;
    abutton.scale.setTo(0.3,0.3);

    // console.log(abuttonFrame)
    if (abuttonFrame == 0) {
        // console.log("first check 0")
        abutton.setFrames(1, 0);
        // console.log(abutton.frame);
        // console.log('abF = '+abuttonFrame);
    }
    else {
        // console.log("first check 1")
        abutton.setFrames(0, 1);
        // console.log(abutton.frame);
        // console.log('abF = '+abuttonFrame);
    }
    var tipText = game.add.bitmapText(game.world.centerX - 200, 10, 'zilla-slab', "Tip : For best experience keep volume on", 25);
    tipText.tint = 0x223344;
    pbutton = game.add.button(game.world.centerX - 58, 400, 'pbutton', startGame, this, 1, 0, 2);
    ibutton = game.add.button(pbutton.x - 150, 400, 'ibutton', goToInstructions, this, 1, 0);
    lbutton = game.add.button(pbutton.x + 150, 400, 'lbutton', goToLeaderBoard, this, 1, 0);

    backMusic= game.add.audio('start-back',1,true);

    backMusic.play();

}


function updateStart() {

}

function changeSoundFlag() {
    game.sound.mute = !game.sound.mute;
    if (abuttonFrame == 0) {
        // console.log("in zero")
        abutton.setFrames(0, 1);
        // console.log(abutton.frame);
        // console.log('abF = ' + abuttonFrame);
        // abutton.frame = 1;
        abuttonFrame = 1;
        // console.log('abF = ' + abuttonFrame);
    }
    else {
        // console.log("in one")
        abutton.setFrames(1, 0);
        // console.log(abutton.frame);
        // console.log('abF = ' + abuttonFrame);
        // abutton.frame = 0;
        abuttonFrame = 0;
        // console.log('abF = ' + abuttonFrame);
    }
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
