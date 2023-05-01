import { Link } from "react-router-dom";

const Auth: React.FC = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-neutral-950">
      <form className="flex flex-col justify-center items-center bg-neutral-900 px-6 py-4 gap-4 rounded-sm">
        <div className="flex flex-col items-center gap-1">
          <h1 className="text-indigo-200 text-2xl">Authorization</h1>
          <span className="text-indigo-200 text-lg">
            log in to jellyfin server
          </span>
        </div>
        <input
          type="text"
          name="username"
          autoFocus
          className="bg-neutral-800 p-2 rounded-md"
        />
        <input
          type="text"
          name="username"
          autoFocus
          className="bg-neutral-800 p-2 rounded-md"
        />
        <button
          type="submit"
          className="bg-violet-600 px-4 py-2 rounded-sm text-violet-50 w-full"
        >
          LOG IN
        </button>
        <Link className="text-violet-300" to="/">
          go to home
        </Link>
      </form>
    </div>
  );
};

export default Auth;
