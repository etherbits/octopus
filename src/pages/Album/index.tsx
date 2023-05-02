import { useAtom } from "jotai";
import { useEffect, useMemo, useState } from "react";
import { useQuery } from "react-query";
import { Link, useParams } from "react-router-dom";
import { tracksAtom } from "../../components/MusicPlayer";
import { authAtom, userAtom } from "../Auth";

const AlbumPage = () => {
  const { id } = useParams();
  const [user] = useAtom(userAtom);
  const [auth] = useAtom(authAtom);
  const [_, setTrack] = useAtom(tracksAtom);
  const { data: image } = useQuery(`image-${id}`, async () => {
    const res = await fetch(`http://localhost:8096/items/${id}/images/Primary`);

    if (!res.ok) return;

    const img = await res.blob();
    return URL.createObjectURL(img);
  });

  const { data: songs } = useQuery(`songs-${id}`, async () => {
    const res = await fetch(
      `http://localhost:8096/Users/${user.id}/Items?ParentId=${id}&Fields=ItemCounts,PrimaryImageAspectRatio,BasicSyncInfo,CanDelete,MediaSourceCount&SortBy=ParentIndexNumber,IndexNumber,SortName`,
      {
        headers: { Authorization: auth },
      }
    );

    if (!res.ok) return;

    const data = await res.json();
    console.log(data.Items);
    return data.Items;
  });

  const playAudio = async (id: string) => {
    const res = await fetch(`http://localhost:8096/Audio/${id}/stream`, {
      headers: {
        Authorization: auth,
      },
    });
    console.log(id);
    const audioBlob = await res.blob();
    setTrack([URL.createObjectURL(audioBlob), URL.createObjectURL(audioBlob)]);
  };

  return (
    <div className="flex bg-neutral-950 min-h-screen text-violet-50 p-8">
      <div>
        <Link to="/">Home</Link>
        <img src={image} className="w-96 h-96 rounded-lg" />
        <span>id: {id}</span>
      </div>
      {songs && (
        <div className="flex flex-col p-12 gap-4">
          {songs.map((song: any) => (
            <button
              key={song.Id}
              onClick={() => playAudio(song.Id)}
              className="flex gap-2 pr-4 items-center bg-neutral-900 rounded-md"
            >
              <img src={image} className="w-10 h-10" />
              <div>{song.Name}</div>
              <div className="ml-auto">{song.IndexNumber}</div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default AlbumPage;
