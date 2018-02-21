var levelMap = "";
var lMap;

function preloadMap() {
    setAssetVariables();
    game.load.image('lvl-end', 'assets/ui/sea-tile-dark.png');
    game.load.spritesheet('lMap', 'assets/ui/levels/'+levelMap, 500,500);
    console.log('assets/ui/levels/' + levelMap);
    game.load.spritesheet('nextButton', 'assets/ui/next-level-buttonx.png', 116, 116, 3);
    game.load.bitmapFont('gem', 'assets/fonts/gem.png', 'assets/fonts/gem.xml');
}

function createMap() {
    game.add.sprite(0, 0, 'lvl-end');

    mapUnlockText = game.add.bitmapText(game.world.centerX / 2.5 , game.world.centerY / 9, 'gem', "New MAP CLUE Unlocked", 50);
    mapUnlockText.tint = 0xabe3f5;

    lMap = game.add.sprite(game.world.centerX, game.world.centerY - 20, 'lMap');
    lMap.alpha = 1;
    lMap.anchor.set(0.5);
    lMap.scale.set(0.1);
    setTimeout(function(){
        animateMap();
    },100);

    nextButton = game.add.button(game.world.centerX - 58, 470, 'nextButton', goToLevelEnd, this, 1, 0);

}

function updateMap() {

}

function setAssetVariables() {
    levelMap = "lvl"+(level+1).toString()+".png";
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

function animateMap(){
    tween = game.add.tween(lMap.scale).to({ x: 0.7, y: 0.7 }, 1000, Phaser.Easing.Elastic.Out, true);
    setTimeout(function () {
        lMap.frame = 1;
        setTimeout(function () {
            lMap.frame = 2;
        }, 1200);
    }, 500);
}

function goToLevelEnd() {
    game.state.start('lvlEnd');
}

