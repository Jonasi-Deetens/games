const game = document.querySelector("#game-area");

let player;
let posX = 100;
let posY = 100;
let enemySize = 40;
let playerSize = 50;
let lives = 9;
let startTime;
let stopTime = false;
let interval = "";
const enemyStep = 1;


initializeGame()

function initializeGame() {
    clearInterval(interval);
    posX = 100;
    posY = 100;
    lives = 9;
    stopTime = false;
    
    game.innerHTML = "";

    const playerElement = document.createElement("div");
    playerElement.classList.add("player");
    game.appendChild(playerElement);
    player = playerElement;

    const playButton = document.querySelector(".play-again");
    playButton.style.display = "none";
    playButton.addEventListener("click", initializeGame);

    startTime = Date.now();
    interval = setInterval(updateGame, 15);

    player.style.top = posY + "px";
    player.style.left = posX + "px";
    
    for (let index = 1; index <= 4; index++) {
        const enemy = document.createElement("div");
        enemy.classList.add("enemy");

        enemy.style.top = Math.round(Math.random() * 300 + 200) + "px";
        enemy.style.left = Math.round(Math.random() * 700 + 200) + "px";

        game.appendChild(enemy);
    }
}

function updateGame() {
    if (!stopTime) {
        const timerElement = document.querySelector(".timer");
        timerElement.textContent = ((Date.now() - startTime) / 1000).toFixed(0) +'s';

        updateEnemyPositions();
    }
}

function updateEnemyPositions() {
    const enemies = document.querySelectorAll(".enemy");

    enemies.forEach( enemy => {
        let enemyPosX = enemy.style.left.slice(0, -2);
        let enemyPosY = enemy.style.top.slice(0, -2);

        if (enemyPosX > posX && !checkCollision(enemyPosX - enemyStep, enemyPosY, enemy)) enemy.style.left = enemyPosX - enemyStep + "px";
        else if (enemyPosX < posX && !checkCollision(parseInt(enemyPosX) + enemyStep, enemyPosY, enemy)) enemy.style.left = parseInt(enemyPosX) + enemyStep + "px";
        
        if (enemyPosY > posY && !checkCollision(enemyPosX, enemyPosY - enemyStep, enemy)) enemy.style.top = enemyPosY - enemyStep + "px";
        else if (enemyPosY < posY && !checkCollision(enemyPosX, parseInt(enemyPosY) + enemyStep, enemy)) enemy.style.top = parseInt(enemyPosY) + enemyStep + "px";
    });
}

function checkCollision(x, y, object) {
    let collided = false;
    let corners = [[x, y], 
                  [(parseInt(x) + enemySize), y],
                  [x, (parseInt(y) + enemySize)],
                  [(parseInt(x) + enemySize), (parseInt(y) + enemySize)]];
                  
    const enemies = document.querySelectorAll(".enemy");
    const player = document.querySelector(".player");
    enemies.forEach( enemy => {
        if ( enemy !== object) {
            let enemyPosX = enemy.style.left.slice(0, -2);
            let enemyPosY = enemy.style.top.slice(0, -2);

            corners.forEach(corner => {
                if (corner[0] < (parseInt(enemyPosX) + enemySize) && corner[0] > enemyPosX && corner[1] < (parseInt(enemyPosY) + enemySize) && corner[1] > enemyPosY) collided = true;
                if (corner[0] < (parseInt(posX) + playerSize) && corner[0] > posX && corner[1] < (parseInt(posY) + playerSize) && corner[1] > posY) {
                    collided = true;
                    if (lives > 0) {
                        lives--;
                        console.log(lives);
                        let newPosX = Math.round(Math.random() * 700 + 200) + "px";
                        let newPosY = Math.round(Math.random() * 300 + 200) + "px";
                        while (checkCollision(newPosX, newPosY)) {
                            newPosX = Math.round(Math.random() * 700 + 200) + "px";
                            newPosY = Math.round(Math.random() * 300 + 200) + "px";
                        }
                        object.style.left = newPosX;
                        object.style.top = newPosY;
                    } 
                    if (lives === 0) finishGame();
                }
            });
        }
    });


    return collided;
}

function finishGame() {
    stopTime = true;
    
    const playButton = document.querySelector(".play-again");
    playButton.style.display = "block";
}

document.body.addEventListener("keydown", (event) => {
    if (!stopTime) {
        switch (event.key) {
            case "ArrowUp":
                if (posY > 0)
                {
                    posY -= 5;
                    player.style.top = posY + "px";
                }
                break;
            case "ArrowLeft":
                if (posX > 0)
                {
                    posX -= 5;
                    player.style.left = posX + "px";
                }
                break;
            case "ArrowDown":
                if (posY < game.clientHeight - playerSize)
                {
                    posY += 5;
                    player.style.top = posY + "px";
                }
                break;
            case "ArrowRight":
                if (posX < game.clientWidth - playerSize)
                {
                    posX += 5;
                    player.style.left = posX + "px";
                }
                break;
        }
    }
});