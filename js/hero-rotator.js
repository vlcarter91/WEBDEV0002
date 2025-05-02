// js/hero-rotator.js
// ✅ Rotates static design banner images every 6 seconds

console.log("✅ hero-rotator.js loaded");

const bannerElement = document.getElementById("hero-banner");
const bannerFolder = "images/banner/"; // Folder where hero banners are stored
let bannerIndex = 0;

function rotateBanner() {
  if (bannerImages.length <= 1) return; // Only rotate if there's more than one image

  bannerIndex = (bannerIndex + 1) % bannerImages.length;
  bannerElement.classList.remove("fade-in");

  setTimeout(() => {
    bannerElement.src = bannerFolder + bannerImages[bannerIndex];
    bannerElement.classList.add("fade-in");
  }, 300);
}

document.addEventListener("DOMContentLoaded", () => {
  if (!bannerElement) {
    console.error("❌ Banner element not found.");
    return;
  }

  if (typeof bannerImages === "undefined" || bannerImages.length === 0) {
    console.error("❌ bannerImages not loaded or empty.");
    return;
  }

  // Initialize hero banner with the first image
  bannerElement.src = bannerFolder + bannerImages[0];
  bannerElement.classList.add("fade-in");

  // Start rotating banners every 6 seconds
  if (bannerImages.length > 1) {
    setInterval(rotateBanner, 6000);
  }
});
