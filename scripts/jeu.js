const canvas = document.querySelector("#myCanvas");
let ctx = canvas.getContext("2d");
const game = document.querySelector('#game')
let score = 0
let coeur = 0
let cpt = 0
let duree = 10


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
    ctx.beginPath();
    ctx.drawImage(image, x, y, 20, 20);
    ctx.closePath();
}


const ball = document.querySelector('#ball')
let posXMax = document.getElementById('game').offsetWidth,
    posYMax = document.getElementById('game').offsetHeight,
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



    ball.style.left = posX + 'px'//placer balle poseX et posY
    ball.style.top = posY + 'px'
    //placer balle poseX et posY
},
    time
)



/************GESTION BRIQUE************/


let brickRowCount = 3;
let brickColumnCount = 17;
let brickWidth = 25;
let brickHeight = 30;
let brickPadding = 20;
let brickOffsetTop = 30;
let brickOffsetLeft = 30;
let j = 0;

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


let images_bricks2 = [];


let image1 = new Image();
image1.src = 'styles/images/vase2_opt.png';

let image2 = new Image();
image2.src = 'styles/images/vase_opt.png';
let images_bricks1 = [image1, image2];

console.log(images_bricks1)


function drawBricks() {
    for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
            if (bricks[c][r].status == 1) {
                let brickX = (c * (brickWidth + brickPadding)) + brickOffsetLeft;
                let brickY = (r * (brickHeight + brickPadding)) + brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.beginPath();
                /*while (j < 51) {
                    let choix = Math.floor(Math.random() * 2)
                    console.log(choix)
                    images_bricks2 = images_bricks1[choix]
                    j++

                }*/

                let choix = Math.floor(Math.random() * 1)
                console.log(choix)
                ctx.drawImage(images_bricks1[choix], brickX, brickY, brickWidth, brickHeight);




                ctx.fillStyle = "#44C34B";
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}








/**********GESTION PADDLE**********/

let image_paddle = new Image();
image_paddle.src = "styles/images/bouclier.png";
let paddleWidth = 75;
let paddleHeight = 26;
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



//******COLLISION BALLE****//
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
    ctx.drawImage(image_paddle, paddleX, canvas.height - paddleHeight);
    ctx.fillstyle = "#0095DD";
    ctx.fill()
    ctx.closePath();

}

function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Score: " + score, 80, 20);
    let img = document.getElementById("image");
    let img2 = document.getElementById("image1");
    let img3 = document.getElementById("image2");
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
    if (y + dy > canvas.height && coeur == 0) {
        dy = -dy;
        score--;
        document.getElementById("image").style.visibility = "hidden";
        coeur++;
    }
    else if (y + dy > canvas.height && coeur == 1) {
        dy = -dy;
        score--;
        document.getElementById("image1").style.visibility = "hidden";
        coeur++;
    }
    else if (y + dy > canvas.height && coeur == 2) {
        dy = -dy;
        score--;
        document.getElementById("image2").style.visibility = "hidden";
        alert("GAME OVER");
    }


    if (y + dy < ballRadius) {
        dy = -dy;
    }

    else if (y + dy > canvas.height - ballRadius) {
        if (x > paddleX && x < paddleX + paddleWidth) {
            dy = -dy;
        }
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
setInterval(draw, 10);
