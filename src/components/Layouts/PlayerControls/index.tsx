import useAudioStore from "../../../stores/audio";
import VolumeControl from "../../VolumeControl";

interface Props {
  children: React.ReactNode;
}

const sToMSS = (seconds: number) => {
  const m = Math.floor(seconds / 60);
  const ss = Math.floor(seconds % 60);
  return `${m}:${ss < 10 ? "0" + ss : ss}`;
};

const PlayerControls: React.FC<Props> = ({ children }) => {
  const togglePlay = useAudioStore((state) => state.togglePlay);
  const playPrev = useAudioStore((state) => state.playPrevTrack);
  const playNext = useAudioStore((state) => state.playNextTrack);
  const track = useAudioStore((state) => {
    const { trackMetaDatas, trackIndex } = state;
    return trackMetaDatas[trackIndex];
  });
  const album = useAudioStore((state) => state.albumMetaData);
  const audio = useAudioStore((state) => state.audio);
  console.log(track);
  return (
    <div className="flex flex-col h-screen">
      <div className="h-full overflow-auto">{children}</div>
      <div className="flex gap-10 bg-neutral-950 text-violet-50 items-center p-4">
        <div className="flex items-center gap-3">
          <img src={album?.imageUrl} className="w-16 h-16 rounded-md" />
          <div className="flex flex-col gap-2">
            <div className="text-neutral-100 whitespace-nowrap">
              {track?.Artists[0]}
            </div>
            <div className="text-neutral-400 text-sm font-light whitespace-nowrap">
              {track?.Album}
            </div>
          </div>
        </div>
        <div className="flex align-center ">
          <button className="p-2 rounded-md" onClick={playPrev}>
            <div className="w-5 h-5 bg-neutral-400 [mask-image:url(/assets/icons/skip-back.svg)] [mask-size:20px]" />
          </button>
          <button className="p-2 rounded-md" onClick={togglePlay}>
            <div className="w-6 h-6 bg-neutral-400 [mask-image:url(/assets/icons/play.svg)] [mask-size:24px]" />
          </button>
          <button className="p-2 rounded-md" onClick={playNext}>
            <div className="w-5 h-5 bg-neutral-400 [mask-image:url(/assets/icons/skip-forward.svg)] [mask-size:20px]" />
          </button>
        </div>
        <div className="flex flex-col gap-3 flex-grow">
          <div className="flex">
            {track && <span>{track.Name}</span>}
            {audio && <span className="ml-auto text-neutral-400 font-light text-sm">{sToMSS(audio.currentTime)} / {sToMSS(audio.duration)}</span>}
          </div>
          <div className="w-full h-2 bg-neutral-800 rounded-md overflow-hidden">
            <div className="h-full w-[60%] bg-orange-600 rounded-md" />
          </div>
        </div>
        <div className="flex gap-3 items-center">
          <div className="w-5 h-5 bg-neutral-400 [mask-image:url(/assets/icons/repeat.svg)] [mask-size:20px]" />
          <div className="w-5 h-5 bg-neutral-400 [mask-image:url(/assets/icons/shuffle.svg)] [mask-size:20px]" />
        </div>
        <div>
          <VolumeControl />
        </div>
      </div>
    </div>
  );
};

export default PlayerControls;
