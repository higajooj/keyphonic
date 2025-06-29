import { useEffect, useState } from "react";
import { Product } from "@/entities/Product";
import ProductService from "@/services/ProductService";

export const useProduct = (id: string) => {
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      const data = await ProductService.getProductById(id);
      setProduct(data);
    };

    if (id) fetchProduct();
  }, [id]);

  return { product };
};
