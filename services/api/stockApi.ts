import data from "@/data/stocks.json";


export const fetchStockData = async (symbol: string) => {
  await new Promise((res) => setTimeout(res, 800));

  const cleanSymbol = (symbol ?? "").trim().toUpperCase();


  const stock = data.stocks.find(
    (item) => item.symbol.toUpperCase() === cleanSymbol
  );


  if (!stock) {
    console.log(
      "Available symbols:",
      data.stocks.map((s) => s.symbol)
    );

    throw new Error(`Stock not found: ${cleanSymbol}`);
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