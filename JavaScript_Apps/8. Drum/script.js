let numberOfDrumButtons = document.querySelectorAll(".drum").length;
let text = "Drum Kit";
let i = 0;
let speed = 250;

for (let i = 0; i<numberOfDrumButtons; i++) {

    document.querySelectorAll(".drum")[i].addEventListener("click", function () {
        
    let buttonInnerHTML = this.innerHTML;

    makeSound(buttonInnerHTML);

    buttonAnimation(buttonInnerHTML);

    });
}

document.addEventListener("keydown", function(event) {
    makeSound(event.key)

    buttonAnimation(event.key);
})

function makeSound(key) {

    switch (key) {
        case "w":
            let tom1 = new Audio("sounds/tom-1.mp3");
            tom1.play();
        break;

        case "a":
            let tom2 = new Audio("sounds/tom-2.mp3");
            tom2.play();
        break;

        case "s":
            let tom3 = new Audio("sounds/tom-3.mp3");
            tom3.play();
        break;

        case "d":
            let tom4 = new Audio("sounds/tom-4.mp3");
            tom4.play();
        break;

        case "j":
            let snare = new Audio("sounds/snare.mp3");
            snare.play();
        break;

        case "l":
            let kick = new Audio("sounds/kick-bass.mp3");
            kick.play();
        break;

        case "k":
            let crash = new Audio("sounds/crash.mp3");
            crash.play();
        break;

        default:
    }
}

function buttonAnimation (currentKey) {
    let activeButton = document.querySelector("." + currentKey);

    activeButton.classList.add("pressed");

    setTimeout(function() {
        activeButton.classList.remove("pressed");
    }, 100);
}

// Typing text
function type() {
    if (i < text.length) {
      document.querySelector("#title").textContent += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }
  type();

// Animation 
gsap.from(".drum", {opacity: 0, duration: 2, delay: 1, stagger: .6})
  

