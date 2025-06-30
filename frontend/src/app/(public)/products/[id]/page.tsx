"use client";

import Image from "next/image";
import { useParams } from "next/navigation";
import ProductImagesCarousel from "@/components/products/product-images-carousel";
import { Button } from "@/components/ui/button";
import { useProduct } from "@/hooks/useProduct";

const ProductPage = () => {
  const params = useParams();
  const productId = (params.id || "") as string;
  const { product } = useProduct(productId);

  return (
    <div className="mt-4 flex justify-center gap-x-8">
      <ProductImagesCarousel urls={product?.galery!} />

      {product && (
        <Image
          alt="Product image"
          className="h-[500px] w-[500px] rounded-lg border-2 border-black"
          height={500}
          src={product ? `${process.env.NEXT_PUBLIC_API_BASE_URL}${product?.galery[0]}` : ""}
          width={500}
        />
      )}

      <div className="flex max-w-96 flex-col gap-y-4 rounded-lg border-2 p-4">
        <h1 className="font-bold text-3xl">{product?.name}</h1>

        <p>{product?.description}</p>

        <Button className="self-end font-semibold text-xs" size="sm" variant="outline">
          Add to cart
        </Button>
      </div>
    </div>
  );
};

export default ProductPage;
