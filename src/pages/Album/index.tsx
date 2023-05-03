import { useAtom } from "jotai";
import { useQuery } from "react-query";
import { Link, useParams } from "react-router-dom";
import useAudioStore, { Track } from "../../stores/audio";
import { authAtom, userAtom } from "../Auth";

const AlbumPage = () => {
  const { id: albumId } = useParams();
  const [user] = useAtom(userAtom);
  const [auth] = useAtom(authAtom);
  const playAlbum = useAudioStore((state) => state.playAlbum);
  const togglePlay = useAudioStore((state) => state.togglePlay);
  const playPrev = useAudioStore((state) => state.playPrevTrack);
  const playNext = useAudioStore((state) => state.playNextTrack);

  const { data: image } = useQuery(`image-${albumId}`, async () => {
    const res = await fetch(
      `http://localhost:8096/items/${albumId}/images/Primary`
    );

    if (!res.ok) return;

    const img = await res.blob();
    return URL.createObjectURL(img);
  });

  const { data: tracks } = useQuery(`album-tracks-${albumId}`, async () => {
    const res = await fetch(
      `http://localhost:8096/Users/${user.id}/Items?ParentId=${albumId}&Fields=ItemCounts,PrimaryImageAspectRatio,BasicSyncInfo,CanDelete,MediaSourceCount&SortBy=ParentIndexNumber,IndexNumber,SortName`,
      {
        headers: { Authorization: auth },
      }
    );

    if (!res.ok) return;

    const data = await res.json();
    console.log(data.Items);
    return data.Items;
  });

  const { data: tracksWithAudio } = useQuery(
    `album-audio-${albumId}`,
    async () => {
      const promises: Promise<Track>[] = [];

      tracks.forEach((track: any) => {
        promises.push(
          new Promise(async (resolve, reject) => {
            const res = await fetch(
              `http://localhost:8096/Audio/${track.Id}/stream`,
              {
                headers: {
                  Authorization: auth,
                },
              }
            );

            if (!res.ok) reject(new Error(res.statusText));

            const audioBlob = await res.blob();

            resolve({
              title: track.Name,
              audioUrl: URL.createObjectURL(audioBlob),
            });
          })
        );
      });

      const audioUrls = await Promise.all(promises);

      return audioUrls;
    },
    { enabled: !!tracks }
  );

  const playAudio = async (id: number) => {
    if (!tracksWithAudio) return;

    playAlbum(tracksWithAudio, id);
  };

  return (
    <div className="flex bg-neutral-950 min-h-screen text-violet-50 p-8">
      <div>
        <Link to="/">Home</Link>
        <img src={image} className="w-96 h-96 rounded-lg" />
      </div>
      {tracks && (
        <div className="flex flex-col p-12 gap-4">
          {tracks.map((track: any, i: number) => (
            <button
              key={track.Id}
              onClick={() => playAudio(i)}
              className="flex gap-2 pr-4 items-center bg-neutral-900 rounded-md"
            >
              <img src={image} className="w-10 h-10" />
              <div>{track.Name}</div>
              <div className="ml-auto">{track.IndexNumber}</div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default AlbumPage;
