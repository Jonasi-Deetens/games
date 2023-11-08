const player = document.querySelector(".player");
let posX = 100;
let posY = 100;

document.body.addEventListener("keyup", (event) => {
    const game = document.querySelector("#game-area");
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
            if (posX < game.clientHeight - 50)
            {
                posX += 5;
                player.style.left = posX + "px";
            }
            break;
    }
});