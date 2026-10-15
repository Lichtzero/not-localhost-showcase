# NeuroSpace — nine lives in the record

A design fiction by Ishita Sarin. It is 2081. A neural implant records everything you live, and those memories can be shared, bought, edited and kept forever by a company called mémoire. The visitor steps into nine lives and feels what that does to people.

Flow: start screen, a 40-second explainer (record, share, edit, keep), an archive of nine cards, a short briefing before each life (who you are, what is happening, what to do), the life itself, then a "what this shows" card. The story plays by itself, and a small ◀ story ▶ bar (or the arrow keys, or a click) lets you go back, go forward or move faster. "Replay intro" in the archive returns to the explainer, and the end card links to the two prototypes (Memory Capsule and Memory Book). Nothing is compulsory: the intro can be skipped, and "Skip to the end" is always available, so nobody has to visit all nine.

## Easiest way to open it
- Windows: double-click `start.bat`
- Mac: open Terminal, type `cd ` (with a space), drag this folder into the window, press Enter, then type `python3 -m http.server 8000`, then open http://localhost:8000 in Chrome
- Use Chrome. Wear headphones. Click "Begin".
- No Python/Node, or it still won't start: drag this whole folder onto https://app.netlify.com/drop and you get a link.
- Do NOT double-click index.html. Browsers block it.

## Run it locally (manual)
Browsers block ES modules from file://, so use a tiny server:

    cd neurospace-world
    python3 -m http.server 8000      # then open http://localhost:8000

## Deploy later
Import the folder as a static project on Vercel (no build step). `vercel.json` sets caching.

## Edit the words
- `js/roles.js`: for each life, the briefing (who you are, what is happening, task, controls) and the "what this shows" line.
- `js/explain.js`: the intro script is at the bottom (`playExplain`).
- `js/worlds/*.js`: each life is one file; the story lines are the `T.say(...)` calls. `broker.js` is the order, fragments and receipt.
- `index.html`: the start-screen copy and `window.NAME` (currently Ishita Sarin).
- Test shortcuts: `?world=teacher` jumps into one life, `?hub` skips to the archive, `?hq` forces full quality.
- Three.js r170 is vendored in `vendor/`, fonts in `assets/fonts/`. Nothing loads from a CDN.
