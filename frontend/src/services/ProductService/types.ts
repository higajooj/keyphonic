import { Product, ProductCategory } from "@/entities/Product";
import { PaginationParams, PaginationType } from "../types";

export interface GetProductsParams extends PaginationParams {
  search?: string;
  category?: string;
}

export type GetProductsResponse = {
  data: Product[];
  pagination: PaginationType;
};

export type GetProductByIdResponse = Product & {};

export interface CreateProductInput {
  name: string;
  description: string;
  price: number;
  qtd: number;
  category: ProductCategory;
}

export type CreateProductResponse = Product & {};

export type UpdateProductInput = Partial<CreateProductInput> & {};

export type UpdateProductResponse = CreateProductResponse;
