import { THREE, glow, dust, driftDust, textSprite, rand } from '../kit.js';
import { E } from '../engine.js';
import { A } from '../audio.js';
const V = THREE.Vector3;

const MEM = [
  { t: 'the day you got lost', w: 'Fear', l: 'to ask for help' },
  { t: 'the fight with your sister', w: 'Anger', l: 'to say sorry' },
  { t: 'losing your first friend', w: 'Sadness', l: 'to grieve and be comforted' },
  { t: 'the loud party', w: 'Overwhelm', l: 'to leave and rest' },
  { t: 'the exam you failed', w: 'Shame', l: 'to try again' },
];

export function build() {
  const mood = { v: 0 };
  const scene = new THREE.Scene(); scene.background = new THREE.Color(0xf2bf9c); scene.fog = new THREE.Fog(0xf2bf9c, 10, 70);
  const ground = new THREE.Mesh(new THREE.CircleGeometry(60, 48), new THREE.MeshBasicMaterial({ color: 0xd9b27c })); ground.rotation.x = -Math.PI / 2; scene.add(ground);
  const sun = glow(0xfff0c8, 14, 0.6); sun.position.set(0, 9, -34); scene.add(sun);
  // flowers
  const fg = new THREE.BufferGeometry(), N = 900, fp = new Float32Array(N * 3), fc = new Float32Array(N * 3);
  for (let i = 0; i < N; i++) { fp[i * 3] = rand(-30, 30); fp[i * 3 + 1] = 0.05; fp[i * 3 + 2] = rand(-40, 8); const c = new THREE.Color().setHSL(rand(0.0, 1), 0.7, 0.72); fc.set([c.r, c.g, c.b], i * 3); }
  fg.setAttribute('position', new THREE.BufferAttribute(fp, 3)); fg.setAttribute('color', new THREE.BufferAttribute(fc, 3));
  scene.add(new THREE.Points(fg, new THREE.PointsMaterial({ size: 0.28, vertexColors: true, depthWrite: false })));
  const petals = dust(300, [30, 14, 40], 0xffffff, 0.12, 0.8); petals.position.set(0, 6, -12); scene.add(petals);

  const happy = [], dark = [];
  const pastel = [0xff7fa0, 0xffb84a, 0x7fd49a, 0x6fb4ff, 0xc08cff, 0xffe04a];
  for (let i = 0; i < 26; i++) {
    const m = new THREE.Mesh(new THREE.SphereGeometry(rand(0.35, 0.6), 18, 14), new THREE.MeshBasicMaterial({ color: pastel[i % 6] }));
    m.position.set(rand(-11, 11), rand(1.2, 5.5), rand(-26, -2)); m.add(glow(pastel[i % 6], 2.4, 0.5));
    scene.add(m); happy.push({ m, ph: rand(0, 6), base: m.position.clone() });
  }
  for (let i = 0; i < 5; i++) {
    const m = new THREE.Mesh(new THREE.SphereGeometry(0.75, 20, 16), new THREE.MeshBasicMaterial({ color: 0x4a3f66 }));
    m.position.set(-8 + i * 4 + rand(-1, 1), rand(1.6, 4), -6 - i * 2.5); m.add(glow(0x2a1a44, 2.8, 0.55)); m.userData.dark = true;
    scene.add(m);
    const lab = E.label(() => m.position.clone().add(new V(0, 1.15 + (i % 2) * 0.65, 0)), `<b>${MEM[i].t}</b><br><small>taught you: ${MEM[i].w}, ${MEM[i].l}</small>`); dark.push({ m, ph: rand(0, 6), gone: false, lab, i });
  }
  const sky = new THREE.Mesh(new THREE.SphereGeometry(1, 20, 14), new THREE.MeshBasicMaterial({ color: 0x000000 })); sky.position.set(0, 14, -14); sky.scale.setScalar(0.001); scene.add(sky);

  let removed = 0, phase = 'tidy', hover = null, panel = null, pops = [];
  const bg = new THREE.Color(), bgA = new THREE.Color(0xf2bf9c), bgB = new THREE.Color(0x07040c), gA = new THREE.Color(0xd9b27c), gB = new THREE.Color(0x0b0810);

  const lostWords = [];
  function refresh() { if (!panel2) return; panel2.innerHTML = `Memories deleted <b>${removed} / 5</b><br>Words you can still use: <b>Joy, Calm, Proud, Fine</b><br>Words you no longer have: <b style="color:#ff9aa8">${lostWords.length ? lostWords.join(', ') : 'none yet'}</b>`; }
  let panel2 = null;
  function dissolve(d) { lostWords.push(MEM[d.i].w);
    d.gone = true; A.blip(900 - removed * 40, 0.5, 0.1, 'sine', 2.2); A.noise(0.4, 0.06, 4000, 2);
    E.tween(d.m.scale, 'x', 0.01, 0.6); E.tween(d.m.scale, 'y', 0.01, 0.6); E.tween(d.m.scale, 'z', 0.01, 0.6).then(() => (d.m.visible = false));
    d.lab.remove(); removed++; refresh(); E.set('uWhite', 0.0, 0); E.bloom.strength = 0.25 + removed * 0.07;
  }
  const world = {
    scene, dbg: { dark },
    enter() { E.aim(new V(0, 1.6, 6), new V(0, 2.4, -10), { par: 0.35, snap: true, fov: 64 }); A.ambient({ freqs: [261.6, 329.6, 392], type: 'sine', cutoff: 1400, gain: 0.07, lfo: 0.12 }); E.post.uVig.value = 0.5; E.bloom.strength = 0.25; E.bloom.threshold = 0.82; },
    update(dt, t) {
      driftDust(petals, dt, -0.2);
      happy.forEach(h => { h.m.position.y = h.base.y + Math.sin(t * 0.7 + h.ph) * 0.3; h.m.position.x = h.base.x + Math.sin(t * 0.3 + h.ph) * 0.4; });
      dark.forEach(d => { if (!d.gone) { d.m.position.y += Math.sin(t * 0.6 + d.ph) * dt * 0.25; d.m.scale.setScalar(1 + Math.sin(t * 2 + d.ph) * 0.04); } });
      bg.copy(bgA).lerp(bgB, mood.v); scene.background.copy(bg); scene.fog.color.copy(bg); ground.material.color.copy(gA).lerp(gB, mood.v);
      sun.material.opacity = (0.6 - mood.v * 0.6);
      if (phase === 'tidy') { const hit = E.pick(dark.filter(d => !d.gone).map(d => d.m), false); const d = hit ? dark.find(x => x.m === hit.object) : null; if (d !== hover) { hover = d; E.cursor(d ? 'pointer' : 'default'); } }
    },
    click() { if (phase !== 'tidy' || !hover) return; dissolve(hover); hover = null; E.cursor('default'); },
    begin() {
      E.run(async T => {
        panel2 = E.panel('', 'ml'); panel2.style.maxWidth = '230px'; refresh();
        await T.say('Your wellness plan can delete any memory that hurts. You keep only the good days.', 4600, 'human');
        await T.say('Each dark memory is a hard day. Read what it taught you, then decide.', 4200, 'human');
        E.hint(`${E.tapTxt} a dark memory to delete it from your archive.`);
        await T.until(() => removed >= 2); E.hint('');
        await T.say('It is lighter without them. Calmer. The plan is working.', 3600, 'human');
        await T.until(() => removed >= 5);
        phase = 'wait'; await T.wait(1200);
        await T.say('Perfect. Only good days are left. Nothing hurts.', 3400, 'human');
        await T.wait(1600);
        // something happens
        A.tension(1); A.heartbeat(true, 78, 0.3); A.hit(40); E.glitchBurst(1, 500);
        E.tween(mood, 'v', 1, 6); E.bloom.strength = 0.6; E.bloom.threshold = 0.2; E.tween(sky.scale, 'x', 9, 7); E.tween(sky.scale, 'y', 9, 7); E.tween(sky.scale, 'z', 9, 7); E.tween(sky.position, 'y', 8, 7);
        A.ambient({ freqs: [41, 55, 58], cutoff: 200, gain: 0.25, lfo: 0.2 });
        E.rig.shake = 0.03; await T.wait(3000);
        await T.say('A message arrives. Your grandmother has died.', 3800, 'human');
        await T.say('The app asks how you feel. Choose a word.', 3400, 'sys');
        panel = E.panel(`<div style="margin-bottom:10px">How do you feel?</div><div class="wheel"><button data-w="Joy">Joy</button><button data-w="Calm">Calm</button><button data-w="Proud">Proud</button><button data-w="Fine">Fine</button><button disabled>Grief</button><button disabled>Fear</button><button disabled>Anger</button><button disabled>Sadness</button></div><div style="color:#b9a9a0;margin-top:10px;font-size:.82rem;max-width:300px">The grey words are locked. You deleted the days that taught them to you, so you have no example of how they feel.</div>`, 'cc');
        let word = null; panel.querySelectorAll('button[data-w]').forEach(b => (b.onclick = () => (word = b.dataset.w)));
        await T.until(() => word); panel.remove();
        E.rig.shake = 0.07; E.set('uRed', 0.6, 0.5); A.hit(36);
        await T.say(`“${word}.”`, 2400, 'human');
        // everything collapses
        for (const h of happy) { h.m.visible = false; A.blip(700 - Math.random() * 400, 0.25, 0.05, 'triangle', 0.5); await T.wait(90); }
        A.silence?.(); E.rig.shake = 0; E.set('uRed', 0, 1.4);
        const ghost = dark[0].m; ghost.visible = true; ghost.scale.setScalar(0.9); ghost.position.set(0, 1.4, -4); ghost.material.color.set(0x3a2f55);
        E.label(() => ghost.position.clone().add(new V(0, 1.2, 0)), 'the day you deleted', 'soft');
        await T.wait(2400);
        await T.say('You feel something enormous. You cannot say what, so you cannot ask for help.', 4800, 'human red');
        await T.say('You deleted the days that would have taught you the words.', 4200, 'human red');
        await E.end({ title: 'Atypical Patient', line: 'You can only feel what you kept.', stat: 'Emotion words available: 4 of 12. Needed: grief.' });
      });
    },
  };
  return world;
}
