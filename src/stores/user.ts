import { create } from "zustand";

interface User {
  id: string
  username: string
  token: string
}

interface UserListState {
  users: { [key: string]: User }
  currentUser: User | null
  logIn: (user: User) => void
  logOut: () => void
  addUser: (user: User) => void
  removeUser: (id: string) => void
}

const useUserListStore = create<UserListState>((set, get) => ({
  users: {},
  currentUser: null,
  logIn: (user) => set({ currentUser: user }),
  logOut: () => set({ currentUser: null }),
  addUser: (user) => set(({ users }) => {
    const { logIn } = get()

    logIn(user);

    users[user.id] = user
    return { users: { ...users } }
  }),
  removeUser: (id) => set(({ users }) => {
    delete users[id];
    return { users: { ...users } }
  }),
}));

export default useUserListStore;
