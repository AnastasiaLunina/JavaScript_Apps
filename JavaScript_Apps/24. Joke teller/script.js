const button = document.getElementById('button');
const audioElement = document.getElementById('audio');
let jokeText = document.getElementById('par');

// Disable / Enable Button
function toggleButton() {
    button.disabled = !button.disabled;
}

// Passing Joke to Voice RSS API
function tellMe(joke) {
    // console.log(joke);
    VoiceRSS.speech({
        key: "3e2f7951a71a4136acffa04b7cabf5fe",
        src: joke,
        hl: 'en-us',
        r: 0,
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    });
}

// Get Jokes from Joke API 
async function getJokes() {
    let joke = '';
    const apiUrl = 'https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit';
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        if (data.setup) {
            joke = `${data.setup} ... ${data.delivery}`;
            jokeText.innerText = `- ${data.setup}
                                  - ${data.delivery}`;
        } else {
            joke = data.joke;
            jokeText.innerText = data.joke
        }
        // Text to Speech
        tellMe(joke);
        // Disable button
        toggleButton();
    } catch (error) {
        // catch errors here
        console.log('Whoops', error)
    }
}

// Event Listeners
button.addEventListener('click', getJokes);
audioElement.addEventListener('ended', toggleButton);