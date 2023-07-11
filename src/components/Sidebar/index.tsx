import { useQuery } from "react-query";
import useUserListStore from "../../stores/user";
import AlbumCard, { Album } from "../AlbumCard";

const Sidebar = () => {
  const { user, auth } = useUserListStore((state) => ({
    user: state.currentUser!,
    auth: state.getAuthData(),
  }));

  const { data: albums } = useQuery("albums", async () => {
    const res = await fetch(
      `http://localhost:8096/Users/${user.id}/Items?IncludeItemTypes=MusicAlbum&Fields=PrimaryImageAspectRatio,SortName,BasicSyncInfo&Recursive=true`,
      {
        headers: {
          Authorization: auth,
        },
      },
    );

    const albumData = await res.json();
    console.log(albumData.Items[0]);
    return albumData.Items;
  });
  return (
    <div className="flex flex-col gap-5 p-5 pb-0 w-72 bg-neutral-950">
      <h2 className="text-neutral-200">Octopus</h2>
      <ul className="flex flex-col gap-5 w-full text-neutral-200 overflow-y-auto ">
        {albums &&
          albums.map((album: Album) => (
            <li key={album.Id} className="last:mb-5">
              <AlbumCard album={album} />
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Sidebar;
