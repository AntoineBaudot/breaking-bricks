const canvas = document.querySelector("#myCanvas");
let ctx = canvas.getContext("2d");
const game = document.querySelector('#game')
let score = 0
let coeur=  0
/*
let detruit=[]
let timer = new Date()
let origin = timer.getTime();
let now = timer.getTime();



/************GESTION BALLE************/


let ballRadius = 10;
let x = canvas.width / 2;
let y = canvas.height - 30;
let dx = 3;
let dy = -3;
let image = new Image();
image.src = "styles/images/boomerang2.png";
imageWidth = 1;
imageHeight = 1;




let padding = new Image();
padding.src = "styles/images/Boomerang1.png";


function drawBall() {
    ctx.beginPath();
    ctx.drawImage(image, x, y, 40, 40);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();

}




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
for (let c = 0; c < brickColumnCount; c++) {          //tableau a 2 dimension qui contient la colonne des brique (c)
    bricks[c] = [];                                  // qui celui-ci contiendra la ligne des briques(r)
    for (let r = 0; r < brickRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0, status: 1 };  //
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



//******COLLISION****//
function collisionDetection() {
    for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
            let b = bricks[c][r];
            if (b.status == 1) {
                if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
                    dy = -dy;
                    b.status = 0;
                    score++;
                    if(score>=3){
                      dx=3.5;
                      dy=-3.5;
                    }
                    if(score>=6){
                      dx=5;
                      dy=-5;
                    }
/*
                    detruit.push(b)
                    console.log(detruit);
                    */
                  }
                }
            }


        }
    }




function drawPaddle() {
    ctx.beginPath();
    ctx.drawImage(padding, paddleX, canvas.height - paddleHeight * 2, 100, 100);
    ctx.fillstyle = "#0095DD";
    ctx.fill()
    ctx.closePath();

}

function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Score: " + score, 8, 20);
    let img = document.getElementById("image");
    let img2 = document.getElementById("image1");
    let img3 = document.getElementById("image2");
}


/*
function respawn(tab,tab_origin){
     let res = tab[0]
     for (let i=0 ; i<tab_origin.length;i++){
       if(res.x==tab_origin[i].x && res.y==tab_origin[i].y){
         tab_origin[i].status=1
         tab=tab.slice(1)
         return [tab_origin,tab]        // Récupere le tableau d'origine avec le nouveau
                                        //vase et le tableau détruit sans la 1er valeur
       }
     }
     return [tab_origin,tab]
}

*/



function draw() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawBricks();
    drawPaddle();
    /*
    if(detruit.length>=1){
      let timer = new Date()
      let now = timer.getTime();
      if(now-origin>1000){
      let recup = respawn(detruit,bricks);
      bricks=recup[0]
      detruit=recup[1]
      }
    }
*/
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
        //alert("GAME OVER");
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
/*
    console.log(now);
    */
}

setInterval(draw,5)
