import { PaginationParams, PaginationType } from "../types";

export interface GetOrdersParams extends PaginationParams {
  search?: string;
  category?: string;
}

type OrderItem = {
  id: string;
  qtd: number;
  price: number;
  orderId: string;
  productId: string;
  createdAt: string;
  updatedAt: string;
};

export type Address = {
  id: string;
  street: string;
  number: string;
  neighborhood: string;
  zip_code: string;
  complement: string | null;
  city: string;
  state: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

type PaymentMethod = "CASH" | "CREDIT_CARD" | "DEBIT_CARD";

type OrderStatus = "PENDING" | "REFUSED" | "COMPLETED"

export type Order = {
  id: string;
  addressId: string;
  paymentMethod: PaymentMethod;
  status: OrderStatus
  delivery_fee: number;
  qtd: number;
  total: number;
  OrderItem: OrderItem[];
  address: Address;
  createdAt: string;
  updatedAt: string;
};

export type GetOrdersResponse = {
  data: Order[];
  pagination: PaginationType;
};

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

export type UpdateOrderInput = Partial<
  Pick<CreateOrderInput, "addressId" | "paymentMethod">
> & {
  delivery_fee?: number;
};

export type UpdateOrderResponse = CreateOrderResponse;
