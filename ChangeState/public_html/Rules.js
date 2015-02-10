/* 
 * Created by Sarah Shepherd
 * CIS*4500
 * University of Guelph
 * 
 * Change of State
 */

var level = 0;
var screen;
var player = [], playerNum = 3, current = 0;
var key = 0, timer = 0, wallNum = 6;
var wall = [], hook, button, elevator, ladder;
var eve, condition = [], cNum = 2, goal;



function State(screen) {
    this.screen = screen;
    drawObjects();
    drawLevel();

    //Create three players
    player[0] = new Sprite(screen, screen.tileWidth, screen.tileWidth * 2, "images/SM.png", 0, 200, 1);
    player[0].createAnimation(200, 200, 4, 2);
    player[1] = new Sprite(screen, screen.tileWidth, 75, "images/SF.png", 0, 225, 1);
    player[1].createAnimation(200, 150, 4, 2);
    player[2] = new Sprite(screen, screen.tileWidth, screen.tileWidth, "images/SS.png", 0, 250, 1);
    player[2].createAnimation(200, 100, 4, 2);

    eve = window;
    eve.addEventListener("keydown", keyDownEvent, false);
    window.addEventListener("keyup", keyUpEvent, false);


    screen.start();
}

function update() {
    var i;
    screen.clear();
    drawLevel();
    // player.animate();
    for (i = 0; i < playerNum; i++) {
        player[i].update();
    }

    checkObjCollisions();
    endGoal();
}

function keyUpEvent(e) {
    key = 0;
}

function keyDownEvent(e) {
    var x, y;
    var xPos, yPos;
    var move;

    x = player[current].getX();
    y = player[current].getY();
    xPos = x + player[current].getWidth() / 2;
    yPos = x + player[current].getHeight();

    /*Determine which key is pressed*/
    switch (e.keyCode) {
        //poetnial bark or light command
        // Space key pressed

        case 32:
            e.preventDefault();
            //Change character
            current = (current + 1) % 3;
            break;

            //Left key
        case 37:
            e.preventDefault();
            move = 1;
            //check walls before moving
            //rightside and leftside
            for (var i = 3; i <= wallNum; i++) {
                if (((x + 10) > wall[i][0]) && ((x + 10) < (wall[i][0] + wall[i][2]))) {
                    if ((y > wall[i][1]) && (y < (wall[i][1] + wall[i][3]))) {
                        move = 0;
                    }
                }
            }

            for (var i = 0; i < cNum; i++) {
                if (((x + 10) >= condition[i][0]) && ((x + 10) < (condition[i][0] + condition[i][2]))) {
                    if ((y >= condition[i][1]) && (y < (condition[i][1] + condition[i][3]))) {
                        move = 0;
                    }
                }
            }

            if (move === 1) {
                player[current].aniDir(1);
                player[current].setX(x - 5);
            }
            break;

            //Up key
        case 38:
            e.preventDefault();

            //if player 0/1 AND collision with ladder
            //increase x and update until ladder done;
            if (current !== 2) {

                if ((xPos >= ladder.getX()) && (xPos <= (ladder.getX() + ladder.getWidth()))) {
                    if (((y + player[current].getHeight()) >= (ladder.getY() + 20)) && ((y + player[current].getHeight()) <= (ladder.getY() + ladder.getHeight()))) {
                        i = 0;
                        eve.removeEventListener("keydown", keyDownEvent, false);
                        var check = function () {
                            if (i > 175) {
                                // run when condition is met move on
                                eve.addEventListener("keydown", keyDownEvent, false);
                            }
                            else {
                                player[current].setY(y - i);
                                player[current].animate();
                                update();
                                i += 5;
                                setTimeout(check, 75); // check again in a second
                            }
                        };
                        check();
                    }
                }
            }
//
            break;

            //Right Key    
        case 39:
            e.preventDefault();
            //check walls before moving
            move = 1;
            for (var i = 3; i <= wallNum; i++) {
                if ((xPos >= wall[i][0]) && (xPos < (wall[i][0] + wall[i][2]))) {
                    if ((y >= wall[i][1]) && (y < (wall[i][1] + wall[i][3]))) {
                        move = 0;
                    }
                }
            }
            for (var i = 0; i < cNum; i++) {
                if (((xPos) >= condition[i][0]) && ((xPos) < (condition[i][0] + condition[i][2]))) {
                    if ((y >= condition[i][1]) && (y < (condition[i][1] + condition[i][3]))) {
                        move = 0;
                    }
                }
            }
            if (move === 1) {
                player[current].aniDir(0);
                player[current].setX(x + 5);
            } else {
                player[current].setX(x - 5);
            }
            break;
            //Down Key (NOT AVAILABLE IN THIS GAME
    }

    player[current].animate();
}
/***Boarder detection ***/
function checkBordY(newPos) {
    if (newPos >= 0 && newPos < screen.height) {
        return true;
    }
//Outside of boarders
    return false;
}
function checkBordX(newPos) {
    if (newPos >= 0 && newPos < screen.width) {
        return true;
    }
//Outside of boarders
    return false;
}

function drawLevel() {
    var i, j, k = 0;
    screen.context.fillStyle = "#7E2D6C";
    for (i = 0; i <= wallNum; i++) {
        if (i == 6)
            screen.context.fillStyle = "#C6D2E7";
        screen.context.fillRect(wall[i][0], wall[i][1], wall[i][2], wall[i][3]);
    }
    for (i = 0; i < cNum; i++) {
        screen.context.fillStyle = "#C6D2E7";
        screen.context.fillRect(condition[i][0], condition[i][1], condition[i][2], condition[i][3]);
    }



    hook.update();
    elevator.update();
    button.update();
    ladder.update();
    goal.update();
}

function drawObjects() {
    wall[0] = [0, screen.height - 10, screen.width, screen.height];
    wall[1] = [0, 0, screen.width, 10];
    wall[2] = [0, 115, screen.width, 10];
    wall[3] = [0, 0, 10, 200];
    wall[4] = [460, 115, 10, 120];
    wall[5] = [screen.width - 10, 115, 10, 190];
    wall[6] = [340, 10, 10, 105];

    condition[0] = [0, 175, 10, 120];
    condition[1] = [590, 5, 10, 115];

    hook = new Sprite(screen, screen.tileWidth, screen.tileWidth / 2, "images/hook.png", 440, 10, 2);
    //button= new Sprite(screen, screen.tileWidth, screen.tileWidth/2, "images/button.png", 150,  95, 2);
    button = new Sprite(screen, screen.tileWidth, screen.tileWidth / 2, "images/button.png", 150, screen.height - 30, 2);
    elevator = new Sprite(screen, screen.tileWidth, screen.tileWidth / 2, "images/Lift.png", 380, screen.height - 35, 2);
    ladder = new Sprite(screen, screen.tileWidth, 185, "images/ladder.png", 240, 115, 2);

    goal = new Sprite(screen, 25, 25, "images/key.png", 550, screen.height - 35, 2);
}

function checkObjCollisions() {
//player[1] collides with button

    if (player[1].collision(button.getX(), button.getY(), button.getWidth(), button.getHeight())) {
        wallNum = 5;
        // console.log("button press");
        // MAKE wall[5] Disappear
    } else {
        wallNum = 6;
    }

    var i, j;


//player[0] collides with hook

    if (player[0].collision(hook.getX() + 10, hook.getY(), hook.getWidth() - 10, hook.getHeight())) {
        //console.log(elevator.getY(),"hook press");



        for (i = 1; i < 3; i++) {
            if (player[i].collision(elevator.getX(), elevator.getY(), elevator.getWidth(), elevator.getHeight())) {
                //player[i].setY(player[i].getY()-180);
                elevator.setY(95);
                player[i].setY(125 - player[i].getHeight());
            }
        }
        elevator.setY(95);

        //make elavator move <- Maybe not



    } else {
        elevator.setY(screen.height - 35);
    }

//if player colides with key
    for (i = 0; i < 3; i++) {
        if (player[i].collision(goal.getX(), goal.getY(), goal.getWidth(), goal.getHeight())) {
            //remove key
            ////remove collision
            goal.hide();
            cNum = 1;

        }

    }


}

function endGoal() {

    if (!goal.isVisible()) {

        if (((player[0].getX() + player[0].getWidth()) >= screen.width) && ((player[1].getX() + player[1].getWidth()) > screen.width) && (player[2].getX() + player[2].getWidth()) > screen.width) {
            //End Game
            document.getElementById("win").play();

            screen.context.font = "30px Verdana";
            // Create gradient
            var gradient = screen.context.createLinearGradient(0, 0, screen.width, 0);
            gradient.addColorStop("0", "magenta");
            gradient.addColorStop("0.5", "blue");
            gradient.addColorStop("1.0", "red");
            // Fill with gradient
            screen.context.fillStyle = gradient;
            screen.context.fillText("Mission Accomplished!", 120, 90);

//stop screen completely
            screen.stop();
        }
    }
}

function Reset() {
    drawObjects();
    drawLevel();

    //Create three players
    player[0] = new Sprite(screen, screen.tileWidth, screen.tileWidth * 2, "images/SM.png", 0, 200, 1);
    player[0].createAnimation(200, 200, 4, 2);
    player[1] = new Sprite(screen, screen.tileWidth, 75, "images/SF.png", 0, 225, 1);
    player[1].createAnimation(200, 150, 4, 2);
    player[2] = new Sprite(screen, screen.tileWidth, screen.tileWidth, "images/SS.png", 0, 250, 1);
    player[2].createAnimation(200, 100, 4, 2);

    eve = window;
    eve.addEventListener("keydown", keyDownEvent, false);
    window.addEventListener("keyup", keyUpEvent, false);
    screen.start();
}
