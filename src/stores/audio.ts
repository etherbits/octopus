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
  isMuted: boolean;
};

interface AudioState {
  tracks: Track[];
  unplayedTracks: number[];
  trackIndex: number;
  audioState: AudioData | null;
  playerState: PlayerState;
  toggleShuffle: () => void;
  toggleRepeat: () => void;
  toggleMute: () => void;
  audio: HTMLAudioElement;
  pushTrack: (track: Track) => void;
  setTracks: (tracks: Track[]) => void;
  setUnplayedTracks: () => void;
  removeUnplayedTrack: (trackIndex: number) => void;
  getCurrentTrack: () => Track;
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
  unplayedTracks: [],
  trackIndex: 0,
  audioState: null,
  playerState: {
    shouldShuffle: false,
    shouldRepeat: false,
    volume: 1,
    isMuted: false,
  },
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

  toggleMute: () => {
    const {
      audio,
      playerState: { isMuted },
    } = get();

    const isCurrentlyMuted = !isMuted;

    set((state) => ({
      playerState: {
        ...state.playerState,
        isMuted: isCurrentlyMuted,
      },
    }));

    audio.muted = isCurrentlyMuted;
  },
  audio: new Audio(),
  pushTrack: (track) => set((state) => ({ tracks: [...state.tracks, track] })),
  setTracks: (tracks: Track[]) => {
    set(() => ({ tracks }));
    get().setUnplayedTracks();
  },
  setUnplayedTracks: () =>
    set((state) => ({ unplayedTracks: state.tracks.map((_, i) => i) })),
  removeUnplayedTrack: (trackIndex: number) =>
    set((state) => ({
      unplayedTracks: state.unplayedTracks.filter(
        (unplayedTrack) => unplayedTrack !== trackIndex
      ),
    })),
  setTrackIndex: (index: number) => set(() => ({ trackIndex: index })),
  getCurrentTrack: () => {
    const { tracks, trackIndex } = get();
    return tracks[trackIndex];
  },
  playNext: () => {
    const {
      tracks,
      unplayedTracks,
      trackIndex,
      playNext,
      setUnplayedTracks,
      playerState: { shouldShuffle, shouldRepeat },
      setTrackIndex,
      play,
    } = get();

    let newIndex = trackIndex;

    if (unplayedTracks.length < 1) {
      if (!shouldRepeat) return;

      setUnplayedTracks();
      return playNext();
    }

    if (shouldShuffle) {
      let unplayedIndex = randomInt(unplayedTracks.length);
      newIndex = unplayedTracks[unplayedIndex];
    } else if (trackIndex >= tracks.length - 1) {
      if (!shouldRepeat) return;

      newIndex = 0;
    } else {
      newIndex++;
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
      trackIndex,
      playerState,
      removeUnplayedTrack,
      getCurrentTrack,
      playNext,
      addAudioListeners,
    } = get();

    addAudioListeners();
    audio.volume = playerState.volume;
    removeUnplayedTrack(trackIndex);
    audio.addEventListener("ended", playNext);
    audio.src = getCurrentTrack().audio;
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
