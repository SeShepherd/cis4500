/* 
 * Created by Sarah Shepherd
 * CIS*4500
 * University of Guelph
 * 
 * Tunnels
 */

//Game
var screen, start, bg;
var shots = [], fire = 0, fireNum = 0, color,cNum=0;
var mobs = [], bNum=10;temp = 0, dir=[];
var bText, tText,timer;

function Game(canvas) {
    screen = canvas;
    color = ["orange","red","yellow","red","orange","red"];

    window.addEventListener("mousedown", mouseDownEvent, false);



    //Start button
    start = new Button(screen, "START GAME", 150, 50, (screen.width / 2) - 75, (screen.height / 2) - 25);
}
function gameOver() {
    screen.clear();

    //Display Final Score
    screen.context.font = "30px Verdana";
    
    // Create gradient
    var gradient = screen.context.createLinearGradient(10, 10, screen.width, 0);
    gradient.addColorStop("0", "Green");
    gradient.addColorStop("0.5", "black");
    gradient.addColorStop("1", "blue");
timer.stop();
    // Fill with gradient
    screen.context.fillStyle = gradient;
    screen.context.fillText("Final Time: " + timer.getCurT(), 80, screen.height - (screen.height / 4));

    //Display replay "start Game" button
    start.setText("Re-Play Game");
    start.Enable();
    start.draw();
    window.addEventListener("mousedown", mouseDownEvent, false);
    window.removeEventListener("keydown", keyDownEvent, false);
    
    screen.stop();
    

}
function mouseDownEvent(evt) {
     fire = 0, fireNum = 0, bNum=10, temp = 0, cNum=0;
    
    bg = new BG(screen, 400, 400, "images/testBG.png");
    //sky = new BG(screen,410,200,"images/testSky.png");
    var mouseX = 0, mouseY = 0;


    //getting mouse position correctly:
    var bRect = screen.canvas.getBoundingClientRect();
    mouseX = (evt.clientX - bRect.left) * (screen.width / bRect.width);
    mouseY = (evt.clientY - bRect.top) * (screen.height / bRect.height);


    if (start.isClicked(mouseX, mouseY)) {
        player = new Sprite(screen, 80, 90, "images/dragon.png", 220, 90, 0);
        player.createAnimation(688, 397, 8, 4);

        player.aniDir(1);
        player.setDir(4);


        var i = 0;
        for (i = 0; i < 10; i++) {
            mobs[i] = new Sprite(screen, 80, 80, "images/balloon.png", Math.random() * (screen.height - player.getWidth()), Math.random() * (screen.height - player.getHeight()), 12 - i);

            mobs[i].createAnimation(688, 92, 8, 1);
            mobs[i].frameIndex = mobs[i].getId() % 7;
            var value = Math.floor(Math.random() * 2);
            if (value === 0) value = -1;
            mobs[i].setDir(value);
            
            value = Math.floor(Math.random() * 2);
            if (value === 0) value = -1;
            dir[i]=value;
            
            
        }
        timer = new Timer(0,0,1000);
        timer.startCountUp();
        bText = new Display(screen,"Balloons Left: "+bNum,220,20);
        tText = new Display(screen,"Time: "+timer.getCurT(),5,20);

        screen.start();
        start.Disable();
        window.removeEventListener("mousedown", mouseDownEvent, false);
        window.addEventListener("keydown", keyDownEvent, false);

    }

}
function keyDownEvent(e) {
    switch (e.keyCode) {
        case 32:
            e.preventDefault();
            launchProjectile();
            break;

            //Left key
        case 37:
            e.preventDefault();
            player.setDir(3);
            player.aniDir(3);
            break;
            //up
        case 38:
            e.preventDefault();
            player.setDir(1);
            player.aniDir(1);
            break;
            //Right Key    
        case 39:
            e.preventDefault();
            player.setDir(2);
            player.aniDir(2);
            break;
            //down Key
        case 40:
            e.preventDefault();
            player.setDir(0);
            player.aniDir(0);
            break;

    }
    if (e.keyCode !== 32) {
        window.removeEventListener("keydown", keyDownEvent, false);
    }
}

function update() {
    //requestAnimFrame( update);
    screen.clear();
    bg.update();
    
    bText.updateText("Balloons Left: "+bNum);
    bText.display();
    
    tText.updateText("Time: "+timer.getCurT());
    tText.display();
    
    move();


    var i = 0;
    for (i = 0; i < fireNum; i++) {
        shots[i].update();
        shots[i].move();
        shots[i].changeColor(color[cNum]);
    }
    for (i = 0; i < 10; i++) {
        if (player.getY() + (player.getHeight() / 2) > mobs[i].getY() + (mobs[i].getHeight() / 1.5))
        {
            mobMove(i);
        }
    }

    player.update();

    for (i = 0; i < 10; i++) {
         if (player.getY() + (player.getHeight() / 2) <= mobs[i].getY() + (mobs[i].getHeight() / 1.5)) {
             mobMove(i);
         }
              
        if (temp >= 20) {
            //balloons switch directions
            var value = Math.floor(Math.random() * 2);
            if (value === 0)
                value = -1;
            mobs[i].setDir(value);
            value = Math.floor(Math.random() * 2);
            if (value === 0) value = -1;
            dir[i]=value;
            temp = 0;
        }
    }
    temp++;

    //check projectile collison with balloons
    var j;
    for (i = 0; i < fireNum; i++) {
        for (j = 0; j < 10; j++) {

            if (shots[i].collision(mobs[j].getX(), mobs[j].getY(), mobs[j].getWidth(), mobs[j].getHeight()) && mobs[j].isVisible() && shots[i].isVisible()) {
                mobs[j].hide();
                shots[i].hide();

                //remove balloon
                bNum--;

                
            }
        }
    }
    cNum++;
    if(cNum>=6){
        cNum=0;
    }
    if(bNum==0)gameOver();

}
function move() {
    var x, y;
    x = player.getX();
    y = player.getY();
    if (player.getDir() !== 4) {
        player.animate();

        if (player.getDir() == 0) {
            x = x - 6;
            y = y + 2.2;
        }
        else if (player.getDir() == 1) {
            x = x + 6;
            y = y - 2.2;
        }
        else if (player.getDir() == 2) {
            x = x + 6;
            y = y + 2.2;
        }
        else if (player.getDir() == 3) {
            x = x - 6;
            y = y - 2.2;
        }
        player.setX(x);
        player.setY(y);

    }
    if (player.frameIndex === (player.numFrames - 1)) {
        player.frameIndex = 0;
        player.setDir(4);
        window.addEventListener("keydown", keyDownEvent, false);
    }


}
function launchProjectile() {
    shots[fire] = new Projectile(screen, player.getX() + (player.getWidth() / 2), player.getY() + (player.getHeight() / 2), 10, "red", fire);
    shots[fire].changeDir(player.rowIndex);

    fire++;
    if (fireNum < 10) {
        fireNum++;
    }
    if (fire >= 10) {
        fire = 0;
    }
}
function mobMove(number) {
    var x,y;
    
        x=mobs[number].getX() + Math.random() * 4 * mobs[number].getDir();
        y=mobs[number].getY() + Math.random() * 4 * dir[number];
        
        if(checkBordX(x,mobs[number].width)){mobs[number].setX(x);}else{mobs[number].setDir(mobs[number].getDir()*-1)}
        if(checkBordY(y,mobs[number].height)){mobs[number].setY(y);}else{dir[number]*=-1}
        mobs[number].animate();
        mobs[number].update();
    
}

/***Boarder detection ***/
function checkBordY(newPos,objectH) {
    if (newPos >= 0 && newPos < (screen.height - objectH)) {
        return true;
    }
    //Outside of screeners
    return false;
}
function checkBordX(newPos,objectW) {
    if (newPos >= -20 && newPos < (screen.width - objectW)) {
        return true;
    }
    //Outside of screeners
    return false;
}

/**	
 * requestAnim shim layer by Paul Irish
 * Finds the first API that works to optimize the animation loop, 
 * otherwise defaults to setTimeout().
 */
window.requestAnimFrame = (function () {
    return  window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.oRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            function (/* function */ callback, /* DOMElement */ element) {
                window.setTimeout(callback, 20);
            };
})();
