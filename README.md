
<div align="center">
    <img src="https://i.imgur.com/aFu3cek.png" height="250">
    <h1> pirate-rush </h1>
    <p align="center">
        <h4> 🎮⛵ An enticing and engaging game for <a href="http://www.dbit.in/">DBIT</a>'s online techfest <a href="https://teknack.in/">Teknack</a>'18. Ahoy mates. Welcome aboard!! </h4>
</div>

<br>

This game was created using `PhaserJS`([check it out](http://phaser.io/)), `nodejs`, `express` and `mongoDB`.

## Contents
 - [Installation](#installation)
 - [Running the game](#running-the-game)
 - [Story](#story)
 - [Instructions](#instructions)
 - [How to Play](#how-to-play)
 - [Screenshots](#screenshots)

## Installation
 - `nodejs  >= v6.9` [get it here.](https://nodejs.org/en/)
 - Run `npm install` in the root directory.
 - For functioning leaderboard you need mongoDB to be installed [get the community version here.](https://www.mongodb.com/download-center?jmp=nav#community)
 - Add mongod and mongo to the PATH _if you want to run the shell from anywhere_ or else you will have to 
 navigate to the bin directory every time to run the mongo shell.

## Running the game
 - change the `environment` variable in `app.js` from `production` to `development`.
 - open the terminal (not necessarily in the root directory) and run `mongod` to start the mongo server.
 - open another instance of the terminal in the root directory and execute `node app.js` to start the express server.
 - open your browser and type `localhost:3004` in the address bar to run the game. You can also change the port by changing the value of the `port` variable in `app.js` and restarting the express server.

---------------------

## Story
   A pirate ventures on a voyage to find the greatest treasure in the world. But, in order to achieve that goal,
he needs to fight many other pirates who have the pieces of the map that leads to the greatest treasure.

## Instructions
 - The main objective is to shoot down a particular number(varies for each level) of enemy pirate ships before you run out of life or ammo.
 - The score will be based on how quickly a level is completed, the amount of ammo used and accuracy of the cannon shots. 
 - As the battle nears its end a map will spawn on the location of the last ship that was shot down. 
 - Collecting the map will take you to the next level.
 - There are 4 levels with the 4th one being the **BOSS** level.
> ### Play with volume on for best experience. Enjoy the thrilling 🎵 🎶
 
## How to play
 - Press <kbd>W</kbd> or <kbd>⭡</kbd> to steer the ship forward.

 - Press <kbd>A</kbd> or <kbd>⭠</kbd> to rotate the helm(steering) of the ship towards the left.

 - Press <kbd>D</kbd> or <kbd>⭢</kbd> to rotate the helm(steering) of the ship towards the right.

 - Move the <kbd>mouse</kbd> around to change the direction of the cannon.

 - Left click the <kbd>mouse</kbd> to fire a cannonball.
 
 > ### Use <kbd>W</kbd> , <kbd>A</kbd> and <kbd>D</kbd> in combination for better steering.
 
 --------------
 
 ## Screenshots
 
- ### Loading Screen
 ![Loading Screen](https://i.imgur.com/i3AcuVT.png)
 
- ### Home Page
 ![Home Page](https://i.imgur.com/t1haNuj.png)
 
- ### Instructions
 ![Instructions](https://i.imgur.com/v7eCMR5.png)
 
- ### Level 1
 ![Level 1](https://i.imgur.com/SgBV29j.png)
 
- ### Level 2
 ![Level 2](https://i.imgur.com/jdY0Cp9.png)
 
- ### Map Unlock
 ![Map Unlock](https://i.imgur.com/XKBcu94.png)
 
- ### Level Complete
 ![Level Complete](https://i.imgur.com/wM4V7BJ.png)
 
 - ### Leaderboard
 ![Leaderboard](https://i.imgur.com/trGNf7r.png)
 
> ### Well, where are levels 3 and 4? You gotta 🎮 to find out. 😜 
 
 
 
 
