const canvas = document.querySelector("#myCanvas");
let ctx = canvas.getContext("2d");
const game = document.querySelector('#game')
let score = 0
let coeur = 0
const coeur_img = document.querySelectorAll('.image')





/************GESTION BOOMERANG************/


let ballRadius = 10;
let x = canvas.width / 2;
let y = canvas.height - 30;
let dx = 1;
let dy = -1;
let image = new Image();
image.src = "images/boomerang2.png";
imageWidth = 1;
imageHeight = 1;

function drawBall() {
    ctx.beginPath();
    ctx.drawImage(image, x, y, 20, 20);
    ctx.closePath();
}




/************GESTION BRIQUE************/


let brickRowCount = 3;
let brickColumnCount = 17;
let brickWidth = 25;
let brickHeight = 30;
let brickPadding = 20;
let brickOffsetTop = 30;
let brickOffsetLeft = 30;
let j = 0;

/************CREATION TABLEAU BRIQUE************/
let bricks = [];
for (let c = 0; c < brickColumnCount; c++) {          //tableau a 2 dimension qui contient la colonne des brique (c)
    bricks[c] = [];                                  // qui celui-ci contiendra la ligne des briques(r)
    for (let r = 0; r < brickRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0, status: 1 };  //
    }
}

/************DRAW BRICK************/
function drawBricks() {
    for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
            if (bricks[c][r].status == 1) {
                let brickX = (c * (brickWidth + brickPadding)) + brickOffsetLeft;//position brick X
                let brickY = (r * (brickHeight + brickPadding)) + brickOffsetTop;//position brick y
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.beginPath();
                let image1 = new Image();
                image1.src = 'images/vase2_opt.png';
                ctx.drawImage(image1, brickX, brickY, brickWidth, brickHeight);
                ctx.closePath();
            }
        }
    }
}


/**********GESTION PADDLE**********/

let image_paddle = new Image();
image_paddle.src = "images/bouclier.png";
let paddleWidth = 75;
let paddleHeight = 26;
let paddleBottom = 10
let paddleX = (canvas.width - paddleWidth) / 2
let rightPressed = false
let leftPressed = false;
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);



/**********GESTION FLECHE**********/
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
    for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
            let b = bricks[c][r];
            if (b.status == 1) {
                if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
                    dy = -dy;
                    b.status = 0;
                    score++;
                    if (score >= 10) {
                        dx = 2;
                        dy = -2;
                    }
                    if (score >= 15) {
                        dx = 2.5;
                        dy = -2.5;
                    }
                }
            }
        }
    }
}
/************GESTION FLAMME************/
let malus_X; //postion ballle X
let malus_Y;//postion ballle Y
let malus_dx = 1;//direction ballle X
let malus_dy = -1;//direction ballle X
let image_malus = new Image();
image_malus.src = "images/flamme.png";
image_malusWidth = 1;
image_malusHeight = 1;
malus_x = Math.floor(Math.random() * canvas.width);
malus_y = Math.floor(Math.random() * canvas.height - paddleHeight);

/****DRAW FLAMME****/
function drawBallMalus() {
    ctx.beginPath();
    ctx.drawImage(image_malus, malus_x, malus_y, 20, 20);
    ctx.closePath();
}



//******DRAW BOUCLIER****//
function drawPaddle() {
    ctx.beginPath();
    ctx.drawImage(image_paddle, paddleX, canvas.height - paddleHeight);
    ctx.closePath();

}
//******DRAW SCORE****//

function drawScore() {
    ctx.font = "30px ReturnofGanon";
    ctx.fillStyle = "#FFFFFF";
    ctx.fillText("Score: " + score, canvas.width - 100, 22);

}
/*
let image_ganon = new Image();
image_ganon.src = "images/ganon.png";
let ganonWidth = 75;
let ganonHeight = 26;
let ganonBottom = 10
let ganonX = (canvas.width - image_ganon.width) / 6;
*/

function drawGameOver() {
    let ganon = new Image()
    ganon.src = 'images/ganon.png'
    let text = document.querySelector('.text');
    text.style.display = 'block';
    text.style.position = 'absolute';
    game.style.background = 'none';
    game.style.background = 'none';
    for (let i = 0; i < coeur_img.length; i++) {
        coeur_img[i].style.display = 'none';
    }
    ctx.beginPath();
    ctx.fillStyle = '#A83C2A'
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.closePath();
    ctx.beginPath();
    ctx.drawImage(ganon, (canvas.width - ganon.width) / 2, canvas.height - ganon.height);
    ctx.closePath();

}



function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawBricks();
    drawPaddle();
    drawBallMalus()
    collisionDetection();
    drawScore();

    if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
        dx = -dx;
    }
    if (y + dy > canvas.height && coeur == 0) {
        dy = -dy;
        score--;

        coeur_img[2].style.display = "none";
        coeur++;
    }
    else if (y + dy > canvas.height && coeur == 1) {
        dy = -dy;
        score--;
        coeur_img[1].style.display = 'none';
        coeur++;
    }
    else if (y + dy > canvas.height && coeur == 2) {

        coeur_img[0].style.display = 'none';
        return (drawBall(), drawBricks(), drawPaddle(), drawBallMalus(), collisionDetection(), drawScore(), drawGameOver())



    }

    if (y + dy < ballRadius) {
        dy = -dy;
    }
    else if (y + dy > canvas.height - 15 - ballRadius) {
        if (x > paddleX && x < paddleX + paddleWidth) {
            dy = -dy;
        }
    }
    if (rightPressed && paddleX < canvas.width - paddleWidth) {
        paddleX += 5;
    }
    else if (leftPressed && paddleX > 0) {
        paddleX -= 5;
    }
    x += dx;
    y += dy;

    /*test*/
    if (malus_x + malus_dx > canvas.width - ballRadius || malus_x + dx < ballRadius) {
        malus_dx = -malus_dx;
    }
    if (malus_y + malus_dy > canvas.height) {
        malus_dy = -malus_dy;
    }

    if (malus_y + malus_dy < ballRadius) {
        malus_dy = -malus_dy;
    }
    else if (malus_y + malus_dy > canvas.height - 15 - ballRadius) {
        if (malus_x > paddleX && malus_x < paddleX + paddleWidth) {

            return (drawBall(), drawBricks(), drawPaddle(), drawBallMalus(), collisionDetection(), drawScore(), drawGameOver())


        }
    }

    malus_x += malus_dx;
    malus_y += malus_dy;
}
setInterval(draw, 5)
