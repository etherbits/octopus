import { Pause, Play, SkipBack, SkipForward } from "react-feather";
import { Link } from "react-router-dom";
import useAudioStore from "../../stores/audio";
import { sToMMSS } from "../../utils/general";
import ProgressBar from "../ProgressBar";
import VolumeControl from "../VolumeControl";

const PlayerBar = () => {
  const {
    togglePlay,
    playPrev,
    playNext,
    track,
    audioState,
    playerState,
    seekAudio,
    toggleShuffle,
    toggleRepeat,
  } = useAudioStore((state) => {
    return {
      togglePlay: state.togglePlay,
      playNext: state.playNext,
      playPrev: state.playPrev,
      track: state.getCurrentTrack(),
      audioState: state.audioState,
      playerState: state.playerState,
      seekAudio: state.seekAudio,
      toggleShuffle: state.toggleShuffle,
      toggleRepeat: state.toggleRepeat,
    };
  });

  return (
    <div className="flex gap-10 bg-black text-violet-50 items-center p-4">
      <Link
        to={`/album/${track?.albumId}`}
        className="flex items-center gap-3"
        style={{ opacity: track ? 1 : 0 }}
      >
        <img src={track?.image} className="w-14 h-14 rounded-md" />
        <div className="flex flex-col gap-2 w-40 overflow-hidden">
          <div
            className="text-neutral-200 whitespace-nowrap"
            title={track?.artists[0]}
          >
            {track?.artists[0]}
          </div>
          <div
            className="text-neutral-400 text-sm font-light whitespace-nowrap w-full truncate overflow-hidden"
            title={track?.albumName}
          >
            {track?.albumName}
          </div>
        </div>
      </Link>
      <div className="flex align-center ">
        <button className="p-2 rounded-md group" onClick={playPrev}>
          <SkipBack size={18} className="stroke-neutral-600" />
        </button>
        <button className="p-2 rounded-md group" onClick={togglePlay}>
          {audioState?.isPaused ? (
            <Pause size={24} className="stroke-neutral-400" />
          ) : (
            <Play size={24} className="stroke-neutral-400" />
          )}
        </button>
        <button className="p-2 rounded-md group" onClick={playNext}>
          <SkipForward size={18} className="stroke-neutral-600" />
        </button>
      </div>
      <div className="flex flex-col gap-3 flex-grow">
        <div className="flex h-6">
          <span>{track ? track.name : "No audio"}</span>
          <span className="ml-auto text-neutral-400 font-light text-sm">
            {audioState
              ? `${sToMMSS(audioState.currentTime)} / ${sToMMSS(
                  audioState.duration,
                )}`
              : "00:00 / 00:00"}
          </span>
        </div>

        <ProgressBar
          value={audioState?.currentTime}
          maxValue={audioState?.duration}
          onChange={seekAudio}
        />
      </div>
      <div className="flex gap-3 items-center">
        <button
          onClick={toggleRepeat}
          className={`w-5 h-5 ${
            playerState.shouldRepeat ? "bg-orange-500" : "bg-neutral-400"
          } hover:bg-orange-400 [mask-image:url(/assets/icons/repeat.svg)] [mask-size:20px]`}
        />
        <button
          onClick={toggleShuffle}
          className={`w-5 h-5 ${
            playerState.shouldShuffle ? "bg-orange-500" : "bg-neutral-400"
          } hover:bg-orange-400 [mask-image:url(/assets/icons/shuffle.svg)] [mask-size:20px]`}
        />
      </div>
      <div>
        <VolumeControl />
      </div>
    </div>
  );
};

export default PlayerBar;
