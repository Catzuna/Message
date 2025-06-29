// === DOM REFERENCES ===
const giftWrap = document.getElementById("gift-wrap");
const overlay = document.getElementById("gift-overlay");
const content = document.getElementById("lei-content");
const music = document.getElementById("bg-music");
const newMusic = document.getElementById("naiilang-audio");
const videoMusic = document.getElementById("video-audio");
const letterContainer = document.getElementById("letter-container");
const letterTextBox = document.getElementById("letter-text");
const videoContainer = document.getElementById("video-container");
const videoElement = document.getElementById("birthday-video");

// === INITIAL SETUP ===
music.loop = true;
music.volume = 0;
videoElement.loop = true;

window.onload = () => {
  const fade = document.getElementById("light-fade");
  fade.classList.add("fade-out");
  setTimeout(() => fade.remove(), 1600);
};

// === MUSIC FUNCTIONS ===
function fadeInMusic() {
  music.play().catch(() => {});
  let vol = 0;
  const id = setInterval(() => {
    if (vol < 0.5) {
      vol += 0.05;
      music.volume = vol;
    } else {
      clearInterval(id);
    }
  }, 150);
}
function fadeOutMusic(callback) {
  let vol = music.volume;
  const id = setInterval(() => {
    if (vol > 0) {
      vol -= 0.05;
      music.volume = Math.max(vol, 0);
    } else {
      clearInterval(id);
      music.pause();
      callback();
    }
  }, 100);
}
function fadeInAudio(audio) {
  audio.volume = 0;
  audio.play().catch(() => {});
  let vol = 0;
  const id = setInterval(() => {
    if (vol < 0.5) {
      vol += 0.05;
      audio.volume = vol;
    } else {
      clearInterval(id);
    }
  }, 150);
}
function fadeOutAudio(audio, callback) {
  let vol = audio.volume;
  const id = setInterval(() => {
    if (vol > 0) {
      vol -= 0.05;
      audio.volume = Math.max(vol, 0);
    } else {
      clearInterval(id);
      audio.pause();
      callback();
    }
  }, 100);
}

// === GIFT OPEN ===
giftWrap.addEventListener("click", () => {
  fadeInMusic();
  overlay.classList.add("fade-out");
  setTimeout(() => {
    overlay.style.display = "none";
    content.style.display = "block";
    content.classList.add("fade-in");
    startAllSlideshows();
    renderBanner();
    renderSubtitle();
  }, 1000);
});

// === LETTER OPEN/CLOSE ===
document.getElementById("btn-message").addEventListener("click", () => {
  content.style.display = "none";
  letterContainer.style.display = "flex";

  fadeOutMusic(() => {
    newMusic.loop = true;
    newMusic.currentTime = 0;

    // ✅ Guarantee user action before autoplay
    setTimeout(() => fadeInAudio(newMusic), 500);
  });

  renderLetter();
});

document.getElementById("close-letter").addEventListener("click", () => {
  letterContainer.style.display = "none";
  content.style.display = "block";

  fadeOutAudio(newMusic, () => fadeInMusic());
});

// === LETTER RENDER ===
function renderLetter() {
  const msg = `Happy Birthday, Lei! ✨💜,


I hope today makes you feel as special as you really are—not just because it’s your birthday🎉, but because you deserve to be celebrated every day🎉🥳.



You’ve come so far, and I hope you’re proud of yourself💜. I know I am.
Every little thing you do, your strength, your gentleness, your effort—it never goes unnoticed.



I still remember the little routine we had—
how I’d always wait for you at 7-Eleven, just so we could go together.

Simple lang ‘yon, pero ang saya ko na HAHA
And those moments when I cooked for you…


the way you'd light up, even just a little, made everything feel worth it.





Minsan nga, napapaisip ako—
maybe all those small efforts I made to be near you,
were really just quiet ways of saying I wanted to be part of your day.



	




I just want to be honest—I like you.







Not in a big dramatic way, just real. I enjoy being around you. I think about you more than I admit. And I care, more than you probably know.




I want you.




Not just in the moment, not just in passing—
but in a way where I genuinely want to pursue you,
to get to know you even deeper,
and to show you how serious I am about this.

That’s all. No pressure kksksk. 






Wherever life takes us, I’ll always be grateful that I met you.
And if ever you need someone who’ll stay—quietly, genuinely, and always on your side—nandito lang ako.

Happy birthday again, Lei😺.
With all the care in the world,

Josu`;

  letterTextBox.innerHTML = "";
  const paragraphs = msg.split("\n\n");

  paragraphs.forEach((para, pIndex) => {
    const p = document.createElement("p");
    para.split(" ").forEach((word, wIndex) => {
      const span = document.createElement("span");
      span.classList.add("glow-word");
      span.textContent = word + " ";
      span.style.animationDelay = `${(pIndex * 10 + wIndex) * 0.03}s`;
      p.appendChild(span);
    });
    letterTextBox.appendChild(p);
  });
}

// === VIDEO OPEN/CLOSE ===
document.getElementById("btn-game").addEventListener("click", () => {
  content.style.display = "none";
  videoContainer.style.display = "flex";

  fadeOutMusic(() => {
    videoMusic.loop = true;
    videoMusic.currentTime = 0;
    fadeInAudio(videoMusic);

    videoElement.loop = true; // ensure loop
    videoElement.currentTime = 0;
    videoElement.play().catch(() => {});
  });
});
document.getElementById("close-video").addEventListener("click", () => {
  videoElement.pause();
  videoContainer.style.display = "none";
  content.style.display = "block";

  fadeOutAudio(videoMusic, () => fadeInMusic());
});

// === SLIDESHOW ===
function setupSlideshow(wrapperId, delay = 3000) {
  const wrapper = document.getElementById(wrapperId);
  const slides = wrapper.querySelectorAll(".photo-slide");
  let index = 0;

  slides.forEach((s, i) => {
    s.style.position = "absolute";
    s.style.top = 0;
    s.style.left = 0;
    s.style.width = "100%";
    s.style.height = "100%";
    s.style.opacity = i === 0 ? "1" : "0";
    s.style.transition = "opacity 0.6s ease-in-out";
    s.style.zIndex = i === 0 ? 1 : 0;
  });

  if (!wrapper.querySelector(".white-flash")) {
    const flash = document.createElement("div");
    flash.classList.add("white-flash");
    wrapper.appendChild(flash);
  }
  const flash = wrapper.querySelector(".white-flash");

  setInterval(() => {
    const current = slides[index];
    index = (index + 1) % slides.length;
    const next = slides[index];

    if (index === 0) {
      flash.style.opacity = "1";
      setTimeout(() => (flash.style.opacity = "0"), 200);
    }

    current.style.zIndex = 0;
    next.style.zIndex = 1;
    current.style.opacity = "0";
    next.style.opacity = "1";
  }, delay);
}
function startAllSlideshows() {
  setupSlideshow("slideshowA", 2500);
  setupSlideshow("slideshowB", 3000);
  setupSlideshow("slideshowC", 3500);
}

// === FLOATING EMOJIS ===
const emojiSet = ["🎉", "🎂", "🎈", "🎁", "🥳", "🍰", "🎊", "🎀", "💖", "🧁"];
function createFloatingEmoji() {
  const e = document.createElement("div");
  e.textContent = emojiSet[Math.floor(Math.random() * emojiSet.length)];
  e.style.position = "fixed";
  e.style.fontSize = `${12 + Math.random() * 24}px`;
  e.style.opacity = "0";
  e.style.left = `${Math.random() * 100}vw`;
  e.style.top = `${Math.random() * 100}vh`;
  e.style.pointerEvents = "none";
  e.style.userSelect = "none";
  e.style.zIndex = "5";
  e.style.transition = "transform 10s ease-out, opacity 2s ease-in-out";
  e.style.filter = "drop-shadow(0 0 8px #fff)";
  document.body.appendChild(e);
  setTimeout(() => {
    e.style.opacity = "1";
    e.style.transform = `translateY(-100vh) translateX(${(Math.random() - 0.5) * 50}vw)`;
  }, 50);
  setTimeout(() => e.remove(), 10500);
}
setInterval(createFloatingEmoji, 1000);

// === TAP EFFECT ===
document.addEventListener("touchstart", (ev) => {
  const e = document.createElement("div");
  e.textContent = emojiSet[Math.floor(Math.random() * emojiSet.length)];
  e.style.position = "absolute";
  e.style.left = `${ev.touches[0].clientX}px`;
  e.style.top = `${ev.touches[0].clientY}px`;
  e.style.fontSize = `${20 + Math.random() * 10}px`;
  e.style.opacity = "1";
  e.style.transition = "transform 1s ease-out, opacity 1s ease-out";
  e.style.transform = "translateY(0)";
  e.style.pointerEvents = "none";
  e.style.userSelect = "none";
  e.style.zIndex = "10000";
  e.style.filter = "drop-shadow(0 0 5px #fff)";
  document.body.appendChild(e);
  requestAnimationFrame(() => {
    e.style.transform = "translateY(-60px)";
    e.style.opacity = "0";
  });
  setTimeout(() => e.remove(), 1000);
});

// === BANNER & SUBTITLE ===
function renderBanner() {
  const banner = document.getElementById("banner");
  const txt = "Happy Birthday, Lei! <3";
  banner.innerHTML = "";
  [...txt].forEach((ch, i) => {
    const span = document.createElement("span");
    span.textContent = ch === " " ? "\u00A0" : ch;
    span.style.display = "inline-block";
    span.style.animation = `glowWave 2.5s ease-in-out ${i * 0.08}s infinite`;
    span.style.textShadow = "0 0 3px #fff, 0 0 6px #ffaaff";
    banner.appendChild(span);
  });
}
function renderSubtitle() {
  const sub = document.getElementById("subtitle");
  const txt = "Wishing you joy, laughter, and endless blessings today and always! <3";
  sub.innerHTML = "";
  txt.split(" ").forEach((word, i) => {
    const span = document.createElement("span");
    span.textContent = word + " ";
    span.style.display = "inline-block";
    span.style.animation = `glowWave 4s ease-in-out ${i * 0.2}s infinite`;
    span.style.padding = "0 2px";
    span.style.textShadow = "0 0 3px #fff, 0 0 6px #ffa9dd, 0 0 10px #ffc8f7";
    sub.appendChild(span);
  });
}

// === REDIRECT FOR 🥀 BUTTON ===
document.getElementById("btn-box").addEventListener("click", () => {
  window.location.href = "flower.html";
});




/* === TIME‑SINCE COUNTER (starts 28 Dec 2024) === */
const counterBox = document.getElementById("time-counter");
const startDate  = new Date("2024-12-28T00:00:00");

function updateTimeCounter(){
  const now=new Date();
  let diff=now-startDate;

  const sec = Math.floor(diff/1000)%60;
  const min = Math.floor(diff/60000)%60;
  const hr  = Math.floor(diff/3.6e6)%24;

  // crude month/year/day roll‑over
  let years = now.getFullYear()-startDate.getFullYear();
  let months= now.getMonth() - startDate.getMonth();
  let days  = now.getDate()  - startDate.getDate();
  if(days<0){months--;days+=new Date(now.getFullYear(),now.getMonth(),0).getDate();}
  if(months<0){years--;months+=12;}

  const parts=[years,months,days,hr,min,sec];

  counterBox.innerHTML="";
  parts.forEach((num,i)=>{
    const span=document.createElement("span");
    span.className="glow-word";
    span.textContent=num.toString().padStart(2,"0");
    span.style.animationDelay=`${i*0.25}s`;     // wave offset
    span.style.animationDuration=`${4-i*0.25}s`; // later numbers flash quicker
    counterBox.appendChild(span);
  });
}

updateTimeCounter();
setInterval(updateTimeCounter,1000);
