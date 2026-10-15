import { at, THREE, glow, dust, human, ghostMat, textSprite, rand } from '../kit.js';
import { E } from '../engine.js';
import { A } from '../audio.js';
const V = THREE.Vector3;

/* deleted memories of other people in which the suspect appears, already in time order */
const FR = [
  { day: '13 Mar', time: '22:05', who: 'Tessa, bus driver', place: 'Bus 9 to Harbor', line: '“A man in a green coat rode to Harbor. He kept looking at the market. I did not want to keep that.”' },
  { day: '14 Mar', time: '20:12', who: 'Mrs. Okafor', place: 'Bakery, Pier St', line: '“He stood outside the bakery for an hour. I deleted it. It made me uneasy.”' },
  { day: '14 Mar', time: '21:38', who: 'Leo, age 9', place: 'Harbor Market, east door', line: '“He ran past and bumped a stroller. Someone shouted. I deleted it.”' },
  { day: '14 Mar', time: '21:41', who: 'Mr. Chen', place: 'Stairwell, Dock 4', line: '“He took the stairs, not the lift. I only wanted the noise gone.”' },
  { day: '14 Mar', time: '22:10', who: 'Priya', place: 'Canal footbridge', line: '“He hid behind the shutters by the canal. I let it go.”' },
];
const OWN = '“I saw someone I knew. I looked away. I deleted it this morning.”';

export function build() {
  const scene = new THREE.Scene(); scene.background = new THREE.Color(0x01040a); scene.fog = new THREE.FogExp2(0x01040a, 0.028);
  scene.add(new THREE.AmbientLight(0x335577, 1));
  const grid = new THREE.GridHelper(120, 120, 0x123a55, 0x0a1f30); grid.position.y = 0; scene.add(grid);

  // racks: towers of stored memory
  const racks = [];
  for (let side = -1; side <= 1; side += 2) for (let i = 0; i < 18; i++) {
    const h = 9 + (i % 4) * 2, z = 8 - i * 3.6, x = side * (6.5 + (i % 3) * 0.6);
    const geo = new THREE.BoxGeometry(1.1, h, 1.1);
    const e = new THREE.LineSegments(new THREE.EdgesGeometry(geo), new THREE.LineBasicMaterial({ color: 0x3cc8ff, transparent: true, opacity: 0.55 }));
    e.position.set(x, h / 2, z); scene.add(e);
    const m = new THREE.Mesh(geo, new THREE.MeshBasicMaterial({ color: 0x041420 })); m.position.copy(e.position); scene.add(m);
    const strip = glow(0x3cc8ff, 1.6, 0.4); strip.position.set(x - side * 0.6, rand(1, h - 1), z); scene.add(strip); racks.push({ e, strip, ph: i });
  }

  // the deletion pile
  const N = 6000, pg = new THREE.BufferGeometry(), pp = new Float32Array(N * 3);
  for (let i = 0; i < N; i++) { const r = 7 * Math.sqrt(Math.random()), h = 4.2 * Math.pow(Math.max(0, 1 - r / 7), 1.4); pp[i * 3] = Math.cos(i * 2.4) * r; pp[i * 3 + 1] = Math.random() * h; pp[i * 3 + 2] = Math.sin(i * 2.4) * r; }
  pg.setAttribute('position', new THREE.BufferAttribute(pp, 3));
  const pile = new THREE.Points(pg, new THREE.PointsMaterial({ color: 0xff8a3d, size: 0.1, transparent: true, opacity: 0.8, blending: THREE.AdditiveBlending, depthWrite: false }));
  pile.position.set(0, 0, -16); scene.add(pile);
  const pileGlow = glow(0xff7a2d, 18, 0.25); pileGlow.position.set(0, 2, -16); scene.add(pileGlow);
  scene.add(at(dust(500, [30, 14, 40], 0x66ccff, 0.04, 0.4), 0, 6, -10));

  // hologram map
  const holo = new THREE.Group(); holo.position.set(0, 2.2, -6); holo.rotation.x = -0.4; holo.scale.setScalar(1.5); scene.add(holo);
  const hg = new THREE.GridHelper(6, 12, 0x55d8ff, 0x1a5a78); hg.material.transparent = true; hg.material.opacity = 0.7; holo.add(hg);
  const hbase = new THREE.Mesh(new THREE.PlaneGeometry(6, 6), new THREE.MeshBasicMaterial({ color: 0x0a3a55, transparent: true, opacity: 0.25, side: THREE.DoubleSide })); hbase.rotation.x = Math.PI / 2; holo.add(hbase);
  const NODES = [[-2.5, 2.2], [-1.6, 1.0], [-0.6, 1.3], [0.4, 0.0], [1.4, -0.4], [2.5, -1.8]].map(([x, z]) => new V(x, 0.08, z));
  const lineGeo = new THREE.BufferGeometry(); lineGeo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(7 * 3), 3)); lineGeo.setDrawRange(0, 0);
  const line = new THREE.Line(lineGeo, new THREE.LineBasicMaterial({ color: 0xffffff })); holo.add(line);
  const nodeMeshes = NODES.map(p => { const m = glow(0xff9a50, 0.8, 0); m.position.copy(p); holo.add(m); return m; });

  // six fragments in the pile
  const frags = [];
  const spots = [[-3.2, 1.2, 2], [2.8, 1.8, -1], [-1.0, 3.2, -3], [3.5, 0.7, 3], [0.3, 2.4, 1], [-4, 0.8, -2]];
  for (let i = 0; i < 5; i++) {
    const g = new THREE.Group(); g.position.set(pile.position.x + spots[i][0], spots[i][1], pile.position.z + spots[i][2]);
    const core = new THREE.Mesh(new THREE.SphereGeometry(0.2, 12, 10), new THREE.MeshBasicMaterial({ color: 0xffe2b8 })); g.add(core);
    const hit = new THREE.Mesh(new THREE.SphereGeometry(0.9, 8, 6), new THREE.MeshBasicMaterial({ visible: false })); g.add(hit); g.userData.hit = true;
    g.add(glow(0xffb070, 1.6, 0.9)); scene.add(g);
    const lab = E.label(() => g.position.clone().add(new V(0, 0.75, 0)), `<b>${FR[i].time}</b> · ${FR[i].day}<br><small>${FR[i].who}</small>`); lab.alpha = 0.9;
    frags.push({ g, i, state: 'idle', hit, lab });
  }
  E.label(() => new V(0, 6.2, -14), 'Data centre 04<br><small>2.1 billion memories. 61% are marked “deleted”, but kept.</small>', 'am');
  const rowLabs = ['13 March', '14 March'].map((t, k) => { const l = E.label(() => new V(-7.4, k ? 2.6 : 1.0, -9), t, 'am'); l.alpha = 0; return l; });
  const nodeLabs = [];
  let labelsOn = false;
  let pulled = 0, hover = null, own = null, phase = 'pull', panel = null;
  const flights = [];
  const upd = () => { const c = panel.querySelector('#cn'); if (c) c.innerHTML = `Memories pulled <b>${Math.min(pulled, 5)} / 5</b><br>Witnesses asked <b>0</b>`; };
  function arrange(mode) {
    frags.forEach(f => { if (f.state !== 'idle') return; const r = f.i; const tx = mode === 'time' ? -5.8 + r * 2.9 : -5.8 + r * 2.9, ty = mode === 'time' ? 1.8 : (FR[r].day === '13 Mar' ? 1.0 : 2.6), tz = -9;
      E.tween(f.g.position, 'x', tx, 1.2); E.tween(f.g.position, 'y', ty, 1.2); E.tween(f.g.position, 'z', tz, 1.2); });
    labelsOn = true; rowLabs.forEach(l => (l.alpha = mode === 'day' ? 0.95 : 0)); A.blip(500, 0.3, 0.08, 'sine', 1.4);
  }

  function pull(f, idx, text) {
    f.state = 'flying'; E.showSub(text, 'human', 4800);
    A.blip(440 + idx * 90, 0.5, 0.1, 'sine', 1.8); A.murmur(1.4, 0.07, 380 + idx * 40);
    flights.push({ f, t: 0, a: f.g.position.clone(), b: holo.localToWorld(NODES[idx].clone()), idx });
  }
  function draw() {
    const n = pulled + 1, arr = lineGeo.attributes.position;
    for (let i = 0; i < Math.min(pulled, 6); i++) { arr.setXYZ(i, NODES[i].x, NODES[i].y, NODES[i].z); }
    arr.needsUpdate = true; lineGeo.setDrawRange(0, Math.max(0, Math.min(pulled, 6)));
  }

  const world = {
    scene, dbg: { frags, get own(){return own}, holo },
    enter() { E.aim(new V(0, 1.7, 5), new V(0, 2.4, -12), { par: 0.35, snap: true, fov: 62 }); A.ambient({ freqs: [55, 82.4, 110], cutoff: 340, gain: 0.17, lfo: 0.05, shimmer: 0.004 }); },
    update(dt, t) {
      pile.rotation.y += dt * 0.02; pileGlow.material.opacity = 0.22 + Math.sin(t * 1.3) * 0.05;
      racks.forEach(r => (r.strip.material.opacity = 0.25 + Math.sin(t * 1.5 + r.ph) * 0.2));
      frags.forEach(f => { if (f.state === 'idle') { f.g.children[2].material.opacity = 0.7 + Math.sin(t * 3 + f.i) * 0.25; } f.lab.alpha = f.state === 'idle' && (labelsOn || f === hover) ? 0.95 : 0; });
      if (own && own.state === 'idle') own.g.children[2].material.opacity = 0.7 + Math.sin(t * 3) * 0.3;
      const live = frags.concat(own ? [own] : []).filter(f => f.state === 'idle');
      const hit = phase === 'end' ? null : E.pick(live.map(f => f.hit), false); const hf = hit ? live.find(f => f.hit === hit.object) : null;
      if (hf !== hover) { hover = hf; E.cursor(hf ? 'pointer' : 'default'); }
      for (let i = flights.length - 1; i >= 0; i--) {
        const fl = flights[i]; fl.t += dt / 1.6; const p = Math.min(1, fl.t), e = p * p * (3 - 2 * p);
        fl.f.g.position.lerpVectors(fl.a, fl.b, e); fl.f.g.position.y += Math.sin(p * Math.PI) * 1.5;
        if (p >= 1) { flights.splice(i, 1); fl.f.g.visible = false; pulled++; { const nl = E.label(() => holo.localToWorld(NODES[fl.idx].clone()).add(new V(0, 0.45, 0)), `${FR[fl.idx].time}<br><small>${FR[fl.idx].place}</small>`, 'am'); nodeLabs.push(nl); } nodeMeshes[fl.idx].material.opacity = 1; nodeMeshes[fl.idx].scale.setScalar(0.5); draw(); upd(); A.chime(520 + fl.idx * 70, 0.07); }
      }
    },
    click() { if (!hover || phase === 'end') return; const f = hover; if (f === own) { phase = 'end'; ownPull(); return; } const idx = frags.indexOf(f); if (idx >= 0 && f.state === 'idle') pull(f, idx, FR[idx].line); },
    begin() {
            const cv = document.createElement('canvas'); cv.width = 150; cv.height = 180; cv.style.cssText = 'width:100px;height:120px;border-radius:3px;display:block;margin-bottom:6px';
      { const x = cv.getContext('2d'); const g = x.createLinearGradient(0, 0, 0, 180); g.addColorStop(0, '#46586a'); g.addColorStop(1, '#202c38'); x.fillStyle = g; x.fillRect(0, 0, 150, 180); x.fillStyle = '#244a35'; x.beginPath(); x.moveTo(10, 180); x.quadraticCurveTo(14, 118, 75, 112); x.quadraticCurveTo(136, 118, 140, 180); x.fill(); x.fillStyle = '#b98f6f'; x.fillRect(66, 92, 18, 26); x.beginPath(); x.ellipse(75, 72, 26, 32, 0, 0, 7); x.fill(); x.fillStyle = '#1a1210'; x.beginPath(); x.ellipse(75, 52, 28, 18, 0, Math.PI, 0); x.fill(); x.fillStyle = '#1a1210'; x.fillRect(64, 70, 5, 3); x.fillRect(82, 70, 5, 3); x.fillRect(68, 90, 14, 2); x.strokeStyle = 'rgba(255,255,255,.7)'; x.lineWidth = 2; [[6, 18, 6, 6, 18, 6], [144, 18, 144, 6, 132, 6], [6, 162, 6, 174, 18, 174], [144, 162, 144, 174, 132, 174]].forEach(a => { x.beginPath(); x.moveTo(a[0], a[1]); x.lineTo(a[2], a[3]); x.lineTo(a[4], a[5]); x.stroke(); }); }
      const sus = E.panel('', 'ml'); sus.appendChild(cv); sus.insertAdjacentHTML('beforeend', '<b>Daniel Reyes, 34</b><br>Suspect, theft at Harbor Market<br>14 March, about 21:40<br><small style="color:var(--mut)">Cameras: none. Witnesses: none.</small>'); sus.style.maxWidth = '210px';
      sus.insertAdjacentHTML('beforeend', '<div id="cn" style="margin-top:8px"></div><div class="choices" style="margin-top:8px;gap:6px"><button class="btn" id="sT" style="padding:6px 12px;font-size:.8rem">Sort by time</button><button class="btn" id="sD" style="padding:6px 12px;font-size:.8rem">Sort by day</button></div>');
      panel = sus; upd(); panel.querySelector('#sT').onclick = () => arrange('time'); panel.querySelector('#sD').onclick = () => arrange('day');
      E.run(async T => {
        await T.say('You run the archive. When people delete a memory, it is only flagged. All of it still sits here.', 4800, 'sys');
        await T.say('A theft. No cameras and no witnesses. One suspect: the man in the photo.', 4200, 'human');
        await T.say('Every glowing point is a deleted memory of someone who walked past him.', 4200, 'human');
        E.hint(`${E.tapTxt} the glowing memories to pull them onto the map. Use Sort by time or day.`); setTimeout(() => E.hint(""), 14000);
        await T.until(() => pulled >= 5); E.hint('');
        E.panel(`<b>His route, rebuilt</b><br>13 Mar 22:05 &nbsp;Bus 9 to Harbor<br>14 Mar 20:12 &nbsp;Bakery, Pier St<br>14 Mar 21:38 &nbsp;Market, east door<br>14 Mar 21:41 &nbsp;Dock 4 stairwell<br>14 Mar 22:10 &nbsp;Canal footbridge`, 'mr');
        await T.wait(800); A.tension(0.6);
        await T.say('Route reconstructed from five people who tried to forget him. Witnesses asked: none.', 4200, 'sys');
        // the sixth fragment arrives from behind you
        own = { g: new THREE.Group(), state: 'idle' };
        own.g.add(new THREE.Mesh(new THREE.SphereGeometry(0.22, 12, 10), new THREE.MeshBasicMaterial({ color: 0xffffff })));
        const hit = new THREE.Mesh(new THREE.SphereGeometry(1.0, 8, 6), new THREE.MeshBasicMaterial({ visible: false })); own.g.add(hit); own.hit = hit;
        own.g.add(glow(0xffffff, 2.2, 1)); own.g.position.set(0, 1.6, 2.6); scene.add(own.g); A.heartbeat(true, 70, 0.28); A.blip(900, 1.5, 0.06, 'sine', 0.5);
        E.label(() => own.g.position.clone().add(new V(0, 0.7, 0)), 'one more fragment<br><small>source: this account</small>', 'red');
        E.hint('One more fragment is close to you. Click it.');
        await T.until(() => phase === 'end'); E.hint('');
      });
    },
  };
  function ownPull() {
    const idx = 5; own.state = 'flying'; own.g.children[0].material.color.set(0xff5050);
    A.hit(48); E.glitchBurst(0.8, 500); E.set('uRed', 0.4, 0.6);
    E.run(async T => {
      E.showSub(OWN, 'human red', 5200);
      const a = own.g.position.clone(), b = holo.localToWorld(NODES[5].clone());
      for (let t = 0; t < 1; t += 0.03) { own.g.position.lerpVectors(a, b, t * t * (3 - 2 * t)); await T.wait(30); }
      pulled = 6; draw(); upd(); A.chime(300, 0.1);
      await T.wait(2400);
      await T.say('Deleted 07:41 today. Source: this account.', 3600, 'sys red');
      await T.say('Everyone is already a witness.', 3800, 'human red');
      await E.end({ title: 'Archive Authority', line: 'Nobody is asked to testify. Everyone already did.', stat: 'Witnesses asked: 0' });
    });
  }
  return world;
}
