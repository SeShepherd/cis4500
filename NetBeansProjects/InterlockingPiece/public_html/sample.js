/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function freeBlock() {
	
	
	var board = document.getElementById("canvas");
	var context = board.getContext("2d");
	
	init();
	
	var numPieces;
	var shapes;
	var index;
	var dragging;
	var mouseX, mouseY;
	var dragHoldX, dragHoldY;
	
	function init() {
		numPieces = 3;
		shapes = [];
		makeShapes();
		drawScreen();
		board.addEventListener("mousedown", mouseDownListener, false);
	}
	
	function makeShapes() {
		var i;
		var tempColor, shape;
		for (i=0; i < numPieces; i++) {
			tempColor = "rgb(" + i*100 + "," + i*50 + "," + 250 +")";
			shape = {x:i*100, y:i*100, width:25, height:25,color:tempColor};
			shapes.push(shape);
		}
	}
	
	function mouseDownListener(evt) {
		var i;

		var highestIndex = -1;
		
		//getting mouse position correctly:
		var bRect = board.getBoundingClientRect();
		mouseX = (evt.clientX - bRect.left)*(board.width/bRect.width);
		mouseY = (evt.clientY - bRect.top)*(board.height/bRect.height);
				
		//find which shape was clicked
		for (i=0; i < numPieces; i++) {
			if	(mouseHit(shapes[i], mouseX, mouseY)) {
				dragging = true;
				dragHoldX = mouseX - shapes[i].x;
				dragHoldY = mouseY - shapes[i].y;
				index = i;
			}
		}
		
		if (dragging) {
			window.addEventListener("mousemove", mouseMoveListener, false);
		}
		board.removeEventListener("mousedown", mouseDownListener, false);
		window.addEventListener("mouseup", mouseUpListener, false);
		
	}
	
	function mouseUpListener(evt) {
		board.addEventListener("mousedown", mouseDownListener, false);
		if (dragging) {
			dragging = false;
			window.removeEventListener("mousemove", mouseMoveListener, false);
		}
	}

	function mouseMoveListener(evt) {
		var posX, posY;
		var shapewidth = shapes[index].width;
                var shapehieght = shapes[index].height;
		var minX = shapewidth;
		var maxX = board.width - shapewidth;
		var minY = shapehieght;
		var maxY = board.height - shapehieght;

            //getting mouse position correctly 
		var bRect = board.getBoundingClientRect();
		mouseX = (evt.clientX - bRect.left)*(board.width/bRect.width);
		mouseY = (evt.clientY - bRect.top)*(board.height/bRect.height);
		
		//Boarder collision... prevent object from dragging outside of canvas
		posX = mouseX - dragHoldX;
		posX = (posX < minX) ? minX : ((posX > maxX) ? maxX : posX);
		posY = mouseY - dragHoldY;
		posY = (posY < minY) ? minY : ((posY > maxY) ? maxY : posY);
		
		shapes[index].x = posX;
		shapes[index].y = posY;
		
		drawScreen();
	}
	
	function mouseHit(shape,mx,my) {
		//if any area of piece is clicked
		var dx;
		var dy;
                dx= mx > shape.x && mx < (shape.x+shape.width) ;
                dy= my>shape.y && my < (shape.y+ shape.height);

		return (dx && dy);
	}
	
	function drawObjects() {
            //Create shapes/pieces
		var i;
		for (i=0; i < numPieces; i++) {
			context.fillStyle = shapes[i].color;
			context.beginPath();
                        context.fillRect(shapes[i].x, shapes[i].y, shapes[i].width, shapes[i].height);
			context.closePath();
			context.fill();
		}
	}
	
	function drawScreen() {
		//Set up Background (and red and green square?)
		context.fillStyle = "#000000";
		context.fillRect(0,0,board.width,board.height);
		
		drawObjects();		
	}
	
}