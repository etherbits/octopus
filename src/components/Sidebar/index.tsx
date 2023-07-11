import { useQuery } from "react-query";
import useUserListStore from "../../stores/user";
import AlbumCard from "../AlbumCard";

type Album = {
  Name: string;
  Image: string;
};

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
    <div className="flex flex-col gap-4 w-72 text-neutral-200 bg-neutral-950 p-4">
      {albums && (
        <ul>
          {albums.map((album: any) => (
            <li key={album.Id}>
              <AlbumCard albumData={album} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Sidebar;
