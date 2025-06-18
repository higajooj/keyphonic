import Image from "next/image";
import Link from "next/link";
import * as React from "react";
import productImage from "@/assets/images/home/product-image.jpg";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

const ProductImagesCarousel = () => {
  return (
    <Carousel
      className=" max-w-sm"
      opts={{ align: "start" }}
      orientation="vertical"
    >
      <CarouselContent className="-mt-2 h-[500px]">
        <CarouselItem className="shrink basis-1/4 pt-2">
          <Link
            className="flex flex-col items-center font-semibold text-sm"
            href="/products/123"
          >
            <Image
              alt="Keyboard image"
              className="w-32 rounded-lg border-2 border-black"
              src={productImage}
            />
          </Link>
        </CarouselItem>

        <CarouselItem className="shrink basis-1/4 pt-2">
          <div className="flex flex-col items-center font-semibold text-sm">
            <Image
              alt="Keyboard image"
              className="w-32 rounded-lg border-2 border-black"
              src={productImage}
            />
          </div>
        </CarouselItem>

        <CarouselItem className="shrink basis-1/4 pt-2">
          <div className="flex flex-col items-center font-semibold text-sm">
            <Image
              alt="Keyboard image"
              className="w-32 rounded-lg border-2 border-black"
              src={productImage}
            />
          </div>
        </CarouselItem>

        <CarouselItem className="shrink basis-1/4 pt-2">
          <div className="flex flex-col items-center font-semibold text-sm">
            <Image
              alt="Keyboard image"
              className="w-32 rounded-lg border-2 border-black"
              src={productImage}
            />
          </div>
        </CarouselItem>

        <CarouselItem className="basis-1/4 pt-2">
          <div className="flex flex-col items-center font-semibold text-sm">
            <Image
              alt="Keyboard image"
              className="w-32 rounded-lg border-2 border-black"
              src={productImage}
            />
          </div>
        </CarouselItem>
      </CarouselContent>
    </Carousel>
  );
};

export default ProductImagesCarousel;
