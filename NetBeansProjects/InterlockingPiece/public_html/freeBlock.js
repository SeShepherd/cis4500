/* 
Created by Sarah Shepherd
CIS4500 Specials Topic
University of Guelph
Interlocking pieces

Idea originally was going to be sliding block puzzle, but had more challenging trying to make
wierd shape blocks.
Still the puzzle involves logic to think and patiences to accomplish. Puzzle Solver.
 */

function freeBlock() {


    var board = document.getElementById("canvas");
    document.getElementById("skip").addEventListener("click", skipper);
    ;
    var context = board.getContext("2d");


    init();

    var numPieces;
    var shapes;
    var index;
    var dragging;
    var colors;
    var mouseX, mouseY;
    var dragHoldX, dragHoldY;

    function init() {
        numPieces = 11;
        colors = ["red", "fuchsia", "orange", "yellow", "lime", "teal", "green", "blue", "purple", "maroon", "white", "silver"];
        shapes = [];
        makeShapes();
        drawScreen();
        board.addEventListener("mousedown", mouseDownListener, false);
    }
    function skipper() {
        colors = ["yellow", "orange", "fuchsia", "red", "blue", "teal", "green", "lime", "white", "maroon", "purple", "silver"];
        shapes = [];
        makeShapes();
        drawScreen();
        board.addEventListener("mousedown", mouseDownListener, false);
    }


    function makeShapes() {
        var i, j, k = 0;
        var tempColor, shape;
        //test
        for (j = 0; j < 3; j++) {

            for (i = 0; i < 4; i++) {
                if (j !== 3 && i !== 4) {
                    tempColor = colors[k];
//console.log(tempColor);
                    shape = {x: i * 100, y: j * 100, width: 95, height: 95, color: tempColor};
                    shapes.push(shape);
                }
                k++;
            }
        }
    }

    function mouseDownListener(evt) {
        var i;

        var highestIndex = -1;

        //getting mouse position correctly:
        var bRect = board.getBoundingClientRect();
        mouseX = (evt.clientX - bRect.left) * (board.width / bRect.width);
        mouseY = (evt.clientY - bRect.top) * (board.height / bRect.height);

        if (foundpiece()) {
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
        checkSolution();
    }

    function mouseMoveListener(evt) {
        var posX, posY;
        var collide = false;
        var shapewidth = shapes[index].width;
        var shapehieght = shapes[index].height;
        var minX = 0, minY = 0;
        var maxX = board.width - shapewidth, maxY = board.height - shapehieght;

        //getting mouse position correctly 
        var bRect = board.getBoundingClientRect();
        mouseX = (evt.clientX - bRect.left) * (board.width / bRect.width);
        mouseY = (evt.clientY - bRect.top) * (board.height / bRect.height);



        posX = mouseX - dragHoldX;
        posY = mouseY - dragHoldY;


        //collision?
        for (var i = 0; i < numPieces; i++) {

            if (i !== index) {

                //leftside and rightside
                if ((posX >= shapes[i].x && posX <= (shapes[i].x + shapes[i].width)) || ((posX + shapewidth) >= shapes[i].x && (posX + shapewidth) <= (shapes[i].x + shapes[i].width))) {


                    //topside and  bottomside
                    if ((posY >= shapes[i].y && posY <= (shapes[i].y + shapes[i].height)) || ((posY + shapehieght) >= shapes[i].y && (posY + shapehieght) <= (shapes[i].y + shapes[i].height))) {
                        //Don't move if shape is in this area
                        collide = true;

                    }
                }
            }
        }

        //Boarder collision... prevent object from dragging outside of canvas
        if (posX < minX) {
            posX = minX;
        } else if (posX > maxX) {
            posX = maxX;
        }

        if (posY < minY) {
            posY = minY;
        } else if (posY > maxY) {
            posY = maxY;

        }
        //potential jumping block issue
        if ((shapes[index].x - posX) > 100 || (shapes[index].y - posY) > 100 || (shapes[index].x - posX) < -100 || (shapes[index].y - posY) < -100)
            collide = true;

        if (!collide) {

            shapes[index].x = posX;
            shapes[index].y = posY;
            collide = false;

        }
        drawScreen();



    }

    function mouseHit(shape, mx, my) {
        //if any area of piece is clicked
        var dx;
        var dy;
        dx = mx > shape.x && mx < (shape.x + shape.width);
        dy = my > shape.y && my < (shape.y + shape.height);

        return (dx && dy);
    }

    function drawObjects() {
        //Create shapes/pieces
        var i;
        for (i = 0; i < numPieces; i++) {
            context.fillStyle = shapes[i].color;

            context.fillRect(shapes[i].x, shapes[i].y, shapes[i].width, shapes[i].height);
            context.strokeStyle = "#0000FF";
            context.lineWidth = 2;
            context.strokeRect(shapes[i].x, shapes[i].y, shapes[i].width, shapes[i].height);




        }

    }

    function drawScreen() {
        //Set up Background (and red and green square?)
        context.fillStyle = "#000000";
        context.fillRect(0, 0, board.width, board.height);

        drawObjects();
    }

    function foundpiece() {
        //find which shape was clicked
        for (i = 0; i < numPieces; i++) {
            if (mouseHit(shapes[i], mouseX, mouseY)) {
                dragging = true;
                dragHoldX = mouseX - shapes[i].x;
                dragHoldY = mouseY - shapes[i].y;
                index = i;
                return true;
            }
        }
        return false;
    }

    function checkSolution() {
        var k;
        var win = false;
        for (k = 0; k < numPieces; k++) {
            //console.log(k+ " : "+shapes[k].color+" "+ shapes[k].x  + "   "+shapes[k].y );
            if (shapes[k].color === "red" && shapes[k].x >= 280 && shapes[k].y <= 120)
                win = true;
            if (shapes[k].color === "fuchsia" && shapes[k].x >= 180 && shapes[k].y <= 120)
                win = true;
            if (shapes[k].color === "orange" && shapes[k].x >= 80 && shapes[k].y <= 120)
                win = true;
            if (shapes[k].color === "yellow" && shapes[k].x >= 0 && shapes[k].y <= 120)
                win = true;
            if (shapes[k].color === "lime" && shapes[k].x >= 280 && shapes[k].y <= 180)
                win = true;
            if (shapes[k].color === "green" && shapes[k].x >= 180 && shapes[k].y <= 180)
                win = true;
            if (shapes[k].color === "teal" && shapes[k].x >= 80 && shapes[k].y <= 180)
                win = true;
            if (shapes[k].color === "blue" && shapes[k].x >= 0 && shapes[k].y <= 180)
                win = true;
            if (shapes[k].color === "purple" && shapes[k].x >= 280 && shapes[k].y >= 180)
                win = true;
            if (shapes[k].color === "maroon" && shapes[k].x >= 180 && shapes[k].y >= 180)
                win = true;
            if (shapes[k].color === "white" && shapes[k].x >= 80 && shapes[k].y >= 180)
                win = true;

            if (!win) {
                break;
            }
            win = false;
        }

        if (k === numPieces) {
            document.getElementById("skip").innerHTML="Don't Cheat this time!";
            document.getElementById("win").play();
            init();
            
        }

    }
    
}