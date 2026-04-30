import { useQuery } from "@tanstack/react-query";
import { fetchPortfolio } from "@/services/api/portfolioApi";

export const usePortfolioQuery = () => {
  return useQuery({
    queryKey: ["portfolio"],
    queryFn: fetchPortfolio,
  });
};