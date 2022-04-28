const searchInput = document.querySelector('#search');
const divs = document.querySelectorAll('.food');
const button = document.querySelector(".button");

// Timer
button.addEventListener ("click", function() {
    takeInput();
})

function takeInput() {

let minutes_input = Number(document.querySelector(".minutes").value);
let seconds_input = Number(document.querySelector(".seconds").value);
let total_time = (minutes_input * 60) + seconds_input;

    function calculateTime(){
        let countdown = document.querySelector("#countdown");

        let minutes = Math.floor(total_time / 60);
        let seconds = total_time % 60;
        total_time--;

        if (seconds < 10) {
            seconds = "0" + seconds;
        }
        
        countdown.textContent = `${minutes} : ${seconds}`;
        if (total_time < 0) {
                stopTimer();
                total_time = 0;
        }
    }

    let timerId = setInterval(calculateTime,1000);

    function stopTimer() {
        clearInterval(timerId);
        document.querySelector("#player").play();
    }
}

// Recipe
searchInput.addEventListener('keyup', function(event) {
    const word = event.target.value.toLowerCase();

    divs.forEach(item => {
        item.querySelector('p').textContent.toLowerCase().includes(word) ? (item.style.display = 'block') : (item.style.display='none');
    })
})

const btn_paragraph = document.querySelectorAll('.btn_par');
const button_recipe = document.querySelectorAll('.btn');
const btn_paragraph_block = document.querySelectorAll('.btn_par_block');

button_recipe.forEach((item, index) => {
    item.addEventListener('click', () => {
        btn_paragraph[index].style.display = 'block';
    })
});

button_recipe.forEach((item, index) => {
    item.addEventListener('click', () => {
        btn_paragraph_block[index].style.display = 'none';
    })
}); 

