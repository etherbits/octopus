import { useAtom } from "jotai";
import { authAtom } from "../Auth";
import { useState } from 'react'

const Home: React.FC = () => {
  const [data, setData] = useState([])
  const [auth] = useAtom(authAtom);
  const getData = async () => {
    const res = await fetch("http://localhost:8096/Artists", {
      headers: {
        Authorization: auth,
      },
    });

    const data = await res.json();
    console.log(data.Items)
    setData(data.Items)
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-neutral-950 p-8">
      <button
        onClick={() => getData()}
        className="text-violet-50 bg-violet-500 rounded-md px-4 py-2"
      >
        Get Data
      </button>
      <pre className="max-w-4xl whitespace-normal text-violet-50 break-all">{data.map((item) => <div>{item.Name}</div>)}</pre>
    </div>
  );
};

export default Home;
