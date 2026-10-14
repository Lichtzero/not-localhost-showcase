@echo off
cd /d "%~dp0"
echo.
echo  NeuroSpace is starting. Keep this window open while you use the site.
echo  Close this window to stop it.
echo.
start "" cmd /c "timeout /t 3 >nul & start http://localhost:8000"
python -m http.server 8000 2>nul
if %errorlevel%==0 goto :eof
py -m http.server 8000 2>nul
if %errorlevel%==0 goto :eof
npx --yes serve -l 8000 .
if %errorlevel%==0 goto :eof
echo.
echo  Could not start. You need Python (python.org/downloads, tick "Add to PATH")
echo  or Node.js (nodejs.org). Or drag this folder onto https://app.netlify.com/drop
echo.
pause
