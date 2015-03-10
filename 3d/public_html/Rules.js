/* 
 * Created by Sarah Shepherd
 * CIS*4500
 * University of Guelph
 * 
 * Tunnels
 */

//Game
var canvas, start,bg;
var temp;

function Game(board) {
    screen=board;

    window.addEventListener("mousedown", mouseDownEvent, false);
    
    
    
    //Start button
    start = new Button(board, "START GAME", 150, 50, (screen.width / 2) - 75, (screen.height / 2) - 25);
}


function mouseDownEvent(evt) {
  bg = new BG(screen,400,400,"images/testBG.png");
  //sky = new BG(screen,410,200,"images/testSky.png");
    var mouseX = 0, mouseY = 0;
  

    //getting mouse position correctly:
    var bRect = board.canvas.getBoundingClientRect();
    mouseX = (evt.clientX - bRect.left) * (board.canvas.width / bRect.width);
    mouseY = (evt.clientY - bRect.top) * (board.canvas.height / bRect.height);


    if (start.isClicked(mouseX, mouseY)) {
    player = new Sprite(screen, 86, 102, "images/dragon.png", 190, 100, 0);
    player.createAnimation(690, 400, 8, 4);
    
    player.aniDir(0);
    player.setDir(0);
    screen.start();
    
    
        start.Disable();
        window.removeEventListener("mousedown", mouseDownEvent, false);
        window.addEventListener("keydown", keyDownEvent, false);
        window.addEventListener("keyup", keyUpEvent, false);
}

}

/**
 * The animation loop. Calls the requestAnimationFrame shim to
 * optimize the game loop and draws all game objects. This
 * function must be a gobal function and cannot be within an
 * object.
 */
function update() {
	//requestAnimFrame( update);
        screen.clear();
        bg.update();
        move();
        player.update();
        
        //bg.animate();
        //temp.update();
        //sky.update();
	
}
   function keyDownEvent(e) {
    switch (e.keyCode) {

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



}

function move(){
    if (player.getDir()!==4){
        player.animate();
    }
    if(player.frameIndex===(player.numFrames-1)){
        player.setDir(4);
    }
  //  switch(player.getDir())
}

/**	
 * requestAnim shim layer by Paul Irish
 * Finds the first API that works to optimize the animation loop, 
 * otherwise defaults to setTimeout().
 */
window.requestAnimFrame = (function(){
	return  window.requestAnimationFrame       || 
			window.webkitRequestAnimationFrame || 
			window.mozRequestAnimationFrame    || 
			window.oRequestAnimationFrame      || 
			window.msRequestAnimationFrame     || 
			function(/* function */ callback, /* DOMElement */ element){
				window.setTimeout(callback, 50);
			};
})();
