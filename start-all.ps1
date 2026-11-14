# Starts everything for Campus Connect:
#   1. Backend in Docker (local Postgres 18 + 3 API replicas + nginx on :4000)
#   2. A second window streaming backend logs
#   3. Expo dev server in this window (shows the QR code for Expo Go)
#
# Run:  powershell -ExecutionPolicy Bypass -File .\start-all.ps1

$ErrorActionPreference = 'Stop'
$root   = $PSScriptRoot
$server = Join-Path $root 'server'
$compose = 'docker-compose.lb.yml'

# Docker Desktop's CLI folder (not on PATH until a fresh login)
$env:PATH = "$env:LOCALAPPDATA\Programs\DockerDesktop\resources\bin;$env:PATH"

Write-Host "`n=== 1/3  Backend (Docker) ===" -ForegroundColor Cyan
docker info *> $null
if ($LASTEXITCODE -ne 0) { throw 'Docker Desktop is not running. Open Docker Desktop, wait for "Engine running", then re-run.' }
Push-Location $server
docker compose -f $compose up -d
# nginx resolves the api replicas' IPs at startup — restart it so it never holds stale ones
docker compose -f $compose restart nginx
Pop-Location

Write-Host 'Waiting for API health...' -NoNewline
for ($i = 0; $i -lt 60; $i++) {
    try { if ((Invoke-WebRequest http://localhost:4000/health -UseBasicParsing -TimeoutSec 2).StatusCode -eq 200) { break } } catch {}
    Start-Sleep 2; Write-Host '.' -NoNewline
}
Write-Host ' OK' -ForegroundColor Green

Write-Host "`n=== 2/3  Backend logs window ===" -ForegroundColor Cyan
Start-Process powershell -ArgumentList '-NoExit', '-Command', "`$host.UI.RawUI.WindowTitle='Campus Connect - Backend logs'; `$env:PATH='$env:LOCALAPPDATA\Programs\DockerDesktop\resources\bin;'+`$env:PATH; cd '$server'; docker compose -f $compose logs -f --tail 20 api"

Write-Host "`n=== 3/3  Expo ===" -ForegroundColor Cyan
# Use the Wi-Fi address so the QR code points phones at the right network adapter
$wifiIp = (Get-NetIPAddress -AddressFamily IPv4 -InterfaceAlias 'Wi-Fi' -ErrorAction SilentlyContinue | Where-Object { $_.IPAddress -notmatch '^169\.254' } | Select-Object -First 1).IPAddress
if ($wifiIp) {
    $env:REACT_NATIVE_PACKAGER_HOSTNAME = $wifiIp
    Write-Host "Wi-Fi IP: $wifiIp" -ForegroundColor Green
    Write-Host "Phone check: open http://$($wifiIp):4000/health in the phone browser"
    Write-Host "Expo Go manual URL: exp://$($wifiIp):8081`n"
} else {
    Write-Host 'Wi-Fi not connected - QR will use whatever IP Expo picks.' -ForegroundColor Yellow
}

$host.UI.RawUI.WindowTitle = 'Campus Connect - Expo'
Set-Location $root
npx expo start --lan --port 8081
