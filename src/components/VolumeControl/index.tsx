import * as Icons from "react-feather";
import useAudioStore from "../../stores/audio";
import ProgressBar from "../ProgressBar";

const VolumeControl = () => {
  const { isMuted, toggleMute, volume, setVolume } = useAudioStore((state) => ({
    isMuted: state.playerState.isMuted,
    toggleMute: state.toggleMute,
    volume: state.playerState.volume,
    setVolume: state.setVolume,
  }));

  const getVolumeIcon = () => {
    let name: keyof typeof Icons = "Volume";
    if (isMuted) {
      name = "VolumeX";
    } else if (volume < 0.3) {
      name = "Volume";
    } else if (volume < 0.6) {
      name = "Volume1";
    } else {
      name = "Volume2";
    }
    return Icons[name];
  };

  const VolumeIcon = getVolumeIcon();

  return (
    <div className="flex items-center gap-3 w-32">
      <button onClick={toggleMute} className="p-1.5 group">
        <VolumeIcon
          size={20}
          strokeWidth={1.5}
          className={`stroke-neutral-400 group-hover:stroke-neutral-300`}
        />
      </button>
      <div className="flex-grow">
        <ProgressBar value={volume} maxValue={1} onChange={setVolume} />
      </div>
    </div>
  );
};

export default VolumeControl;
