import { useQuery } from "react-query";
import { Link } from "react-router-dom";

export type Album = {
  Id: string;
  Name: string;
  Artists: string[];
};

interface Props {
  album: Album;
}

const AlbumCard: React.FC<Props> = ({ album }) => {
  const { data: image } = useQuery(`image-${album.Id}`, async () => {
    const res = await fetch(
      `http://localhost:8096/items/${album.Id}/images/Primary`,
    );
    if (!res.ok) return;
    const imageBlob = await res.blob();
    return URL.createObjectURL(imageBlob);
  });

  return (
    <Link
      to={`/album/${album.Id}`}
      className="flex w-full bg-neutral-950 rounded-md hover:bg-neutral-900"
    >
      <img
        src={
          image ||
          "https://www.wagbet.com/wp-content/uploads/2019/11/music_placeholder.png"
        }
        className="w-14 h-14 rounded-md"
      />
      <div className="flex flex-col justify-between py-2 px-3 flex-grow-0 overflow-x-hidden">
        <h6 className="text-sm whitespace-nowrap overflow-x-hidden text-ellipsis text-neutral-200">
          {album.Name}
        </h6>
        <span className="text-xs text-neutral-400 whitespace-nowrap overflow-x-hidden text-ellipsis">
          {album.Artists[0]}
        </span>
      </div>
    </Link>
  );
};

export default AlbumCard;
