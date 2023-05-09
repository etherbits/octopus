import { create } from "zustand";

export type Track = {
  id: string;
  name: string;
  album: string;
  artists: string[];
  indexNumber: number;
  image: string;
  audio: string;
};

export type AudioData = {
  isPaused: boolean;
  currentTime: number;
  volume: number;
  duration: number;
};

interface AudioState {
  tracks: Track[];
  trackIndex: number;
  audioData: AudioData | null;
  audio: HTMLAudioElement;
  pushTrack: (track: Track) => void;
  setTracks: (tracks: Track[]) => void;
  setTrackIndex: (index: number) => void;
  play: () => void;
  playNext: () => void;
  playPrev: () => void;
  playTrack: (track: Track) => void;
  playAlbum: (tracks: Track[], startIndex?: number) => void;
  togglePlay: () => void;
  seekAudio: (percentage: number) => void;
  setVolume: (volume: number) => void;
  addAudioListeners: () => void;
  removeAudioListeners: () => void;
  updateAudioData: () => void;
}

const useAudioStore = create<AudioState>((set, get) => ({
  tracks: [],
  trackIndex: 0,
  audioData: null,
  audio: new Audio(),
  pushTrack: (track) => set((state) => ({ tracks: [...state.tracks, track] })),
  setTracks: (tracks: Track[]) => set(() => ({ tracks })),
  setTrackIndex: (index: number) => set(() => ({ trackIndex: index })),
  playNext: () => {
    const { tracks, trackIndex, setTrackIndex, play } = get();

    setTrackIndex(trackIndex >= tracks.length - 1 ? 0 : trackIndex + 1);

    play();
  },
  playPrev: () => {
    const { audio, trackIndex, setTrackIndex, play } = get();

    if (audio.currentTime < 5) {
      setTrackIndex(trackIndex <= 0 ? 0 : trackIndex - 1);
    }

    play();
  },
  playTrack: (track) => {
    const { audio } = get();
    audio.src = track.audio;
    audio.play();
  },
  playAlbum: (tracks, startIndex = 0) => {
    const { audio, play, playNext, setTracks, setTrackIndex } = get();

    setTracks(tracks);
    setTrackIndex(startIndex);
    audio.onended = playNext;

    play();
  },
  play: () => {
    const { audio, tracks, trackIndex, addAudioListeners } = get();
    addAudioListeners();
    audio.src = tracks[trackIndex].audio;
    audio.play();
  },
  togglePlay: () => {
    const { audio } = get();

    if (audio.paused) {
      return audio.play();
    }

    audio.pause();
  },
  addAudioListeners: () => {
    const { audio, updateAudioData } = get();
    audio.addEventListener("timeupdate", updateAudioData);
    audio.addEventListener("play", updateAudioData);
  },
  removeAudioListeners: () => {
    const { audio, updateAudioData } = get();
    audio.removeEventListener("timeupdate", updateAudioData);
  },
  updateAudioData: () =>
    set(() => {
      const { audio } = get();
      return {
        audioData: {
          currentTime: audio.currentTime,
          duration: audio.duration,
          volume: audio.volume,
          isPaused: !audio.paused,
        },
      };
    }),
  seekAudio: (percentage) => {
    const { audio, updateAudioData } = get();

    audio.currentTime = audio.duration * percentage;
    updateAudioData();
  },
  setVolume: (volume: number) => {
    const { audio, updateAudioData } = get();
    audio.volume = volume;
    updateAudioData();
  },
}));

export default useAudioStore;
