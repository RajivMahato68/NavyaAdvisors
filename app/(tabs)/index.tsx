import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, View } from "react-native";

import Header from "../components/Header";
import LineChartComponent from "../components/charts/LineChartComponent";
import BarChartComponent from "../components/charts/BarChartComponent";
import StockList from "../components/charts/StockList";

import { useStockData } from "@/hooks/useStockData";
import { fetchDashboardData } from "@/services/api/stock";


import TabButton from "../components/TabButton";

type DashboardData = {
  topGainers: Array<any>;
  topLosers: Array<any>;
  topTurnover: Array<any>;
};

export default function DashBoard() {
  const { chartData, loading } = useStockData("NABIL");

  const [dashboardData, setDashboardData] = useState<DashboardData | null>(
    null,
  );

  const [activeTab, setActiveTab] = useState<"gainers" | "losers" | "turnover">(
    "gainers",
  );

  useEffect(() => {
    const load = async () => {
      const res = await fetchDashboardData();
      setDashboardData(res);
    };

    load();
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <Header title="Navya Advisors" />

      <ScrollView className="p-4">
        {/* CHARTS */}
        <LineChartComponent
          data={
            chartData?.priceData ?? {
              labels: [],
              datasets: [{ data: [] }],
            }
          }
          loading={loading}
        />

        <BarChartComponent
          data={
            chartData?.volumeData ?? {
              labels: [],
              datasets: [{ data: [] }],
            }
          }
          loading={loading}
        />

        {/*  TAB SECTION */}
        <View className="flex-row bg-white rounded-xl mt-4 overflow-hidden">
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

        {/* CONDITIONAL LISTS */}
        {activeTab === "gainers" && (
          <StockList title="Top Gainers" stocks={dashboardData?.topGainers ?? []} />
        )}

        {activeTab === "losers" && (
          <StockList title="Top Losers" stocks={dashboardData?.topLosers ?? []} />
        )}

        {activeTab === "turnover" && (
          <StockList title="Top Turnover" stocks={dashboardData?.topTurnover ?? []} />
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
