# Contributor Guide: Adding Your Project to the Class Library

Welcome to **The Class Project Library**! This repository is designed so that every student can easily update their own project, add photos, and customize their 3D book cover **without modifying any complex UI components**.

---

## ⚡ Quick Summary for Classmates
All student information lives in a single file:  
📁 `data/students.ts`

Any images, diagrams, or cover assets go into:  
📁 `public/images/`

---

## 🛠️ Step-by-Step Contribution Workflow

### 1. Fork and Clone the Repository
Open your terminal (or GitHub Desktop) and clone your fork:
```bash
git clone https://github.com/<your-username>/<repo-name>.git
cd <repo-name>
npm install
```

### 2. Start the Local Preview Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser. You will see the live website! Any changes you make will update instantly.

---

### 3. Edit Your Project in `data/students.ts`
Find your record in the array `STUDENT_PROJECTS` in `data/students.ts` (e.g., matching your volume number `01` through `15`).

Here is what each field represents:

```typescript
{
  id: "your-project-id",            // Unique slug (e.g. "maya-chen")
  number: "03",                     // Your assigned volume number
  studentName: "Your Full Name",     // Display name
  studentRole: "Interaction Designer", // Your focus or title
  studentBio: "1-2 sentences about your practice and interests.",
  avatarSeed: "YourName",
  projectTitle: "Title of Your Project",
  subtitle: "A short, evocative subtitle describing your inquiry",
  category: "Tactile Systems",      // Category tag: "Speculative UI" | "Tactile Systems" | "Visual Essay" | "Service Design" | "Physical Computing" | "Editorial Design" | "Sound & Sense"
  year: "2026",
  tags: ["Sensory Maps", "Haptics", "Inclusive Design"],
  
  // Customizing your 3D Book Cover:
  coverStyle: {
    bgGradient: "from-sky-900 via-blue-950 to-indigo-950",
    accentColor: "#38bdf8",         // Hex color for badges and highlights
    spineColor: "#0284c7",          // Color visible on the book spine
    textColor: "#f0f9ff",
    badgeText: "MAP / 03",          // Top badge on the front cover
    layoutType: "blueprint-lines"   // Visual style:
    // Available styles:
    // - "editorial-split"
    // - "monochrome-brutalist"
    // - "blueprint-lines"
    // - "swiss-grid"
    // - "generative-mesh"
    // - "sonic-bands"
    // - "abstract-cutout"
    // - "tactile-diagram"
    // - "kinetic-waves"
    // - "minimal-typographic"
    // - "solar-glow"
    // - "origami-fold"
    // - "botanical-glyph"
    // - "archival-stamp"
    // - "playful-duotone"
  },

  // Detailed Project Reader Content:
  details: {
    brief: "Your research question or initial prompt.",
    whatICareAbout: "Your personal perspective or what motivated this inquiry.",
    designProcess: [
      "Step 1: Field research or observation.",
      "Step 2: Prototyping and material tests.",
      "Step 3: User feedback and iteration.",
      "Step 4: Final fabrication and synthesis."
    ],
    experiments: [
      "Key exploration A.",
      "Key exploration B.",
      "Key exploration C."
    ],
    finalOutcome: "A description of the completed outcome, artifact, or publication.",
    media: [
      {
        type: "artifact",
        caption: "Photograph of your prototype in use.",
        url: "/images/your-image-1.jpg",
        aspectRatio: "square"
      },
      {
        type: "diagram",
        caption: "System map or process diagram.",
        url: "/images/your-image-2.jpg",
        aspectRatio: "video"
      }
    ],
    reflections: "What you learned, what surprised you, or next steps.",
    externalLinks: [
      { label: "Interactive Prototype", url: "https://your-demo.com", type: "prototype" },
      { label: "GitHub Code", url: "https://github.com/...", type: "github" }
    ]
  }
}
```

---

### 4. Adding Images and Media
1. Save your photos, sketches, or diagrams into the `public/images/` folder.
2. Reference them in `data/students.ts` using the relative URL:
   `url: "/images/your-filename.jpg"`

---

### 5. Verify Your Changes
Run the type check and build command locally to make sure there are no errors:
```bash
npm run build
```
If the build finishes with `Compiled successfully`, you are ready to submit!

---

### 6. Submit Your Changes via Pull Request
```bash
git add data/students.ts public/images/
git commit -m "Update project: <Your Name>"
git push origin your-branch-name
```
Open a Pull Request on GitHub. Once approved, the class website will automatically re-deploy to the public web! 🎉
