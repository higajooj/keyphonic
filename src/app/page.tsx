import { CircleUser, MapPin } from "lucide-react";
import Link from "next/link";
import Footer from "@/components/footer";
import CaterogyCarousel from "@/components/home/category-carousel";
import HighlightsCarousel from "@/components/home/highlights-carousel";
import ProductCategories from "@/components/home/product-categories";
import { Input } from "@/components/ui/input";

const Home = () => {
  return (
    <>
      <div className="flex items-center justify-end gap-x-2 bg-black px-4 py-2 text-gray-200 text-xs">
        <MapPin />
        <span>
          Deliver to <strong>123456</strong>
        </span>
      </div>

      <div className="mx-auto flex w-9/10 flex-col">
        <div className="flex items-baseline justify-between border-gray-200 border-b py-6">
          <h1 className="font-bold text-2xl">KeyPhonic</h1>

          <div>
            <Input name="search" variant="search" />
          </div>

          <div className="asd">
            <Link className="flex items-center gap-x-2" href="/">
              <CircleUser size={16} />
              <span>Sign up</span>
            </Link>
          </div>
        </div>

        <div className="flex justify-center border-b py-6">
          <ProductCategories />
        </div>

        <div className="flex justify-center py-6">
          <HighlightsCarousel />
        </div>

        {/* Product highlights carousel */}
        <div className="flex flex-col gap-y-24 py-6">
          <div className="flex flex-col">
            <h3 className="my-2 w-full self-start border-b text-xl">
              Grab the best deal on <strong>Keyboards</strong>
            </h3>
            <CaterogyCarousel />
          </div>

          <div className="flex flex-col">
            <h3 className="my-2 w-full self-start border-b text-xl">
              Grab the best deal on <strong>DACs</strong>
            </h3>

            <CaterogyCarousel />
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Home;
