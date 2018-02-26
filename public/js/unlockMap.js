var lvlMap;
var lMap;


var lockMusic;
var unlockMusic;

function preloadMap() {
    // setAssetVariables();
    // game.load.spritesheet('lMap', 'assets/ui/levels/' + levelMap, 500, 500);
    // game.load.image('map-unlock', 'assets/ui/sea-tile-dark.png');
    // game.load.spritesheet('nextButton', 'assets/ui/next-level-buttonx.png', 116, 116, 3);
    // game.load.bitmapFont('gem', 'assets/fonts/gem.png', 'assets/fonts/gem.xml');
}

function createMap() {
    game.add.sprite(0, 0, 'map-unlock');

    mapUnlockText = game.add.bitmapText(game.world.centerX / 2.5 , game.world.centerY / 9, 'gem', "New MAP CLUE Unlocked", 50);
    mapUnlockText.tint = 0xabe3f5;

    lvlMap = "lMap" + (level + 1).toString();
    lMap = game.add.sprite(game.world.centerX, game.world.centerY - 20, lvlMap);
    lMap.alpha = 1;
    lMap.anchor.set(0.5);
    lMap.scale.set(0.1);
    setTimeout(function(){
        animateMap();
    },100);

    lockMusic = game.add.audio('lock', 1, true);
    unlockMusic = game.add.audio('unlock', 1, true);
}

function updateMap() {

}

// function setAssetVariables() {
//     levelMap = "lvl"+(level+1).toString()+".png";
// }

function up() {
}

function over() {

}

function out() {

}

function animateMap(){
    lockMusic.play();
    tween = game.add.tween(lMap.scale).to({ x: 0.7, y: 0.7 }, 1000, Phaser.Easing.Elastic.Out, true);
    setTimeout(function () {
        lockMusic.stop();
        unlockMusic.play();
        tween = game.add.tween(lMap.scale).to({ x: 0.5, y: 0.5 }, 1000, Phaser.Easing.Elastic.Out, true);
        lMap.frame = 1;
        setTimeout(function () {
            unlockMusic.stop();
            lockMusic.play();
            tween = game.add.tween(lMap.scale).to({ x: 0.7, y: 0.7 }, 1000, Phaser.Easing.Elastic.Out, true);
            lMap.frame = 2;
            nextButton = game.add.button(game.world.centerX , 530, 'nextButton', goToLevelEnd, this, 1, 0);
            nextButton.anchor.setTo(0.5,0.5);
            nextButton.scale.setTo(0, 0);
            setTimeout(function () {
                lockMusic.stop();
                tween = game.add.tween(nextButton.scale).to({ x: 0.8, y: 0.8 }, 1000, Phaser.Easing.Elastic.Out, true);
            }, 1000);
        }, 1200);
    }, 800);
}

function goToLevelEnd() {
    game.state.start('lvlEnd');
}

