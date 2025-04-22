console.log("✅ footer.js loaded");
console.log("✅ Updated Slideshow JS loaded");

const imageFolder = "images/athletes/";
let athleteImages = [];
let currentIndex = 0;

function fetchAthleteImages(callback) {
  fetch("/api/athletes")
    .then((res) => {
      if (!res.ok) throw new Error("Network response was not ok");
      return res.json();
    })
    .then((filenames) => {
      athleteImages = filenames;
      console.log(`✅ Loaded ${athleteImages.length} athlete images`);
      callback();
    })
    .catch((err) => {
      console.error("❌ Failed to fetch athlete images:", err);
    });
}

function startSlideshow() {
  const imgElement = document.getElementById("slideshow");
  if (!imgElement || athleteImages.length === 0) {
    console.error("❌ No slideshow element or no images available.");
    return;
  }

  imgElement.src = imageFolder + athleteImages[currentIndex];
  imgElement.classList.add("fade-in");

  setInterval(() => {
    imgElement.classList.remove("fade-in");

    setTimeout(() => {
      currentIndex = (currentIndex + 1) % athleteImages.length;
      imgElement.src = imageFolder + athleteImages[currentIndex];
      imgElement.classList.add("fade-in");
    }, 200);
  }, 4000);
}

document.addEventListener("DOMContentLoaded", () => {
  fetchAthleteImages(startSlideshow);
});
