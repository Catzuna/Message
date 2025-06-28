const music = document.getElementById("bg-music");
music.loop = false; // We'll control loop manually
music.volume = 0;

const skipToStart = 219; // 3:39 in seconds
let hasSkipped = false;

// Smooth fade-in for music volume
function fadeInMusic() {
  let vol = 0;
  const fade = setInterval(() => {
    if (vol < 0.5) {
      vol += 0.05;
      music.volume = vol;
    } else {
      clearInterval(fade);
    }
  }, 150);
}

// After music ends, loop normally from 0
music.addEventListener("ended", () => {
  music.currentTime = 0;
  music.play();
});

// Main onload logic
window.onload = () => {
  setTimeout(() => {
    document.body.classList.remove("not-loaded");
  }, 1000);

  // Attempt auto-play
  music.play().then(() => {
    // Skip only on first play
    if (!hasSkipped) {
      music.currentTime = skipToStart;
      hasSkipped = true;
    }
    fadeInMusic();
  }).catch(() => {
    // Show tap-to-play if autoplay blocked
    const tapNote = document.getElementById("tap-to-play");
    tapNote.style.display = "block";

    const startMusic = () => {
      music.play().then(() => {
        if (!hasSkipped) {
          music.currentTime = skipToStart;
          hasSkipped = true;
        }
        fadeInMusic();
        tapNote.remove();
      });
      document.removeEventListener("click", startMusic);
    };

    document.addEventListener("click", startMusic);
  });
};

// 🎉 Banner animation setup
const banner = document.getElementById("banner");
const bannerText = "Happy Birthday Lei!!";
banner.innerHTML = "";

bannerText.split("").forEach((char, i) => {
  const span = document.createElement("span");
  span.textContent = char === " " ? "\u00A0" : char;
  span.style.display = "inline-block";
  span.style.animation = `waveGlow 2.8s ease-in-out ${i * 0.12}s infinite`;
  span.style.textShadow = "0 0 3px #48ff92";
  banner.appendChild(span);
});
