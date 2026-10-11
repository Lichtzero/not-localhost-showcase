@echo off
title Living Woodland Realm Server
echo ========================================================
echo   Starting Interactive Student Game World Server...
echo ========================================================
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo Node.js not detected on this system.
    echo Opening index.html directly in your default browser...
    start "" "%~dp0index.html"
    exit
)
start "" "http://localhost:3001"
node server.js
pause
