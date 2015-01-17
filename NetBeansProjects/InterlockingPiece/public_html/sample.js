/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
window.addEventListener("load", windowLoadHandler, false);

function windowLoadHandler() {
	canvasApp();
}



function canvasApp() {
	
	
	var board = document.getElementById("canvas");
	var context = board.getContext("2d");
	
	init();
	
	var numShapes;
	var shapes;
	var dragIndex;
	var dragging;
	var mouseX;
	var mouseY;
	var dragHoldX;
	var dragHoldY;
	
	function init() {
		numShapes = 3;
		shapes = [];
		
		makeShapes();
		
		drawScreen();
		
		board.addEventListener("mousedown", mouseDownListener, false);
	}
	
	function makeShapes() {
		var i;
		var tempColor, shape;
		for (i=0; i < numShapes; i++) {
			tempColor = "rgb(" + 100 + "," + 50 + "," + 250 +")";
			shape = {x:i*100, y:i*100, width:25, height:25,color:tempColor};
			shapes.push(shape);
		}
	}
	
	function mouseDownListener(evt) {
		var i;
		//We are going to pay attention to the layering order of the objects so that if a mouse down occurs over more than object,
		//only the topmost one will be dragged.
		var highestIndex = -1;
		
		//getting mouse position correctly, being mindful of resizing that may have occured in the browser:
		var bRect = board.getBoundingClientRect();
		mouseX = (evt.clientX - bRect.left)*(board.width/bRect.width);
		mouseY = (evt.clientY - bRect.top)*(board.height/bRect.height);
				
		//find which shape was clicked
		for (i=0; i < numShapes; i++) {
			if	(hitTest(shapes[i], mouseX, mouseY)) {
				dragging = true;
				if (i > highestIndex) {
					dragHoldX = mouseX - shapes[i].x;
					dragHoldY = mouseY - shapes[i].y;
					highestIndex = i;
					dragIndex = i;
				}
			}
		}
		
		if (dragging) {
			window.addEventListener("mousemove", mouseMoveListener, false);
		}
		board.removeEventListener("mousedown", mouseDownListener, false);
		window.addEventListener("mouseup", mouseUpListener, false);
		
		//code below prevents the mouse down from having an effect on the main browser window:
		if (evt.preventDefault) {
			evt.preventDefault();
		} //standard
		else if (evt.returnValue) {
			evt.returnValue = false;
		} //older IE
		return false;
	}
	
	function mouseUpListener(evt) {
		board.addEventListener("mousedown", mouseDownListener, false);
		//window.removeEventListener("mouseup", mouseUpListener, false);
		if (dragging) {
			dragging = false;
			window.removeEventListener("mousemove", mouseMoveListener, false);
		}
	}

	function mouseMoveListener(evt) {
		var posX;
		var posY;
		var shapewidth = shapes[dragIndex].width;
                var shapehieght = shapes[dragIndex].height;
		var minX = shapewidth;
		var maxX = board.width - shapewidth;
		var minY = shapehieght;
		var maxY = board.height - shapehieght;
		//getting mouse position correctly 
		var bRect = board.getBoundingClientRect();
		mouseX = (evt.clientX - bRect.left)*(board.width/bRect.width);
		mouseY = (evt.clientY - bRect.top)*(board.height/bRect.height);
		
		//clamp x and y positions to prevent object from dragging outside of canvas
		posX = mouseX - dragHoldX;
		posX = (posX < minX) ? minX : ((posX > maxX) ? maxX : posX);
		posY = mouseY - dragHoldY;
		posY = (posY < minY) ? minY : ((posY > maxY) ? maxY : posY);
		
		shapes[dragIndex].x = posX;
		shapes[dragIndex].y = posY;
		
		drawScreen();
	}
	
	function hitTest(shape,mx,my) {
		
		var dx;
		var dy;
                dx= mx > shape.x && mx < (shape.x+shape.width) ;
                dy= my>shape.y && my < (shape.y+ shape.height);
                
		
		//a "hit" will be registered if the distance away from the center is less than the radius of the circular object		
		return (dx && dy);
	}
	
	function drawObjects() {
		var i;
		for (i=0; i < numShapes; i++) {
			context.fillStyle = shapes[i].color;
			context.beginPath();
			//context.arc(shapes[i].x, shapes[i].y, shapes[i].rad, 0, 2*Math.PI, false);
                        context.fillRect(shapes[i].x, shapes[i].y, shapes[i].width, shapes[i].height);
			context.closePath();
			context.fill();
		}
	}
	
	function drawScreen() {
		//bg
		context.fillStyle = "#000000";
		context.fillRect(0,0,board.width,board.height);
		
		drawObjects();		
	}
	
}