/* 
 * Created by Sarah Shepherd
 * CIS*4500
 * University of Guelph
 * 
 * Board Game
 */

//Game
var board, controls;
var playerNum = 0, player = [];
var current = 0;
var grid = [];

//balls
var ballNum = 100, balls = [];
//controls
var bingo, bingoNum = "0";
var cList = [], colourList = ["Red", "Blue", "Green", "Yellow"];
var nList = [];
var roll, guess;
var gMark = [];






function Game(cage, screen) {
    window.addEventListener("mousedown", mouseDownEvent, false);
    controls = cage;
    board = screen;
    //Ask for players #
    playerNum = $("#players").val();
    current = 1;

    //Add players
    var i, j, k;
    for (i = 0; i < playerNum; i++) {
        player[i] = new Sprite(board, board.tileWidth, board.tileWidth, "images/p" + (i + 1) + ".png", (3 * i), 345 + (3 * i), 0);

    }

    //Set projectile markers to hidden
    gMark[0] = new Projectile(controls, 0, 0, 10, "brown", 0);
    gMark[0].hide();
    gMark[1] = new Projectile(controls, 0, 0, 10, "brown", 0);
    gMark[0].show();

    i = 0;
    for (j = 11; j >= 0; j--) {
        if (j % 2 === 1) {
            for (k = 0; k < 13; k++) {

                grid[i] = {x: k, y: j};
                i++;
            }

        }
        else {
            for (k = 12; k >= 0; k--) {

                grid[i] = {x: k, y: j};
                i++;
            }
        }

    }

//    for (i = 0; i < 156; i++) {
//        console.log(i, grid[i].x, grid[i].y);
//    }
    //0 is color, 1 is number
    //Setup ballcage array
    for (i = 0; i < ballNum; i++) {

        balls[i] = [];
        if (i <= ((ballNum / 2) - (ballNum / 4))) {
            balls[i][0] = 0;
        } else if (i <= ballNum / 2) {
            balls[i][0] = 1;
        } else if (i <= ((ballNum / 2) + (ballNum / 4))) {
            balls[i][0] = 2;
        } else {
            balls[i][0] = 3;
        }
        balls[i][1] = (i % 8) + 1;
        //console.log(balls[i][0], balls[i][1]);
    }

//Create controller board
    createController();

    board.start();
}

function update() {
    //console.log(bingoNum);
    board.clear();
    board.context.fillStyle = "silver";
        board.context.font = "20px Verdana";
        board.context.fillText("player "+current, 150, 20);
    
    drawPlayers();

    controls.clear();
    bingo.update();
        
    controls.context.beginPath();
    controls.context.fillStyle = "white";
    controls.context.arc(50, 45, 15, 0, 360);
    controls.context.closePath();
    controls.context.fill();
    placeNum(bingoNum);
    drawController();
    gMark[0].update();
    gMark[1].update();


}
function createController() {
    //Ball (circle and text)
    bingo = new Projectile(controls, 50, 45, 40, "blue", 0);

    //Add text
    placeNum(bingoNum);

    //Roll (rectangle)
    roll = {x: 10, y: 90, width: 100, height: 50, text: "Roll"};
    guess = {x: 10, y: 150, width: 100, height: 50, text: "Guess"};

    makeList();
    //Pick Number (1-8)
    //Pick Colour (4 squares)
    drawController();
}
function placeNum(text) {
    controls.context.font = "20px Verdana";
    // Create gradient
    var gradient = controls.context.createLinearGradient(10, 10, controls.width, 0);
    gradient.addColorStop("0", "black");
    gradient.addColorStop("0.3", "white");

    // Fill with gradient
    controls.context.fillStyle = gradient;
    controls.context.fillText(text, 44, 50);
}

function drawPlayers() {
    var i;

    for (i = 0; i < playerNum; i++) {
        player[i].update();
    }
}
function playerTurn(extra) {
    var x, y, locate, temp;
    var i;
    //who's turn it is?
    x = player[current - 1].getX();
    y = player[current - 1].getY();
    locate = player[current - 1].getId();

    //Guess or not
    if (extra === 1) {
        //get colour
        var color = ((gMark[0].y + 25) / 50) - 1;
        //get number
        var number = ((gMark[1].y + 12.5) / 25);
    } else {
        gMark[0].hide();
        gMark[1].hide();
    }


    //get role
    var ball = [];
    ball = role();
    bingo.changeColor(colourList[ball[0]]);
    bingoNum = ball[1];


    if (locate + ball[1] < 156 && locate + ball[1] > 0) {
        temp = grid[(locate + ball[1])].y;
    } else {
        if ((locate - ball[1]) > 0) {
            temp = grid[(locate - ball[1])].y;
        } else {
            temp = 0;
        }
    }
    //add additional moves
    if (extra === 1) {
        if (color === ball[0] && number === ball[1]) {
            temp = grid[locate].y - 1;

            for (i = locate; i <= (locate + 26); i++) {
                if (grid[i].x === grid[locate].x && grid[i].y === (grid[locate].y - 1)) {
                    locate = i;
                    break;
                }
            }
            ball[1] = 0;
        } else if (color === ball[0] || number === ball[1]) {
            locate++;
        } else {
            locate -= 2;
        }
    }


    //Move pawn
    //check outside conditions
    if (locate + ball[1] < 156 && locate + ball[1] > 0) {
        //Set pawn
        player[current - 1].setId(locate + ball[1]);
        player[current - 1].setX(grid[(locate + ball[1])].x
                * (player[current - 1].getWidth() + 5) + ((current - 1) * 3));

        player[current - 1].setY(temp
                * (player[current - 1].getHeight() + 4) + ((current - 1) * 3) + 20);

    } else {
        //Extra case
        if (extra === 1 && color === ball[0] && number === ball[1])
            temp = grid[locate].y + 1;

        //If outside out bounds, go backwards
        if ((locate - ball[1]) > 0) {
            player[current - 1].setId(locate - ball[1]);

        } else {
            player[current - 1].setId(0);
        }

        player[current - 1].setX(grid[(locate - ball[1])].x
                * (player[current - 1].getWidth() + 5) + ((current - 1) * 3));

        player[current - 1].setY(temp
                * (player[current - 1].getHeight() + 4) + ((current - 1) * 3) + 20);

    }

    checkGoal();

    //Update turn
    current++;
    if (current > playerNum) {
        current = 1;
    }

}

function role() {
    var ball = [], rand;
    //Generate random ball
    rand = Math.floor(Math.random() * 100);
    //console.log(rand);

    ball[0] = balls[rand][0];
    ball[1] = balls[rand][1];

    return ball;
}


function checkGoal() {

    //console.log(player[current - 1].getId());
    if (player[current - 1].getId() === 155) {
        update();
        board.context.font = "32px Verdana";
        // Create gradient
        var gradient = board.context.createLinearGradient(0, 0, board.width, 0);
        gradient.addColorStop("0", "black");
        gradient.addColorStop("0.5", "magenta");
        gradient.addColorStop("1.0", "white");
        // Fill with gradient
        board.context.fillStyle = gradient;
        board.context.fillText("Player " + current + " is the Winner!", 15, 190);

        board.stop();
    }

}

function mouseDownEvent(evt) {
    var chance = 0;
    var mouseX = 0, mouseY = 0;
    //getting mouse position correctly:


    var bRect = controls.canvas.getBoundingClientRect();
    //getting mouse position correctly:
    mouseX = (evt.clientX - bRect.left) * (controls.canvas.width / bRect.width);
    mouseY = (evt.clientY - bRect.top) * (controls.canvas.height / bRect.height);

    for (i = 0; i < 8; i++) {
        if (mouseHit(nList[i], mouseX, mouseY)) {


            gMark[1] = new Projectile(controls, (nList[i].x + (nList[i].width / 2)), (nList[i].y + (nList[i].height / 2)), 10, "brown", 0);
        }
    }
    for (i = 0; i < 4; i++) {
        if (mouseHit(cList[i], mouseX, mouseY)) {


            gMark[0] = new Projectile(controls, (cList[i].x + (cList[i].width / 2)), (cList[i].y + (cList[i].height / 2)), 10, "brown", 0);
        }
    }
    //Get Player Turn
    if (mouseHit(roll, mouseX, mouseY) || mouseHit(guess, mouseX, mouseY)) {
        if (mouseHit(guess, mouseX, mouseY)) {
            chance = 1;
        }
        playerTurn(chance);
    }
    //console.log(mouseX, mouseY);

}

function makeList() {
    var i, j;
    var square;
    //create List
    for (i = 0; i < 8; i++) {
        square = {x: 125, y: i * 25, width: 25, height: 25, text: (i + 1)};
        nList.push(square);

    }
    for (j = 0; j < 4; j++) {
        square = {x: 150, y: j * 50, width: 50, height: 50, color: colourList[j]};

        cList.push(square);
    }

}
function drawController() {
    //Draw controller
    var i;

    //Roll
    button(roll);

    //Guess
    button(guess);

    for (i = 0; i < 8; i++) {
        //console.log(nList[i].text)
        controls.context.fillStyle = "white";
        controls.context.fillRect(nList[i].x, nList[i].y, nList[i].width, nList[i].height);
        controls.context.strokeStyle = "#0000FF";
        controls.context.lineWidth = 1;
        controls.context.strokeRect(nList[i].x, nList[i].y, nList[i].width, nList[i].height);

        controls.context.fillStyle = "black";
        controls.context.font = "15px Verdana";
        controls.context.fillText(nList[i].text, (nList[i].x + 8), (nList[i].y + 18));
    }

    for (i = 0; i < 4; i++) {
        //console.log("draw:",cList[i].x, cList[i].y, cList[i].width, cList[i].height);
        controls.context.fillStyle = cList[i].color;

        controls.context.fillRect(cList[i].x, cList[i].y, cList[i].width, cList[i].height);
        controls.context.strokeStyle = "#0000FF";
        controls.context.lineWidth = 1;
        controls.context.strokeRect(cList[i].x, cList[i].y, cList[i].width, cList[i].height);
    }


}
function button(square) {
    controls.context.fillStyle = "black";
    controls.context.fillRect(square.x, square.y, square.width, square.height);
    controls.context.strokeStyle = "#0000FF";
    controls.context.lineWidth = 1;
    controls.context.strokeRect(square.x, square.y, square.width, square.height);

    controls.context.fillStyle = "white";
    controls.context.font = "15px Verdana";
    controls.context.fillText(square.text, (square.width / 3), (square.y + 28));
}

function mouseHit(shape, mx, my) {
    //if any area of piece is clicked
    var dx;
    var dy;
    dx = mx > shape.x && mx < (shape.x + shape.width);
    dy = my > shape.y && my < (shape.y + shape.height);

    return (dx && dy);
}