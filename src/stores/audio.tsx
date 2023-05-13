import { create } from "zustand";
import { randomInt } from "../utils/general";

export type Track = {
  id: string;
  name: string;
  albumId: string;
  albumName: string;
  artists: string[];
  indexNumber: number;
  image: string;
  audio: string;
};

export type AudioData = {
  isPaused: boolean;
  currentTime: number;
  duration: number;
};

export type PlayerState = {
  shouldShuffle: boolean;
  shouldRepeat: boolean;
  volume: number;
};

interface AudioState {
  tracks: Track[];
  prevTracks: Track[];
  trackIndex: number;
  audioState: AudioData | null;
  playerState: PlayerState;
  toggleShuffle: () => void;
  toggleRepeat: () => void;
  audio: HTMLAudioElement;
  pushTrack: (track: Track) => void;
  pushPrevTrack: (track: Track) => void;
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
  prevTracks: [],
  trackIndex: 0,
  audioState: null,
  playerState: { shouldShuffle: false, shouldRepeat: false, volume: 1 },
  toggleShuffle: () =>
    set((state) => ({
      playerState: {
        ...state.playerState,
        shouldShuffle: !state.playerState.shouldShuffle,
      },
    })),
  toggleRepeat: () =>
    set((state) => ({
      playerState: {
        ...state.playerState,
        shouldRepeat: !state.playerState.shouldRepeat,
      },
    })),
  audio: new Audio(),
  pushTrack: (track) => set((state) => ({ tracks: [...state.tracks, track] })),
  pushPrevTrack: (track) =>
    set((state) => ({ prevTracks: [...state.prevTracks, track] })),
  setTracks: (tracks: Track[]) => set(() => ({ tracks })),
  setTrackIndex: (index: number) => set(() => ({ trackIndex: index })),
  playNext: () => {
    const { tracks, trackIndex, playerState, setTrackIndex, play } = get();

    let newIndex = 0;

    if (playerState.shouldShuffle) {
      newIndex = randomInt(tracks.length);
    } else if (playerState.shouldRepeat) {
      newIndex = trackIndex >= tracks.length - 1 ? 0 : trackIndex + 1;
    } else if (trackIndex >= tracks.length - 1) {
      return;
    } else {
      newIndex = trackIndex + 1;
    }

    setTrackIndex(newIndex);

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
    const { play, setTracks, setTrackIndex } = get();

    setTracks([track]);
    setTrackIndex(0);
    play();
  },
  playAlbum: (tracks, startIndex = 0) => {
    const { play, setTracks, setTrackIndex } = get();

    setTracks(tracks);
    setTrackIndex(startIndex);

    play();
  },
  play: () => {
    const {
      audio,
      tracks,
      trackIndex,
      playerState,
      playNext,
      pushPrevTrack,
      addAudioListeners,
    } = get();

    pushPrevTrack(tracks[trackIndex]);
    addAudioListeners();
    audio.volume = playerState.volume;
    audio.addEventListener("ended", playNext);
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
        audioState: {
          currentTime: audio.currentTime,
          duration: audio.duration,
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
    const { audio, playerState } = get();

    playerState.volume = volume;
    set((state) => ({ playerState: { ...state.playerState, volume } }));
    audio.volume = volume;
  },
}));

export default useAudioStore;
