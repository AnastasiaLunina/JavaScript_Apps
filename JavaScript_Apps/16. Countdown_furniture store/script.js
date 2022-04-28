function christmasCountdown() {
    const christmasDate = new Date ('March 20, 2023 00:00');
    const now = new Date();
    
    const diff = christmasDate - now;

    const msInSecond = 1000;
    const msInMinute = 60 * 1000;
    const msInHour = 60 * 60 * 1000;
    const msInDay = 24 * 60 * 60 * 1000;

    const displayDay = Math.floor(diff / msInDay)
    document.querySelector('.days').textContent = displayDay;

    const displayHour = Math.floor((diff % msInDay) / msInHour)
    document.querySelector('.hours').textContent = displayHour;

    const displayMinute = Math.floor((diff % msInHour) / msInMinute);
    document.querySelector('.minutes').textContent = displayMinute;

    const displaySecond = Math.floor((diff % msInMinute) / msInSecond);
    document.querySelector('.seconds').textContent = displaySecond;

    if (diff <= 0) {
        document.querySelector('.days').textContent = 0;
        document.querySelector('.hours').textContent = 0;
        document.querySelector('.minutes').textContent = 0;
        document.querySelector('.seconds').textContent = 0;
        clearInterval(timerID)
        merryChristmas();
    }
}

let timerID = setInterval(christmasCountdown, 1000);

function merryChristmas() {
    const heading = document.querySelector('h1');
    heading.textContent = 'We are finally open!';
    heading.classList.add('.yellow')
}

const items = document.querySelectorAll('.item');

items.forEach(item => {
    // adding the enlarging image effect 
    item.addEventListener('mouseover', () => {
    // removing enlarging effect from first element in order to add it on the second one
    removeFocus();
    item.classList.add('selected');
    });


});

// removing enlarging effect
removeFocus = () => {
    items.forEach(item => {
    item.classList.remove('selected');
    })
}