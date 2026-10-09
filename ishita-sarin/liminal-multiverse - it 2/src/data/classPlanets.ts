import type { ProjectWorld } from './projects';

/* ------------------------------------------------------------------ *
 * Types that mirror public/showcase-manifest.json
 * (written by scripts/sync-showcase.mjs on every build / deploy)
 * ------------------------------------------------------------------ */

export interface ClassCommit {
  sha: string;
  date: string;
  author: string;
  subject: string;
}

export type ClassKind = 'html' | 'app' | 'pdf' | 'source';

export interface ClassIteration {
  label: string;
  task: number;
  kind: ClassKind;
  title: string;
  description: string;
  previewUrl: string | null;
  thumbnail: string | null;
  note: string | null;
  githubUrl: string;
  fileCount: number;
  files: string[];
  commit: ClassCommit | null;
}

export interface ClassPerson {
  slug: string;
  name: string;
  status: 'active' | 'dormant';
  githubUrl: string;
  updatedAt: string | null;
  activity: ClassCommit[];
  latest: ClassIteration | null;
  iterations: ClassIteration[];
}

export interface ClassManifest {
  generatedAt: string;
  repo: { url: string; branch: string };
  hub: string;
  people: ClassPerson[];
}

/* ------------------------------------------------------------------ *
 * Helpers
 * ------------------------------------------------------------------ */

/** Resolve a manifest-relative path against the page, so it works on GitHub Pages sub-paths. */
export const resolveAsset = (rel: string): string => new URL(rel, document.baseURI).toString();

export function timeAgo(iso: string | null | undefined, now = Date.now()): string {
  if (!iso) return 'never';
  const diff = Math.max(0, now - new Date(iso).getTime());
  const min = Math.floor(diff / 60000);
  if (min < 1) return 'just now';
  if (min < 60) return `${min} min ago`;
  const hr = Math.floor(min / 60);
  if (hr < 24) return `${hr} hr ago`;
  const day = Math.floor(hr / 24);
  if (day < 30) return `${day} day${day === 1 ? '' : 's'} ago`;
  const mo = Math.floor(day / 30);
  return `${mo} mo ago`;
}

export const KIND_LABEL: Record<ClassKind, string> = {
  html: 'LIVE PAGE',
  app: 'LIVE APP',
  pdf: 'PDF',
  source: 'SOURCE ONLY',
};

function hash(str: string): number {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function hsl(h: number, s: number, l: number): string {
  s /= 100;
  l /= 100;
  const k = (n: number) => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  const hex = (x: number) => Math.round(x * 255).toString(16).padStart(2, '0');
  return `#${hex(f(0))}${hex(f(8))}${hex(f(4))}`;
}

/** Fibonacci shell around the hub: even spread, slightly flattened so it reads as a disc-ish halo. */
function shellPosition(i: number, n: number, seed: number): [number, number, number] {
  const golden = Math.PI * (3 - Math.sqrt(5));
  const y = n === 1 ? 0 : 1 - (i / (n - 1)) * 2;
  const r = Math.sqrt(Math.max(0, 1 - y * y));
  const theta = golden * i + (seed % 100) / 100;
  const radius = 38 + (seed % 9); // 38 – 46
  return [Math.cos(theta) * r * radius, y * radius * 0.42, Math.sin(theta) * r * radius];
}

const STANCES = ['surveyor', 'wanderer', 'monolith', 'oracle', 'sentinel'] as const;
const STAFFS = ['crystal-orb', 'arcane-rod', 'mycelial-scythe', 'stasis-scepter', 'tensor-cube'] as const;

/* ------------------------------------------------------------------ *
 * Manifest -> planets
 * ------------------------------------------------------------------ */

export function buildClassPlanets(manifest: ClassManifest): ProjectWorld[] {
  // Stable order (by slug) so a planet never jumps around when somebody pushes.
  const people = [...manifest.people].sort((a, b) => a.slug.localeCompare(b.slug));
  const now = Date.now();

  return people.map((person, i) => {
    const seed = hash(person.slug);
    const hue = seed % 360;
    const dormant = person.status === 'dormant';
    const latest = person.latest;

    const ageDays = person.updatedAt ? (now - new Date(person.updatedAt).getTime()) / 86400000 : 999;
    const freshness = dormant ? 0 : Math.max(0, 1 - ageDays / 14); // 1 = just pushed, 0 = older than 2 weeks

    const colorPrimary = dormant ? '#3a4a6e' : hsl(hue, 85, 56);
    const colorSecondary = dormant ? '#222c47' : hsl((hue + 42) % 360, 78, 44);
    const colorTertiary = dormant ? '#5f7fb8' : hsl((hue + 180) % 360, 92, 62);
    const wire = dormant ? '#4c6195' : hsl(hue, 90, 66);

    const title = latest ? latest.title : 'AWAITING FIRST TRANSMISSION';
    const stance = STANCES[seed % STANCES.length];
    const updatedWords = person.updatedAt ? `UPDATED ${timeAgo(person.updatedAt).toUpperCase()}` : 'NO SIGNAL YET';

    return {
      id: `class-${person.slug}`,
      code: `ORBIT-${String(i + 1).padStart(2, '0')} // @${person.slug}`,
      title: person.name.toUpperCase(),
      subtitle: title,
      year: person.updatedAt ? String(new Date(person.updatedAt).getFullYear()) : '—',
      classification: dormant ? 'DORMANT // AWAITING UPLOAD' : `${latest ? KIND_LABEL[latest.kind] : ''} // ${updatedWords}`,
      sector: 'CLASS ORBIT',
      tags: [latest ? KIND_LABEL[latest.kind] : 'DORMANT', latest ? latest.label : 'no iteration yet'],
      themeColor: colorPrimary,
      accentGlow: colorTertiary,
      sphere: {
        radius: dormant ? 1.8 : 2.3 + freshness * 0.9,
        position: shellPosition(i, people.length, seed),
        colorPrimary,
        colorSecondary,
        colorTertiary,
        fresnelPower: dormant ? 3.2 : 2.3,
        surfaceDistortion: dormant ? 0.06 : 0.14 + freshness * 0.08,
        wireColor: wire,
        rings: dormant
          ? [{ radius: 3.4, tube: 0.012, tiltX: 0.6, tiltY: 0.2, tiltZ: 0.1, speed: 0.0012, hasSatellite: false, satelliteColor: colorTertiary }]
          : [
              { radius: 4.2, tube: 0.02, tiltX: ((seed >> 3) % 150) / 100 - 0.75, tiltY: ((seed >> 7) % 150) / 100 - 0.75, tiltZ: 0.2, speed: 0.003, hasSatellite: true, satelliteColor: colorTertiary },
              ...(freshness > 0.35
                ? [{ radius: 5.2, tube: 0.014, tiltX: -0.5, tiltY: 0.8, tiltZ: ((seed >> 11) % 100) / 100, speed: -0.002, hasSatellite: false, satelliteColor: colorSecondary }]
                : []),
            ],
      },
      observerFigure: {
        stance,
        label: `@${person.slug.toUpperCase()}`,
        status: updatedWords,
        quote: latest?.commit ? `“${latest.commit.subject}”` : '“This world has not been transmitted yet.”',
        beaconColor: colorPrimary,
      },
      wizardOwner: {
        name: person.name,
        wizardTitle: latest ? latest.title : 'Keeper of an empty world',
        role: 'Class member',
        avatarRune: dormant ? '◌' : '✦',
        color: colorPrimary,
        staffType: STAFFS[seed % STAFFS.length],
        monologue: [],
      },
      abstract: latest?.description ?? '',
      manifesto: [],
      speculativeTechnology: {
        name: '',
        patentNumber: '',
        jurisdiction: '',
        description: '',
        specifications: [],
        threatLevel: 'NOMINAL',
      },
      interactiveSimulation: { type: 'gaze-tax', title: '', systemPrompt: '', actionLabel: '' },
      artifacts: [],
      audioIntercept: { frequency: '', source: '', carrier: '', transcript: '' },
      classEntry: person,
    } satisfies ProjectWorld;
  });
}
