import OrderService from "@/services/OrderService";
import { GetOrdersParams, Order } from "@/services/OrderService/types";
import { useEffect, useState } from "react";

export const useOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [params, setParams] = useState<GetOrdersParams>({});

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
