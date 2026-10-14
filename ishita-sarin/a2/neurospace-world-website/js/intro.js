import { THREE, glow, dust, driftDust } from './kit.js';
import { E } from './engine.js';
import { A } from './audio.js';

const FS = `uniform float uTime,uPupil,uOpen,uScan; varying vec2 vUv;
float h(vec2 p){ return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453); }
float n(vec2 p){ vec2 i=floor(p),f=fract(p); f=f*f*(3.-2.*f); return mix(mix(h(i),h(i+vec2(1,0)),f.x),mix(h(i+vec2(0,1)),h(i+vec2(1,1)),f.x),f.y); }
void main(){
  vec2 p=vUv-.5; float r=length(p)*2.; float a=atan(p.y,p.x);
  float fib=n(vec2(a*9.,r*3.))*.55+n(vec2(a*38.,r*7.+uTime*.08))*.45;
  float iris=smoothstep(1.,.97,r), pupil=smoothstep(uPupil+.04,uPupil,r);
  vec3 col=mix(vec3(.01,.06,.12),vec3(.25,.75,1.),fib)*(.3+fib*.9);
  col*=mix(1.,.15,smoothstep(.78,1.,r));
  col*=smoothstep(uPupil,uPupil+.25,r)*.8+.2;
  col=mix(col,vec3(0.),pupil);
  float s=smoothstep(.025,0.,abs(r-uScan)); col+=vec3(.5,1.,1.)*s*.9;
  float ring=smoothstep(.01,0.,abs(r-1.03))*.6; col+=vec3(.3,.8,1.)*ring;
  gl_FragColor=vec4(col*uOpen,max(iris,ring)*uOpen);
}`;

export function createIntro() {
  const scene = new THREE.Scene(); scene.background = new THREE.Color(0x000000);
  const iris = new THREE.Mesh(new THREE.PlaneGeometry(7, 7), new THREE.ShaderMaterial({ transparent: true, depthWrite: false, uniforms: { uTime: { value: 0 }, uPupil: { value: 0.28 }, uOpen: { value: 0 }, uScan: { value: -1 } }, vertexShader: 'varying vec2 vUv; void main(){ vUv=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.); }', fragmentShader: FS }));
  scene.add(iris);
  const d = dust(900, [24, 14, 24], 0x7fe3ff, 0.05, 0.5); scene.add(d);
  const u = iris.material.uniforms;
  return {
    scene, iris, u,
    enter() { E.aim(new THREE.Vector3(0, 0, 9), new THREE.Vector3(0, 0, 0), { par: 0.35, snap: true, fov: 50 }); },
    update(dt, t) { u.uTime.value = t; driftDust(d, dt, 0.08); d.rotation.y += dt * 0.02; },
  };
}
