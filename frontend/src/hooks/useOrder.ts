import { useEffect, useState } from "react";
import { Order } from "@/entities/Order";
import OrderService from "@/services/OrderService";

export const useOrder = (id: string) => {
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      const data = await OrderService.getOrderById(id);
      setOrder(data);
    };

    if (id) fetchOrders();
  }, [id]);

  return { order };
};
