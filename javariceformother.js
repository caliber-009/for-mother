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

function generateMessage() {
  const box = document.getElementById("messageBox");
  const random = messages[Math.floor(Math.random() * messages.length)];

  box.style.opacity = "0";

  setTimeout(() => {
    box.textContent = random;
    box.style.opacity = "1";
  }, 150);
}

/* audio dock */
const audio = document.getElementById("audio");
const playBtn = document.getElementById("playBtn");
const muteBtn = document.getElementById("muteBtn");
const disc = document.getElementById("disc");
const note = document.querySelector(".note-icon");
const seekBar = document.getElementById("seekBar");
const currentTimeEl = document.getElementById("currentTime");
const durationEl = document.getElementById("duration");
const trackName = document.getElementById("trackName");

const sourceEl = audio.querySelector("source");
const audioSrc = sourceEl ? (sourceEl.getAttribute("src") || "") : "";

const cleanName = audioSrc
  .split("/")
  .pop()
  .replace(/\.[^/.]+$/, "");

trackName.textContent = cleanName || "audio file";

audio.preload = "auto";
audio.loop = true;
audio.playsInline = true;

function formatTime(time) {
  if (!isFinite(time) || time < 0) return "0:00";
  const mins = Math.floor(time / 60);
  const secs = Math.floor(time % 60).toString().padStart(2, "0");
  return `${mins}:${secs}`;
}

function setPlayingState(isPlaying) {
  playBtn.textContent = isPlaying ? "❚❚" : "▶";
  disc.classList.toggle("paused", !isPlaying);
  note.classList.toggle("paused", !isPlaying);
}

async function startAudio() {
  try {
    await audio.play();
    setPlayingState(true);
  } catch (err) {
    console.log("Autoplay blocked:", err);
    setPlayingState(false);
  }
}

async function tryMutedAutoplay() {
  try {
    audio.muted = true;
    await audio.play();
    setPlayingState(true);

    const unmuteOnFirstGesture = () => {
      audio.muted = false;
      muteBtn.textContent = "🔊";
      document.removeEventListener("pointerdown", unmuteOnFirstGesture);
      document.removeEventListener("keydown", unmuteOnFirstGesture);
    };

    document.addEventListener("pointerdown", unmuteOnFirstGesture, { once: true });
    document.addEventListener("keydown", unmuteOnFirstGesture, { once: true });
  } catch (err) {
    console.log("Muted autoplay blocked:", err);
    setPlayingState(false);
  }
}

playBtn.addEventListener("click", async () => {
  try {
    if (audio.paused) {
      await audio.play();
    } else {
      audio.pause();
    }
  } catch (err) {
    console.error("Audio play failed:", err);
    trackName.textContent = "Audio failed to load";
    setPlayingState(false);
  }
});

audio.addEventListener("play", () => {
  setPlayingState(true);
});

audio.addEventListener("pause", () => {
  setPlayingState(false);
});

audio.addEventListener("loadedmetadata", () => {
  if (isFinite(audio.duration) && audio.duration > 0) {
    seekBar.max = String(audio.duration);
    durationEl.textContent = formatTime(audio.duration);
  }
});

audio.addEventListener("timeupdate", () => {
  seekBar.value = String(audio.currentTime);
  currentTimeEl.textContent = formatTime(audio.currentTime);
});

seekBar.addEventListener("input", () => {
  audio.currentTime = Number(seekBar.value);
});

muteBtn.addEventListener("click", () => {
  audio.muted = !audio.muted;
  muteBtn.textContent = audio.muted ? "🔇" : "🔊";
});

audio.addEventListener("error", () => {
  const code = audio.error ? audio.error.code : "unknown";
  console.error("Audio element error:", code, audio.error);
  trackName.textContent = "Audio file not found";
  playBtn.textContent = "!";
  setPlayingState(false);
});

window.addEventListener("load", tryMutedAutoplay);
document.addEventListener("pointerdown", startAudio, { once: true });
document.addEventListener("keydown", startAudio, { once: true });

/* FLY MY DIH YI SANG I LOVE YOU */

  const SCALE = 1.5;

  const SHARDS = [
    { side:"left",  src:"https://scontent.fmnl3-4.fna.fbcdn.net/v/t39.30808-6/516654012_10164105820819073_1970364747679443726_n.jpg?stp=dst-jpg_p720x720_tt6&_nc_cat=101&ccb=1-7&_nc_sid=dd6889&_nc_ohc=XG650uGCNp4Q7kNvwHiK4_p&_nc_oc=Adp5Srn_ISlCXbk5xIeTBnMx0gPlt2tRQ8ISuYa9ZnH1vfztzV1d4-bWIWU6n4w6qxg&_nc_zt=23&_nc_ht=scontent.fmnl3-4.fna&_nc_gid=UHOZRHJDZFpxEWrbeOiR6Q&_nc_ss=7b2a8&oh=00_Af4CgI8a5UIQ1_xpswsQgUn1ZOdLH1tUNrtVNeVWvhGxOg&oe=6A0526C8", x:228, y:351, w:189, h:110, pts:[[0,0],[24.9,48.2],[45,78.2],[58.7,80],[83.1,88.2],[99.5,99.1],[93.1,84.5],[83.6,69.1],[76.7,60.9],[67.2,56.4],[65.6,53.6],[65.1,48.2],[67.2,44.5],[76.2,38.2],[68.8,13.6],[50.8,9.1],[16.9,5.5]]},
    { side:"left",  src:"https://scontent.fmnl3-2.fna.fbcdn.net/v/t39.30808-6/472273485_10163288026999073_1907739442378769719_n.jpg?stp=dst-jpg_s960x960_tt6&_nc_cat=100&ccb=1-7&_nc_sid=13d280&_nc_ohc=gOhA2lmkhb0Q7kNvwGOlFR9&_nc_oc=AdqAQ5CJTfMLJ_LN1Fa2JL-pnQwkVQ_h5E2nhi3V7VnNldTxToM7owwPL4_JQIbH9MM&_nc_zt=23&_nc_ht=scontent.fmnl3-2.fna&_nc_gid=b8b5dfGmzbgfmDHNljZBYA&_nc_ss=7b2a8&oh=00_Af7qOnqnEgW0cotGrj_BEYbgZDrGZXCQaRdyaCmYKL7Jeg&oe=6A04FD73", x:410, y:399, w:89, h:68, pts:[[42.7,0],[15.7,14.7],[0,30.9],[13.5,50],[27,61.8],[44.9,85.3],[51.7,98.5],[88.8,61.8],[98.9,47.1],[74.2,14.7],[61.8,13.2]]},
    { side:"left",  src:"https://scontent.fmnl3-1.fna.fbcdn.net/v/t39.30808-6/493225664_10163702368594073_9040035427043164393_n.jpg?stp=cp6_dst-jpg_tt6&_nc_cat=110&ccb=1-7&_nc_sid=a74216&_nc_ohc=XvUEUdCtW5sQ7kNvwH8mBXs&_nc_oc=Adpr7rVtQILa0OpTQG0jAdSwMiwsExEMNVHOn_zl6aRRm0TbAm5nIYAXv5ojPYoNgQ8&_nc_zt=23&_nc_ht=scontent.fmnl3-1.fna&_nc_gid=b8b5dfGmzbgfmDHNljZBYA&_nc_ss=7b2a8&oh=00_Af6xOnihF1EXyGegOhg0EIH3PmebWnTppawwHODSuMTIuA&oe=6A05104B", x:384, y:343, w:61, h:44, pts:[[0,18.2],[3.3,29.5],[4.9,65.9],[27.9,90.9],[39.3,97.7],[60.7,97.7],[73.8,93.2],[83.6,81.8],[98.4,86.4],[78.7,54.5],[55.7,36.4],[31.1,0]]},
    { side:"left",  src:"https://scontent.fmnl37-2.fna.fbcdn.net/v/t39.30808-6/472340147_570120755834350_3523813642462878905_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=b895b5&_nc_ohc=VPMgUA4S8OIQ7kNvwEbc8qY&_nc_oc=AdrEGhedmgzOJa27wkGGVYGfCKRCrPxalOMjcbWUzGaCDRJJ9IAFX8kbPtS77HMpjN8&_nc_zt=23&_nc_ht=scontent.fmnl37-2.fna&_nc_gid=feQxSbx-Kvi1ocNBkot9fA&_nc_ss=7b2a8&oh=00_Af4JBkou4H0akPU_Y6GfJVEFPhX3r1f0syvS5EO7UjTpcw&oe=6A0516BE", x:481, y:436, w:52, h:39, pts:[[98.1,7.7],[86.5,0],[67.3,10.3],[40.4,51.3],[0,97.4],[40.4,76.9],[92.3,64.1]]},
    { side:"left",  src:"https://scontent.fmnl37-2.fna.fbcdn.net/v/t39.30808-6/472015504_570120782501014_7222099447274067470_n.jpg?stp=dst-jpg_s1080x2048_tt6&_nc_cat=108&ccb=1-7&_nc_sid=53a332&_nc_ohc=kNL1_0z-zJcQ7kNvwH1sHDI&_nc_oc=AdqN11UfNWCkHl-s9dSQf0bWW9AvEA3I5vJp-d9xauP2vMh4hbr3mU0rKZ2Q-RpM_jc&_nc_zt=23&_nc_ht=scontent.fmnl37-2.fna&_nc_gid=feQxSbx-Kvi1ocNBkot9fA&_nc_ss=7b2a8&oh=00_Af6lo80OgKNFSdCEa-npHwgQr7udzr_zEmloDwrcm2UVQg&oe=6A04F5C0", x:455, y:366, w:41, h:19, pts:[[0,5.3],[17.1,78.9],[29.3,94.7],[97.6,52.6],[68.3,36.8],[34.1,0],[26.8,10.5]]},
    { side:"left",  src:"https://scontent.fmnl37-2.fna.fbcdn.net/v/t39.30808-6/471444172_562883103224782_3480677633268748074_n.jpg?stp=cp6_dst-jpg_s1080x2048_tt6&_nc_cat=103&ccb=1-7&_nc_sid=53a332&_nc_ohc=5-7D6njDb-0Q7kNvwFUV1I1&_nc_oc=AdpOnZWmbIYpbUb2ix4WaSxigkus-hPxX0pcPs3Nrnk8Sq-LB4CBtQoa8js1LtTXEe8&_nc_zt=23&_nc_ht=scontent.fmnl37-2.fna&_nc_gid=7zn3bauB2rV0IuMSFOYvnw&_nc_ss=7b2a8&oh=00_Af5XMcK5Z5OREJA68xEApz-Op-IpVMqE9btdplkB_Tg9-Q&oe=6A04FC2D", x:498, y:389, w:23, h:34, pts:[[0,0],[21.7,79.4],[47.8,91.2],[95.7,97.1],[13,2.9]]},
    { side:"left",  src:"https://scontent.fmnl3-4.fna.fbcdn.net/v/t39.30808-6/492456475_24357965930460864_1266991904267696371_n.jpg?stp=cp6_dst-jpg_p960x960_tt6&_nc_cat=101&ccb=1-7&_nc_sid=7b2446&_nc_ohc=DJJQmMZwJlMQ7kNvwFJX_nw&_nc_oc=Adqms87g_X9Ojws0MdaHbRY1AaGaBYkCU5oeCNlrL2P0oJLeGRUSm8v2qzqjN4tR1VI&_nc_zt=23&_nc_ht=scontent.fmnl3-4.fna&_nc_gid=CpWZJuk_DsOLELWfB_0t8w&_nc_ss=7b2a8&oh=00_Af6SlbW_QEelLIE80bVdg-E-QP7RGmDCQjYj_LGExiIhCg&oe=6A051E50", x:657, y:479, w:38, h:39, pts:[[0,0],[13.2,43.6],[97.4,97.4],[13.2,17.9]]},
    { side:"left",  src:"https://scontent.fmnl3-4.fna.fbcdn.net/v/t39.30808-6/470211715_556558553857237_5194730919166394847_n.jpg?stp=cp6_dst-jpg_s1080x2048_tt6&_nc_cat=104&ccb=1-7&_nc_sid=53a332&_nc_ohc=OTkOeOekYDAQ7kNvwENarOR&_nc_oc=AdrBc8FbgFRJk8uZOjQjNlbvxR_rS0gRY81XMV1DnJSkF4SSg4Q3xi96F_zJMu7tV2k&_nc_zt=23&_nc_ht=scontent.fmnl3-4.fna&_nc_gid=rznDfRVgUOsfNZwaXoZAig&_nc_ss=7b2a8&oh=00_Af6r3bP933arlGHHHLRvxhEMapmLjAXOfg3hrbthhA5gAQ&oe=6A052484", x:554, y:432, w:19, h:26, pts:[[0,0],[0,15.4],[94.7,96.2],[78.9,57.7],[84.2,19.2],[26.3,15.4],[10.5,0]]},
    { side:"left",  src:"https://scontent.fmnl37-2.fna.fbcdn.net/v/t39.30808-6/510405018_10163997454844073_7783909180611614547_n.jpg?stp=dst-jpg_s1080x2048_tt6&_nc_cat=108&ccb=1-7&_nc_sid=13d280&_nc_ohc=Mt-tuWo8rhkQ7kNvwFmfD75&_nc_oc=AdqU8AqSdCQ42LkF9nLwWBpIPHcBqd-28H9y6qpeUerx1nhZ83LgJUTptEbhKU-gppg&_nc_zt=23&_nc_ht=scontent.fmnl37-2.fna&_nc_gid=U4oXfYtvhD7Nsn4OfoILzA&_nc_ss=7b2a8&oh=00_Af4J6baodOr-onlX8DxZr7pm2pticJvWaPclO9q4GIreiQ&oe=6A051E2F", x:564, y:407, w:22, h:10, pts:[[0,0],[18.2,60],[63.6,90],[95.5,90],[36.4,10]]},
    { side:"left",  src:"https://scontent.fmnl37-2.fna.fbcdn.net/v/t1.6435-9/120954984_10159168756224073_3774329640113430294_n.jpg?stp=dst-jpg_s552x414_tt6&_nc_cat=103&ccb=1-7&_nc_sid=a934a8&_nc_ohc=l-yX_mi1YbgQ7kNvwEp07Ch&_nc_oc=AdrsWGtPZUuTOWxFX56r7GWTKfkWlIrUtZ6BLC2XDhn9eEGnKpfjh2Hf0Tpwvjlok1I&_nc_zt=23&_nc_ht=scontent.fmnl37-2.fna&_nc_gid=okd2SFMmpgPxoqCLPIZD7A&_nc_ss=7b2a8&oh=00_Af7jzGkFpneHSmcQgP74UY7KbgmzqsuOXnj25EnYxMhD8w&oe=6A26B942", x:566, y:420, w:18, h:27, pts:[[0,0],[88.9,29.6],[88.9,48.1],[50,63],[88.9,85.2],[94.4,96.3],[88.9,11.1],[50,11.1]]},
    { side:"left",  src:"https://scontent.fmnl37-2.fna.fbcdn.net/v/t39.30808-6/471409786_10163200289124073_3275831659452588584_n.jpg?stp=c0.74.899.899a_dst-jpg_s552x414_tt6&_nc_cat=103&ccb=1-7&_nc_sid=46a2c4&_nc_ohc=4xE-UQbr_QwQ7kNvwEDeEXl&_nc_oc=AdoTr52FZd4gscCdq8H97DPQiF0t6e3z5Lu2881QyUlHicTdcnwzdZvTe-iMz36TmSQ&_nc_zt=23&_nc_ht=scontent.fmnl37-2.fna&_nc_gid=okd2SFMmpgPxoqCLPIZD7A&_nc_ss=7b2a8&oh=00_Af7V40NtXj9vIbVMJSmgLHKxYkrVDVspUxaQNDr-MAWqZw&oe=6A04FD89", x:505, y:382, w:19, h:31, pts:[[0,0],[94.7,96.8],[57.9,54.8],[57.9,41.9],[26.3,29],[26.3,12.9],[36.8,9.7]]},
    { side:"left",  src:"https://scontent.fmnl3-1.fna.fbcdn.net/v/t1.6435-9/119046792_10159088839579073_5054015585126994731_n.jpg?stp=c0.85.1034.1034a_dst-jpg_s552x414_tt6&_nc_cat=107&ccb=1-7&_nc_sid=46a2c4&_nc_ohc=efJd_KoginAQ7kNvwFE9Ck5&_nc_oc=Ado9bqG47zfrCmxnrgmqsd5qW54ZdtfAe7eHmeSjWelPpCaf1qbME6YHvrpScoRGab0&_nc_zt=23&_nc_ht=scontent.fmnl3-1.fna&_nc_gid=okd2SFMmpgPxoqCLPIZD7A&_nc_ss=7b2a8&oh=00_Af4UvzQfVXrsOd2jgTsQRz9KFLtZWmWX8NNMdwb4picrSg&oe=6A26BAD5", x:542, y:390, w:11, h:17, pts:[[0,0],[27.3,58.8],[90.9,94.1],[81.8,47.1]]},
    { side:"left",  src:"https://scontent.fmnl3-4.fna.fbcdn.net/v/t1.6435-9/80092317_10158163218019073_2088085349807947776_n.jpg?stp=c0.169.1536.1536a_dst-jpg_s552x414_tt6&_nc_cat=104&ccb=1-7&_nc_sid=5df8b4&_nc_ohc=V165Xx7AuXEQ7kNvwEY4LIX&_nc_oc=AdrqNdNQYBca_deA3qkMS9Gt-2raDVDIoyQrIKnUMgKDvTF4GNQKitxyRofwxSpqcWU&_nc_zt=23&_nc_ht=scontent.fmnl3-4.fna&_nc_gid=F4mEqZPQJ17kiqB0PLglBA&_nc_ss=7b2a8&oh=00_Af5X8d4vsH8wk8F26ulI22eSKbt6RyXff_2r75lr-GuDUA&oe=6A26C62F", x:610, y:461, w:14, h:14, pts:[[42.9,0],[0,85.7],[14.3,92.9],[35.7,57.1],[92.9,50]]},
    { side:"left",  src:"https://scontent.fmnl37-1.fna.fbcdn.net/v/t39.30808-6/471623862_10163206578689073_1009346194222825247_n.jpg?stp=dst-jpg_s552x414_tt6&_nc_cat=109&ccb=1-7&_nc_sid=a934a8&_nc_ohc=cTMO7Lqol5wQ7kNvwG9TGRZ&_nc_oc=AdqWCboFiELXxUz4CC3iKnyCiUoqo8Cf0dDkgPl1h9rh52E0K52tpNdAEIdHoqd0pbs&_nc_zt=23&_nc_ht=scontent.fmnl37-1.fna&_nc_gid=6IbkmIHhvkwzODlmuXINgA&_nc_ss=7b2a8&oh=00_Af4M1954zYJbFj9zsMkEXKUVAvaZoU7wVD9wBr4asAoDPQ&oe=6A04F4F9", x:634, y:478, w:13, h:11, pts:[[92.3,90.9],[76.9,0],[0,36.4]]},
    { side:"left",  src:"https://scontent.fmnl37-1.fna.fbcdn.net/v/t1.6435-9/118880650_10159079648574073_930806658806644057_n.jpg?stp=dst-jpg_s552x414_tt6&_nc_cat=106&ccb=1-7&_nc_sid=46a2c4&_nc_ohc=J0hFumMETEcQ7kNvwGLT35T&_nc_oc=AdrRVmkSFY7BnNt4haxbs6Zz7VK__9kLbgqi1mlD17BSBiJbXFRFvsmS6FJgUEtrsHI&_nc_zt=23&_nc_ht=scontent.fmnl37-1.fna&_nc_gid=yx0KC_0y7k6tIx6i8YGg-A&_nc_ss=7b2a8&oh=00_Af4plu6z5morZVmmk0DoU7k40043OqzzK2suPhtnkTA0bA&oe=6A269A52", x:503, y:425, w:20, h:10, pts:[[0,0],[40,90],[95,50],[60,50]]},
    { side:"left",  src:"https://scontent.fmnl3-4.fna.fbcdn.net/v/t1.6435-9/118934770_10159079747829073_6776115724289042634_n.jpg?stp=dst-jpg_s552x414_tt6&_nc_cat=102&ccb=1-7&_nc_sid=46a2c4&_nc_ohc=zQISooYUY_AQ7kNvwHP7Yiw&_nc_oc=Adq8LypuDlI-kOGzxHmBzqgKkLvsFDRHQMrq97fys1kH_OFhRcGmy1EpFHF4BPRM4Vk&_nc_zt=23&_nc_ht=scontent.fmnl3-4.fna&_nc_gid=yx0KC_0y7k6tIx6i8YGg-A&_nc_ss=7b2a8&oh=00_Af5oMaTYruMelOFEnh0wzhO5VRwxhnOTcm471J1BGeHjog&oe=6A26BED4", x:630, y:452, w:10, h:12, pts:[[0,0],[70,91.7],[90,58.3],[70,25]]},
    { side:"left",  src:"https://scontent.fmnl37-2.fna.fbcdn.net/v/t1.6435-9/121061297_10159173418014073_1862770117783028204_n.jpg?stp=c0.91.828.828a_dst-jpg_s552x414_tt6&_nc_cat=103&ccb=1-7&_nc_sid=5df8b4&_nc_ohc=Uib4-rOLz8gQ7kNvwHqZuwY&_nc_oc=AdoKTlh5KaQ7OtoE1cLX0DoVonfK9cVV4YCn3Xe7mtogl6uLg3BRd_bUmNmS__mhvjs&_nc_zt=23&_nc_ht=scontent.fmnl37-2.fna&_nc_gid=okd2SFMmpgPxoqCLPIZD7A&_nc_ss=7b2a8&oh=00_Af7WKhC7nSyOlJaW9GbGBDJuIqti-A4KnGhSX1Lo3jjiDQ&oe=6A26995C", x:548, y:442, w:11, h:11, pts:[[0,0],[0,27.3],[90.9,90.9]]},
    { side:"left",  src:"https://scontent.fmnl3-3.fna.fbcdn.net/v/t39.30808-6/471943330_10163212835254073_119820965583847421_n.jpg?stp=c0.119.1440.1440a_dst-jpg_s552x414_tt6&_nc_cat=111&ccb=1-7&_nc_sid=a934a8&_nc_ohc=-y2KSUzb83wQ7kNvwG0e32c&_nc_oc=Adr0nqHPlFaJ0RfC2v9vF7IffYi9C5TwAiIATa2cx--RQ1gst6x_FQXktkMl-xoQ-wM&_nc_zt=23&_nc_ht=scontent.fmnl3-3.fna&_nc_gid=IfwLQ2Pyh3E5EEvZpRiETg&_nc_ss=7b2a8&oh=00_Af5KOITCBETjdzQX9MIRSz-yPPsMeoXMzUn-fX4DiG4ScQ&oe=6A052BD7", x:598, y:443, w:5, h:11, pts:[[0,0],[40,90.9],[80,45.5]]},
    { side:"left",  src:"https://scontent.fmnl3-1.fna.fbcdn.net/v/t39.30808-6/472064919_10163222561659073_6527207453921160974_n.jpg?stp=dst-jpg_s552x414_tt6&_nc_cat=107&ccb=1-7&_nc_sid=a934a8&_nc_ohc=wxlbDVVohHQQ7kNvwFtQ88W&_nc_oc=AdrIVGhE2WcKvGM-SsDKfx7CxO7g5KusLacuzE2BBB3WperpbBnhumRXq3iNFVaq97c&_nc_zt=23&_nc_ht=scontent.fmnl3-1.fna&_nc_gid=HQXI2SiVxDxRrULGxT1X2g&_nc_ss=7b2a8&oh=00_Af4vAbxBWH-oKo3Meatrbm_Er39pZ2_97qsn9ISxC9dg3Q&oe=6A04FB95", x:552, y:422, w:19, h:9, pts:[[0,0],[78.9,88.9],[94.7,88.9]]},
    { side:"left",  src:"https://scontent.fmnl3-1.fna.fbcdn.net/v/t1.6435-9/119046792_10159088839579073_5054015585126994731_n.jpg?stp=c0.85.1034.1034a_dst-jpg_s552x414_tt6&_nc_cat=107&ccb=1-7&_nc_sid=46a2c4&_nc_ohc=efJd_KoginAQ7kNvwFE9Ck5&_nc_oc=Ado9bqG47zfrCmxnrgmqsd5qW54ZdtfAe7eHmeSjWelPpCaf1qbME6YHvrpScoRGab0&_nc_zt=23&_nc_ht=scontent.fmnl3-1.fna&_nc_gid=okd2SFMmpgPxoqCLPIZD7A&_nc_ss=7b2a8&oh=00_Af4UvzQfVXrsOd2jgTsQRz9KFLtZWmWX8NNMdwb4picrSg&oe=6A26BAD5", x:531, y:412, w:8, h:14, pts:[[0,0],[50,78.6],[87.5,92.9]]},

    { side:"right", src:"https://scontent.fmnl3-3.fna.fbcdn.net/v/t39.30808-6/675519055_27637326645858093_8736402162864421463_n.jpg?stp=cp6_dst-jpg_p960x960_tt6&_nc_cat=111&ccb=1-7&_nc_sid=7b2446&_nc_ohc=gTcnY9ofjP0Q7kNvwE93mIz&_nc_oc=Adqz9G17bKS0EBXZlrL704z0SroTPRZFQMRXAImT2-m277_omBGjmj-E_rqrgTugpA0&_nc_zt=23&_nc_ht=scontent.fmnl3-3.fna&_nc_gid=3qc8mqBzZvL0RrU6c4-mUQ&_nc_ss=7b2a8&oh=00_Af7KrYHv1ohHbHkLDGwb6JezqlC_cTNCTQ1rCS8Ej0KtGA&oe=6A050761", x:1124, y:202, w:95, h:41, pts:[[98.9,2.4],[93.7,0],[78.9,24.4],[58.9,41.5],[49.5,36.6],[37.9,53.7],[28.4,58.5],[17.9,58.5],[4.2,51.2],[0,53.7],[1.1,97.6],[9.5,75.6],[33.7,75.6],[36.8,70.7],[74.7,58.5]]},
    { side:"right", src:"https://scontent.fmnl3-4.fna.fbcdn.net/v/t39.30808-6/676934844_27637324525858305_7077874732415117066_n.jpg?stp=cp6_dst-jpg_p960x960_tt6&_nc_cat=104&ccb=1-7&_nc_sid=7b2446&_nc_ohc=S5YARFlrrmYQ7kNvwHVR5y5&_nc_oc=AdoWmDmxEN3WkRhuC8Hqu5Mp-qDh4yNGGxi0vZnNIpWe-SeVXfP8GA5G9MODf7f2Uw0&_nc_zt=23&_nc_ht=scontent.fmnl3-4.fna&_nc_gid=3qc8mqBzZvL0RrU6c4-mUQ&_nc_ss=7b2a8&oh=00_Af577nTgGT1O86-aBlYRrgy0ZCV9yMqUG6nfcAuAao0uIQ&oe=6A051EFA", x:1177, y:507, w:46, h:47, pts:[[0,0],[19.6,27.7],[19.6,51.1],[28.3,95.7],[43.5,78.7],[56.5,78.7],[97.8,97.9],[54.3,40.4]]},
    { side:"right", src:"https://scontent.fmnl3-4.fna.fbcdn.net/v/t39.30808-6/678015028_27637324532524971_5089489143898590660_n.jpg?stp=cp6_dst-jpg_p960x960_tt6&_nc_cat=102&ccb=1-7&_nc_sid=7b2446&_nc_ohc=gDARCBC8tqgQ7kNvwGNc_2y&_nc_oc=AdqeF7hguwg9GYuBFS7pEsng7Bf8nZpJeBZHv2xwpYIgyRQptqJfRjLctH7lW8qGScc&_nc_zt=23&_nc_ht=scontent.fmnl3-4.fna&_nc_gid=3qc8mqBzZvL0RrU6c4-mUQ&_nc_ss=7b2a8&oh=00_Af64YWT-4oFoQ8ubqHQIrqDiSC_9dFVv75BkmAvCMW6_oQ&oe=6A05034C", x:992, y:341, w:35, h:25, pts:[[97.1,4],[77.1,0],[62.9,8],[0,92],[57.1,92],[94.3,20]]},
    { side:"right", src:"https://scontent.fmnl3-1.fna.fbcdn.net/v/t39.30808-6/688746911_27783676864556403_9190093417328715264_n.jpg?stp=cp6_dst-jpg_p960x960_tt6&_nc_cat=110&ccb=1-7&_nc_sid=7b2446&_nc_ohc=2MR72DLGnREQ7kNvwHDcuLp&_nc_oc=Ado9jR0OZeOXewI4fNEj5S6_kPWlwgVc-KfHbppt09bDTYoD2_d5N0ShFJUdBmI9w-o&_nc_zt=23&_nc_ht=scontent.fmnl3-1.fna&_nc_gid=zVd1knCydO2RSH9pOWyMtQ&_nc_ss=7b2a8&oh=00_Af6m3ecoGcBuL3dNGMucjMalHsN2r1Ezlp6Dxra4bsp5Zg&oe=6A05022D", x:1073, y:273, w:55, h:38, pts:[[98.2,0],[83.6,5.3],[56.4,26.3],[30.9,52.6],[0,97.4],[20,92.1],[61.8,34.2]]},
    { side:"right", src:"https://scontent.fmnl3-1.fna.fbcdn.net/v/t39.30808-6/689266569_27783676817889741_3014214113443434922_n.jpg?stp=cp6_dst-jpg_tt6&_nc_cat=107&ccb=1-7&_nc_sid=7b2446&_nc_ohc=hDx21DDU5nIQ7kNvwFtCp95&_nc_oc=Adp0vrx5Cm2pJOc8kOR3tHFyCLakMWBxBlx4HCDzNI2GzLJk2lC2VKJXAf7IbhZDhTY&_nc_zt=23&_nc_ht=scontent.fmnl3-1.fna&_nc_gid=1MmPckSKy5P2ATAMp3uLRg&_nc_ss=7b2a8&oh=00_Af7ApTnokY7FELK_XXXXkQyzhY3nxmkqYWuhEzxjE2UucA&oe=6A0526E2", x:1130, y:159, w:26, h:46, pts:[[88.5,0],[26.9,45.7],[0,73.9],[15.4,97.8],[96.2,4.3]]},
    { side:"right", src:"https://scontent.fmnl37-2.fna.fbcdn.net/v/t39.30808-6/686956229_27783675707889852_4846368166165793726_n.jpg?stp=cp6_dst-jpg_tt6&_nc_cat=103&ccb=1-7&_nc_sid=7b2446&_nc_ohc=DVdGTe1oixYQ7kNvwFSJjVB&_nc_oc=AdqbtXTFKJuRKVyhwVRfRCLcbEVgAPlE2I9-gCHb5fByWL0DSlTyh2b8vpv-dZxfg-U&_nc_zt=23&_nc_ht=scontent.fmnl37-2.fna&_nc_gid=QFlFv3n493iavtYf4lffbQ&_nc_ss=7b2a8&oh=00_Af7gdxeV8qpiafRq0p7qeXqbPUDqQen8-qk69LVqEwcCnQ&oe=6A052000", x:904, y:377, w:42, h:23, pts:[[97.6,8.7],[88.1,0],[57.1,0],[31,52.2],[0,95.7],[31,69.6],[54.8,60.9],[90.5,26.1]]},
    { side:"right", src:"https://scontent.fmnl37-1.fna.fbcdn.net/v/t39.30808-6/686188862_27783675191223237_4394000698601117605_n.jpg?stp=cp6_dst-jpg_tt6&_nc_cat=109&ccb=1-7&_nc_sid=7b2446&_nc_ohc=icObTDGg6sIQ7kNvwFL-HwW&_nc_oc=Adq49pmU2XC4cBByEzv1Knyz7Wj1HkQZqPBI-ceGVI_jnQ2t8mVdokEdO6D1O_eFBEo&_nc_zt=23&_nc_ht=scontent.fmnl37-1.fna&_nc_gid=Vn6s9cnSvW4sdjSSrWeCVQ&_nc_ss=7b2a8&oh=00_Af6h8YSetCErUmv3-K01SXNzIK78isNDcdNz9P7tvrInBA&oe=6A05251A", x:1138, y:523, w:24, h:21, pts:[[4.2,0],[0,33.3],[95.8,95.2],[91.7,33.3],[83.3,14.3],[37.5,0]]},
    { side:"right", src:"https://scontent.fmnl37-1.fna.fbcdn.net/v/t39.30808-6/688062640_27783674984556591_8817267785630763167_n.jpg?stp=cp6_dst-jpg_tt6&_nc_cat=106&ccb=1-7&_nc_sid=7b2446&_nc_ohc=g1BpeJZPdT8Q7kNvwERVf9z&_nc_oc=Adrzl_ifLxFpzLgWk0E4MTTCZRWb2sffiIdevzOzcqY3EbM9g34mGjyNItl5AK7SaEE&_nc_zt=23&_nc_ht=scontent.fmnl37-1.fna&_nc_gid=du8npMXlvF8VdfbO606Ysw&_nc_ss=7b2a8&oh=00_Af5dGxDBrZJVbLDqguGwbZAq6cgyTJ33i-hAm2b_46Unag&oe=6A050B87", x:867, y:491, w:27, h:14, pts:[[96.3,0],[33.3,7.1],[0,92.9]]},
    { side:"right", src:"https://scontent.fmnl3-1.fna.fbcdn.net/v/t39.30808-6/689406354_27783676484556441_1281583286115003132_n.jpg?stp=cp6_dst-jpg_tt6&_nc_cat=110&ccb=1-7&_nc_sid=7b2446&_nc_ohc=NsVnBAc9asAQ7kNvwHLaxkF&_nc_oc=AdpwrxTuKSlLQgZnJBuGy7bitDCv5fqWybskUhq8sT6BIMEjEA5PX7SDBJhUDTg_IM4&_nc_zt=23&_nc_ht=scontent.fmnl3-1.fna&_nc_gid=KXd4czLNraqJKYC6Gyafrg&_nc_ss=7b2a8&oh=00_Af7cWUHKQcWcrKICiCytoctJWAGBynzkEGDeZ4P5YLhTbw&oe=6A050FA3", x:940, y:448, w:19, h:17, pts:[[94.7,0],[57.9,47.1],[0,94.1],[78.9,94.1]]},
    { side:"right", src:"https://scontent.fmnl3-4.fna.fbcdn.net/v/t39.30808-6/686167999_27783674964556593_7094627756484132903_n.jpg?stp=cp6_dst-jpg_p960x960_tt6&_nc_cat=101&ccb=1-7&_nc_sid=7b2446&_nc_ohc=ey1b6HogKtYQ7kNvwFhgRYR&_nc_oc=Adp84r2sEq5Y81EjdfUJrA-hzKXZfLa4Nlcr5eBocOExsy9Z9K7YIZRALPDG86ajQWo&_nc_zt=23&_nc_ht=scontent.fmnl3-4.fna&_nc_gid=zVd1knCydO2RSH9pOWyMtQ&_nc_ss=7b2a8&oh=00_Af4va76FENvMyAX7H5JgIPwI5G7yd8d1pzUaGXyzblhesA&oe=6A04F329", x:872, y:468, w:32, h:19, pts:[[96.9,89.5],[84.4,68.4],[65.6,0],[75,52.6],[68.8,78.9],[15.6,73.7],[0,94.7],[15.6,84.2]]},
    { side:"right", src:"https://scontent.fmnl3-1.fna.fbcdn.net/v/t39.30808-6/471159244_18475455562019755_4692098533081709761_n.jpg?stp=c0.119.1440.1440a_dst-jpg_s552x414_tt6&_nc_cat=107&ccb=1-7&_nc_sid=a934a8&_nc_ohc=mX9famZylpsQ7kNvwFJgwTi&_nc_oc=Adpp6ujk4nBaF3hWLsm_yWMQyl35Lbao170qMLFbp1_Jb6pNjH0KMBpoINkIN1R0UvU&_nc_zt=23&_nc_ht=scontent.fmnl3-1.fna&_nc_gid=3Ir9EdMP8pzRsIZIXwqBxg&_nc_ss=7b2a8&oh=00_Af42PVM-gwO9oJXLc9KOm3Iut0-n7CiHPfpffVV5UNeu1w&oe=6A05226C", x:870, y:467, w:18, h:12, pts:[[83.3,0],[66.7,0],[0,91.7],[22.2,66.7],[94.4,66.7]]},
    { side:"right", src:"https://scontent.fmnl3-4.fna.fbcdn.net/v/t39.30808-6/515896505_10164105109024073_7966658190757644146_n.jpg?stp=c256.0.1536.1536a_cp6_dst-jpg_s552x414_tt6&_nc_cat=104&ccb=1-7&_nc_sid=4fc511&_nc_ohc=4h7PnKvOV4oQ7kNvwGilKkR&_nc_oc=Ado4fpFP-0K1Mubn8WF58Khl4-2w7DSxgH9H31lKfi-nRD8DAVPU021cUS3IEySK6gQ&_nc_zt=23&_nc_ht=scontent.fmnl3-4.fna&_nc_gid=3Ir9EdMP8pzRsIZIXwqBxg&_nc_ss=7b2a8&oh=00_Af6tvrSm0xIaWhg-BEKmQtV9nQgFlTPxmxAt7KwEx3UW-Q&oe=6A0514F7", x:1133, y:494, w:18, h:14, pts:[[0,7.1],[50,71.4],[94.4,92.9],[33.3,7.1]]},
    { side:"right", src:"https://scontent.fmnl37-1.fna.fbcdn.net/v/t39.30808-6/480247894_600911869421905_2337110743625864288_n.jpg?stp=cp6_dst-jpg_s552x414_tt6&_nc_cat=106&ccb=1-7&_nc_sid=3da8dc&_nc_ohc=TYqzYcMM4qYQ7kNvwE_3VOo&_nc_oc=Ador6LrpIx1WHqFOUbPPGrFEiJhhU5pGrbDMbSAkRRJq_1vPHg6qJAWFehKMDySiDrE&_nc_zt=23&_nc_ht=scontent.fmnl37-1.fna&_nc_gid=Wq_XaupHrXuBg4VtrX0enQ&_nc_ss=7b2a8&oh=00_Af71Th-LvkxId3xKFBnHTPDkBNVF8k71nJuqazjE08nXIA&oe=6A052751", x:834, y:495, w:18, h:16, pts:[[94.4,6.2],[88.9,0],[0,93.8],[83.3,31.2]]},
    { side:"right", src:"https://scontent.fmnl3-2.fna.fbcdn.net/v/t39.30808-6/686520853_942681745244914_438814815352724143_n.jpg?stp=cp6_dst-jpg_s1080x2048_tt6&_nc_cat=100&ccb=1-7&_nc_sid=1d70fc&_nc_ohc=v1rvckxew3MQ7kNvwHsJB7W&_nc_oc=AdpX8wj8vHQyR34jo8qes90V4-ZoDfN80csHwcSFxrrgXAkrNH6z_AGo9f-fqsu_B-k&_nc_zt=23&_nc_ht=scontent.fmnl3-2.fna&_nc_gid=zVd1knCydO2RSH9pOWyMtQ&_nc_ss=7b2a8&oh=00_Af79h2nkw-iSrkfTTyLMxOMLKcU070BVfxDyNYURBJR-rA&oe=6A051B54", x:934, y:430, w:10, h:10, pts:[[90,0],[40,10],[0,90]]},
    { side:"right", src:"https://scontent.fmnl37-2.fna.fbcdn.net/v/t39.30808-6/509423000_694040550109036_6981621925914624444_n.jpg?stp=dst-jpg_s552x414_tt6&_nc_cat=108&ccb=1-7&_nc_sid=3da8dc&_nc_ohc=p4BfFYZH07IQ7kNvwHqy1wC&_nc_oc=AdpsSEztIZINYwGcBL1-0Qfl4FP4Ot4s2XK_WWwRTRdyOHHgPirM_eWU3lB6MTgOpKU&_nc_zt=23&_nc_ht=scontent.fmnl37-2.fna&_nc_gid=mnj4d3tJ6DTz1t95b6LfXQ&_nc_ss=7b2a8&oh=00_Af7iu4DkxA-J9cfrQ3NqGaeWjv-16466yf-l_REHIms3vA&oe=6A0521F2", x:997, y:388, w:5, h:11, pts:[[60,0],[0,45.5],[40,90.9],[80,36.4]]},
    { side:"right", src:"https://scontent.fmnl3-3.fna.fbcdn.net/v/t39.30808-6/500110469_668769979302760_4284492066453949095_n.jpg?stp=dst-jpg_s552x414_tt6&_nc_cat=111&ccb=1-7&_nc_sid=3da8dc&_nc_ohc=IMNjntJosScQ7kNvwFfaVuP&_nc_oc=AdohQmbGVOgAqIim-wjBCO9qApR3Kak-ULg0NI1Zl38aPgmfCAjBU_S7OAfmZ5ZzhaU&_nc_zt=23&_nc_ht=scontent.fmnl3-3.fna&_nc_gid=mnj4d3tJ6DTz1t95b6LfXQ&_nc_ss=7b2a8&oh=00_Af7THsEAASs7p1TFUbHIxTzv1UvYRatgY_ZuXu9iKRmJEQ&oe=6A04F457", x:1145, y:490, w:16, h:18, pts:[[0,0],[93.8,94.4]]},
    { side:"right", src:"https://scontent.fmnl37-1.fna.fbcdn.net/v/t39.30808-6/469499649_551864150993344_6988182846983859792_n.jpg?stp=dst-jpg_s552x414_tt6&_nc_cat=106&ccb=1-7&_nc_sid=3da8dc&_nc_ohc=b6ZrA6I0H8UQ7kNvwGUBtMj&_nc_oc=AdrWYN6ymfuAdh35MWOP_pb3KlUnbBT0qEoRgb_OpG7HuOxHNJbpa6DUQMGgNYnIZuc&_nc_zt=23&_nc_ht=scontent.fmnl37-1.fna&_nc_gid=mnj4d3tJ6DTz1t95b6LfXQ&_nc_ss=7b2a8&oh=00_Af4s-S8nOI6x_ONftylIZNvVpcyd1kZgH--t75dpmKMvZw&oe=6A04F5C2", x:896, y:453, w:5, h:8, pts:[[80,0],[0,37.5],[20,87.5]]},
    { side:"right", src:"https://scontent.fmnl37-1.fna.fbcdn.net/v/t39.30808-6/688044627_942682175244871_4432961845322778629_n.jpg?stp=cp6_dst-jpg_tt6&_nc_cat=109&ccb=1-7&_nc_sid=2a1932&_nc_ohc=HHz-Mmk4lQgQ7kNvwGXVGsJ&_nc_oc=Adp3oGe_AQ2XRBoiZt-cGVX3PfFJL9Gzn0ALgEBu-2I6FdgKd7ZX7y71zZjbI5qNQLg&_nc_zt=23&_nc_ht=scontent.fmnl37-1.fna&_nc_gid=r6zRLe-hPi_G74Pa-v6iCw&_nc_ss=7b2a8&oh=00_Af622-UK6-qL2jcNY_vsfM8yhqSkKIKU_hT6w2VDIsaQ4w&oe=6A051643", x:863, y:481, w:4, h:5, pts:[[75,0],[0,80]]},
    { side:"right", src:"https://scontent.fmnl3-2.fna.fbcdn.net/v/t39.30808-6/608929261_10165078076274073_6843691771297253298_n.jpg?stp=dst-jpg_s1080x2048_tt6&_nc_cat=100&ccb=1-7&_nc_sid=7b2446&_nc_ohc=7iihUeu6CXoQ7kNvwEns7W_&_nc_oc=AdrU3Ni7YztdGbcPP-DH3InWDoRrUgOLRz1DVY4-hned-x7yOY79amq8xJO49yWA2ak&_nc_zt=23&_nc_ht=scontent.fmnl3-2.fna&_nc_gid=OIoOEHNa0IpgREjdIU2FAw&_nc_ss=7b2a8&oh=00_Af4RLYV3Xwlb5GveMaZuO2od1xMPpRePfGVuL3NoJ49M5Q&oe=6A04FE1C", x:922, y:420, w:4, h:5, pts:[[75,0],[0,80]]},
    { side:"right", src:"https://scontent.fmnl37-1.fna.fbcdn.net/v/t39.30808-6/618178176_1193502222949233_8101175157130882615_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=13d280&_nc_ohc=c4z-jsq1wQgQ7kNvwFuoYnD&_nc_oc=AdqumblqzXH3FNOz6cCTp_jnjM1YCLzjVvP-L3CRgzGYyKEJXnLZFuuLgIYlFuTzXfc&_nc_zt=23&_nc_ht=scontent.fmnl37-1.fna&_nc_gid=CgA3e6hcDr4ca5pNtfS20Q&_nc_ss=7b2a8&oh=00_Af4FNx3Xc6htOH4U-XDVbXMoU5qaat78GEHkusjhmkMozw&oe=6A0501B8", x:959, y:443, w:1, h:3, pts:[[0,0],[0,66.7]]}
  ];

  const stage = document.getElementById("stage");

  SHARDS.forEach((s) => {
    const el = document.createElement("div");
    el.className = `shard ${s.side}`;

    const scaledW = s.w * SCALE;
    const scaledH = s.h * SCALE;
    const scaledX = s.x - (scaledW - s.w) / 2;
    const scaledY = s.y - (scaledH - s.h) / 2;

    el.style.left = `${scaledX / 15.36}%`;
    el.style.top = `${scaledY / 6.91}%`;
    el.style.width = `${scaledW / 15.36}%`;
    el.style.height = `${scaledH / 6.91}%`;

    el.style.setProperty(
      "--pts",
      s.pts.map(p => `${p[0].toFixed(1)}% ${p[1].toFixed(1)}%`).join(", ")
    );

    const img = document.createElement("img");
    img.className = "img";
    img.src = s.src;
    img.alt = "";
    img.draggable = false;

    el.appendChild(img);
    stage.appendChild(el);
  });
