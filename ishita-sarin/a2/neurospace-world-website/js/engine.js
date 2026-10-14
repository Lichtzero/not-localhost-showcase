/* Small engine: renderer, post-processing, camera rig, input, subtitles, labels, timeline helpers. */
import * as THREE from 'three';
import { EffectComposer } from '../vendor/addons/EffectComposer.js';
import { RenderPass } from '../vendor/addons/RenderPass.js';
import { UnrealBloomPass } from '../vendor/addons/UnrealBloomPass.js';
import { ShaderPass } from '../vendor/addons/ShaderPass.js';
import { OutputPass } from '../vendor/addons/OutputPass.js';
import { disposeScene } from './kit.js';

const $ = s => document.querySelector(s);
const V3 = THREE.Vector3;
const CANCEL = Symbol('cancel');
export const E = { THREE, t: 0, world: null, ptr: { x: 0, y: 0, px: 0, py: 0, down: false }, hold: false, noRender: false };
const QS = new URLSearchParams(location.search);

/* ------------------------------------------------------------------ renderer + post */
const host = $('#stage');
const renderer = new THREE.WebGLRenderer({ antialias: false, powerPreference: 'high-performance', alpha: false });
renderer.setPixelRatio(Math.min(devicePixelRatio || 1, QS.has('hq') ? 1 : 1.5));
renderer.setSize(innerWidth, innerHeight);
renderer.toneMapping = THREE.ACESFilmicToneMapping; renderer.toneMappingExposure = 1.0;
renderer.setClearColor(0x000000, 1);
host.appendChild(renderer.domElement);
export const camera = new THREE.PerspectiveCamera(60, innerWidth / innerHeight, 0.05, 300);
E.renderer = renderer; E.camera = camera;

const FilmShader = {
  uniforms: { tDiffuse: { value: null }, uTime: { value: 0 }, uGlitch: { value: 0 }, uFade: { value: 1 }, uWhite: { value: 0 }, uVig: { value: 0.85 }, uAb: { value: 0.0015 }, uGrain: { value: 0.028 }, uTint: { value: new THREE.Color(1, 1, 1) }, uTintAmt: { value: 0 }, uRed: { value: 0 }, uBlur: { value: 0 } },
  vertexShader: 'varying vec2 vUv; void main(){ vUv=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.); }',
  fragmentShader: `
    uniform sampler2D tDiffuse; uniform float uTime,uGlitch,uFade,uWhite,uVig,uAb,uGrain,uTintAmt,uRed,uBlur; uniform vec3 uTint; varying vec2 vUv;
    float h(float n){ return fract(sin(n*12.9898)*43758.5453); }
    void main(){
      vec2 uv=vUv; float g=uGlitch;
      float band=floor(uv.y*28.+floor(uTime*14.)*3.);
      float on=step(.8,h(band+floor(uTime*10.)))*g;
      uv.x+=on*(h(band)-.5)*.14;
      vec2 d=uv-.5; float ab=uAb+g*.014+uRed*.004;
      vec3 c;
      c.r=texture2D(tDiffuse,uv+d*ab).r; c.g=texture2D(tDiffuse,uv).g; c.b=texture2D(tDiffuse,uv-d*ab).b;
      if(uBlur>0.){ vec3 s=vec3(0.); for(int i=0;i<6;i++){ float a=float(i)*1.047; s+=texture2D(tDiffuse,uv+vec2(cos(a),sin(a))*uBlur*.01).rgb; } c=mix(c,s/6.,.6); }
      float l=dot(c,vec3(.299,.587,.114));
      c=mix(c,vec3(l)*uTint*1.7,uTintAmt);
      c=mix(c,vec3(l*1.5,l*.15,l*.1)+c*vec3(.7,.2,.2),uRed*.55);
      float v=smoothstep(.95,.25,length(d)*(1.+uVig*.9)); c*=mix(1.,v,uVig);
      c+=(h(uv.x*913.+uv.y*771.+uTime)-.5)*uGrain;
      c*=uFade; c=mix(c,vec3(1.),uWhite);
      gl_FragColor=vec4(c,1.);
    }`,
};
const composer = new EffectComposer(renderer);
const renderPass = new RenderPass(new THREE.Scene(), camera);
const bloom = new UnrealBloomPass(new THREE.Vector2(innerWidth, innerHeight), 0.7, 0.6, 0.2);
const film = new ShaderPass(FilmShader);
composer.addPass(renderPass); composer.addPass(bloom); composer.addPass(film); composer.addPass(new OutputPass());
E.post = film.uniforms; E.bloom = bloom; E.composer = composer;
E.post.uFade.value = 0;

addEventListener('resize', () => {
  renderer.setSize(innerWidth, innerHeight); composer.setSize(innerWidth, innerHeight);
  camera.aspect = innerWidth / innerHeight; camera.updateProjectionMatrix();
});

/* ------------------------------------------------------------------ camera rig */
const rig = { pos: new V3(0, 1.6, 4), look: new V3(0, 1.5, 0), par: 0.25, damp: 3, fov: 60, shake: 0, manual: false };
const cur = { pos: new V3(0, 1.6, 4), look: new V3(0, 1.5, 0) };
E.rig = rig; E.cur = cur;
E.aim = (pos, look, o = {}) => {
  rig.par = o.par ?? 0.25; rig.damp = o.damp ?? 3; rig.fov = o.fov ?? 60; rig.manual = false;
  rig.pos.copy(pos); rig.look.copy(look);
  if (o.snap) { cur.pos.copy(pos); cur.look.copy(look); }
};
const _f = new V3(), _r = new V3(), _u = new V3(0, 1, 0), _l = new V3();
function updateCamera(dt) {
  if (rig.manual) return;
  const k = 1 - Math.exp(-rig.damp * dt);
  cur.pos.lerp(rig.pos, k); cur.look.lerp(rig.look, k);
  _f.copy(cur.look).sub(cur.pos).normalize(); _r.crossVectors(_f, _u).normalize();
  camera.position.copy(cur.pos).addScaledVector(_r, E.ptr.x * rig.par).addScaledVector(_u, E.ptr.y * rig.par * 0.6);
  camera.position.y += Math.sin(E.t * 0.7) * 0.012;
  if (rig.shake > 0) camera.position.add(_l.set((Math.random() - 0.5) * rig.shake, (Math.random() - 0.5) * rig.shake, (Math.random() - 0.5) * rig.shake));
  _l.copy(cur.look).addScaledVector(_r, E.ptr.x * rig.par * 0.5).addScaledVector(_u, E.ptr.y * rig.par * 0.3);
  camera.lookAt(_l);
  if (Math.abs(camera.fov - rig.fov) > 0.05) { camera.fov += (rig.fov - camera.fov) * Math.min(1, dt * 3); camera.updateProjectionMatrix(); }
}

/* ------------------------------------------------------------------ tweens */
const tweens = [];
const ease = t => t * t * (3 - 2 * t);
E.tween = (obj, key, to, sec = 1, fn = ease) => new Promise(res => {
  const from = obj[key]; tweens.push({ obj, key, from, to, sec, t: 0, fn, res });
});
E.fade = (to, sec = 1) => E.tween(E.post.uFade, 'value', to, sec);
E.white = (to, sec = 1) => E.tween(E.post.uWhite, 'value', to, sec);
E.set = (k, v, sec = 0.6) => sec ? E.tween(E.post[k], 'value', v, sec) : (E.post[k].value = v);
E.tint = (hex, amt, sec = 1) => { E.post.uTint.value.set(hex); return E.tween(E.post.uTintAmt, 'value', amt, sec); };
E.glitchBurst = (amt = 1, ms = 350) => { E.post.uGlitch.value = amt; setTimeout(() => (E.post.uGlitch.value = 0), ms); };
function stepTweens(dt) {
  for (let i = tweens.length - 1; i >= 0; i--) {
    const w = tweens[i]; w.t += dt; const p = Math.min(1, w.t / w.sec);
    w.obj[w.key] = w.from + (w.to - w.from) * w.fn(p);
    if (p >= 1) { tweens.splice(i, 1); w.res(); }
  }
}

/* ------------------------------------------------------------------ input */
const stage = renderer.domElement;
const ndc = (e) => { E.ptr.type = e.pointerType; E.ptr.px = e.clientX; E.ptr.py = e.clientY; E.ptr.x = (e.clientX / innerWidth) * 2 - 1; E.ptr.y = -((e.clientY / innerHeight) * 2 - 1); };
addEventListener('pointermove', e => { ndc(e); E.world?.move?.(e); });
stage.addEventListener('pointerdown', e => { ndc(e); E.ptr.down = true; E.hold = true; stage.setPointerCapture?.(e.pointerId); E.world?.down?.(e); });
addEventListener('pointerup', e => { E.ptr.down = false; E.hold = false; E.world?.up?.(e); });
stage.addEventListener('click', e => { ndc(e); E.world?.click?.(e); });
addEventListener('keydown', e => { if (e.code === 'Space' && !e.repeat && !/BUTTON|INPUT/.test(document.activeElement?.tagName || '')) { e.preventDefault(); E.hold = true; E.world?.down?.(e); } });
addEventListener('keyup', e => { if (e.code === 'Space') { E.hold = false; E.world?.up?.(e); } });
const ray = new THREE.Raycaster(); E.ray = ray;
const _v2 = new THREE.Vector2();
E.pick = (objs, rec = true) => { ray.setFromCamera(_v2.set(E.ptr.x, E.ptr.y), camera); return ray.intersectObjects(objs, rec)[0] || null; };
E.cursor = c => { stage.style.cursor = c; };

/* ------------------------------------------------------------------ subtitles and labels */
const subEl = $('#sub'); let subT;
E.lines = []; E.hp = null;
const paintSub = (text, cls, ms) => { clearTimeout(subT); subEl.className = 'sub ' + cls; subEl.textContent = text; void subEl.offsetWidth; subEl.classList.add('on'); if (ms) subT = setTimeout(() => subEl.classList.remove('on'), ms); };
E.showSub = (text, cls = '', ms = 2600) => {
  if (text) { E.lines.push({ text, cls }); if (E.lines.length > 80) E.lines.shift(); E.hp = null; }
  paintSub(text, cls, ms);
};
/* move through the story: dir<0 re-reads the previous line, dir>0 goes forward or skips the wait */
E.nav = dir => {
  if (E.navHook) return E.navHook(dir);
  const L = E.lines;
  if (dir < 0) { const b = E.hp ?? L.length - 1; if (b <= 0) return; E.hp = b - 1; paintSub(L[E.hp].text, L[E.hp].cls.replace('mid', '').replace('big', ''), 0); }
  else if (E.hp != null && E.hp < L.length - 1) { E.hp++; const l = L[E.hp]; paintSub(l.text, l.cls.replace('mid', '').replace('big', ''), E.hp === L.length - 1 ? 3000 : 0); if (E.hp === L.length - 1) E.hp = null; }
  else if (E._skip) E._skip();
};
E.hideSub = () => { clearTimeout(subT); subEl.classList.remove('on'); };
const labels = [];
E.label = (getPos, html, cls = '') => {
  const el = document.createElement('div'); el.className = 'tag ' + cls; el.innerHTML = html; $('#labels').appendChild(el);
  const o = { el, getPos, alpha: 1, set(h) { el.innerHTML = h; }, remove() { el.remove(); const i = labels.indexOf(o); if (i >= 0) labels.splice(i, 1); } };
  labels.push(o); return o;
};
E.clearLabels = () => { [...labels].forEach(l => l.remove()); };
const _p = new V3();
function updateLabels() {
  for (const l of labels) {
    const p = typeof l.getPos === 'function' ? l.getPos() : l.getPos; _p.copy(p).project(camera);
    if (_p.z > 1 || _p.z < -1) { l.el.style.opacity = 0; continue; }
    l.el.style.opacity = l.alpha; l.el.style.transform = `translate(${((_p.x * 0.5 + 0.5) * innerWidth).toFixed(1)}px,${((-_p.y * 0.5 + 0.5) * innerHeight).toFixed(1)}px) translate(-50%,-50%)`;
  }
}

/* ------------------------------------------------------------------ timeline helper (cancellable async scripts) */
let token = 0;
E.cancel = () => { token++; };
E.run = fn => {
  const id = token, alive = () => id === token;
  const T = {
    alive,
    wait: ms => new Promise((res, rej) => setTimeout(() => (alive() ? res() : rej(CANCEL)), ms)),
    say(text, ms = 2600, cls = '') {
      if (!alive()) return Promise.reject(CANCEL); E.showSub(text, cls, ms);
      return new Promise((res, rej) => { let done = false; const fin = () => { if (done) return; done = true; clearTimeout(id); if (E._skip === fin) E._skip = null; alive() ? res() : rej(CANCEL); }; const id = setTimeout(fin, ms + 300); E._skip = fin; });
    },
    until: (fn2, poll = 50) => new Promise((res, rej) => { const iv = setInterval(() => { if (!alive()) { clearInterval(iv); rej(CANCEL); } else if (fn2()) { clearInterval(iv); res(); } }, poll); }),
  };
  fn(T).catch(e => { if (e !== CANCEL) console.error(e); });
  return T;
};

/* ------------------------------------------------------------------ worlds */
E.setWorld = w => {
  E.cancel(); E.lines.length = 0; E.hp = null; E._skip = null; E.hideSub(); E.heartbeatOff?.(); document.getElementById('ui').textContent=''; document.getElementById('hint').classList.remove('on'); document.getElementById('title').classList.remove('on');
  const old = E.world; E.world = null;
  if (old) { old.dispose?.(); disposeScene(old.scene); }
  renderPass.scene = w.scene; E.world = w; E.post.uRed.value = 0; E.post.uVig.value = 0.85; bloom.strength = 0.7; bloom.threshold = 0.2; E.post.uTintAmt.value = 0; E.post.uBlur.value = 0; E.post.uGlitch.value = 0; rig.shake = 0;
  window.__world = w; w.enter?.();
};

/* ------------------------------------------------------------------ loop + adaptive quality */
let last = performance.now(), frames = 0, acc = 0, judged = false;
function frame(now) {
  requestAnimationFrame(frame);
  const dt = Math.min(QS.has('dt') ? +QS.get('dt') : 0.05, (now - last) / 1000); last = now; E.t += dt;
  stepTweens(dt);
  E.post.uTime.value = E.t;
  if (E.world) { E.world.update?.(dt, E.t); updateCamera(dt); updateLabels(); }
  if (E.noRender) return;
  composer.render(dt);
  if (!judged && E.world && !QS.has('hq')) {
    frames++; acc += (now - (E._f0 ?? now)); E._f0 = now;
    if (frames === 120) { judged = true; if (acc / frames > 36) { bloom.enabled = false; renderer.setPixelRatio(1); renderer.setSize(innerWidth, innerHeight); composer.setSize(innerWidth, innerHeight); E.lowQuality = true; } }
  }
}
E.start = () => requestAnimationFrame(frame);
E.CANCEL = CANCEL;
