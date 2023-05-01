import { useAtom } from "jotai";
import { Link, Navigate } from "react-router-dom";
import { tokenAtom } from "../Auth";

const Home: React.FC = () => {
  const [token] = useAtom(tokenAtom)

  if (!token) return <Navigate to='/auth' />

  return (
    <div className="flex justify-center items-center min-h-screen bg-neutral-950">
      <Link className="text-indigo-500 text-3xl" to="/auth">go to auth</Link>
    </div>
  );
};

export default Home;
