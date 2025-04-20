"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const formatYAxisLabel = (value: number | string) => {
  const num = typeof value === "string" ? parseFloat(value) : value;

  if (isNaN(num)) return "0";

  const length = Math.abs(num).toString().length;

  if (length > 9) return num / 1_000_000_000 + "B";

  if (length > 6) return num / 1_000_000 + "M";

  if (length > 3) return num / 1_000 + "k";

  return `${num}`;
};

interface OrdersChartProps {
  chartConfig: ChartConfig;
  chartData: { month: string; value: number }[];
}

export function OrdersChart({ chartConfig, chartData }: OrdersChartProps) {
  return (
    <ChartContainer config={chartConfig} className="w-full aspect-[864/310]">
      <BarChart accessibilityLayer data={chartData} barSize={30}>
        <CartesianGrid vertical={false} stroke="#E5E5E5" strokeDasharray="12" />
        <YAxis tickFormatter={(value) => formatYAxisLabel(value)} />
        <XAxis
          dataKey="month"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Bar
          dataKey="value"
          fill={"#E5E5E5"}
          activeBar={{ fill: "var(--color-value)" }}
          radius={8}
        />
      </BarChart>
    </ChartContainer>
  );
}
