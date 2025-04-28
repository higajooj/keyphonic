import Image from "next/image";
import Link from "next/link";
import * as React from "react";
import productImage from "@/assets/images/home/product-image.jpg";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

const CaterogyCarousel = () => {
  return (
    <Carousel className="w-full">
      <CarouselContent>
        <CarouselItem className="basis-1/3">
          <Link
            className="flex flex-col items-center font-semibold text-sm"
            href="/products/123"
          >
            <Image
              alt="Keyboard image"
              className="w-96 rounded-lg border-2 border-black"
              src={productImage}
            />
            <span>Keychron Q3</span>
            <span className="font-bold">$ 160.00</span>
          </Link>
        </CarouselItem>

        <CarouselItem className="basis-1/3">
          <div className="flex flex-col items-center font-semibold text-sm">
            <Image
              alt="Keyboard image"
              className="w-96 rounded-lg border-2 border-black"
              src={productImage}
            />
            <span>Keychron Q3</span>
            <span className="font-bold">$ 160.00</span>
          </div>
        </CarouselItem>

        <CarouselItem className="basis-1/3">
          <div className="flex flex-col items-center font-semibold text-sm">
            <Image
              alt="Keyboard image"
              className="w-96 rounded-lg border-2 border-black"
              src={productImage}
            />
            <span>Keychron Q3</span>
            <span className="font-bold">$ 160.00</span>
          </div>
        </CarouselItem>
      </CarouselContent>
    </Carousel>
  );
};

export default CaterogyCarousel;
