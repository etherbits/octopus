import { useState } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";

interface Props {
  albumData: {
    Id: string;
    Name: string;
    Artists: string[];
  };
}

const AlbumCard: React.FC<Props> = ({ albumData }) => {
  const [image, setImage] = useState("");
  const { data } = useQuery(`image-${albumData.Id}`, async () => {
    const res = await fetch(
      `http://localhost:8096/items/${albumData.Id}/images/Primary`,
    );
    if (!res.ok) return;
    const img = await res.blob();
    setImage(URL.createObjectURL(img));
  });

  return (
    <Link to={`/album/${albumData.Id}`} className="flex w-full bg-neutral-900 rounded-md">
      <img
        src={
          image ||
          "https://www.wagbet.com/wp-content/uploads/2019/11/music_placeholder.png"
        }
        className="w-14 h-14 rounded-md"
      />
      <div className="flex flex-col justify-between py-2 px-3 flex-grow-0 overflow-x-hidden ">
        <h6 className="text-sm whitespace-nowrap overflow-x-hidden text-ellipsis text-neutral-200">
          {albumData.Name}
        </h6>
        <span className="text-xs text-neutral-400">{albumData.Artists[0]}</span>
      </div>
    </Link>
  );
};

export default AlbumCard;
