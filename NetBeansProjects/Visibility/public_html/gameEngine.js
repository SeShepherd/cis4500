/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


//Canvas will become game world area
function World(width, height, tileSize,id) {

    //Create the canvas
    this.canvas = document.createElement("canvas");
    document.body.appendChild(this.canvas);
    this.context = this.canvas.getContext("2d");

    //Set the canvas size
    this.width = width;
    this.height = height;
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    

    //Set the world matrix
    this.tileWidth = tileSize;
    this.id = id;
    this.grid = new Array(this.width / this.tileWidth);
    for (i = 0; i < this.width / this.tileWidth; i++) {

        this.grid[i] = new Array(this.height / this.tileWidth);
        for (j = 0; j < this.height / this.tileWidth; j++)
            this.grid[i][j] = id;
        
    }
    this.canvas.style.backgroundColor = "black";


}
World.prototype.start = function () {

    //Set the method "update" to run every 50 milliseconds
    this.updateTime = setInterval(update, 100);

 

    //this.mouseX = 0;
    //this.mouseY = 0;
    //this.mouseDown = false;

};
World.prototype.clear = function () {

    this.context.clearRect(0, 0, this.width, this.height);
};
World.prototype.stop = function () {

    //Stop having the function "update" run automatically
    clearInterval(this.updateTime);

};
World.prototype.setGridVal = function (x, y, id) {

    this.grid[x][y] = id;

};

World.prototype.getGridVal = function (x, y) {

    return this.grid[x][y];

};


function Sprite(world, width, height, image, x, y,id) {

    this.world = world;
    this.canvas = world.canvas;
    this.context = world.canvas.getContext("2d");
    this.width = width;
    this.height = height;
    this.id = id;

    this.image = new Image();
    this.image.src = image;
    this.direction = "Left";

    this.x = x*this.width;
    this.y = y*this.height;
     
    this.context.drawImage(this.image,x,y);

};

Sprite.prototype.setImage = function (image) {

    this.image.src = image;

};
Sprite.prototype.SetDir = function (direction) {

    this.direction=direction;

};
Sprite.prototype.setX = function (x) {

    this.x = x;
    this.xPos = (this.x * this.world.tileWidth) + (this.world.tileWidth / 2);

};
Sprite.prototype.setY = function (y) {

    this.y = y;
    this.yPos = (this.y * this.world.tileWidth) + (this.world.tileWidth / 2);

};
Sprite.prototype.getImage = function () {

    return this.image.src;

};
Sprite.prototype.getDir = function () {

    return this.direction;

};
Sprite.prototype.getX = function () {

    return this.x;

};
Sprite.prototype.getY = function () {

    return this.y;

};
Sprite.prototype.getId = function () {

    return this.id;

};
Sprite.prototype.transform = function (id, image) {

    
    this.setImage(image);

    //this.world.setGridVal(this.x, this.y, this.idNum);

};
Sprite.prototype.update = function () {

    this.context.save();
    //this.context.translate(this.xPos, this.yPos);
    this.context.drawImage(this.image,this.x,this.y);

    this.context.restore();

};



//Player inherits from Sprite
//Player.prototype = new Sprite();
//Player.constructor = Player;
//Player.parent = Sprite.prototype;

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