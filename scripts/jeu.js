const canvas = document.querySelector("#myCanvas");
let ctx = canvas.getContext("2d");
const game = document.querySelector('#game')
let score = 0
let coeur = 0;


/************GESTION BALLE************/

let ballRadius = 10;
let x = canvas.width / 2;
let y = canvas.height - 30;
let dx = 1;
let dy = -1;
let image = new Image();
image.src = "styles/images/boomerang2.png";
imageWidth = 1;
imageHeight = 1;

ctx.fill();

function drawBall() {
    ctx.save();
    ctx.beginPath();
    ctx.drawImage(image, x, y, 20, 20);
    ctx.translate(image.x, image.y);
    ctx.rotate(90);
    ctx.translate(-7, -10);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
    ctx.restore();
}

/*const ball = document.querySelector('#ball')
let posXMax = document.getElementById('game').offsetWidth,
    posYMax = document.getElementById('game').offsetHeight,
    posX = Math.floor(Math.random() * posXMax / 10) * 10,
    posY = Math.floor(Math.random() * posYMax / 10) * 10,
    dirX = 1, //mettre à -1 pour aller vers la gauche
    dirY = -1, //mettre à 1 pour aller vers le bas
    time = 10,
    step = 10

let start = setInterval(function () {
    posX += dirX * step                //On ajoute dirX*step à posX
    posY += dirY * step               //idem pour posY
    if (posX >= posXMax - 10 || posX <= 0) {//if (posX>= posXMax || posX<=0)
        dirX = -dirX//on inverser dirX

    } if (posY >= posYMax - 10 || posY <= 0) {//if (posY>=posYMAX || posY <=0)
        dirY = -dirY//on inverser dirX
    }

    //Balle qui touche les briques
    for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
            let b = bricks[c][r];
            if (posX > b.x && posX < b.x + brickWidth && posY > b.y && posY < b.y + brickHeight) {
                dirY = -dirY;
                b.status = 0;
            }
        }
    }


    ball.style.left = posX + 'px'//placer balle poseX et posY
    ball.style.top = posY + 'px'
    //placer balle poseX et posY
},
    time
)*/



/************GESTION BRIQUE************/

let image_bricks = new Image();
image_bricks.src = "styles/images/vase2_opt.png";
let brickRowCount = 3;
let brickColumnCount = 17;
let brickWidth = 25;
let brickHeight = 30;
let brickPadding = 20;
let brickOffsetTop = 30;
let brickOffsetLeft = 30;

let bricks = [];
for (let c = 0; c < brickColumnCount; c++) {
    bricks[c] = [];
    for (let r = 0; r < brickRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0, status: 1 };
    }
}

function keyDownHandler(e) {
    if (e.keyCode == 39) {
        rightPressed = true;
    }
    else if (e.keyCode == 37) {
        leftPressed = true;
    }
}
function keyUpHandler(e) {
    if (e.keyCode == 39) {
        rightPressed = false;
    }
    else if (e.keyCode == 37) {
        leftPressed = false;
    }
}


function drawBricks() {
    for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
            if (bricks[c][r].status == 1) {
                let brickX = (c * (brickWidth + brickPadding)) + brickOffsetLeft;
                let brickY = (r * (brickHeight + brickPadding)) + brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.beginPath();
                ctx.drawImage(image_bricks, brickX, brickY, brickWidth, brickHeight);
                ctx.fillStyle = "#44C34B";
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}








/**********GESTION PADDLE**********/
let paddle = document.querySelector('#paddle')
let paddleWidth = 75;
let paddleHeight = 20;
let paddleBottom = 10
let paddleX = (canvas.width - paddleWidth) / 2
let rightPressed = false
let leftPressed = false;
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
    if (e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = true;
    }
    else if (e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if (e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = false;
    }
    else if (e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = false;
    }
}

function collisionDetection() {
    for (var c = 0; c < brickColumnCount; c++) {
        for (var r = 0; r < brickRowCount; r++) {
            var b = bricks[c][r];
            if (b.status == 1) {
                if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
                    dy = -dy;
                    b.status = 0;
                    score++;
                }
            }

            // calculations
        }
    }
}

function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height - paddleHeight * 2, paddleWidth, paddleHeight, paddleBottom);
    ctx.fillstyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}


function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawPaddle();
    drawBricks();
    collisionDetection();
    drawScore();
    if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
        dx = -dx;
    }
    if (y + dy > canvas.height) {
        dy = -dy;
    }
    if (y + dy < ballRadius) {
        dy = -dy;
    }

    else if (y + dy > canvas.height - ballRadius) {
        if (x > paddleX && x < paddleX + paddleWidth) {
            dy = -dy;
        }




        /*
                else {
                    alert("GAME OVER");
                    window.location.reload();
                    clearInterval(); // Needed for Chrome to end game
        
                */
    }

    if (rightPressed && paddleX < canvas.width - paddleWidth) {
        paddleX += 7;
    }
    else if (leftPressed && paddleX > 0) {
        paddleX -= 7;
    }

    x += dx;
    y += dy;
}


//******COLLISION****//

function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Score: " + score, 8, 20);
    let img = document.getElementById("image");
    let img2 = document.getElementById("image1");
    let img3 = document.getElementById("image2");
}

setInterval(draw, 10);