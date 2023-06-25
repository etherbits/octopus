import { create } from "zustand";

interface UserState {
  username: string
  token: string

}

const useUserStore = create<UserState>((set, get) => ({
  username: "",
  token: ""
}));

export default useUserStore;
