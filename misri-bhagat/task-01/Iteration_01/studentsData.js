/**
 * STUDENTS DATA REPOSITORY & SHOWCASE MANIFEST
 * ==============================================================================
 * Course: !localhost Design Class Showcase
 * Task 01: Explore the Showcase Site
 * Iteration: 01 (Misri Bhagat)
 *
 * HOW TO ADD OR UPDATE A STUDENT PROJECT:
 * 1. Find your entry in the STUDENTS list below.
 * 2. Update `hasLiveDemo: true` and set `liveUrl` to your HTML file relative path
 *    (e.g., "../../../your-name/task-01/iteration-01/index.html").
 * 3. Update your projectTitle, category, tagline, abstract, and techStack.
 * 4. Refresh the showcase — your 3D world island and folder will immediately update!
 * ==============================================================================
 */

export const THEMES = [
  { id: 'ALL', label: 'All Universes', count: 15, color: '#2563eb' },
  { id: 'MEMORY', label: 'Memory', count: 4, color: '#f59e0b' },
  { id: 'DREAM', label: 'Dream', count: 4, color: '#a855f7' },
  { id: 'TECHNOLOGY', label: 'Technology', count: 6, color: '#06b6d4' },
  { id: 'MAKING', label: 'Making', count: 6, color: '#10b981' },
  { id: 'FUTURE', label: 'Future', count: 5, color: '#6366f1' },
  { id: 'EXPERIMENT', label: 'Experiment', count: 5, color: '#ec4899' },
  { id: 'PLAY', label: 'Play', count: 4, color: '#84cc16' },
  { id: 'RESEARCH', label: 'Research', count: 6, color: '#38bdf8' },
  { id: 'REPAIR', label: 'Repair', count: 2, color: '#f43f5e' }
];

export const STUDENTS = [
  {
    id: "aabha-wagh",
    name: "Aabha Wagh",
    handle: "Lichtzero",
    projectTitle: "DACian-era: Digisite Artifact Reader",
    category: "Archaeological Telemetry & Steganography",
    themes: ["MAKING", "REPAIR", "RESEARCH"],
    tagline: "Excavating lost wireless broadcasts and analog signal sediments.",
    abstract: "A speculative archaeology system pairing a handheld smartphone Reader with a stationary desktop Field Receiver. Explorers physically sweep radio bands to locate, stabilize, and log lost acoustic transmissions across forgotten digital ruins.",
    hasLiveDemo: true,
    liveUrl: "../../../aabha-wagh/task-01/iteration 01/index.html",
    folderUrl: "../../../aabha-wagh/task-01/iteration 01/",
    secondaryUrls: [
      { label: "DAC-04 Device Reader", url: "../../../aabha-wagh/task-01/iteration 01/reader.html" },
      { label: "Iteration README", url: "../../../aabha-wagh/task-01/iteration 01/README.md" }
    ],
    techStack: ["Web Audio API", "Device Vibration API", "Vanilla CSS", "JavaScript"],
    accentColor: "#38bdf8",
    folderColor: "#dbeafe",
    folderAccent: "#0284c7",
    shapeType: "crystal",
    islandIndex: 1,
    coordinates: { x: -32, y: 12, z: -10 }
  },
  {
    id: "ashani-gorakhnath",
    name: "Ashani Gorakhnath",
    handle: "ideaphoria",
    projectTitle: "The Cetacean Interface & Sonar Translator",
    category: "Interspecies Bio-Cybernetics",
    themes: ["TECHNOLOGY", "RESEARCH", "EXPERIMENT"],
    tagline: "Decoding oceanic intelligence through multimodal neural bio-acoustics.",
    abstract: "A speculative communication station built to capture, visualize, and translate marine mammal acoustic repertoires (clicks, whistles, and pulse codas) into cognitive syntax using local offline large language models.",
    hasLiveDemo: true,
    liveUrl: "../../../ashani-gorakhnath/task-01/cetacean-translator/multimodal_recorder/index.html",
    folderUrl: "../../../ashani-gorakhnath/task-01/cetacean-translator/",
    secondaryUrls: [
      { label: "Interface Documentation", url: "../../../ashani-gorakhnath/task-01/cetacean-translator/Read me_Cetacean interface.rtf" },
      { label: "Python App (Local)", url: "../../../ashani-gorakhnath/task-01/cetacean-translator/app.py" }
    ],
    techStack: ["Audio DSP", "Spectrograms", "Ollama LLM", "Multimodal Recorder"],
    accentColor: "#06b6d4",
    folderColor: "#cffafe",
    folderAccent: "#0891b2",
    shapeType: "sonar_ring",
    islandIndex: 2,
    coordinates: { x: -22, y: -8, z: 24 }
  },
  {
    id: "gouri-ghushe",
    name: "Gouri Ghushe",
    handle: "GGhushe",
    projectTitle: "Physiognomy Profiling Machine (NEXUS SCAN)",
    category: "Critical AI & Biometric Satire",
    themes: ["EXPERIMENT", "RESEARCH", "TECHNOLOGY"],
    tagline: "A satirical probe into algorithmic phrenology and biometric surveillance.",
    abstract: "A speculative biometric game interrogating the revival of 19th-century physiognomy through modern facial landmark tracking, camera quests, and satirical algorithmic style profiles.",
    hasLiveDemo: false,
    liveUrl: null,
    folderUrl: "../../../gouri-ghushe/task-01/",
    secondaryUrls: [
      { label: "Student Task README", url: "../../../gouri-ghushe/task-01/README.md" }
    ],
    techStack: ["Computer Vision Mesh", "JavaScript Style Engine", "Biometric Satire"],
    accentColor: "#ec4899",
    folderColor: "#fce7f3",
    folderAccent: "#db2777",
    shapeType: "mesh_prism",
    islandIndex: 3,
    coordinates: { x: -14, y: 22, z: -26 }
  },
  {
    id: "haniya-hasim",
    name: "Haniya Hasim",
    handle: "Novice242",
    projectTitle: "MMOW (Shared Virtual World)",
    category: "Spatial Network Commons",
    themes: ["PLAY", "DREAM", "TECHNOLOGY"],
    tagline: "An open communal spatial plane drawn one packet at a time.",
    abstract: "An experimental open-world virtual architecture investigating synchronous multi-user spatial presence, shared digital cartography, and emergent digital communities in unbounded online environments.",
    hasLiveDemo: false,
    liveUrl: null,
    folderUrl: "../../../haniya-hasim/task-01/",
    secondaryUrls: [
      { label: "Student Task README", url: "../../../haniya-hasim/task-01/README.md" }
    ],
    techStack: ["Spatial Networking", "Voxel Engine", "Distributed Sync"],
    accentColor: "#a855f7",
    folderColor: "#f3e8ff",
    folderAccent: "#9333ea",
    shapeType: "voxel_cluster",
    islandIndex: 4,
    coordinates: { x: 8, y: 18, z: 32 }
  },
  {
    id: "iniya-r",
    name: "Iniya R",
    handle: "theiniyaaalll-pixel",
    projectTitle: "Vend Your Simulation & Goldfish ATGravity",
    category: "Generative Synesthesia & Biophysics",
    themes: ["PLAY", "EXPERIMENT", "TECHNOLOGY"],
    tagline: "Vending creative simulations and synthesizing non-Euclidean dreamscapes.",
    abstract: "An interactive 3D vending machine experience that dispenses simulated experiences, alongside generative audio-visual biophysical simulations of inverted gravitational fluid dynamics.",
    hasLiveDemo: true,
    liveUrl: "../../../iniya-r/task-01/iteration 1/index.html",
    folderUrl: "../../../iniya-r/task-01/iteration 1/",
    secondaryUrls: [
      { label: "Simulation Demo 01", url: "../../../iniya-r/task-01/iteration 1/demo-01.html" },
      { label: "Vending README", url: "../../../iniya-r/task-01/iteration 1/README.md" }
    ],
    techStack: ["Three.js", "p5.js", "Tone.js Audio", "GLSL Shaders"],
    accentColor: "#10b981",
    folderColor: "#d1fae5",
    folderAccent: "#059669",
    shapeType: "cylinder_can",
    islandIndex: 5,
    coordinates: { x: 26, y: -12, z: 18 }
  },
  {
    id: "ishita-sarin",
    name: "Ishita Sarin",
    handle: "Ishita054",
    projectTitle: "Incubation Café & NeuroSpace",
    category: "Cognitive Memory Architecture",
    themes: ["MEMORY", "FUTURE", "RESEARCH"],
    tagline: "Fifteen ideas, still steeping. Preserving consciousness through synaptic compression.",
    abstract: "A warm editorial incubation archive charting fifteen brewing student ideas across disciplinary stages, paired with speculative frameworks for archiving subjective nostalgia and synaptic memory.",
    hasLiveDemo: true,
    liveUrl: "../../../ishita-sarin/task-01/iteration 3.html",
    folderUrl: "../../../ishita-sarin/task-01/",
    secondaryUrls: [
      { label: "Iteration 1 (Grounds & Brew)", url: "../../../ishita-sarin/task-01/iteration 1.html" },
      { label: "Iteration 2 (Tags & Steeping)", url: "../../../ishita-sarin/task-01/iteration 2.html" },
      { label: "Task README", url: "../../../ishita-sarin/task-01/README.md" }
    ],
    techStack: ["Canvas Procedural Blobs", "Fraunces Serif", "IBM Plex Mono"],
    accentColor: "#f59e0b",
    folderColor: "#fef3c7",
    folderAccent: "#d97706",
    shapeType: "blob_sphere",
    islandIndex: 6,
    coordinates: { x: 34, y: 10, z: -16 }
  },
  {
    id: "lakshmi-supriya",
    name: "Lakshmi Supriya",
    handle: "msup96",
    projectTitle: "Persona Worlds & Freeing the Parrot",
    category: "Affective Computing & Spatial Personas",
    themes: ["DREAM", "RESEARCH", "TECHNOLOGY"],
    tagline: "Exploring artificial empathy, emotional mirages, and 15 shapeshifter universes.",
    abstract: "An immersive cosmic mandala mapping fifteen shapeshifter persona worlds, combined with physical-digital installations interrogating the illusion of emotional understanding in conversational AI.",
    hasLiveDemo: true,
    liveUrl: "../../../lakshmi-supriya/Iteration 1/index.html",
    folderUrl: "../../../lakshmi-supriya/Iteration 1/",
    secondaryUrls: [
      { label: "Project Metadata", url: "../../../lakshmi-supriya/Iteration 1/metadata.json" },
      { label: "Iteration README", url: "../../../lakshmi-supriya/Iteration 1/README.md" }
    ],
    techStack: ["React", "Vite", "Spatial Physics Hook", "Audio Engine"],
    accentColor: "#14b8a6",
    folderColor: "#ccfbf1",
    folderAccent: "#0d9488",
    shapeType: "mandala_torus",
    islandIndex: 7,
    coordinates: { x: -6, y: -24, z: -14 }
  },
  {
    id: "medha-halapnavar",
    name: "Medha Halapnavar",
    handle: "imedhit",
    projectTitle: "Liminal Multiverse & Ec-ak-ou",
    category: "Phonetic Feedback & Speculative Realms",
    themes: ["FUTURE", "EXPERIMENT", "TECHNOLOGY"],
    tagline: "Celestial spheres of speculative futures and phonetic reverberation decay.",
    abstract: "A 3D spatial multiverse of 13 speculative futures with interactive simulations and wizard guardians, examining acoustic decay and corporate enclosures of the atmosphere.",
    hasLiveDemo: true,
    liveUrl: "../../../medha-halapnavar/task-01/Iteration 02/liminal-multiverse - it 2/index.html",
    folderUrl: "../../../medha-halapnavar/task-01/Iteration 02/",
    secondaryUrls: [
      { label: "Iteration 01 Multiverse", url: "../../../medha-halapnavar/task-01/Iteration 01/liminal-multiverse/index.html" },
      { label: "Multiverse README", url: "../../../medha-halapnavar/task-01/Iteration 02/liminal-multiverse - it 2/README.md" }
    ],
    techStack: ["Three.js", "Synthesized Web Audio", "Vite TS", "Celestial Shaders"],
    accentColor: "#6366f1",
    folderColor: "#e0e7ff",
    folderAccent: "#4f46e5",
    shapeType: "celestial_orb",
    islandIndex: 8,
    coordinates: { x: -28, y: 4, z: 28 }
  },
  {
    id: "misri-bhagat",
    name: "Misri Bhagat",
    handle: "itsmisri",
    projectTitle: "A World of Designers — Collective Archive",
    category: "Collective Spatial Cosmos & Design Ecosystem",
    themes: ["MAKING", "PLAY", "COLLECTIVE", "DREAM"],
    tagline: "Different minds. Different worlds. One shared space.",
    abstract: "The collective class showcase uniting all 15 student worlds into an interactive spatial cosmos and tactile folder archive, where ideas float freely as collaborative creative fragments.",
    hasLiveDemo: true,
    liveUrl: "./index.html",
    folderUrl: "./",
    secondaryUrls: [
      { label: "Showcase Task Assignment PDF", url: "./Task 01- Explore the showcase site.pdf" },
      { label: "Misri Bhagat Task 01", url: "../README.md" }
    ],
    techStack: ["Three.js 3D Cosmos", "Spatial Audio", "Vanilla CSS3 Glassmorphism"],
    accentColor: "#2563eb",
    folderColor: "#dbeafe",
    folderAccent: "#1d4ed8",
    shapeType: "core_prism",
    islandIndex: 9,
    coordinates: { x: 0, y: 0, z: 0 }
  },
  {
    id: "moulik-nanda",
    name: "Moulik Nanda",
    handle: "mouliknanda",
    projectTitle: "Jukebox v1 & Retro DVD Binder 3D",
    category: "Physical-Digital Tangible Media",
    themes: ["MAKING", "MEMORY", "PLAY"],
    tagline: "A tactile 3D wallet binder filled with interactive retro discs and wearable tech.",
    abstract: "A nostalgic 3D interactive DVD and CD binder allowing visitors to pull discs from plastic sleeves, inspect album art, play audio themes, and explore smart glasses firmware.",
    hasLiveDemo: true,
    liveUrl: "../../../moulik-nanda/task-01/jukebox v1/index.html",
    folderUrl: "../../../moulik-nanda/task-01/jukebox v1/",
    secondaryUrls: [
      { label: "Iteration 1 Prototype", url: "../../../moulik-nanda/task-01/iteration 1/index.html" },
      { label: "ESP32 Glasses Code", url: "../../../moulik-nanda/task-01/iteration 1/project code/src/main.cpp" },
      { label: "Task README", url: "../../../moulik-nanda/task-01/README.md" }
    ],
    techStack: ["Three.js 3D Binder", "Procedural Disc Textures", "Web Audio API", "C++ ESP32"],
    accentColor: "#ef4444",
    folderColor: "#fee2e2",
    folderAccent: "#dc2626",
    shapeType: "disc_binder",
    islandIndex: 10,
    coordinates: { x: 18, y: -20, z: -20 }
  },
  {
    id: "nidi-thiagarajan",
    name: "Nidi Thiagarajan",
    handle: "nidi-t",
    projectTitle: "Design Inquiries & Space Syntheses",
    category: "Spatial Research & Emerging Systems",
    themes: ["RESEARCH", "DREAM", "EXPERIMENT"],
    tagline: "Exploring spatial perception, sensory boundaries, and generative form.",
    abstract: "Cohort space dedicated to ongoing studio research, spatial synthesis experiments, and upcoming showcase iterations.",
    hasLiveDemo: false,
    liveUrl: null,
    folderUrl: "../../../nidi-thiagarajan/task-01/",
    secondaryUrls: [
      { label: "Student Task README", url: "../../../nidi-thiagarajan/task-01/README.md" }
    ],
    techStack: ["Spatial Exploration", "Emerging Form"],
    accentColor: "#f97316",
    folderColor: "#ffedd5",
    folderAccent: "#ea580c",
    shapeType: "tetrahedron",
    islandIndex: 11,
    coordinates: { x: 28, y: 22, z: 6 }
  },
  {
    id: "nikkon-sengupta",
    name: "Nikkon Sengupta",
    handle: "itsniko18",
    projectTitle: "The Scribbler: Analog Steganography",
    category: "Counter-Surveillance & Cryptography",
    themes: ["TECHNOLOGY", "MAKING", "REPAIR"],
    tagline: "Deliberate human handwriting flaws as the ultimate anti-surveillance cipher.",
    abstract: "An analog steganographic tool encoding confidential messages inside calligraphic irregularities and tremors to foil optical character recognition pipelines.",
    hasLiveDemo: false,
    liveUrl: null,
    folderUrl: "../../../nikkon-sengupta/task-01/",
    secondaryUrls: [
      { label: "Student Task README", url: "../../../nikkon-sengupta/task-01/README.md" }
    ],
    techStack: ["HTML5 Canvas", "Parametric Typography", "Steganographic Ciphers"],
    accentColor: "#84cc16",
    folderColor: "#ecfccb",
    folderAccent: "#65a30d",
    shapeType: "cipher_cube",
    islandIndex: 12,
    coordinates: { x: -36, y: -16, z: -8 }
  },
  {
    id: "rajatkumar-shahare",
    name: "Rajatkumar Shahare",
    handle: "Rajat.Blu",
    projectTitle: "Speculative Archive & Editorial Flip-Book",
    category: "Editorial Architecture & Speculative Systems",
    themes: ["FUTURE", "RESEARCH", "MAKING"],
    tagline: "9 speculative research projects in a stark, monochrome editorial flip-book.",
    abstract: "A spatial showcase and editorial flip-book presenting nine physical-digital research projects by contemporary creators, built in the minimalist aesthetic of Gil Huybrecht.",
    hasLiveDemo: true,
    liveUrl: "../../../rajatkumar-shahare/task-01/Iteration 01/index.html",
    folderUrl: "../../../rajatkumar-shahare/task-01/Iteration 01/",
    secondaryUrls: [
      { label: "Editorial Data Manifest", url: "../../../rajatkumar-shahare/task-01/Iteration 01/data.js" },
      { label: "Iteration README", url: "../../../rajatkumar-shahare/task-01/Iteration 01/README.md" }
    ],
    techStack: ["Space Grotesk", "Inter", "Vanilla CSS Flip Engine", "Minimalist DOM"],
    accentColor: "#e2e8f0",
    folderColor: "#f1f5f9",
    folderAccent: "#475569",
    shapeType: "monolith_slab",
    islandIndex: 13,
    coordinates: { x: -16, y: -4, z: -32 }
  },
  {
    id: "sudarsinii-mazumdar",
    name: "Sudarsinii Mazumdar",
    handle: "sudarsinii-m",
    projectTitle: "Material Memory & Speculative Forms",
    category: "Material Culture & Somatic Design",
    themes: ["EXPERIMENT", "MEMORY", "RESEARCH"],
    tagline: "Investigating the tactile afterlife of cultural objects and material memory.",
    abstract: "Cohort space dedicated to material explorations, speculative physical computing, and upcoming showcase iterations.",
    hasLiveDemo: false,
    liveUrl: null,
    folderUrl: "../../../sudarsinii-mazumdar/task-01/",
    secondaryUrls: [
      { label: "Student Task README", url: "../../../sudarsinii-mazumdar/task-01/README.md" }
    ],
    techStack: ["Physical Prototyping", "Material Culture"],
    accentColor: "#d946ef",
    folderColor: "#fae8ff",
    folderAccent: "#c026d3",
    shapeType: "faceted_gem",
    islandIndex: 14,
    coordinates: { x: 12, y: 28, z: -22 }
  },
  {
    id: "urvi-khadakban",
    name: "Urvi Khadakban",
    handle: "urvi-k",
    projectTitle: "Adaptive Systems & Living Artifacts",
    category: "Systems Prototyping & Ecological Design",
    themes: ["MAKING", "FUTURE", "PLAY"],
    tagline: "Designing responsive interfaces that bridge biological cycles and digital tools.",
    abstract: "Cohort space dedicated to interactive environmental systems, computational craft, and upcoming showcase iterations.",
    hasLiveDemo: false,
    liveUrl: null,
    folderUrl: "../../../urvi-khadakban/task-01/",
    secondaryUrls: [
      { label: "Student Task README", url: "../../../urvi-khadakban/task-01/README.md" }
    ],
    techStack: ["Sensory Computing", "Systems Prototyping"],
    accentColor: "#2dd4bf",
    folderColor: "#ccfbf1",
    folderAccent: "#0f766e",
    shapeType: "eco_helix",
    islandIndex: 15,
    coordinates: { x: 38, y: -6, z: 22 }
  }
];

export function getStudentById(id) {
  return STUDENTS.find(s => s.id === id);
}

export function filterStudentsByTheme(theme) {
  if (!theme || theme === 'ALL') return STUDENTS;
  return STUDENTS.filter(s => s.themes.includes(theme));
}

export function searchStudents(query) {
  if (!query) return STUDENTS;
  const q = query.toLowerCase().trim();
  return STUDENTS.filter(s =>
    s.name.toLowerCase().includes(q) ||
    s.projectTitle.toLowerCase().includes(q) ||
    s.category.toLowerCase().includes(q) ||
    s.handle.toLowerCase().includes(q) ||
    s.themes.some(t => t.toLowerCase().includes(q))
  );
}
