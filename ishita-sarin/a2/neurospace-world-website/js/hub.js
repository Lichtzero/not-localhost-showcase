/* The archive screen: nine cards over a backdrop of drifting memory frames. No space imagery, just a quiet room of memories. */
import { THREE, glow, at, rand } from './kit.js';
import { E } from './engine.js';
import { A } from './audio.js';
import { ROLES } from './roles.js';
import { paintMemory } from './explain.js';

const V = THREE.Vector3;
const hex = n => '#' + n.toString(16).padStart(6, '0');

/* ---------------------------------------------------------------- backdrop (3D) */
export function createBackdrop() {
  const scene = new THREE.Scene(); scene.background = new THREE.Color(0x0a0809); scene.fog = new THREE.FogExp2(0x0a0809, 0.03);
  const cv = document.createElement('canvas'); cv.width = 384; cv.height = 256; paintMemory(cv.getContext('2d'), 384, 256, { dad: true });
  const tex = new THREE.CanvasTexture(cv); tex.colorSpace = THREE.SRGBColorSpace;
  const frames = [];
  for (let i = 0; i < 34; i++) {
    const g = new THREE.Group(), w = rand(1.4, 3.4), h = w * 0.68, textured = i % 4 === 0;
    const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), textured ? new THREE.MeshBasicMaterial({ map: tex, transparent: true, opacity: 0.17 }) : new THREE.MeshBasicMaterial({ color: 0xe8c9a0, transparent: true, opacity: rand(0.025, 0.07) }));
    const l = new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.PlaneGeometry(w, h)), new THREE.LineBasicMaterial({ color: 0xf1e3cf, transparent: true, opacity: rand(0.12, 0.3) }));
    g.add(m, l); g.position.set(rand(-16, 16), rand(-7, 7), -rand(4, 24)); g.rotation.set(rand(-0.15, 0.15), rand(-0.35, 0.35), rand(-0.1, 0.1));
    scene.add(g); frames.push({ g, m, l, home: g.position.clone(), sp: rand(0.15, 0.4), ph: rand(0, 6.28), s: 1 });
  }
  const halo = glow(0xffb36a, 40, 0.05); halo.position.set(0, 0, -16); scene.add(halo);
  let conv = 0, converging = false;
  const world = {
    scene, frames,
    enter() { E.aim(new V(0, 0, 6), new V(0, 0, -12), { par: 0.7, snap: true, damp: 2, fov: 55 }); },
    update(dt, t) {
      frames.forEach((f, i) => {
        if (converging) {
          conv = Math.min(1, conv + dt / 7); const e = conv * conv * (3 - 2 * conv);
          f.g.position.lerpVectors(f.home, new V(0, 0, -9 - (i % 5) * 0.2), e); f.g.scale.setScalar(1 - e * 0.55); f.l.material.opacity = Math.min(0.9, f.l.material.opacity + dt * 0.1);
        } else {
          f.g.position.x = f.home.x + Math.sin(t * f.sp + f.ph) * 0.9; f.g.position.y = f.home.y + Math.cos(t * f.sp * 0.8 + f.ph) * 0.5;
          f.g.rotation.z += Math.sin(t * 0.2 + f.ph) * dt * 0.01;
        }
      });
    },
    /* every life collapses into one record */
    async finale(T) {
      converging = true; A.ambient({ freqs: [41, 61.7, 82.4], cutoff: 260, gain: 0.2, lfo: 0.05 }); A.blip(40, 6, 0.4, 'sine', 3);
      const rec = new THREE.Mesh(new THREE.PlaneGeometry(4.2, 2.8), new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0 }));
      rec.position.set(0, 0, -8.5); scene.add(rec);
      const edge = new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.PlaneGeometry(4.3, 2.9)), new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0 })); edge.position.copy(rec.position); scene.add(edge);
      E.aim(new V(0, 0, 2), new V(0, 0, -9), { par: 0.12, damp: 0.6, fov: 50 });
      await T.wait(4500); E.tween(rec.material, 'opacity', 0.12, 3); E.tween(edge.material, 'opacity', 0.9, 3); await T.wait(3200);
      return { rec, edge };
    },
  };
  return world;
}

/* ---------------------------------------------------------------- thumbnails */
const P = {
  teacher(x, W, H, c) {
    x.fillStyle = '#12302a'; x.fillRect(W * .12, H * .12, W * .76, H * .34); x.strokeStyle = '#8b6a40'; x.lineWidth = 5; x.strokeRect(W * .12, H * .12, W * .76, H * .34);
    x.fillStyle = 'rgba(255,255,255,.7)'; x.fillRect(W * .2, H * .2, W * .3, 3); x.fillRect(W * .2, H * .27, W * .42, 3);
    [0.22, 0.4, 0.58, 0.76].forEach(px => { x.fillStyle = c; x.beginPath(); x.arc(W * px, H * .73, 11, 0, 7); x.fill(); x.fillRect(W * px - 11, H * .73 + 11, 22, 30); });
    x.strokeStyle = 'rgba(255,255,255,.7)'; x.setLineDash([5, 5]); x.lineWidth = 2; x.beginPath(); x.arc(W * .5, H * .58, 15, 0, 7); x.stroke(); x.strokeRect(W * .5 - 15, H * .58 + 15, 30, 44); x.setLineDash([]);
    x.fillStyle = '#ff4d4d'; x.beginPath(); x.arc(W * .84, H * .08, 6, 0, 7); x.fill();
  },
  authority(x, W, H, c) {
    for (let i = 0; i < 4; i++) for (let j = 0; j < 7; j++) { x.fillStyle = (i * 3 + j) % 5 === 0 ? '#ff6b6b' : 'rgba(150,220,255,' + (0.25 + ((i + j) % 3) * 0.2) + ')'; x.fillRect(W * (.12 + i * .2), H * (.14 + j * .1), W * .14, H * .06); }
    x.strokeStyle = 'rgba(255,255,255,.8)'; x.lineWidth = 2; x.strokeRect(W * .12 - 4, H * .14 - 4, W * .74, H * .72);
  },
  patient(x, W, H, c) {
    const g = x.createLinearGradient(0, 0, 0, H); g.addColorStop(0, '#ffd9c4'); g.addColorStop(1, '#ffb3d2'); x.fillStyle = g; x.fillRect(0, 0, W, H);
    x.fillStyle = '#fff1a8'; x.beginPath(); x.arc(W * .74, H * .24, 30, 0, 7); x.fill();
    x.fillStyle = '#9ed8a8'; x.beginPath(); x.ellipse(W * .3, H * .95, W * .6, H * .3, 0, 0, 7); x.fill();
    [[.2, .74], [.38, .8], [.55, .72], [.72, .78]].forEach(([px, py], i) => { x.fillStyle = ['#ff7aa8', '#ffe066', '#fff', '#ff9bd0'][i]; x.beginPath(); x.arc(W * px, H * py, 9, 0, 7); x.fill(); });
    x.strokeStyle = 'rgba(60,20,40,.75)'; x.setLineDash([4, 5]); x.lineWidth = 2; x.beginPath(); x.arc(W * .3, H * .3, 24, 0, 7); x.stroke(); x.setLineDash([]);
  },
  relapser(x, W, H, c) {
    x.fillStyle = '#3a2410'; x.fillRect(W * .15, H * .12, W * .7, H * .76); x.fillStyle = '#ffcf8a'; x.fillRect(W * .2, H * .17, W * .6, H * .66);
    x.strokeStyle = '#2a1608'; x.lineWidth = 5; x.beginPath(); x.arc(W * .5, H * .5, 46, Math.PI * .15, Math.PI * 1.7); x.stroke();
    x.fillStyle = '#2a1608'; x.beginPath(); x.moveTo(W * .5 + 44, H * .5 - 12); x.lineTo(W * .5 + 62, H * .5 + 6); x.lineTo(W * .5 + 30, H * .5 + 12); x.fill();
  },
  animal(x, W, H, c) {
    x.fillStyle = c; x.beginPath(); x.ellipse(W * .46, H * .58, 50, 26, 0, 0, 7); x.fill(); x.beginPath(); x.arc(W * .72, H * .48, 20, 0, 7); x.fill(); x.fillRect(W * .76, H * .5, 22, 12);
    x.beginPath(); x.moveTo(W * .66, H * .4); x.lineTo(W * .7, H * .28); x.lineTo(W * .74, H * .4); x.fill(); [-30, -16, 24, 38].forEach(dx => x.fillRect(W * .46 + dx, H * .6, 8, 40));
    x.strokeStyle = 'rgba(255,255,255,.55)'; x.lineWidth = 2; for (let k = 0; k < 3; k++) { x.beginPath(); x.moveTo(W * .1, H * (.8 + k * .04)); x.bezierCurveTo(W * .3, H * (.7 + k * .04), W * .5, H * (.9 + k * .04), W * .9, H * (.78 + k * .04)); x.stroke(); }
  },
  minor(x, W, H, c) {
    x.strokeStyle = 'rgba(255,255,255,.6)'; x.lineWidth = 2; x.beginPath(); x.moveTo(W * .22, H * .1); x.lineTo(W * .22, H * .9); x.stroke(); for (let i = 0; i <= 9; i++) { x.beginPath(); x.moveTo(W * .22, H * (.1 + i * .089)); x.lineTo(W * (i % 3 === 0 ? .34 : .29), H * (.1 + i * .089)); x.stroke(); }
    [[.5, .84, 26], [.64, .66, 44], [.78, .4, 70]].forEach(([px, py, h]) => { x.fillStyle = c; x.beginPath(); x.arc(W * px, H * py - h, 9 + h * .06, 0, 7); x.fill(); x.fillRect(W * px - 7 - h * .04, H * py - h + 12 + h * .06, 14 + h * .08, h); });
  },
  broker(x, W, H, c) {
    [[.14, .14, '#3a2a1a'], [.5, .14, '#1c2a3c'], [.14, .5, '#2a3a2a'], [.5, .5, '#3a1c2a']].forEach(([px, py, col], i) => { x.fillStyle = col; x.fillRect(W * px, H * py, W * .34, H * .3); x.strokeStyle = c; x.lineWidth = 2; x.strokeRect(W * px, H * py, W * .34, H * .3); x.fillStyle = 'rgba(255,255,255,.55)'; x.fillRect(W * px + 10, H * py + 12, 20 + i * 8, 4); });
    x.strokeStyle = '#fff'; x.setLineDash([6, 5]); x.lineWidth = 2; x.strokeRect(W * .3, H * .84, W * .4, H * .1); x.setLineDash([]); x.fillStyle = '#fff'; x.font = '600 18px Roboto Flex, sans-serif'; x.textAlign = 'center'; x.fillText('?', W * .5, H * .92);
  },
  inheritor(x, W, H, c) {
    x.fillStyle = '#efe4cf'; x.save(); x.translate(W * .5, H * .5); x.rotate(-0.06); x.fillRect(-W * .36, -H * .3, W * .72, H * .6); x.strokeStyle = '#1b1a2a'; x.lineWidth = 3; x.beginPath(); x.moveTo(-W * .27, H * .08); x.bezierCurveTo(-W * .2, -H * .2, -W * .1, H * .2, 0, -H * .02); x.bezierCurveTo(W * .08, -H * .16, W * .14, H * .16, W * .26, -H * .06); x.stroke(); x.setLineDash([3, 4]); x.strokeStyle = 'rgba(120,90,40,.6)'; x.beginPath(); x.moveTo(-W * .3, H * .17); x.lineTo(W * .3, H * .17); x.stroke(); x.restore();
  },
  recipient(x, W, H, c) {
    x.fillStyle = '#082826'; x.fillRect(W * .6, H * .24, W * .24, H * .56); x.fillStyle = '#baf6ee'; x.fillRect(W * .64, H * .28, W * .16, H * .48);
    x.fillStyle = c; x.beginPath(); x.ellipse(W * .34, H * .72, 36, 18, 0, 0, 7); x.fill(); x.beginPath(); x.arc(W * .5, H * .64, 14, 0, 7); x.fill(); x.fillRect(W * .52, H * .66, 14, 8); [-20, -8, 16, 26].forEach(dx => x.fillRect(W * .34 + dx, H * .74, 6, 26));
    x.fillStyle = 'rgba(255,255,255,.75)'; x.font = '500 14px Literata, serif'; x.textAlign = 'center'; ['lease', 'fourteenth', 'call'].forEach((w, i) => x.fillText(w, W * (.2 + i * .25), H * (.12 + i * .08)));
  },
};
function thumb(r) {
  const c = document.createElement('canvas'); c.width = 240; c.height = 300; const x = c.getContext('2d'), W = 240, H = 300;
  const g = x.createLinearGradient(0, 0, 0, H); g.addColorStop(0, hex(r.c2)); g.addColorStop(1, '#0a0809'); x.fillStyle = g; x.fillRect(0, 0, W, H);
  if (r.bright) { x.fillStyle = 'rgba(90,209,255,.08)'; x.fillRect(0, 0, W, H); }
  P[r.id](x, W, H, hex(r.color));
  return c;
}

/* ---------------------------------------------------------------- the cards (DOM) */
export function buildCards({ visited, onPick }) {
  const host = document.getElementById('cards'); host.textContent = '';
  ROLES.forEach((r, i) => {
    const done = visited.includes(r.id);
    const b = document.createElement('button'); b.className = 'card' + (done ? ' done' : ''); b.style.setProperty('--c', hex(r.color));
    const wrap = document.createElement('span'); wrap.className = 'pic'; wrap.appendChild(thumb(r)); b.appendChild(wrap);
    b.insertAdjacentHTML('beforeend', `<span class="nm">${r.name}</span><span class="hk">${r.hook}</span><span class="st">${done ? 'Lived. Open again' : 'Live this day'}</span>`);
    b.onmouseenter = () => A.blip(300 + i * 40, 0.3, 0.05, 'sine');
    b.onclick = () => onPick(i);
    host.appendChild(b);
  });
}
