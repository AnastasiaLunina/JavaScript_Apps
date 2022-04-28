function concertcountDown () {
    const concertDate = new Date ("March 20, 2028 00:00");
    const currentDate = new Date();
    const diff = concertDate - currentDate;

    const msInSecond = 1000;
    const msInMinute = 60 * 1000;
    const msInHour = 60 * 60 * 1000;
    const msInDay = 24 * 60 * 60 * 1000;

    const displayDay = Math.floor(diff / msInDay);
    document.querySelector(".days").textContent = displayDay;

    const displayHour = Math.floor((diff % msInDay) / msInHour);
    document.querySelector(".hours").textContent = displayHour;

    const displayMinute = Math.floor((diff % msInHour) / msInMinute);
    document.querySelector(".minutes").textContent = displayMinute;

    const displaySecond = Math.floor((diff % msInMinute) / msInSecond);
    document.querySelector(".seconds").textContent = displaySecond;

    if (diff <= 0) {
        document.querySelector(".days").textContent = 0;
        document.querySelector(".hours").textContent = 0;
        document.querySelector(".minutes").textContent = 0;
        document.querySelector(".seconds").textContent = 0;
        clearInterval(timerId);
    }

}

let timerId = setInterval(concertcountDown, 1000);


const button = document.querySelector(".btn");
button.addEventListener("click", calculateAmount);

const buttonService = document.querySelector(".addTip");
buttonService.addEventListener("click", showTip);

const buttonTicket = document.querySelector(".addTicket");
buttonTicket.addEventListener("click", showTicket);

function showTip(e) {
    e.preventDefault();
    tip.style.display = "block";
}

function showTicket(e) {
    e.preventDefault();
    ticket.style.display = "block";
}

function calculateAmount(e) {
    e.preventDefault();
    const bill = document.querySelector("#ticket").value;
    const people = document.querySelector(".people").value;
    const tip = document.querySelector("#tip").value;

    if (bill === "" || people === "" || people < 1) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: "This field can't be blank",
          })
    }

    let amountPerPerson = parseInt(bill) + parseInt(tip);
    let totalSum = (parseInt(bill) + parseInt(tip)) * people;
    
    document.querySelector(".dividedBill").textContent = amountPerPerson;
    amountPerPerson = amountPerPerson.toFixed(2)
    document.querySelector(".billAndTip").textContent = totalSum;
    totalSum = totalSum.toFixed(2);
}

