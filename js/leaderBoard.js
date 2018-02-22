var data = [
    {
        name : "lol_code",
        score: 5
    },
    {
        name : "marcos",
        score: 0
    },
    {
        name : "Chote Bheem",
        score: 0
    },
    {
        name : "DC Masters",
        score: 0
    },
    {
        name : "O(1)",
        score: 0
    },
]

var coord = [
    {
        nx: 320,                                        //320
        ny: 183,                                        //183
        sx: 595,                                        //595
        sy: 183
    },
    {
        nx: 320,
        ny: 270,
        sx: 595,
        sy: 270
    },
    {
        nx: 320,
        ny: 345,
        sx: 595,
        sy: 345
    },
    {
        nx: 320,
        ny: 440,
        sx: 595,
        sy: 440
    },
    {
        nx: 320,
        ny: 533,
        sx: 595,
        sy: 533
    },
]

var nameText = [];
var scoreText = [];

function preloadLeadB() {
    game.load.image('leaderboard', 'assets/ui/leaderboard.png');
    game.load.spritesheet('prevButton', 'assets/ui/prev-button.png', 116, 116, 3);
    game.load.bitmapFont('zilla-slab', 'assets/fonts/zilla-slab/zilla-slab.png', 'assets/fonts/zilla-slab/zilla-slab.fnt');
}

function createLeadB() {
    gameScore += lvlScore;
    game.add.sprite(0, 0, 'leaderboard');
    prevButton = game.add.button(10, game.world.centerY -30, 'prevButton', goBack, this, 1, 0);
    prevButton.scale.setTo(0.7,0.7);

    var name;

    var score;

    for (let i = 0; i < 5; i++) {
        name = game.add.bitmapText(coord[i].nx, coord[i].ny, 'zilla-slab', data[i].name, 30);
        name.tint = 0x223344;
        score = game.add.bitmapText(coord[i].sx, coord[i].sy, 'zilla-slab', data[i].score.toString(), 30);
        score.tint = 0x223344;
    }

    // firstName = game.add.bitmapText(game.world.centerX - 220, 300, 'gem', "Your Score : " + gameScore.toString(), 55);
    // firstName.tint = 0x223344;
    // secondName = game.add.bitmapText(game.world.centerX - 220, 300, 'gem', "Your Score : " + gameScore.toString(), 55);
    // secondName.tint = 0x223344;
    // thirdName = game.add.bitmapText(game.world.centerX - 220, 300, 'gem', "Your Score : " + gameScore.toString(), 55);
    // thirdName.tint = 0x223344;
    // fourthName = game.add.bitmapText(game.world.centerX - 220, 300, 'gem', "Your Score : " + gameScore.toString(), 55);
    // fourthName.tint = 0x223344;
    // fifthName = game.add.bitmapText(game.world.centerX - 220, 300, 'gem', "Your Score : " + gameScore.toString(), 55);
    // fifthName.tint = 0x223344;

    // firstScore = game.add.bitmapText(game.world.centerX - 220, 300, 'gem', "Your Score : " + gameScore.toString(), 55);
    // firstScore.tint = 0x223344;
    // secondScore = game.add.bitmapText(game.world.centerX - 220, 300, 'gem', "Your Score : " + gameScore.toString(), 55);
    // scoreScore.tint = 0x223344;
    // thirdScore = game.add.bitmapText(game.world.centerX - 220, 300, 'gem', "Your Score : " + gameScore.toString(), 55);
    // thirsScore.tint = 0x223344;
    // fourthScore = game.add.bitmapText(game.world.centerX - 220, 300, 'gem', "Your Score : " + gameScore.toString(), 55);
    // fourthScore.tint = 0x223344;
    // fifthScore = game.add.bitmapText(game.world.centerX - 220, 300, 'gem', "Your Score : " + gameScore.toString(), 55);
    // fifthScore.tint = 0x223344;

}

function over() {
    console.log('button over');
}

function out() {
    console.log('button out');
}

function updateLeadB() {

}

function goBack() {
    game.state.start('Start');
}

