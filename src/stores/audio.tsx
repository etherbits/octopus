import { create } from "zustand";

export type TrackMetaData = {
  Name: string;
  Album: string;
  Artists: string[];
};

export type Track = {
  audioUrl: string;
};

export type AlbumMetaData = {
  imageUrl: string;
};

export type AudioData = {
  isPlaying: boolean;
  currentTime: number;
  volume: number
  duration: number;
};

interface AudioState {
  tracks: Track[];
  albumMetaData: AlbumMetaData | null;
  trackMetaDatas: TrackMetaData[];
  trackIndex: number;
  audioData: AudioData | null;
  audioInterval: NodeJS.Timer | null;
  audio: HTMLAudioElement;
  setVolume: (volume: number) => void;
  addTrack: (track: Track) => void;
  setTracks: (tracks: Track[]) => void;
  setAlbumMetaData: (albumMetaData: AlbumMetaData) => void;
  setTrackMetaDatas: (trackMetaDatas: TrackMetaData[]) => void;
  setTrackIndex: (index: number) => void;
  playNextTrack: () => void;
  playPrevTrack: () => void;
  playTrack: (track: Track) => void;
  playAlbum: (
    albumMetaData: AlbumMetaData,
    trackMetaDatas: TrackMetaData[],
    tracks: Track[],
    startIndex?: number
  ) => void;
  loadAudio: () => void;
  playAudio: () => void;
  togglePlay: () => void;
  addAudioListeners: () => void;
  removeAudioListeners: () => void;
  updateAudioData: () => void;
  seekAudio: (percentage: number) => void;
}

const useAudioStore = create<AudioState>((set, get) => ({
  tracks: [],
  albumMetaData: null,
  trackMetaDatas: [],
  trackIndex: 0,
  audioData: null,
  audioInterval: null,
  audio: new Audio(),
  setVolume: (volume: number) => {
    const { audio, updateAudioData } = get();
    audio.volume = volume;
    updateAudioData()
  },
  addTrack: (track) => set((state) => ({ tracks: [...state.tracks, track] })),
  setTracks: (tracks: Track[]) => set(() => ({ tracks })),
  setAlbumMetaData: (albumMetaData) => set(() => ({ albumMetaData })),
  setTrackMetaDatas: (trackMetaDatas) => set(() => ({ trackMetaDatas })),
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
    audio.src = track.audioUrl;
    audio.play();
  },
  playAlbum: (albumMetaData, trackMetaDatas, tracks, startIndex = 0) => {
    const {
      audio,
      setTrackIndex,
      setTracks,
      setAlbumMetaData,
      setTrackMetaDatas,
      playAudio,
      playNextTrack,
    } = get();
    setAlbumMetaData(albumMetaData);
    setTrackMetaDatas(trackMetaDatas);
    setTracks(tracks);
    setTrackIndex(startIndex);

    audio.onended = playNextTrack;

    playAudio();
  },
  loadAudio: () => {
    const { audio, tracks, trackIndex } = get();
    audio.src = tracks[trackIndex].audioUrl;
  },
  playAudio: () => {
    const { audio, loadAudio, addAudioListeners } = get();
    loadAudio();
    addAudioListeners();
    audio.play();
  },
  togglePlay: () => {
    const { audio, removeAudioListeners, addAudioListeners } = get();

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
          isPlaying: !audio.paused,
        },
      };
    }),

  seekAudio: (percentage) => {
    const { audio, updateAudioData } = get();

    audio.currentTime = audio.duration * percentage;
    updateAudioData();
  },
}));

export default useAudioStore;
