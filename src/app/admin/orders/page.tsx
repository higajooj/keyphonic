import { OrdersChart } from "@/components/admin/OrdersChart";
import { Button } from "@/components/ui/button";
import { ChartConfig } from "@/components/ui/chart";
import { Filter } from "lucide-react";

export default function Page() {
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

  return (
    <div className="grow flex flex-col gap-8">
      <div className="flex gap-5">
        <div className="grow  border rounded-xl p-5">
          <div className="flex justify-between mb-4">
            <p className="font-semibold text-xl">Pedidos R$</p>
            <Button variant='outline' size='sm'>
              <Filter/>
              Filtrar
            </Button>
          </div>
          <OrdersChart chartConfig={chartConfig} chartData={chartData} />
        </div>
        <div className="bg-gray-500 min-w-[412px]"> statistics </div>
      </div>
      <div className="bg-amber-500 grow">table</div>
    </div>
  );
}
