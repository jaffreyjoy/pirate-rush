var lStateText;
var surpriseText;
var percentText;

function preloadLoading() {
    game.load.image('load-page', 'assets/ui/load-page.png');
    game.load.spritesheet('nxt-button', 'assets/ui/next-level-buttonx.png', 116, 116, 2);
    game.load.bitmapFont('zilla-slab', 'assets/fonts/zilla-slab/zilla-slab.png', 'assets/fonts/zilla-slab/zilla-slab.fnt');
}

function createLoading() {

    game.add.sprite(0, 0, 'load-page');

    game.scale.pageAlignHorizontally = true;
    game.scale.pageAlignVertically = true;

    game.load.onLoadStart.add(loadStart, this);
    game.load.onFileComplete.add(fileComplete, this);
    game.load.onLoadComplete.add(loadComplete, this);

    lStateText = game.add.bitmapText(game.world.centerX - 150, game.world.centerY + 20, 'zilla-slab','Loading .. ', 50);
    lStateText.tint = 0x223344;

    surpriseText = game.add.bitmapText(game.world.centerX - 220, game.world.centerY + 90, 'zilla-slab',"Please be patient.There's a surprise ;) ", 30);
    surpriseText.tint = 0x223344;

    percentText = game.add.bitmapText(game.world.centerX - 180, game.world.centerY + 130, 'zilla-slab', "0 %", 30);
    percentText.tint = 0x223344;

    loadAllAssets();
}

function loadStartPageAssets() {
    game.load.image('start-page', 'assets/ui/start-page.png');
    game.load.spritesheet('abutton', 'assets/ui/audio-button.png', 116, 116, 2);
    game.load.spritesheet('ibutton', 'assets/ui/inst-button.png', 116, 116, 2);
    game.load.spritesheet('pbutton', 'assets/ui/play-buttonx.png', 116, 116, 3);
    game.load.spritesheet('lbutton', 'assets/ui/leader-button.png', 116, 116, 2);
    game.load.audio('start-back', ['assets/audio/ogg/back-cut.ogg']);
}

function loadInstructions(){
    game.load.image('instructions', '../assets/ui/instructions.png');
    game.load.spritesheet('prevButton', '../assets/ui/prev-button.png', 116, 116, 2);
    game.load.spritesheet('fire-inst', '../assets/ui/inst-gifs/fire.png', 277, 184);
    game.load.spritesheet('up-inst', '../assets/ui/inst-gifs/up.png', 277, 184);
    game.load.spritesheet('left-inst', '../assets/ui/inst-gifs/left.png', 277, 184);
    game.load.spritesheet('right-inst', '../assets/ui/inst-gifs/right.png', 277, 184);
    game.load.audio('inst', ['assets/audio/ogg/inst-cut.ogg']);
}

function loadLeaderBoard(){
    game.load.image('leaderboard', 'assets/ui/leaderboard.png');
    game.load.audio('lboard', ['assets/audio/ogg/lboard-cut.ogg']);
}

function loadMainGameAssets(){
    game.load.image('sea', 'assets/sea-tile.png');
    game.load.image('cannon', 'assets/cannonx.png');
    game.load.image('cannonball', 'assets/cannonballx.png');
    game.load.image('heartLogo', 'assets/ui/heartLogo.png');
    game.load.image('cannonLogo', 'assets/ui/cannonLogo.png');
    game.load.spritesheet('ship0', 'assets/ship_0.png');
    game.load.spritesheet('ship1', 'assets/ship_1.png');
    game.load.spritesheet('ship20', 'assets/ship_20r.png');
    game.load.spritesheet('ship21', 'assets/ship_21r.png');
    game.load.spritesheet('ship22', 'assets/ship_22r.png');
    game.load.spritesheet('shipx', 'assets/shipx.png');
    game.load.spritesheet('mapDrop', 'assets/t_map.png');
    game.load.spritesheet('kaboom', 'assets/explosion.png', 64, 64, 24);
    game.load.bitmapFont('gem', 'assets/fonts/gem.png', 'assets/fonts/gem.xml');
    game.load.audio('first', ['assets/audio/ogg/first-cut.ogg']);
    game.load.audio('second', ['assets/audio/ogg/second-cut.ogg']);
    game.load.audio('third', ['assets/audio/ogg/third-cut.ogg']);
}

function loadBossLevelAssets(){
    game.load.image('ghost', 'assets/ghost.png');
    game.load.image('bomber', 'assets/bomber.png');
    game.load.spritesheet('boom', 'assets/explosion_grey.png', 64, 64, 24);
    game.load.audio('boss', ['assets/audio/ogg/boss-cut.ogg']);
}

function loadMapUnlock(){
    game.load.image('map-unlock', 'assets/ui/sea-tile-dark.png');
    game.load.spritesheet('lMap1', 'assets/ui/levels/lvl1.png', 500, 500);
    game.load.spritesheet('lMap2', 'assets/ui/levels/lvl2.png', 500, 500);
    game.load.spritesheet('lMap3', 'assets/ui/levels/lvl3.png', 500, 500);
    game.load.spritesheet('lMap4', 'assets/ui/levels/lvl4.png', 500, 500);
    game.load.spritesheet('nextButton', 'assets/ui/next-level-buttonx.png', 116, 116, 2);
    game.load.audio('lock', ['assets/audio/ogg/lock-cut.ogg']);
    game.load.audio('unlock', ['assets/audio/ogg/unlock-cut.ogg']);
}

function loadLvlComplete(){
    game.load.image('lvl-end', 'assets/ui/level-complete-blue.png');
    game.load.spritesheet('hbutton', 'assets/ui/home-buttonx.png', 116, 116, 3);
    game.load.spritesheet('nextLbutton', 'assets/ui/next-level-buttonx.png', 116, 116, 2);
    game.load.audio('l-end', ['assets/audio/ogg/l-end-cut.ogg']);
}

function loadGameOver(){
    game.load.image('end-page', 'assets/ui/end-page.png');
    game.load.spritesheet('rbutton', 'assets/ui/restart-buttonx.png', 116, 116, 2);
    game.load.spritesheet('hbutton', 'assets/ui/home-buttonx.png', 116, 116, 2);
    game.load.audio('g-over', ['assets/audio/ogg/g-over-cut.ogg']);
}

function loadGameComplete(){
    game.load.image('game-complete', 'assets/ui/game-complete.png');
    game.load.spritesheet('hbutton', 'assets/ui/home-button.png', 116, 116, 3);
    game.load.audio('gcomplete', ['assets/audio/ogg/complete-cut.ogg']);
    // game.load.spritesheet('lbutton', 'assets/ui/leader-button.png', 116, 116, 3);
}


function loadAllAssets() {
    loadStartPageAssets();
    loadInstructions();
    loadLeaderBoard();
    loadMainGameAssets();
    loadBossLevelAssets();
    loadMapUnlock();
    loadLvlComplete();
    loadGameOver();
    loadGameComplete();

    game.load.start();
}

function updateLoading() {

}

function loadStart() {
    lStateText.setText("Loading ...");
}

//	This callback is sent the following parameters:
function fileComplete(progress, cacheKey, success, totalLoaded, totalFiles) {
    // text.setText("File Complete: " + progress + "% - " + totalLoaded + " out of " + totalFiles);
    percentText.setText( "Progress : "+ progress + "% - " + totalLoaded + " out of " + totalFiles);
}

function loadComplete() {
    lStateText.setText("Load Complete");
    nxtbutton = game.add.button(game.world.centerX - 58, 470, 'nxt-button', goToStartState, this, 1, 0);
    // setTimeout(function(){
    // game.state.start('Start');
    // },1000);
}

function goToStartState() {
    // setTimeout(function(){
    game.state.start('Start');
    // },1000);
}
