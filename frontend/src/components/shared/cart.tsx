"use client";

import { useLocalStorage } from "@uidotdev/usehooks";
import { ShoppingCart, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useProducts } from "@/hooks/useProducts";

const Cart = () => {
  const [cart, setCart] = useLocalStorage("cart", {});
  const { products } = useProducts();

  const getProduct = (id: string) => products.find((p) => p.id === id);
  const handleQtyChange = (productId: string, action: "+" | "-") => {
    const newQty = action === "+" ? cart[productId] + 1 : cart[productId] - 1;

    if (newQty > 0)
      setCart((prev) => ({
        ...prev,
        [productId]: newQty,
      }));
    else
      setCart((prev) => {
        delete prev[productId];

        return prev;
      });
  };

  return (
    <Drawer direction="right">
      <DrawerTrigger>
        <div className="flex items-center gap-x-2 rounded-lg bg-black p-2 text-slate-100">
          <ShoppingCart size={16} />
          <span>Cart</span>
        </div>
      </DrawerTrigger>

      <DrawerContent className="w-[1200px]">
        <DrawerHeader>
          <DrawerTitle>Cart</DrawerTitle>

          {Object.keys(cart).map((productId) => {
            const product = getProduct(productId);

            return (
              <div className="flex gap-x-1 rounded-mg border p-2" key={productId}>
                <Image
                  alt="Keyboard image"
                  className="w-32 rounded-lg border border-black"
                  height={100}
                  src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${product?.galery?.[0]}`}
                  width={100}
                />

                <div className="flex flex-col">
                  <h3 className="font-semibold text-sm">{product?.name}</h3>

                  {/* <span className="text-xs">color: red</span> */}
                </div>

                <div className="flex flex-col items-center justify-end">
                  <span>$ {product?.price / 100}</span>

                  <div className="flex items-baseline">
                    <Button
                      onClick={(e) => {
                        e.preventDefault;
                        handleQtyChange(productId, "-");
                      }}
                      variant="ghost"
                    >
                      -
                    </Button>

                    <span className="p-1">{cart[productId]}</span>

                    <Button
                      onClick={(e) => {
                        e.preventDefault;
                        handleQtyChange(productId, "+");
                      }}
                      variant="ghost"
                    >
                      +
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </DrawerHeader>

        <DrawerFooter>
          <div className="flex justify-end gap-x-2">
            <Link className="rounded-md bg-black p-1 text-white" href="/checkout">
              Go to checkout
            </Link>
            <DrawerClose className="self-center rounded-sm bg-black text-white">
              <X />
            </DrawerClose>
          </div>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default Cart;
