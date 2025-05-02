// js/media-gallery.js
// ✅ Final version — dynamically builds gallery from /api/athletes.json

console.log("✅ media-gallery.js loaded (final version)");

const galleryElement = document.getElementById("media-gallery");
const controlsContainer = document.getElementById("filter-controls");

let athleteData = [];
let currentSport = "Hockey"; // Default sport filter

function fetchAthleteData() {
  fetch("/api/athletes.json")
    .then((res) => {
      if (!res.ok) throw new Error(`Fetch error: ${res.status}`);
      return res.json();
    })
    .then((athletes) => {
      athleteData = athletes;
      console.log(`✅ Loaded ${athleteData.length} athletes.`);
      createControls(athleteData);
    })
    .catch((err) => {
      console.error("❌ Failed to fetch athlete data:", err);
    });
}

function createControls(data) {
  controlsContainer.innerHTML = `
    <div class="gallery-controls">

      <div class="control-group">
        <label for="sort-name">Sort by:</label>
        <select id="sort-name">
          <option value="last">Last Name</option>
          <option value="first">First Name</option>
        </select>
      </div>

      <div class="control-group">
        <label for="sort-position">Position</label>
        <select id="sort-position">
          <option value="all">All</option>
          <option value="Forward">Forward</option>
          <option value="Defense">Defense</option>
          <option value="Goalie">Goalie</option>
        </select>
      </div>

      <div class="control-group">
        <label for="sort-birthYear">Birth Year</label>
        <select id="sort-birthYear">
          <option value="all">All</option>
          <option value="2007">2007</option>
          <option value="2008">2008</option>
          <option value="2009">2009</option>
        </select>
      </div>

      <div class="control-group">
        <label for="filter-sport">Sport</label>
        <select id="filter-sport">
          <option value="all">All</option>
          <option value="Hockey">Hockey</option>
        </select>
      </div>

      <div class="control-group">
        <label for="playerSearch">Search</label>
        <input type="text" id="playerSearch" placeholder="First Last" />
      </div>

    </div>
  `;

  document.getElementById("sort-name").addEventListener("change", () => sortAndRender(data));
  document.getElementById("sort-position").addEventListener("change", () => sortAndRender(data));
  document.getElementById("sort-birthYear").addEventListener("change", () => sortAndRender(data));
  document.getElementById("filter-sport").addEventListener("change", () => sortAndRender(data));

  document.getElementById("playerSearch").addEventListener("input", function (event) {
    const query = event.target.value.trim().toLowerCase();
    const allItems = document.querySelectorAll(".media-placeholder");

    allItems.forEach(item => {
      const label = item.querySelector(".media-label").textContent.toLowerCase();
      const matches = label.includes(query);
      item.style.display = matches ? "" : "none";
    });
  });

  sortAndRender(data);
}

function sortAndRender(data) {
  const position = document.getElementById("sort-position").value;
  const birthYear = document.getElementById("sort-birthYear").value;
  const sport = document.getElementById("filter-sport").value;
  const sortBy = document.getElementById("sort-name").value;

  const filtered = data.filter((a) => {
    return (
      (position === "all" || a.position === position) &&
      (birthYear === "all" || a.birthYear === birthYear) &&
      (sport === "all" || a.sport === sport)
    );
  });

  filtered.sort((a, b) => a[sortBy].localeCompare(b[sortBy]));

  renderGallery(filtered);
}

function renderGallery(dataSet) {
  galleryElement.innerHTML = "";

  dataSet.forEach((athlete) => {
    const wrapper = document.createElement("div");
    wrapper.className = "media-placeholder";

    const labelDiv = document.createElement("div");
    labelDiv.className = "media-label";
    labelDiv.textContent = `${athlete.first} ${athlete.last}`;

    const img = new Image();
    img.src = "images/athletes/" + athlete.filename;
    img.alt = `${athlete.first} ${athlete.last}`;
    img.className = "gallery-image";

    const link = document.createElement("a");
    const profileName = athlete.filename.replace(/\.[^/.]+$/, ".html");
    link.href = "images/athletes/profiles/" + profileName;
    link.target = "_blank";
    link.appendChild(img);

    wrapper.appendChild(labelDiv);
    wrapper.appendChild(link);
    galleryElement.appendChild(wrapper);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  fetchAthleteData();
});
