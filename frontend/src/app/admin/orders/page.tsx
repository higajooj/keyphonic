"use client";
import { DataTable } from "@/components/admin/DataTable";
import { OrdersChart } from "@/components/admin/OrdersChart";
import { SheetDetailOrder } from "@/components/admin/SheetDetailsOrder";
import { Button } from "@/components/ui/button";
import { ChartConfig } from "@/components/ui/chart";
import { Input } from "@/components/ui/input";
import { formatMoney } from "@/lib/utils";
import OrderService from "@/services/OrderService";
import { Order } from "@/services/OrderService/types";
import { Calendar, Filter } from "lucide-react";
import { useEffect, useState } from "react";
import { columns } from "./columns";
const chartData = [
  { month: "January", value: 80000 },
  { month: "February", value: 200000 },
  { month: "March", value: 120000 },
  { month: "April", value: 109000 },
  { month: "May", value: 130000 },
  { month: "June", value: 140000 },
  { month: "July", value: 80000 },
  { month: "August", value: 230000 },
  { month: "September", value: 120000 },
  { month: "October", value: 190000 },
  { month: "November", value: 130000 },
  { month: "December", value: 140000 },
];

const chartConfig = {
  value: {
    label: "Vendas",
    color: "#008ecc",
  },
} satisfies ChartConfig;

const statisticData = [
  {
    label: "Pagos",
    value: 2278901,
    count: 24,
  },
  {
    label: "Em andamentos",
    value: 1153.45,
    count: 12,
  },
  {
    label: "Cancelados",
    value: 36457.89,
    count: 43,
  },
];

export default function Page() {
  const [openDetails, setOpenDetails] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState<string>("");
  const [data, setData] = useState<Order[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data: newData } = await OrderService.getOrders();
      setData(newData);
      console.log(newData);
    };

    fetchData();
  }, []);

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
            <Button
              variant="outline"
              size="sm"
              className="text-xs font-semibold"
            >
              <Filter />
              Filtrar
            </Button>
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
              Hoje
              <Calendar />
            </Button>
          </div>

          <div className="flex grow flex-col justify-between gap-2 py-4 xl:justify-evenly xl:py-0">
            {statisticData.map(({ count, label, value }) => (
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
        <Input name="search" placeholder="Pesquisar" variant="search" />
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
