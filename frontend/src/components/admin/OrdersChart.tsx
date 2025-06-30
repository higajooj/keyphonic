"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

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
    <ChartContainer className="aspect-[864/310] w-full" config={chartConfig}>
      <BarChart accessibilityLayer barSize={30} data={chartData}>
        <CartesianGrid stroke="#E5E5E5" strokeDasharray="12" vertical={false} />
        <YAxis tickFormatter={(value) => formatYAxisLabel(value)} />
        <XAxis
          axisLine={false}
          dataKey="month"
          tickFormatter={(value) => value.slice(0, 3)}
          tickLine={false}
          tickMargin={10}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Bar activeBar={{ fill: "var(--color-value)" }} dataKey="value" fill={"#008fcc90"} radius={8} />
      </BarChart>
    </ChartContainer>
  );
}
