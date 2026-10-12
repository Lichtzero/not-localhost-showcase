export interface ProjectDetails {
  brief: string;
  whatICareAbout: string;
  designProcess: string[];
  experiments: string[];
  finalOutcome: string;
  media: {
    type: "image" | "diagram" | "quote" | "artifact";
    caption: string;
    url?: string;
    aspectRatio?: "video" | "square" | "portrait";
  }[];
  reflections: string;
  externalLinks?: {
    label: string;
    url: string;
    type?: "prototype" | "github" | "publication" | "figma";
  }[];
}

export interface StudentProject {
  id: string;
  number: string; // e.g. "01", "02", etc.
  studentName: string;
  studentRole: string;
  studentBio: string;
  avatarSeed: string;
  projectTitle: string;
  subtitle: string;
  category: "Speculative UI" | "Tactile Systems" | "Visual Essay" | "Service Design" | "Physical Computing" | "Editorial Design" | "Sound & Sense";
  year: string;
  tags: string[];
  coverStyle: {
    bgGradient: string;
    accentColor: string;
    spineColor: string;
    textColor: string;
    badgeText?: string;
    layoutType:
      | "minimal-typographic"
      | "swiss-grid"
      | "abstract-cutout"
      | "generative-mesh"
      | "editorial-split"
      | "tactile-diagram"
      | "monochrome-brutalist"
      | "playful-duotone"
      | "solar-glow"
      | "blueprint-lines"
      | "archival-stamp"
      | "kinetic-waves"
      | "origami-fold"
      | "botanical-glyph"
      | "sonic-bands";
  };
  details: ProjectDetails;
}
