import { useAtom } from "jotai";
import { authAtom, userAtom } from "../Auth";
import { useState } from "react";
import { useQuery } from "react-query";
import AlbumCard from "../../components/AlbumCard";

const Home: React.FC = () => {
  const [auth] = useAtom(authAtom);
  const [user] = useAtom(userAtom);

  const { data } = useQuery("artists", async () => {
    const res = await fetch(
      `http://localhost:8096/Users/${user.id}/Items?IncludeItemTypes=MusicAlbum&ParentId=7e64e319657a9516ec78490da03edccb&Fields=PrimaryImageAspectRatio,SortName,BasicSyncInfo&Recursive=true`,
      {
        headers: {
          Authorization: auth,
        },
      }
    );

    const artists = await res.json();
    console.log(artists);
    return artists.Items;
  });

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-neutral-950 p-8">
      <button className="text-violet-50 bg-violet-500 rounded-md px-4 py-2">
        Get Data
      </button>
      {data && (
        <pre className="max-w-4xl whitespace-normal text-violet-50 break-all">
          {data.map((item: { Id: string, Name: string }) => (
            <div key={item.Id}>
              <AlbumCard albumData={item} />
            </div>
          ))}
        </pre>
      )}
    </div>
  );
};

export default Home;
