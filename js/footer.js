console.log("✅ footer.js loaded");
// js/footer.js
fetch("footer.html")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.text();
  })
  .then((html) => {
    const container = document.getElementById("site-footer");
    if (container) {
      container.innerHTML = html;
    } else {
      console.warn("⚠️ Footer container not found on this page.");
    }
  })
  .catch((error) => {
    console.error("❌ Error loading footer:", error);
  });








