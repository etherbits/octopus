import { create } from "zustand";

interface AudioState {
  tracks: string[];
  trackIndex: number;
  audioContext: AudioContext;
  audio: HTMLAudioElement;
  addTrack: (track: string) => void;
  playTrack: (track: string) => void;
  loadAudio: () => void;
  togglePlay: () => void;
}

const useAudioStore = create<AudioState>((set, get) => ({
  tracks: [],
  trackIndex: 0,
  audioContext: new AudioContext(),
  audio: new Audio(),
  addTrack: (track) => set((state) => ({ tracks: [...state.tracks, track] })),
  playTrack: (track) => {
    const { audio } = get();
    audio.src = track;
    audio.play()
  },
  loadAudio: () => {
    const { audio, tracks, trackIndex } = get();
    audio.src = tracks[trackIndex];
  },
  togglePlay: () => {
    const { audio } = get();

    if (audio.paused) {
      return audio.play();
    }

    audio.pause();
  },
}));

export default useAudioStore;
