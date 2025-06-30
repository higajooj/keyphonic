"use client";

import Link from "next/link";

const ProductCategories = () => {
  return (
    <div className="flex gap-x-2 font-semibold">
      <Link className="rounded-full bg-black px-4 py-2 text-slate-100" href="products/new">
        Keyboards
      </Link>

      <Link className="rounded-full bg-black px-4 py-2 text-slate-100" href="products/new">
        Headphones
      </Link>
    </div>
  );
};

export default ProductCategories;
