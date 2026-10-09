# A WORLD OF DESIGNERS — Showcase Iteration 01
**Misri Bhagat (`misri-bhagat/task-01/Iteration_01`)**

> *“Different minds. Different worlds. One shared space.”*
> A collective universe of ideas, experiments, and student projects for our design class.

---

## ✦ Concept & Inspiration

This iteration brings together the class into a shared, living cosmos rather than a fragmented series of individual links.

Directly drawing from the exploration brief and visual inspirations:
1. **The Hero Stage (Assignment PDF Page 2)**:
   - Floating fragments of creative inquiry (*Memory, Dream, Technology, Making, Future, Experiment, Play, Research, Repair*) orbiting around a prominent typographic title: *"A collective archive of STUDENT PROJECTS"*.
   - Interactive fragments dynamically illuminate and filter matching worlds across the cosmos.

2. **The 3D Floating Cosmos (Three.js WebGL)**:
   - 15 unique, handcrafted 3D sculptural islands representing each member of our design cohort.
   - Sculptural pedestals (crystals, sonar rings, biometric prisms, voxel clusters, vending cylinders, audio convolution spheres, retro disc binders, monoliths) with floating creative folders.
   - Fluid camera damping, mouse/touch orbital controls, cursor parallax, and smooth fly-to cinematic zooms.

3. **The Tactile Folder Archive View (Assignment PDF Page 1)**:
   - A secondary desktop archive view inspired by *"Half-Year Tucked Inside My Folder"* and *"designer portfolio (2025)"*.
   - Tactile pastel and vibrant folder jackets with individual tabs, ID stamps, and peeking document cards.

4. **Real Links & Zero Fake Data**:
   - Every single student from the class repository is cataloged with their real paths and active files.
   - Direct launch links for active prototypes (e.g., Aabha Wagh, Ashani Gorakhnath, Iniya R, Ishita Sarin, Lakshmi Supriya, Medha Halapnavar, Moulik Nanda, Rajatkumar Shahare).
   - Dedicated folder archive links for all incubating spaces.

---

## 🛠️ How Classmates Can Update Their Projects

All project metadata and links are centralized in [`studentsData.js`](./studentsData.js). To update your project:

1. Open [`studentsData.js`](./studentsData.js).
2. Locate your entry in the `STUDENTS` array.
3. Update `hasLiveDemo: true` and specify your `liveUrl` relative to this folder:
   ```javascript
   {
     id: "your-name",
     name: "Your Name",
     handle: "your-github-or-handle",
     projectTitle: "Your New Project Title",
     category: "Your Category",
     themes: ["TECHNOLOGY", "MAKING"],
     tagline: "Your one-line pitch.",
     abstract: "Your abstract description...",
     hasLiveDemo: true,
     liveUrl: "../../../your-name/task-01/iteration-01/index.html",
     folderUrl: "../../../your-name/task-01/",
     // ...
   }
   ```
4. Save and refresh the showcase — your 3D island, folder jacket, and inspector drawer will update automatically.

---

## 🚀 Running Locally

No build tools or package managers required. Run with any local HTTP server:

```bash
# From this directory:
python3 -m http.server 8000
```

Open [`http://localhost:8000`](http://localhost:8000) in your browser.
