#!/usr/bin/env node
/**
 * sync-showcase.mjs
 *
 * Scans the whole class repository, finds the LATEST piece of work for every
 * person, and writes:
 *
 *   public/showcase-manifest.json   -> one entry per person (= one planet)
 *   public/showcase/<person>/...    -> a copy of every previewable iteration
 *
 * The Liminal Multiverse reads the manifest at runtime and turns every entry
 * into a planet. Run this before every build (`npm run sync`) and the planets
 * always reflect whatever people pushed last. Nobody has to edit any code.
 *
 * Usage:
 *   node scripts/sync-showcase.mjs                # manifest + copy static work
 *   node scripts/sync-showcase.mjs --build-apps   # also build Vite/React projects
 *   node scripts/sync-showcase.mjs --out dist     # write somewhere else
 *
 * "Latest" = highest task number, then most recent git commit, then the
 * highest-numbered folder name. Folder names do not need to follow any rule.
 */

import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const projectDir = path.resolve(here, '..');

const args = process.argv.slice(2);
const flag = (name) => args.includes(name);
const option = (name, fallback) => {
  const i = args.indexOf(name);
  return i >= 0 && args[i + 1] ? args[i + 1] : fallback;
};

const BUILD_APPS = flag('--build-apps');
const OUT_DIR = path.resolve(projectDir, option('--out', 'public'));

// The folder that hosts the multiverse itself. It is the "sun", not a planet.
const HUB = option('--hub', 'medha-halapnavar');
// Top-level folders that are not people.
const NOT_PEOPLE = new Set(['tasks', 'node_modules', HUB]);

const IGNORED_FILES = new Set(['README.md', '.DS_Store', '.gitignore', 'Thumbs.db']);
const SKIP_PATH = /(^|\/)(\.pio|node_modules|\.git|libdeps|\.venv|venv|__pycache__|\.aistudio)(\/|$)/;
const MAX_FILE_BYTES = 20 * 1024 * 1024;
const IMAGE_EXT = /\.(png|jpe?g|webp|gif|svg)$/i;
const BOILERPLATE = /AI Studio|Run and deploy|GHBanner|Do your iterations|everything you need to run|^Prerequisites/i;

// ---------------------------------------------------------------- helpers

const git = (cwd, ...gitArgs) =>
  execFileSync('git', gitArgs, { cwd, encoding: 'utf8', maxBuffer: 256 * 1024 * 1024 });

const repoRoot = git(projectDir, 'rev-parse', '--show-toplevel').trim();

function repoInfo() {
  let url = 'https://github.com/arko97x/not-localhost-showcase';
  try {
    const raw = git(repoRoot, 'remote', 'get-url', 'origin').trim();
    const m = raw.match(/github\.com[:/]([^/]+)\/([^/.]+)(\.git)?$/i);
    if (m) url = `https://github.com/${m[1]}/${m[2]}`;
  } catch {
    /* keep default */
  }
  let branch = 'main';
  try {
    const b = git(repoRoot, 'rev-parse', '--abbrev-ref', 'HEAD').trim();
    if (b && b !== 'HEAD') branch = b;
  } catch {
    /* keep default */
  }
  return { url, branch };
}
const REPO = repoInfo();

const naturalCompare = (a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' });
const slugify = (s) =>
  s
    .toLowerCase()
    .replace(/\.[a-z0-9]+$/i, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '') || 'item';
const titleCase = (slug) => slug.split('-').filter(Boolean).map((w) => w[0].toUpperCase() + w.slice(1)).join(' ');
const encodePath = (p) => p.split('/').map(encodeURIComponent).join('/');
const githubTree = (rel, isFile = false) =>
  `${REPO.url}/${isFile ? 'blob' : 'tree'}/${REPO.branch}/${encodePath(rel)}`;

function lastCommit(rel, count = 1) {
  const out = git(repoRoot, 'log', `-${count}`, '--format=%H%x1f%aI%x1f%an%x1f%s', '--', rel).trim();
  if (!out) return [];
  return out.split('\n').map((line) => {
    const [sha, date, author, subject] = line.split('\x1f');
    return { sha: sha.slice(0, 7), date, author, subject };
  });
}

function readTracked(rel) {
  try {
    return fs.readFileSync(path.join(repoRoot, rel), 'utf8');
  } catch {
    return null;
  }
}

function firstParagraph(md) {
  const blocks = md.split(/\n\s*\n/).map((b) => b.trim());
  for (const b of blocks) {
    if (!b || b.startsWith('#') || b.startsWith('<') || b.startsWith('```') || b.startsWith('![')) continue;
    const clean = b
      .replace(/^>\s*/gm, '')
      .replace(/!?\[([^\]]*)\]\([^)]*\)/g, '$1') // [text](url) -> text
      .replace(/\s+/g, ' ')
      .replace(/[*_`]/g, '')
      .trim();
    if (!clean || BOILERPLATE.test(clean)) continue;
    return clean.slice(0, 280);
  }
  return '';
}

function firstHeading(md) {
  const m = md.match(/^#\s+(.+)$/m);
  return m && !BOILERPLATE.test(m[1]) ? m[1].trim() : '';
}

// ------------------------------------------------------- find all the work

const allTracked = git(repoRoot, 'ls-files', '-z').split('\0').filter(Boolean);

const peopleSlugs = [...new Set(allTracked.map((f) => f.split('/')[0]))]
  .filter((s) => allTracked.some((f) => f.startsWith(`${s}/`)))
  .filter((s) => !s.startsWith('.') && !NOT_PEOPLE.has(s) && allTracked.some((f) => f.startsWith(`${s}/`) && f.includes('/')))
  .sort(naturalCompare);

/** Split a person's tracked files into "units" (one unit = one iteration / project). */
function findUnits(person) {
  const prefix = `${person}/`;
  const files = allTracked.filter((f) => f.startsWith(prefix));
  const units = new Map(); // key = path relative to repo root

  for (const file of files) {
    const parts = file.split('/').slice(1); // drop person
    if (!parts.length) continue;

    let task = 0;
    let rest = parts;
    if (/^task-?\d+$/i.test(parts[0])) {
      task = Number(parts[0].replace(/\D/g, ''));
      rest = parts.slice(1);
    }
    if (!rest.length) continue;

    const top = rest[0];
    if (IGNORED_FILES.has(top) || top.startsWith('.')) continue;

    const isFileUnit = rest.length === 1;
    if (isFileUnit && !/\.(html?|pdf)$/i.test(top)) continue; // loose files: only html / pdf count

    const unitRel = [person, ...(parts.length === rest.length ? [] : [parts[0]]), top].join('/');
    if (!units.has(unitRel)) {
      units.set(unitRel, { rel: unitRel, name: top, task, isFile: isFileUnit, files: [] });
    }
    units.get(unitRel).files.push(isFileUnit ? top : rest.slice(1).join('/'));
  }

  const list = [...units.values()].map((u) => ({ ...u, commit: lastCommit(u.rel)[0] ?? null }));
  list.sort(
    (a, b) =>
      b.task - a.task ||
      (b.commit?.date ?? '').localeCompare(a.commit?.date ?? '') ||
      naturalCompare(b.name, a.name),
  );
  return list;
}

// ------------------------------------------------------------ classify one

function classify(unit) {
  const files = unit.files.filter((f) => !SKIP_PATH.test(f));
  const rootFiles = files.filter((f) => !f.includes('/'));

  if (unit.isFile) {
    return /\.pdf$/i.test(unit.name)
      ? { kind: 'pdf', entry: unit.name }
      : { kind: 'html', entry: unit.name };
  }

  let pkg = null;
  if (rootFiles.includes('package.json')) {
    try {
      pkg = JSON.parse(readTracked(`${unit.rel}/package.json`) ?? 'null');
    } catch {
      pkg = null;
    }
  }

  if (pkg?.scripts?.build && rootFiles.includes('index.html')) return { kind: 'app', entry: 'index.html', pkg };
  if (rootFiles.includes('index.html')) return { kind: 'html', entry: 'index.html' };
  const anyHtml = rootFiles.filter((f) => /\.html?$/i.test(f)).sort(naturalCompare)[0];
  if (anyHtml) return { kind: 'html', entry: anyHtml };
  const anyPdf = rootFiles.filter((f) => /\.pdf$/i.test(f)).sort(naturalCompare)[0];
  if (anyPdf) return { kind: 'pdf', entry: anyPdf };
  return { kind: 'source', entry: null };
}

// ------------------------------------------------------------- copy / build

function copyTracked(unit, destDir, only) {
  let total = 0;
  const base = unit.isFile ? path.posix.dirname(unit.rel) : unit.rel;
  const list = unit.isFile ? [path.posix.basename(unit.rel)] : unit.files;
  for (const rel of list) {
    if (SKIP_PATH.test(rel)) continue;
    if (only && !only(rel)) continue;
    const src = path.join(repoRoot, base, rel);
    let stat;
    try {
      stat = fs.statSync(src);
    } catch {
      continue;
    }
    if (!stat.isFile() || stat.size > MAX_FILE_BYTES) continue;
    const dest = path.join(destDir, rel);
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.copyFileSync(src, dest);
    total += stat.size;
  }
  return total;
}


/**
 * AI Studio apps often reference images as "/src/assets/..." (works on its dev server, breaks on a
 * sub-path host). Copy those files next to the build and point the references at them.
 */
function fixAbsoluteAssetPaths(workDir, destDir) {
  const assets = path.join(workDir, 'src', 'assets');
  if (!fs.existsSync(assets)) return;
  fs.cpSync(assets, path.join(destDir, 'src', 'assets'), { recursive: true });
  const walk = (dir) =>
    fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
      const full = path.join(dir, e.name);
      return e.isDirectory() ? (e.name === 'src' && dir === destDir ? [] : walk(full)) : [full];
    });
  for (const file of walk(destDir)) {
    const ext = path.extname(file).toLowerCase();
    if (!['.js', '.css', '.html'].includes(ext)) continue;
    const prefix = ext === '.css' ? '../src/assets/' : './src/assets/';
    const src = fs.readFileSync(file, 'utf8');
    const out = src.replace(/(["'`(])\/src\/assets\//g, `$1${prefix}`);
    if (out !== src) fs.writeFileSync(file, out);
  }
}

function buildApp(unit, destDir) {
  const work = fs.mkdtempSync(path.join(os.tmpdir(), 'showcase-app-'));
  try {
    copyTracked(unit, work);
    const hasLock = fs.existsSync(path.join(work, 'package-lock.json'));
    const run = (cmd, a) =>
      execFileSync(cmd, a, { cwd: work, stdio: 'pipe', timeout: 5 * 60 * 1000, env: { ...process.env, CI: '1' } });
    run('npm', [hasLock ? 'ci' : 'install', '--no-audit', '--no-fund', '--ignore-scripts', '--legacy-peer-deps']);
    fs.rmSync(destDir, { recursive: true, force: true });
    run('npm', ['run', 'build', '--', '--base=./', `--outDir=${destDir}`, '--emptyOutDir']);
    fixAbsoluteAssetPaths(work, destDir);
    return { ok: fs.existsSync(path.join(destDir, 'index.html')) };
  } catch (err) {
    const msg = String(err.stderr || err.message || err).split('\n').filter(Boolean).slice(-3).join(' | ');
    return { ok: false, error: msg.slice(0, 300) };
  } finally {
    fs.rmSync(work, { recursive: true, force: true });
  }
}

// ------------------------------------------------------------------- main

fs.rmSync(path.join(OUT_DIR, 'showcase'), { recursive: true, force: true });
fs.mkdirSync(path.join(OUT_DIR, 'showcase'), { recursive: true });

const people = [];

for (const person of peopleSlugs) {
  const units = findUnits(person);
  const activity = lastCommit(person, 5);
  const iterations = [];

  for (const unit of units) {
    const info = classify(unit);
    const unitSlug = slugify(unit.name);
    const relOut = `showcase/${person}/${unitSlug}`;
    const dest = path.join(OUT_DIR, relOut);
    let { kind } = info;
    let note;

    if (kind === 'html' || kind === 'pdf') {
      copyTracked(unit, dest);
    } else if (kind === 'app') {
      if (BUILD_APPS) {
        const res = buildApp(unit, dest);
        if (!res.ok) {
          kind = 'source';
          note = `Build failed: ${res.error}`;
        }
      } else {
        kind = 'source';
        note = 'Needs a build step. Run sync with --build-apps to get a live preview.';
      }
    }

    // Thumbnail: first image sitting in the unit root.
    const thumbFile = unit.files.filter((f) => !f.includes('/') && IMAGE_EXT.test(f)).sort(naturalCompare)[0];
    let thumbnail = null;
    if (thumbFile) {
      copyTracked(unit, dest, (f) => f === thumbFile);
      thumbnail = `${relOut}/${encodePath(thumbFile)}`;
    }

    // Title / description.
    const readme = unit.isFile ? null : readTracked(`${unit.rel}/README.md`);
    let htmlTitle = '';
    let htmlDesc = '';
    if (info.entry && (kind === 'html' || kind === 'app')) {
      const src = unit.isFile
        ? readTracked(unit.rel)
        : readTracked(`${unit.rel}/${info.entry}`);
      if (src) {
        htmlTitle = (src.match(/<title[^>]*>([^<]*)<\/title>/i)?.[1] ?? '').trim();
        htmlDesc = (src.match(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']*)["']/i)?.[1] ?? '').trim();
      }
    }
    const pdfTitle = kind === 'pdf' && info.entry ? info.entry.replace(/\.pdf$/i, '') : '';
    const title =
      pdfTitle ||
      (htmlTitle && !BOILERPLATE.test(htmlTitle) && htmlTitle) ||
      (readme && firstHeading(readme)) ||
      unit.name.replace(/\.[a-z0-9]+$/i, '');
    const description = (readme && firstParagraph(readme)) || htmlDesc || '';

    const previewUrl =
      kind === 'html' || kind === 'pdf'
        ? `${relOut}/${encodePath(info.entry)}`
        : kind === 'app'
          ? `${relOut}/index.html`
          : null;

    iterations.push({
      label: unit.name,
      task: unit.task,
      kind,
      title,
      description,
      previewUrl,
      thumbnail,
      note: note ?? null,
      githubUrl: githubTree(unit.rel, unit.isFile),
      fileCount: unit.files.length,
      files: unit.isFile ? [unit.name] : unit.files.filter((f) => !SKIP_PATH.test(f) && !f.split('/').some((seg) => seg.startsWith('.'))).slice(0, 24),
      commit: unit.commit,
    });
  }

  const latest = iterations[0] ?? null;
  people.push({
    slug: person,
    name: titleCase(person),
    status: latest ? 'active' : 'dormant',
    githubUrl: githubTree(person),
    // "Updated" follows the latest piece of work; falls back to any activity in the folder.
    updatedAt: latest?.commit?.date ?? activity[0]?.date ?? null,
    activity,
    latest,
    iterations,
  });
}

// Most recently updated first, so the freshest planets are listed first.
people.sort((a, b) => (b.updatedAt ?? '').localeCompare(a.updatedAt ?? '') || naturalCompare(a.slug, b.slug));

const manifest = {
  generatedAt: new Date().toISOString(),
  repo: REPO,
  hub: HUB,
  people,
};

fs.writeFileSync(path.join(OUT_DIR, 'showcase-manifest.json'), JSON.stringify(manifest, null, 2));

const live = people.filter((p) => p.latest?.previewUrl).length;
console.log(
  `[sync-showcase] ${people.length} planets: ${live} with live preview, ` +
    `${people.filter((p) => p.status === 'active').length - live} source-only, ` +
    `${people.filter((p) => p.status === 'dormant').length} awaiting first upload`,
);
for (const p of people) {
  console.log(
    `  ${p.slug.padEnd(22)} ${p.status.padEnd(8)} ${(p.latest?.kind ?? '-').padEnd(7)} ${p.latest?.label ?? ''}`,
  );
}
