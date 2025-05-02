// server.js - Local Development Server
// ✅ Cleaned up version for testing the site locally

const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

const fs = require("fs");
const multer = require("multer");

// Multer storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "data/registration");
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const safeName = `${req.body.firstName}_${req.body.lastName}_${req.body.position}_${req.body.birthYear}_${req.body.sports || 'Sport'}`.replace(/\s+/g, "");
    cb(null, `${safeName}_Headshot${ext}`);
  }
});

const upload = multer({ storage: storage });
app.use(express.urlencoded({ extended: true }));
app.use(express.json());



// Serve static files (HTML, CSS, JS, Images)
app.use(express.static(path.join(__dirname)));

// Local API for player stats JSON (optional for profile pages)
app.use("/api/player_stats", express.static(path.join(__dirname, "api/player_stats")));

// Root route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.post("/register", upload.single("profileFile"), (req, res) => {
  const data = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    position: req.body.position,
    birthYear: req.body.birthYear,
    sports: req.body.sports,
    email: req.body.email,
    parent1Name: req.body.parent1Name,
    parent1Email: req.body.parent1Email,
    parent2Name: req.body.parent2Name,
    parent2Email: req.body.parent2Email,
    uploadedHeadshot: req.file ? req.file.filename : null
  };

  const fileName = `data/registration/${req.body.firstName}_${req.body.lastName}_${req.body.position}_${req.body.birthYear}_${req.body.sports}_Registration.json`.replace(/\s+/g, "");

  fs.writeFile(fileName, JSON.stringify(data, null, 2), (err) => {
    if (err) {
      console.error("❌ Failed to save registration:", err);
      return res.status(500).send("Registration failed.");
    }
    res.send("<h2>✅ Registration Successful!</h2><p><a href='/player-registration.html'>Register Another</a></p>");
  });
});



// Fallback for any 404s (optional)
app.use((req, res) => {
  res.status(404).send("404: Page Not Found");
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Local server running at http://localhost:${PORT}`);
});
