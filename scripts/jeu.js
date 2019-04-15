


/************GESTION BALLE************/

const game = document.querySelector('#game')
const ball = document.querySelector('#ball')
let posXMax = 400,
    posYMax = 300,
    posX = Math.floor(Math.random() * posXMax / 10) * 10,
    posY = Math.floor(Math.random() * posYMax / 10) * 10,
    dirX = 1, //mettre à -1 pour aller vers la gauche 
    dirY = -1, //mettre à 1 pour aller vers le bas
    time = 40,
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

/************GESTION BARRE************/

/************GESTION BRIQUE************/