import Image from "next/image";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";

const ProductImagesCarousel = ({ urls }: { urls: string[] }) => {
  return (
    <Carousel className=" max-w-sm" opts={{ align: "start" }} orientation="vertical">
      <CarouselContent className="-mt-2 h-[500px]">
        {urls?.map((url) => (
          <CarouselItem className="shrink basis-1/4 pt-2" key={url}>
            <Image
              alt="Keyboard image"
              className="w-32 rounded-lg border-2 border-black"
              height={100}
              src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${url}`}
              width={100}
            />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};

export default ProductImagesCarousel;
