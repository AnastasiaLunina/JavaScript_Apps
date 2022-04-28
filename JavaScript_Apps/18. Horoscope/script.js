const button = document.querySelector(".btn");
const par = document.querySelector(".par");

const getTitle = document.querySelectorAll(".title");
const arrayGetTitle = Array.prototype.slice.call(getTitle);

let newArray = []

for (let i = 0; i < arrayGetTitle.length; i++) {
    const getTextContent = arrayGetTitle[i].innerText;
    const a = newArray.push(getTextContent)
}

button.addEventListener("click", () => {
    let randomQuote = newArray[Math.floor(Math.random() * newArray.length)];
    par.style.display = "block";
    par.textContent = randomQuote;
})





