import { at, THREE, glow, dust, human, ghostMat, textSprite, rand } from '../kit.js';
import { E } from '../engine.js';
import { A } from '../audio.js';
const V = THREE.Vector3;

function blobTex(seed) {
  const c = document.createElement('canvas'); c.width = 128; c.height = 96; const x = c.getContext('2d');
  const hue = (seed * 47) % 360; const g = x.createLinearGradient(0, 0, 128, 96); g.addColorStop(0, `hsl(${hue},60%,45%)`); g.addColorStop(1, `hsl(${(hue + 50) % 360},70%,25%)`); x.fillStyle = g; x.fillRect(0, 0, 128, 96);
  for (let i = 0; i < 5; i++) { x.fillStyle = `hsla(${(hue + i * 30) % 360},70%,${55 + i * 5}%,.45)`; x.beginPath(); x.arc(Math.random() * 128, Math.random() * 96, 12 + Math.random() * 26, 0, 7); x.fill(); }
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; return t;
}

export function build() {
  const scene = new THREE.Scene(); scene.background = new THREE.Color(0x03030a); scene.fog = new THREE.FogExp2(0x03030a, 0.05);
  scene.add(new THREE.AmbientLight(0x6a5aa0, 0.8));
  const corridor = new THREE.Group(); scene.add(corridor);
  const floor = new THREE.Mesh(new THREE.PlaneGeometry(4, 130), new THREE.MeshBasicMaterial({ color: 0x07060f })); floor.rotation.x = -Math.PI / 2; floor.position.z = -60; corridor.add(floor);
  const line = new THREE.GridHelper(130, 65, 0x2a2060, 0x120e2a); line.rotation.y = Math.PI / 2; line.scale.x = 0.04; line.position.set(0, 0.01, -60); corridor.add(line);
  const tex = [0, 1, 2, 3, 4, 5, 6, 7].map(blobTex), panels = [];
  for (let i = 0; i < 26; i++) for (const s of [-1, 1]) {
    const z = -2 - i * 2.4, m = new THREE.Mesh(new THREE.PlaneGeometry(1.5, 1.05), new THREE.MeshBasicMaterial({ map: tex[(i + (s > 0 ? 3 : 0)) % 8], transparent: true, opacity: 0.25 })); m.position.set(s * 1.95, 1.4, z); m.rotation.y = -s * Math.PI / 2; corridor.add(m);
    const fr = new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.PlaneGeometry(1.56, 1.1)), new THREE.LineBasicMaterial({ color: 0x9a8aff, transparent: true, opacity: 0.4 })); fr.position.copy(m.position); fr.rotation.y = m.rotation.y; corridor.add(fr);
    panels.push({ m, z, lit: 0 });
  }
  const door = new THREE.Group(); door.position.set(0, 1.8, -62); corridor.add(door);
  const dm = new THREE.Mesh(new THREE.PlaneGeometry(3.6, 3.6), new THREE.MeshBasicMaterial({ color: 0x1a0a14 })); door.add(dm);
  const dg = glow(0xff4060, 7, 0.45); door.add(dg);
  const dl = textSprite('locked until 18 · held by the government', { size: 0.3, color: '#ff8a9a', opacity: 0.9 }); dl.position.y = 2.3; door.add(dl);
  const chamber = new THREE.Group(); chamber.position.z = -70; chamber.visible = false; scene.add(chamber);
  for (let i = 0; i < 28; i++) { const a = (i / 28) * Math.PI * 1.1 - 0.55 * Math.PI; const m = new THREE.Mesh(new THREE.PlaneGeometry(1.5, 1.05), new THREE.MeshBasicMaterial({ map: tex[i % 8], transparent: true, opacity: 0.8 })); m.position.set(Math.sin(a) * 8, 1.2 + (i % 3) * 1.25, -Math.cos(a) * 8 - 2); m.lookAt(0, m.position.y, 0); chamber.add(m); }
  const disp = new THREE.Mesh(new THREE.PlaneGeometry(2.4, 1.7), new THREE.MeshBasicMaterial({ color: 0x3a0a10 })); disp.position.set(0, 1.9, -11); chamber.add(disp);
  const dEdge = new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.PlaneGeometry(2.5, 1.8)), new THREE.LineBasicMaterial({ color: 0xff3a4a })); dEdge.position.copy(disp.position); chamber.add(dEdge);
  const dGlow = glow(0xff3040, 6, 0.5); dGlow.position.copy(disp.position); chamber.add(dGlow);
  chamber.add(at(dust(300, [18, 8, 18], 0xb9a5ff, 0.05, 0.5), 0, 3, -5));

  // the memory (hallway)
  const hall = new THREE.Group(); hall.visible = false; hall.position.set(0, 0, 200); scene.add(hall);
  hall.add(new THREE.Mesh(new THREE.BoxGeometry(6, 3, 9), new THREE.MeshStandardMaterial({ color: 0x3a2a30, side: THREE.BackSide, roughness: 1 })));
  const hl = new THREE.PointLight(0xffb080, 22, 14); hl.position.set(0, 2.6, -1); hall.add(hl);
  hall.children[0].position.set(0, 1.5, 0);
  const A1 = human(2.2, ghostMat(0xff6a5a, 1.6, 0x200808)), B1 = human(2.2, ghostMat(0x6aa8ff, 1.6, 0x08101e)); A1.position.set(-0.8, 0, -2.4); B1.position.set(0.8, 0, -2.4); hall.add(A1, B1);
  const lA = E.label(() => A1.getWorldPosition(new V()).add(new V(0, 2.5, 0)), '', 'red'); lA.el.style.display = 'none';

  let z = 0, age = 0, phase = 'walk', panel = null, hover = false, swapped = false;
  const world = {
    scene, dbg: { disp, panels },
    enter() { E.aim(new V(0, 0.9, 0), new V(0, 1.1, -10), { par: 0.2, snap: true, fov: 64, damp: 6 }); A.ambient({ freqs: [73.4, 110, 146.8], cutoff: 420, gain: 0.14, lfo: 0.06 }); },
    update(dt, t) {
      if (phase === 'walk' || phase === 'open') {
        const v = phase === 'open' ? 2.4 : (E.hold ? 4.5 : 0.9); z = Math.max(-66, Math.min(phase === 'open' ? -66 : -59, z - v * dt));
        if (phase === 'walk' && z <= -59) { phase = 'door'; unlock(); }
        age = Math.min(18, Math.round(Math.max(0, -z) / 59 * 18 * 10) / 10);
        const h = 0.9 + (age / 18) * 0.85; E.rig.pos.set(0, h, z); E.rig.look.set(0, h * 0.95, z - 10); E.cur.pos.set(0, h, z); E.cur.look.copy(E.rig.look);
        panels.forEach(p => { const d = Math.abs(p.z - z); if (d < 2.2 && !p.lit) { p.lit = 1; A.blip(300 + Math.random() * 400, 0.25, 0.04, 'sine'); } p.m.material.opacity += ((p.lit ? 0.95 : 0.25) - p.m.material.opacity) * Math.min(1, dt * 3); });
        if (panel) { panel.querySelector('#ag').textContent = Math.floor(age); panel.querySelector('#hr').textContent = Math.round(age * 365 * 16).toLocaleString(); panel.querySelector('#vp').textContent = Math.round(age * 128).toLocaleString(); panel.querySelector('#vs').textContent = Math.round(age * 78).toLocaleString(); panel.querySelector('#vg').textContent = Math.round(age * 334).toLocaleString(); }
      }
      if (phase === 'room') { const h = E.pick([disp], false); const hv = !!h; if (hv !== hover) { hover = hv; E.cursor(hv ? 'pointer' : 'default'); } dGlow.material.opacity = 0.4 + Math.sin(t * 4) * 0.15; }
      if (phase === 'memory') {
        const k = swapped ? -1 : 1;
        A1.position.x = -0.8 + Math.sin(t * 2.3) * 0.12 * k; B1.position.x = 0.8 + Math.sin(t * 2.9) * 0.12; A1.rotation.z = Math.sin(t * 7) * 0.08; B1.rotation.z = Math.sin(t * 6) * -0.08; A1.rotation.y = Math.sin(t * 3) * 0.3; B1.rotation.y = Math.sin(t * 3.4) * 0.3;
        hl.intensity = 20 + Math.sin(t * 23) * 3;
      }
    },
    click() { if (phase === 'room' && hover) memory(); },
    begin() {
      panel = E.panel('Age <b id="ag">0</b><br>Hours of you recorded <b id="hr">0</b><div style="margin-top:8px;color:var(--mut);font-size:.78rem">Times your childhood has been watched</div>Parents <b id="vp">0</b> · School <b id="vs">0</b><br>Government <b id="vg">0</b> · <span style="color:#b9a5ff">You <b>0</b></span>', 'bl');
      E.run(async T => {
        await T.say('You are 17. Every day of your life since birth has been recorded.', 4200, 'human');
        await T.say('Tonight you walk back through it, from your first day to the last.', 3600, 'human');
        E.hint(`${E.holdTxt} to move through your years.`);
        await T.until(() => age >= 4); E.hint('');
        await T.say('The records are locked to you. Your parents, your school and the government can all watch them.', 4800, 'human');
        await T.until(() => age >= 11);
        await T.say('Look at the numbers on the left. Strangers have seen far more of your childhood than you have.', 5000, 'human');
        await T.until(() => age >= 16.5);
        await T.say('At midnight you turn 18. The records unlock.', 3800, 'human');
      });
    },
  };
  function unlock() {
    E.run(async T => {
      A.hit(55); A.heartbeat(true, 70, 0.25); E.hint('');
      await T.say('Eighteen.', 2400, 'big mid');
      E.tween(dm.material.color, 'r', 1, 2); E.tween(dm.material.color, 'g', 1, 2); E.tween(dm.material.color, 'b', 1, 2); E.tween(dg.material, 'opacity', 1, 2); A.chime(330, 0.14);
      await T.wait(2000); E.tween(door.scale, 'x', 0.01, 2.2); A.noise(2, 0.15, 400, 1, 4); await T.wait(800);
      chamber.visible = true; phase = 'open'; await T.wait(3600); phase = 'room'; panel.remove();
      await T.say('Everything is yours now. Two records are marked disputed.', 3800, 'sys');
      await T.say('Your parents are in a custody fight. Each says the other was the one who shouted. The court is using your recordings.', 5600, 'human');
      E.hint(`${E.tapTxt} the red record to watch it.`);
    });
  }
  function memory() {
    E.hint(''); phase = 'busy'; A.whoosh(); E.white(1, 0.9); E.glitchBurst(0.7, 600);
    E.run(async T => {
      await T.wait(1000); corridor.visible = false; chamber.visible = false; hall.visible = true; hall.position.set(0, 0, 0); scene.background.set(0x1a1014); scene.fog.color.set(0x1a1014); scene.fog.density = 0.08;
      E.aim(new V(0, 0.95, 1.4), new V(0, 1.4, -2.4), { par: 0.15, snap: true, fov: 70 }); E.white(0, 1.2); phase = 'memory';
      A.ambient({ freqs: [41, 55, 61.7], cutoff: 220, gain: 0.22, lfo: 0.3 }); A.heartbeat(true, 100, 0.4);
      const mur = setInterval(() => { A.murmur(0.8, 0.12, 180 + Math.random() * 90); }, 700); world.dispose = () => clearInterval(mur);
      await T.say('You were six. This is the night they are fighting over.', 3800, 'human');
      lA.el.style.display = ''; lA.set('recording A<br><small>shows her shouting, him calm</small>');
      await T.say('Two adults shouting. A door you cannot see past. This is recording A, from your mother’s account.', 5200, 'human');
      A.glitch(); E.glitchBurst(1, 700); swapped = true; A1.children.forEach(c => (c.material = ghostMat(0x6aa8ff, 1.6, 0x08101e))); B1.children.forEach(c => (c.material = ghostMat(0xff6a5a, 1.6, 0x200808)));
      lA.set('recording B<br><small>shows him shouting, her calm</small>');
      await T.say('Recording B, from your father’s account. Same night. The roles are reversed.', 4600, 'human red');
      await T.say('Both are real. You were in the room for both. One of them has been edited.', 4800, 'human red');
      clearInterval(mur); A.heartbeat(false);
      await E.end({ title: 'Minor', line: 'You inherit a childhood you never chose to record.', stat: 'Two recordings. Two versions. One childhood.' });
    });
  }
  return world;
}
