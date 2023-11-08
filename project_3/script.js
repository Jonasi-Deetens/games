const images = ["./images/clefairy.png", "./images/helioptile.png", "./images/jigglypuff.png", "./images/jolteon.png", "./images/marill.png", "./images/pikachu.png",
"./images/piplup.png", "./images/rotom.png", "./images/togepi.png", "./images/clefairy.png", "./images/helioptile.png", "./images/jigglypuff.png", "./images/jolteon.png", "./images/marill.png", "./images/pikachu.png",
"./images/piplup.png", "./images/rotom.png", "./images/togepi.png"];
let tries = 0;
let firstCard = "";

initializeGame();

function initializeGame() {
    let sortedImages = images.sort( () => .5 - Math.random());
    tries = 0;

    const cardSection = document.querySelector("#game-table");
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
            target.classList.add("remove-background");
            firstCard.classList.add("remove-background");
            firstCard = "";
        } else {
            firstCard = "";
            firstCard.removeEventListener("click", showCard);
            target.removeEventListener("click", showCard);
        }
    }
}