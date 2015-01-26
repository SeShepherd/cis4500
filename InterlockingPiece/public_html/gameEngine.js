/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */



//Canvas will become game world area
function World(width, height, tileWidth){

    //Create the canvas

	//Set the canvas size

  /*  //Set the world matrix
    this.tileWidth = tileWidth;
    this.grid = new Array(this.width / this.tileWidth);
    for(i = 0; i < this.width / this.tileWidth; i++){

    	this.grid[i] = new Array(this.height / this.tileWidth);
    	for(j = 0; j < this.height / this.tileWidth; j++)
    		this.grid[i][j] = 0;

    }*/

	//this.canvas.style.backgroundColor = "cyan";

}

//Start up the canvas
World.prototype.start = function () {

    //Set the method "update" to run every 50 milliseconds
    this.updateTime = setInterval(update, 50);

    //Set mouse functions
    document.onmousemove = this.setMousePos;
    document.onmousedown = this.mousePressedAction;
    document.onmouseup = this.mouseReleasedAction;
    document.onclick = this.mouseClickedAction;

    //this.mouseX = 0;
    //this.mouseY = 0;
    //this.mouseDown = false;

};

World.prototype.stop = function () {

    //Stop having the function "update" run automatically
    clearInterval(this.updateTime);

};

World.prototype.setMousePos = function (e) {

    this.mouseX = e.pageX;
    this.mouseY = e.pageY;

}

World.prototype.getMouseXPos = function () {

    return document.mouseX;

}

World.prototype.getMouseYPos = function () {

    return document.mouseY;

}

World.prototype.mousePressedAction = function (e) {

    this.mouseDown = true;

}

World.prototype.mouseReleasedAction = function (e) {

    this.mouseDown = false;

}

World.prototype.mouseClickedAction = function (e) {

    this.mouseClicked = true;

}

World.prototype.isMouseClicked = function () {

    if (document.mouseClicked) {

        document.mouseClicked = false;
        return true;

    } else
        return false;

}

World.prototype.getClickedSquare = function () {

    clickedSquare = new Array(2);
    clickedSquare[0] = Math.floor(document.mouseX / this.tileWidth);
    clickedSquare[1] = Math.floor(document.mouseY / this.tileWidth);

    return clickedSquare;

}

World.prototype.erase = function () {

    this.context.clearRect(0, 0, this.width, this.height);

}

World.prototype.setGridVal = function (x, y, id) {

    this.grid[x][y] = id;

}

World.prototype.getGridVal = function (x, y) {

    return this.grid[x][y];

};



//Class for all characters and objects 
function Sprite(world, width, height, image, x, y, id) {

    this.world = world;
    this.canvas = world.canvas;
    this.context = world.canvas.getContext("2d");
    this.width = width;
    this.height = height;
    this.idNum = id;

    this.image = new Image();
    this.image.src = image;

    this.x = x;
    this.y = y;
    this.xPos = (this.x * this.world.tileWidth) + (this.world.tileWidth / 2);
    this.yPos = (this.y * this.world.tileWidth) + (this.world.tileWidth / 2);
    //this.relativeX = x;
    //this.relativeY = y;

    this.world.setGridVal(this.x, this.y, this.idNum);

    if (this.idNum == 1 || this.idNum == 3 || this.idNum == 4)
        this.topConnect = true;
    else
        this.topConnect = false;

    if (this.idNum == 1 || this.idNum == 5 || this.idNum == 6)
        this.bottomConnect = true;
    else
        this.bottomConnect = false;

    if (this.idNum == 2 || this.idNum == 3 || this.idNum == 5)
        this.leftConnect = true;
    else
        this.leftConnect = false;

    if (this.idNum == 2 || this.idNum == 4 || this.idNum == 6)
        this.rightConnect = true;
    else
        this.rightConnect = false;

};

Sprite.prototype.setX = function (x) {

    this.x = x;
    this.xPos = (this.x * this.world.tileWidth) + (this.world.tileWidth / 2);

};

Sprite.prototype.setY = function (y) {

    this.y = y;
    this.yPos = (this.y * this.world.tileWidth) + (this.world.tileWidth / 2);

};



Sprite.prototype.setImageClicked = function () {

    this.context.lineWidth = 5;
    this.context.strokeStyle = "blue";
    this.context.strokeRect(this.xPos - (this.width / 2), this.yPos - (this.height / 2), this.height, this.width);

};

Sprite.prototype.setImageUnclicked = function () {

    this.context.clearRect(this.xPos - (this.width / 2), this.yPos - (this.height / 2), this.height, this.width);

};

Sprite.prototype.getX = function () {

    return this.x;

};

Sprite.prototype.getY = function () {

    return this.y;

};

Sprite.prototype.getId = function () {

    return this.idNum;

};

Sprite.prototype.getImage = function () {

    return this.image.src;

};

Sprite.prototype.setConnectors = function (top, bottom, left, right) {

    this.topConnect = top;
    this.bottomConnect = bottom;
    this.leftConnect = left;
    this.rightConnect = right;

};

Sprite.prototype.changePosition = function (x, y) {

    this.setX(x);
    this.setY(y);

    this.world.setGridVal(this.x, this.y, this.idNum);

};

Sprite.prototype.transform = function (id, image) {

    this.setId(id);
    this.setImage(image);

    this.world.setGridVal(this.x, this.y, this.idNum);

};

Sprite.prototype.swap = function (swapSprite) {

    var tempX = this.x;
    var tempY = this.y;

    this.changePosition(swapSprite.getX(), swapSprite.getY());
    swapSprite.changePosition(tempX, tempY);

};

Sprite.prototype.update = function () {

    this.context.save();

    this.context.translate(this.xPos, this.yPos);
    this.context.drawImage(this.image, 0 - (this.width / 2) + 1, 0 - (this.height / 2) + 1, this.width - 1, this.height - 1);

    this.context.restore();

};



//Player inherits from Sprite
//Player.prototype = new Sprite();
Player.prototype.constructor = Player;
Player.prototype.parent = Sprite.prototype;

//Player-specific class
function Player() {
}



//Tile inherits from Sprite
//Tile.prototype = new Sprite();
Tile.prototype.constructor = Tile;
Tile.prototype.parent = Sprite.prototype;

//Tile class
function Tile(world, width, height, image, x, y, id) {

    Sprite.call(this, world, width, height, image, x, y, id);

};



//Timer class
function Timer(startTime, endTime, timeDiv) {

    this.currentTime = startTime;
    this.endTime = endTime;
    self = this;

};

Timer.prototype.start = function () {

    //Set the timer to count down every second
    this.updateTime = setInterval(self.update, 1000);

};

Timer.prototype.stop = function () {

    //Stop the timer
    clearInterval(this.updateTime);

};

Timer.prototype.getCurrentTime = function () {

    return this.currentTime;

};

Timer.prototype.setCurrentTime = function (time) {

    this.currentTime = time;

};

Timer.prototype.update = function () {

    self.currentTime--;

};



////*


var world;
var worldWidth = 750;
var worldHeight = 600;

var tiles;
var tileLayout;
var tileWidth = 75;
var rowTiles = worldHeight / tileWidth;
var start = new Array(2);
var isTileSelected = false;
var selectedTile;

var stage = 1;
var numNodes = 2;
var timer;
var stageTime = 120;
var points = 0;

function init() {

    var stageDiv = document.getElementById("stage");
    var pointsDiv = document.getElementById("points");
    var timeDiv = document.getElementById("stageTime");

    world = new World(worldWidth, worldHeight, tileWidth);
    initTiles();

    stageDiv.textContent = "Stage " + stage;
    pointsDiv.textContent = "Points: " + points;
    timer = new Timer(stageTime, 0);
    timeDiv.textContent = timer.getCurrentTime() + " seconds remaining.";

    world.start();
    timer.start();

}

function initTiles() {

    var tileX = 0;
    var tileY = 0;
    var tileIndex = 0;
    var tileNum = 0;
    var badPos = false;

    tiles = new Array(rowTiles * rowTiles);
    tileLayout = new Array(rowTiles);

    for (i = 0; i < rowTiles; i++) {

        tileLayout[i] = new Array(rowTiles);
        for (j = 0; j < rowTiles; j++) {

            tileId = Math.floor((Math.random() * 6) + 1);
            tiles[tileNum] = new Sprite(world, tileWidth, tileWidth, "images/tile" + tileId.toString() + ".png", i, j, tileId);
            tileLayout[i][j] = tileNum;
            tileNum++;

        }

    }

    for (i = 0; i < numNodes; i++) {

        do {

            tileX = Math.floor(Math.random() * rowTiles);
            tileY = Math.floor(Math.random() * rowTiles);
            tileIndex = tileLayout[tileX][tileY];
            badPos = false;

            if (tiles[tileIndex].idNum > 6) {

                badPos = true;

            } else if ((tileX == 0 && tiles[tileIndex].leftConnect) || (tileX == rowTiles - 1 && tiles[tileIndex].rightConnect)) {

                badPos = true;

            } else if ((tileY == 0 && tiles[tileIndex].topConnect) || (tileY == rowTiles - 1 && tiles[tileIndex].bottomConnect)) {

                badPos = true;

            } else if (isAdjacent(tileX, tileY, 7)) {

                badPos = true;

            }

        } while (badPos);

        tiles[tileIndex].transform(7, "images/tile" + tiles[tileIndex].idNum.toString() + "N.png");

    }

    do {

        tileX = Math.floor(Math.random() * rowTiles);
        tileY = Math.floor(Math.random() * rowTiles);
        tileIndex = tileLayout[tileX][tileY];
        badPos = false;

        if (tiles[tileIndex].idNum > 6) {

            badPos = true;

        } else if (isAdjacent(tileX, tileY, 7)) {

            badPos = true;

        }

    } while (badPos);

    tiles[tileIndex].transform(8, "images/tile8.png");
    tiles[tileIndex].setConnectors(true, true, true, true);
    start[0] = tileX;
    start[1] = tileY;

    do {

        tileX = Math.floor(Math.random() * rowTiles);
        tileY = Math.floor(Math.random() * rowTiles);
        tileIndex = tileLayout[tileX][tileY];
        badPos = false;

        if (tiles[tileIndex].idNum > 6) {

            badPos = true;

        } else if (isAdjacent(tileX, tileY, 7)) {

            badPos = true;

        }

    } while (badPos);

    tiles[tileIndex].transform(8, "images/tile8.png");
    tiles[tileIndex].setConnectors(true, true, true, true);

}

function isAdjacent(x, y, id) {

    var isAdjacent = false;

    if (x != 0 && tiles[tileLayout[x - 1][y]].getId() == id) {

        isAdjacent = true;

    } else if (x != rowTiles - 1 && tiles[tileLayout[x + 1][y]].getId() == id) {

        isAdjacent = true;

    } else if (y != 0 && tiles[tileLayout[x][y - 1]].getId() == id) {

        isAdjacent = true;

    } else if (y != rowTiles - 1 && tiles[tileLayout[x][y + 1]].getId() == id) {

        isAdjacent = true;

    }

    return isAdjacent;

}

function update() {

    var win = false;
    var timeDiv = document.getElementById("stageTime");

    world.erase();
    checkMouseActions();
    updateTiles();
    win = checkWinConditions();

    if (win)
        nextStage();

    timeDiv.textContent = timer.getCurrentTime() + " seconds remaining.";
    if (timer.getCurrentTime() == 0) {

        world.stop();
        timer.stop();
        window.alert("You lose!");

    }

}

function updateTiles() {

    for (i = 0; i < tileLayout.length; i++)
        for (j = 0; j < tileLayout[i].length; j++)
            tiles[tileLayout[i][j]].update();

}

function checkMouseActions() {

    var gridVal = 0;
    var selectedX = 0;
    var selectedY = 0;
    var tileIndex = 0;

    if (world.isMouseClicked()) {

        clickedSquare = world.getClickedSquare();

        if (clickedSquare[0] < rowTiles) {

            tileIndex = tileLayout[clickedSquare[0]][clickedSquare[1]];
            gridVal = world.getGridVal(clickedSquare[0], clickedSquare[1]);

            if (gridVal <= 6 && clickedSquare[0] < rowTiles) {

                if (!isTileSelected) {

                    isTileSelected = true;
                    selectedTile = tiles[tileIndex];
                    selectedTile.setImageClicked();

                } else {

                    isTileSelected = false;
                    selectedTile.setImageUnclicked();
                    selectedX = selectedTile.getX();
                    selectedY = selectedTile.getY();

                    if (clickedSquare[0] == selectedX && (clickedSquare[1] == (selectedY + 1) || clickedSquare[1] == (selectedY - 1))) {

                        tiles[tileIndex].swap(selectedTile);
                        changePlaces(clickedSquare, [selectedX, selectedY]);

                    } else if (clickedSquare[1] == selectedY && (clickedSquare[0] == (selectedX + 1) || clickedSquare[0] == (selectedX - 1))) {

                        tiles[tileIndex].swap(selectedTile);
                        changePlaces(clickedSquare, [selectedX, selectedY]);

                    }

                }

            }

        }

    }

}

function changePlaces(tileOne, tileTwo) {

    var tempTile = 0;

    tempTile = tileLayout[tileOne[0]][tileOne[1]];
    tileLayout[tileOne[0]][tileOne[1]] = tileLayout[tileTwo[0]][tileTwo[1]];
    tileLayout[tileTwo[0]][tileTwo[1]] = tempTile;

}

function checkWinConditions() {

    var done = 0;
    var tileIndex = 0;
    var bottomLoop = false;
    var leftLoop = false;
    var rightLoop = false;

    if (start[1] > 0) {

        tileIndex = tileLayout[start[0]][start[1] - 1];
        if (tiles[tileIndex].bottomConnect)
            done = checkPath(start[0], start[1] - 1, "bottom");

    }

    if (done != 1 && start[1] < (rowTiles - 1)) {

        tileIndex = tileLayout[start[0]][start[1] + 1];
        if (tiles[tileIndex].topConnect)
            done = checkPath(start[0], start[1] + 1, "top");

    }

    if (done != 1 && start[0] > 0) {

        tileIndex = tileLayout[start[0] - 1][start[1]];
        if (tiles[tileIndex].rightConnect)
            done = checkPath(start[0] - 1, start[1], "right");

    }

    if (done != 1 && start[0] < (rowTiles - 1)) {

        tileIndex = tileLayout[start[0] + 1][start[1]];
        if (tiles[tileIndex].leftConnect)
            done = checkPath(start[0] + 1, start[1], "left");

    }


    if (done == 1)
        return true;
    else
        return false;

}

function checkPath(x, y, lastTile) {

    var path = [];
    var checkX = x;
    var checkY = y;
    var tileIndex = 0;
    var nextIndex = 0;
    var done = 0;
    var numIterations = 0;

    while (done == 0 && numIterations < 64) {

        tileIndex = tileLayout[checkX][checkY];
        path.push(tileIndex);
        if (tiles[tileIndex].idNum == 8) {

            if (checkX == start[0] && checkY == start[1])
                done = 2;
            else
                done = checkIfWin(path);

        } else {

            if (lastTile != "top" && checkY > 0 && tiles[tileIndex].topConnect) {

                nextIndex = tileLayout[checkX][checkY - 1];
                if (tiles[nextIndex].bottomConnect) {

                    checkY--;
                    lastTile = "bottom";

                }

            } else if (lastTile != "bottom" && checkY < (rowTiles - 1) && tiles[tileIndex].bottomConnect) {

                nextIndex = tileLayout[checkX][checkY + 1];
                if (tiles[nextIndex].topConnect) {

                    checkY++;
                    lastTile = "top";

                }

            } else if (lastTile != "left" && checkX > 0 && tiles[tileIndex].leftConnect) {

                nextIndex = tileLayout[checkX - 1][checkY];
                if (tiles[nextIndex].rightConnect) {

                    checkX--;
                    lastTile = "right";

                }

            } else if (lastTile != "right" && checkX < (rowTiles - 1) && tiles[tileIndex].rightConnect) {

                nextIndex = tileLayout[checkX + 1][checkY];
                if (tiles[nextIndex].leftConnect) {

                    checkX++;
                    lastTile = "left";

                }

            } else
                done = 3;

        }
        numIterations++;

    }

    path.length = 0;

    return done;

}

function checkIfWin(path) {

    var nodesFound = 0;
    var done = 0;

    for (i = 1; i < path.length - 1; i++)
        if (tiles[path[i]].idNum == 7)
            nodesFound++;

    if (nodesFound == numNodes)
        done = 1;
    else
        done = 2;

    return done;

}

function nextStage() {

    var stageDiv = document.getElementById("stage");
    var pointsDiv = document.getElementById("points");
    var timeElapsed = 0;
    if (stageTime > 60)
        stageTime = stageTime - 10;

    window.alert("You Win!");
    stage++;
    stageDiv.textContent = "Stage " + stage;

    timeRemaining = timer.getCurrentTime();
    points = points + (timeRemaining * (stage * 10));
    pointsDiv.textContent = "Points: " + points;

    if (stage > 2 && stage < 7) {

        numNodes = 3;
        if (stage == 3)
            stageTime = 120;

    } else if (stage >= 7) {

        numNodes = 4;
        if (stage == 7)
            stageTime = 120;

    }
    timer.setCurrentTime(stageTime);

    tiles.length = 0;
    for (i = 0; i < tileLayout.length; i++)
        tileLayout[i].length = 0;
    tileLayout.length = 0;

    initTiles();

}