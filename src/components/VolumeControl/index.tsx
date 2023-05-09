import React from "react";
import useAudioStore from "../../stores/audio";
import ProgressBar from "../ProgressBar";

const VolumeControl = () => {
  const setVolume = useAudioStore((state) => state.setVolume);
  const volume = useAudioStore((state) => state.audioData?.volume);
  return (
    <div className="flex items-center gap-3 w-32">
      <div className="w-5 h-5 bg-neutral-100 [mask-image:url(/assets/icons/volume-2.svg)] [mask-size:20px]" />
      <div className="flex-grow">
        <ProgressBar value={volume} maxValue={1} onChange={setVolume} />
      </div>
    </div>
  );
};

export default VolumeControl;
