import { StudentProject } from "./types";

/**
 * 15 Clearly Fictional Placeholder Student Records.
 * All data here is designed to be easily editable by students and contributors.
 * To update your project, simply edit this file and add your image files to /public/images/.
 */
export const STUDENT_PROJECTS: StudentProject[] = [
  {
    id: "project-01",
    number: "01",
    studentName: "Aditya Kulkarni",
    studentRole: "Tactile & Spatial Designer",
    studentBio: "Investigating the emotional resonance of domestic clutter and tactile archives in shared urban dwellings.",
    avatarSeed: "Aditya",
    projectTitle: "Kutir: Architecture of Memory",
    subtitle: "A tangible index of lost domestic rituals and salvaged heirlooms",
    category: "Tactile Systems",
    year: "2026",
    tags: ["Tactile Archive", "Domestic Rituals", "Material Culture", "Audio Object"],
    coverStyle: {
      bgGradient: "from-amber-100 via-orange-50 to-stone-200",
      accentColor: "#ea580c",
      spineColor: "#c2410c",
      textColor: "#431407",
      badgeText: "VOL. 01 / FOLIO",
      layoutType: "editorial-split",
    },
    details: {
      brief: "How can the ephemeral emotional micro-moments of domestic living be preserved through physical objects rather than ephemeral digital cloud backups?",
      whatICareAbout: "I care about the dust on windowsills, the fading smell of old wooden cabinets, and how the objects we touch daily hold more psychological truth than our digital messaging threads.",
      designProcess: [
        "Collected 48 physical discarded household artifacts from student flats across Yelahanka.",
        "Conducted material resonance tests measuring acoustic feedback when striking varied timbers and ceramics.",
        "Created an interactive cabinet of curiosities with RFID-tagged tokens that play ambient recorded family conversations.",
        "Designed an accompanying cloth-bound codex cataloguing each artifact's provenance and decay patterns."
      ],
      experiments: [
        "Experiment A: Wax casting of apartment door keys to capture wear grooves.",
        "Experiment B: Piezo sensors embedded in ceramic teacups responding to temperature drops.",
        "Experiment C: Blindfolded navigation testing of room textures with studio peers."
      ],
      finalOutcome: "A dual-component system: an interactive physical sensory archive station paired with a limited-run tactile book printed on mulberry and handmade cotton rag papers.",
      media: [
        {
          type: "artifact",
          caption: "Kutir Prototype: Cast brass RFID tokens with stamped numerals.",
          aspectRatio: "square"
        },
        {
          type: "diagram",
          caption: "Acoustic resonance map of domestic memory chambers.",
          aspectRatio: "video"
        }
      ],
      reflections: "Tangibility demands patience. In an age of infinite digital storage, physical limitation is what creates reverence.",
      externalLinks: [
        { label: "Interactive Prototype Walkthrough", url: "https://github.com", type: "prototype" },
        { label: "Material Research Archive", url: "https://github.com", type: "github" }
      ]
    }
  },
  {
    id: "project-02",
    number: "02",
    studentName: "Arjun Vance",
    studentRole: "Creative Technologist & Interface Poet",
    studentBio: "Exploring speculative 3D terminal environments, cybernetic nostalgia, and the intimacy of text-based spatial navigation.",
    avatarSeed: "Arjun",
    projectTitle: "Ideaphoria: In the House of Syntax",
    subtitle: "A 3D ASCII terminal environment exploring non-linear architectural narratives",
    category: "Speculative UI",
    year: "2026",
    tags: ["ASCII Art", "Three.js", "Terminal UI", "Hyperfiction"],
    coverStyle: {
      bgGradient: "from-zinc-950 via-slate-900 to-black",
      accentColor: "#22c55e",
      spineColor: "#15803d",
      textColor: "#f0fdf4",
      badgeText: "RAW_TTY:02",
      layoutType: "monochrome-brutalist",
    },
    details: {
      brief: "Can an entire experiential spatial narrative be communicated through raw monospaced ASCII glyphs without standard photorealistic rendering?",
      whatICareAbout: "The tension between machine coldness and raw human poetics. I believe constraints like 80-column monospace grids spark deeper imagination than 4K photorealism.",
      designProcess: [
        "Constructed a custom raycasting ASCII render pipeline converting 3D mesh depth buffers into 16 levels of typography (@%#*+=-:.).",
        "Wrote an interactive branching script featuring an elusive architectural entity known as 'The Host'.",
        "Tested keyboard-driven navigation (WASD + mouse look) within strict browser memory budgets.",
        "Balanced retro terminal CRT bloom shaders with crisp typographic readability."
      ],
      experiments: [
        "Raymarch shader test in GLSL evaluating luminance-to-glyph LUT tables.",
        "Typographic contrast test comparing IBM VGA 8x16 font with modern monospace font families.",
        "Multiplayer terminal chat prototype using WebSocket peer synchronization."
      ],
      finalOutcome: "A fully playable browser-based 3D ASCII architectural labyrinth where visitors explore rooms constructed entirely out of text, discovering interactive prose fragments.",
      media: [
        {
          type: "artifact",
          caption: "The Exterior Courtyard rendered at 120x45 terminal resolution.",
          aspectRatio: "video"
        },
        {
          type: "quote",
          caption: "\"Now, I can't keep calling you you. It's dreadfully impersonal, and I do so hate being impersonal.\" — The Host",
          aspectRatio: "square"
        }
      ],
      reflections: "When you strip graphics down to pure glyphs, the reader's imagination fills in the shadows. The screen becomes a collaborative hallucination.",
      externalLinks: [
        { label: "Live Terminal Demo", url: "https://github.com", type: "prototype" },
        { label: "Source Code on GitHub", url: "https://github.com", type: "github" }
      ]
    }
  },
  {
    id: "project-03",
    number: "03",
    studentName: "Maya Chen",
    studentRole: "Information & Sensory Designer",
    studentBio: "Rethinking public wayfinding systems through tactile cartography and non-visual cognitive spatial mapping.",
    avatarSeed: "Maya",
    projectTitle: "Tactile Cartographies",
    subtitle: "Sensory wayfinding for high-density metropolitan transit interchanges",
    category: "Tactile Systems",
    year: "2026",
    tags: ["Wayfinding", "Inclusive Design", "Sensory Maps", "Haptics"],
    coverStyle: {
      bgGradient: "from-sky-900 via-blue-950 to-indigo-950",
      accentColor: "#38bdf8",
      spineColor: "#0284c7",
      textColor: "#f0f9ff",
      badgeText: "MAP / 03",
      layoutType: "blueprint-lines",
    },
    details: {
      brief: "How can multi-modal tactile and acoustic wayfinding empower visually impaired commuters at complex multi-tier bus interchanges?",
      whatICareAbout: "Accessibility should never be an afterthought bolted onto visual-first design; it should be the core generator of spatial beauty and dignity.",
      designProcess: [
        "Shadowed commuters with varied visual impairments through busy central transit interchanges.",
        "Developed 3D-printed relief tiles testing groove depths ranging from 0.8mm to 2.4mm for finger sensitivity.",
        "Created an ambient directional sound chime matrix mapped to tactile floor thresholds.",
        "Synthesized findings into an open-source inclusive transit design manual."
      ],
      experiments: [
        "Blind navigation testing using thermoformed swell-paper transit maps.",
        "Dual-frequency haptic vibration motor prototypes embedded in wearable cane handles.",
        "Contrast legibility studies under harsh sodium-vapor night station lights."
      ],
      finalOutcome: "A tactile interchange kit comprising modular tactile floor plates, audio beacons, and pocket-sized tactile transit guides.",
      media: [
        {
          type: "diagram",
          caption: "Multi-sensory transit route mapping layer across underground junctions.",
          aspectRatio: "video"
        }
      ],
      reflections: "True accessibility changes how sighted people experience space too. Good wayfinding reduces anxiety for every human being.",
      externalLinks: [
        { label: "Wayfinding Kit Documentation", url: "https://github.com", type: "publication" }
      ]
    }
  },
  {
    id: "project-04",
    number: "04",
    studentName: "Tara Sundaram",
    studentRole: "Typographer & Editorial Artist",
    studentBio: "Investigating vernacular street typography of hand-painted commercial signage and its digital translation.",
    avatarSeed: "Tara",
    projectTitle: "The Kinfolk Rhythm",
    subtitle: "Vernacular hand-lettering in contemporary editorial layouts",
    category: "Editorial Design",
    year: "2026",
    tags: ["Vernacular Type", "Editorial", "Multilingual", "Screen Printing"],
    coverStyle: {
      bgGradient: "from-rose-500 via-red-600 to-amber-600",
      accentColor: "#fef08a",
      spineColor: "#b91c1c",
      textColor: "#ffffff",
      badgeText: "TYPE // 04",
      layoutType: "swiss-grid",
    },
    details: {
      brief: "How can hand-painted commercial signwriting traditions inform modern multi-script typographic systems on the web?",
      whatICareAbout: "The human hand in letterforms. In our hyper-standardized digital font world, the slight idiosyncrasies of signpainters contain cultural histories that must survive.",
      designProcess: [
        "Photographed and catalogued 300+ hand-painted shop boards across historic commercial districts.",
        "Apprenticed with master sign painters to understand brush strokes and pigment mixing.",
        "Digitized baseline curves into variable font axes: Stroke Fluctuation, Slant, and Terminal Flare.",
        "Typeset a 120-page multilingual poetry anthology combining regional scripts and Latin typography."
      ],
      experiments: [
        "Variable font weight tests balancing Latin serifs with circular conjuncts.",
        "Silk-screen printing experiments using natural indigo and madder root extracts.",
        "Dynamic web typography layout adapting to screen tilt via device gyroscope."
      ],
      finalOutcome: "A bilingual variable typeface family named 'Kavi' paired with an experimental risograph publication documenting oral histories of commercial sign artists.",
      media: [
        {
          type: "artifact",
          caption: "Risograph specimen sheet showing weight axes from Hairline to Ultra-Display.",
          aspectRatio: "portrait"
        }
      ],
      reflections: "Type is not just a container for speech; it is the visual dialect of the street.",
      externalLinks: [
        { label: "Variable Font Specimen", url: "https://github.com", type: "prototype" }
      ]
    }
  },
  {
    id: "project-05",
    number: "05",
    studentName: "Kiran Rao",
    studentRole: "Generative Artist & Computational Designer",
    studentBio: "Developing algorithmic growth simulations inspired by rainforest endemic mosses and epiphytes.",
    avatarSeed: "Kiran",
    projectTitle: "Algorithmic Flora",
    subtitle: "Generative biological growth systems and ecological data sculptures",
    category: "Speculative UI",
    year: "2026",
    tags: ["Generative Art", "L-Systems", "Ecological Data", "WebGL"],
    coverStyle: {
      bgGradient: "from-emerald-950 via-teal-900 to-slate-900",
      accentColor: "#4ade80",
      spineColor: "#065f46",
      textColor: "#ecfdf5",
      badgeText: "SEED:05",
      layoutType: "generative-mesh",
    },
    details: {
      brief: "Can algorithmic computational design evoke genuine ecological empathy rather than merely serving as abstract decorative mathematics?",
      whatICareAbout: "The delicate symbiotic loops in rainforest canopies. Code is often used to exploit nature; I want code that bows down to nature's complexity.",
      designProcess: [
        "Conducted field studies documenting lichen branching ratios and fungal hyphae networks.",
        "Implemented differential growth and reaction-diffusion algorithms in custom GLSL fragment shaders.",
        "Connected live regional precipitation and humidity sensor streams to parameterize branch curl.",
        "Developed 3D parametric sculptural forms for clay 3D printing."
      ],
      experiments: [
        "Space colonization algorithm varying nutrient point attraction density.",
        "Real-time shader feedback loops simulating moss lichen spread over time.",
        "Ceramic slip casting using generative 3D printed molds."
      ],
      finalOutcome: "An interactive living digital terrarium that mutates in real time based on climate sensor inputs, accompanied by 3D ceramic ecological vessels.",
      media: [
        {
          type: "artifact",
          caption: "Interactive terrarium viewport: Lichen cluster branching in real-time GLSL.",
          aspectRatio: "video"
        }
      ],
      reflections: "Nature's algorithms don't seek optimization for speed; they optimize for resilience and diversity.",
      externalLinks: [
        { label: "Live Generative Terrarium", url: "https://github.com", type: "prototype" }
      ]
    }
  },
  {
    id: "project-06",
    number: "06",
    studentName: "Leila Mir",
    studentRole: "Sound Artist & Acoustic Ethnographer",
    studentBio: "Mapping psychoacoustic thresholds and urban silence refuges in rapid-transit mega-cities.",
    avatarSeed: "Leila",
    projectTitle: "Ghost Signals",
    subtitle: "Auditory prosthetics, urban frequency cartographies, and the ecology of silence",
    category: "Sound & Sense",
    year: "2026",
    tags: ["Soundscapes", "Acoustic Ecology", "Sonic Archive", "Sensory Prosthetics"],
    coverStyle: {
      bgGradient: "from-purple-950 via-violet-900 to-indigo-950",
      accentColor: "#c084fc",
      spineColor: "#6b21a8",
      textColor: "#faf5ff",
      badgeText: "FREQ // 06",
      layoutType: "sonic-bands",
    },
    details: {
      brief: "How does chronic sonic pollution reshape our neurological perception of public space, and where do cities retain acoustic sanctuary?",
      whatICareAbout: "Silence as a social justice issue. Quieter neighborhoods are often privileges of wealth; acoustic peace should be a fundamental public right.",
      designProcess: [
        "Carried out 120 binaural field recordings across industrial corridors and city parks.",
        "Created a spectrogram visualizer mapping low-frequency rumble (sub-60Hz) from metro rail construction.",
        "Designed acoustic filtering headpieces that isolate pleasant biophonic sounds while dimming mechanical droning.",
        "Built an interactive listening room installation with spatial surround audio."
      ],
      experiments: [
        "Bone conduction headphone modifications for selective spatial listening.",
        "Acoustic resonant chambers cast in lightweight acoustic concrete.",
        "Spectrogram frequency embroidery on heavy wool blankets."
      ],
      finalOutcome: "A spatial sound installation, an interactive online sonic atlas, and a wearable acoustic dampening cowl.",
      media: [
        {
          type: "diagram",
          caption: "Sonic cartography of park dawn versus highway junction peak hour.",
          aspectRatio: "video"
        }
      ],
      reflections: "When you close your eyes, the city reveals its true skeleton through sound waves.",
      externalLinks: [
        { label: "Acoustic Atlas Bangalore", url: "https://github.com", type: "prototype" }
      ]
    }
  },
  {
    id: "project-07",
    number: "07",
    studentName: "Neil Sengupta",
    studentRole: "Circular Material & Product Designer",
    studentBio: "Prototyping zero-waste garments and modular textile construction systems without thread seams.",
    avatarSeed: "Neil",
    projectTitle: "The Deconstructive Wardrobe",
    subtitle: "Modular interlocking textile assemblies for post-consumer circularity",
    category: "Physical Computing",
    year: "2026",
    tags: ["Circular Design", "Zero Waste", "Modular Fashion", "Material Systems"],
    coverStyle: {
      bgGradient: "from-stone-900 via-neutral-800 to-zinc-900",
      accentColor: "#f59e0b",
      spineColor: "#78350f",
      textColor: "#fafaf9",
      badgeText: "SYSTEM_07",
      layoutType: "abstract-cutout",
    },
    details: {
      brief: "Can everyday garments be assembled through laser-cut interlocking friction joints instead of irreversible stitching threads?",
      whatICareAbout: "Ending the planned obsolescence of fashion. A jacket should be repairable, alterable, and completely disassembled into virgin material fibers in minutes.",
      designProcess: [
        "Tested 35 geometric puzzle joints across recycled felt, canvas, and hemp denim.",
        "Calculated tensile shear limits under active body movement (bending, stretching, sprinting).",
        "Developed a generative vector pattern generator for automated bespoke body measurements.",
        "Constructed 3 fully functional modular outerwear pieces without a single inch of thread."
      ],
      experiments: [
        "Dovetail vs. herringbone interlocking tooth strength tests under hydraulic pull.",
        "Waterproofing tests across slotted joints using beeswax-treated selvedge seams.",
        "User study on self-assembly times with 20 non-designer volunteers."
      ],
      finalOutcome: "A collection of 3 modular garments accompanied by open-source downloadable laser cut files and a material circularity manifesto.",
      media: [
        {
          type: "artifact",
          caption: "Interlocking geometric module details showing zero-thread joint connections.",
          aspectRatio: "square"
        }
      ],
      reflections: "When garments become modular systems, clothing turns into an enduring relationship rather than a disposable commodity.",
      externalLinks: [
        { label: "Open-Source Pattern Generator", url: "https://github.com", type: "prototype" }
      ]
    }
  },
  {
    id: "project-08",
    number: "08",
    studentName: "Pooja Hegde",
    studentRole: "Service Designer & Civic Technologist",
    studentBio: "Designing transparent citizen-led feedback loops for peri-urban waste management and municipal sanitation.",
    avatarSeed: "Pooja",
    projectTitle: "Invisible Infrastructures",
    subtitle: "Civic dignity and real-time welfare transparency in municipal sanitation",
    category: "Service Design",
    year: "2026",
    tags: ["Civic Design", "Service Systems", "Public Policy", "Labor Rights"],
    coverStyle: {
      bgGradient: "from-amber-500 via-orange-600 to-red-700",
      accentColor: "#fef08a",
      spineColor: "#9a3412",
      textColor: "#ffffff",
      badgeText: "CIVIC // 08",
      layoutType: "tactile-diagram",
    },
    details: {
      brief: "How can civic technology bridge the empathy deficit between residential neighborhoods and municipal sanitation workers?",
      whatICareAbout: "Labor dignity. Designers too often build slick apps for affluent consumers while the frontline infrastructure workers keeping our cities alive remain invisible.",
      designProcess: [
        "Participatory co-design workshops with municipal waste workers in peri-urban wards.",
        "Created an SMS & voice IVR tool enabling workers to log hazardous broken glass or bio-waste incidents.",
        "Designed a public dashboard visualizing collection accountability and wage dispersal timeliness.",
        "Presented recommendations to civic ward committee representatives."
      ],
      experiments: [
        "Iconography comprehension tests with non-literate community members.",
        "Physical token feedback systems placed at apartment waste drop-off zones.",
        "Community mapping walks highlighting hazardous collection bottlenecks."
      ],
      finalOutcome: "A comprehensive service blueprint, a low-bandwidth mobile reporting channel, and a community awareness campaign toolkit.",
      media: [
        {
          type: "diagram",
          caption: "Multi-stakeholder service blueprint: From doorstep handover to ward transfer stations.",
          aspectRatio: "video"
        }
      ],
      reflections: "Design without humility is merely decoration. Real service design begins with listening to the people the system usually ignores.",
      externalLinks: [
        { label: "Civic Service Blueprint PDF", url: "https://github.com", type: "publication" }
      ]
    }
  },
  {
    id: "project-09",
    number: "09",
    studentName: "Rohan Verma",
    studentRole: "Open Pedagogy Researcher",
    studentBio: "Investigating distributed authorship, open-source version control, and collective educational web publications.",
    avatarSeed: "Rohan",
    projectTitle: "The Collective Ledger",
    subtitle: "Open pedagogy, shared Git repositories, and democratic design education",
    category: "Editorial Design",
    year: "2026",
    tags: ["Open Pedagogy", "Co-Design", "Git Publishing", "Design Education"],
    coverStyle: {
      bgGradient: "from-blue-600 via-indigo-700 to-slate-900",
      accentColor: "#a5f3fc",
      spineColor: "#1e3a8a",
      textColor: "#ffffff",
      badgeText: "COLLAB / 09",
      layoutType: "kinetic-waves",
    },
    details: {
      brief: "How do design cohorts transition from individual competitive portfolios to a unified collective library built and maintained via open-source tools?",
      whatICareAbout: "The power of collective intellect. Design institutions often celebrate individual stars; we believe the strongest work emerges from radical peer solidarity.",
      designProcess: [
        "Conducted class-wide alignment critiques interrogating ownership and creative commons.",
        "Defined a shared TypeScript data schema that democratizes contribution without gatekeeping.",
        "Built automated CI/CD validation workflows ensuring every classmate's commit passes tests.",
        "Created accessible documentation enabling beginners to deploy via pull requests."
      ],
      experiments: [
        "Simultaneous live markdown writing sessions with 15 contributors.",
        "Peer review matrices evaluating code accessibility and motion ergonomics.",
        "Physical book mockups testing shelf arrangement rhythms."
      ],
      finalOutcome: "The foundational framework and design philosophy powering this very digital library platform.",
      media: [
        {
          type: "quote",
          caption: "\"Everyone contributes through GitHub; the site lives on the public web.\" — Class Charter",
          aspectRatio: "square"
        }
      ],
      reflections: "A website is never finished; it is a garden tended by many hands.",
      externalLinks: [
        { label: "Class GitHub Repository", url: "https://github.com", type: "github" }
      ]
    }
  },
  {
    id: "project-10",
    number: "10",
    studentName: "Zoya Varma",
    studentRole: "Motion & Graphic Designer",
    studentBio: "Investigating the kinetic rhythm of calligraphy translated into generative physics-based motion curves.",
    avatarSeed: "Zoya",
    projectTitle: "Chrono-Glyph: Kinetic Letters",
    subtitle: "Fluid dynamics and variable stroke weights in motion typography",
    category: "Visual Essay",
    year: "2026",
    tags: ["Kinetic Type", "Motion Systems", "Fluid Dynamics", "Typography"],
    coverStyle: {
      bgGradient: "from-yellow-400 via-amber-500 to-red-600",
      accentColor: "#ffffff",
      spineColor: "#d97706",
      textColor: "#1c1917",
      badgeText: "TIME // 10",
      layoutType: "minimal-typographic",
    },
    details: {
      brief: "How can traditional reed pen ink velocity be simulated through modern physics engines for responsive kinetic typography?",
      whatICareAbout: "The breath in writing. In traditional Indian calligraphy, the letterform is an exhale. I want digital motion graphics to breathe with that same organic cadence.",
      designProcess: [
        "Studied historic Devnagari manuscripts in the National Museum archives.",
        "Digitized brush pressure coordinates using high-speed optical capture.",
        "Built a spring-mass physics simulator in WebGL that reacts to user scroll velocity.",
        "Created an interactive typographic poster series for experimental cinema."
      ],
      experiments: [
        "Viscosity decay experiments simulating drying ink on handmade paper.",
        "Interactive sound-reactive typography modulated by classical musical ragas.",
        "Variable font interpolation driven by cursor momentum."
      ],
      finalOutcome: "A kinetic type toolkit for web designers and a dynamic motion poster exhibition.",
      media: [
        {
          type: "artifact",
          caption: "Devnagari ligature deformed by real-time physics vectors.",
          aspectRatio: "video"
        }
      ],
      reflections: "Letters are not static bricks; they are gestures frozen in time.",
      externalLinks: [
        { label: "Interactive Typographic Tool", url: "https://github.com", type: "prototype" }
      ]
    }
  },
  {
    id: "project-11",
    number: "11",
    studentName: "Dev Menon",
    studentRole: "Behavioral & Experience Designer",
    studentBio: "Designing deliberate friction into digital tools to combat mindless doomscrolling and attention fragmentation.",
    avatarSeed: "Dev",
    projectTitle: "Subtle Friction",
    subtitle: "Calm technology, intentional resistance, and meditative digital interfaces",
    category: "Speculative UI",
    year: "2026",
    tags: ["Calm Technology", "Mindfulness", "Friction Design", "Digital Wellbeing"],
    coverStyle: {
      bgGradient: "from-teal-800 via-cyan-900 to-slate-900",
      accentColor: "#5eead4",
      spineColor: "#0f766e",
      textColor: "#f0fdfa",
      badgeText: "CALM : 11",
      layoutType: "solar-glow",
    },
    details: {
      brief: "Why is seamlessness always assumed to be a virtue in UX? What if interfaces asked us to pause, breathe, and commit thoughtfully?",
      whatICareAbout: "Preserving human autonomy against addictive attention engineering. Good design should give people their time back.",
      designProcess: [
        "Conducted a 14-day screen-time intervention study with 25 college students.",
        "Engineered intentional micro-delays (gradual font sharpening, breath synchronization).",
        "Developed a browser extension that asks users to write one reflective sentence before visiting distracting feeds.",
        "Analyzed qualitative cognitive load shifts using diary studies."
      ],
      experiments: [
        "Resistance scrolling simulating pulling through viscous fluid.",
        "Typographic degradation when scrolling faster than human comprehension speed.",
        "Physical desktop peripheral: a stone-weighted dial controlling screen brightness."
      ],
      finalOutcome: "A suite of deliberate micro-friction UI components and an interactive editorial essay on the politics of frictionless tech.",
      media: [
        {
          type: "diagram",
          caption: "Cognitive attention curves: Seamless feeds vs. Frictional pausing.",
          aspectRatio: "square"
        }
      ],
      reflections: "Friction is not failure; friction is the moment consciousness returns.",
      externalLinks: [
        { label: "Read the Essay & Interactive Demo", url: "https://github.com", type: "prototype" }
      ]
    }
  },
  {
    id: "project-12",
    number: "12",
    studentName: "Kabir Joshi",
    studentRole: "Physical Computing & Hardware Hacker",
    studentBio: "Blending Japanese origami folding logic with conductive carbon inks and analog microcontrollers.",
    avatarSeed: "Kabir",
    projectTitle: "Paper Computing",
    subtitle: "Biodegradable interactive origami sensors and soft computational circuits",
    category: "Physical Computing",
    year: "2026",
    tags: ["Origami Circuits", "Biodegradable Tech", "Carbon Ink", "Paper Mechanics"],
    coverStyle: {
      bgGradient: "from-stone-200 via-zinc-300 to-amber-100",
      accentColor: "#18181b",
      spineColor: "#52525b",
      textColor: "#09090b",
      badgeText: "FOLD // 12",
      layoutType: "origami-fold",
    },
    details: {
      brief: "Can electronics be folded rather than soldered, and composted rather than buried in electronic waste landfills?",
      whatICareAbout: "Demystifying hardware. Computing shouldn't be locked inside sealed aluminum boxes; it can be made of paper, graphite, and folded geometry.",
      designProcess: [
        "Researched traditional Miura-ori and waterbomb tessellation fold patterns.",
        "Formulated conductive DIY graphite-gelatin ink pastes for screen-printing on cotton paper.",
        "Built paper accordion synths and pressure-sensitive tactile origami keyboards.",
        "Tested biodegradation rates in garden soil over a 6-month trial."
      ],
      experiments: [
        "Tessellated sheet resistance measurement across 200 repeated fold cycles.",
        "Saltwater activated paper battery cells producing 1.2V.",
        "Children's interactive pop-up book with sound-generating touch points."
      ],
      finalOutcome: "A collection of 5 functioning paper computing artifacts and an instructional fold-and-wire zine for secondary school STEM classes.",
      media: [
        {
          type: "artifact",
          caption: "Miura-ori folding switch that alters musical pitch based on expansion angle.",
          aspectRatio: "square"
        }
      ],
      reflections: "The fragility of paper makes you treat the technology with care. Electronics become tender.",
      externalLinks: [
        { label: "Paper Circuits Zine (PDF)", url: "https://github.com", type: "publication" }
      ]
    }
  },
  {
    id: "project-13",
    number: "13",
    studentName: "Ananya Rao",
    studentRole: "Speculative Ecologist & Narrative Designer",
    studentBio: "Imagining urban flood mitigation artifacts and amphibious architecture for climate-resilient cities in 2060.",
    avatarSeed: "Ananya",
    projectTitle: "Speculative Monsoon",
    subtitle: "Archaeologies of urban lakes, amphibious artifacts, and climatic folklore",
    category: "Visual Essay",
    year: "2026",
    tags: ["Speculative Design", "Climate Futures", "Urban Ecology", "Artifact Prototyping"],
    coverStyle: {
      bgGradient: "from-sky-700 via-blue-800 to-teal-900",
      accentColor: "#38bdf8",
      spineColor: "#0369a1",
      textColor: "#f0f9ff",
      badgeText: "2060 : 13",
      layoutType: "botanical-glyph",
    },
    details: {
      brief: "How can speculative design artifacts make abstract climate modeling tangible and culturally grounded in local water systems?",
      whatICareAbout: "The forgotten lake networks of historic urban settlements. Before concrete covered our stormwater canals, cities were designed around water flow. We must remember.",
      designProcess: [
        "Studied 18th-century irrigation maps alongside current satellite flood topography.",
        "Prototyped 4 speculative everyday objects from a future flooded district (floating filtration lanterns, silt harvesting ladles).",
        "Wrote an accompanying fictional oral history podcast featuring water elders.",
        "Curated an exhibition in an old water reservoir chamber."
      ],
      experiments: [
        "Terracotta clay porosity filtration tests using local lake mud.",
        "Bioluminescent algae culture growth in custom blown-glass vessels.",
        "Community speculative scenario workshops with lake ward activists."
      ],
      finalOutcome: "A speculative design archive featuring 4 physical speculative artifacts, speculative maps, and an illustrated hardbound chronicle.",
      media: [
        {
          type: "artifact",
          caption: "Speculative rainwater filtration flask with hand-carved local granite weights.",
          aspectRatio: "portrait"
        }
      ],
      reflections: "Speculative design is not about predicting a dystopian doom; it is about keeping alternative futures alive in the present.",
      externalLinks: [
        { label: "Chronicle of Water Futures", url: "https://github.com", type: "publication" }
      ]
    }
  },
  {
    id: "project-14",
    number: "14",
    studentName: "Farhan Qureshi",
    studentRole: "Sound & Social Anthropologist",
    studentBio: "Recording oral histories, ambient market calls, and acoustic rhythms of historic bazaar communities.",
    avatarSeed: "Farhan",
    projectTitle: "Echoes of the Old Bazaar",
    subtitle: "Acoustic anthropology and oral heritage of generational market traders",
    category: "Sound & Sense",
    year: "2026",
    tags: ["Oral History", "Soundwalk", "Acoustic Heritage", "Community Archive"],
    coverStyle: {
      bgGradient: "from-amber-700 via-red-800 to-stone-900",
      accentColor: "#fde047",
      spineColor: "#7c2d12",
      textColor: "#ffffff",
      badgeText: "BAZAAR : 14",
      layoutType: "archival-stamp",
    },
    details: {
      brief: "How do generational market traders preserve community identity through vocal calls and ambient trade sounds that resist gentrification?",
      whatICareAbout: "The oral culture of everyday labor. Standard museum archives privilege written texts, yet the heartbeat of a bazaar lives in the human voice.",
      designProcess: [
        "Spent 4 months recording morning fruit auctions, flower strand counting rhythms, and chai stall conversations.",
        "Co-designed a geolocated smartphone soundwalk app with local youth.",
        "Created archival cassette tape recordings gifted back to participating vendor families.",
        "Synthesized sound patterns into visual rhythm notation books."
      ],
      experiments: [
        "Binaural directional microphone mounting on vendor pushcarts.",
        "Audio compression tests over mobile voice note distribution networks.",
        "Printed sound notation posters hung in local teashops."
      ],
      finalOutcome: "A publicly accessible geolocated interactive sound map, an archival cassette box set, and an oral history publication in three regional languages.",
      media: [
        {
          type: "diagram",
          caption: "Chrono-acoustic map of the central bazaar from 4:00 AM auction to 10:00 PM closing.",
          aspectRatio: "video"
        }
      ],
      reflections: "A city's heritage is not merely stones and monuments; it is the songs of people earning their living.",
      externalLinks: [
        { label: "Interactive Soundwalk Map", url: "https://github.com", type: "prototype" }
      ]
    }
  },
  {
    id: "project-15",
    number: "15",
    studentName: "Mira Nambiar",
    studentRole: "Book Arts & Editorial Sculptor",
    studentBio: "Pushing physical boundaries of bookbinding, accordion spreads, and non-linear narrative reading experiences.",
    avatarSeed: "Mira",
    projectTitle: "Between the Folds",
    subtitle: "Architectural book structures, leporello bindings, and tactile reading sequences",
    category: "Editorial Design",
    year: "2026",
    tags: ["Bookbinding", "Editorial Sculpture", "Tactile Publishing", "Materiality"],
    coverStyle: {
      bgGradient: "from-violet-900 via-fuchsia-950 to-slate-950",
      accentColor: "#f472b6",
      spineColor: "#831843",
      textColor: "#fdf2f8",
      badgeText: "CODEX : 15",
      layoutType: "playful-duotone",
    },
    details: {
      brief: "How can the physical format of a codex challenge standard left-to-right sequential reading and invite spatial physical choreography?",
      whatICareAbout: "The book as an architectural sculpture. Turning a page is not just visual; it is a mechanical, tactile, and spatial act.",
      designProcess: [
        "Folded over 70 structural paper prototypes including flag books, tunnel books, and dos-à-dos bindings.",
        "Hand-stitched experimental spines using waxed linen thread and exposed coptic sewing.",
        "Typeset bilingual prose about maritime spice trade routes.",
        "Produced a limited edition of 20 hand-bound artist books on cotton rag paper."
      ],
      experiments: [
        "Paper hinge durability testing under 500 mechanical open/close motions.",
        "Laser-cut pop-up shadow play tests using miniature directional LED lighting.",
        "Blind debossing tests without ink for sensory finger reading."
      ],
      finalOutcome: "A sculptured 3-meter unfolding leporello book that stands unassisted as a spatial gallery installation, accompanied by a digital companion reader.",
      media: [
        {
          type: "artifact",
          caption: "Hand-stitched coptic binding with exposed spine threads and debossed cover boards.",
          aspectRatio: "square"
        }
      ],
      reflections: "When you hold a well-crafted book, you are holding centuries of human mechanical engineering in the palm of your hand.",
      externalLinks: [
        { label: "Book Arts Process Gallery", url: "https://github.com", type: "publication" }
      ]
    }
  }
];
