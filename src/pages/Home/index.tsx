import { Link } from "react-router-dom";

const Home: React.FC = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-neutral-950">
      <Link className="text-indigo-500 text-3xl" to="/auth">go to auth</Link>
    </div>
  );
};

export default Home;
