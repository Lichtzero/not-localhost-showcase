import { THREE, glow, dust, driftDust, dog, ghostMat, curveRibbon, textSprite, rand } from '../kit.js';
import { E } from '../engine.js';
import { A } from '../audio.js';
const V = THREE.Vector3;
const WORDS = ['lease', 'fourteenth', 'call', 'landlord', 'October', 'deposit', 'sorry', 'deadline', 'rent', 'tomorrow', 'sign here', 'invoice'];

export function build() {
  const scene = new THREE.Scene(); scene.background = new THREE.Color(0x050c18); scene.fog = new THREE.FogExp2(0x07101e, 0.05);
  scene.add(new THREE.AmbientLight(0x5578a8, 1.1));
  const ground = new THREE.Mesh(new THREE.CircleGeometry(60, 40), new THREE.MeshStandardMaterial({ color: 0x0b2024, roughness: 1 })); ground.rotation.x = -Math.PI / 2; scene.add(ground);
  const moon = glow(0xcfe0ff, 12, 0.7); moon.position.set(8, 16, -30); scene.add(moon);
  const ml = new THREE.DirectionalLight(0x9ab8ff, 1.2); ml.position.set(8, 16, -10); scene.add(ml);
  for (let i = 0; i < 12; i++) { const p = new THREE.Mesh(new THREE.BoxGeometry(0.12, 1.2, 0.12), new THREE.MeshBasicMaterial({ color: 0x03070e })); p.position.set(-14 + i * 2.6, 0.6, -9 + Math.sin(i) * 0.3); scene.add(p); }
  const houseWall = new THREE.Mesh(new THREE.BoxGeometry(14, 5, 0.4), new THREE.MeshStandardMaterial({ color: 0x0c1220, roughness: 1 })); houseWall.position.set(0, 2.5, -18); scene.add(houseWall);
  const doorL = new THREE.Mesh(new THREE.PlaneGeometry(1.6, 2.6), new THREE.MeshBasicMaterial({ color: 0xffe0a8 })); doorL.position.set(0, 1.3, -17.78); scene.add(doorL);
  const dg = glow(0xffc880, 7, 0.5); dg.position.set(0, 1.3, -17.4); scene.add(dg);
  const ribbons = []; [[-5, -2], [-2, -3], [4, -4], [6, -2], [1, -1]].forEach(([x, z], i) => {
    const pts = [new V(x, 0.05, z), new V(x * 0.6, 0.2, z - 4), new V(x * 0.25, 0.1, -10), new V(0, 0.2, -17)];
    const r = curveRibbon(pts, 0xffa860, 320, 0.18, 0.95); scene.add(r); ribbons.push(r);
  });
  const fall = dust(200, [30, 12, 30], 0x9ad8ff, 0.03, 0.4); fall.position.set(0, 5, -8); scene.add(fall);

  const mirror = dog(ghostMat(0xffc27a, 1.3, 0x3a2410), 1.7); mirror.position.set(0.5, 0, -15.6); mirror.rotation.y = Math.PI * 0.95; mirror.visible = false; scene.add(mirror);
  const LEARN = [{ z: 1.5, t: 'Words: “lease”, “fourteenth”' }, { z: -1.5, t: 'Counting: fourteen' }, { z: -4, t: 'Standing on two legs' }, { z: -6.5, t: 'Reading a clock' }, { z: -9, t: 'Opening a door with a hand' }, { z: -11, t: 'Seeing yourself from outside' }];
  let learned = 0, life = 2190, lifeLost = 0, lp = null, lr = null, stood = false, seen = false;
  const words = []; let landed = 0, z = 3, phase = 'intro', panel = null, arrived = false;
  function spawn() {
    const txt = WORDS[(Math.random() * WORDS.length) | 0], s = textSprite(txt, { size: rand(0.28, 0.5), color: '#aef2ff', italic: true, font: '500 64px Literata, serif', opacity: 0 });
    s.position.set(rand(-4, 4), rand(5, 7), z - rand(2, 12)); scene.add(s); words.push({ s, v: rand(0.25, 0.6), life: 0, landed: false });
  }
  let spawnT = 0;
  const base = new V(0, 0.36, 3);
  const world = {
    scene, dbg: { ribbons },
    enter() { E.aim(base, new V(0, 0.8, -12), { par: 0.35, snap: true, fov: 84 }); E.tint(0xb8d0ff, 0.35, 0.01); E.post.uTint.value.set(0.8, 0.92, 1.12); A.ambient({ freqs: [110, 165, 220], type: 'sine', cutoff: 900, gain: 0.1, lfo: 0.14 }); },
    update(dt, t) {
      driftDust(fall, dt, 0.02);
      const rate = phase === 'intro' ? 0 : 0.7 + (3 - z) * 0.07; spawnT += dt * rate; while (spawnT > 1) { spawnT -= 1; spawn(); }
      words.forEach(w => { w.life += dt; if (!w.landed) { w.s.position.y -= w.v * dt; w.s.material.opacity = Math.min(0.9, w.life * 0.7); if (w.s.position.y < 0.5) { w.landed = true; landed++; } } else { w.s.material.opacity = Math.max(0.25, w.s.material.opacity - dt * 0.05); } });
      const prog = Math.min(1, (3 - z) / 18);
      ribbons.forEach((r, i) => { const c = r.material.color; c.setRGB(1 - prog * 0.7, 0.66 + prog * 0.2, 0.38 + prog * 0.6); r.material.opacity = 0.9 - prog * 0.5 + Math.sin(t * 3 + i) * 0.1; });
      if (phase === 'walk') {
        const v = E.hold ? 1.7 : 0.3; z = Math.max(-12.5, z - v * dt);
        const up = Math.max(0, Math.min(1, (-z - 2.5) / 6)), hy = 0.36 + up * up * (3 - 2 * up) * 1.25; E.rig.pos.set(Math.sin(t * 0.9) * 0.12, hy + Math.abs(Math.sin(t * (up > 0.5 ? 3 : 5))) * (E.hold ? 0.04 : 0), z);
        if (E.hold) { const r = 20 * dt; life -= r; lifeLost += r; }
        if (lp) { lp.querySelector('#lf').textContent = `${Math.floor(life / 365)} y ${Math.floor((life % 365) / 30)} m`; lp.querySelector('#hp').style.width = (life / 2190 * 100) + '%'; lp.querySelector('#ll').textContent = Math.round(lifeLost); }
        while (learned < LEARN.length && z < LEARN[learned].z) { lr.querySelector('#li').insertAdjacentHTML('beforeend', `<div>+ ${LEARN[learned].t}</div>`); learned++; A.chime(420 + learned * 70, 0.08); }
        if (up > 0.6 && !stood) { stood = true; E.showSub('Your eyes are rising. Your back legs are holding you up. You are walking like a person.', 'human', 4600); }
        if (z < -11 && !seen) { seen = true; mirror.visible = true; A.hit(46); E.glitchBurst(0.8, 600); E.showSub('There is a dog at the door, looking at you. In the memory, that dog is you.', 'human red', 5400); } E.cur.pos.copy(E.rig.pos); E.rig.look.set(0, 0.7, z - 12); E.cur.look.copy(E.rig.look);
        E.rig.shake = E.hold ? 0.006 : 0; E.post.uGlitch.value = prog > 0.5 ? (Math.random() < 0.02 ? 0.5 : 0) : 0;
        if (z <= -12.4 && !arrived) { arrived = true; arrive(); }
      }
    },
    begin() {
      E.run(async T => {
        await T.say('Your owner has sent you a memory of hers. A transfer is in progress.', 4200, 'sys');
        await T.say('You are the dog. The memory will change you, and it will cost you years.', 4600, 'human');
        lp = E.panel('<b>Your life</b><div id="lf" style="margin:4px 0">6 y 0 m</div><div class="meter red"><i id="hp" style="width:100%"></i></div><div style="color:#ff8a8a;margin-top:4px">−<b id="ll">0</b> days</div>', 'br');
        lr = E.panel('<b>What you are learning</b><div id="li" style="margin-top:6px"></div>', 'bl');
        phase = 'walk'; E.hint(`${E.holdTxt} to follow the smell to the door.`);
        await T.until(() => z < -2); E.hint('');
        await T.say('Something is falling that you do not have a word for.', 4200, 'human');
        await T.until(() => z < -6);
        await T.say('lease … fourteenth … call the landlord', 3800, 'human'); A.murmur(1.6, 0.1, 420);
      });
    },
  };
  function arrive() {
    phase = 'end'; E.rig.shake = 0; A.hit(50); E.glitchBurst(0.7, 600);
    E.run(async T => {
      for (let i = 0; i < 10; i++) { const s = textSprite('wait', { size: 0.5, color: '#ffe0a8', italic: true, font: '500 64px Literata, serif', opacity: 0.9 }); s.position.set(rand(-1.5, 1.5), rand(0.3, 2.2), -17 + rand(0, 4.5)); scene.add(s); await T.wait(120); }
      await T.say('You stand at the door like a person.', 3400, 'human');
      await T.say('A dog looks back at you. You are not sure which of you is the dog.', 4800, 'human red');
      await T.say('You know the lease ends on the fourteenth. You no longer remember what a ball is.', 5400, 'human red');
      await E.end({ title: 'Recipient Animal', line: 'A thought was loaned to a body that could not hold it.', stat: `Life taken: −${Math.round(lifeLost)} days. Human skills learned: ${learned}. Which one are you?` });
    });
  }
  return world;
}
