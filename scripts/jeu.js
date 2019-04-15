const canvas = document.querySelector('#game')
let ctx = canvas.getContext("2d")
let ball = document.querySelector('#ball')
let paddle = document.querySelector('#paddle')
let x = game.width / 2
let y = game.height - 40
let paddleHeight = 5
let paddleWidth = 50
let paddleX = (game.width - paddleWidth) / 2
let rightPressed = false
let leftPressed = false;



/**********GESTION PADDLE**********/
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

function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height - paddleHeight * 2, paddleWidth, paddleHeight);
    ctx.fillstyle = "#0095DD";
    ctx.fill()
    ctx.closePath();
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPaddle();

    if (rightPressed && paddleX < canvas.width - paddleWidth) {
        paddleX += 5;
    }
    else if (leftPressed && paddleX > 0) {
        paddleX -= 5;
    }


}

setInterval(draw, 10);

/**********GESTION BALLe**********/



