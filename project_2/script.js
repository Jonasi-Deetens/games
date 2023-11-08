let npcScore = 0;
let playerScore = 0;
let npcCards = [];
let playerCards = [];
let playerStopped = false;
let npcStopped = false;

initializeGame();

function initializeGame() {
    npcScore = 0;
    playerScore = 0;
    npcCards = [];
    playerCards = [];
    playerStopped = false;
    npcStopped = false;

    const resultTitle = document.querySelector(".result");
    resultTitle.innerHTML = "";

    const playButton = document.querySelector(".play-again");
    playButton.style.display = "hidden";
    playButton.addEventListener("click", initializeGame);

    const npcCardSection = document.querySelector(".player-card-section");
    npcCardSection.innerHTML = "";

    const playerCardSection = document.querySelector(".npc-card-section");
    playerCardSection.innerHTML = "";

    const playerScoreElement = document.querySelector(".player-score");
    playerScoreElement.textContent = playerScore;

    const npcScoreElement = document.querySelector(".npc-score");
    npcScoreElement.textContent = npcScore;

    const drawButton = document.querySelector("#draw-button");
    drawButton.addEventListener("click", drawCard);

    const stopButton = document.querySelector("#stop-button");
    stopButton.addEventListener("click", stop);
}

function drawCard(e) {
    let randomCard = Math.round(Math.random() * 12 + 1);
    if (randomCard === 13) {
        if ((playerScore + randomCard) > 21) randomCard = 1;
    }
    if (randomCard > 10) randomCard = 10;
    if (!playerStopped) {
        playerCards.push(randomCard);
        showCard("player", randomCard);
    }
    npcDraw();
    updateScore();
}

function npcDraw() {
    let randomCard = Math.round(Math.random() * 11 + 2);
    if (randomCard === 13) {
        if ((npcScore + randomCard) > 21) randomCard = 1;
    }
    if (randomCard > 10) randomCard = 10;
    if (!npcStopped) {
        npcCards.push(randomCard);
        showCard("npc", randomCard)
    }
}

function stop(e) {
    playerStopped = true;
    while(npcScore < 15 && playerScore <= 21) {
        npcDraw();
        updateScore();
    }
    updateScore();
}

function showCard(who, number) {
    let element;
    if (who === "npc") element = document.querySelector(".npc-card-section");
    else element = document.querySelector(".player-card-section");

    const card = document.createElement("section");
    card.classList.add("card");

        const h2 = document.createElement("h2");
        h2.textContent = number;
        card.appendChild(h2);

        element.appendChild(card);
}

function updateScore() {
    playerScore = 0;
    playerCards.forEach(card => {
        playerScore += card;
    });
    if (playerScore >= 21) playerStopped = true;
    
    const playerScoreElement = document.querySelector(".player-score");
    playerScoreElement.textContent = playerScore;

    npcScore = 0;
    npcCards.forEach(npcCard => {
        npcScore += npcCard;
    });
    if (npcScore >= 15) npcStopped = true;
    
    const npcScoreElement = document.querySelector(".npc-score");
    npcScoreElement.textContent = npcScore;

    
    if (playerStopped && npcStopped) finishGame();
}

function finishGame() {
    const playButton = document.querySelector(".play-again");
    playButton.style.display = "block";

    const resultTitle = document.querySelector(".result");
    resultTitle.innerHTML = "";
    if (playerScore > npcScore && playerScore <= 21) {
        resultTitle.textContent = "Awesome! Feeling lucky?";
    } else if (playerScore == npcScore) resultTitle.textContent = "You didn't lose, but you didn't win either!";
    else resultTitle.textContent = "You lose.";

}