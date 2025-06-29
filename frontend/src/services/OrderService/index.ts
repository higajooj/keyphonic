import { httpClient } from "../httpClient";
import {
  CreateOrderInput,
  CreateOrderResponse,
  GetOrderByIdResponse,
  GetOrdersParams,
  GetOrdersResponse,
  GetStatsResponse,
  UpdateOrderInput,
  UpdateOrderResponse,
} from "./types";

class OrderService {
  async getOrders(params?: GetOrdersParams) {
    const { data } = await httpClient.get<GetOrdersResponse>("order", { params }).catch((e) => {
      console.log("service: ", e?.response?.data || e);
      throw e?.response?.data || e;
    });

    return data;
  }

  async getOrdersStats() {
    const { data } = await httpClient.get<GetStatsResponse>("order/stats").catch((e) => {
      console.log("service: ", e?.response?.data || e);
      throw e?.response?.data || e;
    });

    return data;
  }

  async getOrderById(id: string) {
    const { data } = await httpClient.get<GetOrderByIdResponse>(`order/${id}`).catch((e) => {
      throw e?.response?.data || e;
    });

    return data;
  }

  async createOrder(input: CreateOrderInput) {
    const { data } = await httpClient.post<CreateOrderResponse>("order", input).catch((e) => {
      throw e?.response?.data || e;
    });

    return data;
  }

  async updateOrder(id: string, input: UpdateOrderInput) {
    const { data } = await httpClient.put<UpdateOrderResponse>(`order/${id}`, input).catch((e) => {
      throw e?.response?.data || e;
    });

    return data;
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new OrderService();
