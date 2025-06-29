import { Order, PaymentMethod } from "@/entities/Order";
import { PaginationParams, PaginationType } from "../types";

export interface GetOrdersParams extends PaginationParams {
  search?: string;
  category?: string;
}

export type GetOrdersResponse = {
  data: Order[];
  pagination: PaginationType;
};

export type ChartItem = {
  month: string;
  value: number;
};

export type StatisticItem = {
  label: string;
  value: number;
  count: number;
};

export interface GetStatsResponse {
  chart: ChartItem[];
  statistics: StatisticItem[];
}

export type GetOrderByIdResponse = Order & {};

export interface CreateOrderInput {
  addressId: string;
  paymentMethod: PaymentMethod;
  items: {
    productId: string;
    quantity: number;
  }[];
}

export type CreateOrderResponse = {
  id: string;
  addressId: string;
  paymentMethod: PaymentMethod;
  delivery_fee: number;
  total: number;
  createdAt: string;
  updatedAt: string;
};

export type UpdateOrderInput = Partial<Pick<CreateOrderInput, "addressId" | "paymentMethod">> & {
  delivery_fee?: number;
};

export type UpdateOrderResponse = CreateOrderResponse;
