export const ProductCategoryValues = ["OTHER", "HEADPHONE", "KEYBOARD"] as const;
export type ProductCategory = "OTHER" | "HEADPHONE" | "KEYBOARD";
export type StatusProduct = "CRITIC" | "FULL" | "EMPTY";

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  qtd: number;
  category: ProductCategory;
  status: StatusProduct;
  galery: string[];
  isActive: true;
  createdAt: string;
  updatedAt: string;
};
