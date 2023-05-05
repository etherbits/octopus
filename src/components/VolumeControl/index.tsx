import React from "react";
import useAudioStore from "../../stores/audio";

const VolumeControl = () => {
  const setVolume = useAudioStore((state) => state.setVolume);
  return (
    <div className="flex items-center gap-3 w-32">
      <div className="w-5 h-5 bg-neutral-100 [mask-image:url(/assets/icons/volume-2.svg)] [mask-size:20px]" />
      <div className="flex-grow h-[6px] bg-neutral-800 rounded-md overflow-hidden">
        <div className="h-full w-[60%] bg-orange-600 rounded-md" />
      </div>
    </div>
  );
};

export default VolumeControl;
