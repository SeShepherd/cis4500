/* 
 * Created by Sarah Shepherd
 * CIS*4500 Specials Topic
 * University of Guelph
 * 
 * GameEngine.js basics
 */


//Canvas will become game world area
function World(width, height, tileSize, id) {

    //Set the canvas
    //this.canvas = document.getElementById("canvas");
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
    
    //this.canvas.style.backgroundColor = "cyan";

}
World.prototype.start = function () {

    //Set the method "update" to run every 50 milliseconds
    this.updateTime = setInterval(update, 50);
};
World.prototype.clear = function () {

    this.context.clearRect(0, 0, this.width, this.height);
};
World.prototype.stop = function () {

    //Stop having the function "update" run automatically
    clearInterval(this.updateTime);

};
World.prototype.getGridVal = function (i,j) {

    return this.grid[i][j];

};
World.prototype.setGridVal = function (i,j,id) {

    this.grid[i][j]=id;

};



function Sprite(world, width, height, image, x, y, id) {

    this.world = world;
    this.canvas = world.canvas;
    this.context = world.canvas.getContext("2d");
    this.width = width;
    this.height = height;
    this.id = id;

    this.image = new Image();
    this.image.src = image;
    this.direction = "right";

    this.x = x;
    this.y = y;

    this.context.drawImage(this.image, x, y);
    this.visible = true;
    this.animation=0;
}
;

Sprite.prototype.setImage = function (image) {

    this.image.src = image;

};
Sprite.prototype.setDir = function (direction) {

    this.direction = direction;

};
Sprite.prototype.setX = function (x) {

    this.x = x;
    this.xPos = (this.x * this.world.tileWidth) + (this.world.tileWidth / 2);

};
Sprite.prototype.setY = function (y) {

    this.y = y;
    this.yPos = (this.y * this.world.tileWidth) + (this.world.tileWidth / 2);

};
Sprite.prototype.setId = function (id) {

    this.id = id;

};
Sprite.prototype.getImage = function () {

    return this.image.src;

};
Sprite.prototype.getDir = function () {

    return this.direction;

};
Sprite.prototype.getHeight = function () {

    return this.height;

};
Sprite.prototype.getWidth = function () {

    return this.width;

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
//Sprite.prototype.changeImg = function (id, image) {


  //  this.setImage(image);

    //this.world.setGridVal(this.x, this.y, this.idNum);

//};

Sprite.prototype.createAnimation=function(frameWidth,frameHeight,numFrames,rows){
    	

	this.imageWidth = frameWidth;
	this.imageHeight = frameHeight;
		
    this.frameIndex=0;
    this.rowIndex=0;
    this.tickCount=0;
    this.numFrames=numFrames; //4
    this.rows=rows; //2
    this.animation=1;
    
    //???????
  

};
Sprite.prototype.animate = function(){
       this.tickCount++;

            if (this.tickCount > 3) {

				this.tickCount = 0;
				
                // If the current frame index is in range
                if (this.frameIndex < this.numFrames-1) {	
                    // Go to the next frame
                    this.frameIndex += 1;
                } else {
                    this.frameIndex = 0;
                }
            }
     //       this.context.drawImage(this.image,this.frameIndex*this.imageWidth/this.numFrames,this.rowIndex*this.imageHeight/this.rows,this.imageWidth/this.numFrames,this.imageHeight/this.rows,this.x,this.y,this.width,this.height);
         
};
Sprite.prototype.aniDir = function (rowIndex) {
    this.rowIndex=rowIndex;
}

Sprite.prototype.update = function () {

    if (this.visible) {

        this.context.save();
        //this.context.translate(this.xPos, this.yPos);
        if(this.animation===1){
            this.context.drawImage(this.image,this.frameIndex*this.imageWidth/this.numFrames,this.rowIndex*this.imageHeight/this.rows,this.imageWidth/this.numFrames,this.imageHeight/this.rows,this.x,this.y,this.width,this.height);
        }else{
        this.context.drawImage(this.image, this.x, this.y);
    }
        this.context.restore();
    }

};

Sprite.prototype.isVisible = function () {

    return this.visible;

};
Sprite.prototype.show = function () {

    this.visible = true;

};
Sprite.prototype.hide = function () {

    this.visible = false;

};
Sprite.prototype.collision = function (otherX, otherY,width,height) {
   
    if ((otherX >= this.x && otherX <= (this.x + this.width)) || ((otherX + width) >= this.x && (otherX + width) <= (this.x + this.width))) {

        //topside and  bottomside
        if ((otherY >= this.y && otherY <= (this.y + this.height)) || ((otherY + height) >= this.y && ( (otherY + height) <= (this.y + this.height)))) {
            
            //Don't move if shape is in this area
            
            return true;

        }
    }
    return false;
};

function Projectile(world, x, y, radius, color, id) {

    this.world = world;
    this.canvas = world.canvas;
    this.context = world.canvas.getContext("2d");
    this.id = id;
    this.radius = radius;
    this.color=color;

    this.direction = id;

    this.x = x;
    this.y = y;
    this.xPos=x+(this.radius/2);
    this.yPos=y+(this.radius/2);
    
    this.speed = 5;
    this.direction = 4;
    //this.context.drawImage(this.image,x,y);


}
Projectile.prototype.draw = function (x, y) {
    this.x = x;
    this.y = y;
    
    //reset direction
    this.direction=4;
    
    this.context.beginPath();
    this.context.fillStyle = this.color;
    this.context.arc(x, y, this.radius, 0, 360);
    this.context.closePath();
    this.context.fill();
};
Projectile.prototype.move = function () {
    if (this.direction === 4) {
        //left
        this.x =  this.x + this.speed;
    }
    else if (this.direction === 1) {
        //up
        this.y =  this.y - this.speed ;
    }
    else if (this.direction === 2) {
        //down
        this.y =  this.y + this.speed;
    }
    else if (this.direction === 3) {
        //right
        this.x =  this.x-this.speed;
    }
    //console.log(this.x+" "+this.y);
    this.xPos=this.x+(this.radius);
    this.yPos=this.y+(this.radius);

};
Projectile.prototype.getDir = function () {
    return this.direction;

};
Projectile.prototype.changeDir = function (direction) {
    this.direction = direction;

};
Projectile.prototype.collision = function (otherX, otherY,width,height) {
   
    if (this.xPos >= (otherX+(width/3)) && this.xPos < (otherX + width-(width/3))){

//console.log(otherY + height-(height/3))+"  Y "+ otherY+(height/3));
        //topside and  bottomside
        if (this.yPos >= (otherY+(height/3)) && this.yPos < (otherY + height-(height/3))){
            //Don't move if shape is in this area
            //console.log("bounce");
            return true;

        }
    }
    return false;
};
Projectile.prototype.update = function () {
    this.context.beginPath();
    this.context.fillStyle = this.color;
    this.context.arc(this.x, this.y, this.radius, 0, 360);
    this.context.closePath();
    this.context.fill();
};


//Timer class
function Timer(startTime, endTime, interval){

	this.current = startTime;
	//this.endTime = endTime;
	this.elapsed = 0;
	//this.animTime = 0;
	//this.interval = interval;
	self = this;

}

Timer.prototype.stop = function(){

	//Stop the timer
	clearInterval(self.updateTime);

};

Timer.prototype.getCurT = function(){

	return self.current;

};
Timer.prototype.setCurT = function(time){

	self.current = time;

};

Timer.prototype.getElapsed = function(){

	return self.elapsed;

};

Timer.prototype.setElapsed = function(time){

	self.elapsed = time;

};
//
//Timer.prototype.startAnimCount = function(){
//
	//Set the timer to count up every "interval" milliseconds
//	this.updateTime = setInterval(self.animCount, self.interval);
//
//}
//Timer.prototype.getAnimTime = function(){
//
//	return self.animTime;
//
//}
//
//Timer.prototype.setAnimTime = function(time){
//
//	self.animTime = time;
//
//}
//
//Timer.prototype.countUp = function(){
//
//	self.elapsedTime++;
//
//}
//
//Timer.prototype.countDown = function(){
//
//	self.currentTime--;
//
//}
//
//Timer.prototype.animCount = function(){
//
//	self.animTime++;
//
//}