import useAudioStore from "../../stores/audio";

const QueueList = () => {
  const { tracks } = useAudioStore((state) => ({ tracks: state.tracks }));
  console.log(tracks)
  return (
    <div className="w-80 p-4 bg-neutral-950 rounded-xl">
      <div className="flex justify-between">
        <h6 className="text-neutral-50 font-bold">Queue</h6>
        <div className="flex gap-3 text-sm text-neutral-400">
          <button>Shuffle</button>
          <button>Clear</button>
        </div>
      </div>
      <ul>
        {tracks.map((track) => (
          <li key={track.id}>{track.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default QueueList;
