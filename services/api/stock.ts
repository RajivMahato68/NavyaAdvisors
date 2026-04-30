import data from "@/data/stocks.json";

export const fetchDashboardData = async () => {
  await new Promise((res) => setTimeout(res, 800));

  const stocks = data.stocks;

  const topGainers = [...stocks]
    .sort((a, b) => b.change - a.change)
    .slice(0, 3);

  const topLosers = [...stocks]
    .sort((a, b) => a.change - b.change)
    .slice(0, 3);

  const topTurnover = [...stocks]
    .sort((a, b) => b.turnover - a.turnover)
    .slice(0, 3);

  return {
    topGainers,
    topLosers,
    topTurnover,
  };
};