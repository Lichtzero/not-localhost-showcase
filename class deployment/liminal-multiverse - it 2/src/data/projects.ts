export interface WizardOwner {
  name: string;
  wizardTitle: string;
  avatarRune: string;
}

export interface ProjectWorld {
  id: string;
  // Where clicking this planet takes the visitor. Leave empty to make the planet non-clickable.
  url: string;
  code: string;
  title: string;
  subtitle: string;
  year: string;
  sector: 'BIOMETRICS & PERCEPTION' | 'SYNTHETIC ENTITIES' | 'PLANETARY ALGORITHMS';
  themeColor: string;
  sphere: {
    radius: number;
    position: [number, number, number];
    colorPrimary: string;
    colorSecondary: string;
    colorTertiary: string;
    fresnelPower: number;
    surfaceDistortion: number;
    wireColor: string;
    rings: Array<{
      radius: number;
      tube: number;
      tiltX: number;
      tiltY: number;
      tiltZ: number;
      speed: number;
      hasSatellite: boolean;
      satelliteColor: string;
    }>;
  };
  observerFigure: {
    stance: 'surveyor' | 'wanderer' | 'monolith' | 'oracle' | 'sentinel';
    quote: string;
    beaconColor: string;
  };
  wizardOwner: WizardOwner;
}

// Each project lives in its own JSON file in ./projects/.
// Drop a new .json file in that folder and it appears on the site automatically.
// Files load in alphabetical filename order (e.g. firstname-lastname.json).
const projectFiles = import.meta.glob<ProjectWorld>('./projects/*.json', {
  eager: true,
  import: 'default',
});

export const INITIAL_PROJECTS: ProjectWorld[] = Object.keys(projectFiles)
  .sort()
  .map((path) => projectFiles[path]);
