/**
 * Each SongCard owns its own <audio>, so nothing stops two from playing at
 * once. This module keeps a single "currently playing" element and pauses the
 * previous one whenever a new card takes over.
 */
let current: HTMLAudioElement | null = null;

export function claimPlayback(el: HTMLAudioElement) {
  if (current && current !== el) current.pause();
  current = el;
}

export function releasePlayback(el: HTMLAudioElement) {
  if (current === el) current = null;
}
