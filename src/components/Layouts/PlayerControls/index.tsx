import useAudioStore from "../../../stores/audio";

interface Props {
  children: React.ReactNode;
}

const PlayerControls: React.FC<Props> = ({ children }) => {
  const togglePlay = useAudioStore((state) => state.togglePlay);
  const playPrev = useAudioStore((state) => state.playPrevTrack);
  const playNext = useAudioStore((state) => state.playNextTrack);
  return (
    <div className="flex flex-col h-screen">
      <div className="h-full overflow-auto">{children}</div>
      <div className="flex gap-4 bg-neutral-900 h-16">
        <button className="bg-neutral-800" onClick={playPrev}>
          prev track
        </button>
        <button className="bg-neutral-800" onClick={togglePlay}>
          play toggle
        </button>
        <button className="bg-neutral-800" onClick={playNext}>
          next track
        </button>
      </div>
    </div>
  );
};

export default PlayerControls;
