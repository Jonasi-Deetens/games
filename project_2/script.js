import { deck } from "./deck.js";

let npcScore = 0;
let playerScore = 0;
let npcCards = [];
let playerCards = [];
let playerStopped = false;
let npcStopped = false;
let deckIndex = 0;
let shuffledDeck = [];

initializeGame();

function initializeGame() {
    shuffledDeck = deck.sort(() => .5 - Math.random());
    deckIndex = 0;
    npcScore = 0;
    playerScore = 0;
    npcCards = [];
    playerCards = [];
    playerStopped = false;
    npcStopped = false;

    const resultTitle = document.querySelector(".result");
    resultTitle.innerHTML = "";

    const playButton = document.querySelector(".play-again");
    playButton.style.display = "none";
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
    let card = shuffledDeck[deckIndex];
    deckIndex++;
    if (card.value === 14) {
        if ((playerScore + 11) > 21) card.value = 1;
        else card.value = 11;
    }
    if (card.value > 10) card.value = 10;
    if (!playerStopped) {
        playerCards.push(card);
        showCard("player", card);
    }
    updateScore();
    if (playerScore <= 21) npcDraw();
}

function npcDraw() {
    let card = shuffledDeck[deckIndex];
    deckIndex++;
    if (card.value === 13) {
        if ((npcScore + 11) > 21) card.value = 1;
    }
    if (card.value > 10) card.value = 10;
    if (!npcStopped) {
        npcCards.push(card);
        showCard("npc", card)
    }
    updateScore();
}

function stop(e) {
    playerStopped = true;
    while(npcScore < 15 && playerScore <= 21) {
        npcDraw();
        updateScore();
    }
    updateScore();
}

function showCard(who, card) {
    let element;
    if (who === "npc") element = document.querySelector(".npc-card-section");
    else element = document.querySelector(".player-card-section");
    console.log(card);
    const cardElement = document.createElement("section");
    cardElement.classList.add("card");

        const valueElement = document.createElement("h3");
        if (card.face === "") valueElement.textContent = card.value;
        else valueElement.textContent = card.face;
        cardElement.appendChild(valueElement);

        const img = document.createElement("img");
        img.classList.add("suit");
        img.alt = card.value + " " + card.face;
        img.src = card.suit;
        cardElement.appendChild(img);

        element.appendChild(cardElement);
}

function updateScore() {
    playerScore = 0;
    playerCards.forEach(card => {
        playerScore += card.value;
    });
    if (playerScore >= 21) playerStopped = true;
    
    const playerScoreElement = document.querySelector(".player-score");
    playerScoreElement.textContent = playerScore;

    npcScore = 0;
    npcCards.forEach(npcCard => {
        npcScore += npcCard.value;
    });
    if (npcScore >= 15) npcStopped = true;
    if (npcScore > 21) playerStopped = true;
    
    const npcScoreElement = document.querySelector(".npc-score");
    npcScoreElement.textContent = npcScore;

    
    if (npcStopped && playerScore > npcScore) playerStopped = true;
    if (playerStopped && npcStopped) finishGame();
}

function finishGame() {
    const playButton = document.querySelector(".play-again");
    playButton.style.display = "block";

    const resultTitle = document.querySelector(".result");
    resultTitle.innerHTML = "";
    if ((playerScore > npcScore && playerScore <= 21) || npcScore > 21) {
        resultTitle.textContent = "Awesome! Feeling lucky?";
    } else if (playerScore == npcScore) resultTitle.textContent = "You didn't lose, but you didn't win either!";
    else resultTitle.textContent = "You lose.";

}