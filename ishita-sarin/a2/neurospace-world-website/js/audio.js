/* Procedural sound. No audio files: everything is synthesised with WebAudio. */
let ctx, master, comp, noiseBuf, amb = null, beatT = null, muted = false, tensionNode = null;

export const A = {
  get ready() { return !!ctx; },
  init() {
    if (ctx) { ctx.resume(); return; }
    const AC = window.AudioContext || window.webkitAudioContext; if (!AC) return;
    ctx = new AC();
    master = ctx.createGain(); master.gain.value = muted ? 0 : 0.7;
    comp = ctx.createDynamicsCompressor(); comp.threshold.value = -18; comp.ratio.value = 6;
    master.connect(comp); comp.connect(ctx.destination);
    noiseBuf = ctx.createBuffer(1, ctx.sampleRate * 2, ctx.sampleRate);
    const d = noiseBuf.getChannelData(0); for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
  },
  mute(m) { muted = m; if (master) master.gain.setTargetAtTime(m ? 0 : 0.7, ctx.currentTime, 0.1); },
  get muted() { return muted; },

  /* Ambient bed: cross-fades to a new drone. freqs in Hz. */
  ambient({ freqs = [55, 82.4], type = 'sawtooth', cutoff = 400, gain = 0.16, lfo = 0.08, shimmer = 0 } = {}) {
    if (!ctx) return;
    const t = ctx.currentTime;
    if (amb) { const o = amb; o.g.gain.cancelScheduledValues(t); o.g.gain.setTargetAtTime(0, t, 0.6); setTimeout(() => { o.stop(); }, 3500); }
    const g = ctx.createGain(); g.gain.value = 0; g.gain.setTargetAtTime(gain, t, 1.2);
    const f = ctx.createBiquadFilter(); f.type = 'lowpass'; f.frequency.value = cutoff; f.Q.value = 3;
    const l = ctx.createOscillator(); l.frequency.value = lfo; const lg = ctx.createGain(); lg.gain.value = cutoff * 0.35; l.connect(lg); lg.connect(f.frequency); l.start();
    const oscs = freqs.map((fr, i) => { const o = ctx.createOscillator(); o.type = type; o.frequency.value = fr; o.detune.value = (i % 2 ? 1 : -1) * (6 + i * 3); o.connect(f); o.start(); return o; });
    let sh = null;
    if (shimmer) { sh = ctx.createOscillator(); sh.type = 'sine'; sh.frequency.value = freqs[0] * 12; const sg = ctx.createGain(); sg.gain.value = shimmer; sh.connect(sg); sg.connect(g); sh.start(); oscs.push(sh); }
    f.connect(g); g.connect(master);
    amb = { g, f, oscs, stop() { oscs.forEach(o => { try { o.stop(); } catch (e) {} }); try { l.stop(); } catch (e) {} } };
    tensionNode = amb;
  },
  tension(v) { if (!amb || !ctx) return; const t = ctx.currentTime; amb.f.frequency.setTargetAtTime(300 + v * 1800, t, 0.3); amb.oscs.forEach((o, i) => o.detune.setTargetAtTime((i % 2 ? 1 : -1) * (6 + v * 40), t, 0.4)); },
  silence() { if (!amb || !ctx) return; amb.g.gain.setTargetAtTime(0, ctx.currentTime, 0.4); },

  blip(f = 440, dur = 0.2, vol = 0.18, type = 'sine', slide = 0) {
    if (!ctx) return; const t = ctx.currentTime, o = ctx.createOscillator(), g = ctx.createGain();
    o.type = type; o.frequency.setValueAtTime(f, t); if (slide) o.frequency.exponentialRampToValueAtTime(Math.max(20, f * slide), t + dur);
    g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(vol, t + 0.01); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(g); g.connect(master); o.start(t); o.stop(t + dur + 0.05);
  },
  noise(dur = 0.5, vol = 0.2, fc = 1200, q = 0.7, sweep = 0) {
    if (!ctx) return; const t = ctx.currentTime, s = ctx.createBufferSource(), f = ctx.createBiquadFilter(), g = ctx.createGain();
    s.buffer = noiseBuf; f.type = 'bandpass'; f.frequency.setValueAtTime(fc, t); if (sweep) f.frequency.exponentialRampToValueAtTime(Math.max(40, fc * sweep), t + dur); f.Q.value = q;
    g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(vol, t + dur * 0.2); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    s.connect(f); f.connect(g); g.connect(master); s.start(t); s.stop(t + dur + 0.05);
  },
  chime(f = 660, vol = 0.12) { [1, 2.01, 3.02].forEach((m, i) => this.blip(f * m, 1.6 - i * 0.4, vol / (i + 1), 'sine')); },
  whoosh() { this.noise(1.4, 0.35, 300, 0.8, 8); this.blip(60, 1.2, 0.3, 'sine', 3); },
  hit(f = 55) { this.blip(f, 0.9, 0.5, 'sine', 0.4); this.noise(0.4, 0.25, 200, 0.6); },
  glitch() { for (let i = 0; i < 4; i++) setTimeout(() => this.blip(200 + Math.random() * 2000, 0.05, 0.08, 'square'), i * 35); this.noise(0.18, 0.15, 3000, 1.2); },
  alarm() { for (let i = 0; i < 3; i++) setTimeout(() => this.blip(880, 0.12, 0.12, 'square'), i * 220); },
  heartbeat(on, bpm = 60, vol = 0.5) {
    clearInterval(beatT); beatT = null; if (!on || !ctx) return;
    const beat = () => { this.blip(52, 0.22, vol, 'sine', 0.6); setTimeout(() => this.blip(46, 0.22, vol * 0.7, 'sine', 0.6), 170); };
    beat(); beatT = setInterval(beat, 60000 / bpm);
  },
  /* soft voice-like murmur: filtered noise with formant wobble */
  murmur(dur = 1.2, vol = 0.12, base = 500) {
    if (!ctx) return; const t = ctx.currentTime, s = ctx.createBufferSource(), f = ctx.createBiquadFilter(), g = ctx.createGain();
    s.buffer = noiseBuf; f.type = 'bandpass'; f.Q.value = 6; f.frequency.setValueAtTime(base, t);
    for (let i = 1; i < 6; i++) f.frequency.linearRampToValueAtTime(base * (0.7 + Math.random() * 0.9), t + (dur * i) / 6);
    g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(vol, t + 0.15); g.gain.linearRampToValueAtTime(0, t + dur);
    s.connect(f); f.connect(g); g.connect(master); s.start(t); s.stop(t + dur + 0.1);
  },
  laugh(vol = 0.12, pitch = 1) { for (let i = 0; i < 5; i++) setTimeout(() => this.blip((520 + Math.random() * 80) * pitch, 0.1, vol, 'triangle', 0.85), i * 130); },
};
