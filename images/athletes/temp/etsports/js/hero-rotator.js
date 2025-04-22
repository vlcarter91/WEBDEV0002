console.log("✅ footer.js loaded");
const bannerElement = document.getElementById("hero-banner");
const bannerFolder = "images/banner/";
let bannerImages = [];
let bannerIndex = 0;

function rotateBanner() {
  if (bannerImages.length <= 1) return;

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

  // Always show the default image
  bannerElement.classList.add("fade-in");

  // Fetch the list of banners from the server
  fetch("/api/banners")
    .then((res) => res.json())
    .then((data) => {
      if (!Array.isArray(data) || data.length === 0) {
        console.warn("⚠️ No banners found.");
        return;
      }

      bannerImages = data;

      // Rotate every 6 seconds
      if (bannerImages.length > 1) {
        setInterval(rotateBanner, 6000);
      }
    })
    .catch((err) => console.error("❌ Failed to load banners:", err));
});
