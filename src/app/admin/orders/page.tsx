import { OrdersChart } from "@/components/admin/OrdersChart";
import { Button } from "@/components/ui/button";
import { ChartConfig } from "@/components/ui/chart";
import { Input } from "@/components/ui/input";
import { formatMoney } from "@/lib/utils";
import { Calendar, Filter } from "lucide-react";

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

  return (
    <div className="grow flex flex-col gap-8">
      <div className="flex gap-5 min-[1140px]:flex-row flex-col">
        <div className="grow border rounded-xl p-5">
          <div className="flex justify-between mb-4">
            <p className="font-semibold text-xl">Pedidos R$</p>
            <Button
              variant="outline"
              size="sm"
              className="font-semibold text-xs"
            >
              <Filter />
              Filtrar
            </Button>
          </div>
          <OrdersChart chartConfig={chartConfig} chartData={chartData} />
        </div>

        <div className="min-w-[412px] border rounded-xl p-8  pb-0 flex flex-col justify-start">
          <div className="flex justify-between items-center">
            <p className="font-semibold text-lg">Resultado</p>
            <Button
              variant="outline"
              size="sm"
              className="font-semibold text-xs"
            >
              Hoje
              <Calendar />
            </Button>
          </div>

          <div className="flex flex-col justify-between xl:justify-evenly py-4 xl:py-0 grow gap-2">
            {statisticData.map(({ count, label, value }) => (
              <div key={label} className="flex justify-between items-end">
                <span>
                  <p className="text-xs font-medium">{label}:</p>
                  <p className="text-4xl font-bold">{formatMoney(value)}</p>
                </span>
                <p className="font-medium text-gray-500">{count} pedidos</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="grow flex flex-col gap-4">
        <Input name="search" placeholder="Pesquisar" variant="search" />
      
      </div>
    </div>
  );
}
