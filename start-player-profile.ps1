# start-player-profile.ps1
# ✅ Correct full working version

Write-Host "Starting full site build..."

# Step 1: Run Node.js profile generator
Write-Host "Running profile-generator.js (generating profile pages)..."
node js/profile-generator.js

# Pause briefly
Start-Sleep -Seconds 2

# Correct directories — RELATIVE to where script runs
$athletesDir = ".\images\athletes"
$bannerDir = ".\images\banner"
$outputAthleteImagesFile = ".\js\athlete-images.js"
$outputAthleteDataFile = ".\api\athletes.json"
$outputBannerImagesFile = ".\js\banner-images.js"

# Step 2: Scan athlete images
Write-Host "Scanning athletes directory for images..."
if (-Not (Test-Path $athletesDir)) {
    Write-Host "ERROR: Directory not found: $athletesDir" -ForegroundColor Red
    exit
}

$athleteImages = Get-ChildItem -Path $athletesDir -Recurse -File | Where-Object {
    $_.Extension -match "(\.jpg|\.jpeg|\.png|\.gif|\.webp)$"
} | Select-Object -ExpandProperty Name

if ($athleteImages.Count -eq 0) {
    Write-Host "ERROR: No athlete images found in $athletesDir!" -ForegroundColor Red
    exit
}

Write-Host "Found $($athleteImages.Count) athlete image(s)."

# Step 3: Build athlete-images.js
Write-Host "Creating athlete-images.js..."
$athleteImagesContent = "const athleteImages = [" + "`n"
foreach ($image in $athleteImages) {
    $athleteImagesContent += "  `"$image`"," + "`n"
}
$athleteImagesContent += "];"
$athleteImagesContent | Set-Content -Path $outputAthleteImagesFile -Encoding UTF8
Write-Host "athlete-images.js created successfully."

# Step 4: Build athletes.json
Write-Host "Creating athletes.json..."
$athleteData = @()

foreach ($filename in $athleteImages) {
    $parts = $filename -replace "\.[^\.]+$", "" -split "_"
    if ($parts.Length -ge 4) {
        $athleteData += @{
            "filename" = $filename
            "first" = $parts[0]
            "last" = $parts[1]
            "position" = $parts[2]
            "birthYear" = $parts[3]
            "sport" = "Hockey"
        }
    } else {
        Write-Host "WARNING: Skipped invalid filename: $filename" -ForegroundColor Yellow
    }
}

if ($athleteData.Count -eq 0) {
    Write-Host "ERROR: No valid athletes parsed. Check filenames!" -ForegroundColor Red
    exit
}

$athleteData | ConvertTo-Json -Depth 3 | Set-Content -Path $outputAthleteDataFile -Encoding UTF8
Write-Host "athletes.json created successfully."

# Step 5: Build banner-images.js
Write-Host "Creating banner-images.js..."
if (-Not (Test-Path $bannerDir)) {
    Write-Host "WARNING: Banner directory not found: $bannerDir" -ForegroundColor Yellow
} else {
    $bannerImages = Get-ChildItem -Path $bannerDir -Recurse -File | Where-Object {
        $_.Extension -match "(\.jpg|\.jpeg|\.png|\.gif|\.webp)$"
    } | Select-Object -ExpandProperty Name

    if ($bannerImages.Count -eq 0) {
        Write-Host "WARNING: No banner images found." -ForegroundColor Yellow
    } else {
        $bannerImagesContent = "const bannerImages = [" + "`n"
        foreach ($banner in $bannerImages) {
            $bannerImagesContent += "  `"$banner`"," + "`n"
        }
        $bannerImagesContent += "];"
        $bannerImagesContent | Set-Content -Path $outputBannerImagesFile -Encoding UTF8
        Write-Host "banner-images.js created successfully."
    }
}

# End success
Write-Host ""
Write-Host "All files updated successfully. Ready to upload."

# --- Pause at the end ---
Write-Host ""
Write-Host "Press any key to close this window..."
$x = $host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
