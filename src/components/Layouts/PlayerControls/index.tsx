import useAudioStore from "../../../stores/audio";

interface Props {
  children: React.ReactNode;
}

const PlayerControls: React.FC<Props> = ({ children }) => {
  const togglePlay = useAudioStore((state) => state.togglePlay);
  const playPrev = useAudioStore((state) => state.playPrevTrack);
  const playNext = useAudioStore((state) => state.playNextTrack);
  const track = useAudioStore((state) => {
    const { trackMetaDatas, trackIndex } = state;
    return trackMetaDatas[trackIndex];
  });

  return (
    <div className="flex flex-col h-screen">
      <div className="h-full overflow-auto">{children}</div>
      <div className="flex gap-4 bg-neutral-900 h-16 text-violet-50 items-center px-4">
        <button className="bg-neutral-800 p-2 rounded-md" onClick={playPrev}>
          prev track
        </button>
        <button className="bg-neutral-800 p-2 rounded-md" onClick={togglePlay}>
          play toggle
        </button>
        <button className="bg-neutral-800 p-2 rounded-md" onClick={playNext}>
          next track
        </button>
        {track && <span>{track.Name}</span>}
      </div>
    </div>
  );
};

export default PlayerControls;
