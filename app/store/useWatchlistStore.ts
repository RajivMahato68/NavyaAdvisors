import { create } from "zustand";

type WatchlistStore = {
  search: string;
  setSearch: (text: string) => void;

  refreshKey: number;
  refreshWatchlist: () => void;
};

export const useWatchlistStore = create<WatchlistStore>((set) => ({
  search: "",
  setSearch: (text) => set({ search: text }),

  refreshKey: 0,
  refreshWatchlist: () =>
    set((state) => ({
      refreshKey: state.refreshKey + 1,
    })),
}));