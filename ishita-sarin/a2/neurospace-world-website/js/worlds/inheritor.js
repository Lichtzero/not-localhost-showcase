import { THREE, glow, dust, human, ghostMat, textSprite, rand } from '../kit.js';
import { E } from '../engine.js';
import { A } from '../audio.js';
const V = THREE.Vector3;

const SIG = Array.from({ length: 121 }, (_, i) => { const t = i / 120; return [120 + 780 * t, 262 + 80 * Math.sin(t * 17) * (1 - 0.5 * t) - 50 * Math.sin(t * 6)]; });

export function build() {
  const scene = new THREE.Scene(); scene.background = new THREE.Color(0x0a0806); scene.fog = new THREE.FogExp2(0x0a0806, 0.07);
  scene.add(new THREE.AmbientLight(0xd0b080, 0.7));
  const lamp = new THREE.PointLight(0xffd090, 18, 10); lamp.position.set(0.6, 2.4, 0); scene.add(lamp);
  const room = new THREE.Mesh(new THREE.BoxGeometry(8, 3.2, 8), new THREE.MeshStandardMaterial({ color: 0x2a2018, side: THREE.BackSide, roughness: 1 })); room.position.set(0, 1.6, -1); scene.add(room);
  const table = new THREE.Mesh(new THREE.BoxGeometry(3, 0.1, 1.7), new THREE.MeshStandardMaterial({ color: 0x4a3322, roughness: 0.8 })); table.position.set(0, 0.85, -0.6); scene.add(table);
  const cv = document.createElement('canvas'); cv.width = 1024; cv.height = 512; const cx = cv.getContext('2d'); const tex = new THREE.CanvasTexture(cv); tex.colorSpace = THREE.SRGBColorSpace;
  const paper = new THREE.Mesh(new THREE.PlaneGeometry(1.9, 0.95), new THREE.MeshBasicMaterial({ map: tex, color: 0x7a746a })); paper.rotation.x = -Math.PI / 2; paper.position.set(0, 0.91, -0.55); scene.add(paper);
  function blank(title) { cx.fillStyle = '#efe6d2'; cx.fillRect(0, 0, 1024, 512); cx.fillStyle = '#3a3226'; cx.font = '600 34px "Roboto Flex", sans-serif'; cx.fillText(title, 60, 80); cx.fillRect(60, 100, 904, 3); for (let i = 0; i < 4; i++) cx.fillRect(60, 150 + i * 28, 700 - (i % 2) * 120, 4); cx.fillStyle = '#9a8f78'; cx.fillRect(100, 420, 820, 2); cx.font = '20px "Roboto Flex", sans-serif'; cx.fillText('signature', 100, 450); tex.needsUpdate = true; }
  function stroke(pts, color = '#1b2a6a', w = 6) { cx.strokeStyle = color; cx.lineWidth = w; cx.lineCap = 'round'; cx.lineJoin = 'round'; cx.beginPath(); pts.forEach(([x, y], i) => (i ? cx.lineTo(x, y) : cx.moveTo(x, y))); cx.stroke(); tex.needsUpdate = true; }
  function guide() { cx.save(); cx.setLineDash([10, 12]); cx.strokeStyle = 'rgba(40,40,60,.35)'; cx.lineWidth = 5; cx.beginPath(); SIG.forEach(([x, y], i) => (i ? cx.lineTo(x, y) : cx.moveTo(x, y))); cx.stroke(); cx.restore(); tex.needsUpdate = true; }
  blank('Household papers');

  const mum = new THREE.Group(); const arm = new THREE.Mesh(new THREE.CapsuleGeometry(0.06, 1, 6, 10), ghostMat(0xffe0b0, 1.4, 0x2a1a10)); mum.add(arm); scene.add(mum);
  const pen = glow(0x9ab0ff, 0.3, 1); scene.add(pen);
  const toWorld = ([x, y]) => new V(-0.95 + (x / 1024) * 1.9, 0.93, -0.55 - 0.475 + (y / 512) * 0.95);
  const orb = new THREE.Group(); orb.position.set(0, 1.25, -0.6); orb.visible = false; scene.add(orb);
  orb.add(new THREE.Mesh(new THREE.SphereGeometry(0.2, 24, 18), new THREE.MeshBasicMaterial({ color: 0xffd9a0 }))); const og = glow(0xffc070, 1.6, 0.7); orb.add(og);
  const broker = human(2.0, ghostMat(0xff4d6d, 1.8, 0x14060a)); broker.position.set(3.5, 0, -3.2); broker.visible = false; scene.add(broker);

  let phase = 'watch', drawn = [], down = false, score = 0, penP = -1, panel = null, hoverOrb = false, bar = null, signed = false, take = false;
  function calc() { let hit = 0; for (let i = 0; i < SIG.length; i += 2) if (drawn.some(p => Math.hypot(p[0] - SIG[i][0], p[1] - SIG[i][1]) < 42)) hit++; return Math.round(hit / Math.ceil(SIG.length / 2) * 100); }
  function uvPoint() { const h = E.pick([paper], false); return h ? [h.uv.x * 1024, (1 - h.uv.y) * 512] : null; }
  const world = {
    scene, dbg: { orb, paper },
    enter() { E.aim(new V(0, 1.15, 0.55), new V(0, 0.9, -0.55), { par: 0.12, snap: true, fov: 56 }); A.ambient({ freqs: [98, 146.8, 196], type: 'triangle', cutoff: 600, gain: 0.1, lfo: 0.08 }); },
    update(dt, t) {
      if (penP >= 0 && penP <= 1) { penP = Math.min(1, penP + dt / 5.5); const k = Math.floor(penP * 120); const w = toWorld(SIG[k]); pen.position.copy(w); const sh = new V(1.4, 1.5, 0.1); mum.position.copy(sh.clone().add(w).multiplyScalar(0.5)); const dir = w.clone().sub(sh); arm.scale.y = dir.length() / 1.12; mum.quaternion.setFromUnitVectors(new V(0, 1, 0), dir.normalize()); }
      if (phase === 'trace') {
        const p = uvPoint();
        if (E.ptr.down && p) { const last = drawn[drawn.length - 1]; drawn.push(p); if (last && Math.hypot(last[0] - p[0], last[1] - p[1]) < 120) stroke([last, p], '#1b2a6a', 6); if (drawn.length % 8 === 0) { score = calc(); bar.style.width = score + '%'; panel.querySelector('#sc').textContent = score; } }
        E.cursor(p ? 'crosshair' : 'default');
      }
      if (orb.visible) { orb.position.y = 1.25 + Math.sin(t * 1.5) * 0.04; og.material.opacity = 0.55 + Math.sin(t * 2.4) * 0.15; if (phase === 'orb') { const h = !!E.pick([orb], true); if (h !== hoverOrb) { hoverOrb = h; E.cursor(h ? 'pointer' : 'default'); } } }
      if (take) { orb.position.lerp(broker.position.clone().add(new V(0, 1.3, 0)), dt * 0.9); broker.position.x += (1.6 - broker.position.x) * dt * 0.6; }
    },
    click() { if (phase === 'orb' && hoverOrb) { phase = 'busy'; day(); } },
    up() { if (phase === 'trace') { score = calc(); bar.style.width = score + '%'; panel.querySelector('#sc').textContent = score; } },
    begin() {
      E.run(async T => {
        await T.say('You never went to school. You grew up at this table, beside your mother.', 4200, 'human');
        await T.say('She signs everything. You watch. People say you look just like her.', 4400, 'human');
        penP = 0; A.murmur(0.8, 0.05, 260); const iv = setInterval(() => { if (penP >= 0 && penP < 1) { A.noise(0.12, 0.05, 2800, 2); } }, 140);
        await T.until(() => penP >= 1); clearInterval(iv);
        for (let i = 0; i < 121; i += 4) stroke(SIG.slice(Math.max(0, i - 4), i + 1), '#1b2a6a', 6); // finish
        stroke(SIG, '#1b2a6a', 6); mum.visible = false; pen.visible = false;
        await T.wait(1000); await T.say('You learn it without trying.', 3200, 'human');
        blank('Household papers'); guide(); phase = 'trace';
        panel = E.panel('Signature learned <b id="sc">0</b>%<div class="meter am"><i id="bar"></i></div>', 'br'); bar = panel.querySelector('#bar');
        E.hint('Draw over the dotted line. Drag on the paper.');
        const t0 = Date.now(); await T.until(() => score >= 70 || Date.now() - t0 > 40000); phase = 'busy'; E.hint(''); A.chime(520, 0.1); panel.remove();
        await T.say('That is her hand now.', 3200, 'human');
        await adult(T);
      });
    },
  };
  async function adult(T) {
    A.whoosh(); E.white(1, 0.8); await T.wait(1000);
    mum.visible = false; blank('Release of funds'); lamp.intensity = 7; scene.background.set(0x050403);
    orb.visible = true; E.aim(new V(0, 1.55, 1.6), new V(0, 1.1, -0.6), { par: 0.2, snap: true, fov: 58 }); E.white(0, 1.6);
    A.ambient({ freqs: [73.4, 110, 146.8], type: 'triangle', cutoff: 380, gain: 0.1, lfo: 0.05 });
    await T.wait(1000); await T.say('Years later. Her archive is on the table.', 4200, 'human');
    await T.say('It passes down like property. Everything she knew, and everything she was allowed to do.', 4400, 'human');
    phase = 'orb'; E.hint(`${E.tapTxt} the orb to open her archive.`);
    await T.until(() => phase === 'day-done'); E.hint('');
    await T.say('Her bank account is still open. The bank wants her signature, and her face.', 4800, 'sys');
    panel = E.panel('<button class="btn pri" id="sg">Sign as her</button>', 'tc'); let go = false; panel.querySelector('#sg').onclick = () => (go = true); await T.until(() => go); panel.remove();
    // her signature, in your hand
    for (let i = 1; i < drawn.length; i += 3) { const a = drawn[i - 1], b = drawn[i]; if (Math.hypot(a[0] - b[0], a[1] - b[1]) < 120) stroke([a, b], '#1b2a6a', 6); if (i % 9 === 0) await T.wait(16); }
    stroke(SIG, '#1b2a6a', 4); A.chime(660, 0.1);
    await T.wait(1200); E.label(() => new V(0, 1.15, -0.55), 'accepted<br><small>signature match 99.2% · face match 97%</small>', 'am');
    await T.wait(2200);
    A.hit(46); E.glitchBurst(0.6, 400);
    await T.say('The bank saw your mother. You look like her. You sign like her. You know what she knew.', 5600, 'human red');
    await T.say('Whose life is this now?', 3800, 'human red');
    await E.end({ title: 'Inheritor', line: 'A memory you can learn from is a hand you can forge.', stat: 'Signature match: 99.2%. Face match: 97%. Signed by: the wrong person.' });
  }
  function day() {
    A.whoosh(); E.white(1, 0.7);
    E.run(async T => {
      await T.wait(900); orb.visible = false; E.aim(new V(0, 0.55, 1.2), new V(0, 2.8, -0.8), { par: 0.1, snap: true, fov: 60 }); lamp.intensity = 2; E.white(0.2, 1.6);
      const kp = E.panel('<b>Inherited knowledge</b><div id="kl" style="margin:6px 0"></div>Years of school you never attended <b id="ys">0</b>', 'br');
      await T.say('Her archive opens. Everything she ever studied or learned is now yours.', 4400, 'human');
      const items = ['Pharmacology', 'Contract law', 'French', 'Accounting', 'Piano', 'How to drive'];
      for (let i = 0; i < items.length; i++) { kp.querySelector('#kl').insertAdjacentHTML('beforeend', `<div>+ ${items[i]}</div>`); kp.querySelector('#ys').textContent = (i + 1) * 3; A.chime(420 + i * 60, 0.08); await T.wait(750); }
      await T.say('You never went to school. You now know more than most graduates.', 4600, 'human');
      await T.wait(600); kp.remove();
      A.whoosh(); E.white(1, 0.8); await T.wait(900); lamp.intensity = 7; orb.visible = true; E.aim(new V(0, 1.55, 1.6), new V(0, 1.1, -0.6), { par: 0.2, snap: true, fov: 58 }); E.white(0, 1.4); phase = 'day-done';
    });
  }
  return world;
}
