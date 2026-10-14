import { THREE, glow, dust, driftDust, human, dog, ghostMat, curveRibbon, textSprite, rand } from '../kit.js';
import { E } from '../engine.js';
import { A } from '../audio.js';
const V = THREE.Vector3;

export function build() {
  const scene = new THREE.Scene(); scene.background = new THREE.Color(0x0a1220); scene.fog = new THREE.FogExp2(0x0e1a2c, 0.045);
  scene.add(new THREE.AmbientLight(0x88a8cc, 2.2));
  const ground = new THREE.Mesh(new THREE.CircleGeometry(50, 40), new THREE.MeshStandardMaterial({ color: 0x2a5a3c, roughness: 1 })); ground.rotation.x = -Math.PI / 2; scene.add(ground);
  const lampL = new THREE.PointLight(0xffc880, 140, 30); lampL.position.set(3, 3.2, -4); scene.add(lampL);
  const lampG = glow(0xffd090, 3, 0.8); lampG.position.copy(lampL.position); scene.add(lampG);
  const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.05, 3.2, 8), new THREE.MeshBasicMaterial({ color: 0x050a10 })); pole.position.set(3, 1.6, -4); scene.add(pole);
  for (let i = 0; i < 14; i++) { const t = new THREE.Mesh(new THREE.ConeGeometry(rand(1, 1.8), rand(4, 7), 7), new THREE.MeshBasicMaterial({ color: 0x050d14 })); t.position.set(rand(-24, 24), 2.5, -rand(10, 30)); scene.add(t); }
  const fly = dust(250, [24, 6, 30], 0xfff0b0, 0.05, 0.7); fly.position.set(0, 2.5, -8); scene.add(fly);

  const biscuit = dog(ghostMat(0xffc27a, 1.3, 0x3a2410), 1.7); biscuit.position.set(0, 0, -2.2); biscuit.rotation.y = -Math.PI / 2 + 0.2; biscuit.rotation.y = Math.PI / 2 * 0 + (-Math.PI / 2); scene.add(biscuit);
  const bGlow = glow(0xffc27a, 2.4, 0.4); bGlow.position.set(0, 0.9, -2.2); scene.add(bGlow);
  // dog-view only
  const dogView = new THREE.Group(); dogView.visible = false; scene.add(dogView);
  const ribbons = [];
  [[-6, -1], [-3, -5], [4, -3], [6, -8], [-5, -10]].forEach(([x, z], i) => {
    const pts = [new V(x, 0.05, z), new V(x * 0.7, 0.3, z * 0.7 - 2), new V(x * 0.3 + Math.sin(i) * 2, 0.15, -6 - i), new V(0, 0.2, -14)];
    const r = curveRibbon(pts, [0xffb060, 0x7fffc0, 0xffe070, 0xff90d0, 0x80d0ff][i], 320, 0.2, 1); dogView.add(r); ribbons.push(r);
  });
  const giant = human(4.4, ghostMat(0xfff0d0, 1.6, 0x1a1208)); giant.position.set(0, 0, -9); dogView.add(giant);
  const ball = new THREE.Mesh(new THREE.SphereGeometry(0.16, 14, 12), new THREE.MeshBasicMaterial({ color: 0xffffff })); ball.add(glow(0xfff0b0, 1.3, 0.9)); ball.visible = false; scene.add(ball);

  let view = 'human', throws = 0, catches = 0, chasing = false, bp = { t: 0, a: new V(), b: new V() }, days = 18250, leaving = false, t0 = 0, lost = 0, panel = null, empathy = 0, hover = false, active = false;
  const base = new V(-0.9, 1.0, 1.0), lookH = new V(0, 0.45, -2.2);

  function throwBall() {
    throws++; const z = -8 - throws * 2.5; bp = { t: 0, a: new V(0.2, 3.6, -8.6), b: new V((throws % 2 ? -1 : 1) * rand(1.5, 3.5), 0.16, z) };
    ball.visible = true; ball.position.copy(bp.a); A.blip(300, 0.3, 0.1, 'sine', 2); E.showSub('Good girl. Fetch.', 'human', 2400);
    E.hint(`${E.tapTxt} to chase the ball, or press Leave her mind whenever you want.`);
  }
  const world = {
    scene, dbg: { biscuit, get ball(){return ball} },
    enter() { E.aim(base, lookH, { par: 0.2, snap: true, fov: 60 }); A.ambient({ freqs: [65.4, 98, 130.8], cutoff: 500, gain: 0.13, lfo: 0.07 }); },
    update(dt, t) {
      driftDust(fly, dt, 0.04); biscuit.userData.tail.rotation.x = Math.sin(t * 9) * 0.5; bGlow.material.opacity = 0.35 + Math.sin(t * 2) * 0.05;
      if (view === 'human') { const h = E.pick([biscuit], true); const hv = !!h; if (hv !== hover) { hover = hv; E.cursor(hv ? 'pointer' : 'default'); } }
      if (view === 'dog') {
        ribbons.forEach((r, i) => { r.material.opacity = 0.7 + Math.sin(t * 2 + i) * 0.2; r.rotation.y = 0; });
        if (active) { const rate = 14; days -= rate * dt; lost += rate * dt; empathy = Math.min(100, empathy + dt * 1.6); const yy = Math.floor(days / 365), mm = Math.floor((days % 365) / 30), sec = Math.floor(E.t - t0); panel.querySelector('#dd').textContent = `${yy} y ${mm} m`; panel.querySelector('#hp').style.width = (days / 18250 * 100) + '%'; panel.querySelector('#ee').style.width = empathy + '%'; panel.querySelector('#ll').textContent = Math.round(lost).toLocaleString(); panel.querySelector('#tm').textContent = Math.floor(sec / 60) + ':' + String(sec % 60).padStart(2, '0'); }
        if (ball.visible && bp.t < 1) { bp.t = Math.min(1, bp.t + dt / 1.1); const e = bp.t; ball.position.lerpVectors(bp.a, bp.b, e); ball.position.y += Math.sin(e * Math.PI) * 2.2; if (bp.t >= 1) E.showSub('', '', 1); }
        giant.rotation.y = Math.sin(t * 0.4) * 0.15;
      }
    },
    click() {
      if (view === 'human' && hover) { toDog(); return; }
      if (view === 'dog' && ball.visible && bp.t >= 1 && !chasing) chase();
    },
    begin() { E.run(async T => { await T.say('Biscuit has been with you for eleven years.', 3800, 'human'); await T.say('You have always wanted to know what she feels. Her plan lets you borrow her memories.', 4400, 'human'); E.hint(`${E.tapTxt} Biscuit to relive her memory.`); }); },
  };

  function toDog() {
    E.hint(''); A.whoosh(); E.glitchBurst(0.8, 600); E.white(1, 0.8);
    E.run(async T => {
      await T.wait(900); view = 'dog'; dogView.visible = true; biscuit.visible = bGlow.visible = false; lampL.intensity = 50;
      E.cur.pos.set(0, 0.34, 1.6); E.rig.pos.set(0, 0.34, 1.6); E.rig.look.set(0, 0.5, -12); E.cur.look.copy(E.rig.look); E.aim(new V(0, 0.34, 1.6), new V(0, 0.9, -12), { par: 0.4, snap: true, fov: 82 });
      E.tint(0xb8c8ff, 0.42, 0.1); E.post.uTint.value.set(0.85, 0.95, 1.15);
      panel = E.panel(`<b style="font-size:1rem">Inside Biscuit’s memory</b><div style="margin-top:6px">Time inside <b id="tm">0:00</b></div><div>Your remaining life <b id="dd">50 y 0 m</b></div><div class="meter red"><i id="hp" style="width:100%"></i></div><div style="color:#ff8a8a;margin-top:4px">−<b id="ll">0</b> days of your life</div><div style="margin-top:8px">Empathy</div><div class="meter am"><i id="ee" style="width:0"></i></div><div style="margin-top:8px;color:#8ef0a5">Biscuit: unaffected</div><div style="margin-top:10px"><button class="btn pri" id="lv" style="padding:8px 18px;font-size:.9rem">Leave her mind</button></div>`, 'br');
      panel.querySelector('#lv').onclick = () => (leaving = true); t0 = E.t;
      active = true; E.white(0, 1.2); A.ambient({ freqs: [130.8, 196, 261.6], type: 'sine', cutoff: 1200, gain: 0.09, lfo: 0.16 });
      await T.say('This is what she smells. Everything is a trail.', 3800, 'human');
      await T.say('You are enormous. You are home.', 3400, 'human');
      await T.say('Every second you stay here is taken from your own life. Biscuit feels nothing. You can leave whenever you want.', 5200, 'sys');
      throwBall();
      await T.until(() => leaving); E.hint(''); active = false; ball.visible = false;
      const sec = Math.floor(E.t - t0);
      await T.say(`You spent ${Math.floor(sec / 60)}:${String(sec % 60).padStart(2, '0')} inside. It cost you ${Math.round(lost).toLocaleString()} days of your life.`, 4800, 'human red');
      back();
    });
  }
  async function chase() {
    chasing = true; E.hint(''); A.blip(180, 0.4, 0.12, 'sawtooth', 2); E.rig.shake = 0.03;
    const goal = bp.b.clone(); goal.y = 0.34; E.rig.pos.copy(goal).add(new V(0, 0, 1.2)); E.rig.look.copy(bp.b).add(new V(0, 0.2, -2)); E.rig.damp = 2.2;
    await new Promise(r => setTimeout(r, 1500)); E.rig.shake = 0; ball.visible = false; catches++; A.chime(700, 0.1); A.laugh(0.05, 1.4); E.tween(E.post.uWhite, 'value', 0.25, 0.15).then(() => E.tween(E.post.uWhite, 'value', 0, 0.8));
    if (!leaving) { E.showSub('Good girl.', 'human', 1800); await new Promise(r => setTimeout(r, 1800)); if (!leaving) throwBall(); }
    chasing = false;
  }
  async function back() {
    A.whoosh(); E.white(1, 0.8); await new Promise(r => setTimeout(r, 1000));
    view = 'human'; dogView.visible = false; ball.visible = false; biscuit.visible = bGlow.visible = true; lampL.intensity = 140; panel.remove();
    E.post.uTintAmt.value = 0; E.aim(base, lookH, { par: 0.2, snap: true, fov: 60 }); E.white(0, 1.4); A.ambient({ freqs: [65.4, 98, 130.8], cutoff: 500, gain: 0.13, lfo: 0.07 });
    E.run(async T => {
      await T.wait(1200); await T.say('She wags her tail.', 3000, 'human'); await T.say('She does not know what it cost you.', 4200, 'human red');
      await E.end({ title: 'Animal Companion', line: 'Empathy is real. You pay for it with your own life.', stat: `You: −${Math.round(lost).toLocaleString()} days. Biscuit: unaffected.` });
    });
  }
  return world;
}
