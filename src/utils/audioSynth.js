// Web Audio API Synthesizer for National Anthem & Sound Effects

let audioCtx = null;
let bgOscillator = null;
let bgGainNode = null;

function getAudioContext() {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

// Play celebratory victory fanfare when flag is hoisted or quiz completes
export function playFanfare() {
  const ctx = getAudioContext();
  if (!ctx) return;

  const notes = [
    { freq: 523.25, time: 0, duration: 0.15 },    // C5
    { freq: 659.25, time: 0.15, duration: 0.15 }, // E5
    { freq: 783.99, time: 0.3, duration: 0.2 },   // G5
    { freq: 1046.50, time: 0.5, duration: 0.6 }   // C6
  ];

  notes.forEach(({ freq, time, duration }) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.value = freq;

    gain.gain.setValueAtTime(0, ctx.currentTime + time);
    gain.gain.linearRampToValueAtTime(0.3, ctx.currentTime + time + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + time + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(ctx.currentTime + time);
    osc.stop(ctx.currentTime + time + duration);
  });
}

// Synthesize Jana Gana Mana opening notes
export function playAnthemSynth(onProgress) {
  const ctx = getAudioContext();
  if (!ctx) return;

  // Key notes of Jana Gana Mana opening melody
  // C4=261.63, D4=293.66, E4=329.63, F4=349.23, G4=392.00, A4=440.00, B4=493.88, C5=523.25
  const melody = [
    { note: 261.63, dur: 0.4 }, // Ja-
    { note: 293.66, dur: 0.4 }, // na
    { note: 329.63, dur: 0.4 }, // Ga-
    { note: 329.63, dur: 0.4 }, // na
    { note: 329.63, dur: 0.4 }, // Ma-
    { note: 329.63, dur: 0.4 }, // na
    { note: 329.63, dur: 0.4 }, // A-
    { note: 329.63, dur: 0.4 }, // dhi-
    { note: 329.63, dur: 0.4 }, // na-
    { note: 329.63, dur: 0.4 }, // ya-
    { note: 329.63, dur: 0.6 }, // ka
    { note: 329.63, dur: 0.4 }, // Ja-
    { note: 293.66, dur: 0.4 }, // ya
    { note: 329.63, dur: 0.4 }, // He
    { note: 349.23, dur: 0.8 }, // ~

    { note: 329.63, dur: 0.4 }, // Bha-
    { note: 329.63, dur: 0.4 }, // ra-
    { note: 329.63, dur: 0.4 }, // ta
    { note: 293.66, dur: 0.4 }, // Bha-
    { note: 293.66, dur: 0.4 }, // gya
    { note: 261.63, dur: 0.4 }, // Vi-
    { note: 293.66, dur: 0.4 }, // dha-
    { note: 261.63, dur: 0.8 }, // ta

    { note: 392.00, dur: 0.4 }, // Ja-
    { note: 392.00, dur: 0.4 }, // ya
    { note: 392.00, dur: 0.4 }, // He
    { note: 392.00, dur: 0.4 }, // Ja-
    { note: 392.00, dur: 0.4 }, // ya
    { note: 392.00, dur: 0.4 }, // He
    { note: 392.00, dur: 0.4 }, // Ja-
    { note: 392.00, dur: 0.4 }, // ya
    { note: 392.00, dur: 0.6 }, // He
    { note: 440.00, dur: 0.6 }, // Ja-
    { note: 493.88, dur: 0.6 }, // ya
    { note: 523.25, dur: 1.2 }  // Jaya Jaya Jaya He!
  ];

  let currentTime = ctx.currentTime + 0.1;

  melody.forEach((item, index) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(item.note, currentTime);

    gain.gain.setValueAtTime(0, currentTime);
    gain.gain.linearRampToValueAtTime(0.25, currentTime + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.001, currentTime + item.dur - 0.05);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(currentTime);
    osc.stop(currentTime + item.dur);

    if (onProgress) {
      setTimeout(() => {
        onProgress(index, melody.length);
      }, (currentTime - ctx.currentTime) * 1000);
    }

    currentTime += item.dur;
  });
}

// Ambient Tanpura / Indian Drone Sound
export function toggleAmbientSound(enable) {
  const ctx = getAudioContext();
  if (!ctx) return;

  if (enable) {
    if (bgOscillator) return;

    bgOscillator = ctx.createOscillator();
    bgGainNode = ctx.createGain();

    bgOscillator.type = 'sawtooth';
    bgOscillator.frequency.value = 130.81; // C3 Tanpura drone root

    // Lowpass filter for warm Indian classical drone texture
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 350;

    bgGainNode.gain.setValueAtTime(0, ctx.currentTime);
    bgGainNode.gain.linearRampToValueAtTime(0.04, ctx.currentTime + 2); // Soft volume

    bgOscillator.connect(filter);
    filter.connect(bgGainNode);
    bgGainNode.connect(ctx.destination);

    bgOscillator.start();
  } else {
    if (bgGainNode && bgOscillator) {
      bgGainNode.gain.linearRampToValueAtTime(0.001, ctx.currentTime + 1);
      setTimeout(() => {
        if (bgOscillator) {
          bgOscillator.stop();
          bgOscillator.disconnect();
          bgOscillator = null;
        }
      }, 1000);
    }
  }
}
