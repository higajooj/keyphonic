import { useOrder } from "@/hooks/useOrder";
import { formatMoney } from "@/lib/utils";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import { ProductCard } from "./ProductCard";
import Status, { StatusEnum } from "./Status";

interface SheetDetailOrderProps {
  orderId: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export const SheetDetailOrder = ({ orderId, ...props }: SheetDetailOrderProps) => {
  const { order } = useOrder(orderId);
  if (!order || !orderId) return null;

  const orderInfos = [
    {
      label: "#Pedido",
      value: `${order.id}`,
    },
    {
      label: "Endereço de entrega",
      value: `${order.address.street}, ${order.address.number}, ${order.address.neighborhood}
      ${order.address.city}/${order.address.state}, CEP ${order.address.zip_code}`,
    },
    {
      label: "Data",
      value: format(order.createdAt, "eeeeee, dd MMM, HH:mm", { locale: ptBR }),
    },
    {
      label: "Qtd. Items",
      value: order.qtd,
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
              <AccordionTrigger className="font-semibold">Produtos</AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-col gap-4">
                  {order.OrderItem.map((o) => {
                    const p = o.product;
                    return (
                      <ProductCard
                        key={o.id}
                        name={p?.name || "produto não encotrado"}
                        price={o.price}
                        imgUrl={p?.galery?.[0]}
                        salesCount={o.qtd}
                      />
                    );
                  })}
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="order-info">
              <AccordionTrigger className="font-semibold">Pedido</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2">
                  {orderInfos.map(({ label, value }) => (
                    <div className="flex items-baseline gap-2" key={label}>
                      <p className="text-sm text-gray-500">{label}</p>
                      <div className="h-0 grow border border-dashed" />
                      <span className="max-w-[238px] text-right text-xs font-semibold">{value}</span>
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
