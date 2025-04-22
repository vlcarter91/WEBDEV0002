console.log("✅ footer.js loaded");
console.log("✅ Media Gallery Script Loaded");

// ============================================================================
// 📁 Configuration
// Folder where athlete images are stored, relative to site root
// ============================================================================
const imageFolder = "images/athletes/";
const gallery = document.getElementById("media-gallery");
const controlsContainer = document.createElement("div");
controlsContainer.className = "gallery-controls";

// ============================================================================
// 🧠 Filename Parsing Logic
// Supports two formats:
// 1. First_Last_Position_Year_Sport.jpg
// 2. First_Last_Position_Year.jpg (defaults to sport = "Hockey")
// The "label" for display includes only full name and birth year
// ============================================================================
function parseFilename(filename) {
  const namePart = filename.replace(/\.[^/.]+$/, ""); // Strip extension
  const parts = namePart.split("_");

  const [firstName = "", lastName = "", position = "", birthYear = "", sportRaw] = parts;
  const sport = sportRaw || "Hockey"; // default if missing

  return {
    filename,
    firstName,
    lastName,
    position,
    birthYear,
    sport,
    // 🎯 Display label = First Last (Year) — no position or sport
    label: `${firstName} ${lastName} (${birthYear})`
  };
}

// ============================================================================
// 🎨 Gallery Rendering
// Creates each image block with an <img> + player name label
// ============================================================================
function renderGallery(images) {
  gallery.innerHTML = ""; // Clear previous content

  images.forEach((data) => {
    const img = new Image();
    img.src = imageFolder + data.filename;
    img.loading = "lazy";
    img.alt = data.label;

    const wrapper = document.createElement("div");
    wrapper.className = "media-placeholder";

    const labelDiv = document.createElement("div");
    labelDiv.className = "media-label";
    labelDiv.textContent = data.label;

    const link = document.createElement("a");
    link.href = img.src;
    link.target = "_blank";
    link.appendChild(img);

    wrapper.appendChild(labelDiv);
    wrapper.appendChild(link);
    gallery.appendChild(wrapper);
  });
}

// ============================================================================
// 🎛️ UI: Create Filter & Sort Controls
// Creates dropdowns for sort, position, birth year, and sport
// ============================================================================
function createControls(parsedImages) {
  const positions = Array.from(new Set(parsedImages.map(i => i.position))).sort();
  const birthYears = Array.from(new Set(parsedImages.map(i => i.birthYear))).sort();
  const sports = Array.from(new Set(parsedImages.map(i => i.sport || "Hockey"))).sort();

  controlsContainer.innerHTML = `
    <div class="control-group">
      <label for="sort-selector">Sort by:</label>
      <select id="sort-selector">
        <option value="lastName">Last Name</option>
        <option value="firstName">First Name</option>
      </select>
    </div>

    <div class="control-group">
      <label for="filter-position">Position:</label>
      <select id="filter-position">
        <option value="all">All</option>
        ${positions.map(p => `<option value="${p}">${p}</option>`).join('')}
      </select>
    </div>

    <div class="control-group">
      <label for="filter-year">Birth Year:</label>
      <select id="filter-year">
        <option value="all">All</option>
        ${birthYears.map(y => `<option value="${y}">${y}</option>`).join('')}
      </select>
    </div>

    <div class="control-group">
      <label for="filter-sport">Sport:</label>
      <select id="filter-sport">
        <option value="all">All</option>
        ${sports.map(s => `<option value="${s}">${s}</option>`).join('')}
      </select>
    </div>
  `;

  gallery.parentNode.insertBefore(controlsContainer, gallery);

  // ==========================================================================
  // 🔍 Filtering Logic — Filters by all criteria from dropdowns
  // ==========================================================================
  function applyFilters(images) {
    const selectedSport = document.getElementById("filter-sport").value;
    const selectedPosition = document.getElementById("filter-position").value;
    const selectedYear = document.getElementById("filter-year").value;

    return images.filter(i =>
      (selectedSport === "all" || i.sport === selectedSport) &&
      (selectedPosition === "all" || i.position === selectedPosition) &&
      (selectedYear === "all" || i.birthYear === selectedYear)
    );
  }

  // ==========================================================================
  // 🔠 Sort + Render
  // Sorts the filtered list and redraws the gallery
  // ==========================================================================
  function sortAndRender(images) {
    const key = document.getElementById("sort-selector").value;
    const filtered = applyFilters(images);
    const sorted = [...filtered].sort((a, b) => a[key].localeCompare(b[key]));
    renderGallery(sorted);
  }

  // Attach event listeners to all controls
  document.getElementById("sort-selector").addEventListener("change", () => sortAndRender(parsedImages));
  document.getElementById("filter-position").addEventListener("change", () => sortAndRender(parsedImages));
  document.getElementById("filter-year").addEventListener("change", () => sortAndRender(parsedImages));
  document.getElementById("filter-sport").addEventListener("change", () => sortAndRender(parsedImages));

  // 🚀 Initial draw
  sortAndRender(parsedImages);
}

// ============================================================================
// 🔗 Load Filenames from Server API
// Parses list of files from /api/athletes and initiates the controls/render
// ============================================================================
function loadGalleryImages(filenames) {
  if (!Array.isArray(filenames) || filenames.length === 0) {
    console.warn("⚠️ No athlete images found.");
    return;
  }

  const parsedImages = filenames.map(parseFilename);
  createControls(parsedImages);
  console.log(`✅ Loaded ${filenames.length} athlete images.`);
}

// ============================================================================
// 🚀 Startup – On DOM Ready
// ============================================================================
document.addEventListener("DOMContentLoaded", () => {
  if (!gallery) {
    console.error("❌ #media-gallery container not found.");
    return;
  }

  fetch("/api/athletes")
    .then((res) => {
      if (!res.ok) throw new Error("Network response was not ok");
      return res.json();
    })
    .then(loadGalleryImages)
    .catch((err) => {
      console.error("❌ Failed to load athlete images:", err);
    });
});
