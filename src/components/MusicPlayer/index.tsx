import { atom, useAtom } from "jotai";
import { useEffect, useRef } from "react";

export const tracksAtom = atom<string[]>([]);

const MusicPlayer: React.FC = () => {
  const [tracks] = useAtom(tracksAtom);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const playAudio = () => {
    const audioElement = audioRef.current;
    if (audioElement == null) return;
    audioElement.play();
  };

  useEffect(() => {
    const audioElement = audioRef.current;
    if (audioElement == null) return;
    audioElement.addEventListener("canplay", playAudio);

    return () => {
      audioElement.removeEventListener("canplay", playAudio);
    };
  }, []);

  return (
    <audio ref={audioRef} controls loop>
      <source src={tracks[0]} />
      <source src={tracks[1]} />
    </audio>
  );
};

export default MusicPlayer;
