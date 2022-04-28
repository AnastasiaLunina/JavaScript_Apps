const api = {
    endpoint: "https://api.openweathermap.org/data/2.5/",
    key: "529315439e51930fcd2347ac1f7605c5"
};

const input = document.querySelector(".input");
input.addEventListener("keydown", enter);

const par = document.querySelector("#show");

function enter(e) {
    if (e.keyCode === 13) {
        getInfo(input.value);
    }
}

async function getInfo(data) {
    const res = await fetch(`${api.endpoint}weather?q=${data}&units=metric&appID=${api.key}`);
    const resReceived = await res.json();
    displayResult(resReceived);

    if (resReceived.weather[0].main === "Clouds") {
        document.querySelector("#myVideo").setAttribute("src","img/clouds.mp4");
    }

    else if (resReceived.weather[0].main === "Clear") {
        document.querySelector("#myVideo").setAttribute("src","img/Pexels Videos 2605326.mp4");
    }

    else {
        document.querySelector("#myVideo").setAttribute("src","img/initial.mp4");
    }

    let roundedTemp = Math.round(resReceived.main.temp);

    if (roundedTemp <= 12) {
        par.innerHTML = `<em>Baby it's cold outside!<br> Probably you should put an extra layer. Or two.</em>`;
        }
        else if (roundedTemp > 12 && roundedTemp <= 24) {
            par.innerHTML = `<em>A kind word can warm a chilly days.<br>Have it with you and take an extra layer. Just in case!</em>`;
        }
        else if (roundedTemp > 25 && roundedTemp <= 30) {
            par.innerHTML = `<em>Iced coffee, on a hot day, can perform miracles. <br> Enjoy warm weather!</em>`;
        }
        else if (roundedTemp > 30) {
            par.innerHTML = `<em>It's finally hot enough to complain about how hot it is. <br>Put the flip-flops in your trunck. Just in case!</em>`;
        }
        else {
            par.innerHTML = `<em>There is no such a thing as a bad weather! <br> Enjoy your day!</em>`;
        }
}

function displayResult(resReceived) {
    let city = document.querySelector(".city");
    city.textContent = `${resReceived.name}, ${resReceived.sys.country}`;

    getOurDate();

    let fahrenheit = (Math.round(resReceived.main.temp) * 9/5) + 32
    
    let temperature = document.querySelector(".temperature");
    temperature.innerHTML = `${Math.round(resReceived.main.temp)}<span>°C</span> / ${fahrenheit}<span>°F</span>`; 

    let feelsLike = document.querySelector(".feels-like");
    feelsLike.innerHTML = `Feels like: ${Math.round(resReceived.main.feels_like)}<span>°</span>`; 

    let weather = document.querySelector(".conditions");
    weather.textContent = `${resReceived.weather[0].main}`; 

    let min = document.querySelector(".variations");
    let max = document.querySelector(".max");

    let fahrenheit_min = (Math.round(resReceived.main.temp_min) * 9/5) + 32
    let fahrenheit_max = (Math.round(resReceived.main.temp_max) * 9/5) + 32

    min.innerHTML = `Min: ${Math.round(resReceived.main.temp_min)}<span>°C</span> / ${fahrenheit_min}<span>°F</span>`; 
    max.innerHTML = `Max: ${Math.round(resReceived.main.temp_max)}<span>°C</span> / ${fahrenheit_max}<span>°F</span>`; 
};

function getOurDate() {
    let fullDate = document.querySelector(".date");

    let currentDate = new Date();

    const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let weekday = weekdays[currentDate.getDay()];

    let day = currentDate.getDate();

    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let month = months[currentDate.getMonth()];

    let year = currentDate.getFullYear();

   fullDate.textContent = `${weekday} ${day} ${month} ${year}`;
};

// Animation 
gsap.from(".animation", {opacity: 0, delay: 1, stagger: 0.6})


