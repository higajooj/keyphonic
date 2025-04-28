import * as React from "react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const HighlightsCarousel = () => {
  return (
    <Carousel className="w-9/10 overflow-hidden rounded-md">
      <CarouselContent className="h-96">
        <CarouselItem>
          <div className="flex h-full items-center justify-between rounded-md bg-black px-24 py-4 text-slate-100">
            <div className="flex flex-col gap-y-4">
              <h1 className="font-semibold text-3xl">
                Best deal online on keyboards
              </h1>
              <h2 className="font-bold text-6xl">KEYCHRON</h2>
              <h2 className="font-bold text-6xl">Q3 PRO</h2>
              <span className="font-semibold text-2xl">UP to 20% OFF</span>
            </div>

            <div className="flex">
              <span>image...</span>
            </div>
          </div>
        </CarouselItem>

        <CarouselItem>
          <div className="flex h-full items-center justify-center rounded-md bg-black px-24 py-4 text-slate-100">
            <span className="font-extrabold">Another card...</span>
          </div>
        </CarouselItem>
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export default HighlightsCarousel;
