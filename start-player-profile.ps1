# start-player-profile.ps1

Write-Host "🔄 Generating Player Profile Pages..." -ForegroundColor Cyan

# Set the working directory to the project root (optional)
# Replace with your actual path if needed
cd "$PSScriptRoot"

# Run the Node.js script
node js/profile-generator.js

Write-Host "✅ Player profile pages generated successfully!" -ForegroundColor Green
Pause
