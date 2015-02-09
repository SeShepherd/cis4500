/* 
 * Created by Sarah Shepherd
 * CIS*
 * University of Guelph
 * 
 
 bounce sound by: gezortenplotz;
 
 
 update objects
 */
var player, mirrors = [], win;
var level = 0, screen;
var count;
var mirNum = 15;
var bullet, bullCount = 0;


window.addEventListener("keydown", keyDownEvent, false);
function State(screen) {


    this.screen = screen;

    createLevel();
    //Create three players
    //player = new Sprite(screen, screen.tileWidth * 2, screen.tileWidth * 2, "images/player.png", 0, 0, 1);

    screen.start();
}

function update() {
    var i;

    screen.clear();
   // player.update();

}

function keyDownEvent(e) {
    var oldY;
    oldY = player.getY();

    /*Determine which key is pressed*/
    switch (e.keyCode) {

        //poetnial bark or light command
        // Space key pressed
        case 32:
            e.preventDefault();
            //Change character
            
            break;

            //Up key
        case 38:
            e.preventDefault();
          
            break;

            //Down Key
        case 40:
            //e.keyCode;
            e.preventDefault();
            if (checkBordY(oldY + 50))
                player.setY(oldY + 25);
            break;
    }

}
/***Boarder detection ***/
function checkBordY(newPos) {
    if (newPos >= 0 && newPos < (screen.height - (screen.tileWidth / 3))) {
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

function createLevel() {

    var i, j, k = 0;
    switch (level) {
        case 0:
          
            level++;
            break;
        case 1:
           
            break;

        case 2:
          
            break;


    }


}