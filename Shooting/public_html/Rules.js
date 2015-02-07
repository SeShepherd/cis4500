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
window.addEventListener("mousedown", mouseDownEvent, false);
function Shooter(screen) {


    this.screen = screen;

    createLevel();
    player = new Sprite(screen, screen.tileWidth * 2, screen.tileWidth * 2, "images/player.png", 0, 0, 1);
    bullet = new Projectile(screen, -1, -1, 3, "cyan", 4);

    screen.start();
}

function update() {
    var i;

    screen.clear();
    player.update();

    bullet.update();
    if (checkBordX(bullet.x) && checkBordY(bullet.y)) {
        bullet.move();
        bullCount++;

    }
    for (i = 0; i < mirNum; i++) {
        mirrorFunction(mirrors[i]);
    }

    win.update();
    success();
}

function mouseDownEvent(evt) {
    var i = -1;
    var mouseX = 0, mouseY = 0;
    var time;
    //getting mouse position correctly:

    var bRect = screen.canvas.getBoundingClientRect();
    //getting mouse position correctly:
    mouseX = (evt.clientX - bRect.left) * (screen.canvas.width / bRect.width);
    mouseY = (evt.clientY - bRect.top) * (screen.canvas.height / bRect.height);

    for (i = 0; i < mirNum; i++) {
        if (mirrors[i].collision(mouseX, mouseY)) {
            //change mirror
            if (mirrors[i].getDir() === 2) {
                mirrors[i].setImage("images/ani2.png");
                mirrors[i].setDir(-2);

            } else if (mirrors[i].getDir() === 1) {
                mirrors[i].setImage("images/ani1.png");
                mirrors[i].setDir(-1);
            }
            time = new Date();
            count = time.getTime();

            break;
        }
    }


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
            //shoot
            document.getElementById("bullet").play();
            bullet.draw(player.getX() + player.width, oldY + (player.height / 2) + 12);
            break;

            //Up key
        case 38:
            e.preventDefault();
            if (checkBordY(oldY - 25))
                player.setY(oldY - 25);
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
            //add block in pattern 
            //no mirrors in first row (i*0)
            //no mirros closer than 100 in column
            for (i = 0; i < 4; i++) {
                screen.setGridVal(2 + i, i + 1, 1);
                mirrors[i] = new Sprite(screen, screen.tileWidth, screen.tileWidth, "images/mirror1.png", (i * screen.tileWidth) + (2 * screen.tileWidth), (i * screen.tileWidth) + (2 * screen.tileWidth), 1);
                mirrors[i].setDir(2);

            }
            for (i = 4; i < 8; i++) {
                screen.setGridVal(2 + i, i, 1);
                mirrors[i] = new Sprite(screen, screen.tileWidth, screen.tileWidth, "images/mirror2.png", (i * screen.tileWidth) + (2 * screen.tileWidth), (i * screen.tileWidth) + screen.tileWidth, 1);
                mirrors[i].setDir(1);

            }

            for (j = 0; j < 8; j++) {
                //console.log("try"+screen.getGridVal((j), (5)));
                if (screen.getGridVal((9 - j), (j)) === 0) {
                    screen.setGridVal((9 - j), (j), 1);
                    mirrors[i + k] = new Sprite(screen, screen.tileWidth, screen.tileWidth, "images/mirror2.png", screen.width - (j * screen.tileWidth) - (3 * screen.tileWidth), (j * screen.tileWidth) + screen.tileWidth, 1);
                    mirrors[i + k].setDir(1);
                    k++;
                }
                //console.log(j+" "+(j+2));
            }
            //ADD winning area
            screen.setGridVal((9), (4), 2);
            win = new Sprite(screen, screen.tileWidth, screen.tileWidth, "images/bucket.png", screen.width - (1 * screen.tileWidth), (4 * screen.tileWidth) + screen.tileWidth, 2);


            level++;
            break;
        case 1:
            //different pattern
            mirNum = 38;
            for (i = 0; i < 8; i++) {
                for (j = 0; j < 8; j++) {
                    if (i % 3 === 0) {
                        if (j % 4 === 0 || j % 4 === 3) {
                            screen.setGridVal((2 + i), (j + 1), 1);
                            mirrors[k] = new Sprite(screen, screen.tileWidth, screen.tileWidth, "images/mirror1.png", (i * screen.tileWidth) + (2 * screen.tileWidth), (j * screen.tileWidth) + (2 * screen.tileWidth), 1);
                            mirrors[k].setDir(2);
                            k++;
                        }
                    } else if (i % 3 === 1) {
                        if (j % 4 !== 0) {
                            screen.setGridVal((2 + i), (j + 1), 1);
                            mirrors[k] = new Sprite(screen, screen.tileWidth, screen.tileWidth, "images/mirror1.png", (i * screen.tileWidth) + (2 * screen.tileWidth), (j * screen.tileWidth) + (2 * screen.tileWidth), 1);
                            mirrors[k].setDir(2);
                            k++;
                        }
                    }
                    else {
                        if (j % 4 === 0 || j % 4 === 2) {
                            screen.setGridVal((2 + i), (j + 1), 1);
                            mirrors[k] = new Sprite(screen, screen.tileWidth, screen.tileWidth, "images/mirror1.png", (i * screen.tileWidth) + (2 * screen.tileWidth), (j * screen.tileWidth) + (2 * screen.tileWidth), 1);
                            mirrors[k].setDir(2);
                            k++;
                        }
                    }
                }
            }
            screen.setGridVal((9), (4), 2);
            win = new Sprite(screen, screen.tileWidth, screen.tileWidth, "images/bucket.png", screen.width - (1 * screen.tileWidth), (4 * screen.tileWidth) + screen.tileWidth, 2);

            level++;
            break;

        case 2:
            k = 0;
            //third pattern
            for (i = 0; i < 9; i++) {
                for (j = 0; j < 8; j++) {
                    //console.log(Math.floor(Math.random() * 2));
                    if (Math.floor(Math.random() * 4) === 1) {
                        screen.setGridVal(( i), (j), 1);
                        mirrors[k] = new Sprite(screen, screen.tileWidth, screen.tileWidth, "images/mirror1.png", (i * screen.tileWidth) + (2* screen.tileWidth), (j * screen.tileWidth) +  screen.tileWidth, 1);
                        mirrors[k].setDir(2);
                        k++;
                        mirNum = k;

                    }

                }
            }
            console.log(k);

            screen.setGridVal((9), (4), 2);
            win = new Sprite(screen, screen.tileWidth, screen.tileWidth, "images/bucket.png", screen.width - (1 * screen.tileWidth), (4 * screen.tileWidth) + screen.tileWidth, 2);

            break;


    }
    
//    var j;
//    for (i = 0; i < screen.width / screen.tileWidth; i++) {
//        for (j = 0; j < screen.height / screen.tileWidth; j++)
//            console.log(i+" "+j+" "+screen.getGridVal(1,j));
//
//    }

}
function mirrorFunction(mirror) {
    var time = new Date();

    if (time.getTime() > (count + 250) && mirror.getDir() === -1) {
        mirror.setImage("images/mirror1.png");
        mirror.setDir(2);
    } else if (time.getTime() > (count + 250) && mirror.getDir() === -2) {
        mirror.setImage("images/mirror2.png");
        mirror.setDir(1);
    }
    mirror.update();

    var width = mirror.getWidth();
    var height = mirror.getHeight();
    if (bullet.collision(mirror.x, mirror.y, width, height) && bullCount > 1) {
        if (mirror.getDir() === 2) {
            if (bullet.getDir() === 4)
                bullet.changeDir(2);
            else if (bullet.getDir() === 1)
                bullet.changeDir(3);
            else if (bullet.getDir() === 2)
                bullet.changeDir(4);
            else if (bullet.getDir() === 3)
                bullet.changeDir(1);
        }
        else if (mirror.getDir() === 1) {
            if (bullet.getDir() === 4)
                bullet.changeDir(1);
            else if (bullet.getDir() === 1)
                bullet.changeDir(4);
            else if (bullet.getDir() === 2)
                bullet.changeDir(3);
            else if (bullet.getDir() === 3)
                bullet.changeDir(2);

        }
        document.getElementById("bounce").play();
        bullCount = 0;
    }
}
function success() {
    var i, j;
    if (bullet.collision(win.getX(), win.getY(), win.getWidth(), win.getHeight())) {
        
        document.getElementById("win").play();


        //reset grid
        for (i = 0; i < screen.width / screen.tileWidth; i++) {
            for (j = 0; j < screen.height / screen.tileWidth; j++)
                screen.grid[i][j] = 0;

        }
        screen.stop();
        //create new level
        createLevel();
        screen.start();
    }
}