import { create } from "zustand";

interface User {
  id: string
  username: string
  token: string
}

interface UserListState {
  users: { [key: string]: User }
  addUser: (user: User) => void
  removeUser: (id: string) => void
}

const useUserListStore = create<UserListState>((set, get) => ({
  users: {},
  addUser: (user) => set(({ users }) => {
    users[user.id] = user
    return { users: { ...users } }
  }),
  removeUser: (id) => set(({ users }) => {
    delete users[id];
    return { users: { ...users } }
  }),
}));

export default useUserListStore;
