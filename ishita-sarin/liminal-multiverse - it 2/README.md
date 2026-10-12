<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://ai.google.dev/static/site-assets/images/share-ais-513315318.png" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/63ac06b3-5959-4fc2-b0fb-6c6c59aa6905

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

---

## Class planets: how everyone's work gets connected

Every classmate's folder in this repository becomes a planet in the multiverse. Click one to preview their latest project, see when it was last updated, and flip through their earlier iterations.

```
git push (anyone)
   └─> GitHub Action (.github/workflows/deploy-multiverse.yml)
        └─> scripts/sync-showcase.mjs   scans every folder, finds each person's latest iteration,
        │                               copies previewable work, writes showcase-manifest.json
        └─> vite build                  bundles the multiverse
             └─> GitHub Pages           planets read the manifest and appear / update
```

- **Latest** = highest `task-NN`, then the most recent git commit, then the highest-numbered folder name. Folder names don't have to follow any rule.
- **Previews:** a folder with `index.html` (or any `.html`) shows live; a Vite/React project is built automatically; a PDF is embedded; anything else (Python, firmware…) shows its files and a GitHub link.
- **No upload yet?** The planet stays dark and says "Awaiting first transmission", then lights up on the first push.
- Run locally: `npm install --legacy-peer-deps && npm run dev` (use `npm run sync:full` to also build the React projects).
