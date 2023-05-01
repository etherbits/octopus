import { useAtom } from "jotai";
import { authAtom } from "../Auth";
import { useState } from "react";
import { useQuery } from "react-query";

const Home: React.FC = () => {
  const [auth] = useAtom(authAtom);
  const { data } = useQuery("artists", async () => {
    const res = await fetch("http://localhost:8096/Artists", {
      headers: {
        Authorization: auth,
      },
    });

    const artists = await res.json();
    console.log(artists)
    return artists.Items;
  });

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-neutral-950 p-8">
      <button className="text-violet-50 bg-violet-500 rounded-md px-4 py-2">
        Get Data
      </button>
      {data && (
        <pre className="max-w-4xl whitespace-normal text-violet-50 break-all">
          {data.map((item: any) => (
            <div key={item.Id}>{item.Name}</div>
          ))}
        </pre>
      )}
    </div>
  );
};

export default Home;
