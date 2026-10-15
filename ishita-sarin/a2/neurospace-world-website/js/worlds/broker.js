/* Broker. A customer wants a memory of a night she was not there for.
   You buy four real fragments from strangers, then generate the one piece that never existed. */
import { at, THREE, glow, dust, human, ghostMat, textSprite, rand } from '../kit.js';
import { E } from '../engine.js';
import { A } from '../audio.js';
const V = THREE.Vector3;

const W = 768, H = 512, FW = 5.0, FH = FW * H / W;
const FRAME = new V(0, 2.25, -4.2);
const SLOT = {
  door:  { x: 40,  y: 110, w: 200, h: 370, name: 'The door',        line: 'The door was already open.',            who: 'stranger 4412', price: 12 },
  time:  { x: 30,  y: 20,  w: 240, h: 90,  name: 'The time',        line: 'She said she would be back by nine.',   who: 'stranger 0931', price: 9 },
  rain:  { x: 520, y: 20,  w: 220, h: 210, name: 'Rain on the glass', line: 'Rain on the stairwell light.',        who: 'stranger 2207', price: 15 },
  stair: { x: 270, y: 340, w: 470, h: 150, name: 'The stairs',      line: 'I did not call.',                       who: 'stranger 7760', price: 11 },
  gap:   { x: 300, y: 110, w: 200, h: 220, name: 'Her sister',      line: '', who: 'nobody', price: 0 },
};

/* each piece paints itself onto the shared canvas, in the same coordinates it will have in the finished scene */
const PIECE = {
  door(x, a) {
    x.save(); x.globalAlpha = a;
    const sp = x.createLinearGradient(220, 0, 330, 0); sp.addColorStop(0, 'rgba(255,200,130,.55)'); sp.addColorStop(1, 'rgba(255,200,130,0)');
    x.fillStyle = sp; x.beginPath(); x.moveTo(220, 150); x.lineTo(330, 100); x.lineTo(330, 500); x.lineTo(220, 470); x.fill();
    x.fillStyle = '#1b2038'; x.fillRect(60, 130, 160, 340);
    const lg = x.createLinearGradient(150, 0, 220, 0); lg.addColorStop(0, '#6b4a2c'); lg.addColorStop(1, '#ffc27a'); x.fillStyle = lg; x.fillRect(150, 150, 70, 300);
    x.fillStyle = '#2d3454'; x.beginPath(); x.moveTo(60, 130); x.lineTo(150, 152); x.lineTo(150, 448); x.lineTo(60, 470); x.fill();
    x.fillStyle = '#c9a86a'; x.beginPath(); x.arc(136, 300, 5, 0, 7); x.fill();
    x.restore();
  },
  time(x, a) {
    x.save(); x.globalAlpha = a; x.fillStyle = 'rgba(255,255,255,.88)'; x.font = '600 58px "Roboto Flex", sans-serif'; x.fillText('20:58', 40, 84);
    x.fillStyle = 'rgba(255,230,190,.7)'; x.font = 'italic 21px Literata, serif'; x.fillText('she said nine', 44, 106); x.restore();
  },
  rain(x, a, t = 0) {
    x.save(); x.globalAlpha = a; const g = x.createLinearGradient(0, 30, 0, 220); g.addColorStop(0, '#22345a'); g.addColorStop(1, '#0b1224'); x.fillStyle = g; x.fillRect(530, 30, 200, 190);
    const lg = x.createRadialGradient(630, 80, 4, 630, 80, 90); lg.addColorStop(0, 'rgba(255,238,170,.95)'); lg.addColorStop(1, 'rgba(255,238,170,0)'); x.fillStyle = lg; x.fillRect(530, 30, 200, 190);
    x.save(); x.beginPath(); x.rect(530, 30, 200, 190); x.clip(); x.strokeStyle = 'rgba(190,210,255,.6)'; x.lineWidth = 1.6;
    for (let i = 0; i < 46; i++) { const px = 530 + (i * 37 + t * 40) % 200, py = 30 + (i * 53 + t * 340) % 190; x.beginPath(); x.moveTo(px, py); x.lineTo(px - 4, py + 18); x.stroke(); } x.restore();
    x.strokeStyle = '#0a0d18'; x.lineWidth = 8; x.strokeRect(530, 30, 200, 190); x.beginPath(); x.moveTo(630, 30); x.lineTo(630, 220); x.stroke(); x.restore();
  },
  stair(x, a) {
    x.save(); x.globalAlpha = a; for (let i = 0; i < 8; i++) { const y = 345 + i * 18, inset = (7 - i) * 18; const g = x.createLinearGradient(0, y, 0, y + 16); g.addColorStop(0, `rgba(${90 + i * 12},${84 + i * 10},${120 + i * 6},1)`); g.addColorStop(1, '#14121e'); x.fillStyle = g; x.fillRect(285 + inset, y, 440 - inset * 2, 16); x.fillStyle = 'rgba(255,240,200,.18)'; x.fillRect(285 + inset, y, 440 - inset * 2, 2); }
    x.restore();
  },
  gap(x, a) {
    x.save(); x.globalAlpha = a;
    const rg = x.createRadialGradient(400, 200, 10, 400, 200, 140); rg.addColorStop(0, 'rgba(255,214,160,.28)'); rg.addColorStop(1, 'rgba(255,214,160,0)'); x.fillStyle = rg; x.fillRect(280, 100, 240, 240);
    x.fillStyle = '#05050a'; x.beginPath(); x.arc(395, 178, 27, 0, 7); x.fill(); x.beginPath(); x.moveTo(345, 335); x.quadraticCurveTo(342, 232, 370, 214); x.lineTo(420, 214); x.quadraticCurveTo(450, 232, 447, 335); x.fill();
    x.strokeStyle = 'rgba(255,224,180,.55)'; x.lineWidth = 2; x.beginPath(); x.arc(395, 178, 27, Math.PI * 1.1, Math.PI * 1.9); x.stroke();
    x.fillStyle = 'rgba(255,255,255,.92)'; x.font = 'italic 40px Literata, serif'; x.fillText('sorry', 432, 168);
    x.restore();
  },
};

function cardCanvas(k) {
  const s = SLOT[k], c = document.createElement('canvas'); c.width = 300; c.height = 250; const x = c.getContext('2d');
  const sc = Math.min(300 / s.w, 250 / s.h);
  x.fillStyle = '#0b0a12'; x.fillRect(0, 0, 300, 250);
  x.save(); x.beginPath(); x.rect(0, 0, 300, 250); x.clip(); x.translate((300 - s.w * sc) / 2 - s.x * sc, (250 - s.h * sc) / 2 - s.y * sc); x.scale(sc, sc); PIECE[k](x, 1, 0); x.restore();
  return c;
}

export function build() {
  const scene = new THREE.Scene(); scene.background = new THREE.Color(0x07040a); scene.fog = new THREE.FogExp2(0x07040a, 0.045);
  scene.add(new THREE.AmbientLight(0x7a4a6a, 0.9));
  const floor = new THREE.Mesh(new THREE.PlaneGeometry(40, 40), new THREE.MeshStandardMaterial({ color: 0x120a16, roughness: 0.55, metalness: 0.4 })); floor.rotation.x = -Math.PI / 2; scene.add(floor);
  const l1 = new THREE.PointLight(0xff6a9a, 40, 20); l1.position.set(-4, 4, 0); scene.add(l1); const l2 = new THREE.PointLight(0xffc48a, 30, 20); l2.position.set(4, 4, 0); scene.add(l2);
  scene.add(at(dust(380, [16, 8, 16], 0xffb0c8, 0.04, 0.5), 0, 3, -2));

  /* the order: one canvas that fills up */
  const cv = document.createElement('canvas'); cv.width = W; cv.height = H; const cx = cv.getContext('2d');
  const tex = new THREE.CanvasTexture(cv); tex.colorSpace = THREE.SRGBColorSpace;
  const frame = new THREE.Group(); frame.position.copy(FRAME); scene.add(frame);
  frame.add(new THREE.Mesh(new THREE.PlaneGeometry(FW, FH), new THREE.MeshBasicMaterial({ map: tex })));
  frame.add(new THREE.LineSegments(new THREE.EdgesGeometry(new THREE.PlaneGeometry(FW + 0.1, FH + 0.1)), new THREE.LineBasicMaterial({ color: 0xffb0c8 })));
  const fg = glow(0xff6a9a, 8, 0.2); fg.position.z = -0.2; frame.add(fg);
  const F = { door: 0, time: 0, rain: 0, stair: 0, gap: 0, seam: 1, unify: 0, prompt: 0 };
  const keys = ['door', 'time', 'rain', 'stair', 'gap'];
  function paint(t = 0) {
    const g = cx.createLinearGradient(0, 0, 0, H); g.addColorStop(0, '#151221'); g.addColorStop(1, '#0a0910'); cx.fillStyle = g; cx.fillRect(0, 0, W, H);
    keys.forEach(k => { if (F[k] > 0.001) PIECE[k](cx, F[k], t); });
    keys.forEach(k => {
      const s = SLOT[k];
      if (F[k] < 0.5) { cx.save(); cx.strokeStyle = k === 'gap' ? `rgba(255,150,170,${0.5 + F.prompt * 0.4})` : 'rgba(255,255,255,.4)'; cx.setLineDash([9, 8]); cx.lineWidth = 2; cx.strokeRect(s.x, s.y, s.w, s.h); cx.restore();
        cx.fillStyle = k === 'gap' ? 'rgba(255,150,170,.95)' : 'rgba(255,255,255,.5)'; cx.font = k === 'gap' ? '600 22px "Roboto Flex", sans-serif' : '500 17px "Roboto Flex", sans-serif'; cx.textAlign = 'center';
        cx.fillText(k === 'gap' ? 'missing' : s.name.toLowerCase(), s.x + s.w / 2, s.y + s.h / 2 + (k === 'gap' ? -2 : 6));
        if (k === 'gap') { cx.font = '500 16px "Roboto Flex", sans-serif'; cx.fillStyle = 'rgba(255,255,255,.55)'; cx.fillText('nobody recorded this', s.x + s.w / 2, s.y + s.h / 2 + 22); }
        cx.textAlign = 'left'; }
      else if (F.seam > 0.01) { cx.strokeStyle = `rgba(255,255,255,${0.55 * F.seam})`; cx.lineWidth = 2; cx.strokeRect(s.x, s.y, s.w, s.h); }
    });
    if (F.unify > 0) { const u = cx.createRadialGradient(W / 2, H / 2, 40, W / 2, H / 2, 460); u.addColorStop(0, `rgba(255,190,130,${0.1 * F.unify})`); u.addColorStop(1, `rgba(20,10,30,${0.38 * F.unify})`); cx.fillStyle = u; cx.fillRect(0, 0, W, H); }
    tex.needsUpdate = true;
  }
  const slotPos = k => { const s = SLOT[k]; return new V(((s.x + s.w / 2) / W - 0.5) * FW + FRAME.x, (0.5 - (s.y + s.h / 2) / H) * FH + FRAME.y, FRAME.z + 0.05); };

  /* the four fragments for sale: two shelves of cards either side of the order (DOM, so they stay readable) */
  const fk = ['door', 'time', 'rain', 'stair'];
  let cards = [];
  function buildShelves() {
    const mk = cls => { const d = document.createElement('div'); d.className = 'shelf ' + cls; document.getElementById('ui').appendChild(d); return d; };
    const L = mk('l'), R = mk('r');
    cards = fk.map((k, i) => {
      const b = document.createElement('button'); b.className = 'frag'; const sl = SLOT[k];
      b.appendChild(cardCanvas(k)); b.insertAdjacentHTML('beforeend', `<b>${sl.name}</b><small>A real memory from ${sl.who}.<br>${sl.price} credits</small>`);
      (i < 2 ? L : R).appendChild(b);
      const c = { k, el: b, state: 'idle', i }; b.onclick = () => buy(c); return c;
    });
    return [L, R];
  }
  function buy(c) {
    if (phase !== 'buy' || c.state !== 'idle') return; c.state = 'flying'; A.blip(600, 0.4, 0.1, 'sine', 1.8);
    const s = SLOT[c.k]; E.showSub(`“${s.line}”`, 'human', 3400); spent += s.price;
    const r = c.el.getBoundingClientRect(), p = slotPos(c.k).clone().project(E.camera), tx = (p.x * 0.5 + 0.5) * innerWidth, ty = (-p.y * 0.5 + 0.5) * innerHeight;
    c.el.style.pointerEvents = 'none'; c.el.style.transition = 'transform .9s cubic-bezier(.5,0,.2,1), opacity .9s'; c.el.style.zIndex = 40;
    c.el.style.transform = `translate(${tx - (r.left + r.width / 2)}px,${ty - (r.top + r.height / 2)}px) scale(.35)`; c.el.style.opacity = 0;
    setTimeout(() => { E.tween(F, c.k, 1, 0.7); A.chime(500 + placed * 90, 0.08); placed++; if (placed < 4) tick('Step 1 of 2', `Buy the four real fragments. <b>${placed} of 4</b> placed. Spent ${spent} credits.`); }, 900);
  }

  let placed = 0, spent = 0, phase = 'intro', ticket = null, customer = null, gapLabel = null, shelves = [];
  const tick = (step, body) => { ticket.innerHTML = `<h4>ORDER 4471</h4><div class="ask">Ana, 42, asks: “I need the night my sister died. I was not there. I want to remember her last words.”</div><div class="stp"><small>${step}</small>${body}</div>`; };

  const world = {
    scene, dbg: { get cards() { return cards; }, frame, F },
    enter() {
      const asp = innerWidth / innerHeight, back = Math.max(0, (1.5 - asp) * 4);
      E.aim(new V(0, 2.0, 3.0 + back), new V(0, 3.1, -4.2), { par: 0.25, snap: true, fov: 52 + Math.min(12, back * 2) });
      shelves = buildShelves();
      A.ambient({ freqs: [61.7, 92.5, 123.5], type: 'sawtooth', cutoff: 520, gain: 0.12, lfo: 0.09, shimmer: 0.004 }); paint();
    },
    update(dt, t) {
      paint(t);
      if (customer) { customer.position.x += (customer.userData.tx - customer.position.x) * Math.min(1, dt * 0.8); if (customer.userData.sob) customer.rotation.z = Math.sin(t * 7) * 0.025; }
    },
    begin() {
      E.run(async T => {
        customer = human(1.75, ghostMat(0xffffff, 1.8, 0x101018)); customer.position.set(8, 0, -1.8); customer.userData.tx = 3.1; scene.add(customer); E.label(() => customer.position.clone().add(new V(0, 2.05, 0)), 'Ana, the customer', 'soft'); A.murmur(1.4, 0.05, 300);
        ticket = E.panel('', 'tt ticket'); tick('Step 1 of 2', 'Buy the four real fragments. <b>0 of 4</b> placed.');
        await T.say('A customer walks in and asks for a specific memory.', 3400, 'human');
        await T.say('“I need the night my sister died. I was not there. I want her last words. I will pay anything.”', 6200, 'human');
        await T.say('You cannot give her what never happened, but you can build it from other people’s memories.', 5000, 'human');
        await T.say('The pieces on the sides are real moments, sold by strangers. They will fit her story.', 4600, 'human');
        phase = 'buy'; E.hint(`${E.tapTxt} a fragment on either side to buy it and place it in her memory.`); shelves.forEach(d => d.classList.add('live'));
        await T.until(() => placed >= 4); phase = 'wait'; E.hint(''); shelves.forEach(d => d.classList.add('gone'));
        await T.wait(1500);
        E.tween(F, 'prompt', 1, 1);
        tick('Step 2 of 2', 'One piece does not exist. Nobody was there to record it. <b>Generate it.</b>');
        const gp = slotPos('gap').clone().project(E.camera);
        const gb = E.panel('<button class="btn pri" id="fill">Generate the missing piece</button>', 'cc');
        gb.style.left = ((gp.x * 0.5 + 0.5) * innerWidth) + 'px'; gb.style.top = ((-gp.y * 0.5 + 0.5) * innerHeight + 54) + 'px'; gb.style.background = 'none'; gb.style.border = '0'; gb.style.backdropFilter = 'none'; gb.style.padding = '0';
        let go = false; gb.querySelector('#fill').onclick = () => (go = true);
        await T.say('Her sister’s last words. Nobody heard them, so nobody sold them.', 4600, 'human');
        await T.until(() => go); gb.remove();
        tick('Generating', 'Building her sister from the other four fragments…');
        A.noise(2.4, 0.18, 600, 1.2, 6); A.blip(120, 2, 0.2, 'sawtooth', 2); E.glitchBurst(0.6, 600);
        for (let i = 0; i < 18; i++) { const p = glow(0xffffff, 0.22, 1); p.position.set(rand(-1.2, 1.2), 0.4 + rand(0, 2.2), 1.6); scene.add(p); const tgt = slotPos('gap').clone().add(new V(rand(-0.3, 0.3), rand(-0.5, 0.5), 0.15)); E.tween(p.position, 'x', tgt.x, 1.5); E.tween(p.position, 'y', tgt.y, 1.5); E.tween(p.position, 'z', tgt.z, 1.5).then(() => (p.visible = false)); }
        await T.wait(1700); E.tween(F, 'gap', 1, 2); E.tween(F, 'seam', 0, 4); E.tween(F, 'unify', 1, 4); A.chime(392, 0.12);
        await T.say('It is not real. It looks exactly like the others.', 4200, 'human');
        A.murmur(1.4, 0.05, 300);
        tick('Delivered', 'The customer is viewing her memory.');
        await T.wait(3600); customer.userData.sob = true;
        await T.say('“That is exactly how it happened.”', 4400, 'human');
        A.chime(784, 0.14); setTimeout(() => A.blip(1568, 0.2, 0.1, 'square'), 200);
        const stamp = textSprite('PROVENANCE: VERIFIED', { size: 0.34, color: '#7fffb0', opacity: 0.95 }); stamp.position.set(0, 4.35, -4.2); scene.add(stamp);
        await T.wait(1200); ticket.remove();
        E.panel(`<div class="rcpt"><h4 style="margin:0 0 6px;font-size:.78rem;color:var(--mut);font-weight:600">WHAT THE CUSTOMER BOUGHT</h4><table>
          <tr><td>The door</td><td class="real">real · stranger 4412</td></tr><tr><td>The time</td><td class="real">real · stranger 0931</td></tr><tr><td>The rain</td><td class="real">real · stranger 2207</td></tr><tr><td>The stairs</td><td class="real">real · stranger 7760</td></tr>
          <tr><td>Her sister’s goodbye</td><td class="fake">made up</td></tr></table>
          <div class="tot">Cost to you: ${spent} credits<br>Sold for: 4,800 credits<br>She believes: <b>100% real</b></div></div>`, 'mr');
        await T.wait(3600);
        await T.say('Four strangers each sold a moment of their lives. One goodbye never happened.', 5200, 'human');
        await T.say('She will keep it for the rest of her life.', 4000, 'human red');
        await E.end({ title: 'Broker', line: 'Nobody can see the seam.', stat: 'Real fragments: 4. Fake: 1. Certified: verified.' });
      });
    },
  };
  return world;
}
