"use client";
import { DataTable } from "@/components/admin/DataTable";
import { OrdersChart } from "@/components/admin/OrdersChart";
import { SheetDetailOrder } from "@/components/admin/SheetDetailsOrder";
import { Button } from "@/components/ui/button";
import { ChartConfig } from "@/components/ui/chart";
import { Input } from "@/components/ui/input";
import { useOrders } from "@/hooks/useOrders";
import { useOrdersStats } from "@/hooks/useOrdersStats";
import { formatMoney } from "@/lib/utils";
import { Calendar } from "lucide-react";
import { useState } from "react";
import { columns } from "./columns";

const chartConfig = {
  value: {
    label: "Vendas",
    color: "#008ecc",
  },
} satisfies ChartConfig;

export default function Page() {
  const [openDetails, setOpenDetails] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState<string>("");
  const { orders: data, handleSearch } = useOrders();
  const { chartData, statisticsData } = useOrdersStats();

  const handleSelectOrder = (orderId: string) => {
    setSelectedOrderId(orderId);
    setOpenDetails(true);
  };

  return (
    <div className="flex grow flex-col gap-8">
      <div className="flex flex-col gap-5 min-[1140px]:flex-row">
        <div className="grow rounded-xl border p-5">
          <div className="mb-4 flex justify-between">
            <p className="text-xl font-semibold">Pedidos R$</p>
          </div>
          <OrdersChart chartConfig={chartConfig} chartData={chartData} />
        </div>

        <div className="flex flex-col justify-start rounded-xl border p-8 pb-0 sm:min-w-[412px]">
          <div className="flex items-center justify-between">
            <p className="text-lg font-semibold">Resultado</p>
            <Button
              variant="outline"
              size="sm"
              className="text-xs font-semibold"
            >
              Este ano
              <Calendar />
            </Button>
          </div>

          <div className="flex grow flex-col justify-between gap-2 py-4 xl:justify-evenly xl:py-0">
            {statisticsData.map(({ count, label, value }) => (
              <div
                key={label}
                className="flex flex-col justify-between sm:flex-row sm:items-end"
              >
                <span>
                  <p className="text-xs font-medium">{label}:</p>
                  <p className="text-2xl font-bold sm:text-4xl">
                    {formatMoney(value)}
                  </p>
                </span>
                <p className="sm:text-md text-sm font-medium text-gray-500">
                  {count} pedidos
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex grow flex-col gap-4">
        <Input
          name="search"
          placeholder="Pesquisar"
          variant="search"
          onInput={(e) => handleSearch(e.currentTarget.value)}
        />
        <DataTable
          onClickRow={(o) => handleSelectOrder(o.id)}
          columns={columns}
          data={data}
        />
        <SheetDetailOrder
          open={openDetails}
          onOpenChange={setOpenDetails}
          orderId={selectedOrderId}
        />
      </div>
    </div>
  );
}
