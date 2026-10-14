/**
 * THE BANGALORE PUB TRAIL '26 - STORYBOOK TRAIL ENGINE
 * Hand-drawn aesthetic inspired by adventure exploration maps
 */

// =============================================================================
// 1. DATA: 15 ICONIC BANGALORE PUBS & GROUP MEMBER PROJECTS
// =============================================================================

const DEFAULT_PUBS_DATA = [
  {
    id: "byg-brewski",
    number: 1,
    name: "Byg Brewski Brewing Co.",
    area: "North-East",
    locationDetail: "Hennur / Sarjapur (Lakeside Reach)",
    techCategory: "AI/ML",
    color: "#06b6d4",
    icon: "fa-water",
    vibeTag: "Open-Air Koi Pond & Nordic Ale",
    barSnack: "Smoky Pulled Chicken Pizza",
    x: 280,
    y: 110,
    member: {
      name: "Kabir Malhotra",
      role: "Big Data & Distributed MLOps",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&auto=format&fit=crop&q=80",
      quote: "Asia's largest open-air brewpub scaled to enterprise-scale LLM training clusters.",
      github: "https://github.com/kabir-malhotra/megacluster",
      linkedin: "https://linkedin.com/in/kabir-mlops",
      portfolio: "https://kabir.ai"
    },
    project: {
      title: "MegaCluster &mdash; ML Pipeline Engine",
      category: "AI/ML / Infra",
      description: "Automated distributed model training & quantization pipeline coordinator supporting multi-node GPU slicing and dynamic LoRA routing.",
      drinkName: "Byg Smoke Lager & Pond Ale",
      drinkAbv: "ABV: 6.8%",
      drinkNotes: "Beechwood smoked barley, open-air koi pond vibes, vLLM inference orchestration, and Ray core.",
      techStack: ["PyTorch", "vLLM", "Ray.io", "Kubernetes", "CUDA", "FastAPI"],
      highlights: [
        "Automatic tensor parallel orchestration across hybrid GPU nodes",
        "Reduces LLM cold-start inference time from 40s to 1.8s",
        "Integrated dynamic memory cache sharing across continuous batching"
      ],
      metrics: { commits: 467, loc: "39,800", coverage: "95.0%", latency: "1.8s TTFT", caffeine: "240 Cups" },
      liveUrl: "https://megacluster-ai.com",
      repoUrl: "https://github.com/kabir-malhotra/megacluster"
    }
  },
  {
    id: "watsons",
    number: 2,
    name: "Watson's",
    area: "Indiranagar",
    locationDetail: "Indiranagar / Vasanth Nagar",
    techCategory: "Systems",
    color: "#14b8a6",
    icon: "fa-tree",
    vibeTag: "Tree Canopy Balcony Sips",
    barSnack: "Crispy Calamari Rings & Pepper Corn",
    x: 480,
    y: 130,
    member: {
      name: "Maya Kulkarni",
      role: "IoT & Embedded Systems Engineer",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80",
      quote: "Balcony breeze, grumpy uncle conversations, and low-power mesh networks.",
      github: "https://github.com/maya-kulkarni/sensorgrid",
      linkedin: "https://linkedin.com/in/maya-kulkarni-iot",
      portfolio: "https://mayak.dev"
    },
    project: {
      title: "SensorGrid &mdash; Urban Telemetry Network",
      category: "IoT / Embedded",
      description: "Solar-powered LoRa mesh network for real-time air quality, water level, and traffic congestion sensing across Bangalore municipal wards.",
      drinkName: "Grumpy Uncle's Gin & Tonic",
      drinkAbv: "ABV: 5.8%",
      drinkNotes: "Juniper botanicals, Indian tonic, cucumber slice, ESP32 FreeRTOS firmware, and LoRaWAN packets.",
      techStack: ["C / C++ (ESP-IDF)", "FreeRTOS", "LoRaWAN", "InfluxDB", "Grafana"],
      highlights: [
        "Over 85 autonomous solar sensor nodes deployed across Bangalore city",
        "Battery life lasting 3.5+ years on a single LiFePO4 cell charge",
        "Public open-data API accessed by environmental researchers"
      ],
      metrics: { commits: 355, loc: "22,900", coverage: "94.0%", latency: "800ms Mesh", caffeine: "180 Cups" },
      liveUrl: "https://sensorgrid-bengaluru.org",
      repoUrl: "https://github.com/maya-kulkarni/sensorgrid"
    }
  },
  {
    id: "toit",
    number: 3,
    name: "Toit Brewpub",
    area: "Indiranagar",
    locationDetail: "100 Feet Rd, Indiranagar",
    techCategory: "Fullstack",
    color: "#f59e0b",
    icon: "fa-beer-mug-empty",
    vibeTag: "Courtyard Brewery Legends",
    barSnack: "Tintin Beer Batter Fish & Chips",
    x: 690,
    y: 170,
    member: {
      name: "Priya Sundaram",
      role: "3D WebGL & Graphics Engineer",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&auto=format&fit=crop&q=80",
      quote: "Rendering micro-details with the golden crispness of a fresh Tintin Toit.",
      github: "https://github.com/priyasundaram/aerocanvas",
      linkedin: "https://linkedin.com/in/priya-sundaram",
      portfolio: "https://priyas.design"
    },
    project: {
      title: "AeroCanvas &mdash; WebGL 3D Shader Studio",
      category: "Graphics / WebGL",
      description: "Browser-based procedural 3D world generator and shader graph editor running realtime raymarching shaders at 120 FPS.",
      drinkName: "Tintin Toit Belgian Wit",
      drinkAbv: "ABV: 5.4%",
      drinkNotes: "Aromatic coriander seeds, sweet orange peel, custom WebGL fragment shaders, and compute passes.",
      techStack: ["Three.js", "GLSL Shaders", "WebGPU", "TypeScript", "TailwindCSS"],
      highlights: [
        "Visual node-based shader graph editor with instant live compiling",
        "Hardware-accelerated volumetrics and bloom post-processing",
        "Exportable directly to React Three Fiber and Unity GLTF"
      ],
      metrics: { commits: 418, loc: "31,200", coverage: "92.1%", latency: "120 FPS", caffeine: "210 Cups" },
      liveUrl: "https://aerocanvas-studio.vercel.app",
      repoUrl: "https://github.com/priyasundaram/aerocanvas"
    }
  },
  {
    id: "bobs-bar",
    number: 4,
    name: "Bob's Bar",
    area: "Indiranagar",
    locationDetail: "100 Feet Rd, Indiranagar",
    techCategory: "Fullstack",
    color: "#10b981",
    icon: "fa-mug-hot",
    vibeTag: "Udupi Military Meets Draught",
    barSnack: "Mysore Mutton Pepper Fry & Kanti Sweets",
    x: 770,
    y: 280,
    member: {
      name: "Aarav Sharma",
      role: "Lead Fullstack & Voice AI Architect",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80",
      quote: "Built with the resilience of a Sunday evening crowd at Bob's Bar.",
      github: "https://github.com/aarav-sharma/filter-ai",
      linkedin: "https://linkedin.com/in/aarav-sharma-dev",
      portfolio: "https://aarav.dev"
    },
    project: {
      title: "FilterAI &mdash; Edge Voice Translator",
      category: "Fullstack / Edge AI",
      description: "Ultra-low latency real-time voice translation pipeline optimized for vernacular Indian languages using WebAssembly SIMD and WebRTC streams.",
      drinkName: "Mysore Filter Coffee Stout",
      drinkAbv: "ABV: 8.5%",
      drinkNotes: "Rich notes of dark roasted Chicory beans, WebAssembly SIMD kernels, and ultra-fast WebSockets.",
      techStack: ["Next.js 14", "WebAssembly", "WebRTC", "FastAPI", "Redis Streams", "Docker"],
      highlights: [
        "Sub-85ms end-to-end translation latency on edge devices",
        "Supports 12 regional Indian languages with auto-accent tuning",
        "Zero cloud audio retention for privacy compliance"
      ],
      metrics: { commits: 342, loc: "24,800", coverage: "96.4%", latency: "74ms", caffeine: "168 Cups" },
      liveUrl: "https://filterai-demo.vercel.app",
      repoUrl: "https://github.com/aarav-sharma/filter-ai"
    }
  },
  {
    id: "church-street-social",
    number: 5,
    name: "Church Street Social",
    area: "Central",
    locationDetail: "Church Street, Central Bangalore",
    techCategory: "AI/ML",
    color: "#8b5cf6",
    icon: "fa-book-open",
    vibeTag: "Bookstore Walks & Neon Signs",
    barSnack: "Kit Kat Shake & Cheesy Poppers",
    x: 580,
    y: 270,
    member: {
      name: "Tanya Kapoor",
      role: "GenAI Experience & UI/UX Specialist",
      avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=200&auto=format&fit=crop&q=80",
      quote: "Bookstore street walks and generative design algorithms in harmony.",
      github: "https://github.com/tanya-kapoor/moodpalette",
      linkedin: "https://linkedin.com/in/tanya-kapoor-ux",
      portfolio: "https://tanya.design"
    },
    project: {
      title: "MoodPalette &mdash; GenAI Design Engine",
      category: "AI/ML / Design",
      description: "Generates production-grade design tokens, accessible color scales, and interactive CSS component libraries from moodboards.",
      drinkName: "Kit Kat Shake & Bourbon",
      drinkAbv: "ABV: 4.8%",
      drinkNotes: "Rich chocolate wafer crunch, bourbon caramel, stable diffusion latent representations, and WCAG AAA compliance.",
      techStack: ["Next.js", "HuggingFace", "TailwindCSS", "Figma API", "Web Audio API"],
      highlights: [
        "One-click Figma plugin export for whole design system generation",
        "100% automated contrast score auditing and dark-mode adaptation",
        "Recognized on ProductHunt #2 Product of the Day"
      ],
      metrics: { commits: 312, loc: "21,600", coverage: "93.4%", latency: "220ms", caffeine: "155 Cups" },
      liveUrl: "https://moodpalette-ai.design",
      repoUrl: "https://github.com/tanya-kapoor/moodpalette"
    }
  },
  {
    id: "pecos",
    number: 6,
    name: "Pecos Pub",
    area: "Central",
    locationDetail: "Rest House Road, off Brigade Road",
    techCategory: "Systems",
    color: "#e63946",
    icon: "fa-guitar",
    vibeTag: "70s Classic Rock & Retro Cassettes",
    barSnack: "Spicy Chilli Pork & Steamed Dosa",
    x: 430,
    y: 260,
    member: {
      name: "Rohan Varma",
      role: "Distributed Systems & Rust Engineer",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80",
      quote: "Classic 70s rock, vintage posters, and zero-cost memory safety abstractions.",
      github: "https://github.com/rohan-varma/retrostream",
      linkedin: "https://linkedin.com/in/rohan-varma-systems",
      portfolio: "https://rohanv.io"
    },
    project: {
      title: "RetroStream &mdash; P2P Hi-Fi Audio Mesh",
      category: "Systems / P2P",
      description: "Decentralized lossless FLAC peer-to-peer streaming protocol written in Rust with automated hole punching and distributed gossip state.",
      drinkName: "Classic Rock Draught Pitcher",
      drinkAbv: "ABV: 7.2%",
      drinkNotes: "Smoky malt, retro vinyl vibes, Tokio async runtimes, and zero-allocation ring buffers.",
      techStack: ["Rust", "Tokio", "Libp2p", "WebAssembly", "QUIC Protocol"],
      highlights: [
        "Sub-10ms peer discovery over custom UDP punch channels",
        "Handles 50,000 concurrent listeners per node with 35MB RAM footprint",
        "Cryptographic proof of bandwidth relay contribution"
      ],
      metrics: { commits: 512, loc: "42,100", coverage: "98.7%", latency: "< 12ms", caffeine: "280 Cups" },
      liveUrl: "https://retrostream-mesh.io",
      repoUrl: "https://github.com/rohan-varma/retrostream"
    }
  },
  {
    id: "downtown-pub",
    number: 7,
    name: "Downtown Pub",
    area: "Central",
    locationDetail: "Residency Road, Bangalore",
    techCategory: "Fullstack",
    color: "#6366f1",
    icon: "fa-gamepad",
    vibeTag: "Oldest Pub in Town & Retro Rock",
    barSnack: "Vintage Rum Masala Peanuts",
    x: 270,
    y: 280,
    member: {
      name: "Neil D'Souza",
      role: "Game Engine & WebGPU Developer",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80",
      quote: "One of Bangalore's oldest pubs paired with bleeding-edge GPU compute shaders.",
      github: "https://github.com/neil-dsouza/cyberdrift",
      linkedin: "https://linkedin.com/in/neil-dsouza-games",
      portfolio: "https://neildsouza.dev"
    },
    project: {
      title: "CyberDrift &mdash; WebGPU Raymarched Racer",
      category: "Game Dev / WebGPU",
      description: "An in-browser retro-futuristic arcade racing game engine featuring custom signed-distance field (SDF) physics and volumetric smoke.",
      drinkName: "Old Monk Vintage Cola Pitcher",
      drinkAbv: "ABV: 8.0%",
      drinkNotes: "Aged dark rum, vanilla cola, WebGPU compute pipelines, and custom physics solver.",
      techStack: ["WebGPU", "TypeScript", "WGSL Shaders", "WebAudio API", "Rapier Physics"],
      highlights: [
        "Zero external textures &mdash; everything procedurally generated via WGSL shaders",
        "Deterministic multiplayer netcode with rollback interpolation",
        "Runs locked 60 FPS on mobile browsers"
      ],
      metrics: { commits: 528, loc: "44,600", coverage: "91.0%", latency: "60 FPS GPU", caffeine: "295 Cups" },
      liveUrl: "https://cyberdrift-game.dev",
      repoUrl: "https://github.com/neil-dsouza/cyberdrift"
    }
  },
  {
    id: "communiti",
    number: 8,
    name: "Communiti",
    area: "Central",
    locationDetail: "Residency Road, Bangalore",
    techCategory: "Systems",
    color: "#3b82f6",
    icon: "fa-network-wired",
    vibeTag: "Sunlit Courtyard Microbrewery",
    barSnack: "Woodfire Sourdough Garlic Bread",
    x: 210,
    y: 390,
    member: {
      name: "Dev Patel",
      role: "DevOps & Cloud Platform Engineer",
      avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=200&auto=format&fit=crop&q=80",
      quote: "Open courtyards and open-source infrastructure tools.",
      github: "https://github.com/dev-patel/kubecompass",
      linkedin: "https://linkedin.com/in/dev-patel-devops",
      portfolio: "https://devpatel.io"
    },
    project: {
      title: "KubeCompass &mdash; Visual Fleet Manager",
      category: "DevOps / Infra",
      description: "Interactive visual topology map for multi-region Kubernetes clusters with live blast-radius simulations and cost heatmaps.",
      drinkName: "Belgian Blonde Ale & Pizza",
      drinkAbv: "ABV: 6.4%",
      drinkNotes: "Subtle fruitiness, golden barley, eBPF network tracing, and visual dependency DAGs.",
      techStack: ["Go (Golang)", "React Flow", "eBPF", "Kubernetes Operator", "WebSockets"],
      highlights: [
        "Live eBPF packet sniffing shows real pod-to-pod network traffic flows",
        "Simulates deployment failure blast radius prior to prod rollouts",
        "Over 2,800 GitHub stars within first month of release"
      ],
      metrics: { commits: 420, loc: "33,700", coverage: "96.5%", latency: "< 50ms Sync", caffeine: "225 Cups" },
      liveUrl: "https://kubecompass.dev",
      repoUrl: "https://github.com/dev-patel/kubecompass"
    }
  },
  {
    id: "chin-lung",
    number: 9,
    name: "Chin Lung Resto-Bar",
    area: "Central",
    locationDetail: "Residency Road, Central Bangalore",
    techCategory: "Systems",
    color: "#84cc16",
    icon: "fa-champagne-glasses",
    vibeTag: "College Rooftop Budget Paradise",
    barSnack: "Congress Peanut Masala Cone",
    x: 340,
    y: 390,
    member: {
      name: "Sneha Hegde",
      role: "Cloud Architect & FinOps Specialist",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80",
      quote: "College rooftop nostalgia meets aggressive AWS cost-cutting algorithms.",
      github: "https://github.com/sneha-hegde/cloudsnip",
      linkedin: "https://linkedin.com/in/sneha-hegde-cloud",
      portfolio: "https://sneha.tech"
    },
    project: {
      title: "CloudSnip &mdash; Serverless Cost Optimizer",
      category: "Cloud / FinOps",
      description: "Autonomous cloud spending guardian that dynamically rightsizes serverless clusters and predicts spot instance terminations.",
      drinkName: "Rooftop Peanut Masala Highball",
      drinkAbv: "ABV: 6.0%",
      drinkNotes: "Crisp soda, zesty lemon, fiery green chilies, and 68% cut in monthly AWS cloud bills.",
      techStack: ["Go (Golang)", "AWS SDK", "Terraform", "ClickHouse", "React"],
      highlights: [
        "Saved $450k+ across 40 beta test production clusters",
        "Zero downtime predictive spot instance draining mechanism",
        "One-click Terraform manifest auto-refactoring"
      ],
      metrics: { commits: 276, loc: "19,300", coverage: "94.2%", latency: "Realtime", caffeine: "135 Cups" },
      liveUrl: "https://cloudsnip-finops.dev",
      repoUrl: "https://github.com/sneha-hegde/cloudsnip"
    }
  },
  {
    id: "plan-b",
    number: 10,
    name: "Plan B",
    area: "Central",
    locationDetail: "Castle Street / Koramangala",
    techCategory: "Systems",
    color: "#f97316",
    icon: "fa-drumstick-bite",
    vibeTag: "Fiery Death Wings & Heavy Metal",
    barSnack: "Peri Peri Chicken Wings",
    x: 470,
    y: 380,
    member: {
      name: "Ananya Deshmukh",
      role: "Backend & High-Throughput Engineer",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&auto=format&fit=crop&q=80",
      quote: "Spicy peri-peri chicken wings and bulletproof distributed queues.",
      github: "https://github.com/ananya-deshmukh/hyperqueue",
      linkedin: "https://linkedin.com/in/ananya-deshmukh",
      portfolio: "https://ananya.dev"
    },
    project: {
      title: "HyperQueue &mdash; Distributed Task Broker",
      category: "Systems / Infra",
      description: "Persistent, memory-mapped asynchronous message broker built to handle millions of transactions per second with microsecond tail latency.",
      drinkName: "Spicy Wings Bloody Mary",
      drinkAbv: "ABV: 7.8%",
      drinkNotes: "Hot peri-peri rim, tomato reduction, Raft consensus algorithm, and disk io_uring.",
      techStack: ["C++20", "io_uring", "Raft Protocol", "gRPC", "Python Bindings"],
      highlights: [
        "Sustains 2.4 Million msg/sec on single commodity NVMe drives",
        "Custom Raft consensus with zero-copy network serialization",
        "Drop-in Kafka & RabbitMQ compatibility proxy"
      ],
      metrics: { commits: 604, loc: "54,200", coverage: "99.1%", latency: "< 8μs", caffeine: "320 Cups" },
      liveUrl: "https://hyperqueue-benchmarks.org",
      repoUrl: "https://github.com/ananya-deshmukh/hyperqueue"
    }
  },
  {
    id: "no-limmits",
    number: 11,
    name: "No Limmits Lounge & Club",
    area: "Lavelle-Magrath",
    locationDetail: "Magrath Road, Near Brigade Rd",
    techCategory: "Web3",
    color: "#f43f5e",
    icon: "fa-bolt-lightning",
    vibeTag: "Laser Strobes & High Energy",
    barSnack: "Cheesy Nachos & Salsa",
    x: 620,
    y: 390,
    member: {
      name: "Ishan Bannerjee",
      role: "AppSec & Cloud Security Researcher",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80",
      quote: "Laser strobe dance floors and zero-trust API perimeter defenses.",
      github: "https://github.com/ishan-bannerjee/threatshield",
      linkedin: "https://linkedin.com/in/ishan-bannerjee-sec",
      portfolio: "https://ishanb.security"
    },
    project: {
      title: "ThreatShield &mdash; Zero-Trust API Guard",
      category: "Security / AppSec",
      description: "Autonomous Web Application Firewall (WAF) that utilizes behavioral anomaly graphs to detect zero-day payload injection in under 2ms.",
      drinkName: "Laser Strobe Vodka Blast",
      drinkAbv: "ABV: 10.5%",
      drinkNotes: "Triple-distilled vodka, energy red berry, eBPF kernel filters, and AST parsing.",
      techStack: ["Rust", "eBPF", "Suricata", "OpenTelemetry", "React Dashboard"],
      highlights: [
        "Deep AST payload inspection prevents SQLi & SSRF without regex false positives",
        "Sub-2 millisecond round-trip inspection overhead at 100Gbps line rate",
        "Compliant with SOC2, HIPAA, and ISO 27001 automated logging"
      ],
      metrics: { commits: 377, loc: "29,800", coverage: "97.6%", latency: "< 1.8ms", caffeine: "205 Cups" },
      liveUrl: "https://threatshield-waf.io",
      repoUrl: "https://github.com/ishan-bannerjee/threatshield"
    }
  },
  {
    id: "biere-club",
    number: 12,
    name: "The Biere Club",
    area: "Lavelle-Magrath",
    locationDetail: "Lavelle Road, Near UB City",
    techCategory: "Web3",
    color: "#eab308",
    icon: "fa-crown",
    vibeTag: "Bangalore's First Microbrewery",
    barSnack: "Craft Wheat Pretzels & Sliders",
    x: 740,
    y: 470,
    member: {
      name: "Arjun Rao",
      role: "Zero-Knowledge & FinTech Engineer",
      avatar: "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=200&auto=format&fit=crop&q=80",
      quote: "Bangalore's first craft brewery meets zero-knowledge privacy guarantees.",
      github: "https://github.com/arjun-rao/vaultmesh",
      linkedin: "https://linkedin.com/in/arjun-rao-fintech",
      portfolio: "https://arjunrao.eth"
    },
    project: {
      title: "VaultMesh &mdash; ZK Privacy Settlement",
      category: "Web3 / FinTech",
      description: "Zero-knowledge rollup settlement layer enabling compliant, private cross-border multi-currency treasury payments for remote dev teams.",
      drinkName: "Craft Wheat & Gold Ale",
      drinkAbv: "ABV: 6.2%",
      drinkNotes: "Golden hazy wheat, banana clove ester notes, Circom ZK-SNARK circuits, and audited smart contracts.",
      techStack: ["Solidity", "Circom / SnarkJS", "Rust", "Ethers.js", "TypeScript"],
      highlights: [
        "Verifiable proof generation under 1.2 seconds in-browser",
        "Full regulatory AML compliance while keeping sender identity zero-knowledge",
        "Audited by leading web3 security firms"
      ],
      metrics: { commits: 480, loc: "36,400", coverage: "98.2%", latency: "1.2s Proof", caffeine: "265 Cups" },
      liveUrl: "https://vaultmesh-finance.org",
      repoUrl: "https://github.com/arjun-rao/vaultmesh"
    }
  },
  {
    id: "koramangala-social",
    number: 13,
    name: "Koramangala SOCIAL",
    area: "Koramangala",
    locationDetail: "7th Block, Koramangala",
    techCategory: "Fullstack",
    color: "#ec4899",
    icon: "fa-laptop-code",
    vibeTag: "Co-Working Desk Turned Evening Party",
    barSnack: "Butter Chicken Bao & Samosas",
    x: 620,
    y: 560,
    member: {
      name: "Vikram Nambiar",
      role: "Product Engineer & Community Tech",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80",
      quote: "Where co-working morning coffee turns into 9 PM brainstorming L.I.I.Ts.",
      github: "https://github.com/vikram-nambiar/collabsphere",
      linkedin: "https://linkedin.com/in/vikram-nambiar",
      portfolio: "https://vikramn.com"
    },
    project: {
      title: "CollabSphere &mdash; Hackathon OS",
      category: "Fullstack / Realtime",
      description: "The all-in-one interactive platform for physical and virtual hackathons with live matchmaking, peer-review, and sponsor bounties.",
      drinkName: "Electric L.I.I.T Social Pitcher",
      drinkAbv: "ABV: 11.2%",
      drinkNotes: "Five-spirit blend, citrus notes, live collaborative canvas CRDTs, and matrix rooms.",
      techStack: ["SvelteKit", "Supabase", "Yjs (CRDTs)", "Tailwind", "LiveKit"],
      highlights: [
        "Realtime collaborative canvas with zero sync conflict guarantees",
        "Automated AI judge scoring with GitHub code review bots",
        "Tested during 3 global hackathons with 12,000 active hackers"
      ],
      metrics: { commits: 389, loc: "28,700", coverage: "91.8%", latency: "38ms", caffeine: "195 Cups" },
      liveUrl: "https://collabsphere-live.app",
      repoUrl: "https://github.com/vikram-nambiar/collabsphere"
    }
  },
  {
    id: "gillys",
    number: 14,
    name: "Gilly's Restobar",
    area: "Koramangala",
    locationDetail: "Koramangala / New BEL Road",
    techCategory: "Fullstack",
    color: "#a855f7",
    icon: "fa-microphone-lines",
    vibeTag: "Weekend Rooftop Sing-Alongs",
    barSnack: "Karaoke Crispy Popcorn Chicken",
    x: 430,
    y: 560,
    member: {
      name: "Riya Sen",
      role: "Cross-Platform Mobile Engineer",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80",
      quote: "High energy weekend karaoke vibes infused into snappy 120Hz mobile apps.",
      github: "https://github.com/riya-sen/pulsesync",
      linkedin: "https://linkedin.com/in/riya-sen-mobile",
      portfolio: "https://riyasen.app"
    },
    project: {
      title: "PulseSync &mdash; Offline-First Health Tracker",
      category: "Mobile / HealthTech",
      description: "End-to-end encrypted personal health and bio-metric sync app with zero cloud dependency and Bluetooth BLE medical device pairing.",
      drinkName: "Neon Electric Long Island",
      drinkAbv: "ABV: 9.0%",
      drinkNotes: "Blue Curaçao, lemon twist, SQLite CR-SQLite synchronization, and Flutter Skia engine.",
      techStack: ["Flutter", "Dart", "CR-SQLite", "Bluetooth BLE", "Rust Core"],
      highlights: [
        "Instant seamless sync over local WiFi & BLE even without internet",
        "Zero tracking or telemetry data ever uploaded to external servers",
        "Supports Apple Health, Google Health Connect & Garmin wearables"
      ],
      metrics: { commits: 334, loc: "26,100", coverage: "95.1%", latency: "60 FPS Native", caffeine: "170 Cups" },
      liveUrl: "https://pulsesync-health.app",
      repoUrl: "https://github.com/riya-sen/pulsesync"
    }
  },
  {
    id: "xoox-brewmill",
    number: 15,
    name: "XOOX Brewmill",
    area: "Koramangala",
    locationDetail: "5th Block, Koramangala",
    techCategory: "AI/ML",
    color: "#d97706",
    icon: "fa-gear",
    vibeTag: "Industrial Brewmill & Copper Tanks",
    barSnack: "Smoked Pork Ribs & Craft Sliders",
    x: 250,
    y: 550,
    member: {
      name: "Samira Sengupta",
      role: "Computer Vision & Robotics Engineer",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&auto=format&fit=crop&q=80",
      quote: "Industrial mill aesthetics meet spatial AI and SLAM edge computing.",
      github: "https://github.com/samira-sengupta/robovision",
      linkedin: "https://linkedin.com/in/samira-sengupta-robotics",
      portfolio: "https://samiravision.ai"
    },
    project: {
      title: "RoboVision &mdash; Edge Spatial Navigation",
      category: "AI/ML / Robotics",
      description: "Visual SLAM and 3D semantic segmentation engine running on embedded NVIDIA Jetson platforms for autonomous warehouse robotics.",
      drinkName: "Smoked Amber Ale & Craft Cider",
      drinkAbv: "ABV: 7.0%",
      drinkNotes: "Toffee malt, crisp apple acidity, TensorRT quantization, and real-time point clouds.",
      techStack: ["Python", "C++", "TensorRT", "ROS2", "OpenCV", "PyTorch"],
      highlights: [
        "Real-time 3D semantic SLAM with 2cm positional drift accuracy",
        "Hardware accelerated on low-power Jetson Orin Nano boards (15W)",
        "Deployed on experimental delivery robots navigating indoor campus floors"
      ],
      metrics: { commits: 452, loc: "38,500", coverage: "94.7%", latency: "45 FPS Edge", caffeine: "250 Cups" },
      liveUrl: "https://robovision-robotics.ai",
      repoUrl: "https://github.com/samira-sengupta/robovision"
    }
  }
];

// =============================================================================
// 2. STATE MANAGEMENT & LOCAL STORAGE
// =============================================================================

class AppState {
  constructor() {
    this.pubs = DEFAULT_PUBS_DATA;
    this.stampedPubs = this.loadStampedPubs();
    this.currentAreaFilter = "all";
    this.currentTechFilter = "all";
    this.activePub = null;
    this.activeView = "map";
    this.soundEnabled = true;
    this.currentStopIndex = 0;
  }

  loadStampedPubs() {
    try {
      const saved = localStorage.getItem("blr_pubtrail_stamps");
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  }

  saveStampedPubs() {
    try {
      localStorage.setItem("blr_pubtrail_stamps", JSON.stringify(this.stampedPubs));
    } catch (e) {
      console.warn("Storage error", e);
    }
  }

  isStamped(pubId) {
    return this.stampedPubs.includes(pubId);
  }

  toggleStamp(pubId) {
    if (this.stampedPubs.includes(pubId)) {
      this.stampedPubs = this.stampedPubs.filter(id => id !== pubId);
    } else {
      this.stampedPubs.push(pubId);
    }
    this.saveStampedPubs();
    return this.isStamped(pubId);
  }

  updatePub(updatedPub) {
    const idx = this.pubs.findIndex(p => p.id === updatedPub.id);
    if (idx !== -1) {
      this.pubs[idx] = { ...this.pubs[idx], ...updatedPub };
    }
  }
}

const state = new AppState();

// =============================================================================
// 3. SOUND ENGINE (Minimalist Web Audio)
// =============================================================================

class SoundEngine {
  constructor() {
    this.ctx = null;
  }

  init() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioContext();
    }
    if (this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  }

  playFootstep() {
    if (!state.soundEnabled || !this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(140 + Math.random() * 30, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(30, this.ctx.currentTime + 0.04);

    gain.gain.setValueAtTime(0.02, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.04);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.04);
  }

  playGlassClink() {
    if (!state.soundEnabled || !this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(2200, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(1700, this.ctx.currentTime + 0.5);

    gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.5);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.5);
  }

  playStampSound() {
    if (!state.soundEnabled || !this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = "triangle";
    osc.frequency.setValueAtTime(180, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(60, this.ctx.currentTime + 0.12);

    gain.gain.setValueAtTime(0.18, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.12);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.12);
  }
}

const soundEngine = new SoundEngine();

// =============================================================================
// 4. STORYBOOK ILLUSTRATED CANVAS TRAIL MAP
// =============================================================================

class StorybookTrailCanvas {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    
    // Explorer / Hiker Character matching the reference picture
    this.player = {
      x: DEFAULT_PUBS_DATA[0].x,
      y: DEFAULT_PUBS_DATA[0].y,
      targetX: DEFAULT_PUBS_DATA[0].x,
      targetY: DEFAULT_PUBS_DATA[0].y,
      speed: 3.8,
      isMoving: false,
      walkFrame: 0,
      direction: "right"
    };

    this.keys = {
      w: false, a: false, s: false, d: false,
      ArrowUp: false, ArrowLeft: false, ArrowDown: false, ArrowRight: false
    };

    this.initCanvasSize();
    window.addEventListener("resize", () => this.initCanvasSize());
    this.bindEvents();
    this.startLoop();
  }

  initCanvasSize() {
    this.canvas.width = this.canvas.parentElement.clientWidth;
    this.canvas.height = this.canvas.parentElement.clientHeight;
  }

  bindEvents() {
    window.addEventListener("keydown", (e) => {
      if (["w", "a", "s", "d", "ArrowUp", "ArrowLeft", "ArrowDown", "ArrowRight"].includes(e.key)) {
        this.keys[e.key] = true;
      }
      if (e.key.toLowerCase() === "e" || e.key === " ") {
        const nearbyPub = this.getNearbyPub();
        if (nearbyPub) {
          openPubModal(nearbyPub);
        }
      }
    });

    window.addEventListener("keyup", (e) => {
      if (["w", "a", "s", "d", "ArrowUp", "ArrowLeft", "ArrowDown", "ArrowRight"].includes(e.key)) {
        this.keys[e.key] = false;
      }
    });

    // Tap/Click to walk
    this.canvas.addEventListener("click", (e) => {
      const rect = this.canvas.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;
      this.walkTo(clickX, clickY);
    });

    // D-Pad keys
    document.querySelectorAll(".dpad-key[data-dir]").forEach(btn => {
      const dir = btn.getAttribute("data-dir");
      const handlePress = (active) => {
        soundEngine.init();
        if (dir === "up") this.keys.ArrowUp = active;
        if (dir === "down") this.keys.ArrowDown = active;
        if (dir === "left") this.keys.ArrowLeft = active;
        if (dir === "right") this.keys.ArrowRight = active;
      };
      btn.addEventListener("mousedown", () => handlePress(true));
      btn.addEventListener("mouseup", () => handlePress(false));
      btn.addEventListener("touchstart", (e) => { e.preventDefault(); handlePress(true); });
      btn.addEventListener("touchend", (e) => { e.preventDefault(); handlePress(false); });
    });
  }

  walkTo(x, y) {
    this.player.targetX = x;
    this.player.targetY = y;
    soundEngine.init();
  }

  update() {
    let dx = 0;
    let dy = 0;

    if (this.keys.w || this.keys.ArrowUp) dy -= 1;
    if (this.keys.s || this.keys.ArrowDown) dy += 1;
    if (this.keys.a || this.keys.ArrowLeft) dx -= 1;
    if (this.keys.d || this.keys.ArrowRight) dx += 1;

    if (dx !== 0 || dy !== 0) {
      const length = Math.hypot(dx, dy);
      this.player.x += (dx / length) * this.player.speed;
      this.player.y += (dy / length) * this.player.speed;
      this.player.targetX = this.player.x;
      this.player.targetY = this.player.y;
      this.player.isMoving = true;
      if (dx < 0) this.player.direction = "left";
      if (dx > 0) this.player.direction = "right";
    } else {
      const dist = Math.hypot(this.player.targetX - this.player.x, this.player.targetY - this.player.y);
      if (dist > 3) {
        const step = Math.min(dist, this.player.speed);
        this.player.x += ((this.player.targetX - this.player.x) / dist) * step;
        this.player.y += ((this.player.targetY - this.player.y) / dist) * step;
        this.player.isMoving = true;
        if (this.player.targetX < this.player.x) this.player.direction = "left";
        else this.player.direction = "right";
      } else {
        this.player.isMoving = false;
      }
    }

    if (this.player.isMoving) {
      this.player.walkFrame += 0.18;
      if (Math.floor(this.player.walkFrame) % 4 === 0 && Math.random() < 0.25) {
        soundEngine.playFootstep();
      }
    }

    this.checkProximity();
  }

  getNearbyPub() {
    const threshold = 65;
    return state.pubs.find(pub => Math.hypot(pub.x - this.player.x, pub.y - this.player.y) < threshold);
  }

  checkProximity() {
    const promptEl = document.getElementById("proximity-prompt");
    const nearby = this.getNearbyPub();
    if (nearby) {
      document.getElementById("prompt-pub-name").textContent = `#${nearby.number} ${nearby.name}`;
      document.getElementById("prompt-project-title").innerHTML = `${nearby.member.name} &bull; ${nearby.project.title}`;
      promptEl.classList.remove("hidden");

      const stopLabel = document.getElementById("current-location-tag");
      if (stopLabel) stopLabel.textContent = `At Stop #${nearby.number} ${nearby.name}`;
      state.currentStopIndex = nearby.number - 1;
    } else {
      promptEl.classList.add("hidden");
    }
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // 1. Draw Organic Winding Rivers & Peaceful Lakes (Sky Blue with ripples)
    this.drawLakesAndRivers();

    // 2. Draw Gentle Earthy Hills (Sage & Olive Green)
    this.drawGreenHills();

    // 3. Draw Illustrated Mountain Peaks in corners (Navy base with sunny gold tips)
    this.drawMountainPeaks();

    // 4. Draw Hand-Drawn Pine & Oak Trees
    this.drawTrees();

    // 5. Draw Cozy Camper Van, Tent & Stool
    this.drawCampGrounds();

    // 6. Draw the Dotted Hiking Trail (Connecting all 15 pubs)
    this.drawDottedTrail();

    // 7. Draw the Explorer Character (Hiker with Cap, Backpack & Walking Stick)
    this.drawHiker();
  }

  drawLakesAndRivers() {
    this.ctx.save();
    
    // North Winding River
    this.ctx.fillStyle = "#a2d2df";
    this.ctx.beginPath();
    this.ctx.moveTo(330, 0);
    this.ctx.bezierCurveTo(340, 80, 260, 160, 310, 240);
    this.ctx.bezierCurveTo(340, 290, 410, 340, 390, 420);
    this.ctx.bezierCurveTo(370, 480, 260, 500, 210, 560);
    this.ctx.bezierCurveTo(180, 600, 120, 640, 80, 720);
    this.ctx.lineTo(120, 720);
    this.ctx.bezierCurveTo(170, 630, 220, 580, 260, 530);
    this.ctx.bezierCurveTo(340, 460, 440, 390, 430, 320);
    this.ctx.bezierCurveTo(420, 260, 370, 190, 375, 120);
    this.ctx.bezierCurveTo(380, 60, 360, 0, 360, 0);
    this.ctx.closePath();
    this.ctx.fill();

    // Large Serene Central Lake
    this.ctx.beginPath();
    this.ctx.ellipse(540, 460, 125, 75, -0.15, 0, Math.PI * 2);
    this.ctx.fill();

    // Secondary Peaceful East Lake
    this.ctx.beginPath();
    this.ctx.ellipse(710, 340, 65, 45, 0.2, 0, Math.PI * 2);
    this.ctx.fill();

    // Little Water Ripples (~ ~ ~)
    this.ctx.strokeStyle = "#ffffff";
    this.ctx.lineWidth = 1.8;
    this.ctx.lineCap = "round";
    
    const ripples = [
      [510, 440], [530, 440], [520, 445],
      [560, 470], [580, 470],
      [490, 480], [510, 480],
      [700, 335], [720, 335],
      [340, 150], [355, 150]
    ];

    ripples.forEach(([rx, ry]) => {
      this.ctx.beginPath();
      this.ctx.moveTo(rx - 6, ry);
      this.ctx.quadraticCurveTo(rx - 3, ry - 3, rx, ry);
      this.ctx.quadraticCurveTo(rx + 3, ry + 3, rx + 6, ry);
      this.ctx.stroke();
    });

    this.ctx.restore();
  }

  drawGreenHills() {
    this.ctx.save();
    const hills = [
      { x: 160, y: 150, r: 35, c: "#8cb369" },
      { x: 190, y: 155, r: 28, c: "#99d98c" },
      { x: 670, y: 110, r: 42, c: "#8cb369" },
      { x: 710, y: 115, r: 30, c: "#99d98c" },
      { x: 130, y: 480, r: 38, c: "#8cb369" },
      { x: 160, y: 485, r: 26, c: "#99d98c" },
      { x: 790, y: 520, r: 45, c: "#8cb369" }
    ];

    hills.forEach(h => {
      this.ctx.fillStyle = h.c;
      this.ctx.beginPath();
      this.ctx.arc(h.x, h.y, h.r, Math.PI, 0);
      this.ctx.fill();
    });

    this.ctx.restore();
  }

  drawMountainPeaks() {
    this.ctx.save();
    // Mountains in bottom right corner (Navy base with gold peak)
    const peaks = [
      { bx: 720, by: 690, w: 50, h: 65 },
      { bx: 760, by: 690, w: 60, h: 80 },
      { bx: 810, by: 690, w: 55, h: 70 },
      // Top right peaks
      { bx: 640, by: 70, w: 45, h: 55 },
      { bx: 680, by: 70, w: 50, h: 65 }
    ];

    peaks.forEach(p => {
      // Navy Base
      this.ctx.fillStyle = "#3d5a80";
      this.ctx.beginPath();
      this.ctx.moveTo(p.bx - p.w / 2, p.by);
      this.ctx.lineTo(p.bx, p.by - p.h);
      this.ctx.lineTo(p.bx + p.w / 2, p.by);
      this.ctx.closePath();
      this.ctx.fill();

      // Sunny Gold Peak
      this.ctx.fillStyle = "#f4a261";
      this.ctx.beginPath();
      this.ctx.moveTo(p.bx - p.w * 0.22, p.by - p.h * 0.55);
      this.ctx.lineTo(p.bx, p.by - p.h);
      this.ctx.lineTo(p.bx + p.w * 0.22, p.by - p.h * 0.55);
      this.ctx.closePath();
      this.ctx.fill();
    });

    this.ctx.restore();
  }

  drawTrees() {
    this.ctx.save();
    const trees = [
      { x: 230, y: 190, s: 1 },
      { x: 420, y: 100, s: 1.1 },
      { x: 610, y: 90, s: 0.9 },
      { x: 740, y: 220, s: 1 },
      { x: 810, y: 380, s: 1.2 },
      { x: 410, y: 480, s: 1.1 },
      { x: 370, y: 510, s: 0.8 },
      { x: 170, y: 340, s: 1.1 },
      { x: 190, y: 620, s: 1 },
      { x: 220, y: 640, s: 0.85 },
      { x: 670, y: 630, s: 1.2 }
    ];

    trees.forEach(t => {
      const { x, y, s } = t;
      // Trunk
      this.ctx.fillStyle = "#8b5a2b";
      this.ctx.fillRect(x - 2 * s, y, 4 * s, 12 * s);

      // Layered Pine Triangles (Rich Sage & Forest Green)
      this.ctx.fillStyle = "#52796f";
      this.ctx.beginPath();
      this.ctx.moveTo(x - 12 * s, y + 2 * s);
      this.ctx.lineTo(x, y - 10 * s);
      this.ctx.lineTo(x + 12 * s, y + 2 * s);
      this.ctx.closePath();
      this.ctx.fill();

      this.ctx.fillStyle = "#354f52";
      this.ctx.beginPath();
      this.ctx.moveTo(x - 9 * s, y - 5 * s);
      this.ctx.lineTo(x, y - 16 * s);
      this.ctx.lineTo(x + 9 * s, y - 5 * s);
      this.ctx.closePath();
      this.ctx.fill();

      this.ctx.fillStyle = "#2f3e46";
      this.ctx.beginPath();
      this.ctx.moveTo(x - 6 * s, y - 12 * s);
      this.ctx.lineTo(x, y - 22 * s);
      this.ctx.lineTo(x + 6 * s, y - 12 * s);
      this.ctx.closePath();
      this.ctx.fill();
    });

    this.ctx.restore();
  }

  drawCampGrounds() {
    this.ctx.save();
    
    // 1. Cute Retro Camper Van near southeast lake
    const cx = 710;
    const cy = 410;
    // Van Body (Sage Green)
    this.ctx.fillStyle = "#76c893";
    this.ctx.beginPath();
    this.ctx.roundRect(cx - 26, cy - 18, 52, 28, [12, 12, 4, 4]);
    this.ctx.fill();
    this.ctx.strokeStyle = "#2d3a4b";
    this.ctx.lineWidth = 2;
    this.ctx.stroke();

    // Van Roof/Stripe (Warm Butter)
    this.ctx.fillStyle = "#ffd166";
    this.ctx.fillRect(cx - 26, cy - 6, 52, 6);

    // Van Door & Window
    this.ctx.fillStyle = "#2d3a4b";
    this.ctx.fillRect(cx - 4, cy - 14, 12, 22);
    this.ctx.fillStyle = "#a2d2df";
    this.ctx.fillRect(cx - 20, cy - 14, 10, 8);

    // Wheels
    this.ctx.fillStyle = "#2d3a4b";
    this.ctx.beginPath();
    this.ctx.arc(cx - 14, cy + 10, 6, 0, Math.PI * 2);
    this.ctx.arc(cx + 14, cy + 10, 6, 0, Math.PI * 2);
    this.ctx.fill();

    // 2. Cozy Camping Tent near East path
    const tx = 680;
    const ty = 220;
    this.ctx.fillStyle = "#3d5a80";
    this.ctx.beginPath();
    this.ctx.moveTo(tx - 18, ty);
    this.ctx.lineTo(tx, ty - 22);
    this.ctx.lineTo(tx + 18, ty);
    this.ctx.closePath();
    this.ctx.fill();
    this.ctx.strokeStyle = "#2d3a4b";
    this.ctx.lineWidth = 1.5;
    this.ctx.stroke();

    // Tent Opening
    this.ctx.fillStyle = "#e9c46a";
    this.ctx.beginPath();
    this.ctx.moveTo(tx - 6, ty);
    this.ctx.lineTo(tx, ty - 14);
    this.ctx.lineTo(tx + 6, ty);
    this.ctx.closePath();
    this.ctx.fill();

    this.ctx.restore();
  }

  drawDottedTrail() {
    this.ctx.save();
    this.ctx.strokeStyle = "rgba(45, 58, 75, 0.65)";
    this.ctx.lineWidth = 2.5;
    this.ctx.setLineDash([7, 7]);
    this.ctx.lineCap = "round";
    this.ctx.lineJoin = "round";

    this.ctx.beginPath();
    this.ctx.moveTo(state.pubs[0].x, state.pubs[0].y);

    for (let i = 0; i < state.pubs.length - 1; i++) {
      const p1 = state.pubs[i];
      const p2 = state.pubs[i + 1];
      const midX = (p1.x + p2.x) / 2;
      const midY = (p1.y + p2.y) / 2;
      // Gentle curve deviation
      const curveOffset = ((i % 2 === 0 ? 1 : -1) * 20);
      this.ctx.quadraticCurveTo(midX, midY + curveOffset, p2.x, p2.y);
    }
    this.ctx.stroke();
    this.ctx.setLineDash([]);
    this.ctx.restore();
  }

  drawHiker() {
    const { x, y } = this.player;
    this.ctx.save();
    this.ctx.translate(x, y);

    if (this.player.direction === "left") {
      this.ctx.scale(-1, 1);
    }

    const step = Math.sin(this.player.walkFrame) * 4;

    // Shadow
    this.ctx.fillStyle = "rgba(45, 58, 75, 0.25)";
    this.ctx.beginPath();
    this.ctx.ellipse(0, 4, 12, 5, 0, 0, Math.PI * 2);
    this.ctx.fill();

    // Legs & Hiking Boots
    this.ctx.fillStyle = "#e07a5f"; // legs / skin
    this.ctx.fillRect(-5, -6, 4, 8 + step);
    this.ctx.fillRect(1, -6, 4, 8 - step);

    // Boots
    this.ctx.fillStyle = "#2d3a4b";
    this.ctx.fillRect(-6, 2 + step, 6, 4);
    this.ctx.fillRect(1, 2 - step, 6, 4);

    // Blue/Dark Shorts
    this.ctx.fillStyle = "#3d5a80";
    this.ctx.fillRect(-7, -10, 14, 6);

    // Hiker Red/Orange Checkered Shirt (from reference)
    this.ctx.fillStyle = "#e76f51";
    this.ctx.fillRect(-7, -22, 14, 13);
    this.ctx.strokeStyle = "#2d3a4b";
    this.ctx.lineWidth = 1.2;
    this.ctx.strokeRect(-7, -22, 14, 13);

    // Hiker Backpack (Olive Green behind)
    this.ctx.fillStyle = "#588157";
    this.ctx.fillRect(-12, -22, 6, 12);
    this.ctx.strokeRect(-12, -22, 6, 12);

    // Head & Cap
    this.ctx.fillStyle = "#f4a261"; // skin
    this.ctx.beginPath();
    this.ctx.arc(0, -28, 5.5, 0, Math.PI * 2);
    this.ctx.fill();

    // Red Cap with Visor
    this.ctx.fillStyle = "#e76f51";
    this.ctx.beginPath();
    this.ctx.arc(0, -30, 6, Math.PI, 0);
    this.ctx.fill();
    // Visor
    this.ctx.fillRect(1, -30, 6, 2.5);

    // Wooden Hiking Stick in Hand
    this.ctx.strokeStyle = "#8b5a2b";
    this.ctx.lineWidth = 2;
    this.ctx.beginPath();
    this.ctx.moveTo(8, -18);
    this.ctx.lineTo(8, 4);
    this.ctx.stroke();

    this.ctx.restore();
  }

  startLoop() {
    const loop = () => {
      this.update();
      this.draw();
      requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);
  }
}

// =============================================================================
// 5. DOM LAYOUT & PUB MARKER RENDERING
// =============================================================================

function renderPubMarkers(mapController) {
  const pinLayer = document.getElementById("pubs-pin-layer");
  if (!pinLayer) return;
  pinLayer.innerHTML = "";

  state.pubs.forEach(pub => {
    if (state.currentAreaFilter !== "all" && pub.area !== state.currentAreaFilter) return;
    if (state.currentTechFilter !== "all" && pub.techCategory !== state.currentTechFilter) return;

    const marker = document.createElement("div");
    marker.className = "pub-trail-marker";
    marker.style.left = `${pub.x}px`;
    marker.style.top = `${pub.y}px`;
    marker.style.setProperty("--marker-color", pub.color);

    const isStamped = state.isStamped(pub.id);

    marker.innerHTML = `
      <div class="marker-cottage-pin ${isStamped ? "visited" : ""}">
        <span class="marker-num-badge">${pub.number}</span>
        <i class="fa-solid ${pub.icon}"></i>
      </div>
      <div class="marker-text-bubble">
        <span class="marker-pub-title">${pub.name}</span>
        <span class="marker-member-sub">${pub.member.name}</span>
      </div>
    `;

    marker.addEventListener("click", () => {
      mapController.walkTo(pub.x, pub.y);
      openPubModal(pub);
    });

    pinLayer.appendChild(marker);
  });
}

// =============================================================================
// 6. DIRECTORY / GRID VIEW RENDERING
// =============================================================================

function renderDirectoryCards() {
  const grid = document.getElementById("all-projects-grid");
  if (!grid) return;
  grid.innerHTML = "";

  const filtered = state.pubs.filter(p => {
    const matchArea = state.currentAreaFilter === "all" || p.area === state.currentAreaFilter;
    const matchTech = state.currentTechFilter === "all" || p.techCategory === state.currentTechFilter;
    return matchArea && matchTech;
  });

  filtered.forEach(pub => {
    const isStamped = state.isStamped(pub.id);
    const card = document.createElement("div");
    card.className = "project-card";
    card.style.setProperty("--card-color", pub.color);

    const techTagsHtml = pub.project.techStack.map(t => `<span class="card-tech-tag">${t}</span>`).join("");

    card.innerHTML = `
      <div class="card-top-banner">
        <div>
          <span style="font-size:0.75rem; font-weight:800; color:var(--trail-moss);">STOP #${pub.number}</span>
          <h3 class="card-pub-name">${pub.name}</h3>
          <span class="card-pub-hood"><i class="fa-solid fa-location-dot"></i> ${pub.locationDetail}</span>
        </div>
        <span class="card-stamp-badge ${isStamped ? "stamped" : ""}">
          ${isStamped ? '<i class="fa-solid fa-stamp"></i> STAMPED' : 'UNVISITED'}
        </span>
      </div>
      <div class="card-body">
        <div class="card-member-row">
          <img src="${pub.member.avatar}" alt="${pub.member.name}" class="card-avatar">
          <div class="card-member-info">
            <h4>${pub.member.name}</h4>
            <span class="card-member-role">${pub.member.role}</span>
          </div>
        </div>

        <h4 class="card-project-title">${pub.project.title}</h4>
        <p class="card-project-desc">${pub.project.description}</p>

        <div class="card-drink-pill">
          <i class="fa-solid ${pub.icon}"></i>
          <span>${pub.project.drinkName} (${pub.project.drinkAbv})</span>
        </div>

        <div class="card-tech-chips">
          ${techTagsHtml}
        </div>

        <div class="card-footer-actions">
          <span class="btn-inspect-pub">VISIT STOP &rarr;</span>
          <span style="font-size:0.75rem; color:var(--trail-ink-light); font-weight:700;">${pub.project.metrics.commits} Commits</span>
        </div>
      </div>
    `;

    card.addEventListener("click", () => {
      openPubModal(pub);
    });

    grid.appendChild(card);
  });
}

// =============================================================================
// 7. CLEAN PUB MODAL
// =============================================================================

function openPubModal(pub) {
  state.activePub = pub;
  soundEngine.playGlassClink();

  const modal = document.getElementById("bar-modal");
  
  document.getElementById("modal-stop-pill").textContent = `STOP #${pub.number} ON TRAIL`;
  document.getElementById("modal-pub-name").textContent = pub.name;
  document.getElementById("modal-pub-location").innerHTML = `<i class="fa-solid fa-location-dot"></i> ${pub.locationDetail}`;

  // Member Column
  document.getElementById("modal-member-avatar").src = pub.member.avatar;
  document.getElementById("modal-member-name").textContent = pub.member.name;
  document.getElementById("modal-member-role").textContent = pub.member.role;
  document.getElementById("modal-member-quote").textContent = `"${pub.member.quote}"`;
  document.getElementById("modal-member-snack").textContent = pub.barSnack;
  document.getElementById("modal-github-link").href = pub.member.github;
  document.getElementById("modal-linkedin-link").href = pub.member.linkedin;
  document.getElementById("modal-portfolio-link").href = pub.member.portfolio;

  // Project Column
  document.getElementById("modal-project-category").textContent = pub.project.category;
  document.getElementById("modal-hood-chip").textContent = pub.area.toUpperCase();
  document.getElementById("modal-project-title").innerHTML = pub.project.title;
  document.getElementById("modal-project-description").textContent = pub.project.description;
  document.getElementById("modal-drink-name").textContent = pub.project.drinkName;
  document.getElementById("modal-drink-abv").textContent = pub.project.drinkAbv;
  document.getElementById("modal-drink-notes").textContent = pub.project.drinkNotes;
  document.getElementById("modal-live-demo-btn").href = pub.project.liveUrl;
  document.getElementById("modal-source-code-btn").href = pub.project.repoUrl;

  // Tech Stack Pills
  const techContainer = document.getElementById("modal-tech-stack");
  techContainer.innerHTML = pub.project.techStack.map(t => `<span class="clean-tech-badge">${t}</span>`).join("");

  // Highlights
  const highlightsContainer = document.getElementById("modal-highlights-list");
  highlightsContainer.innerHTML = pub.project.highlights.map(h => `<li>${h}</li>`).join("");

  // Stats Receipt
  document.getElementById("receipt-pub-name").textContent = pub.name.toUpperCase();
  document.getElementById("receipt-commits").textContent = pub.project.metrics.commits;
  document.getElementById("receipt-loc").textContent = pub.project.metrics.loc;
  document.getElementById("receipt-coverage").textContent = pub.project.metrics.coverage;
  document.getElementById("receipt-latency").textContent = pub.project.metrics.latency;
  document.getElementById("receipt-caffeine").textContent = pub.project.metrics.caffeine;

  updateModalStampButton(pub.id);

  modal.classList.remove("hidden");
}

function updateModalStampButton(pubId) {
  const btn = document.getElementById("stamp-this-pub-btn");
  if (!btn) return;
  const isStamped = state.isStamped(pubId);
  if (isStamped) {
    btn.innerHTML = `<i class="fa-solid fa-stamp"></i> STAMPED &bull; VISITED`;
    btn.style.background = "var(--trail-moss)";
  } else {
    btn.innerHTML = `<i class="fa-solid fa-stamp"></i> STAMP PASSPORT`;
    btn.style.background = "var(--trail-butter)";
  }
}

function triggerDrinkPour(pub) {
  soundEngine.playGlassClink();
  const animLayer = document.getElementById("drink-animation-layer");
  const liquid = document.getElementById("pour-liquid");
  const caption = document.getElementById("pour-caption-text");

  caption.textContent = `Pouring ${pub.project.drinkName}...`;
  animLayer.classList.remove("hidden");
  liquid.style.height = "0%";

  setTimeout(() => {
    liquid.style.height = "85%";
  }, 100);

  setTimeout(() => {
    caption.textContent = `Cheers! Enjoying ${pub.member.name}'s ${pub.project.title}`;
  }, 1500);

  setTimeout(() => {
    animLayer.classList.add("hidden");
    showToast(`🍺 Enjoyed 1x ${pub.project.drinkName} at ${pub.name}!`);
  }, 2400);
}

// =============================================================================
// 8. PASSPORT MODAL & STAMPS
// =============================================================================

function updatePassportProgress() {
  const count = state.stampedPubs.length;
  const total = state.pubs.length;

  const stampCounter = document.getElementById("stamp-counter");
  const passportCount = document.getElementById("passport-visited-count");
  const trophyText = document.getElementById("passport-trophy-text");

  if (stampCounter) stampCounter.textContent = `${count} / ${total} STAMPED`;
  if (passportCount) passportCount.textContent = count;

  if (trophyText) {
    if (count === total) {
      trophyText.innerHTML = `🎉 <strong>EXPEDITION COMPLETE:</strong> You have visited all 15 student project stops across Bangalore!`;
      trophyText.style.color = "var(--trail-forest)";
    } else {
      trophyText.innerHTML = `Visit all 15 stops along the trail to complete your expedition! (${total - count} remaining)`;
    }
  }
}

function renderPassportStamps() {
  const container = document.getElementById("stamps-grid-container");
  if (!container) return;
  container.innerHTML = "";

  state.pubs.forEach(pub => {
    const isStamped = state.isStamped(pub.id);
    const slot = document.createElement("div");
    slot.className = `stamp-slot ${isStamped ? "stamped" : ""}`;

    slot.innerHTML = `
      <div class="slot-circle">
        <i class="fa-solid ${isStamped ? pub.icon : "fa-lock"}"></i>
      </div>
      <div class="slot-name">#${pub.number} ${pub.name}</div>
    `;

    slot.addEventListener("click", () => {
      openPubModal(pub);
    });

    container.appendChild(slot);
  });
}

// =============================================================================
// 9. TOAST NOTIFICATIONS & EDIT MODAL
// =============================================================================

function showToast(message) {
  const container = document.getElementById("toast-container");
  if (!container) return;
  const toast = document.createElement("div");
  toast.className = "trail-toast";
  toast.innerHTML = `<i class="fa-solid fa-compass" style="color:var(--trail-moss);"></i> <span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "0";
    setTimeout(() => toast.remove(), 250);
  }, 3000);
}

function openEditModal(pub) {
  document.getElementById("edit-pub-id").value = pub.id;
  document.getElementById("edit-name").value = pub.member.name;
  document.getElementById("edit-role").value = pub.member.role;
  document.getElementById("edit-title").value = pub.project.title;
  document.getElementById("edit-desc").value = pub.project.description;
  document.getElementById("edit-tech").value = pub.project.techStack.join(", ");
  document.getElementById("edit-drink").value = pub.project.drinkName;
  document.getElementById("edit-github").value = pub.project.repoUrl;
  document.getElementById("edit-demo").value = pub.project.liveUrl;

  document.getElementById("edit-modal").classList.remove("hidden");
}

// =============================================================================
// 10. APP INITIALIZATION & EVENT WIRING
// =============================================================================

document.addEventListener("DOMContentLoaded", () => {
  const cityCanvas = document.getElementById("city-canvas");
  const mapController = new StorybookTrailCanvas(cityCanvas);

  renderPubMarkers(mapController);
  renderDirectoryCards();
  updatePassportProgress();

  // Next / Prev Stop Navigation
  const nextBtn = document.getElementById("next-stop-btn");
  const prevBtn = document.getElementById("prev-stop-btn");

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      state.currentStopIndex = (state.currentStopIndex + 1) % state.pubs.length;
      const target = state.pubs[state.currentStopIndex];
      mapController.walkTo(target.x, target.y);
      showToast(`Walking to Stop #${target.number} ${target.name}`);
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      state.currentStopIndex = (state.currentStopIndex - 1 + state.pubs.length) % state.pubs.length;
      const target = state.pubs[state.currentStopIndex];
      mapController.walkTo(target.x, target.y);
      showToast(`Walking to Stop #${target.number} ${target.name}`);
    });
  }

  // View Switcher (Map vs Directory)
  const mapBtn = document.getElementById("map-view-btn");
  const listBtn = document.getElementById("list-view-btn");
  const mapViewport = document.getElementById("map-viewport");
  const dirViewport = document.getElementById("directory-viewport");

  mapBtn.addEventListener("click", () => {
    mapBtn.classList.add("active");
    listBtn.classList.remove("active");
    mapViewport.classList.add("active-view");
    mapViewport.classList.remove("hidden-view");
    dirViewport.classList.add("hidden-view");
    dirViewport.classList.remove("active-view");
    state.activeView = "map";
    mapController.initCanvasSize();
  });

  listBtn.addEventListener("click", () => {
    listBtn.classList.add("active");
    mapBtn.classList.remove("active");
    dirViewport.classList.add("active-view");
    dirViewport.classList.remove("hidden-view");
    mapViewport.classList.add("hidden-view");
    mapViewport.classList.remove("active-view");
    state.activeView = "directory";
    renderDirectoryCards();
  });

  // Sound Toggle
  const soundBtn = document.getElementById("sound-toggle-btn");
  soundBtn.addEventListener("click", () => {
    soundEngine.init();
    state.soundEnabled = !state.soundEnabled;
    const soundIcon = document.getElementById("sound-icon");
    if (state.soundEnabled) {
      soundIcon.className = "fa-solid fa-volume-high";
      showToast("🔊 Audio Enabled");
    } else {
      soundIcon.className = "fa-solid fa-volume-xmark";
      showToast("🔇 Audio Muted");
    }
  });

  // Filters
  document.querySelectorAll(".trail-chip[data-filter]").forEach(chip => {
    chip.addEventListener("click", (e) => {
      document.querySelectorAll(".trail-chip[data-filter]").forEach(c => c.classList.remove("active"));
      e.currentTarget.classList.add("active");
      state.currentAreaFilter = e.currentTarget.getAttribute("data-filter");
      renderPubMarkers(mapController);
      renderDirectoryCards();
    });
  });

  document.querySelectorAll(".trail-chip[data-tech]").forEach(chip => {
    chip.addEventListener("click", (e) => {
      document.querySelectorAll(".trail-chip[data-tech]").forEach(c => c.classList.remove("active"));
      e.currentTarget.classList.add("active");
      state.currentTechFilter = e.currentTarget.getAttribute("data-tech");
      renderPubMarkers(mapController);
      renderDirectoryCards();
    });
  });

  // Proximity Enter
  document.getElementById("prompt-enter-btn").addEventListener("click", () => {
    const nearby = mapController.getNearbyPub();
    if (nearby) openPubModal(nearby);
  });

  // Modal Closures
  const closeBarModal = () => document.getElementById("bar-modal").classList.add("hidden");
  document.getElementById("close-modal-btn").addEventListener("click", closeBarModal);
  document.getElementById("modal-backdrop-close").addEventListener("click", closeBarModal);

  // Stamp Passport Button
  document.getElementById("stamp-this-pub-btn").addEventListener("click", () => {
    if (state.activePub) {
      soundEngine.playStampSound();
      const isStamped = state.toggleStamp(state.activePub.id);
      updateModalStampButton(state.activePub.id);
      updatePassportProgress();
      renderPubMarkers(mapController);
      renderDirectoryCards();
      showToast(isStamped ? `📜 Stamped Stop #${state.activePub.number} ${state.activePub.name}!` : `Stamp removed for ${state.activePub.name}`);
    }
  });

  // Order Drink
  document.getElementById("order-drink-action-btn").addEventListener("click", () => {
    if (state.activePub) {
      triggerDrinkPour(state.activePub);
    }
  });

  // Share Project
  document.getElementById("modal-share-btn").addEventListener("click", () => {
    if (state.activePub) {
      navigator.clipboard.writeText(`${window.location.href} (Checked out ${state.activePub.member.name}'s project ${state.activePub.project.title} at ${state.activePub.name})`);
      showToast("🔗 Project link copied to clipboard!");
    }
  });

  // Passport Modal
  const openPassport = () => {
    renderPassportStamps();
    updatePassportProgress();
    document.getElementById("passport-modal").classList.remove("hidden");
  };
  document.getElementById("open-passport-btn").addEventListener("click", openPassport);
  document.getElementById("close-passport-btn").addEventListener("click", () => {
    document.getElementById("passport-modal").classList.add("hidden");
  });
  document.getElementById("passport-backdrop-close").addEventListener("click", () => {
    document.getElementById("passport-modal").classList.add("hidden");
  });

  document.getElementById("stamp-all-debug-btn").addEventListener("click", () => {
    state.stampedPubs = state.pubs.map(p => p.id);
    state.saveStampedPubs();
    soundEngine.playStampSound();
    renderPassportStamps();
    updatePassportProgress();
    renderPubMarkers(mapController);
    renderDirectoryCards();
    showToast("🎉 All 15 Pub Stamps Collected!");
  });

  document.getElementById("export-passport-btn").addEventListener("click", () => {
    const summary = `THE BANGALORE PUB TRAIL '26\nVisited: ${state.stampedPubs.length} / 15 Stops\nCompleted on: ${new Date().toLocaleDateString()}`;
    const blob = new Blob([summary], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "bangalore-pub-trail-passport.txt";
    a.click();
    showToast("💾 Passport summary saved!");
  });

  // Edit Modal
  document.getElementById("edit-project-btn").addEventListener("click", () => {
    if (state.activePub) {
      openEditModal(state.activePub);
    }
  });
  document.getElementById("close-edit-btn").addEventListener("click", () => {
    document.getElementById("edit-modal").classList.add("hidden");
  });
  document.getElementById("cancel-edit-btn").addEventListener("click", () => {
    document.getElementById("edit-modal").classList.add("hidden");
  });
  document.getElementById("edit-backdrop-close").addEventListener("click", () => {
    document.getElementById("edit-modal").classList.add("hidden");
  });

  document.getElementById("edit-member-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const pubId = document.getElementById("edit-pub-id").value;
    const pub = state.pubs.find(p => p.id === pubId);
    if (pub) {
      pub.member.name = document.getElementById("edit-name").value;
      pub.member.role = document.getElementById("edit-role").value;
      pub.project.title = document.getElementById("edit-title").value;
      pub.project.description = document.getElementById("edit-desc").value;
      pub.project.techStack = document.getElementById("edit-tech").value.split(",").map(s => s.trim());
      pub.project.drinkName = document.getElementById("edit-drink").value;
      pub.project.repoUrl = document.getElementById("edit-github").value;
      pub.project.liveUrl = document.getElementById("edit-demo").value;

      state.updatePub(pub);
      renderPubMarkers(mapController);
      renderDirectoryCards();
      openPubModal(pub);
      document.getElementById("edit-modal").classList.add("hidden");
      showToast(`Updated details for ${pub.name}!`);
    }
  });

  // Help Modal
  document.getElementById("controls-help-btn").addEventListener("click", () => {
    document.getElementById("help-modal").classList.remove("hidden");
  });
  document.getElementById("close-help-btn").addEventListener("click", () => {
    document.getElementById("help-modal").classList.add("hidden");
  });
  document.getElementById("help-backdrop-close").addEventListener("click", () => {
    document.getElementById("help-modal").classList.add("hidden");
  });
  document.getElementById("got-it-btn").addEventListener("click", () => {
    document.getElementById("help-modal").classList.add("hidden");
    soundEngine.init();
  });
});
