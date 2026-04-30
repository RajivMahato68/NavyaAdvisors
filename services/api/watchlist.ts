import data from "@/data/stocks.json";

export const fetchWatchlist = async () => {
  await new Promise((res) => setTimeout(res, 500));
  return data.stocks;
};