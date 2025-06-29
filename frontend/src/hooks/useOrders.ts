import { useEffect, useState } from "react";
import { Order } from "@/entities/Order";
import OrderService from "@/services/OrderService";
import { GetOrdersParams } from "@/services/OrderService/types";

export const useOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [params, setParams] = useState<GetOrdersParams>({ limit: 999 });

  useEffect(() => {
    const fetchOrders = async () => {
      const { data, pagination } = await OrderService.getOrders(params);
      setOrders(data);
      setParams((s) => {
        if (s.skip === pagination.skip) return s;
        return { ...s, ...pagination };
      });
    };

    fetchOrders();
  }, [params]);

  const handleSearch = (search: string) => {
    setParams((s) => ({ ...s, skip: 0, search }));
  };

  return { orders, handleSearch };
};
