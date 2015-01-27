/* 
 * Created by Sarah Shepherd
 * CIS4500 Specials Topic
 * University of Guelph
 * Visibility
 * 
 */
var world, player, light;
var width = 10;
var height = 8;
var worldWidth = 88 * width;
var worldHeight = 88 * height;
var tileSize = 88;

var enemNum = 4;
var enemies = [];

var points = 0, counter = 0, recount = 0;

window.addEventListener("keydown", keyDownEvent, false);

function init() {
    //Create canvas
    world = new World(worldWidth, worldHeight, tileSize, 0);
    //create dog
    player = new Sprite(world, tileSize, tileSize, "images/PlayerL.png", 4, 5, 2);
    //The dog's light
    light = new Sprite(world, tileSize, tileSize, "images/light.png", 3, 5, 3);
    setLight();

    //Create Ghost
    for (var i = 0; i < enemNum; i++) {
        enemies[i] = new Sprite(world, tileSize, tileSize, "images/ghostHL.png", i * tileSize, worldHeight - (tileSize * i), 1);
        addGhost(i);

    }

    //Game Play points and timer
    points = 0;
    document.getElementById("bgNoise").play();

    world.start();

}
function setLight() {
    //Get XY position of dog
    var x = player.getX();
    var y = player.getY();

    //Control the battery of the flashlight/recharge
    if (light.isVisible()) {
        counter++;
    } else {
        counter = 0;
        recount--;
    }
    if (counter > 3) {
        light.hide();
        counter = 0;
        recount = 4;
    }

    //place light in front of dog
    if (player.getDir() == "Left") {
        light.setImage("images/light.png");
        light.setX((x - tileSize) / tileSize);
    } else {
        light.setImage("images/lightR.png");
        light.setX((x + tileSize) / tileSize);
    }
    light.setY(y / tileSize);
}

function keyDownEvent(e) {
    var oldX, oldY, x = -1, y = -1;
    //Get player XY
    oldX = player.getX();
    oldY = player.getY();
    //Determine which key is pressed
    switch (e.keyCode) {
        //potenial bark or light command
        // Space key pressed
        case 32:
            if (!light.isVisible() && recount <= 0) {
                light.show();
            } else {
                light.hide();
            }
            break;

            //Left key
        case 37:
            e.preventDefault();
            if (player.getDir() === "Right") {
                player.setImage("images/PlayerL.png");
                player.setDir("Left");
            } else {
                x = oldX - tileSize / 2;
                if (checkBordX(x))
                    player.setX(x / tileSize);
            }
            break;

            //Up key
        case 38:
            e.preventDefault();
            y = oldY - (tileSize / 2);
            if (checkBordY(y))
                player.setY(y / tileSize);
            break;

            //Right Key    
        case 39:
            e.preventDefault();
            if (player.getDir() === "Left") {
                player.setImage("images/PlayerR.png");
                player.setDir("Right");
            } else {
                x = oldX + (tileSize / 2);
                if (checkBordX(x))
                    player.setX(x / tileSize);
            }
            break;

            //Down Key
        case 40:
            e.preventDefault();
            y = oldY + tileSize / 2;
            if (checkBordY(y))
                player.setY(y / tileSize);
            break;
    }

//Move or update these after every key press (valid or not)
    setLight();
    EnemyMoves();
    lightCheck();
    deadDog();
}
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

function EnemyMoves() {
    var move;
    var playerX = player.getX();
    var playerY = player.getY();

    for (var i = 0; i < enemNum; i++) {
        var x, y, oldX, oldY;
        //Enemies visible only when light is dim
        if (light.isVisible()) {
            enemies[i].hide();
        } else {
            enemies[i].show();
        }
        //If player is movable
        if (enemies[i].getId() != 0) {
            //pick randomly to move either an x or y position for ghost
            move = Math.floor(Math.random() * 2);
            //Get current position
            oldX = enemies[i].getX();
            oldY = enemies[i].getY();

            //Move x postion or y position of ghost
            if (move === 0) {
                if (oldX >= playerX) {
                    x = (oldX - tileSize / 2) / tileSize;
                    enemies[i].setDir("Left");
                    enemies[i].setImage("images/ghostHL.png");
                } else {
                    x = (oldX + tileSize / 2) / tileSize;
                    enemies[i].setDir("Right");
                    enemies[i].setImage("images/ghostHR.png");
                }
                if (checkBordX(x) && checkGhost(i))
                    enemies[i].setX(x);
            } else {
                if (oldY >= playerY) {
                    y = (oldY - tileSize / 2) / tileSize;
                } else {
                    y = (oldY + tileSize / 2) / tileSize;
                }
                if (checkBordY(y) && checkGhost(i))
                    enemies[i].setY(y);
            }

        } else {
            //Non-movable ghost has been caught
            //Restart ghost
            addGhost(i);
        }
    }


}
function addGhost(i) {
    var y = Math.floor(Math.random() * height);
    var side = Math.floor(Math.random() * 2);
    //Set various values of ghost
    enemies[i].setId(1);
    if (side === 1)
    {
        side = width - 1;
        enemies[i].setDir("Left");
        enemies[i].setImage("images/ghostHL.png");
    } else {
        enemies[i].setDir("Right");
        enemies[i].setImage("images/ghostHR.png");
    }
    while (!checkGhost(i)) {
        //check again
    }
    enemies[i].setX(side);
    enemies[i].setY(y);
    //console.log(" xy:" + enemies[i].getX() + " " + enemies[i].getY());
}
function checkGhost(num) {
    /*This function doesn't work as well as I want*/
    var cX, cY, eX, eY;
    cX = enemies[num].getX();
    cY = enemies[num].getY();
  //ghost should not be on top of each other
    for (var i = num; i >= 0; i--) {
        if (i != num) {
            eX = enemies[i].getX();
            eY = enemies[i].getY();
            //console.log(i+" eX: "+eX+"eY: "+eY);
            if ((cX > eX && cX < (eX + tileSize) || (cX + tileSize) > eX && (cX + tileSize) < (eX + tileSize)) && (cY > eY && cY < (eY + tileSize) || (cY + tileSize) > eY && (cY + tileSize) < (eY + tileSize))) {
                return false;
            }
        }

    }
    return true;

}

function lightCheck() {
    var cX, cY, eX, eY;
    cX = light.getX();
    cY = light.getY();
    //Light should disintigrate a ghost
    for (var i = 0; i < enemNum; i++) {
        eX = enemies[i].getX();
        eY = enemies[i].getY();
        
        if ((cX >= eX && cX < (eX + tileSize) || (cX + tileSize) >= eX && (cX + tileSize) < (eX + tileSize)) && (cY >= eY && cY < (eY + tileSize) || (cY + tileSize) >= eY && (cY + tileSize) < (eY + tileSize))) {
            if (light.isVisible()) {
                //replace the image of the ghost
                if (player.getDir() == "Left") {
                    light.setImage("images/ghostUnL2.png");
                } else {
                    light.setImage("images/ghostUnR.png");
                }

                enemies[i].setId(0);
                gamePoints(1);
            }
        }
    }
}
function deadDog() {
    var cX, cY, eX, eY;
    cX = player.getX();
    cY = player.getY();
    for (var i = 0; i < enemNum; i++) {
        eX = enemies[i].getX();
        eY = enemies[i].getY();
        if ((cX >= eX && cX < (eX + tileSize / 2) || (cX + tileSize / 2) >= eX && (cX + tileSize / 2) < (eX + tileSize / 2)) && (cY >= eY && cY < (eY + tileSize / 2) || (cY + tileSize / 2) >= eY && (cY + tileSize / 2) < (eY + tileSize / 2))) {
            //show Enemy that got the dog
            enemies[i].show();
            //GamePlay mechanics
            gamePoints(0);
            //restart ghost
            addGhost(i);

        }

    }
}

function gamePoints(condition) {
    //Update score
    if (condition == 1) {
        points++;
        document.getElementById("bark").play();
    } else {
        document.getElementById("laugh").play();
        points--;
    }
    document.getElementById("points").innerHTML=points;
    //console.log("Points: " + points);


}
function checkEnd() {
    if (document.getElementById("bgNoise").paused) {

        //Show score and restart or leave page
        if (window.confirm("Final score was " + points + "!\nLet's play it again?")) {
            points = 0;
            init();

        } else {

            //console.log("Game Over");
            //Disable controls
            window.removeEventListener("keydown", keyDownEvent, false);
            world.stop();
        }
    }
}


function update() {
    world.clear();
    player.update();
    light.update();
    for (var i = 0; i < enemNum; i++) {
        enemies[i].update();
    }
    checkEnd();

}