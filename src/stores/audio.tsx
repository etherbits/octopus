import { create } from "zustand";

export type TrackMetaData = {
  Name: string;
};

export type Track = {
  audioUrl: string;
};

interface AudioState {
  tracks: Track[];
  trackMetaDatas: TrackMetaData[];
  trackIndex: number;
  audio: HTMLAudioElement;
  setVolume: (volume: number) => void;
  addTrack: (track: Track) => void;
  setTracks: (tracks: Track[]) => void;
  setTrackMetaDatas: (trackMetaDatas: TrackMetaData[]) => void;
  setTrackIndex: (index: number) => void;
  playNextTrack: () => void;
  playPrevTrack: () => void;
  playTrack: (track: Track) => void;
  playAlbum: (
    trackMetaDatas: TrackMetaData[],
    tracks: Track[],
    startIndex?: number
  ) => void;
  loadAudio: () => void;
  playAudio: () => void;
  togglePlay: () => void;
}

const useAudioStore = create<AudioState>((set, get) => ({
  tracks: [],
  trackMetaDatas: [],
  trackIndex: 0,
  audio: new Audio(),
  setVolume: (volume: number) => {
    const { audio } = get();
    audio.volume = volume;
    console.log(audio, audio.volume)
  },
  addTrack: (track) => set((state) => ({ tracks: [...state.tracks, track] })),
  setTracks: (tracks: Track[]) => set(() => ({ tracks })),
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
  playAlbum: (trackMetaDatas, tracks, startIndex = 0) => {
    const {
      audio,
      setTrackIndex,
      setTracks,
      setTrackMetaDatas,
      playAudio,
      playNextTrack,
    } = get();
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