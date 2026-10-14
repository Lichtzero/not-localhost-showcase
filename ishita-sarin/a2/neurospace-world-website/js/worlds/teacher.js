import { THREE, glow, dust, driftDust, human, ghostMat, outlineMat, textSprite, rand } from '../kit.js';
import { E } from '../engine.js';
import { A } from '../audio.js';
const V = THREE.Vector3;

const PAIN = ['saw a parent leave', 'was left alone at night', 'heard the shouting at home', 'was hit by someone at home', 'lost a parent', 'was bullied for months'];

export function build() {
  const scene = new THREE.Scene(); scene.background = new THREE.Color(0x02050a); scene.fog = new THREE.FogExp2(0x02050a, 0.05);
  const room = new THREE.Mesh(new THREE.BoxGeometry(16, 5, 20), new THREE.MeshStandardMaterial({ color: 0x0d151d, side: THREE.BackSide, roughness: 0.95 }));
  room.position.set(0, 2.5, -4); scene.add(room);
  scene.add(new THREE.AmbientLight(0x4a6a88, 0.9));
  const pl = new THREE.PointLight(0x9ac8ff, 90, 30); pl.position.set(0, 4.3, -3); scene.add(pl);
  const warm = new THREE.PointLight(0xffb060, 10, 8); warm.position.set(0, 1.4, 1.9); scene.add(warm);
  const air = dust(500, [14, 5, 18], 0x9ac8ff, 0.035, 0.5); air.position.set(0, 2.5, -4); scene.add(air);

  const grid = new THREE.GridHelper(16, 16, 0x1d3d55, 0x10202e); grid.position.set(0, 0.01, -4); scene.add(grid);
  // blackboard
  const board = new THREE.Mesh(new THREE.PlaneGeometry(9, 2.6), new THREE.MeshBasicMaterial({ color: 0x0b2a2e })); board.position.set(0, 2.5, -13.9); scene.add(board);
  const lesson = textSprite('Memory is a muscle.', { size: 0.8, color: '#9fe8d8', font: '500 64px "Literata", serif', italic: true, opacity: 0.8 }); lesson.position.set(0, 2.55, -13.8); scene.add(lesson);

  // desks + children (seated, facing the board at first)
  const desks = [], kids = [];
  const cols = [-4, -1.35, 1.35, 4], rows = [-3.2, -6.4];
  let id = 0;
  rows.forEach(z => cols.forEach(x => {
    if (id >= 6) return;
    const skip = (z === rows[0] && (x === -1.35 || x === 1.35)) ? false : false;
    const d = new THREE.Mesh(new THREE.BoxGeometry(1.5, 0.08, 0.8), new THREE.MeshStandardMaterial({ color: 0x1a232d, roughness: 0.8 })); d.position.set(x, 0.74, z); scene.add(d);
    const leg = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.7, 0.04), new THREE.MeshStandardMaterial({ color: 0x10171e })); leg.position.set(x, 0.38, z - 0.3); scene.add(leg);
    const mat = ghostMat(0x6fd8ff, 1.5, 0x0a1822); const k = human(1.5, mat, true); k.position.set(x, 0, z + 0.78); k.rotation.y = Math.PI; k.userData.kid = id; k.userData.mat = mat;
    const core = glow(0xffb454, 0.05, 0); core.position.y = 0.72; k.add(core); k.userData.core = core;
    const eyes = [-1, 1].map(s => { const e = glow(0xffffff, 0.06, 0.0); e.position.set(s * 0.055, 1.32, 0.16); k.add(e); return e; });
    k.userData.eyes = eyes;
    const pain = glow(0xff3a3a, 0.75, 0.85); pain.position.set(0, 1.95, 0); k.add(pain); k.userData.pain = pain;
    k.userData.lab = E.label(() => k.position.clone().add(new V(0, 2.0 + (id % 3) * 0.55, 0)), `<small>painful memory</small><br>${PAIN[id]}`, 'red');
    scene.add(k); kids.push(k); desks.push(d); id++;
  }));
  // pick helper: kids are reached through child meshes
  const kidOf = o => { while (o && o.userData.kid === undefined) o = o.parent; return o; };

  // ceiling cameras
  const cams = [[-4.5, -2], [0, -5], [4.5, -2]].map(([x, z], i) => {
    const g = new THREE.Group(); g.position.set(x, 4.8, z);
    g.add(new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.17, 0.26, 10), new THREE.MeshStandardMaterial({ color: 0x14181d, metalness: 0.6, roughness: 0.4 })));
    const led = glow(0xff2a2a, 0.5, 1); led.position.y = -0.17; g.add(led);
    const geo = new THREE.ConeGeometry(1.1, 5, 28, 1, true); geo.translate(0, -2.5, 0);
    const beam = new THREE.Mesh(geo, new THREE.MeshBasicMaterial({ color: 0xff2a2a, transparent: true, opacity: 0.065, blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide })); g.add(beam);
    scene.add(g); return { g, beam, led, cx: x, cz: z, ph: i * 2.1, tgt: new V(x, 0, z), cur: new V(x, 0, z), lock: null };
  });

  // the teacher's archive: six amber shards orbiting a point near the camera
  const hold = new V(0, 1.2, 1.6);
  const archive = new THREE.Group(); archive.position.copy(hold); scene.add(archive);
  const shards = [];
  for (let i = 0; i < 6; i++) { const s = new THREE.Mesh(new THREE.IcosahedronGeometry(0.1, 0), new THREE.MeshBasicMaterial({ color: 0xffc67a })); const gl = glow(0xffb454, 0.34, 0.8); s.add(gl); archive.add(s); shards.push({ m: s, a: (i / 6) * 6.283, r: 0.34, sent: false }); }
  const halo = glow(0xffb454, 1.0, 0.25); archive.add(halo);

  // the teacher, as the system sees her: an outline
  const outline = new THREE.Group();
  const hm = human(1.72, outlineMat(0xffffff, 1.6, 1.4));
  outline.add(hm); outline.position.set(0, 0, 3.2); outline.visible = false; scene.add(outline);

  const flights = []; let given = 0, phase = 'give', hovered = null, tagSet = false;
  const world = {
    scene, dbg: { kids },
    enter() { E.aim(new V(0, 1.65, 3.5), new V(0, 1.4, -5), { par: 0.35, snap: true, fov: 62 }); A.ambient({ freqs: [49, 73.4, 98], cutoff: 260, gain: 0.18, lfo: 0.07 }); },
    update(dt, t) {
      driftDust(air, dt, 0.03);
      archive.rotation.y += dt * 0.6; halo.material.opacity = 0.1 + shards.filter(s => !s.sent).length * 0.025 + Math.sin(t * 2) * 0.02;
      shards.forEach((s, i) => { if (s.sent) return; s.m.position.set(Math.cos(s.a + t * 0.5) * s.r, Math.sin(t * 0.9 + i) * 0.1, Math.sin(s.a + t * 0.5) * s.r); });
      // hover pick
      if (phase === 'give') {
        const hit = E.pick(kids); const k = hit ? kidOf(hit.object) : null; if (k !== hovered) { hovered = k; E.cursor(k && !k.userData.given ? 'pointer' : 'default'); }
      }
      // cameras
      cams.forEach((c, i) => {
        if (phase === 'scan' || phase === 'end') c.tgt.set(0, 1.5, 3.4);
        else if (c.lock) c.tgt.copy(c.lock);
        else c.tgt.set(c.cx + Math.sin(t * 0.45 + c.ph) * 3.2, 0, c.cz + Math.cos(t * 0.33 + c.ph) * 3.4);
        c.cur.lerp(c.tgt, Math.min(1, dt * (phase === 'scan' ? 3.5 : 1.6)));
        const d = c.cur.clone().sub(c.g.position).normalize(); c.g.quaternion.setFromUnitVectors(new V(0, -1, 0), d);
        c.led.material.opacity = 0.6 + Math.sin(t * 6 + i) * 0.4;
        c.beam.material.opacity = (phase === 'scan' || phase === 'end') ? 0.13 : 0.06 + (c.lock ? 0.06 : 0);
      });
      // flights
      for (let i = flights.length - 1; i >= 0; i--) {
        const f = flights[i]; f.t += dt / 1.1; const p = Math.min(1, f.t), e = p * p * (3 - 2 * p);
        f.m.position.lerpVectors(f.a, f.b, e); f.m.position.y += Math.sin(p * Math.PI) * 0.9;
        cams.forEach(c => { c.lock = f.m.position.clone(); c.lock.y = 0; });
        if (p >= 1) { flights.splice(i, 1); f.done(); }
      }
      kids.forEach(k => { const u = k.userData; if (u.given) { u.core.material.opacity += (0.85 - u.core.material.opacity) * dt * 3; u.core.scale.setScalar(0.5 + Math.sin(t * 3 + u.kid) * 0.05); } u.mat.uniforms.uPulse.value = (k === hovered && !u.given && phase === 'give') ? 0.8 : 0; });
    },
    click() {
      if (phase !== 'give' || !hovered || hovered.userData.given) return;
      const s = shards.find(x => !x.sent); if (!s) return; s.sent = true; hovered.userData.given = true; const k = hovered;
      const from = new V(); s.m.getWorldPosition(from); archive.remove(s.m); scene.add(s.m); s.m.position.copy(from);
      A.blip(880, 0.4, 0.1, 'sine', 1.5);
      const to = k.position.clone(); to.y = 0.7;
      flights.push({ m: s.m, a: from, b: to, t: 0, done: () => { given++; A.chime(520 + given * 60, 0.08); k.userData.core.material.opacity = 0.2; k.userData.pain.material.color.set(0x8a8f99); k.userData.pain.material.opacity = 0.3; k.userData.lab.set('<small>sealed</small><br>hidden from the archive'); k.userData.lab.el.className = 'tag am'; scene.remove(s.m); cams.forEach(c => (c.lock = null)); onGive(); } });
    },
    begin() {
      E.run(async T => {
        await T.say('At 18, every child unlocks their whole archive and can replay everything.', 4200, 'sys');
        await T.say('You have seen what some of them lived. The red lights are those memories.', 4200, 'human');
        await T.say('You can seal one so they never relive it. Sealing another person’s memory is a crime.', 4600, 'human');
        E.hint(`${E.tapTxt} a child to seal their painful memory.`);
        await T.until(() => given >= 1); E.hint('');
        await T.say('It is gone from their archive. They will never know it was there.', 4000, 'human');
        A.heartbeat(true, 62, 0.22); A.tension(0.4);
        await T.until(() => given >= 6);
        phase = 'scan'; E.hint(''); A.heartbeat(true, 96, 0.4); A.tension(1); A.hit(44); E.glitchBurst(0.8, 400);
        E.set('uRed', 0.35, 1.2); halo.visible = false; archive.visible = false;
        await T.say('Routine audit. Scanning every archive.', 2600, 'sys red');
        // the children turn around
        kids.forEach((k, i) => { setTimeout(() => { E.tween(k.rotation, 'y', 0, 1.6); A.murmur(0.9, 0.05, 300 + i * 60); k.userData.eyes.forEach(e => (e.material.opacity = 0.9)); }, 200 + i * 350); });
        await T.wait(2600);
        E.aim(new V(0, 1.75, 7.6), new V(0, 1.3, -1.5), { par: 0.2, damp: 1.1, fov: 54 });
        outline.visible = true; A.noise(1.2, 0.2, 400, 1, 6);
        await T.wait(1800);
        kids.forEach(k => (k.userData.lab.alpha = 0)); kids.forEach((k, i) => { const l = E.label(() => k.position.clone().add(new V(0, 1.75 + (i % 3) * 0.5, 0)), 'gap in archive'); setTimeout(() => A.blip(660 + i * 40, 0.12, 0.06, 'square'), i * 120); });
        await T.wait(1500);
        E.label(() => new V(1.15, 1.2, 3.2), 'you<br><small>the only account that could have sealed them</small>', 'gap');
        A.hit(40); E.glitchBurst(0.5, 300);
        await T.say('Six archives with the same kind of gap. One account touched all of them.', 4200, 'human red');
        await T.say('You were protecting them. The record only shows what you hid.', 4600, 'human red');
        phase = 'end';
        await E.end({ title: 'Teacher', line: 'Hiding to protect still looks like hiding.', stat: 'Archives altered: 6. Account responsible: 1.' });
      });
      function none() {}
    },
  };
  function onGive() {}
  return world;
}
