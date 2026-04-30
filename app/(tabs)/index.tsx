import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, View, Text } from "react-native";

import Header from "../components/Header";
import LineChartComponent from "../components/charts/LineChartComponent";
import BarChartComponent from "../components/charts/BarChartComponent";
import StockList from "../components/charts/StockList";
import TabButton from "../components/TabButton";

import { useStockData } from "@/hooks/useStockData";
import { fetchDashboardData } from "@/services/api/stock";
import { useTheme } from "@/context/ThemeContext";
import { getThemeColors } from "../utils/theme";

type DashboardData = {
  topGainers: any[];
  topLosers: any[];
  topTurnover: any[];
};

export default function DashBoard() {
  const { theme } = useTheme();
   const colors = getThemeColors(theme);

  const { chartData, loading } = useStockData("NABIL");

  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);

  const [activeTab, setActiveTab] = useState<"gainers" | "losers" | "turnover">(
    "gainers"
  );

  useEffect(() => {
    const load = async () => {
      const res = await fetchDashboardData();
      setDashboardData(res);
    };

    load();
  }, []);

  return (
    <SafeAreaView className={`flex-1 ${colors.background}`}>
      {/* HEADER  */}
      <Header title="Navya Advisors" />

      <ScrollView className="">

        {/* LINE CHART */}
        <View className={`${colors.card} rounded-xl  mb-4`}>
          <LineChartComponent
            data={
              chartData?.priceData ?? {
                labels: [],
                datasets: [{ data: [] }],
              }
            }
            loading={loading}
          />
        </View>

        {/* BAR CHART */}
        <View className={`${colors.card} rounded-xl  mb-4`}>
          <BarChartComponent
            data={
              chartData?.volumeData ?? {
                labels: [],
                datasets: [{ data: [] }],
              }
            }
            loading={loading}
          />
        </View>

        {/* TAB SECTION */}
        <View className={`flex-row rounded-xl overflow-hidden ${colors.card}`}>
          <TabButton
            title="Top Gainers"
            active={activeTab === "gainers"}
            onPress={() => setActiveTab("gainers")}
          />
          <TabButton
            title="Top Losers"
            active={activeTab === "losers"}
            onPress={() => setActiveTab("losers")}
          />
          <TabButton
            title="Turnover"
            active={activeTab === "turnover"}
            onPress={() => setActiveTab("turnover")}
          />
        </View>

        {/* LISTS */}
        <View className="mt-4">

          {activeTab === "gainers" && (
            <StockList
              title="Top Gainers"
              stocks={dashboardData?.topGainers ?? []}
            />
          )}

          {activeTab === "losers" && (
            <StockList
              title="Top Losers"
              stocks={dashboardData?.topLosers ?? []}
            />
          )}

          {activeTab === "turnover" && (
            <StockList
              title="Top Turnover"
              stocks={dashboardData?.topTurnover ?? []}
            />
          )}

        </View>
      </ScrollView>
    </SafeAreaView>
  );
}