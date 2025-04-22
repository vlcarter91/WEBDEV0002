// js/profile-generator.js

const fs = require("fs");
const path = require("path");

const ATHLETES_DIR = path.join(__dirname, "../images/athletes");
const PROFILES_DIR = path.join(ATHLETES_DIR, "profiles");

if (!fs.existsSync(PROFILES_DIR)) {
  fs.mkdirSync(PROFILES_DIR);
}

const template = (data) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${data.first} ${data.last} - Player Profile</title>
  <link rel="stylesheet" href="../../../css/styles.css" />
  <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@600&family=Roboto:wght@400&display=swap" rel="stylesheet" />
</head>
<body>

  <header>
    <nav aria-label="Main navigation">
      <ul>
        <li> | <a href="../../../index.html" class="active">Overview</a> | </li>
        <li><a href="../../../athletes.html">Our Athletes</a> | </li>
        <li><a href="../../../services.html">Our Services</a> | </li>
        <li><a href="../../../about.html">About Us</a> | </li>
      </ul>
    </nav>
  </header>

  <div class="profile-layout">
    <div class="left-stack">
      <div class="container01">
        <img src="../${data.filename}" alt="${data.first} ${data.last}" />
      </div>
      <div class="container02">Position: ${data.position}</div>
      <div class="container03">Birth Year: ${data.birth_year}</div>
    </div>

    <div class="container04">${data.first} ${data.last}</div>

    <div class="container05">
      <!-- Main content placeholder -->
      Profile content goes here.
    </div>
  </div>

  <div id="site-footer">
        <footer>
	     <div class="footer-title">
           <p>&copy; 2003 Emergent Technologies Media Solutions Inc.</p> 
	     </div>
	     <div class="footer-subtext">
		   <p>All rights reserved.</p>
	     </div>
  </div>
</body>
</html>`;



const files = fs.readdirSync(ATHLETES_DIR).filter(file =>
  /\.(jpg|jpeg|png|webp|gif)$/i.test(file)
);

files.forEach(file => {
  const parts = path.basename(file, path.extname(file)).split("_");
  if (parts.length < 4) return;

  const [first, last, position, birth_year, sport = "Hockey"] = parts;
  const html = template({ first, last, position, birth_year, sport, filename: file });

  const htmlFilename = path.join(PROFILES_DIR, `${path.basename(file, path.extname(file))}.html`);
  fs.writeFileSync(htmlFilename, html, "utf8");
  console.log(`✅ Created profile: ${htmlFilename}`);
});
