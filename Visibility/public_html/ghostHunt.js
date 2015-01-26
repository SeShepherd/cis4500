/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var world, player, light, timer;
var worldWidth = 88 * 13;
var worldHeight = 88 * 9;
var tileSize = 88;

var enemNum = 4;
var enemies = [];

window.addEventListener("keydown", keyDownEvent, false);

function init() {
    //Create canvas
    world = new World(worldWidth, worldHeight, tileSize, 0);
    //create dog
    player = new Sprite(world, tileSize, tileSize, "images/PlayerL.png", 4, 5, 2);
    world.setGridVal(4, 5, 2);
    light = new Sprite(world, tileSize, tileSize, "images/light.png", 3, 5, 3);
    world.setGridVal(3, 5, 3);
    setLight();


    for (var i = 0; i < enemNum; i++) {
        addGhost(i);

    }

    world.start();
    // timer.start();

}

function update() {

    world.clear();
    player.update();
    light.update();

    for (var i = 0; i < enemNum; i++) {
        enemies[i].update();
    }
}

/*Keyboard event handler*/
function keyDownEvent(e) {
    var oldX, oldY, x = -1, y = -1;
    oldX = player.getX();
    oldY = player.getY();
    /*Determine which key is pressed*/
    switch (e.keyCode) {

        //poetnial bark or light command
        // Space key pressed
        case 32:

            break;

            //Left key
        case 37:
            // e.keyCode;
            // console.log(player.getDir());
            if (player.getDir() === "Right") {
                player.setImage("images/PlayerL.png");
                player.SetDir("Left");
            } else {
                x = oldX - tileSize;
                if (checkBordX(x))
                    player.setX(x);
            }

            break;

            //Up key
        case 38:
            e.preventDefault();
            // e.keyCode;
            y = oldY - tileSize;
            if (checkBordY(y))
                player.setY(y);
            break;

            //Right Key    
        case 39:
            // e.keyCode;
            if (player.getDir() === "Left") {
                player.setImage("images/PlayerR.png");
                player.SetDir("Right");
            } else {
                x = oldX + tileSize;
                if (checkBordX(x))
                    player.setX(x);
            }
            break;

            //Down Key
        case 40:
            //e.keyCode;
            e.preventDefault();
            y = oldY + tileSize;
            if (checkBordY(y))
                player.setY(y);
            break;
    }
    setLight();
    setGrid(oldX, oldY, x, y, player.getId());
    callEnemy();

}

/***Boarder detection ***/
function checkBordY(newPos) {
    if (newPos >= 0 && newPos < worldHeight) {
        return true;
    }

    //Outside of boarders
    return false;
}

function checkBordX(newPos) {
    if (newPos >= 0 && newPos < worldWidth) {
        return true;
    }

    //Outside of boarders
    return false;
}

function setGrid(Ox, Oy, x, y, id) {
    
    if (x !== -1) {
        world.setGridVal(Ox / tileSize, Oy / tileSize, 0);
        world.setGridVal(x / tileSize, Oy / tileSize, id);//What sprite am I looking at?
    } else if (y !== -1) {
        world.setGridVal(Ox / tileSize, Oy / tileSize, 0);
        world.setGridVal(Ox / tileSize, y / tileSize, id);//What sprite am I looking at?
    }
 
}

function callEnemy() {
    var move;
    var playerX = player.getX();
    var playerY = player.getY();

    //console.log("Player: " + playerX + "  " + playerY + "\n");
    for (var i = 0; i < enemNum; i++) {
        var x = -1, y = -1, oldX, oldY;


        //pick randomly to move either an x or y position for ghost
        move = Math.floor(Math.random() * 2);

        oldX = enemies[i].getX();
        oldY = enemies[i].getY();

        //Move x postion
        if (move === 0) {
            if (oldX >= playerX) {
                x = oldX - tileSize;
                enemies[i].setImage("images/ghostHL.png");
            } else {
                x = oldX + tileSize;
                enemies[i].setImage("images/ghostHR.png");
            }
            if (checkBordX(x) && world.getGridVal(x / tileSize, oldY / tileSize) !== 1)
                enemies[i].setX(x);
        } else {
            if (oldY >= playerY) {
                y = oldY - tileSize;
            } else {
                y = oldY + tileSize;
            }
            if (checkBordY(y) && world.getGridVal(oldX / tileSize, y / tileSize) !== 1)
                enemies[i].setY(y);
        }
        if (checkBordY(y) || checkBordX(x))
            setGrid(oldX, oldY, x, y, enemies[i].getId());
    }


}
function addGhost(i){
     var y = Math.floor(Math.random() * (9 - 0 + 1));
        var side = Math.floor(Math.random() * 2);
        if (side === 1)
        {
            side = 9;
        }

        enemies[i] = new Sprite(world, tileSize, tileSize, "images/ghostHL.png", side, y, 1);
        world.setGridVal(side,y/tileSize,1);
}

function setLight(){
    world.setGridVal(light.getX()/tileSize,light.getY()/tileSize,0);
   var x= player.getX();
   var y= player.getY();
    if (player.getDir()==="Left"){
        light.setImage("images/light.png");
        light.setX(x-tileSize);
    }else{
        light.setImage("images/lightR.png");
        light.setX(x+tileSize);
        
    }
    light.setY(y);
    world.setGridVal(light.getX()/tileSize,light.getY()/tileSize,3);
}
