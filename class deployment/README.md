# 🪐 How to add your project to the class website

Every student has their own **planet** on the class website.
When someone clicks your planet, it opens **your project's link**.

All you have to do is fill in **one small file**. It takes about 5 minutes, and you only need a web browser. You don't have to install anything.

---

## ✅ Before you start, have these ready

1. **A GitHub account.** If you don't have one, make a free account at [github.com](https://github.com).
2. **Your project's link**, the web address where your project lives, e.g. `https://my-project.netlify.app`.
3. **Your project's name**, e.g. `Memory Capsule`.
4. **One sentence** that describes your project.

---

## 🧭 Step 1: Find your file

1. Open the class folder on GitHub:
   👉 **[Open the projects folder](https://github.com/arko97x/not-localhost-showcase/tree/main/class%20deployment/liminal-multiverse%20-%20it%202/src/data/projects)**
2. You'll see a list of files, **one per student**, named after you.
   For example, if your name is Aabha Wagh, your file is **`aabha-wagh.json`**.
3. **Click your file** to open it.



---

## ✏️ Step 2: Click the pencil to edit

Near the top right of your file there is a **pencil icon ✏️** ("Edit this file").
**Click it.** The file now becomes editable, just like a text box.

---

## 📝 Step 3: Change only these lines

Your file has many lines, but **you only need to change a few**.
Everything else controls how your planet looks, so **leave it alone**.

Here are the lines to look for, near the top of the file:

```json
  "url": "https://example.com",
  "subtitle": "Project title goes here",
  "year": "2050 CE",
  "sector": "SYNTHETIC ENTITIES",
```

…and a bit further down:

```json
    "quote": "“A one-line description of the project goes here.”",
```

```json
    "avatarRune": "🌸"
```

### What each line means

| Line | What to put there | Example |
|---|---|---|
| `"url"` | **Your project's link.** This opens when someone clicks your planet. | `"https://my-project.netlify.app"` |
| `"subtitle"` | **Your project's name.** It's written right on your planet. | `"Memory Capsule"` |
| `"quote"` | **One sentence about your project.** It shows when someone hovers over your planet. | `"A time capsule for memories we are afraid to forget."` |
| `"year"` | The year your project is set in, or any year you like. | `"2050 CE"` |
| `"sector"` | Your project's **category**. Pick **one** of the three options below. | `"PLANETARY ALGORITHMS"` |
| `"avatarRune"` | **One emoji** that represents you or your project. | `"🧠"` |

**Category options.** Copy one of these exactly, in CAPITAL letters:

- `BIOMETRICS & PERCEPTION`
- `SYNTHETIC ENTITIES`
- `PLANETARY ALGORITHMS`

### ⚠️ The 3 golden rules (so nothing breaks)

1. **Only change the words between the quote marks `" "`.** Keep the `"` marks themselves.
   - ✅ `"subtitle": "Memory Capsule",`
   - ❌ `"subtitle": Memory Capsule,` (the quote marks are missing)
2. **Don't delete the comma `,`** at the end of a line.
3. **Don't use the `"` symbol inside your text.** If you need quotes inside your sentence, use single quotes `'like this'` instead.

### 👀 Before and after example

**Before:**

```json
  "url": "https://example.com",
  "subtitle": "Project title goes here",
```

**After:**

```json
  "url": "https://memory-capsule.netlify.app",
  "subtitle": "Memory Capsule",
```

---

## 💾 Step 4: Save your changes

1. Click the green **"Commit changes…"** button at the top right.
2. A small box pops up. In the **message** box, type something short like `Added my project`.
3. Click **"Commit changes"** again.

> 💡 **Did the button say "Propose changes" instead?**
> That's normal. It means the class organiser has to approve your edit first.
> Click **"Propose changes"**, then on the next page click **"Create pull request"** (twice).
> The organiser will check it and approve it. You're done! 🎉

---

## 🌍 Step 5: See it on the website

After your change is saved and the organiser publishes the site, open the class website and look for **your number and project name on your planet**.

- **Click your planet** and your project should open in a new tab.
- **Prefer a simple list?** Click **"List View"** at the top of the site to see every project in a list instead of the 3D space view.

---

## ❓ Common questions

**I don't have my project link yet. What do I do?**
Leave the `"url"` line as it is for now. Your planet will say **"Link coming soon"**. Come back and add it later.

**I made a mistake. Can I fix it?**
Yes! Just open your file again, click the pencil ✏️, fix it, and save again (Step 4).

**The site broke or my planet disappeared after my change.**
Usually a quote mark `"` or a comma `,` went missing. Open your file and compare it with the examples above. If you're stuck, ask the class organiser. They can see exactly what changed and undo it.

**Can I change my planet's colour?**
Please ask the class organiser. The colour lines are easy to break by accident.

**Can I change my name?**
Your name is already filled in under `"name"`. If it's spelled wrong, you can fix it there, following the same golden rules.

---

## 🚫 Please don't change

- `"id"`. It must stay exactly as it is.
- Anything inside `"sphere"`. That's your planet's size, colour, position and rings.
- The file's name.

---

Happy uploading! 🚀

