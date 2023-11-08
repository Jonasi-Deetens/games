const images = ["./images/clefairy.png", "./images/helioptile.png", "./images/jigglypuff.png", "./images/jolteon.png", "./images/marill.png", "./images/pikachu.png",
"./images/piplup.png", "./images/rotom.png", "./images/togepi.png", "./images/clefairy.png", "./images/helioptile.png", "./images/jigglypuff.png", "./images/jolteon.png", "./images/marill.png", "./images/pikachu.png",
"./images/piplup.png", "./images/rotom.png", "./images/togepi.png"];
let tries = 0;
let firstCard = "";

initializeGame();

function initializeGame() {
    let sortedImages = images.sort( () => .5 - Math.random());
    tries = 0;

    const playButton = document.querySelector(".play-again");
    playButton.addEventListener("click", initializeGame);
    playButton.style.display = "none";

    const cardSection = document.querySelector("#game-table");
    cardSection.innerHTML = "";
    sortedImages.forEach(image => {
        const card = document.createElement("section");
        card.classList.add("card");
        card.classList.add("remove-background");
        card.style.backgroundImage = "url("+ image +")";
        card.addEventListener("click", showCard);

        cardSection.appendChild(card);
    });
}

function showCard(event) {
    tries++;
    const target = event.target;
    target.classList.remove("remove-background");

    if (firstCard === ""){
        firstCard = target;
    } else if (firstCard !== target) {
        if (firstCard.style.backgroundImage !== target.style.backgroundImage){
            setTimeout(function() {
                target.classList.add("remove-background");
                firstCard.classList.add("remove-background");
                firstCard = "";
              }, 200);
        } else {
            firstCard.removeEventListener("click", showCard);
            target.removeEventListener("click", showCard);
            firstCard = "";
        }
    }

    checkIfComplete()
}

function checkIfComplete() {
    let isComplete = true;

    const cards = document.querySelectorAll(".card");

    cards.forEach(cardItem => {
        if (cardItem.classList.contains("remove-background")) isComplete = false;
    });

    const playButton = document.querySelector(".play-again");
    if (isComplete) playButton.style.display = "block";
}