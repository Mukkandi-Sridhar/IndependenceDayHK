// Dedicated Mobile & Desktop Real Audio Manager for Jana Gana Mana National Anthem MP3

let globalAudio = null;
let isAudioUnlocked = false;

// Pre-initialize & unlock audio on mobile browsers (iOS Safari & Android Chrome)
export function initMobileAudio() {
  if (typeof window === 'undefined') return;

  if (!globalAudio) {
    globalAudio = new Audio();
    globalAudio.src = '/national-anthem.mp3?v=3';
    globalAudio.preload = 'auto';
    globalAudio.volume = 1.0;
  }

  // Mobile WebKit unlock trick on first touch/click
  const unlockAudio = () => {
    if (!isAudioUnlocked && globalAudio) {
      globalAudio.play().then(() => {
        globalAudio.pause();
        globalAudio.currentTime = 0;
        isAudioUnlocked = true;
        console.log("Mobile Audio Unlocked Successfully!");
      }).catch(err => {
        console.log("Waiting for user tap to play audio", err);
      });
      window.removeEventListener('touchstart', unlockAudio);
      window.removeEventListener('click', unlockAudio);
    }
  };

  window.addEventListener('touchstart', unlockAudio, { once: true });
  window.addEventListener('click', unlockAudio, { once: true });
}

// Play Real Jana Gana Mana MP3 Recording
export function playAnthemSynth() {
  if (typeof window === 'undefined') return;

  try {
    if (!globalAudio) {
      globalAudio = new Audio('/national-anthem.mp3?v=3');
      globalAudio.volume = 1.0;
    } else {
      globalAudio.pause();
      globalAudio.currentTime = 0;
      globalAudio.volume = 1.0;
    }

    const playPromise = globalAudio.play();
    if (playPromise !== undefined) {
      playPromise.then(() => {
        console.log("Playing Real Jana Gana Mana MP3 Audio!");
      }).catch(err => {
        console.warn("Autoplay deferred until user interaction:", err);
        // Retry play on next touch if blocked by browser policy
        const retryPlay = () => {
          if (globalAudio) {
            globalAudio.play().catch(e => console.log(e));
          }
          window.removeEventListener('touchstart', retryPlay);
          window.removeEventListener('click', retryPlay);
        };
        window.addEventListener('touchstart', retryPlay, { once: true });
        window.addEventListener('click', retryPlay, { once: true });
      });
    }
  } catch (e) {
    console.error("Audio playback error:", e);
  }
}

// Stop audio playback
export function stopAnthemAudio() {
  if (globalAudio) {
    globalAudio.pause();
    globalAudio.currentTime = 0;
  }
}

// Fanfare effect using Web Audio API
export function playFanfare() {
  if (typeof window === 'undefined') return;
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    if (ctx.state === 'suspended') {
      ctx.resume();
    }

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
      gain.gain.linearRampToValueAtTime(0.5, ctx.currentTime + time + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + time + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(ctx.currentTime + time);
      osc.stop(ctx.currentTime + time + duration);
    });
  } catch (e) {
    console.log("Fanfare error", e);
  }
}

export function toggleAmbientSound() {
  // Ambient sound disabled per requirements
}
