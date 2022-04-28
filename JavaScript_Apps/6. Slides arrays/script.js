const back = document.querySelector("#back");
const next = document.querySelector("#next");

const photos = ["img/2.jpg", "img/4.jpg", "img/5.jpg", "img/7.jpg", "img/8.jpg", "img/9.jpg", "img/10.jpg", "img/11.jpg", "img/12.jpg"];

let i = 0;

next.addEventListener("click", () => {
    i++;
    if (i > photos.length - 1) {
        i = 0;
    }
    document.querySelector("#pictures").src = photos[i];
})

back.addEventListener("click", () => {
    i--;
    if (i < 0) {
        i = photos.length - 1;
    }
    document.querySelector("#pictures").src = photos[i];    
})

