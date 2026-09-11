// Plays a short two-tone chime using the Web Audio API directly, rather
// than loading an .mp3 file - this means there's no audio asset to add
// to the repo, no load delay, and no broken-file risk on deploy.
//
// Browsers block audio from playing before the user has interacted with
// the page at all (autoplay policy) - if that happens, playChime() just
// fails silently, which is the right behavior here since a booking
// notification isn't important enough to interrupt the user for.
export function playChime() {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;

    const ctx = new AudioCtx();
    const now = ctx.currentTime;

    // Two quick notes (a small upward interval) reads as "notification",
    // not an alarm - kept short and quiet so it's not annoying if several
    // bookings come in a row.
    const notes = [
      { freq: 740, start: 0, duration: 0.12 },
      { freq: 988, start: 0.1, duration: 0.16 },
    ];

    notes.forEach(({ freq, start, duration }) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.value = freq;

      gain.gain.setValueAtTime(0, now + start);
      gain.gain.linearRampToValueAtTime(0.15, now + start + 0.02);
      gain.gain.linearRampToValueAtTime(0, now + start + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now + start);
      osc.stop(now + start + duration + 0.02);
    });

    // Close the context shortly after so we don't leak audio contexts if
    // this fires often (e.g. every 15s poll tick on the driver dashboard).
    setTimeout(() => ctx.close(), 500);
  } catch {
    // Autoplay restrictions or an unsupported browser - fail silently.
  }
}
