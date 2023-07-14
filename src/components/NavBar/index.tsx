import { Plus } from "react-feather";
import { Link, useLocation } from "react-router-dom";

const NavBar = () => {
  const { pathname } = useLocation();

  return (
    <nav className="flex text-neutral-400 text-sm rounded-md bg-neutral-800">
      <Link
        to="/album"
        className={`px-4 py-2 rounded-md ${
          pathname.includes("/album") && "text-neutral-200 bg-neutral-950"
        } hover:text-neutral-300`}
      >
        Albums
      </Link>
      <Link
        to="/artist"
        className={`px-4 py-2 rounded-md ${
          pathname.includes("/artist") && "text-neutral-200 bg-neutral-950"
        } hover:text-neutral-300`}
      >
        Artists
      </Link>
      <Link
        to="/track"
        className={`px-4 py-2 rounded-md ${
          pathname.includes("/track") && "text-neutral-200 bg-neutral-950"
        } hover:text-neutral-300`}
      >
        Tracks
      </Link>
      <Link
        to="/playlist"
        className={`px-4 py-2 rounded-md ${
          pathname.includes("/playlist") && "text-neutral-200 bg-neutral-950"
        } hover:text-neutral-300`}
      >
        Playlists
      </Link>

      <button className="px-4 py-2 rounded-md">
        <Plus size={18} strokeWidth={1.5} className="stroke-neutral-500" />
      </button>
    </nav>
  );
};

export default NavBar;
