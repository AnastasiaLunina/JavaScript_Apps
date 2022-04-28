const button = document.querySelector(".btn");
button.addEventListener("click", result);

const par = document.querySelector("#show");

function result(e) {
    e.preventDefault();

    let points = 0;

    if (document.querySelector("#answer1").checked) {
        points++;
    } 

    if (document.querySelector("#answer2").checked) {
        points++;
    }

    if (document.querySelector("#answer3").checked) {
        points++;
    }

    if (document.querySelector("#answer4").checked) {
        points++;
    }

    if (document.querySelector("#answer5").checked) {
        points++;
    }

    if (document.querySelector("#answer6").checked) {
        points++;
    }

    if (document.querySelector("#answer7").checked) {
        points++;
    }

    if (document.querySelector("#answer8").checked) {
        points++;
    }

    if (document.querySelector("#answer9").checked) {
        points++;
    }

    if (document.querySelector("#answer10").checked) {
        points++;
    }

    const choice = document.querySelectorAll("input:checked");

    if (choice.length < 10) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Please fill all fields!",
        });
        return result
   }

    const a = document.querySelectorAll(".correct")
    const b = document.querySelectorAll(".wrong")

    for (let i=0; i < a.length; i++) {
        a[i].classList.add("green")
    }

    for (let i=0; i < b.length; i++) {
        b[i].classList.add("red")
    }

    if (points >= 8) {
    par.textContent = "WOW! Your are really good! Your score: " + points;
    }
    else if (points >= 5 && points <= 7) {
        par.textContent = "Good job! Your score: " + points;
    }
    else {
        par.textContent = "Your score: " + points;
    }
}