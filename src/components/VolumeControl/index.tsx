import useAudioStore from "../../stores/audio";
import ProgressBar from "../ProgressBar";

const VolumeControl = () => {
  const { isMuted, toggleMute, volume, setVolume } = useAudioStore((state) => ({
    isMuted: state.playerState.isMuted,
    toggleMute: state.toggleMute,
    volume: state.playerState.volume,
    setVolume: state.setVolume,
  }));

  const getImage = () => {
    let path = "/assets/icons/";
    if (isMuted) {
      path += "volume-x.svg";
    } else if (volume < 0.3) {
      path += "volume.svg";
    } else if (volume < 0.6) {
      path += "volume-1.svg";
    } else {
      path += "volume-2.svg";
    }
    return path;
  };

  return (
    <div className="flex items-center gap-3 w-32">
      <button
        onClick={toggleMute}
        className={`w-5 h-5 bg-neutral-100 [mask-size:20px]`}
        style={{ maskImage: `url(${getImage()})` }}
      />
      <div className="flex-grow">
        <ProgressBar value={volume} maxValue={1} onChange={setVolume} />
      </div>
    </div>
  );
};

export default VolumeControl;
