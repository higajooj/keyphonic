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
				<Button>
					<ShoppingCart />
					<span>Cart</span>
				</Button>
			</DrawerTrigger>

			<DrawerContent className="w-[1200px]">
				<DrawerHeader>
					<DrawerTitle>Cart</DrawerTitle>

					<div className="flex border rounded-mg p-2 gap-x-1">
						<Image
							alt="Keyboard image"
							className="rounded-lg w-32 border border-black"
							src={productImage}
						/>

						<div className="flex flex-col">
							<h3 className="text-sm font-semibold">Product name</h3>

							<span className="text-xs">color: red</span>
						</div>

						<div className="flex flex-col justify-end items-center">
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
						<DrawerClose>
							<Button variant="outline">
								<X />
							</Button>
						</DrawerClose>
					</div>
				</DrawerFooter>
			</DrawerContent>
		</Drawer>
	);
};

export default Cart;
