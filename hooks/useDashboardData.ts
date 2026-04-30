import { fetchDashboardData } from "@/services/api/stock";
import { useEffect, useState } from "react";
// import { fetchDashboardData } from "@/services/api/stockApi";

interface DashboardData {
  topGainers: { symbol: string; price: number[]; volume: number[]; change: number; turnover: number; }[];
  topLosers: { symbol: string; price: number[]; volume: number[]; change: number; turnover: number; }[];
  topTurnover: { symbol: string; price: number[]; volume: number[]; change: number; turnover: number; }[];
}

export const useDashboardData = () => {
  const [data, setData] = useState<DashboardData | null>(null);

  useEffect(() => {
    fetchDashboardData().then(setData);
  }, []);

  return { data };
};