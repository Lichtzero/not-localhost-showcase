/**
 * Ambient generative space synthesizer using Web Audio API.
 * Produces serene, majestic, space-like ambient sounds (deep cosmic void hum
 * and celestial harmonic resonances) with pure, silky sine waves.
 * Zero noise buffers, zero static crackle, zero clicks or glitchy artifacts.
 */

class SoundEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private masterGain: GainNode | null = null;
  private compressor: DynamicsCompressorNode | null = null;
  private ambientGain: GainNode | null = null;

  // Pure sine celestial oscillators (A Major / Pure Fifth harmony)
  private subOsc1: OscillatorNode | null = null;
  private subOsc2: OscillatorNode | null = null;
  private rootOsc: OscillatorNode | null = null;
  private fifthOsc: OscillatorNode | null = null;
  private octaveOsc: OscillatorNode | null = null;
  private shimmerOsc: OscillatorNode | null = null;
  private highFifthOsc: OscillatorNode | null = null;
  private highOctaveOsc: OscillatorNode | null = null;

  // Slow celestial breathing LFO
  private lfo: OscillatorNode | null = null;
  private lfoGain: GainNode | null = null;

  // Periodic distant pulsar beacon timer
  private pulsarTimer: number | null = null;
  private muteListeners: Set<(muted: boolean) => void> = new Set();

  public init() {
    if (this.ctx) return;
    try {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();

      // Studio-grade dynamics compressor: warm, transparent, and protects against digital clipping
      this.compressor = this.ctx.createDynamicsCompressor();
      this.compressor.threshold.setValueAtTime(-18, this.ctx.currentTime);
      this.compressor.knee.setValueAtTime(12, this.ctx.currentTime);
      this.compressor.ratio.setValueAtTime(3.0, this.ctx.currentTime);
      this.compressor.attack.setValueAtTime(0.01, this.ctx.currentTime);
      this.compressor.release.setValueAtTime(0.3, this.ctx.currentTime);
      this.compressor.connect(this.ctx.destination);

      // Master output
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.85, this.ctx.currentTime);
      this.masterGain.connect(this.compressor);

      // Dedicated ambient layer gain
      this.ambientGain = this.ctx.createGain();
      this.ambientGain.gain.setValueAtTime(0.70, this.ctx.currentTime);
      this.ambientGain.connect(this.masterGain);

      // --- 1. WARM COSMIC VOID HUM (55Hz sub + 110Hz body) ---
      // Pure, velvety sines - grounding, vast, and weightless
      this.subOsc1 = this.ctx.createOscillator();
      this.subOsc1.type = 'sine';
      this.subOsc1.frequency.setValueAtTime(55.0, this.ctx.currentTime);

      this.subOsc2 = this.ctx.createOscillator();
      this.subOsc2.type = 'sine';
      this.subOsc2.frequency.setValueAtTime(110.0, this.ctx.currentTime);

      const subGain = this.ctx.createGain();
      subGain.gain.setValueAtTime(0.48, this.ctx.currentTime);
      this.subOsc1.connect(subGain);
      this.subOsc2.connect(subGain);
      subGain.connect(this.ambientGain);

      // --- 2. CELESTIAL HARMONIC WASH (Pure peaceful A-E cosmic chord) ---
      // Six purely sinusoidal generators creating natural, lush acoustic chorus
      this.rootOsc = this.ctx.createOscillator();
      this.rootOsc.type = 'sine';
      this.rootOsc.frequency.setValueAtTime(110.0, this.ctx.currentTime); // A2

      this.fifthOsc = this.ctx.createOscillator();
      this.fifthOsc.type = 'sine';
      this.fifthOsc.frequency.setValueAtTime(164.81, this.ctx.currentTime); // E3

      this.octaveOsc = this.ctx.createOscillator();
      this.octaveOsc.type = 'sine';
      this.octaveOsc.frequency.setValueAtTime(220.0, this.ctx.currentTime); // A3

      // Micro-detuned shimmer oscillator produces organic acoustic beating without digital artifacts
      this.shimmerOsc = this.ctx.createOscillator();
      this.shimmerOsc.type = 'sine';
      this.shimmerOsc.frequency.setValueAtTime(220.35, this.ctx.currentTime);

      this.highFifthOsc = this.ctx.createOscillator();
      this.highFifthOsc.type = 'sine';
      this.highFifthOsc.frequency.setValueAtTime(329.63, this.ctx.currentTime); // E4

      this.highOctaveOsc = this.ctx.createOscillator();
      this.highOctaveOsc.type = 'sine';
      this.highOctaveOsc.frequency.setValueAtTime(440.0, this.ctx.currentTime); // A4

      // Gentle Butterworth lowpass filter (low Q = 0.707 to avoid any ringing or glitchy resonance)
      const celestialFilter = this.ctx.createBiquadFilter();
      celestialFilter.type = 'lowpass';
      celestialFilter.frequency.setValueAtTime(780, this.ctx.currentTime);
      celestialFilter.Q.setValueAtTime(0.707, this.ctx.currentTime);

      const celestialGain = this.ctx.createGain();
      celestialGain.gain.setValueAtTime(0.55, this.ctx.currentTime);

      this.rootOsc.connect(celestialFilter);
      this.fifthOsc.connect(celestialFilter);
      this.octaveOsc.connect(celestialFilter);
      this.shimmerOsc.connect(celestialFilter);
      this.highFifthOsc.connect(celestialFilter);
      this.highOctaveOsc.connect(celestialFilter);
      celestialFilter.connect(celestialGain);
      celestialGain.connect(this.ambientGain);

      // --- 3. SLOW CELESTIAL BREATHING LFO ---
      // Modulates filter gently over 18 seconds to mimic drifting through cosmic light
      this.lfo = this.ctx.createOscillator();
      this.lfo.type = 'sine';
      this.lfo.frequency.setValueAtTime(0.055, this.ctx.currentTime);

      this.lfoGain = this.ctx.createGain();
      this.lfoGain.gain.setValueAtTime(160, this.ctx.currentTime);
      this.lfo.connect(this.lfoGain);
      this.lfoGain.connect(celestialFilter.frequency);

      // Start all continuous generators
      this.subOsc1.start();
      this.subOsc2.start();
      this.rootOsc.start();
      this.fifthOsc.start();
      this.octaveOsc.start();
      this.shimmerOsc.start();
      this.highFifthOsc.start();
      this.highOctaveOsc.start();
      this.lfo.start();

      // Schedule periodic serene celestial pulsar beacon
      this.startPulsarBeacon();
    } catch {
      // Audio context may require user interaction
    }
  }

  /**
   * Occasional gentle starlight telemetry ping (pure sine, pristine envelope, zero clicks)
   */
  private startPulsarBeacon() {
    if (this.pulsarTimer) return;
    const trigger = () => {
      if (!this.isMuted && this.ctx && this.masterGain && this.ctx.state === 'running') {
        try {
          const now = this.ctx.currentTime;
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();

          osc.type = 'sine';
          // Serene harmonic frequencies (pure cosmic octaves & fifths)
          const freqs = [880, 1100, 1320, 1760];
          const f = freqs[Math.floor(Math.random() * freqs.length)];
          osc.frequency.setValueAtTime(f, now);

          // Silky smooth envelope with zero DC offset or clicks
          gain.gain.setValueAtTime(0.00001, now);
          gain.gain.exponentialRampToValueAtTime(0.12, now + 0.1);
          gain.gain.exponentialRampToValueAtTime(0.00001, now + 2.2);

          osc.connect(gain);
          gain.connect(this.masterGain);

          osc.start(now);
          osc.stop(now + 2.3);
        } catch {
          // ignore
        }
      }
      this.pulsarTimer = window.setTimeout(trigger, 6000 + Math.random() * 3000);
    };

    this.pulsarTimer = window.setTimeout(trigger, 3500);
  }

  public start() {
    if (!this.ctx) {
      this.init();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    this.isMuted = false;
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(0.85, this.ctx.currentTime);
    }
    this.notifyMuteListeners();
  }

  public toggleMute(): boolean {
    if (!this.ctx) {
      this.init();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    this.isMuted = !this.isMuted;
    if (this.masterGain && this.ctx) {
      const targetGain = this.isMuted ? 0.0001 : 0.85;
      const rampTime = this.ctx.currentTime + (this.isMuted ? 0.3 : 0.8);
      this.masterGain.gain.cancelScheduledValues(this.ctx.currentTime);
      this.masterGain.gain.exponentialRampToValueAtTime(targetGain, rampTime);
    }
    this.notifyMuteListeners();
    return !this.isMuted;
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  public subscribeMute(callback: (muted: boolean) => void): () => void {
    this.muteListeners.add(callback);
    callback(this.isMuted);
    return () => {
      this.muteListeners.delete(callback);
    };
  }

  private notifyMuteListeners() {
    this.muteListeners.forEach((listener) => listener(this.isMuted));
  }

  /**
   * Crisp, crystalline starlight ping on hover
   */
  public playHoverPing() {
    if (this.isMuted || !this.ctx || !this.masterGain) return;
    try {
      const now = this.ctx.currentTime;
      const osc1 = this.ctx.createOscillator();
      const osc2 = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc1.type = 'sine';
      osc2.type = 'sine';

      // Harmonic major fifth starlight shimmer (C6 & G6)
      osc1.frequency.setValueAtTime(1046.5, now);
      osc2.frequency.setValueAtTime(1567.98, now);

      gain.gain.setValueAtTime(0.00001, now);
      gain.gain.exponentialRampToValueAtTime(0.20, now + 0.025);
      gain.gain.exponentialRampToValueAtTime(0.00001, now + 0.45);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(this.masterGain);

      osc1.start(now);
      osc2.start(now);
      osc1.stop(now + 0.48);
      osc2.stop(now + 0.48);
    } catch {
      // ignore
    }
  }

  /**
   * Cosmic warp drive impulse — smooth, expansive stellar acceleration
   */
  public playWarpTransition() {
    if (this.isMuted || !this.ctx || !this.masterGain) return;
    try {
      const now = this.ctx.currentTime;
      // Sub-bass gravitational swell
      const subOsc = this.ctx.createOscillator();
      const subGain = this.ctx.createGain();
      subOsc.type = 'sine';
      subOsc.frequency.setValueAtTime(70, now);
      subOsc.frequency.exponentialRampToValueAtTime(160, now + 0.7);

      subGain.gain.setValueAtTime(0.00001, now);
      subGain.gain.exponentialRampToValueAtTime(0.32, now + 0.2);
      subGain.gain.exponentialRampToValueAtTime(0.00001, now + 1.1);

      subOsc.connect(subGain);
      subGain.connect(this.masterGain);
      subOsc.start(now);
      subOsc.stop(now + 1.15);

      // Crystalline warp refraction chime
      const chimeOsc = this.ctx.createOscillator();
      const chimeGain = this.ctx.createGain();
      chimeOsc.type = 'sine';
      chimeOsc.frequency.setValueAtTime(523.25, now);
      chimeOsc.frequency.exponentialRampToValueAtTime(1046.5, now + 0.6);

      chimeGain.gain.setValueAtTime(0.00001, now);
      chimeGain.gain.exponentialRampToValueAtTime(0.25, now + 0.15);
      chimeGain.gain.exponentialRampToValueAtTime(0.00001, now + 1.0);

      chimeOsc.connect(chimeGain);
      chimeGain.connect(this.masterGain);
      chimeOsc.start(now);
      chimeOsc.stop(now + 1.05);
    } catch {
      // ignore
    }
  }

  /**
   * Gentle deceleration glide returning to cosmic orbit
   */
  public playExitWarp() {
    if (this.isMuted || !this.ctx || !this.masterGain) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(360, now);
      osc.frequency.exponentialRampToValueAtTime(75, now + 0.75);

      gain.gain.setValueAtTime(0.00001, now);
      gain.gain.exponentialRampToValueAtTime(0.25, now + 0.1);
      gain.gain.exponentialRampToValueAtTime(0.00001, now + 0.9);

      osc.connect(gain);
      gain.connect(this.masterGain);
      osc.start(now);
      osc.stop(now + 0.95);
    } catch {
      // ignore
    }
  }

  /**
   * Ethereal astral chime arpeggio for wizard speech
   */
  public playWizardSpeechChime() {
    if (this.isMuted || !this.ctx || !this.masterGain) return;
    try {
      const now = this.ctx.currentTime;
      // Majestic celestial triad (C5 - E5 - G5 - C6)
      const notes = [523.25, 659.25, 783.99, 1046.5];

      notes.forEach((freq, idx) => {
        if (!this.ctx || !this.masterGain) return;
        const noteTime = now + idx * 0.07;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, noteTime);

        gain.gain.setValueAtTime(0.00001, noteTime);
        gain.gain.exponentialRampToValueAtTime(0.20, noteTime + 0.025);
        gain.gain.exponentialRampToValueAtTime(0.00001, noteTime + 0.6);

        osc.connect(gain);
        gain.connect(this.masterGain);

        osc.start(noteTime);
        osc.stop(noteTime + 0.65);
      });
    } catch {
      // ignore
    }
  }

  /**
   * Serene orbital resonance sweep
   */
  public playRuneSpell() {
    if (this.isMuted || !this.ctx || !this.masterGain) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(523.25, now);
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.4);

      gain.gain.setValueAtTime(0.00001, now);
      gain.gain.exponentialRampToValueAtTime(0.22, now + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.00001, now + 0.7);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + 0.75);
    } catch {
      // ignore
    }
  }
}

export const sound = new SoundEngine();

if (typeof window !== 'undefined') {
  const triggerAudioStart = () => {
    sound.start();
  };
  window.addEventListener('pointerdown', triggerAudioStart, { passive: true });
  window.addEventListener('keydown', triggerAudioStart, { passive: true });
  window.addEventListener('click', triggerAudioStart, { passive: true });
}
