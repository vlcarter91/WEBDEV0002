
==============================
 Emergent Sports Site Setup
==============================

📌 WHAT THIS WEBSITE DOES
--------------------------
This is a dynamic athlete showcase and analytics web platform, ideal for sports organizations, scouts, and fans.
Features include:
- Rotating hero banners to highlight branding or campaigns.
- Slideshow of featured athlete images.
- Dynamic athlete gallery with filtering (by position, year, sport).
- Shared footer loaded dynamically across all pages.
- Responsive, mobile-friendly CSS design.
- Node.js server APIs to serve banners and athlete image data.

📁 DIRECTORY STRUCTURE
-----------------------
/
├── index.html
├── athletes.html
├── server.js
├── footer.html
├── css/
│   └── styles.css
├── js/
│   ├── footer.js
│   ├── hero-rotator.js
│   ├── media-gallery.js
│   └── slideshow.js
├── images/
│   ├── banner/
│   │   └── demo_banner_1.jpg ... demo_banner_5.jpg
│   └── athletes/
│       └── First_Last_Position_2008_Hockey1.jpg ... Hockey5.jpg

==========================================
✅ FUNCTIONALITY CROSS-CHECK
==========================================
✔ Hero banner rotates dynamically via /api/banners
✔ Footer is injected from footer.html via JS
✔ Athlete images are loaded dynamically and filtered via /api/athletes
✔ Slideshow highlights athletes on homepage
✔ Mobile responsiveness and grid layout via styles.css

==========================================
🚀 INSTRUCTIONS FOR LOCALHOST SETUP (Node)
==========================================

1. Install Node.js: https://nodejs.org
2. Open terminal:
   cd path/to/extracted/folder
3. Run the server:
   node server.js
4. Open browser:
   http://localhost:3000

Test that:
- Banner rotates
- Slideshow rotates
- Athlete gallery loads and filters
- Footer loads dynamically

==========================================
🔁 INSTRUCTIONS FOR GIT-BASED CUSTOMIZATION
==========================================

1. git init
2. git add .
3. git commit -m "Initial commit"
4. Create a GitHub repo and push:
   git remote add origin https://github.com/yourname/emtechsports.git
   git push -u origin main

To update:
   git add .
   git commit -m "Updated"
   git push

==========================
💡 TROUBLESHOOTING NOTES
==========================
- Must use a local server (Node, Python, etc.) — JS won’t fetch local files from file:// path
- Ensure images exist in proper folders
- Server must be restarted after changes to server.js

