import { Link } from "react-router-dom";

const Auth: React.FC = () => {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-neutral-950">
      <form className="flex flex-col justify-center items-center bg-neutral-900 p-6 gap-4 rounded-sm">
        <div className="flex flex-col items-center gap-1">
          <h1 className="text-indigo-50 text-2xl">Authorization</h1>
          <span className="text-indigo-50 text-lg">
            log in to jellyfin server
          </span>
        </div>
        <input
          type="text"
          name="username"
          placeholder="Username"
          autoFocus
          className="bg-neutral-800 p-2 rounded-md text-violet-50"
        />
        <input
          type="password"
          name="password"
          placeholder="••••••••"
          autoFocus
          className="bg-neutral-800 p-2 rounded-md text-violet-50"
        />
        <button
          type="submit"
          className="bg-violet-600 px-4 py-2 rounded-sm text-violet-50 w-full font-medium"
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
