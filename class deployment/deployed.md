live showcase link
```
https://showcase-smi.netlify.app
```
note: deployed using fork hence will require synching if and when project details are updated.

Process:

# 🚀 Deploying the Class Website to Netlify

This guide explains how to put the **Liminal Multiverse** class website online using **Netlify**, from your own fork of the repo.

The site is a static Vite + React + Three.js app. It has no backend, needs no API keys, and Netlify's free plan is enough.

---

## ✅ What you need

- A **GitHub account**
- A **fork** of [`arko97x/not-localhost-showcase`](https://github.com/arko97x/not-localhost-showcase) under your account
- A **Netlify account**. Sign up free at [netlify.com](https://netlify.com) using GitHub.

---

## 🧭 Step 1: Connect your fork to Netlify

1. Go to **[app.netlify.com](https://app.netlify.com)** and sign in with GitHub.
2. Click **Add new project** → **Import an existing project**.
3. Choose **GitHub**. If asked, authorize Netlify and give it access to your forked `not-localhost-showcase` repo.
4. Select **`<your-username>/not-localhost-showcase`**.

---

## ⚙️ Step 2: Enter the build settings

The app is **not** at the top of the repo; it lives inside a subfolder. These settings tell Netlify where to find it.

| Field | Value |
|---|---|
| **Branch to deploy** | `main` |
| **Base directory** | `class deployment/liminal-multiverse - it 2` |
| **Build command** | `npm run build` |
| **Publish directory** | `dist` |

> 💡 Type the base directory **exactly**, including the spaces and the dash.
> Netlify may then display the publish directory as `class deployment/liminal-multiverse - it 2/dist`. That's correct.

### Environment variable

Click **Add environment variables** (sometimes under "Show advanced") and add:

| Key | Value |
|---|---|
| `NODE_VERSION` | `22` |

No other variables are needed. The `GEMINI_API_KEY` mentioned in the app's own README is **not** used.

---

## 🌍 Step 3: Deploy

1. Click **Deploy**.
2. Wait 1–2 minutes until the status shows **Published**.
3. Open the URL at the top (e.g. `random-name-123.netlify.app`) and check that the planets load.

### Optional: choose a nicer URL

**Project configuration → Change project name**, e.g. `liminal-multiverse-class` → `liminal-multiverse-class.netlify.app`.

---

## 📦 What is `dist`?

`dist` (short for *distribution*) is the folder of finished website files that `npm run build` creates.
The browser can't run the `.tsx` source code directly, so Vite converts it into plain HTML, CSS and JavaScript:

```
dist/
├── index.html
└── assets/
    ├── index-xxxx.js
    └── index-xxxx.css
```

You won't see `dist` on GitHub because it only exists after a build. Netlify builds it on its own servers and publishes it.

---

## 🔄 Keeping the site up to date

Your fork does **not** update automatically when classmates change the original repo.

**To pull in classmates' changes:**
1. Open your fork on GitHub.
2. Click **Sync fork → Update branch**.
3. Netlify notices the change and redeploys automatically.

**To update your own project file:**
Edit it directly in **your fork** on GitHub (pencil icon ✏️ → **Commit changes**). Netlify redeploys within a couple of minutes.

> ⚠️ Changes pushed to the original `arko97x` repo only show up on your site after you **Sync fork**.

---

## 🧪 Test locally (optional)

Requires [Node.js](https://nodejs.org) 22 or newer.

```bash
cd "class deployment/liminal-multiverse - it 2"
npm install
npm run dev        # open http://localhost:3000
```

To preview the exact production build:

```bash
npm run build
npm run preview
```

---

## 🛠️ Troubleshooting

Open **Deploys → (the failed deploy)** and scroll to the red error in the log.

| Problem | Fix |
|---|---|
| `Base directory does not exist` | The folder name has a typo. Copy it exactly from your fork on GitHub. |
| Node or Vite version error | Check that `NODE_VERSION` = `22`, then **Trigger deploy → Clear cache and deploy**. |
| Install fails and mentions **bun** | The folder contains a `bun.lock`, so Netlify may try bun. Ask the organiser, or set the build command to `npm install && npm run build`. |
| Site is live but a planet is missing / site is blank | A student's `.json` file probably has a missing `"` or `,`. Check the most recently edited file in `src/data/projects/`. |
| Clicking a planet opens `example.com` | That student hasn't added their project link yet. |

---

## 📋 Quick reference

```
Base directory:     class deployment/liminal-multiverse - it 2
Build command:      npm run build
Publish directory:  dist
Env variable:       NODE_VERSION = 22
```

Happy deploying! 🪐
