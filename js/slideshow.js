// js/slideshow.js
// ✅ Rotates athlete images every 4 seconds from /images/athletes/

console.log("✅ slideshow.js loaded");

const slideshowElement = document.getElementById("slideshow");
const athleteFolder = "images/athletes/";
let athleteImages = [];
let currentAthleteIndex = 0;

function fetchAthleteImages(callback) {
  fetch("/api/athletes.json")
    .then((res) => {
      if (!res.ok) throw new Error(`Fetch error: ${res.status}`);
      return res.json();
    })
    .then((athletes) => {
      athleteImages = athletes.map(a => a.filename);
      console.log(`✅ Loaded ${athleteImages.length} athlete images.`);
      callback();
    })
    .catch((err) => {
      console.error("❌ Failed to fetch athlete images:", err);
    });
}

function startSlideshow() {
  if (!slideshowElement || athleteImages.length === 0) {
    console.error("❌ Slideshow element not found or athleteImages is empty.");
    return;
  }

  // Set initial image
  slideshowElement.src = athleteFolder + athleteImages[currentAthleteIndex];
  slideshowElement.classList.add("fade-in");

  setInterval(() => {
    slideshowElement.classList.remove("fade-in");

    setTimeout(() => {
      currentAthleteIndex = (currentAthleteIndex + 1) % athleteImages.length;
      slideshowElement.src = athleteFolder + athleteImages[currentAthleteIndex];
      slideshowElement.classList.add("fade-in");
    }, 300);
  }, 4000); // Change image every 4 seconds
}

document.addEventListener("DOMContentLoaded", () => {
  fetchAthleteImages(startSlideshow);
});
