import { create } from "zustand";

interface AudioState {
  tracks: string[];
  trackIndex: number;
  audioContext: AudioContext;
  audio: HTMLAudioElement;
  addTrack: (track: string) => void;
  setTracks: (tracks: string[]) => void;
  setTrackIndex: (index: number) => void;
  playNextTrack: () => void;
  playPrevTrack: () => void;
  playTrack: (track: string) => void;
  playAlbum: (tracks: string[], startIndex?: number) => void;
  loadAudio: () => void;
  playAudio: () => void;
  togglePlay: () => void;
}

const useAudioStore = create<AudioState>((set, get) => ({
  tracks: [],
  trackIndex: 0,
  audioContext: new AudioContext(),
  audio: new Audio(),
  addTrack: (track) => set((state) => ({ tracks: [...state.tracks, track] })),
  setTracks: (tracks: string[]) => set(() => ({ tracks })),
  setTrackIndex: (index: number) => set(() => ({ trackIndex: index })),
  playNextTrack: () => {
    const { tracks, trackIndex, setTrackIndex, playAudio } = get();
    setTrackIndex(trackIndex >= tracks.length - 1 ? 0 : trackIndex + 1);
    playAudio();
  },
  playPrevTrack: () => {
    const { trackIndex, setTrackIndex, playAudio } = get();
    setTrackIndex(trackIndex <= 0 ? 0 : trackIndex - 1);
    playAudio();
  },
  playTrack: (track) => {
    const { audio } = get();
    audio.src = track;
    audio.play();
  },
  playAlbum: (tracks, startIndex = 0) => {
    const { audio, setTrackIndex, setTracks, playAudio, playNextTrack } = get();
    setTracks(tracks);
    setTrackIndex(startIndex);

    audio.onended = playNextTrack;

    playAudio();
  },
  loadAudio: () => {
    const { audio, tracks, trackIndex } = get();
    audio.src = tracks[trackIndex];
  },
  playAudio: () => {
    const { audio, loadAudio } = get();
    loadAudio();
    audio.play();
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
