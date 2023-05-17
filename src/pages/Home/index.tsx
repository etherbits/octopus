import { useAtom } from "jotai";
import { authAtom, userAtom } from "../Auth";
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
    return artists.Items;
  });

  return (
    <div className="flex flex-col h-full bg-neutral-900 text-neutral-50 overflow-auto p-8">
      <h1 className="text-4xl">Albums</h1>
      {data && (
        <ul>
          {data.map((item: { Id: string; Name: string }) => (
            <div key={item.Id}>
              <AlbumCard albumData={item} />
            </div>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Home;
