



function preloadLvl() {
    game.load.image('lvl-end', 'assets/ui/level-complete-blue.png');
    game.load.spritesheet('hbutton', 'assets/ui/home-buttonx.png', 116, 116, 3);
    game.load.spritesheet('nextLbutton', 'assets/ui/next-level-buttonx.png', 116, 116, 3);
    game.load.bitmapFont('gem', 'assets/fonts/gem.png', 'assets/fonts/gem.xml');
}

function createLvl() {
    game.add.sprite(0, 0, 'lvl-end');
    hbutton = game.add.button(game.world.centerX - 150, 450, 'hbutton', goToStartPage, this, 1, 0);
    nextLbutton = game.add.button(hbutton.x + 150, hbutton.y, 'nextLbutton', startNextLevel, this, 1, 0);

    EnemiesKilledText = game.add.bitmapText(game.world.centerX - 200, game.world.centerY - 100, 'gem', "Kill Score : ", 30);
    EnemiesKilledText.tint = 0x223344;

    AccuracyText = game.add.bitmapText(EnemiesKilledText.x, EnemiesKilledText.y + 50, 'gem', "Accuracy : ", 30);
    AccuracyText.tint = 0x223344;

}

function updateLvl() {

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


// goTostartPage present in end.js

function startNextLevel() {
    level += 1;
    game.state.start('Main');
}

