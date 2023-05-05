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

  const { data: image } = useQuery(`image-${albumId}`, async () => {
    const res = await fetch(
      `http://localhost:8096/items/${albumId}/images/Primary`
    );

    if (!res.ok) return;

    const img = await res.blob();
    return URL.createObjectURL(img);
  });

  const { data: trackMetaDatas } = useQuery(
    `album-tracks-${albumId}`,
    async () => {
      const res = await fetch(
        `http://localhost:8096/Users/${user.id}/Items?ParentId=${albumId}&Fields=ItemCounts,PrimaryImageAspectRatio,BasicSyncInfo,CanDelete,MediaSourceCount&SortBy=ParentIndexNumber,IndexNumber,SortName`,
        {
          headers: { Authorization: auth },
        }
      );

      if (!res.ok) return;

      const data = await res.json();
      return data.Items;
    }
  );

  const { data: tracks } = useQuery(
    `album-audio-${albumId}`,
    async () => {
      const promises: Promise<Track>[] = [];

      trackMetaDatas.forEach((track: any) => {
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
              audioUrl: URL.createObjectURL(audioBlob),
            });
          })
        );
      });

      const audioUrls = await Promise.all(promises);

      return audioUrls;
    },
    { enabled: !!trackMetaDatas }
  );

  const playAudio = async (index: number) => {
    if (!tracks || !image) return;

    playAlbum({ imageUrl: image }, trackMetaDatas, tracks, index);
  };

  return (
    <div className="flex bg-neutral-900 min-h-screen text-violet-50 p-8">
      <div>
        <Link to="/">Home</Link>
        <img src={image} className="w-96 h-96 rounded-lg" />
      </div>
      {trackMetaDatas && (
        <div className="flex flex-col p-12 gap-4">
          {trackMetaDatas.map((trackMetaData: any, i: number) => (
            <button
              key={trackMetaData.Id}
              onClick={() => playAudio(i)}
              className="flex gap-2 pr-4 items-center bg-neutral-900 rounded-md"
            >
              <img src={image} className="w-10 h-10" />
              <div>{trackMetaData.Name}</div>
              <div className="ml-auto">{trackMetaData.IndexNumber}</div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default AlbumPage;
