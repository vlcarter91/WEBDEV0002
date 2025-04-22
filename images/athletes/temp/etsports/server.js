// server.js

const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

// ✅ Serve static files from root and from /images directory
app.use(express.static(__dirname));
app.use("/images", express.static(path.join(__dirname, "images")));

// ✅ API: Return list of athlete image files
app.get("/api/athletes", (req, res) => {
  const dirPath = path.join(__dirname, "images/athletes");
  fs.readdir(dirPath, (err, files) => {
    if (err) {
      return res.status(500).json({ error: "Unable to read athletes folder" });
    }
    const imageFiles = files.filter(file => /\.(jpe?g|png|gif|webp)$/i.test(file));
    res.json(imageFiles);
  });
});

// ✅ API: Return list of rotating banner image files
app.get("/api/banners", (req, res) => {
  const bannerDir = path.join(__dirname, "images/banner");
  fs.readdir(bannerDir, (err, files) => {
    if (err) return res.status(500).json({ error: "Unable to read banner folder" });
    const banners = files.filter(file => /\.(jpe?g|png|gif|webp)$/i.test(file));
    res.json(banners);
  });
});

// ✅ Start the server
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
