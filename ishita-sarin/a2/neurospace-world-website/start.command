#!/bin/bash
cd "$(dirname "$0")"
echo
echo " NeuroSpace is starting. Keep this window open while you use the site."
echo " Close this window to stop it."
echo
(sleep 2; open http://localhost:8000) &
python3 -m http.server 8000 || npx --yes serve -l 8000 .
echo
echo " Could not start. Install Python (python.org/downloads) or Node.js (nodejs.org),"
echo " or drag this folder onto https://app.netlify.com/drop"
read -n 1 -s -r -p " Press any key to close."
