/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 * bark.wav came from freesounds.org User: nfrae
 */
var world, player, light;
var width=10;
var height=8;
var worldWidth = 88 * width;
var worldHeight = 88 * height;
var tileSize = 88;

var enemNum = 4;
var enemies = [];

var points = 0, counter = 0, recount=0;

window.addEventListener("keydown", keyDownEvent, false);

function init() {
    //Create canvas
    world = new World(worldWidth, worldHeight, tileSize, 0);
    //create dog
    player = new Sprite(world, tileSize, tileSize, "images/PlayerL.png", 4, 5, 2);
    // world.setGridVal(4, 5, 2);
    light = new Sprite(world, tileSize, tileSize, "images/light.png", 3, 5, 3);
    // world.setGridVal(3, 5, 3);
    setLight();


    for (var i = 0; i < enemNum; i++) {
        enemies[i] = new Sprite(world, tileSize, tileSize, "images/ghostHL.png", i*tileSize, worldHeight-(tileSize*i), 1);
        addGhost(i);

    }

    points = 0;
    document.getElementById("bgNoise").play();

    world.start();
    // timer.start();

}
function setLight() {
    var x = player.getX();
    var y = player.getY();

    if (light.isVisible()) {
        counter++;
    } else {
        counter = 0;
        recount--;
    }
    if (counter > 3) {
        light.hide();
        counter = 0;
        recount=4;
    }
  
    if (player.getDir() == "Left") {
        light.setImage("images/light.png");
        light.setX((x - tileSize) / tileSize);
    } else {
        light.setImage("images/lightR.png");
        light.setX((x + tileSize) / tileSize);
    }
    light.setY(y / tileSize);
}

/*Keyboard event handler*/
function keyDownEvent(e) {
    var oldX, oldY, x = -1, y = -1;
    oldX = player.getX();
    oldY = player.getY();
    // console.log("X: "+oldX+"Y: "+oldY);
    /*Determine which key is pressed*/
    switch (e.keyCode) {

        //poetnial bark or light command
        // Space key pressed
        case 32:
            // console.log("here");
            if (!light.isVisible()&&recount<=0) {
                light.show();
            } else {
                light.hide();
            }
            break;

            //Left key
        case 37:
            // e.keyCode;
            // console.log(player.getDir());
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
            // e.keyCode;
            y = oldY - (tileSize / 2);
            if (checkBordY(y))
                player.setY(y / tileSize);
            break;

            //Right Key    
        case 39:
            // e.keyCode;
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
            //e.keyCode;
            e.preventDefault();
            y = oldY + tileSize / 2;
            if (checkBordY(y))
                player.setY(y / tileSize);
            break;
    }

    setLight();
    EnemyMoves();
    lightCheck();
    deadDog();
   
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


/*Ghost Enemies functions*/
function EnemyMoves() {
    var move;
    var playerX = player.getX();
    var playerY = player.getY();
    
    for (var i = 0; i < enemNum; i++) {
        var x, y, oldX, oldY;
        if (light.isVisible()) {
           enemies[i].hide();
        } else {
            enemies[i].show();
        }
        //console.log(enemies[i].getId());
        if(enemies[i].getId()!=0){

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
            if (checkBordX(x)&&checkGhost(i))
                enemies[i].setX(x);
        } else {
            if (oldY >= playerY) {
                y = (oldY - tileSize / 2) / tileSize;
            } else {
                y = (oldY + tileSize / 2) / tileSize;
            }
            if (checkBordY(y)&&checkGhost(i))
                enemies[i].setY(y);
        }

    }else{
        console.log("replace ghost "+i);
        addGhost(i);
    }
}


}
function addGhost(i) {
    var y = Math.floor(Math.random() * height);
    var side = Math.floor(Math.random() * 2);
    
    enemies[i].setId(1);
    if (side === 1)
    {
        side = width-1;
        enemies[i].setDir("Left");
        enemies[i].setImage("images/ghostHL.png");
     }else{
         enemies[i].setDir("Right");
        enemies[i].setImage("images/ghostHR.png");
     }
     while(!checkGhost(i)){
    //check again
     }
    enemies[i].setX(side);
    enemies[i].setY(y);
    

    
    console.log(" xy:" + enemies[i].getX() + " " + enemies[i].getY());

}
function checkGhost(num){
    var cX,cY,eX,eY;
    cX = enemies[num].getX();
    cY = enemies[num].getY();
    //console.log("cur "+num+" cX: "+cX+"cY: "+cY);
    for (var i = num; i >= 0; i--) {
        
        if(i!=num){
            eX=enemies[i].getX();
            eY=enemies[i].getY();
            //console.log(i+" eX: "+eX+"eY: "+eY);
            if((cX>eX&&cX<(eX+tileSize)||(cX+tileSize)>eX&&(cX+tileSize)<(eX+tileSize))&& (cY>eY&&cY<(eY+tileSize)||(cY+tileSize)>eY&&(cY+tileSize)<(eY+tileSize))){
                return false;
            }
        }
        
    }
    return true;
    
}

function lightCheck(){
    var cX,cY,eX,eY;
    cX = light.getX();
    cY = light.getY();
    //console.log("light cX: "+cX+" "+(cX+tileSize)+"cY: "+cY+" "+(cY+tileSize));
    for (var i = 0; i < enemNum; i++) {
            eX=enemies[i].getX();
            eY=enemies[i].getY();
            //console.log(i+" eX: "+eX+" "+(eX+tileSize)+"eY: "+eY+" "+(eY+tileSize));
             if((cX>=eX&&cX<(eX+tileSize)||(cX+tileSize)>=eX&&(cX+tileSize)<(eX+tileSize))&& (cY>=eY&&cY<(eY+tileSize)||(cY+tileSize)>=eY&&(cY+tileSize)<(eY+tileSize))){
                 if(light.isVisible()){
                     //enemies[i].show();
                     if(player.getDir()=="Left"){
                         light.setImage("images/ghostUnL2.png");
                     }else{
                         light.setImage("images/ghostUnR.png");
                     }
                     
                     enemies[i].setId(0);
                     gamePoints(1);
                 }
            }
       
    }
    //console.log("..");
    
    
}
function deadDog(){
    var cX,cY,eX,eY;
    cX = player.getX();
    cY = player.getY();
    //console.log("light cX: "+cX+" "+(cX+tileSize)+"cY: "+cY+" "+(cY+tileSize));
    for (var i = 0; i < enemNum; i++) {
            eX=enemies[i].getX();
            eY=enemies[i].getY();
            //console.log(i+" eX: "+eX+" "+(eX+tileSize)+"eY: "+eY+" "+(eY+tileSize));
             if((cX>=eX&&cX<(eX+tileSize/2)||(cX+tileSize/2)>=eX&&(cX+tileSize/2)<(eX+tileSize/2))&& (cY>=eY&&cY<(eY+tileSize/2)||(cY+tileSize/2)>=eY&&(cY+tileSize/2)<(eY+tileSize/2))){
                 
                     enemies[i].show();
                    
                     gamePoints(0);
                 
            }
       
    }
    //console.log("..");
    
    
}

function gamePoints(condition) {
    if(condition==1){
    points++;
    document.getElementById("bark").play();
    }else{
        document.getElementById("laugh").play();
       points--;
    }
console.log("Points: "+points); 


}
function checkEnd(){
    if(document.getElementById("bgNoise").paused){
     console.log("Game Over");    
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