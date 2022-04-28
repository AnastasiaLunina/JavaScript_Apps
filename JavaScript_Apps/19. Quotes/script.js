const button = document.querySelector(".btn");
const par = document.querySelector(".par");

const quotes = [
    "<When you have a dream, you’ve got to grab it and never let go.> — Carol Burnett",
    "<Nothing is impossible. The word itself says I’m possible!> — Audrey Hepburn",
    "<There is nothing impossible if you try.> — Carol Burnett",
    "<“You are never too old to set another goal or to dream a new dream.> — Malala Yousafzai",
    "<Try to be a rainbow in someone’s cloud.> — Maya Angelou",
    "<Believe you can and you’re halfway there.> — Theodore Roosevelt",
    "<Life is what happens when you’re busy making other plans.> — John Lennon",
    "<If opportunity doesn’t knock, build a door.> — Milton Berle",
    "<You know you're in love when you can't fall asleep because reality is finally better than your dreams.> — Dr. Seuss",
    "<Love is that condition in which the happiness of another person is essential to your own.>",
    "<All our dreams can come true, if we have the courage to pursue them.> — Walt Disney",
    "<The secret of getting ahead is getting started.> — Mark Twain",
    "<It’s hard to beat a person who never gives up.> — Babe Ruth",
    "<Everything you can imagine is real.> — Pablo Picasso",
    "<Great things are done by a series of small things brought together> — Vincent Van Gogh"];

button.addEventListener("click", () => {
    let randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    par.style.display = "block";
    par.textContent = randomQuote;
})