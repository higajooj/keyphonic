import { Address } from "./Address";
import { Product } from "./Product";

export type PaymentMethod = "CASH" | "CREDIT_CARD" | "DEBIT_CARD";

type OrderStatus = "PENDING" | "REFUSED" | "COMPLETED";

export type OrderItem = {
  id: string;
  qtd: number;
  price: number;
  orderId: string;
  productId: string;
  product?: Product;
  createdAt: string;
  updatedAt: string;
};

export type Order = {
  id: string;
  addressId: string;
  paymentMethod: PaymentMethod;
  status: OrderStatus;
  delivery_fee: number;
  qtd: number;
  total: number;
  OrderItem: OrderItem[];
  address: Address;
  createdAt: string;
  updatedAt: string;
};