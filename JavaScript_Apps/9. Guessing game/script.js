let text = 'Enter a number between 1 and 20';
let i = 0;
let speed = 100;

const input = document.querySelector('#guess');
const button = document.querySelector('#btn');
const answer = Math.floor(Math.random()*21);

input.addEventListener('keypress', function(e) {
    if (e.keyCode === 13) {
        play()
    }
})

button.addEventListener("click", play);

function type() {
    if (i < text.length) {
        document.querySelector('#heading').textContent += text.charAt(i);
        i++;
        setTimeout(type, speed)
    }
}
type()

function play() {
    const userNumber = document.querySelector('#guess').value;
    if (userNumber < 1 || userNumber >20) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Number should be from 1 to 20!',
          })
    }

    else if (isNaN(userNumber)) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'You should enter a number!',
          })
    }

    else {
        if (userNumber < answer) {
            Swal.fire('Too low!')
        }

        else if (userNumber > answer) {
            Swal.fire('Too high!')
        }

        else {
            Swal.fire({
                title: 'WOW!',
                text: 'You guessed it!',
                imageUrl: 'img/pine.jpg',
                imageWidth: 350,
                imageHeight: 500,
              })
        }
    }
}