let computerChoice = "";
let options = ["rock", "paper", "scissors"];
let computerMoves = [];
let playerMoves = [];

const playButton = document.querySelector(".play-again");
playButton.addEventListener("click", initializeGame);
initializeGame();


function initializeGame() {
    computerMoves = [];
    playerMoves = [];

    playButton.style.display = "hidden";
    const resultTitle = document.querySelector(".result");
    resultTitle.innerHTML = "";

    const cardSection = document.querySelector(".cards-section");
    cardSection.innerHTML = "";
    const playSection = document.querySelector(".player");
    playSection.innerHTML = "";
    const npcSection = document.querySelector(".npc");
    npcSection.innerHTML = "";

    for (let index = 0; index < options.length; index++) {
        const card = document.createElement("section");
        card.classList.add("card");
        card.addEventListener("click", play);

        const h2 = document.createElement("h2");
        h2.textContent = options[index];
        card.appendChild(h2);

        cardSection.appendChild(card);
    }

}

function play(event) {
    const selectedCard = event.target;
    const value = selectedCard.children[0].textContent;
    playerMoves.push(value);

    const playSection = document.querySelector(".player");
    const cardPlayer = document.createElement("section");
    cardPlayer.classList.add("card");

        const h2Player = document.createElement("h2");
        h2Player.textContent = value;
        cardPlayer.appendChild(h2Player);

        playSection.appendChild(cardPlayer);
    
    computerChoice = options[Math.round(Math.random() * 2)];
    computerMoves.push(computerChoice);

    const npcSection = document.querySelector(".npc");
    const cardNPC = document.createElement("section");
    cardNPC.classList.add("card");

        const h2 = document.createElement("h2");
        h2.textContent = computerChoice;
        cardNPC.appendChild(h2);

        npcSection.appendChild(cardNPC);

    const playButton = document.querySelector(".play-again");
    playButton.style.display = "block";

    if (playerMoves.length === 3) finishGame();
}

function finishGame() {
    let playerPoints = 0;
    let computerPoints = 0;
    let draws = 0;
    let losses = 0;
    let wins = 0;

    playerMoves.forEach((move, index) => {
        let npcMove = computerMoves[index]
        if (npcMove === move) {
            playerPoints += 0.5;
            computerPoints += 0.5;
            draws++;
        } else if (move === "scissors" && npcMove ==="rock" || move === "paper" && npcMove === "scissors" || move === "rock" && npcMove ==="paper") {
            computerPoints += 1;
            losses++;
        } else if (move === "rock" && npcMove ==="scissors" || move === "scissors" && npcMove === "paper" || move === "paper" && npcMove ==="rock") {
            playerPoints += 1;
            wins++;
        }
    });

    const resultTitle = document.querySelector(".result");
    resultTitle.innerHTML = "";
    if (playerPoints > computerPoints) {
        resultTitle.textContent = "Guess who's a winner here! Congrats!";
    } else if (playerPoints == computerPoints) resultTitle.textContent = "Atleast a draw isn't losing.";
    else resultTitle.textContent = "Yeah you are kinda bad at this.";
    resultTitle.append(document.createElement("br"));
    resultTitle.append(document.createTextNode("Wins: " + wins));
    resultTitle.append(document.createElement("br"));
    resultTitle.append(document.createTextNode("Losses: " + losses));
    resultTitle.append(document.createElement("br"));
    resultTitle.append(document.createTextNode("Draws: " + draws));

    const cards = document.querySelectorAll(".card");

    cards.forEach(cardItem => {
        cardItem.removeEventListener("click", play);
    });
}