"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { Product } from "@/entities/Product";
import { useProducts } from "@/hooks/useProducts";

const CaterogyCarousel = ({ category }: { category: "HEADPHONE" | "KEYBOARD" }) => {
  const { products } = useProducts();
  const [filtered, setFiltered] = useState<Product[]>([]);

  useEffect(() => {
    setFiltered((old) => {
      return products.filter((p) => p.category == category);
    });
  }, [products]);

  return (
    <Carousel className="w-full">
      <CarouselContent>
        {filtered.map((product) => (
          <CarouselItem className="basis-1/3" key={product.id}>
            <Link className="flex flex-col items-center font-semibold text-sm" href={`/products/${product.id}`}>
              <Image
                alt="Product image"
                className="w-96 rounded-lg border-2 border-black"
                height={100}
                src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${product.galery[0]}`}
                width={100}
              />
              <span>Keychron Q3</span>
              <span className="font-bold">$ 160.00</span>
            </Link>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};

export default CaterogyCarousel;
