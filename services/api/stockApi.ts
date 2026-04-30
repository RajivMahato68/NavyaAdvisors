import data from "@/data/stocks.json";

export const fetchStockData = async (symbol: string) => {
  await new Promise((res) => setTimeout(res, 800));

  const stock = data.stocks.find(
    (item) => item.symbol === symbol
  );

  if (!stock) {
    throw new Error("Stock not found");
  }

  return {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri"],
    priceData: {
      labels: ["Mon", "Tue", "Wed", "Thu", "Fri"],
      datasets: [{ data: stock.price }],
    },
    volumeData: {
      labels: ["Mon", "Tue", "Wed", "Thu", "Fri"],
      datasets: [{ data: stock.volume }],
    },
  };
};