const messages = [

"You make every hard day feel lighter.",
"Thank you for always believing in me.",
"You deserve all the happiness in the world.",
"Your kindness changes lives every day.",
"You are stronger than you think.",
"You are deeply appreciated.",
"You make home feel safe.",
"Your love means everything.",
"The world is brighter because of you.",
"You inspire people without realizing it.",
"You deserve peace and joy.",
"Your smile comforts everyone around you.",
"You are truly irreplaceable.",
"You’ve done more than enough.",
"You are loved beyond words.",
"You make ordinary days beautiful.",
"Your care never goes unnoticed.",
"You are the heart of this family.",
"Thank you for your endless support.",
"You are someone people admire deeply.",
"You deserve time to rest and smile.",
"You always make things better.",
"You are incredibly strong.",
"Your warmth is unforgettable.",
"You deserve to feel proud of yourself.",
"You are a wonderful mother.",
"You are more appreciated than you know.",
"You give people hope.",
"You are amazing exactly as you are.",
"Your efforts matter every single day.",
"You make people feel understood.",
"You deserve endless flowers and hugs.",
"You bring comfort to everyone.",
"Your patience is admirable.",
"You are someone worth celebrating.",
"You are the definition of care.",
"You make life feel gentler.",
"You deserve all the appreciation today.",
"You always know how to help.",
"Thank you for every sacrifice.",
"You are truly precious.",
"You deserve every good thing coming your way.",
"Your love leaves lasting memories.",
"You make difficult moments easier.",
"You are the reason many smiles exist.",
"Your presence alone is comforting.",
"You are one of the strongest people I know.",
"You deserve happiness every day.",
"You make people feel safe and loved.",
"Your compassion is beautiful.",
"You are a blessing to many.",
"You always give your best.",
"You deserve kindness in return too.",
"You are cherished so much.",
"You are more than enough.",
"Thank you for never giving up.",
"You make life feel warmer.",
"You deserve peaceful days.",
"Your love is unforgettable.",
"You make everyone around you stronger.",
"You are deeply valued.",
"You deserve appreciation every day.",
"You are someone truly special.",
"You have a beautiful heart.",
"Your efforts mean everything.",
"You make memories worth keeping.",
"You are endlessly caring.",
"You deserve laughter and rest.",
"Your support changes lives.",
"You are incredibly important.",
"You bring calm into chaos.",
"You deserve gentle and happy moments.",
"You are one of a kind.",
"You make people feel welcome.",
"You are full of strength and grace.",
"You deserve endless gratitude.",
"Your kindness leaves a lasting impact.",
"You make every place feel like home.",
"You are appreciated more than words can say.",
"You deserve all the flowers today.",
"You are a wonderful person inside and out.",
"You make the world softer.",
"You deserve moments of pure happiness.",
"You are someone people can rely on.",
"Your love is powerful.",
"You are worthy of appreciation.",
"You deserve every heartfelt thank you.",
"You make difficult days survivable.",
"You are a source of comfort.",
"You deserve beautiful memories.",
"You are stronger than every challenge.",
"You bring peace to others.",
"You deserve warmth and care too.",
"You make people feel loved.",
"You are truly remarkable.",
"You deserve joy that lasts.",
"You are appreciated beyond measure.",
"You make life brighter.",
"You deserve all the good things ahead.",
"You are loved endlessly.",
"Thank you for simply being you.",
"You are the light of many lives.",
"You deserve the happiest Mother’s Day ever."

];

function generateMessage(){
    const box = document.getElementById("messageBox");
    const random = messages[Math.floor(Math.random() * messages.length)];

    box.style.opacity = 0;

    setTimeout(() => {
        box.innerHTML = random;
        box.style.opacity = 1;
    }, 150);
}

/* audio dock */

const audio = document.getElementById("audio");
const playBtn = document.getElementById("playBtn");
const disc = document.getElementById("disc");
const note = document.querySelector(".note-icon");
const seekBar = document.getElementById("seekBar");

const currentTimeEl = document.getElementById("currentTime");
const durationEl = document.getElementById("duration");
const trackName = document.getElementById("trackName");

const audioSrc = audio.querySelector("source").src;

const cleanName = audioSrc
    .split("/")
    .pop()
    .replace(/\.[^/.]+$/, "");

trackName.textContent = cleanName;

playBtn.addEventListener("click", () => {

    if(audio.paused){
        audio.play();
    } else {
        audio.pause();
    }

});

audio.addEventListener("play", () => {

    playBtn.innerHTML = "❚❚";

    disc.classList.remove("paused");
    note.classList.remove("paused");

});

audio.addEventListener("pause", () => {

    playBtn.innerHTML = "▶";

    disc.classList.add("paused");
    note.classList.add("paused");

});

audio.addEventListener("loadedmetadata", () => {

    seekBar.max = audio.duration;

    durationEl.textContent = formatTime(audio.duration);

});

audio.addEventListener("timeupdate", () => {

    seekBar.value = audio.currentTime;

    currentTimeEl.textContent = formatTime(audio.currentTime);

});

seekBar.addEventListener("input", () => {

    audio.currentTime = seekBar.value;

});

function formatTime(time){

    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60)
        .toString()
        .padStart(2,"0");

    return `${mins}:${secs}`;
}
