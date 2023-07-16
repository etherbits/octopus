import useAudioStore from "../../stores/audio";

const QueueList = () => {
  const { tracks, currentTrack } = useAudioStore((state) => ({
    tracks: state.tracks,
    currentTrack: state.getCurrentTrack(),
  }));

  return (
    <div className="w-80 p-4 bg-neutral-950 rounded-xl">
      <div className="flex justify-between mb-5">
        <h6 className="text-neutral-50 font-bold">Queue</h6>
        <div className="flex gap-3 text-sm text-neutral-400">
          <button>Shuffle</button>
          <button>Clear</button>
        </div>
      </div>
      <ul className="flex flex-col gap-4">
        {tracks.map((track) => (
          <li key={track.id}>
            <button
              className={`flex h-14 w-full rounded-md text-left overflow-hidden ${
                currentTrack?.id === track.id
                  ? "bg-gradient-to-r from-neutral-800 to-neutral-900 hover:to-neutral-800"
                  : "bg-gradient-to-r from-neutral-900 to-neutral-950 hover:to-neutral-800"
              }`}
            >
              <img
                src={
                  track.image ||
                  "https://www.wagbet.com/wp-content/uploads/2019/11/music_placeholder.png"
                }
                className="w-14 rounded-md"
              />
              <div className="flex flex-col h-full justify-between py-2 px-3 flex-grow-0 overflow-x-hidden">
                <h6 className="text-sm whitespace-nowrap overflow-x-hidden text-ellipsis text-neutral-200">
                  {track.name}
                </h6>
                <span className="text-xs text-neutral-400 whitespace-nowrap overflow-x-hidden text-ellipsis">
                  {track.artists[0]}
                </span>
              </div>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QueueList;
