/* 
 * Created by Sarah Shepherd
 * CIS4500 Specials Topic
 * University of Guelph
 * 
 * GameEngine.js basics
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
    

   
    this.tileWidth = tileSize;
}
World.prototype.start = function () {

    //Set the method "update" to run every 50 milliseconds
    this.updateTime = setInterval(update, 100);
};
World.prototype.clear = function () {

    this.context.clearRect(0, 0, this.width, this.height);
};
World.prototype.stop = function () {

    //Stop having the function "update" run automatically
    clearInterval(this.updateTime);

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
    this.visible=true;

};

Sprite.prototype.setImage = function (image) {

    this.image.src = image;

};
Sprite.prototype.setDir = function (direction) {

    this.direction=direction;

};
Sprite.prototype.setX = function (x) {

    this.x = x*this.width;
    this.xPos = (this.x * this.world.tileWidth) + (this.world.tileWidth / 2);

};
Sprite.prototype.setY = function (y) {

    this.y = y*this.height;
    this.yPos = (this.y * this.world.tileWidth) + (this.world.tileWidth / 2);

};
Sprite.prototype.setId = function (id) {

    this.id=id;

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

if (this.visible){

    this.context.save();
    //this.context.translate(this.xPos, this.yPos);
    this.context.drawImage(this.image,this.x,this.y);
    this.context.restore();
}

};

Sprite.prototype.isVisible = function () {

    return this.visible;

};
Sprite.prototype.show = function(){

	this.visible = true;

};

Sprite.prototype.hide = function(){

	this.visible = false;

};
