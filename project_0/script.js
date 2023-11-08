let randomNumber = 0;
let amountOfCards = 25;

const playButton = document.querySelector(".play-again");
playButton.addEventListener("click", initializeGame);
initializeGame();


function initializeGame() {
    randomNumber = Math.round(Math.random() * 24 + 1);
    playButton.style.display = "hidden";

    const selectedCardSection = document.querySelector(".selected-card");
    const randomCardSection = document.querySelector(".random-card");
    const resultTitle = document.querySelector(".result");
    resultTitle.innerHTML = "";
    selectedCardSection.innerHTML = "";
    randomCardSection.innerHTML = "";
    

    const cardSection = document.querySelector("#game-table");
    cardSection.innerHTML = "";
    for (let index = 1; index <= amountOfCards; index++) {
        const card = document.createElement("section");
        card.classList.add("card");
        if (index === randomNumber) card.classList.add("random");
        card.addEventListener("click", checkCard);

        const h2 = document.createElement("h2");
        h2.textContent = index;
        h2.classList.add("card-number");
        card.appendChild(h2);

        cardSection.appendChild(card);
    }

}

function checkCard(event) {
    
    const randomCard = document.querySelector(".random");
    const selectedCard = event.target;
    
    const value = selectedCard.children[0].textContent;

    const selectedCardSection = document.querySelector(".selected-card");
    const randomCardSection = document.querySelector(".random-card");
    
    selectedCardSection.innerHTML = "";
    selectedCardSection.appendChild(selectedCard);

    randomCardSection.innerHTML = "";
    randomCardSection.appendChild(randomCard);

    const resultTitle = document.querySelector(".result");
    resultTitle.innerHTML = "";
    if (value == randomNumber) {
        resultTitle.textContent = "Awesome! Your number " + value + " was correct. You can be named many things, hungry not being one of them.";
    } else resultTitle.textContent = "Bummer... You guessed " + value + " and the secret number was " + randomNumber;


    const cards = document.querySelectorAll(".card");

    cards.forEach(cardItem => {
        cardItem.removeEventListener("click", checkCard);
    });
}