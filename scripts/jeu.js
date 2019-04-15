


/************GESTION BALLE************/

const game = document.querySelector('#game')
const ball = document.querySelector('#ball')
let posXMax = 800,
    posYMax = 600,
    posX = Math.floor(Math.random() * posXMax / 10) * 10,
    posY = Math.floor(Math.random() * posYMax / 10) * 10,
    dirX = 1, //mettre à -1 pour aller vers la gauche
    dirY = -1, //mettre à 1 pour aller vers le bas
    time = 20,
    step = 10

let start = setInterval(function () {

    posX += dirX * step                //On ajoute dirX*step à posX
    posY += dirY * step               //idem pour posY
    if (posX >= posXMax - 10 || posX <= 0) {//if (posX>= posXMax || posX<=0)
        dirX = -dirX//on inverser dirX

    } if (posY >= posYMax - 10 || posY <= 0) {//if (posY>=posYMAX || posY <=0)
        dirY = -dirY//on inverser dirX
    }
    for(let c=0; c<brickColumnCount; c++) {
        for(let r=0; r<brickRowCount; r++) {
            let b = bricks[c][r];
            if(posX > b.x && posX < b.x+brickWidth && posY > b.y && posY < b.y+brickHeight) {
                dirY=-dirY;
                b.status = 0;
            }
        }
    }
    ball.style.left = posX + 'px'//placer balle poseX et posY
    ball.style.top = posY + 'px'



    //placer balle poseX et posY
},
    time
)

/************GESTION BARRE************/

/************GESTION BRIQUE************/

let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");



let brickRowCount = 3;
let brickColumnCount = 8;
let brickWidth = 75;
let brickHeight = 20;
let brickPadding = 10;
let brickOffsetTop = 30;
let brickOffsetLeft = 30;

let bricks = [];
for(let c=0; c<brickColumnCount; c++) {
    bricks[c] = [];
    for(let r=0; r<brickRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0, status: 1};
    }
}



function keyDownHandler(e) {
    if(e.keyCode == 39) {
        rightPressed = true;
    }
    else if(e.keyCode == 37) {
        leftPressed = true;
    }
}
function keyUpHandler(e) {
    if(e.keyCode == 39) {
        rightPressed = false;
    }
    else if(e.keyCode == 37) {
        leftPressed = false;
    }
}


function drawBricks() {
    for(let c=0; c<brickColumnCount; c++) {
        for(let r=0; r<brickRowCount; r++) {
       if(bricks[c][r].status == 1) {
          let brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
          let brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
            bricks[c][r].x = brickX;
            bricks[c][r].y = brickY;
            ctx.beginPath();
            ctx.rect(brickX, brickY, brickWidth, brickHeight);
            ctx.fillStyle = "#44C34B";
            ctx.fill();
            ctx.closePath();
          }
           if(bricks[c][r].status == 0){
            c=0
            r=0
           }
        }
    }
}
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBricks();
    collisionDetection();
}



console.log(bricks);
setInterval(draw, 10);
