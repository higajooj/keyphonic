import { formatMoney } from "@/lib/utils";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import { ProductCard } from "./ProductCard";
import Status, { StatusEnum } from "./Status";

interface SheetDetailOrderProps {
  orderId: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const products = [
  {
    id: "asdjadjh",
    name: "Keyboard xytz",
    price: 150_00,
    imgUrl:
      "https://img.endgamegear.com/images/GATA-2601/f5ebb3e69354cb2ea4372d13f6c30894.jpg",
    salesCount: 25,
  },
  {
    id: "jiodfg",
    name: "Phone xytz",
    price: 50_00,
    salesCount: 5,
  },
];

const order = {
  id: "728ed52f",
  client: "Sarah Fernandez",
  total: 200_00,
  qty: 2,
  status: "pending",
  date: new Date("2025-02-14").toISOString(),
};

export const SheetDetailOrder = ({
  orderId,
  ...props
}: SheetDetailOrderProps) => {
  console.log("orderId:", orderId);
  const orderInfos = [
    {
      label: "#Pedido",
      value: `#${order.id}`,
    },
    {
      label: "Cliente",
      value: order.client,
    },
    {
      label: "Data",
      value: format(order.date, "eeeeee, dd MMM, HH:mm", { locale: ptBR }),
    },
    {
      label: "Qtd. Items",
      value: order.qty,
    },
    {
      label: "Total",
      value: formatMoney(order.total),
    },
    {
      label: "Status",
      value: <Status status={order.status as StatusEnum} />,
    },
  ];
  return (
    <Sheet {...props}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Detalhes do Pedido</SheetTitle>
        </SheetHeader>
        <div className="px-4">
          <Accordion type="multiple" defaultValue={["products", "order-info"]}>
            <AccordionItem value="products">
              <AccordionTrigger className="font-semibold">
                Produtos
              </AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-col gap-4">
                  {products.map((p) => (
                    <ProductCard key={p.id} {...p} />
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="order-info">
              <AccordionTrigger className="font-semibold">
                Pedido
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2">
                  {orderInfos.map(({ label, value }) => (
                    <div className="flex items-baseline gap-2" key={label}>
                      <p className="text-sm text-gray-500">{label}</p>
                      <div className="h-0 grow border border-dashed" />
                      <p className="text-xs font-semibold">{value}</p>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </SheetContent>
    </Sheet>
  );
};
