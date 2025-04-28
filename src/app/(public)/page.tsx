import CaterogyCarousel from "@/components/home/category-carousel";
import HighlightsCarousel from "@/components/home/highlights-carousel";
import ProductCategories from "@/components/home/product-categories";
import Container from "@/components/keyphonic/container";

const Home = () => {
  return (
    <>
      <Container>
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
      </Container>
    </>
  );
};

export default Home;
