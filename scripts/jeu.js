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
let image_boomerang = new Image();
image_boomerang.src = "images/boomerang2.png";
imageWidth = 1;
imageHeight = 1;

function drawBall() {
    ctx.beginPath();
    ctx.drawImage(image_boomerang, x, y, 20, 20);
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
let image1 = new Image();
image1.src = 'images/vase2_opt.png';
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
    for (let c = 0; c < brickColumnCount; c++) { //parcourir tab column
        for (let r = 0; r < brickRowCount; r++) {// parcourir tab raw
            let b = bricks[c][r];
            if (b.status == 1) {
                if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
                    dy = -dy;               //si status = 1 inverser direction ball + status = 0(disparaitre brique)
                    b.status = 0;
                    score++;
                    if (score >= 10) { //vitesse ball
                        dx = 2;
                        dy = -2;
                    }
                    if (score >= 15) {
                        dx = 2.5;   //vitesse ball
                        dy = -2.5;
                    }
                }
            }
        }
    }
}
/************GESTION FLAMME************/
let malus_x; //postion ballle X
let malus_y;//postion ballle Y
let malus_dx = 1;//direction ballle X
let malus_dy = -1;//direction ballle X
let image_malus = new Image();
image_malus.src = "images/flamme.png";
image_malusWidth = 1;
image_malusHeight = 1;
do {
    malus_x = Math.floor(Math.random() * canvas.width - 20);
    malus_y = Math.floor(Math.random() * canvas.height - paddleHeight - 20);
    console.log(malus_x, malus_y, canvas.height, paddleHeight)
} while (malus_x < 0 || malus_y < 0 || malus_y > 580)



/****DRAW FLAMME****/
function drawBallMalus() {
    ctx.beginPath();
    ctx.drawImage(image_malus, malus_x, malus_y, 20, 20);
    ctx.closePath();
}

let malus2_X; //postion ballle X
let malus2_Y;//postion ballle Y
let malus2_dx = 1;//direction ballle X
let malus2_dy = -1;//direction ballle X
do {
    malus2_x = Math.floor(Math.random() * canvas.width - 20);
    malus2_y = Math.floor(Math.random() * canvas.height - paddleHeight - 20);
    console.log(malus2_x, malus2_y, canvas.height, paddleHeight)
} while (malus2_x < 0 || malus2_y < 0 || malus2_y > 580)
image_malus2Width = 1;
image_malus2Height = 1;


/****DRAW FLAMME****/
function drawBallMalus2() {
    ctx.beginPath();
    ctx.drawImage(image_malus, malus2_x, malus2_y, 20, 20);
    ctx.closePath();
}


//******DRAW BOUCLIER****//
function drawPaddle() {
    ctx.beginPath();
    ctx.drawImage(image_paddle, paddleX, canvas.height - paddleHeight);
    ctx.closePath();

}
//******DRAW SCORE****//
let image_score = new Image();
image_score.src = 'images/ruby.png';
function drawScore() {
    ctx.beginPath();
    ctx.drawImage(image_score, canvas.width - 125, 0, 15, 30);
    ctx.closePath();
    ctx.font = "25px ReturnofGanon";
    ctx.fillStyle = "#FFFFFF";
    ctx.fillText(": " + score, canvas.width - 100, 25);

}

let ganon = new Image()
ganon.src = 'images/ganon.png'
function drawGameOver() {

    let text = document.querySelector('.text');
    text.style.display = 'block';
    text.style.position = 'absolute';
    game.style.background = 'none';
    game.style.background = 'none';
    ctx.beginPath();
    ctx.fillStyle = '#A83C2A'
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.closePath();
    ctx.beginPath();
    ctx.drawImage(ganon, (canvas.width - ganon.width) / 2, canvas.height - ganon.height);
    ctx.closePath();
    for (let i = 0; i < coeur_img.length; i++) {
        coeur_img[i].style.display = 'none';
    }
}



function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawBricks();
    drawPaddle();
    drawBallMalus()

    collisionDetection();
    drawScore();
    if (score > 5) {
        drawBallMalus2();
    }


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
        if (malus_x > paddleX && malus_x < paddleX + paddleWidth)

            return (drawBall(), drawBricks(), drawPaddle(), drawBallMalus(), collisionDetection(), drawScore(), drawGameOver())



    }

    /*test*/
    if (malus2_x + malus2_dx > canvas.width - ballRadius || malus2_x + dx < ballRadius) {
        malus2_dx = -malus2_dx;
    }
    if (malus2_y + malus2_dy > canvas.height) {
        malus2_dy = -malus2_dy;
    }

    if (malus2_y + malus2_dy < ballRadius) {
        malus2_dy = -malus2_dy;
    }
    else if (malus2_y + malus2_dy > canvas.height - 15 - ballRadius) {
        if (malus2_x > paddleX && malus2_x < paddleX + paddleWidth)

            return (drawBall(), drawBricks(), drawPaddle(), drawBallMalus(), collisionDetection(), drawScore(), drawGameOver())



    }
    malus_x += malus_dx;
    malus_y += malus_dy;
    malus2_x += malus2_dx;
    malus2_y += malus2_dy;



}
setInterval(draw, 5)
