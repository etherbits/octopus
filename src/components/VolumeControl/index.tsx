import useAudioStore from "../../stores/audio";
import ProgressBar from "../ProgressBar";

const VolumeControl = () => {
  const { isMuted, toggleMute, volume, setVolume } = useAudioStore((state) => ({
    isMuted: state.playerState.isMuted,
    toggleMute: state.toggleMute,
    volume: state.playerState.volume,
    setVolume: state.setVolume,
  }));

  return (
    <div className="flex items-center gap-3 w-32">
      <button
        onClick={toggleMute}
        className={`w-5 h-5 bg-neutral-100 ${
          isMuted
            ? "[mask-image:url(/assets/icons/volume-x.svg)]"
            : "[mask-image:url(/assets/icons/volume-2.svg)]"
        } [mask-size:20px]`}
      />
      <div className="flex-grow">
        <ProgressBar value={volume} maxValue={1} onChange={setVolume} />
      </div>
    </div>
  );
};

export default VolumeControl;
