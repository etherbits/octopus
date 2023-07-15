import { MoreVertical } from "react-feather";
import { useQuery } from "react-query";
import { Link, useParams } from "react-router-dom";
import useAudioStore, { Track } from "../../stores/audio";
import useUserListStore from "../../stores/user";
import { sToMMSS } from "../../utils/general";
import { getMorphedTracks } from "../../utils/jellyfin";

const AlbumPage = () => {
  const { id: albumId } = useParams();
  const { user, auth } = useUserListStore((state) => ({
    user: state.currentUser,
    auth: state.getAuthData(),
  }));
  const playAlbum = useAudioStore((state) => state.playAlbum);
  const playTrack = useAudioStore((state) => state.playTrack);

  if (!user) return <div>no user</div>;

  const { data: albumImage } = useQuery(`image-${albumId}`, async () => {
    const res = await fetch(
      `http://localhost:8096/items/${albumId}/images/Primary`,
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
        },
      );
      if (!res.ok) return;

      const data = await res.json();

      const tracks: Track[] = getMorphedTracks(data.Items, albumImage!, user);
      return tracks;
    },
    { enabled: !!albumImage },
  );

  const getAlbumDurationM = (tracks: Track[]) => {
    const seconds = tracks.reduce(
      (accumulator, currentTrack) => accumulator + currentTrack.durationS,
      0,
    );

    return Math.floor(seconds / 60);
  };

  return (
    <div className="bg-neutral-900 h-full text-violet-50 overflow-auto p-11">
      <div className="w-fit mx-auto">
        <div className="flex gap-16">
          <div className="flex flex-col gap-6">
            <img src={albumImage} className="w-80 h-80 rounded-lg" />
            {tracks && (
              <div className="flex flex-col">
                <div className="flex items-center gap-1 mb-2">
                  <h1 className="text-neutral-50 font-bold text-xl">
                    {tracks[0].albumName}
                  </h1>
                  <MoreVertical
                    size={20}
                    strokeWidth={1.5}
                    className="stroke-neutral-500"
                  />
                </div>
                <div className="flex gap-5 mb-4">
                  <span className="text-neutral-300 font-medium">
                    {tracks[0].artists[0]}
                  </span>
                  <span className="text-neutral-300">
                    {tracks[0].productionYear}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <button
                    onClick={() => playAlbum(tracks)}
                    className="px-4 py-1.5 outline outline-2 outline-orange-500 rounded-md text-orange-300"
                  >
                    Play Album
                  </button>
                  <div className="flex text-sm text-neutral-500 gap-3">
                    <span>{tracks.length} tracks</span>
                    <span>{getAlbumDurationM(tracks)} minutes</span>
                  </div>
                </div>
              </div>
            )}
          </div>
          {tracks && (
            <div className="flex flex-col gap-8 w-[500px]">
              <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-2 w-full">
                  {tracks.map((track: Track) => (
                    <button
                      key={track.id}
                      onClick={() => playTrack(track)}
                      className="flex gap-2 text-left px-4 py-2 rounded-md hover:bg-neutral-800"
                    >
                      <div className="w-6">{track.indexNumber}</div>
                      <div className="w-full">{track.name}</div>
                      <span className="w-12">{sToMMSS(track.durationS)}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AlbumPage;
