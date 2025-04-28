import ProductImagesCarousel from "@/components/products/product-images-carousel";

const ProductPage = () => {
  return (
    <div className="flex justify-center gap-x-8">
      <ProductImagesCarousel />

      <div className="flex border-2">
        <span>really long text...</span>
      </div>
    </div>
  );
};

export default ProductPage;
