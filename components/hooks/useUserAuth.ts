import { create } from "zustand";

export const useUserAuth = create<{
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
