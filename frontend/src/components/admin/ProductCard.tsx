import { Package } from "lucide-react";
import { formatMoney } from "@/lib/utils";
import { Pill } from "./Pill";

interface ProductCardProps {
  name: string;
  price: number;
  imgUrl?: string;
  salesCount?: number;
}
export const ProductCard = ({ name, price, imgUrl, salesCount }: ProductCardProps) => {
  return (
    <div className="flex justify-between rounded bg-gray-100 p-5">
      <div>
        {imgUrl ? (
          <img className="aspect-square w-12 rounded-full" src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${imgUrl}`} />
        ) : (
          <Package className="rounded-full border-4 border-black p-1" size={48} />
        )}
        <p className="text-sm font-semibold">{name}</p>
        {salesCount && <p className="text-xs text-gray-500">{salesCount} items comprados</p>}
      </div>
      <Pill className="text-xs">{formatMoney(price)}</Pill>
    </div>
  );
};
