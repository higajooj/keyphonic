import { useEffect, useState } from "react";
import OrderService from "@/services/OrderService";
import { ChartItem, StatisticItem } from "@/services/OrderService/types";

export const useOrdersStats = () => {
  const [chartData, setChartData] = useState<ChartItem[]>([]);
  const [statisticsData, setStatisticsData] = useState<StatisticItem[]>([]);
  // const [params, setParams] = useState<GetOrdersParams>({});

  useEffect(
    () => {
      const fetchOrders = async () => {
        const { chart, statistics } = await OrderService.getOrdersStats();
        setChartData(chart);
        setStatisticsData(statistics);
      };

      fetchOrders();
    },
    [
      // params
    ],
  );

  return { chartData, statisticsData };
};
