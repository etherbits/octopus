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
    <div className="bg-neutral-900 h-full text-violet-50 overflow-auto p-8">
      <div className="w-fit mx-auto">
        <Link to="/">
          <div className="w-6 h-6 bg-neutral-300 mb-4 [mask-image:url(/assets/icons/arrow-left.svg)] hover:bg-neutral-50" />
        </Link>
        <div className="flex gap-16">
          <div>
            <img src={albumImage} className="w-96 h-96 rounded-lg" />
          </div>
          {tracks && (
            <div className="flex flex-col gap-8 w-[500px]">
              <div>
                <div className="flex items-center gap-4">
                  <h1 className="text-neutral-50 font-bold text-2xl">
                    {tracks[0].albumName}
                  </h1>
                  <span className="text-neutral-300 text-xl">
                    {tracks[0].productionYear}
                  </span>
                </div>
                <span className="text-neutral-300 text-xl">
                  {tracks[0].artists[0]}
                </span>
              </div>
              <div className="flex flex-col gap-6">
                <div className="flex items-center text-neutral-600 gap-6">
                  <button
                    onClick={() => playAlbum(tracks)}
                    className="flex px-3 py-1 gap-2 items-center text-neutral-50 bg-orange-600 rounded-[4px] hover:bg-orange-500"
                  >
                    <div className="w-5 h-5 bg-neutral-50 [mask-image:url(/assets/icons/play-s.svg)]" />
                    Play Album
                  </button>
                  <span>{tracks.length} tracks</span>
                  <span>{getAlbumDurationM(tracks)} minutes</span>
                  <div className="flex gap-2 ml-auto">
                    <button className="w-5 h-5 bg-neutral-400 [mask-image:url(/assets/icons/plus.svg)] hover:bg-neutral-200" />
                    <button className="w-5 h-5 bg-neutral-400 [mask-image:url(/assets/icons/heart.svg)] hover:bg-neutral-200" />
                  </div>
                </div>
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
