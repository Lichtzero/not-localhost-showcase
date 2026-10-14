import { THREE, glow, dust, driftDust, human, ghostMat, textSprite, rand } from '../kit.js';
import { E } from '../engine.js';
import { A } from '../audio.js';
const V = THREE.Vector3;

export function build() {
  const scene = new THREE.Scene(); scene.background = new THREE.Color(0x120804); scene.fog = new THREE.FogExp2(0x1a0d06, 0.05);
  const std = c => new THREE.MeshStandardMaterial({ color: c, roughness: 0.9 });
  const room = new THREE.Mesh(new THREE.BoxGeometry(9, 3.4, 8), new THREE.MeshStandardMaterial({ color: 0x4a2d1c, side: THREE.BackSide, roughness: 0.95 })); room.position.set(0, 1.7, -0.5); scene.add(room);
  scene.add(new THREE.AmbientLight(0xffb070, 0.6));
  const lamp = new THREE.PointLight(0xffa860, 16, 16); lamp.position.set(0, 2.6, -0.4); scene.add(lamp);
  const table = new THREE.Mesh(new THREE.BoxGeometry(2.2, 0.08, 1.1), std(0x6b4026)); table.position.set(0, 0.8, -0.2); scene.add(table);
  [[-1, -.45], [1, -.45], [-1, .45], [1, .45]].forEach(([x, z]) => { const l = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.8, 0.08), std(0x4a2a18)); l.position.set(x, 0.4, -0.2 + z); scene.add(l); });
  [-0.4, 0.5].forEach(x => { const c = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.055, 0.1, 12), std(0xf3e2c8)); c.position.set(x, 0.89, -0.2); scene.add(c); });
  // window with rain
  const win = new THREE.Mesh(new THREE.PlaneGeometry(2.4, 1.5), new THREE.MeshBasicMaterial({ color: 0x1a2a44 })); win.position.set(0, 1.9, -4.48); scene.add(win);
  const rain = dust(260, [2.4, 1.5, 0.1], 0x8fb0e0, 0.04, 0.8); rain.position.set(0, 1.9, -4.45); scene.add(rain);
  // she
  const she = human(1.62, ghostMat(0xffc78a, 1.4, 0x2a1408), true); she.position.set(0, 0, -1.25); scene.add(she);
  const sGlow = glow(0xffa860, 2.4, 0.5); sGlow.position.set(0, 1.1, -1.25); scene.add(sGlow);
  // door (the way out)
  const door = new THREE.Group(); door.position.set(-2.9, 1.05, -4.42);
  const panel = new THREE.Mesh(new THREE.PlaneGeometry(1.1, 2.1), new THREE.MeshBasicMaterial({ color: 0xcfe6ff })); door.add(panel);
  const dg = glow(0xbfdcff, 4, 0.35); dg.position.z = 0.3; door.add(dg); scene.add(door);
  const motes = dust(220, [6, 3, 6], 0xffcf90, 0.035, 0.5); motes.position.set(0, 1.6, -0.5); scene.add(motes);

  let slipUntil = 0; const slipped = [false, false];
  let attempt = 0, prog = 0, phase = 'loop', ring = null, arc = null, choice = null, need = [1.2, 2.8, 5.2], outside = false, bgA = new THREE.Color(0x120804);
  const base = new V(0, 1.2, 1.5), lookA = new V(0, 1.15, -1.25), lookB = new V(-2.9, 1.2, -4.4);
  const mkRing = () => { const d = document.createElement('div'); d.className = 'ring'; d.innerHTML = '<svg viewBox="0 0 92 92"><circle cx="46" cy="46" r="40" stroke="rgba(255,255,255,.2)"/><circle id="arc" cx="46" cy="46" r="40" stroke="#fff" stroke-dasharray="251" stroke-dashoffset="251" transform="rotate(-90 46 46)"/></svg>'; document.getElementById('ui').appendChild(d); arc = d.querySelector('#arc'); return d; };

  const world = {
    scene, dbg: { door },
    enter() { E.aim(base, lookA, { par: 0.22, snap: true, fov: 62 }); A.ambient({ freqs: [110, 164.8, 220], type: 'triangle', cutoff: 900, gain: 0.1, lfo: 0.1 }); },
    update(dt, t) {
      driftDust(motes, dt, 0.03); driftDust(rain, dt, -1.4);
      she.userData.head.position.y = 1.4 + Math.sin(t * 9) * 0.015 * (1 + attempt); she.rotation.z = Math.sin(t * 5) * 0.025;
      lamp.intensity = 15 + Math.sin(t * 7) * 1.5 + attempt * 6 + (prog * Math.sin(t * 40) * 6);
      sGlow.material.opacity = 0.45 + attempt * 0.12;
      if (phase === 'loop') {
        const holding = E.hold && E.t > slipUntil;
        if (attempt < 2 && !slipped[attempt] && prog > 0.8) { slipped[attempt] = true; slipUntil = E.t + 2.4; prog = 0.45; A.heartbeat(true, 60, 0.2); E.showSub(attempt === 0 ? 'Your hand let go. Nobody made it. You just did not want to.' : 'You were almost out. You let go again. You wanted one more minute.', 'human red', 4200); E.hint(''); }
        prog = Math.max(0, Math.min(1, prog + (holding ? 1 : -1.6) * dt / need[Math.min(attempt, 2)]));
        if (arc) arc.setAttribute('stroke-dashoffset', 251 * (1 - prog));
        E.rig.look.lerpVectors(lookA, lookB, prog * prog); E.rig.pos.set(base.x - prog * 0.5, base.y, base.z - prog * 0.3);
        E.rig.shake = prog * 0.012; E.post.uAb.value = 0.0015 + prog * 0.005;
        if (prog >= 1) { phase = 'exiting'; leave(); }
      }
    },
    begin() {
      E.run(async T => {
        await T.say('A kitchen. Her laugh. You have been here before.', 3600, 'human');
        await T.say('You promised your family you would log out. Nothing is trapping you. Try to leave.', 4600, 'human');
        E.panel('<small>Outside the memory</small><br>41 days since you left the house', 'br');
        ring = mkRing(); E.hint(`${E.holdTxt} to leave this memory.`);
        A.laugh(0.07); const iv = setInterval(() => { if (phase === 'loop') A.laugh(0.05 + attempt * 0.02, 1 - attempt * 0.12); }, 4200);
        world.dispose = () => clearInterval(iv);
        await T.until(() => attempt >= 1); E.hint('');
      });
    },
  };

  async function leave() {
    A.whoosh(); E.glitchBurst(0.7, 500); E.white(1, 0.9);
    const T = E.run(async T => {
      await T.wait(1100); attempt++; prog = 0; if (arc) arc.setAttribute('stroke-dashoffset', 251);
      door.position.x = -2.9 - attempt * 0.55; door.scale.setScalar(1 - attempt * 0.18); lookB.set(door.position.x, 1.2, -4.4);
      E.rig.pos.copy(base); E.rig.look.copy(lookA); E.cur.pos.copy(base); E.cur.look.copy(lookA); E.rig.shake = 0;
      E.white(0, 1.4); A.ambient({ freqs: [110 - attempt * 14, 164.8, 220 - attempt * 22], type: 'triangle', cutoff: 800 - attempt * 200, gain: 0.1, lfo: 0.1 + attempt * 0.06 });
      await T.wait(900);
      if (attempt < 2) { await T.say('Again.', 2400, 'human'); phase = 'loop'; E.hint(`${E.holdTxt} to try to leave.`); if (attempt === 1) await T.say('You left. A minute later you came back. Nobody pulled you in. You pressed play.', 4600, 'human'); }
      else {
        await T.say('Again.', 2000, 'human'); await T.say('You are not being kept here. Do you still want to leave?', 4000, 'human'); A.heartbeat(true, 58, 0.25);
        choice = E.panel('<div class="choices"><button class="btn" data-c="leave">Leave</button><button class="btn pri" data-c="stay">Stay</button></div>', 'tc'); 
        choice.querySelectorAll('button').forEach(b => (b.onclick = () => { const c = b.dataset.c; choice.remove(); ending(c); }));
        if (ring) ring.remove();
      }
    });
  }
  function ending(c) {
    E.run(async T => {
      if (c === 'stay') {
        E.tween(lamp, 'intensity', 90, 6); E.white(0.75, 7); A.ambient({ freqs: [261.6, 329.6, 392], type: 'sine', cutoff: 2000, gain: 0.1, lfo: 0.1 }); A.laugh(0.1, 0.9);
        E.rig.look.copy(lookA); E.rig.pos.set(0, 1.2, 0.6);
        const days = { v: 0 }, pn = E.panel('Days inside <b id="d">0</b>', 'br'); E.tween(days, 'value', 4112, 9, t => t); const iv = setInterval(() => (pn.querySelector('#d').textContent = Math.round(days.v ?? days.value).toLocaleString()), 50);
        days.v = 0; E.tween(days, 'v', 4112, 9, t => t);
        await T.say('He stayed.', 3600, 'human'); await T.say('Nobody noticed for a long time.', 4200, 'human'); clearInterval(iv);
        await E.end({ title: 'Relapser', line: 'Whether he still wants to.', stat: 'Days inside: 4,112' });
      } else {
        E.heartbeatOff?.(); A.heartbeat(false); A.ambient({ freqs: [49, 49.7], cutoff: 120, gain: 0.12, lfo: 0.03 });
        E.white(1, 0.7); await T.wait(900);
        lamp.intensity = 0; room.visible = false; table.visible = she.visible = sGlow.visible = false; door.visible = false; scene.background.set(0x20252b); scene.fog.color.set(0x20252b); scene.fog.density = 0.06;
        E.rig.pos.set(0, 1.6, 4); E.rig.look.set(0, 1.5, -6); E.cur.pos.copy(E.rig.pos); E.cur.look.copy(E.rig.look); E.post.uTintAmt.value = 0.9; E.post.uTint.value.set(0.8, 0.85, 0.95);
        E.white(0, 2);
        await T.say('Outside is grey.', 3000, 'human'); await T.say('Outside, nobody was waiting.', 4200, 'human');
        await E.end({ title: 'Relapser', line: 'You can leave. Wanting to is the hard part.', stat: 'Exits taken: 3' });
      }
    });
  }
  return world;
}
