import { useAtom } from "jotai";
import { useQuery } from "react-query";
import { Link, useParams } from "react-router-dom";
import useAudioStore, { Track } from "../../stores/audio";
import { getMorphedTracks } from "../../utils/jellyfin";
import { authAtom, userAtom } from "../Auth";

const AlbumPage = () => {
  const { id: albumId } = useParams();
  const [user] = useAtom(userAtom);
  const [auth] = useAtom(authAtom);
  const playAlbum = useAudioStore((state) => state.playAlbum);

  const { data: albumImage } = useQuery(`image-${albumId}`, async () => {
    const res = await fetch(
      `http://localhost:8096/items/${albumId}/images/Primary`
    );

    if (!res.ok) return;

    const img = await res.blob();
    return URL.createObjectURL(img);
  });

  const { data: tracks } = useQuery(
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

      const tracks: Track[] = getMorphedTracks(data.Items, albumImage!, user);

      return tracks;
    },
    { enabled: !!albumImage }
  );

  const playAudio = async (index: number) => {
    if (!tracks) return;

    playAlbum(tracks, index);
  };

  return (
    <div className="flex bg-neutral-900 min-h-screen text-violet-50 p-8">
      <div>
        <Link to="/">Home</Link>
        <img src={albumImage} className="w-96 h-96 rounded-lg" />
      </div>
      {tracks && (
        <div className="flex flex-col p-12 gap-4">
          {tracks.map((track: Track, i: number) => (
            <button
              key={track.id}
              onClick={() => playAudio(i)}
              className="flex gap-2 pr-4 items-center bg-neutral-900 rounded-md"
            >
              <img src={albumImage} className="w-10 h-10" />
              <div>{track.name}</div>
              <div className="ml-auto">{track.indexNumber}</div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default AlbumPage;
