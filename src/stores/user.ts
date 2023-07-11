import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { clientInfo } from "../utils/jellyfin";

interface User {
  id: string;
  username: string;
  token: string;
}

interface UserListState {
  users: { [key: string]: User };
  currentUser: User | null;
  getAuthData: () => string;
  switchUser: (user: User | null) => void;
  addUser: (user: User) => void;
  removeUser: (id: string) => void;
}

const useUserListStore = create<UserListState>()(
  persist(
    (set, get) => ({
      users: {},
      currentUser: null,
      getAuthData: () => {
        const { currentUser } = get();

        if (!currentUser) {
          return "Invalid user";
        }

        return `${clientInfo}, Token=${currentUser.token}`;
      },
      switchUser: (user) => set({ currentUser: user }),
      addUser: (user) =>
        set(({ users }) => {
          const { switchUser } = get();
          switchUser(user);

          users[user.id] = user;
          return { users: { ...users } };
        }),
      removeUser: (id) =>
        set(({ users }) => {
          const { switchUser } = get();
          switchUser(null);

          delete users[id];
          return { users: { ...users } };
        }),
    }),
    { name: "user-list" },
  ),
);

export default useUserListStore;
