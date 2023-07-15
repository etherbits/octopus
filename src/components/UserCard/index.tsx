import { useState } from "react";
import { useQuery } from "react-query";
import useUserListStore from "../../stores/user";

const UserCard = () => {
  const switchUser = useUserListStore((state) => state.switchUser);
  const currentUser = useUserListStore((state) => state.currentUser!);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const { data: image } = useQuery(
    `profile-${currentUser.id}-image`,
    async () => {
      const res = await fetch(
        `http://localhost:8096/Users/${currentUser.id}/images/Primary`,
      );
      if (!res.ok) return;
      const imageBlob = await res.blob();
      return URL.createObjectURL(imageBlob);
    },
  );

  return (
    <div className="relative h-8 my-auto">
      <button
        onClick={() => {
          setIsDropdownOpen((state) => !state);
        }}
        className="rounded-md outline outline-2 outline-neutral-800 shadow"
      >
        <img src={image} className="w-8" />
      </button>
      {isDropdownOpen && (
        <div className="absolute flex flex-col items-start right-0 mt-4 top-full w-48 px-4 py-3 bg-neutral-950 rounded-md shadow text-sm text-neutral-200">
          <button onClick={() => switchUser(null)} className="px-2 py-1">
            Settings
          </button>
          <button onClick={() => switchUser(null)} className="px-2 py-1">
            Switch account
          </button>
          <button onClick={() => switchUser(null)} className="px-2 py-1">
            Sign out
          </button>
        </div>
      )}
    </div>
  );
};

export default UserCard;
