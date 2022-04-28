let button = document.querySelector("button");

button.addEventListener("click", pressButton);

function pressButton() {
    let randomNumber1 = Math.floor(Math.random() * 6) + 1;
    let randomDiceImage = "dice" + randomNumber1 + ".png";
    let randomImageSource1 = "images/" + randomDiceImage;
    let image1 = document.querySelectorAll("img")[0];
    image1.setAttribute("src", randomImageSource1);
    
    let randomNumber2 = Math.floor(Math.random() * 6) + 1;
    let randomImageSource2 = "images/dice" + randomNumber2 + ".png";
    document.querySelectorAll("img")[1].setAttribute("src", randomImageSource2);
    
    if (randomNumber1 > randomNumber2) {
        document.querySelector("h1").innerHTML = "Player 1 Wins!";
    }
    else if (randomNumber2 > randomNumber1) {
        document.querySelector("h1").innerHTML = "Player 2 Wins!";
    }
    else {
        document.querySelector("h1").innerHTML = "It is a draw!";
    }
}

pressButton()

// Animation
gsap.from(".container", {opacity: 0, duration: 2, delay: 1})