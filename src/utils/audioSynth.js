// Universal Audio Player for National Anthem (Jana Gana Mana) - MP3 + OGG support for iOS Safari & Android

let realAnthemAudio = null;
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

// Play Authentic Universal MP3 National Anthem Recording (Jana Gana Mana)
export function playAnthemSynth(onProgress) {
  try {
    if (realAnthemAudio) {
      realAnthemAudio.pause();
      realAnthemAudio.currentTime = 0;
    }

    // MP3 format is universally supported across 100% of mobile browsers (iOS Safari & Android)
    realAnthemAudio = new Audio('/national-anthem.mp3');
    realAnthemAudio.volume = 1.0; // Full Sound

    const playPromise = realAnthemAudio.play();
    if (playPromise !== undefined) {
      playPromise.then(() => {
        console.log("Playing Real Jana Gana Mana National Anthem MP3 at Full Volume!");
      }).catch(err => {
        console.warn("Retrying with OGG audio format...", err);
        try {
          realAnthemAudio = new Audio('/national-anthem.ogg');
          realAnthemAudio.volume = 1.0;
          realAnthemAudio.play().catch(synthErr => playFallbackSynth(onProgress));
        } catch (e) {
          playFallbackSynth(onProgress);
        }
      });
    }
  } catch (e) {
    console.error("Audio playback error, using synth fallback", e);
    playFallbackSynth(onProgress);
  }
}

// Web Audio Synth Fallback
function playFallbackSynth(onProgress) {
  const ctx = getAudioContext();
  if (!ctx) return;

  const melody = [
    { note: 261.63, dur: 0.38 }, { note: 293.66, dur: 0.38 }, { note: 329.63, dur: 0.38 },
    { note: 329.63, dur: 0.38 }, { note: 329.63, dur: 0.38 }, { note: 329.63, dur: 0.38 },
    { note: 329.63, dur: 0.38 }, { note: 329.63, dur: 0.38 }, { note: 329.63, dur: 0.38 },
    { note: 329.63, dur: 0.38 }, { note: 329.63, dur: 0.55 }, { note: 329.63, dur: 0.38 },
    { note: 293.66, dur: 0.38 }, { note: 329.63, dur: 0.38 }, { note: 349.23, dur: 0.75 }
  ];

  let currentTime = ctx.currentTime + 0.05;
  melody.forEach((item) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(item.note, currentTime);
    gain.gain.setValueAtTime(0, currentTime);
    gain.gain.linearRampToValueAtTime(0.7, currentTime + 0.04);
    gain.gain.exponentialRampToValueAtTime(0.001, currentTime + item.dur - 0.03);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(currentTime);
    osc.stop(currentTime + item.dur);
    currentTime += item.dur;
  });
}

// Victory Fanfare
export function playFanfare() {
  const ctx = getAudioContext();
  if (!ctx) return;

  const notes = [
    { freq: 523.25, time: 0, duration: 0.15 },
    { freq: 659.25, time: 0.15, duration: 0.15 },
    { freq: 783.99, time: 0.3, duration: 0.2 },
    { freq: 1046.50, time: 0.5, duration: 0.6 }
  ];

  notes.forEach(({ freq, time, duration }) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.value = freq;

    gain.gain.setValueAtTime(0, ctx.currentTime + time);
    gain.gain.linearRampToValueAtTime(0.6, ctx.currentTime + time + 0.04);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + time + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(ctx.currentTime + time);
    osc.stop(ctx.currentTime + time + duration);
  });
}

export function toggleAmbientSound(enable) {
  const ctx = getAudioContext();
  if (!ctx) return;

  if (enable) {
    if (bgOscillator) return;
    bgOscillator = ctx.createOscillator();
    bgGainNode = ctx.createGain();

    bgOscillator.type = 'sawtooth';
    bgOscillator.frequency.value = 130.81;

    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 350;

    bgGainNode.gain.setValueAtTime(0, ctx.currentTime);
    bgGainNode.gain.linearRampToValueAtTime(0.06, ctx.currentTime + 2);

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
