import { SyntheticEvent, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAudioStore, { AudioData } from "../../../stores/audio";
import ProgressBar from "../../ProgressBar";
import VolumeControl from "../../VolumeControl";

interface Props {
  children: React.ReactNode;
}

const sToMSS = (seconds: number) => {
  if (!seconds) return "0:00";
  const m = Math.floor(seconds / 60);
  const ss = Math.floor(seconds % 60);
  return `${m}:${ss < 10 ? "0" + ss : ss}`;
};

const PlayerControls: React.FC<Props> = ({ children }) => {
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
    <div className="flex flex-col h-screen">
      <div className="flex h-full overflow-auto">
        <div className="flex flex-col gap-4 w-60 bg-neutral-950 p-4">
          <div className="flex items-center gap-2">
            <img
              src="/assets/icons/octopus.svg"
              className="w-[18px] h-[18px]"
              alt="logo"
            />
            <h2 className="text-lg text-neutral-50">Octopus</h2>
          </div>
          <input
            className="bg-neutral-900 rounded-md py-1 px-2 w-full"
            placeholder="Search"
          />
        </div>
        <div className="w-full rounded-bl-md drop-shadow-2xl overflow-hidden">
          {children}
        </div>
      </div>
      <div className="flex gap-10 bg-neutral-950 text-violet-50 items-center p-4">
        <Link
          to={`/album/${track?.albumId}`}
          className="flex items-center gap-3"
          style={{ opacity: track ? 1 : 0 }}
        >
          <img src={track?.image} className="w-16 h-16 rounded-md" />
          <div className="flex flex-col gap-2 w-40 overflow-hidden">
            <div
              className="text-neutral-100 whitespace-nowrap"
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
            <div className="w-5 h-5 bg-neutral-400 group-hover:bg-orange-400 [mask-image:url(/assets/icons/skip-back.svg)] [mask-size:20px]" />
          </button>
          <button className="p-2 rounded-md group" onClick={togglePlay}>
            <div
              className={`w-6 h-6 bg-neutral-400 group-hover:bg-orange-400  [mask-size:24px]`}
              style={{
                maskImage: `url(${
                  !audioState?.isPaused
                    ? "/assets/icons/play.svg"
                    : "/assets/icons/pause.svg"
                })`,
              }}
            />
          </button>
          <button className="p-2 rounded-md group" onClick={playNext}>
            <div className="w-5 h-5 bg-neutral-400 group-hover:bg-orange-400  [mask-image:url(/assets/icons/skip-forward.svg)] [mask-size:20px]" />
          </button>
        </div>
        <div className="flex flex-col gap-3 flex-grow">
          <div className="flex h-6">
            <span>{track ? track.name : "No audio"}</span>
            <span className="ml-auto text-neutral-400 font-light text-sm">
              {audioState
                ? `${sToMSS(audioState.currentTime)} / ${sToMSS(
                    audioState.duration
                  )}`
                : "0:00 / 0:00"}
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
    </div>
  );
};

export default PlayerControls;
