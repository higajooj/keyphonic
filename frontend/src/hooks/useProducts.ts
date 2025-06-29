import { useEffect, useState } from "react";
import { Product } from "@/entities/Product";
import ProductService from "@/services/ProductService";
import { GetProductsParams } from "@/services/ProductService/types";

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [params, setParams] = useState<GetProductsParams>({ limit: 999 });

  useEffect(() => {
    const fetchProducts = async () => {
      const { data, pagination } = await ProductService.getProducts(params);
      setProducts(data);
      setParams((s) => {
        if (s.skip === pagination.skip) return s;
        return { ...s, ...pagination };
      });
    };

    fetchProducts();
  }, [params]);

  const handleSearch = (search: string) => {
    setParams((s) => ({ ...s, skip: 0, search }));
  };

  return { products, handleSearch };
};
