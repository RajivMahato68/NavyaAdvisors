import { useWatchlistStore } from "@/app/store/useWatchlistStore";
import { fetchWatchlist } from "@/services/api/watchlist";
import { useQuery } from "@tanstack/react-query";


export const useWatchlistQuery = () => {
  const refreshKey = useWatchlistStore((state) => state.refreshKey);

  return useQuery({
    queryKey: ["watchlist", refreshKey],
    queryFn: fetchWatchlist,
  });
};