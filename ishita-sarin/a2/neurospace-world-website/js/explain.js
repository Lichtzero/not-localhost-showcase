/* The explainer: shows, without words doing all the work, what a memory is in 2081.
   Record -> Share -> Edit -> Keep, using one family birthday. */
import { THREE, glow, dust, driftDust, ghostMat, human, dog, at } from './kit.js';
import { E } from './engine.js';
import { A } from './audio.js';
const V = THREE.Vector3;

/* ---------- the memory itself: a painted family birthday ---------- */
function person(x, g, h, cloth, skin = '#e8bd96', hair = '#2a1a12') {
  x.save(); x.translate(g.x, g.y);
  x.fillStyle = cloth; x.beginPath(); x.moveTo(-h * 0.2, 0); x.quadraticCurveTo(-h * 0.24, -h * 0.5, -h * 0.1, -h * 0.62); x.lineTo(h * 0.1, -h * 0.62); x.quadraticCurveTo(h * 0.24, -h * 0.5, h * 0.2, 0); x.closePath(); x.fill();
  x.fillStyle = skin; x.beginPath(); x.arc(0, -h * 0.78, h * 0.13, 0, 7); x.fill();
  x.fillStyle = hair; x.beginPath(); x.arc(0, -h * 0.82, h * 0.135, Math.PI, 0); x.fill();
  x.restore();
}
export function paintMemory(x, W, H, o = {}) {
  const { dad = true, flick = 0, scanY = null, plant = false } = o;
  // room
  let g = x.createLinearGradient(0, 0, 0, H); g.addColorStop(0, '#4a2c1c'); g.addColorStop(1, '#1c120d'); x.fillStyle = g; x.fillRect(0, 0, W, H);
  // window with dusk
  g = x.createLinearGradient(0, 40, 0, 250); g.addColorStop(0, '#324a7a'); g.addColorStop(1, '#e08a58'); x.fillStyle = g; x.fillRect(W * 0.66, 50, W * 0.26, 200);
  x.strokeStyle = '#2a1a12'; x.lineWidth = 8; x.strokeRect(W * 0.66, 50, W * 0.26, 200); x.beginPath(); x.moveTo(W * 0.79, 50); x.lineTo(W * 0.79, 250); x.stroke();
  // bunting
  x.strokeStyle = 'rgba(255,255,255,.35)'; x.lineWidth = 2; x.beginPath(); x.moveTo(0, 40); x.quadraticCurveTo(W / 2, 110, W, 40); x.stroke();
  ['#e85d75', '#f4c95d', '#7bc6a4', '#8fb8ff', '#e85d75', '#f4c95d', '#7bc6a4'].forEach((c, i) => { const t = (i + 1) / 8, px = W * t, py = 40 + Math.sin(t * Math.PI) * 52; x.fillStyle = c; x.beginPath(); x.moveTo(px - 13, py); x.lineTo(px + 13, py); x.lineTo(px, py + 28); x.fill(); });
  // people (mum, child, dad)
  person(x, { x: W * 0.22, y: H * 0.8 }, 330, '#3f7d78');
  person(x, { x: W * 0.46, y: H * 0.8 }, 190, '#e0a640', '#eec29d', '#6b3d1a');
  if (dad) person(x, { x: W * 0.76, y: H * 0.8 }, 350, '#5a5f9a', '#d9a982', '#1d140f');
  else { // the gap, smoothed over
    const r = x.createRadialGradient(W * 0.76, H * 0.46, 10, W * 0.76, H * 0.46, 150); r.addColorStop(0, 'rgba(120,70,40,.85)'); r.addColorStop(1, 'rgba(70,40,26,0)'); x.fillStyle = r; x.fillRect(W * 0.6, H * 0.1, W * 0.3, H * 0.75);
    x.fillStyle = 'rgba(60,34,22,.55)'; x.fillRect(W * 0.66, 270, W * 0.26, 70);
  }
  // table + cake
  x.fillStyle = '#3b2519'; x.fillRect(0, H * 0.8, W, H * 0.2);
  x.fillStyle = '#6b4128'; x.fillRect(0, H * 0.8, W, 10);
  x.fillStyle = '#f6ecdf'; x.beginPath(); x.ellipse(W * 0.5, H * 0.8, 90, 16, 0, 0, 7); x.fill();
  x.fillStyle = '#f2a9b8'; x.fillRect(W * 0.5 - 52, H * 0.8 - 44, 104, 40); x.fillStyle = '#fff5ec'; x.fillRect(W * 0.5 - 52, H * 0.8 - 48, 104, 12);
  for (let i = -1; i <= 1; i++) {
    const cx = W * 0.5 + i * 30, cy = H * 0.8 - 62; x.fillStyle = '#7bc6a4'; x.fillRect(cx - 3, cy, 6, 18);
    const fl = 1 + Math.sin(flick * 6 + i) * 0.12; const gg = x.createRadialGradient(cx, cy - 8, 0, cx, cy - 8, 46 * fl); gg.addColorStop(0, 'rgba(255,225,150,.95)'); gg.addColorStop(1, 'rgba(255,170,70,0)'); x.fillStyle = gg; x.fillRect(cx - 60, cy - 70, 120, 120);
    x.fillStyle = '#fff2c2'; x.beginPath(); x.ellipse(cx, cy - 8, 4, 8 * fl, 0, 0, 7); x.fill();
  }
  // warm light wash from the candles
  const w = x.createRadialGradient(W * 0.5, H * 0.62, 20, W * 0.5, H * 0.62, 340); w.addColorStop(0, 'rgba(255,190,110,.22)'); w.addColorStop(1, 'rgba(255,190,110,0)'); x.fillStyle = w; x.fillRect(0, 0, W, H);
  if (scanY !== null) { x.fillStyle = 'rgba(255,255,255,.85)'; x.fillRect(0, scanY - 2, W, 4); const sg = x.createLinearGradient(0, scanY - 70, 0, scanY); sg.addColorStop(0, 'rgba(255,255,255,0)'); sg.addColorStop(1, 'rgba(255,255,255,.22)'); x.fillStyle = sg; x.fillRect(0, scanY - 70, W, 70); }
}

export function createExplain() {
  const scene = new THREE.Scene(); scene.background = new THREE.Color(0x0a0809); scene.fog = new THREE.FogExp2(0x0a0809, 0.045);
  scene.add(new THREE.AmbientLight(0x6a4a3a, 0.9));
  const key = new THREE.PointLight(0xffc48a, 30, 24); key.position.set(0, 4, 4); scene.add(key);
  const floor = new THREE.Mesh(new THREE.PlaneGeometry(60, 60), new THREE.MeshStandardMaterial({ color: 0x15100d, roughness: 0.55, metalness: 0.35 })); floor.rotation.x = -Math.PI / 2; scene.add(floor);
  const air = dust(260, [26, 8, 20], 0xffd9a8, 0.04, 0.4); at(air, 0, 3, -2); scene.add(air);

  // the memory
  const W = 768, H = 512, cv = document.createElement('canvas'); cv.width = W; cv.height = H; const cx = cv.getContext('2d');
  const tex = new THREE.CanvasTexture(cv); tex.colorSpace = THREE.SRGBColorSpace;
  const S = { dad: true, flick: 0, scanY: null, reveal: 0 };
  function repaint() {
    paintMemory(cx, W, H, S);
    if (S.reveal < 1) { cx.fillStyle = '#0a0809'; cx.fillRect(0, S.reveal * H, W, H); cx.fillStyle = 'rgba(255,255,255,.9)'; cx.fillRect(0, S.reveal * H - 2, W, 3); }
    tex.needsUpdate = true;
  }
  const frame = new THREE.Group(); frame.position.set(0, 1.75, -0.4); frame.scale.setScalar(0.001); scene.add(frame);
  frame.add(new THREE.Mesh(new THREE.PlaneGeometry(2.7, 1.8), new THREE.MeshBasicMaterial({ map: tex })));
  frame.add(new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.PlaneGeometry(2.78, 1.88)), new THREE.LineBasicMaterial({ color: 0xffe3bd })));
  const fglow = glow(0xffb36a, 7.5, 0.22); fglow.position.z = -0.1; frame.add(fglow);

  // people
  const a = human(1.75, ghostMat(0xffc27a, 2.0, 0x120a06)); at(a, -3.4, 0, 0.6); scene.add(a);
  const b = human(1.7, ghostMat(0xa9c8ff, 2.0, 0x060a12)); at(b, 3.4, 0, 0.6); scene.add(b);
  const d = dog(ghostMat(0xc7e8b8, 2.0, 0x07100a), 1.5); at(d, 5.2, 0, 1.2); d.rotation.y = Math.PI * 0.85; scene.add(d);
  const aGlow = glow(0xffb36a, 2.4, 0); aGlow.position.set(-3.4, 1.6, 0.6); scene.add(aGlow);
  const bGlow = glow(0xa9c8ff, 2.4, 0); bGlow.position.set(3.4, 1.6, 0.6); scene.add(bGlow);
  const dGlow = glow(0xc7e8b8, 1.6, 0); dGlow.position.set(5.2, 0.9, 1.2); scene.add(dGlow);

  // the vault wall: where everything ends up
  const vault = new THREE.Group(); vault.position.set(0, 3.4, -11); vault.visible = false; scene.add(vault);
  const cells = [];
  for (let r = 0; r < 5; r++) for (let c = 0; c < 11; c++) {
    const m = new THREE.Mesh(new THREE.PlaneGeometry(1.0, 0.68), new THREE.MeshBasicMaterial({ color: 0xffd7a0, transparent: true, opacity: 0.0 }));
    m.position.set((c - 5) * 1.25, (r - 2) * 0.9, 0); vault.add(m); cells.push(m);
    const l = new THREE.LineSegments(new THREE.EdgesGeometry(m.geometry), new THREE.LineBasicMaterial({ color: 0xffd7a0, transparent: true, opacity: 0.12 })); l.position.copy(m.position); vault.add(l);
  }
  const vlab = E.label(() => new V(0, 5.7, -11), 'mémoire archive', 'soft'); vlab.alpha = 0;

  const flights = [];
  const cB = (() => { const m = copyOf0(); m.visible = false; return m; })(), cD = (() => { const m = copyOf0(); m.visible = false; return m; })();
  function copyOf0() { const m = new THREE.Mesh(new THREE.PlaneGeometry(2.7, 1.8), new THREE.MeshBasicMaterial({ map: tex, transparent: true })); m.add(new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.PlaneGeometry(2.78, 1.88)), new THREE.LineBasicMaterial({ color: 0xffe3bd }))); scene.add(m); return m; }
  const copyOf = () => { const m = new THREE.Mesh(new THREE.PlaneGeometry(2.7, 1.8), new THREE.MeshBasicMaterial({ map: tex, transparent: true })); m.add(new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.PlaneGeometry(2.78, 1.88)), new THREE.LineBasicMaterial({ color: 0xffe3bd }))); scene.add(m); return m; };
  const world = {
    scene, S, frame, a, b, d, vlab, vault, cells, flights, repaint, bGlow, dGlow, aGlow, copyOf, cB, cD, keep: false,
    click() { world.onClick?.(); },
    enter() { E.aim(new V(0, 1.9, 6.6), new V(0, 2.3, 0), { par: 0.3, snap: true, fov: 50 }); A.ambient({ freqs: [65.4, 98, 130.8], cutoff: 420, gain: 0.16, lfo: 0.05, shimmer: 0.004 }); repaint(); },
    update(dt, t) {
      driftDust(air, dt, 0.04); S.flick = t; if (frame.scale.x > 0.01) repaint();
      if (!world.keep) frame.position.y = 1.75 + Math.sin(t * 0.8) * 0.04;
      for (let i = flights.length - 1; i >= 0; i--) {
        const f = flights[i]; f.t += dt / f.dur; const p = Math.min(1, f.t), e = p * p * (3 - 2 * p);
        f.m.position.lerpVectors(f.a, f.b, e); f.m.position.y += Math.sin(p * Math.PI) * f.arc; f.m.scale.setScalar(f.s0 + (f.s1 - f.s0) * e);
        f.m.material.opacity = 1 - Math.max(0, (p - 0.75) / 0.25) * (f.fade ? 1 : 0);
        if (p >= 1) { flights.splice(i, 1); f.done?.(); }
      }
    },
  };
  return world;
}

/* ---------- the intro as a short deck: auto-plays, click or arrows to move, arrows to go back ---------- */
export function startDeck(w, ui, onDone) {
  const { S, frame, a, b, d } = w;
  const home = new V(0, 1.75, -0.4), vaultPos = new V(0, 3.4, -10.9);
  let labels = [], i = -1, timer = null, scanTok = 0, stopped = false;
  const L = (fn, text) => labels.push(E.label(fn, text, 'soft'));
  const fp = () => frame.position.clone().add(new V(0, -1.6, 0));
  const steps = [
    { sub: ['2081.', 'big mid'], on: 0, ms: 4200 },
    { sub: ['Roughly sixty years from now. The world is in the middle of a change.', 'human'], on: 0, ms: 6500 },
    { cap: ['Record', 'A neural implant records what you live: what you see, hear, smell and feel.'], on: 1, glowA: 1, ms: 8500, labels: [() => L(fp, 'one memory: her son’s 7th birthday')] },
    { cap: ['Share', 'It can be copied and shared with anyone. A friend, a stranger, even a dog.'], on: 1, glowA: 1, share: 1, ms: 8500, labels: [() => L(() => b.position.clone().add(new V(0, 2.1, 0)), 'now he remembers it too'), () => L(() => d.position.clone().add(new V(0, 1.25, 0)), 'and the dog')] },
    { cap: ['Edit', 'And it can be edited. Remove a person. Add a moment. Smooth over the bad day.'], on: 1, scan: true, ms: 7000 },
    { cap: ['Edit', 'And it can be edited. Remove a person. Add a moment. Smooth over the bad day.'], sub: ['She remembers it the new way. She cannot tell.', 'human'], on: 1, dad: false, ms: 7500, labels: [() => L(fp, 'the father has been removed from the memory')] },
    { cap: ['Keep', 'A company called mémoire stores all of it, forever. Nothing is deleted. Only flagged.'], on: 1, dad: false, keep: true, ms: 8500 },
    { cap: null, sub: ['It will not feel like a disaster. It will feel like a convenience.', 'human'], on: 1, dad: false, keep: true, ms: 6500 },
    { cap: null, sub: ['Nine people are already living inside it.', 'human'], on: 1, dad: false, keep: true, ms: 5200 },
    { cap: null, sub: ['Choose a life.', 'human'], on: 1, dad: false, keep: true, ms: 5000, last: true },
  ];
  function apply(st, from) {
    const fwd = from < i;
    // frame
    const sc = st.on ? (st.keep ? 0.4 : 1.3) : 0.001;
    E.tween(frame.scale, 'x', sc, 1.2); E.tween(frame.scale, 'y', sc, 1.2); E.tween(frame.scale, 'z', sc, 1.2);
    w.keep = !!st.keep; const tp = st.keep ? vaultPos : home;
    E.tween(frame.position, 'x', tp.x, 1.6); E.tween(frame.position, 'y', tp.y, 1.6); E.tween(frame.position, 'z', tp.z, 1.6);
    if (st.on && S.reveal < 1) E.tween(S, 'reveal', 1, 2); if (!st.on) S.reveal = 0;
    E.tween(w.aGlow.material, 'opacity', st.glowA ? 0.55 : 0, 1);
    // edit
    const tok = ++scanTok;
    if (st.scan) { S.dad = true; const t0 = E.t; const iv = setInterval(() => { if (tok !== scanTok || stopped) { clearInterval(iv); S.scanY = null; return; } const p = Math.min(1, (E.t - t0) / 2.2); S.scanY = p * 512; if (p > 0.55) S.dad = false; if (p >= 1) { clearInterval(iv); S.scanY = null; A.glitch(); } }, 16); A.noise(2.2, 0.08, 900, 1, 5); }
    else { S.scanY = null; S.dad = st.dad !== false; }
    // share
    if (st.share) {
      [[w.cB, b.position.clone().add(new V(0, 1.6, 0))], [w.cD, d.position.clone().add(new V(0.1, 0.8, 0))]].forEach(([m, to], k) => { m.visible = true; m.position.copy(frame.position); m.scale.setScalar(1.3); m.material.opacity = 1; setTimeout(() => { E.tween(m.position, 'x', to.x, 2); E.tween(m.position, 'y', to.y, 2); E.tween(m.position, 'z', to.z, 2); E.tween(m.material, 'opacity', 0, 2); [0, 0, 0].length; E.tween(m.scale, 'x', 0.1, 2); E.tween(m.scale, 'y', 0.1, 2); }, k * 400); });
      A.whoosh(); setTimeout(() => { E.tween(w.bGlow.material, 'opacity', 0.8, 0.6); E.tween(w.dGlow.material, 'opacity', 0.8, 0.6); A.chime(520, 0.1); }, 1800);
    } else { w.cB.visible = w.cD.visible = false; E.tween(w.bGlow.material, 'opacity', 0, 0.6); E.tween(w.dGlow.material, 'opacity', 0, 0.6); }
    // keep
    w.vault.visible = !!st.keep; w.vlab.alpha = st.keep ? 0.9 : 0;
    if (st.keep && !w.litOnce) { w.litOnce = true; w.cells.forEach((c, k) => setTimeout(() => (c.material.opacity = 0.1 + Math.random() * 0.28), k * 40)); A.chime(260, 0.1); }
    if (st.keep) E.aim(new V(0, 3.4, 4.5), new V(0, 3.4, -11), { par: 0.15, damp: 1.1, fov: 52 }); else E.aim(new V(0, 1.9, 6.6), new V(0, 2.3, 0), { par: 0.3, damp: 2, fov: 50 });
  }
  function go(n) {
    if (stopped) return; clearTimeout(timer);
    if (n < 0) return; if (n >= steps.length) { stopped = true; return onDone(); }
    const from = i; i = n; const st = steps[n];
    labels.forEach(l => l.remove()); labels = []; (st.labels || []).forEach(f => f());
    if (st.cap === null) ui.capOff(); else if (st.cap) ui.cap(st.cap[0], st.cap[1]);
    if (st.sub) E.showSub(st.sub[0], st.sub[1], 0); else E.hideSub();
    apply(st, from); if (n === 0 || from < 0) A.blip(900, 1, 0.05, 'sine');
    $nav(n); timer = setTimeout(() => go(n + 1), st.ms);
  }
  const nt = document.getElementById('nTxt');
  const $nav = n => { nt.textContent = `${n + 1} / ${steps.length}`; };
  E.navHook = dir => go(i + dir);
  w.onClick = () => go(i + 1);
  go(0);
  return { stop() { stopped = true; clearTimeout(timer); scanTok++; labels.forEach(l => l.remove()); E.navHook = null; } };
}
