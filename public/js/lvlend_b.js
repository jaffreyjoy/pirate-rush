var socket = io();

var eKilled;
var ekScore;
var accuracy;
var acScore;
var tTaken;
var tTakenScore;
var levelScore;

var lvlEndMusic;

function preloadLvl() {
    calcScore();
    // game.load.image('lvl-end', 'assets/ui/level-complete-blue.png');
    // game.load.spritesheet('hbutton', 'assets/ui/home-buttonx.png', 116, 116, 3);
    // game.load.spritesheet('nextLbutton', 'assets/ui/next-level-buttonx.png', 116, 116, 3);
    // game.load.bitmapFont('gem', 'assets/fonts/gem.png', 'assets/fonts/gem.xml');
}

function createLvl() {
    game.add.sprite(0, 0, 'lvl-end');
    hbutton = game.add.button(game.world.centerX - 150, 450, 'hbutton', goToStartPageFromLvlEnd, this, 1, 0);
    nextLbutton = game.add.button(hbutton.x + 150, hbutton.y, 'nextLbutton', startNextLevel, this, 1, 0);

    EnemiesKilledText = game.add.bitmapText(game.world.centerX - 300, game.world.centerY - 130, 'gem', "Enemies killed : "+eKilled+" ( + "+ekScore+" )", 30);
    EnemiesKilledText.tint = 0x223344;

    AccuracyText = game.add.bitmapText(EnemiesKilledText.x, EnemiesKilledText.y + 50, 'gem', "Accuracy : " + accuracy + "% ( + " + acScore + " )", 30);
    AccuracyText.tint = 0x223344;

    TimeTakenText = game.add.bitmapText(EnemiesKilledText.x, EnemiesKilledText.y + 100, 'gem', "Time Taken : " + tTaken + "s ( + " + tTakenScore + " )", 30);
    TimeTakenText.tint = 0x223344;

    LevelScoreText = game.add.bitmapText(EnemiesKilledText.x - 35, EnemiesKilledText.y + 160, 'gem', "Level Score : " + levelScore , 50);
    LevelScoreText.tint = 0x223344;

    lvlEndMusic = game.add.audio('l-end', 1, true);
    lvlEndMusic.play();
}

function updateLvl() {

}

function calcScore() {
    eKilled = enemiesKilled;
    ekScore = lvlScore;
    cannonsFired = noCannons[level] - lvlCannons;
    if (cannonsFired)
        accuracy = (hits / cannonsFired * 100).toFixed(2);
    else
        accuracy = 0;
    acScore = Math.floor(5000 * accuracy / 100);
    tTaken = Math.floor((lvlEnd - lvlStart) / 1000);
    tTakenScore = 5000 - tTaken * 25;
    levelScore = ekScore + acScore + tTakenScore;
    gameScore += levelScore;
    socket.emit("sendScore", gameScore);
}

function up() {

}

function over() {

}

function out() {

}

function startNextLevel() {
    level += 1;
    if ( level > 3 ) {
        lvlEndMusic.stop();
        game.state.start('gcomplete');
    }
    else if ( level > 2) {
        lvlEndMusic.stop();
        game.state.start('Ghost');
    }
    else{
        lvlEndMusic.stop();
        game.state.start('Main');
    }

}

function goToStartPageFromLvlEnd(){
    gameReset();
    lvlEndMusic.stop();
    game.state.start('Start');
}

