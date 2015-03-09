/* 
 * Created by Sarah Shepherd
 * CIS*4500
 * University of Guelph
 * 
 * Tunnels
 */

//Game
var board, start;
var player, item = [];
var angle = 90, itemData = [];
var speed = 0, timer = 0, score = 0;


function Game(screen) {

    window.addEventListener("mousedown", mouseDownEvent, false);
    //Start button
    start = new Button(board, "START GAME", 150, 50, (screen.width / 2) - 75, (screen.height / 2) - 25);
}

function inBounds(x, y) {
    if (y >= 0 && y < board.height) {
        if (x >= 0 && x < board.width) {
            return true;
        }
    }

    //Outside of boarders
    return false;
}
function gameOver() {
    board.clear();

    //Display Final Score
    board.context.font = "30px Verdana";
    
    //Update the High score
    if(document.getElementById("score").textContent<score){
           document.getElementById("score").textContent =score;
       }
    // Create gradient
    var gradient = board.context.createLinearGradient(10, 10, board.width, 0);
    gradient.addColorStop("0", "Green");
    gradient.addColorStop("0.5", "white");
    gradient.addColorStop("1", "blue");

    // Fill with gradient
    board.context.fillStyle = gradient;
    board.context.fillText("Final Score: " + score, 100, board.height - (board.height / 4));

    //Display replay "start Game" button
    start.setText("Re-Play Game");
    start.Enable();
    start.draw();
    window.addEventListener("mousedown", mouseDownEvent, false);
    window.removeEventListener("keydown", keyDownEvent, false);
    window.removeEventListener("keyup", keyUpEvent, false);
    board.stop();
    timer.stop();

}

function degRad(angle) {
    return (angle / 180.0 * 3.141592);

}
function displayTimer() {
    time = timer.getCurT();
    if (time === 0) {
        gameOver();
    }
    board.context.font = "20px Verdana";

    // Fill with gradient
    board.context.fillStyle = "white";
    board.context.fillText("Time Left: " + time, 5, 20);
}
function displayScore() {

    board.context.font = "20px Verdana";

    // Fill with gradient
    board.context.fillStyle = "white";
    board.context.fillText("Score: " + score, 280, 20);
}

function keyDownEvent(e) {
    var x, y;
    spTime = 0;

    x = player.getX();
    y = player.getY();

    /*Determine which key is pressed*/
    switch (e.keyCode) {

        //Left key
        case 37:
            e.preventDefault();

            player.setDir(2);
            break;

            //Right Key    
        case 39:
            e.preventDefault();

            player.setDir(1);
            break;

    }
    if (speed !== 5) {
        speed++;
    }


    //console.log(angle, x, y);
}
function keyUpEvent(e) {
    switch (e.keyCode) {

        //Left key
        case 37:
            e.preventDefault();
            break;

            //Right Key    
        case 39:
            e.preventDefault();
            break;

    }

    player.setDir(0);

}
function mouseDownEvent(evt) {
    var mouseX = 0, mouseY = 0;
    angle = 90, speed = 0, timer = 0;
    score = 0;

    //getting mouse position correctly:
    var bRect = board.canvas.getBoundingClientRect();
    mouseX = (evt.clientX - bRect.left) * (board.canvas.width / bRect.width);
    mouseY = (evt.clientY - bRect.top) * (board.canvas.height / bRect.height);


    if (start.isClicked(mouseX, mouseY)) {
        //console.log("Game start");
        start.Disable();
        window.removeEventListener("mousedown", mouseDownEvent, false);
        window.addEventListener("keydown", keyDownEvent, false);
        window.addEventListener("keyup", keyUpEvent, false);
        //Background
        board.setBg("images/testBG.png");


        //player
        player = new Sprite(board, 50, 48, "images/play.png", (board.width / 2) + 150 * Math.cos(degRad(angle)), (board.height / 2) + 150 * Math.sin(degRad(angle)), 0);
        player.createAnimation(100, 48, 2, 1);

        //start world updatees
        board.start();

        // Start timer
        timer = new Timer(100, 0, 500);
        timer.startCountDown();

        //items
        for (i = 0; i < 5; i++) {
            item[i] = new Sprite(board, 5, 5, "images/cheese.png", board.width / 2, board.height / 2, i);
            itemData[i] = {angle: Math.floor(Math.random() * 360), radius: 0};
        }
    }

}

function move() {
    var cX = board.width / 2;
    var cY = board.height / 2;
    var radius = 150;
    var xOld = player.getX();
    var yOld = player.getY();
    var x,y;

    if (player.getDir() === 1) {
        angle -= speed;
        player.frameIndex = 0;
    } else if (player.getDir() === 2) {

        angle += speed;
        player.frameIndex = 1;
    }
    if (player.getDir() === 0) {
        if (angle > 92 && angle <= 275) {
            angle -= 5;
            player.frameIndex = 0;
        } else if (angle < 88 || angle > 275) {
            angle += 5;
            player.frameIndex = 1;
        }
    }

    x = cX + radius * Math.cos(degRad(angle));
    y = cY + radius * Math.sin(degRad(angle));

    player.setX(x);
    player.setY(y);
    
    if(x === xOld && y === yOld){
        speed=0;
    }



    if (angle >= 360) {
        angle -= 360;
    } else if (angle < 0) {
        angle += 360;
    }
}
function moveCheese(i) {
    //Make Cheese get bigger
    if (item[i].getWidth() < 35) {
        item[i].setWidth(item[i].getWidth() + .5);
        item[i].setHeight(item[i].getHeight() + .5);
    }


    //Move cheese outwards
    itemData[i].radius += 3;
    item[i].setX((board.width / 2) + itemData[i].radius * Math.cos(degRad(itemData[i].angle)));
    item[i].setY((board.height / 2) + itemData[i].radius * Math.sin(degRad(itemData[i].angle)));
    item[i].update();


    //Collision Points
    if (player.collision(item[i].getX(), item[i].getY(), item[i].getWidth(), item[i].getHeight())) {
        //add point
        score++;
        document.getElementById("cheese").play();

        //prepare to respawn item
        itemData[i].radius = 2;
        itemData[i].angle = Math.floor(Math.random() * 360);
        item[i].setHeight(5);
        item[i].setWidth(5);
        //item[i].hide();


    }
    if (!inBounds(item[i].getX(), item[i].getY())) {
        itemData[i].radius = 0;
        itemData[i].angle = Math.floor(Math.random() * 360);
        item[i].setHeight(5);
        item[i].setWidth(5);

    }

}
function randItem(itemNum) {
    var radius, itemAng;
    itemAng = Math.floor(Math.random() * 360);
    radius = 2;

    itemNum = {angle: itemAng, radius: radius};
}

function update() {

    board.clear();


    for (i = 0; i < 5; i++) {
        moveCheese(i);

    }
    //player.update();
    player.rotate(degRad(angle - 90));
    move();

    displayTimer();
    displayScore();
//console.log(timer.getElapsed(),timer.getCurT())
}