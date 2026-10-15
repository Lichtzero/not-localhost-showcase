import * as THREE from 'three';

const glowCanvas = (() => { const c = document.createElement('canvas'); c.width = c.height = 128; const x = c.getContext('2d'); const g = x.createRadialGradient(64, 64, 0, 64, 64, 64); g.addColorStop(0, 'rgba(255,255,255,1)'); g.addColorStop(0.25, 'rgba(255,255,255,.55)'); g.addColorStop(1, 'rgba(255,255,255,0)'); x.fillStyle = g; x.fillRect(0, 0, 128, 128); return c; })();
export const glowTex = new THREE.CanvasTexture(glowCanvas);

export function glow(color = 0xffffff, size = 2, opacity = 1) {
  const m = new THREE.SpriteMaterial({ map: glowTex, color, transparent: true, opacity, blending: THREE.AdditiveBlending, depthWrite: false });
  const s = new THREE.Sprite(m); s.scale.setScalar(size); return s;
}

export function dust(n = 800, spread = [20, 10, 20], color = 0x88aaff, size = 0.06, opacity = 0.6) {
  const g = new THREE.BufferGeometry(), p = new Float32Array(n * 3);
  for (let i = 0; i < n; i++) { p[i * 3] = (Math.random() - 0.5) * spread[0]; p[i * 3 + 1] = (Math.random() - 0.5) * spread[1]; p[i * 3 + 2] = (Math.random() - 0.5) * spread[2]; }
  g.setAttribute('position', new THREE.BufferAttribute(p, 3));
  const m = new THREE.PointsMaterial({ color, size, map: glowTex, transparent: true, opacity, blending: THREE.AdditiveBlending, depthWrite: false, sizeAttenuation: true });
  const pts = new THREE.Points(g, m); pts.userData.spread = spread; return pts;
}
/* slow vertical drift for a dust cloud; call each frame */
export function driftDust(pts, dt, speed = 0.05) {
  const a = pts.geometry.attributes.position, s = pts.userData.spread;
  for (let i = 0; i < a.count; i++) { let y = a.getY(i) + dt * speed * (0.5 + ((i * 7) % 5) / 5); if (y > s[1] / 2) y -= s[1]; a.setY(i, y); }
  a.needsUpdate = true;
}

export function textSprite(txt, { size = 0.5, color = '#fff', font = '600 64px "Roboto Flex", sans-serif', italic = false, bg = null, opacity = 1, blend = true } = {}) {
  const c = document.createElement('canvas'), x = c.getContext('2d');
  const f = italic ? font.replace(/^(\d+ )?/, 'italic $1').replace('Roboto Flex', 'Literata') : font;
  x.font = f; const w = Math.ceil(x.measureText(txt).width) + 40, h = 110; c.width = w; c.height = h;
  x.font = f; x.textBaseline = 'middle'; x.textAlign = 'center';
  if (bg) { x.fillStyle = bg; x.fillRect(0, 0, w, h); }
  x.fillStyle = color; x.fillText(txt, w / 2, h / 2 + 4);
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace;
  const m = new THREE.SpriteMaterial({ map: t, transparent: true, opacity, depthWrite: false, blending: blend ? THREE.AdditiveBlending : THREE.NormalBlending });
  const s = new THREE.Sprite(m); s.scale.set((w / h) * size, size, 1); s.userData.base = (w / h) * size; return s;
}

/* Dark body with a coloured fresnel rim: reads as a person without modelling one. */
export function ghostMat(color = 0x66ddff, rim = 2.2, core = 0x04060a, alpha = 1) {
  return new THREE.ShaderMaterial({
    transparent: alpha < 1, uniforms: { uColor: { value: new THREE.Color(color) }, uCore: { value: new THREE.Color(core) }, uRim: { value: rim }, uAlpha: { value: alpha }, uPulse: { value: 0 } },
    vertexShader: 'varying vec3 vN; varying vec3 vV; void main(){ vec4 mv=modelViewMatrix*vec4(position,1.); vN=normalize(normalMatrix*normal); vV=normalize(-mv.xyz); gl_Position=projectionMatrix*mv; }',
    fragmentShader: 'uniform vec3 uColor,uCore; uniform float uRim,uAlpha,uPulse; varying vec3 vN; varying vec3 vV; void main(){ float f=pow(1.-max(dot(normalize(vN),normalize(vV)),0.),uRim); vec3 c=mix(uCore,uColor,f)+uColor*uPulse*.6; gl_FragColor=vec4(c,uAlpha); }',
  });
}

export function outlineMat(color = 0xffffff, power = 2.0, gain = 1.2) {
  return new THREE.ShaderMaterial({ transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, uniforms: { uColor: { value: new THREE.Color(color) }, uP: { value: power }, uG: { value: gain }, uA: { value: 1 } },
    vertexShader: 'varying vec3 vN; varying vec3 vV; void main(){ vec4 mv=modelViewMatrix*vec4(position,1.); vN=normalize(normalMatrix*normal); vV=normalize(-mv.xyz); gl_Position=projectionMatrix*mv; }',
    fragmentShader: 'uniform vec3 uColor; uniform float uP,uG,uA; varying vec3 vN; varying vec3 vV; void main(){ float f=pow(1.-max(dot(normalize(vN),normalize(vV)),0.),uP); gl_FragColor=vec4(uColor*f*uG*uA,f*uA); }' });
}
export function human(h = 1.7, mat = ghostMat(), seated = false) {
  const g = new THREE.Group(), r = h * 0.11;
  const body = new THREE.Mesh(new THREE.CapsuleGeometry(r * 1.25, h * (seated ? 0.28 : 0.5), 6, 12), mat); body.position.y = h * (seated ? 0.46 : 0.5);
  const head = new THREE.Mesh(new THREE.SphereGeometry(r * 0.95, 16, 12), mat); head.position.y = h * (seated ? 0.86 : 0.9);
  g.add(body, head); g.userData.head = head; g.userData.body = body; return g;
}

export function dog(mat = ghostMat(0xffc27a), s = 1) {
  const g = new THREE.Group();
  const body = new THREE.Mesh(new THREE.CapsuleGeometry(0.17 * s, 0.4 * s, 6, 10), mat); body.rotation.z = Math.PI / 2; body.position.y = 0.38 * s;
  const head = new THREE.Mesh(new THREE.SphereGeometry(0.14 * s, 14, 10), mat); head.position.set(0.38 * s, 0.55 * s, 0);
  const snout = new THREE.Mesh(new THREE.BoxGeometry(0.16 * s, 0.09 * s, 0.1 * s), mat); snout.position.set(0.52 * s, 0.5 * s, 0);
  const ear1 = new THREE.Mesh(new THREE.ConeGeometry(0.06 * s, 0.14 * s, 6), mat), ear2 = ear1.clone(); ear1.position.set(0.34 * s, 0.7 * s, 0.09 * s); ear2.position.set(0.34 * s, 0.7 * s, -0.09 * s);
  const tail = new THREE.Mesh(new THREE.CylinderGeometry(0.025 * s, 0.04 * s, 0.34 * s, 6), mat); tail.position.set(-0.34 * s, 0.55 * s, 0); tail.rotation.z = 0.8;
  g.add(body, head, snout, ear1, ear2, tail);
  [[0.22, 0.1], [0.22, -0.1], [-0.22, 0.1], [-0.22, -0.1]].forEach(([x, z]) => { const l = new THREE.Mesh(new THREE.CylinderGeometry(0.035 * s, 0.03 * s, 0.3 * s, 6), mat); l.position.set(x * s, 0.15 * s, z * s); g.add(l); });
  g.userData.tail = tail; g.userData.head = head; return g;
}

export function curveRibbon(points, color = 0xffb060, n = 90, size = 0.05, opacity = 0.9) {
  const c = new THREE.CatmullRomCurve3(points), pts = c.getPoints(n), g = new THREE.BufferGeometry(), p = new Float32Array(pts.length * 3);
  pts.forEach((v, i) => { p[i * 3] = v.x; p[i * 3 + 1] = v.y; p[i * 3 + 2] = v.z; });
  g.setAttribute('position', new THREE.BufferAttribute(p, 3));
  const m = new THREE.PointsMaterial({ color, size, map: glowTex, transparent: true, opacity, blending: THREE.AdditiveBlending, depthWrite: false });
  const o = new THREE.Points(g, m); o.userData.curve = c; return o;
}

export const ease = t => t * t * (3 - 2 * t);
export const lerp = (a, b, t) => a + (b - a) * t;
export const rand = (a, b) => a + Math.random() * (b - a);
export function disposeScene(scene) {
  scene.traverse(o => { if (o.geometry) o.geometry.dispose(); const ms = o.material ? (Array.isArray(o.material) ? o.material : [o.material]) : []; ms.forEach(m => { if (m.map && m.map !== glowTex) m.map.dispose(); m.dispose(); }); });
}
export { THREE };
export const at = (o, x, y, z) => { o.position.set(x, y, z); return o; };
