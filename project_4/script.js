const player = document.querySelector(".player");
const game = document.querySelector("#game-area");
let posX = 100;
let posY = 100;
let lives = 3;
let startTime; 


initializeGame()

function initializeGame() {
    posX = 100;
    posY = 100;
    lives = 3;

    startTime = Date.now();
    console.log(startTime);
    setInterval(() => {
        const timerElement = document.querySelector(".timer");
        timerElement.textContent = ((Date.now() - startTime) / 1000).toFixed(0);

        updateEnemyPositions();
    }, 100);

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

function updateEnemyPositions() {
    const enemies = document.querySelectorAll(".enemy");

    enemies.forEach( enemy => {
        let enemyPosX = enemy.style.left.slice(2, -2);
        console.log(enemyPosX);
    });
}

document.body.addEventListener("keydown", (event) => {
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
            if (posY < game.clientHeight - 50)
            {
                posY += 5;
                player.style.top = posY + "px";
            }
            break;
        case "ArrowRight":
            if (posX < game.clientWidth - 50)
            {
                posX += 5;
                player.style.left = posX + "px";
            }
            break;
    }
});