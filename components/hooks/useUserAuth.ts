import { create } from "zustand";

const useUserAuth = create<{
  shown: boolean;
  openModalAuth: () => void;
  closeModalAuth: () => void;
}>((set) => ({
  shown: false,
  loggedIn: false,
  openModalAuth: () =>
    set(() => ({
      shown: true,
    })),
  closeModalAuth: () =>
    set(() => ({
      shown: false,
    })),
}));

export default useUserAuth;
