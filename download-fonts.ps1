# Download fonts from Google Fonts

$fontsDir = "public/fonts"

if (-not (Test-Path $fontsDir)) {
    New-Item -ItemType Directory -Path $fontsDir -Force | Out-Null
}

Write-Host "Downloading fonts to $fontsDir..."

# EB Garamond
$ebGaramondUrl = "https://fonts.gstatic.com/s/ebgaramond/v27/ga6iaw1J5X0T9RW6j9bNVls-jVGf.woff2"
$ebGaramondPath = "$fontsDir/eb-garamond-regular.woff2"

Write-Host "Downloading EB Garamond..."
try {
    Invoke-WebRequest -Uri $ebGaramondUrl -OutFile $ebGaramondPath -ErrorAction Stop
    Write-Host "✓ EB Garamond downloaded"
} catch {
    Write-Host "✗ Failed to download EB Garamond"
    Write-Host "  Manual download: https://fonts.google.com/specimen/EB+Garamond"
}

# IBM Plex Mono
$ibmPlexUrl = "https://fonts.gstatic.com/s/ibmplexmono/v19/tss7APCTqv53R8vf7ljOFUUsLwkxFZp6UR17-Ej6-Zg.woff2"
$ibmPlexPath = "$fontsDir/ibm-plex-mono-regular.woff2"

Write-Host "Downloading IBM Plex Mono..."
try {
    Invoke-WebRequest -Uri $ibmPlexUrl -OutFile $ibmPlexPath -ErrorAction Stop
    Write-Host "✓ IBM Plex Mono downloaded"
} catch {
    Write-Host "✗ Failed to download IBM Plex Mono"
    Write-Host "  Manual download: https://fonts.google.com/specimen/IBM+Plex+Mono"
}

Write-Host "`nDone!"
