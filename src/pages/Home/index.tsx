import { useQuery } from "react-query";
import AlbumCard from "../../components/AlbumCard";
import useUserListStore from "../../stores/user";

const Home: React.FC = () => {
  const { user, auth } = useUserListStore((state) => ({
    user: state.currentUser,
    auth: state.getAuthData(),
  }));

  console.log(auth)

  if (!user) return <div>no user</div>;

  const { data } = useQuery("artists", async () => {
    const res = await fetch(
      `http://localhost:8096/Users/${user.id}/Items?IncludeItemTypes=MusicAlbum&Fields=PrimaryImageAspectRatio,SortName,BasicSyncInfo&Recursive=true`,
      {
        headers: {
          Authorization: auth,
        },
      },
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
