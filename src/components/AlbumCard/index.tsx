import { useState } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";

interface Props {
  albumData: {
    Id: string;
    Name: string;
  };
}

const AlbumCard: React.FC<Props> = ({ albumData }) => {
  const [image, setImage] = useState("");
  const { data } = useQuery(`image-${albumData.Id}`, async () => {
    const res = await fetch(
      `http://localhost:8096/items/${albumData.Id}/images/Primary`
    );
    if (!res.ok) return;
    const img = await res.blob();
    setImage(URL.createObjectURL(img));
  });

  return (
    <Link to={`/album/${albumData.Id}`} className="flex gap-2 m-8 w-full">
      <img src={image || "https://www.wagbet.com/wp-content/uploads/2019/11/music_placeholder.png"} className="w-16 h-16" />
      {albumData.Name}
    </Link>
  );
};

export default AlbumCard;

