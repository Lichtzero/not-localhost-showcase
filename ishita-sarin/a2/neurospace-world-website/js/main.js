import { E } from './engine.js';
import { A } from './audio.js';
import { ROLES } from './roles.js';
import { createExplain, startDeck } from './explain.js';
import { createBackdrop, buildCards } from './hub.js';

const $ = s => document.querySelector(s);
const KEY = 'neurospace-world-v2';
let S = { visited: [], seenIntro: false };
try { Object.assign(S, JSON.parse(sessionStorage.getItem(KEY) || '{}')); } catch (e) {}
const save = () => { try { sessionStorage.setItem(KEY, JSON.stringify(S)); } catch (e) {} };
const QS = new URLSearchParams(location.search);
const hex = n => '#' + n.toString(16).padStart(6, '0');
const wait = ms => new Promise(r => setTimeout(r, ms));

/* WebGL guard */
try { const c = document.createElement('canvas'); if (!(c.getContext('webgl2') || c.getContext('webgl'))) throw 0; } catch (e) { $('#noGL').style.display = 'grid'; $('#start').style.display = 'none'; throw new Error('no webgl'); }

/* ------------------------------------------------------------------ shared UI helpers exposed on E */
const coarse = matchMedia('(pointer: coarse)').matches;
E.tapTxt = coarse ? 'Tap' : 'Click'; E.holdTxt = coarse ? 'Press and hold' : 'Hold the mouse or Space';
E.heartbeatOff = () => A.heartbeat(false);
E.hint = t => { const h = $('#hint'); if (t) { h.textContent = t; h.classList.add('on'); } else h.classList.remove('on'); };
E.panel = (html, cls = 'br') => { const el = document.createElement('div'); el.className = 'panel ' + cls; el.innerHTML = html; $('#ui').appendChild(el); return el; };
E.title = async (kicker, title, line, ms = 2600) => { const t = $('#title'); t.innerHTML = `<small>${kicker}</small><h2>${title}</h2>${line ? `<p>${line}</p>` : ''}`; t.classList.add('on'); await wait(ms); t.classList.remove('on'); };
const fmt = s => s.replace(/\{(tap|hold)\}/g, (m, k, off) => { const t = k === 'tap' ? E.tapTxt : E.holdTxt; const prev = s.slice(0, off).trim(); return (!prev || /[.!?]$/.test(prev)) ? t : t.charAt(0).toLowerCase() + t.slice(1); });
E.fmt = fmt;
function updateCount() {
  $('#cnum').textContent = `${S.visited.length} / 9`;
  $('#dots').innerHTML = ROLES.map(r => `<i class="${S.visited.includes(r.id) ? 'on' : ''}"></i>`).join('');
}
updateCount();
document.querySelectorAll('[data-name]').forEach(e => (e.textContent = window.NAME || 'Ishita Sarin'));

/* the small caption used by the explainer */
const capEl = $('#cap'); let capT;
const ui = {
  cap(word, text) { clearTimeout(capT); capEl.classList.remove('on'); capT = setTimeout(() => { capEl.innerHTML = `<h3>${word}</h3><p>${text}</p>`; capEl.classList.add('on'); }, 350); },
  capOff() { clearTimeout(capT); capEl.classList.remove('on'); },
};

/* ------------------------------------------------------------------ chrome state */
function chrome({ count = true, skip = false, back = false, finish = false, replay = false, nav = false } = {}) {
  $('#bIntro').hidden = !replay; $('#nav').hidden = !nav; if (nav && !E.navHook) $('#nTxt').textContent = 'story';
  $('#hud').classList.add('on');
  $('#count').style.opacity = count ? 1 : 0;
  $('#bSkip').hidden = !skip; $('#bBack').hidden = !back; $('#bFinish').hidden = !finish;
}

/* ------------------------------------------------------------------ end card of each life */
let inWorld = null;
E.end = ({ title, line, stat }) => new Promise(res => {
  const r = ROLES.find(x => x.id === inWorld);
  if (inWorld && !S.visited.includes(inWorld)) { S.visited.push(inWorld); save(); updateCount(); }
  const left = 9 - S.visited.length;
  const e = $('#end');
  e.querySelector('.in').innerHTML = `<small>Life lived</small><h2>${title}</h2><p>${line}</p><div class="stat">${stat}</div>${r ? `<div class="mean"><b>What this shows</b>${r.meaning}</div>` : ''}
    <div class="row"><button class="btn pri" id="bRet">${left === 0 ? 'See the end' : 'Choose another life'}</button>${left > 0 ? '<button class="btn" id="bEndNow">Skip to the end</button>' : ''}</div>
    <p class="note">${left === 0 ? 'You have lived all nine.' : `${S.visited.length} of 9 visited. You can stop whenever you like.`}</p>`;
  e.classList.remove('off'); A.chime(520, 0.1);
  $('#bRet').focus(); $('#bRet').onclick = () => { e.classList.add('off'); res(); if (left === 0) finale(); else backToHub(); };
  if ($('#bEndNow')) $('#bEndNow').onclick = () => { e.classList.add('off'); res(); finale(); };
});

/* ------------------------------------------------------------------ the archive */
let bd = null;
async function showHub(first = false) {
  inWorld = null; chrome({ finish: true, replay: true });
  E.clearLabels(); bd = createBackdrop(); E.setWorld(bd);
  A.ambient({ freqs: [65.4, 98, 130.8], cutoff: 400, gain: 0.15, lfo: 0.06, shimmer: 0.005 });
  E.post.uVig.value = 0.6; E.bloom.strength = 0.5;
  buildCards({ visited: S.visited, onPick: pick });
  E.post.uFade.value = 1; E.white(0, first ? 1.4 : 0.9);
  $('#hub').scrollTop = 0; $('#hub').classList.remove('off');
  updateCount();
}
async function pick(i) {
  const r = ROLES[i]; A.blip(520, 0.5, 0.12, 'sine', 2); A.whoosh();
  $('#hub').classList.add('off'); chrome({ back: true, nav: true });
  await E.white(1, 0.7);
  await enterWorld(r);
}
async function enterWorld(r) {
  inWorld = r.id; E.navHook = null; chrome({ back: true, nav: true });
  E.hideSub(); E.clearLabels();
  const mod = await import(`./worlds/${r.id}.js`);
  const w = mod.build();
  E.setWorld(w);
  E.post.uFade.value = 1; E.post.uWhite.value = 1;
  E.white(0, 1.2);
  const go = await showBrief(r);
  if (inWorld !== r.id) return;
  if (!go) return backToHub();
  w.begin?.();
}
function showBrief(r) {
  return new Promise(res => {
    const el = $('#brief'); el.style.setProperty('--c', hex(r.color));
    el.querySelector('.brief-in').innerHTML = `<p class="k">${r.plan}</p><h2>${r.name}</h2>
      <div class="row"><span class="lab">You are</span><span class="txt">${r.who}</span></div>
      <div class="row"><span class="lab">What is happening</span><span class="txt">${r.world}</span></div>
      <div class="row"><span class="lab">Your task</span><span class="txt task">${r.task}</span></div>
      <p class="ctl"><b>Controls:</b> ${fmt(r.controls)}</p>
      <div class="acts"><button class="btn pri" id="bGo">Begin</button><button class="btn" id="bNo">Choose another life</button></div>`;
    el.classList.remove('off'); $('#bGo').focus();
    const close = v => { el.classList.add('off'); res(v); };
    $('#bGo').onclick = () => { A.chime(440, 0.08); close(true); };
    $('#bNo').onclick = () => close(false);
  });
}
async function backToHub() {
  A.heartbeat(false); $('#end').classList.add('off'); $('#brief').classList.add('off');
  await E.white(1, 0.6);
  await showHub();
}
$('#bBack').onclick = () => { $('#end').classList.add('off'); backToHub(); };
$('#bFinish').onclick = () => finale();

/* ------------------------------------------------------------------ finale: every life collapses into one record */
async function finale() {
  A.heartbeat(false); inWorld = null; chrome({ count: true });
  $('#hub').classList.add('off'); $('#brief').classList.add('off');
  if (!bd || E.world !== bd) { E.clearLabels(); bd = createBackdrop(); E.setWorld(bd); E.post.uFade.value = 1; E.white(0, 0.8); }
  const n = S.visited.length;
  E.run(async T => {
    await bd.finale(T);
    if (n === 0) { await T.say('You chose not to look.', 2800, 'big mid'); await T.say('That is in the record too.', 3200, 'human red'); }
    else {
      await T.say(n === 9 ? 'All nine.' : `${n} of nine.`, 2400, 'big mid');
      await T.say('Recorded. Shared. Edited. Kept.', 3200, 'human');
      await T.say('None of it needed a villain. Only convenience.', 3600, 'human');
      await T.say('You were here. That is in the record now.', 3600, 'human red');
    }
    const e = $('#end');
    e.querySelector('.in').innerHTML = `<small>2081</small><h2>The record</h2><p>It will remember you were here.</p><div class="stat">${n} of 9 lives visited</div><div class="proto"><b>Try the things I built for this world</b><div class="pl"><a class="pcard" href="apps/memory-book.html" target="_blank" rel="noopener"><span>Memory Book</span><small>Find a memory by touch, search, smell or description, and see what keeping it costs.</small></a><a class="pcard" href="apps/compression.html" target="_blank" rel="noopener"><span>Memory Capsule</span><small>Keep part of a memory sharp while the rest of it fades. The compression tool.</small></a></div></div><div class="row"><button class="btn pri" id="bAb2">Behind the world</button><button class="btn" id="bAgain">${n < 9 ? 'Back to the archive' : 'Live them again'}</button><button class="btn" id="bRe">Replay intro</button><button class="btn" id="bDel">Delete this session</button></div><p id="delMsg" class="note red"></p>`;
    e.classList.remove('off');
    $('#bDel').onclick = () => { A.glitch(); E.glitchBurst(1, 700); E.post.uRed.value = 0.7; $('#delMsg').textContent = 'Flagged for review. Not deleted.'; $('#bDel').disabled = true; A.hit(48); setTimeout(() => (E.post.uRed.value = 0), 1500); };
    $('#bAb2').onclick = openAbout; $('#bRe').onclick = () => { e.classList.add('off'); intro(); };
    $('#bAgain').onclick = () => { if (n === 9) { S.visited = []; save(); updateCount(); } e.classList.add('off'); showHub(); };
  });
}

/* ------------------------------------------------------------------ intro: what is this world? */
async function intro() {
  E.clearLabels(); const w = createExplain(); E.setWorld(w);
  E.post.uFade.value = 0; E.post.uWhite.value = 0; E.post.uVig.value = 0.7;
  chrome({ count: false, skip: true, nav: true }); E.fade(1, 1.6);
  let done = false, deck = null;
  const leave = async () => { if (done) return; done = true; deck?.stop(); E.navHook = null; ui.capOff(); $('#bSkip').hidden = true; S.seenIntro = true; save(); A.whoosh(); await E.white(1, 0.7); await showHub(true); };
  $('#bSkip').onclick = leave;
  deck = startDeck(w, ui, leave);
  E.hint(E.tapTxt + ' anywhere, or use the arrows, to move on. The story also plays by itself.'); setTimeout(() => E.hint(''), 7000);
}
$('#bIntro').onclick = () => { $('#hub').classList.add('off'); $('#end').classList.add('off'); intro(); };

/* ------------------------------------------------------------------ chrome buttons */
$('#bMute').onclick = e => { const m = !A.muted; A.mute(m); e.currentTarget.textContent = m ? 'Sound off' : 'Sound on'; e.currentTarget.setAttribute('aria-pressed', String(m)); };
function openAbout() {
  const a = $('#about'); a.querySelector('.in').innerHTML = `
    <button class="btn x" id="aX">Close</button>
    <h2>Behind the world</h2>
    <p>NeuroSpace is a speculative world set around 2081. A neural implant records everything you consciously live, and those memories can be shared, bought, edited and stored forever by a company called mémoire. In this world the fear is not forgetting. It is remembering too much, and not being sure whose memory you are holding.</p>
    <p>Nine people, nine ways it goes wrong: a teacher, an archive operator, a patient, a relapser, an animal companion, a child, a broker, an inheritor and a dog.</p>
    <h3>The things I built to test it</h3>
    <div class="cols">
      <div><img src="assets/img/odeur.webp" alt="Odeur, annotated photo" loading="lazy"><p><b>Odeur.</b> Releases a scent to retrieve a memory, gated by the owner's iris. It could not scale: every memory needs a cartridge.</p></div>
      <div><img src="assets/img/cinq-sens.webp" alt="Cinq Sens, annotated photo" loading="lazy"><p><b>Cinq Sens.</b> Five senses, iris-gated, with a regulator dial that limits how much of the costly senses a retrieval can spend.</p></div>
    </div>
    <h3>Working prototypes</h3>
    <p><a href="apps/memory-book.html" target="_blank" rel="noopener">Memory Book</a> finds a memory by touch, search, smell or description and shows what keeping it costs. <a href="apps/compression.html" target="_blank" rel="noopener">Compression tool</a> lets you keep part of a video sharp while the rest decays.</p>
    <h3>What failed</h3>
    <p>I tried SAM 2 and SAM 3 to cut out exactly what you choose to keep. They need a strong GPU, so the demos fall back to MediaPipe and COCO-SSD in the browser. The next step is a SAM 3D version of this world.</p>
    <p style="margin-top:28px;color:#a99a88">A design fiction by <span data-name>${window.NAME || 'Ishita Sarin'}</span> for <em>Rehearsing the Future</em>. mémoire is not a real company.</p>`;
  a.classList.remove('off'); $('#aX').onclick = () => a.classList.add('off'); $('#aX').focus();
}
$('#bAbout').onclick = openAbout;
$('#nPrev').onclick = () => E.nav(-1); $('#nNext').onclick = () => E.nav(1);
document.addEventListener('keydown', e => { if (e.key === 'ArrowRight') E.nav(1); else if (e.key === 'ArrowLeft') E.nav(-1); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') $('#about').classList.add('off'); });

/* ------------------------------------------------------------------ start */
async function begin(skipIntro) {
  A.init(); $('#start').classList.add('off'); E.start();
  if (QS.get('world')) { const r = ROLES.find(x => x.id === QS.get('world')); E.post.uFade.value = 1; chrome({ back: true, nav: true }); await enterWorld(r); return; }
  if (QS.has('hub') || skipIntro || (S.seenIntro && S.visited.length)) { E.post.uFade.value = 1; E.post.uWhite.value = 1; S.seenIntro = true; save(); await showHub(true); }
  else intro();
}
$('#bEnter').onclick = () => begin(false);
$('#bEnterSkip').onclick = () => begin(true);
if (QS.has('auto')) setTimeout(() => (QS.has('hub') ? $('#bEnter') : $('#bEnter')).click(), 100);
window.__E = E; window.__S = S; window.__go = { pick, finale, showHub, intro };
