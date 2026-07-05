# Download fonts from Google Fonts

$fontsDir = "public/fonts"

if (-not (Test-Path $fontsDir)) {
    New-Item -ItemType Directory -Path $fontsDir -Force | Out-Null
}

Write-Host "Downloading fonts to $fontsDir..."

# Instrument Serif
$instrumentSerifUrl = "https://fonts.gstatic.com/s/instrumentserif/v6/jizAREdFvq-B7SLM3BfqQ3szzd.woff2"
$instrumentSerifPath = "$fontsDir/instrument-serif-regular.woff2"

Write-Host "Downloading Instrument Serif..."
try {
    Invoke-WebRequest -Uri $instrumentSerifUrl -OutFile $instrumentSerifPath
    Write-Host "✓ Instrument Serif downloaded"
} catch {
    Write-Host "✗ Failed to download Instrument Serif: $_"
}

# IBM Plex Mono
$ibmPlexUrl = "https://fonts.gstatic.com/s/ibmplexmono/v19/tss7APCTqv53R8vf7ljOFUUsLwkxFZp6UR17-Ej6-Zg.woff2"
$ibmPlexPath = "$fontsDir/ibm-plex-mono-regular.woff2"

Write-Host "Downloading IBM Plex Mono..."
try {
    Invoke-WebRequest -Uri $ibmPlexUrl -OutFile $ibmPlexPath
    Write-Host "✓ IBM Plex Mono downloaded"
} catch {
    Write-Host "✗ Failed to download IBM Plex Mono: $_"
}

Write-Host "`nDone! Fonts are ready in $fontsDir"
