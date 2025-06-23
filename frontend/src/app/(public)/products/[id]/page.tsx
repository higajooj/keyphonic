import { X } from "lucide-react";
import Image from "next/image";
import productImage from "@/assets/images/home/product-image.jpg";
import ProductImagesCarousel from "@/components/products/product-images-carousel";
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

const ProductPage = () => {
	return (
		<>
			<Drawer direction="right">
				<DrawerTrigger>
					<Button variant="outline">Open Drawer</Button>
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

			<div className="flex justify-center gap-x-8 mt-4">
				<ProductImagesCarousel />

				<Image
					alt="Keyboard image"
					className="rounded-lg w-[500px] h-[500px] border-2 border-black"
					src={productImage}
				/>

				<div className="flex flex-col gap-y-4 border-2 max-w-96 p-4 rounded-lg">
					<h1 className="font-bold text-3xl">Keyboard title</h1>

					<p>
						Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
						vulputate blandit consectetur. Vestibulum ante elit, molestie nec
						pellentesque sit amet, tincidunt ut dolor. Suspendisse ut odio arcu.
						Vestibulum mattis orci nec lacus laoreet posuere. Suspendisse
						lobortis consectetur lorem, ac dignissim urna condimentum in.
						Phasellus lacinia quis leo dapibus sodales. Mauris pretium neque non
						lectus imperdiet, vitae facilisis nisl varius. Proin sit amet
						consectetur tellus. Duis et ornare nisl, quis dignissim ex. Quisque
						ornare rhoncus tempor. Phasellus sit amet ligula vitae est tempor
						tempor ac id eros. Aliquam accumsan bibendum odio nec semper.
						Praesent sit amet tellus tellus. Curabitur rhoncus sit amet lectus a
						elementum. Morbi malesuada risus id mattis commodo. Fusce a nibh
						lectus. Sed vulputate purus lobortis dignissim egestas. In arcu
						ante, iaculis vel interdum non, facilisis sed enim. Quisque congue
						in nisl sed volutpat. Pellentesque magna nisl, tincidunt quis
						ultricies nec, consequat at odio. Nullam bibendum ut ante vitae
						convallis. Cras a eros dapibus, vulputate est vitae, sodales enim.
						Sed molestie pharetra pulvinar. Donec at quam orci. Duis nunc ipsum,
						eleifend non tempor vitae, molestie at arcu. Vivamus quis magna
						vitae dui semper luctus non ullamcorper turpis. In id efficitur
						diam, ut eleifend enim.
					</p>

					<Button
						className="self-end font-semibold text-xs"
						size="sm"
						variant="outline"
					>
						Add to cart
					</Button>
				</div>
			</div>
		</>
	);
};

export default ProductPage;
