import React from "react";
import useAudioStore from "../../stores/audio";

const VolumeControl = () => {
  const setVolume = useAudioStore((state) => state.setVolume);
  return (
    <div className="flex gap-2">
      <button
        onClick={() => {
          setVolume(1);
        }}
      >
        vol max
      </button>
      <button
        onClick={() => {
          setVolume(0.5);
        }}
      >
        vol half
      </button>
      <button
        onClick={() => {
          setVolume(0);
        }}
      >
        vol zero
      </button>
    </div>
  );
};

export default VolumeControl;
