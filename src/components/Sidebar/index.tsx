import { useEffect, useState } from "react";
import { Settings } from "react-feather";
import { useQuery } from "react-query";
import useUserListStore from "../../stores/user";
import AlbumCard, { Album } from "../AlbumCard";
import TextInput from "../TextInput";

const Sidebar = () => {
  const { user, auth } = useUserListStore((state) => ({
    user: state.currentUser!,
    auth: state.getAuthData(),
  }));

  const [albumQuery, setAlbumQuery] = useState("");

  const { data: albums } = useQuery("albums", async () => {
    const res = await fetch(
      `http://localhost:8096/Users/${user.id}/Items?IncludeItemTypes=MusicAlbum&Fields=PrimaryImageAspectRatio,SortName,BasicSyncInfo&Recursive=true&SortBy=Name`,
      {
        headers: {
          Authorization: auth,
        },
      },
    );

    const albumData: { Items: Album[] } = await res.json();
    return albumData.Items;
  });

  return (
    <div className="flex flex-col gap-5 p-5 pb-0 w-72 h-full bg-neutral-950">
      <div className="flex justify-between items-center">
        <div className="flex gap-2">
          <img src="/assets/icons/logo.svg" />
          <h2 className="text-neutral-200">Octopus</h2>
        </div>
        <Settings
          size={18}
          strokeWidth={1.5}
          className="stroke-neutral-700 cursor-pointer hover:stroke-neutral-400"
        />
      </div>
      <TextInput
        icon="Search"
        placeholder="Search albums..."
        onValueChange={(value) => {
          setAlbumQuery(value);
        }}
        pollDelay={350}
      />
      <ul className="flex flex-col gap-5 flex-grow text-neutral-200 overflow-y-auto">
        {albums &&
          albums
            .filter(
              (album) =>
                album.Name.toLowerCase().includes(albumQuery.toLowerCase()) ||
                (album.Artists[0] &&
                  album.Artists[0]
                    .toLowerCase()
                    .includes(albumQuery.toLowerCase())),
            )
            .map((album) => {
              return (
                <li key={album.Id} className="last:mb-5">
                  <AlbumCard album={album} />
                </li>
              );
            })}
      </ul>
    </div>
  );
};

export default Sidebar;
