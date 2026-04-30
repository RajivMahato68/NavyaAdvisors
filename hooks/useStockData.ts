import { useEffect, useState } from "react";
import {
  fetchStockData,
} from "@/services/api/stockApi";
import { fetchDashboardData } from "@/services/api/stock";


type ChartData = {
  labels: string[];
  priceData: { labels: string[]; datasets: { data: number[] }[] };
  volumeData: { labels: string[]; datasets: { data: number[] }[] };
};

type DashboardData = {
  topGainers: any[];
  topLosers: any[];
  topTurnover: any[];
};

export const useStockData = (symbol: string) => {
  const [chartData, setChartData] = useState<ChartData | null>(null);
  const [dashboardData, setDashboardData] =
    useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const [chartRes, dashboardRes] = await Promise.all([
          fetchStockData(symbol),
          fetchDashboardData(),
        ]);

        setChartData(chartRes);
        setDashboardData(dashboardRes);
      } catch (err) {
        console.log("Error:", err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [symbol]);

  return { chartData, dashboardData, loading };
};