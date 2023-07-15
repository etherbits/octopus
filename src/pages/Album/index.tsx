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
    <div className="bg-neutral-900 h-full text-violet-50 p-11 overflow-hidden">
      <div className="w-fit h-full  mx-auto">
        <div className="flex h-full gap-16">
          <div className="flex flex-col gap-6">
            <img src={albumImage} className="w-80 h-80 rounded-lg" />
            {tracks && (
              <div className="flex flex-col w-80">
                <div className="flex items-center gap-1 mb-2">
                  <h1
                    className="text-neutral-50 font-bold text-xl whitespace-nowrap overflow-hidden text-ellipsis"
                    title={tracks[0].albumName}
                  >
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
          <div className="flex flex-col gap-4">
            <div className="flex mx-3 gap-8 text-sm text-neutral-400">
              <div className="w-7">#</div>
              <div className="w-48">Title</div>
              <div className="w-32">Artists</div>
              <div className="w-48">Album</div>
              <span className="flex justify-end w-16">Duration</span>
            </div>
            {tracks && (
              <ul className="flex flex-col gap-5 flex-grow-1 h-full overflow-auto">
                {tracks.map((track: Track) => (
                  <li>
                    <button
                      onClick={() => playTrack(track)}
                      className="flex gap-8 text-sm text-left px-3 py-2 rounded-md bg-gradient-to-r from-neutral-800 to-neutral-900 hover:to-neutral-800"
                    >
                      <div className="w-7 overflow-hidden text-ellipsis">
                        {track.indexNumber}
                      </div>
                      <div
                        className="w-48 whitespace-nowrap overflow-hidden text-ellipsis"
                        title={track.name}
                      >
                        {track.name}
                      </div>
                      <div
                        className="w-32 whitespace-nowrap overflow-hidden text-ellipsis"
                        title={track.artists[0]}
                      >
                        {track.artists[0]}
                      </div>
                      <div
                        className="w-48 whitespace-nowrap overflow-hidden text-ellipsis"
                        title={track.albumName}
                      >
                        {track.albumName}
                      </div>
                      <span className="flex justify-end w-16 overflow-hidden text-ellipsis">
                        {sToMMSS(track.durationS)}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlbumPage;
