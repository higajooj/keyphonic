import { httpClient } from "../httpClient";
import {
  CreateProductInput,
  CreateProductResponse,
  GetProductByIdResponse,
  GetProductsParams,
  GetProductsResponse,
  UpdateProductInput,
  UpdateProductResponse,
} from "./types";

class ProductService {
  async getProducts(params?: GetProductsParams) {
    const { data } = await httpClient
      .get<GetProductsResponse>("product", { params })
      .catch((e) => {
        console.log("service: ", e?.response?.data || e);
        throw e?.response?.data || e;
      });

    return data;
  }

  async getProductById(id: string) {
    const { data } = await httpClient
      .get<GetProductByIdResponse>(`product/${id}`)
      .catch((e) => {
        throw e?.response?.data || e;
      });

    return data;
  }

  async createProduct(input: CreateProductInput) {
    const { data } = await httpClient
      .post<CreateProductResponse>("product", input)
      .catch((e) => {
        throw e?.response?.data || e;
      });

    return data;
  }

  async updateProduct(id: string, input: UpdateProductInput) {
    const { data } = await httpClient
      .put<UpdateProductResponse>(`product/${id}`, input)
      .catch((e) => {
        throw e?.response?.data || e;
      });

    return data;
  }

  async deleteProduct(id: string) {
    const { data } = await httpClient
      .delete<{ success: true }>(`product/${id}`)
      .catch((e) => {
        throw e?.response?.data || e;
      });

    return data;
  }

  async uploadProductPhoto(id: string, file: File) {
    const formData = new FormData();
    formData.append("file", file);

    const { data } = await httpClient
      .post<{ success: true }>(`product/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .catch((e) => {
        throw e?.response?.data || e;
      });

    return data;
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default new ProductService();
