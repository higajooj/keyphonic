import { ShoppingCart, X } from "lucide-react";
import Image from "next/image";
import productImage from "@/assets/images/home/product-image.jpg";
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

const Cart = () => {
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

          <div className="flex gap-x-1 rounded-mg border p-2">
            <Image alt="Keyboard image" className="w-32 rounded-lg border border-black" src={productImage} />

            <div className="flex flex-col">
              <h3 className="font-semibold text-sm">Product name</h3>

              <span className="text-xs">color: red</span>
            </div>

            <div className="flex flex-col items-center justify-end">
              <span>$ 160.00</span>

              <div className="flex items-baseline">
                <Button variant="ghost">-</Button>

                <span className="p-1">3</span>

                <Button variant="ghost">+</Button>
              </div>
            </div>
          </div>
        </DrawerHeader>

        <DrawerFooter>
          <div className="flex justify-end gap-x-2">
            <Button>Go to checkout</Button>
            <DrawerClose className="bg-black text-white rounded-sm self-center">
              <X />
            </DrawerClose>
          </div>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default Cart;
