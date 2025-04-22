// ============================================================================
// 📁 Configuration
// Folder where athlete images are stored, relative to site root
// ============================================================================
const imageFolder = "images/athletes/";

// ============================================================================
// 🎯 Utility Function
// Capitalize the first letter of a string
// ============================================================================
function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

// ============================================================================
// 🚀 Initialize Gallery
// ============================================================================
document.addEventListener("DOMContentLoaded", () => {
  const gallery = document.getElementById("media-gallery");
  const controlsContainer = document.getElementById("filter-controls");

  fetch("/api/athletes")
    .then((response) => response.json())
    .then((imageList) => {
      const parsedImages = imageList.map((filename) => {
        const parts = filename.replace(/\.[^/.]+$/, "").split("_");
        return {
          filename,
          first: capitalizeFirstLetter(parts[0]),
          last: capitalizeFirstLetter(parts[1]),
          position: capitalizeFirstLetter(parts[2]),
          birthYear: parts[3],
          sport: "Hockey",
          label: capitalizeFirstLetter(parts[0]) + " " + capitalizeFirstLetter(parts[1]),
        };
      });

      createControls(parsedImages);
    })
    .catch((error) => {
      console.error("❌ Failed to load athlete images:", error);
    });

  // ============================================================================
  // 🛠️ Create Controls (Filters + Sort + Search)
  // ============================================================================
  function createControls(parsedImages) {
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

    // 🎛️ Event Listeners for Dropdowns
    document.getElementById("sort-name").addEventListener("change", () => {
      sortAndRender(parsedImages);
    });
    document.getElementById("sort-position").addEventListener("change", () => {
      sortAndRender(parsedImages);
    });
    document.getElementById("sort-birthYear").addEventListener("change", () => {
      sortAndRender(parsedImages);
    });
    document.getElementById("filter-sport").addEventListener("change", () => {
      sortAndRender(parsedImages);
    });

    // 🔍 Search Listener
    document.getElementById("playerSearch").addEventListener("input", function (event) {
      const query = event.target.value.trim().toLowerCase();
      const allItems = document.querySelectorAll(".media-placeholder");

      allItems.forEach(item => {
        const label = item.querySelector(".media-label").textContent.toLowerCase();
        const matches = label.includes(query);
        item.style.display = matches ? "" : "none";
      });
    });

    // 🚀 Initial draw
    sortAndRender(parsedImages);
  }

  // ============================================================================
  // 📊 Filter + Sort + Render
  // ============================================================================
  function sortAndRender(images) {
    const position = document.getElementById("sort-position").value;
    const birthYear = document.getElementById("sort-birthYear").value;
    const sport = document.getElementById("filter-sport").value;
    const sortBy = document.getElementById("sort-name").value;

    const filtered = images.filter((img) => {
      return (
        (position === "all" || img.position === position) &&
        (birthYear === "all" || img.birthYear === birthYear) &&
        (sport === "all" || img.sport === sport)
      );
    });

    // 🔠 Sort by selected field: "first" or "last"
    filtered.sort((a, b) => a[sortBy].localeCompare(b[sortBy]));

    renderGallery(filtered);
  }

  // ============================================================================
  // 🖼️ Render Gallery
  // ============================================================================
  function renderGallery(dataSet) {
    gallery.innerHTML = "";

    dataSet.forEach((data) => {
      let img = new Image();
      img.src = imageFolder + data.filename;
      img.alt = data.label;

      img.decode().then(() => {
        const wrapper = document.createElement("div");
        wrapper.className = "media-placeholder";

        const labelDiv = document.createElement("div");
        labelDiv.className = "media-label";
        labelDiv.textContent = data.label;

        const link = document.createElement("a");
        const profileName = data.filename.replace(/\.[^/.]+$/, ".html");
        link.href = "images/athletes/profiles/" + profileName;
        link.target = "_blank";
        link.appendChild(img);

        wrapper.appendChild(labelDiv);
        wrapper.appendChild(link);
        gallery.appendChild(wrapper);
      }).catch((err) => {
        console.error(`❌ Failed to decode image ${data.filename}:`, err);
      });
    });
  }
});
