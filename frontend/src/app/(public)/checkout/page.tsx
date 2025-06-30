"use client";

import { useLocalStorage } from "@uidotdev/usehooks";
import Image from "next/image";
import { useRouter } from "next/router";
import { MouseEventHandler, useMemo } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useProducts } from "@/hooks/useProducts";
import AddressService from "@/services/AddressService";
import OrderService from "@/services/OrderService";

type CheckoutFormValues = {
  zip_code: string;
  street: string;
  number: string;
  complemento: string;
  bairro: string;
  cidade: string;
  uf: string;
};

const Checkout = () => {
  const [cart, setCart] = useLocalStorage("cart", {});
  const { products } = useProducts();

  const getProduct = (id: string) => products.find((p) => p.id === id);

  const total = useMemo(() => {
    let sum = 0;

    Object.keys(cart).forEach((productId) => {
      const product = getProduct(productId);
      const qty = cart[productId];

      sum += product?.price * qty;
    });

    return sum;
  }, [cart]);

  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutFormValues>();

  const onSubmit = async (data: CheckoutFormValues) => {
    toast.success("Pedido feito com sucesso!");

    const boughtItems = Object.keys(cart).map((productId) => {
      return {
        productId,
        quantity: cart[productId],
      };
    });

    setCart({});
    await sleep(1000);
    console.log(data);

    const res = await AddressService.createAddress(data);
    const addressId = res.id;
    console.log(addressId);

    const orderRes = await OrderService.createOrder({
      addressId: addressId,
      paymentMethod: "CASH",
      items: boughtItems,
    });

    window.location.replace("/");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mt-10 flex justify-center gap-x-10">
        <div className="flex flex-col">
          <h1 className="font-black text-2xl">Complete seu pedido</h1>

          <div className="flex flex-col gap-y-2 rounded-lg bg-slate-50 p-6">
            <div className="flex flex-col gap-y-1">
              <h1 className="font-bold text-gray-800 text-xl">Endereço de entrega</h1>
              <p className="text-gray-600">Informe o endereço onde deseja receber seu pedido</p>
            </div>

            <Input {...register("zip_code")} name="zip_code" placeholder="CEP" />
            <Input {...register("street")} name="street" placeholder="Rua" />

            <div className="flex gap-x-2">
              <Input {...register("number")} name="number" placeholder="Número" />
              <Input {...register("complement")} name="complement" placeholder="Complemento" />
            </div>

            <div className="flex gap-x-2">
              <Input {...register("neighborhood")} name="neighborhood" placeholder="Bairro" />
              <Input {...register("city")} name="city" placeholder="Cidade" />
              <Input {...register("state")} name="state" placeholder="UF" />
            </div>
          </div>

          <div className="flex flex-col gap-y-4 bg-slate-50 p-6">
            <div className="flex flex-col gap-y-1">
              <h1 className="font-bold text-gray-800 text-xl">Pagamento</h1>
              <p className="text-gray-600">Escolha a forma de pagamento</p>
            </div>

            <div className="flex gap-x-4">
              <div className="flex flex-1 rounded-md bg-green-100 p-6 shadow">Cartão de débito</div>
              <div className="flex flex-1 rounded-md bg-green-100 p-6 shadow">Cartão de crédito</div>
              <div className="flex flex-1 rounded-md bg-green-100 p-6 shadow">Dinheiro</div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-y-4">
          <h1 className="font-black text-2xl">Carrinho</h1>

          <div className="flex flex-col gap-y-4">
            {Object.keys(cart).map((productId) => {
              const product = getProduct(productId);

              return (
                <div className="flex gap-x-1 rounded rounded-mg border p-2 shadow" key={productId}>
                  {product && (
                    <Image
                      alt="Keyboard image"
                      className="w-32 rounded-lg border border-black"
                      height={100}
                      src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${product?.galery?.[0]}`}
                      width={100}
                    />
                  )}

                  <div className="flex flex-col items-end">
                    <h3 className="font-semibold text-sm">{product?.name}</h3>

                    <div className="flex flex-col items-center justify-end">
                      <span>$ {product?.price / 100}</span>

                      <div className="flex items-baseline">
                        <span className="p-1">{cart[productId]}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <hr />

          <span>Total: {total / 100}</span>

          <Button type="submit" variant="secondary">
            Confirmar pedido
          </Button>
        </div>
      </div>
    </form>
  );
};

export default Checkout;
