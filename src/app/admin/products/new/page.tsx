"use client";

import { zodResolver } from "@hookform/resolvers/zod/dist/zod.js";
import { CircleChevronLeft } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Select } from "@/components/forms/Select";
import { UploadImg } from "@/components/forms/uploadImg";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const newProductSchema = z.object({
  name: z.string().min(1, "Nome do produto é obrigatório"),
  description: z.string().max(500, "Descrição muito longa").optional(),
  price: z.string().min(1, "Valor é obrigatório"),
  quantity: z.coerce.number().min(1, "Quantidade é obrigatória"),
  category: z.string().min(1, "Categoria é obrigatório"),
});

type NewProductType = z.infer<typeof newProductSchema>;

const NewProductPage = () => {
  const { back } = useRouter();
  const params = useParams();
  const productId = params.productId;

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<NewProductType>({ resolver: zodResolver(newProductSchema) });

  const onSubmit = (data: NewProductType) => {
    console.log(data);
  };

  return (
    <div className="mx-auto max-w-6xl p-6">
      <span className="mb-6 flex cursor-pointer items-center gap-2" onClick={() => back()}>
        <CircleChevronLeft />
        <h1 className="font-bold text-2xl">Novo Produto</h1>
      </span>

      <form className="grid grid-cols-1 gap-8 lg:grid-cols-2" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-4">
          <Input
            error={errors.name?.message}
            label="Nome do produto"
            placeholder="Teclado xyz..."
            {...register("name")}
          />

          <Textarea
            label="Descrição"
            placeholder="Digite aqui..."
            {...register("description")}
            className="resize-none"
            error={errors.description?.message}
          />

          <div className="grid grid-cols-2 gap-4">
            <Input error={errors.price?.message} label="Valor" placeholder="R$ 450,00" {...register("price")} />

            <Input
              error={errors.quantity?.message}
              label="Quantidade"
              placeholder="30"
              type="number"
              {...register("quantity")}
            />
          </div>

          <Select
            error={errors.category?.message}
            label="Categoria"
            name="category"
            onChange={(v) => setValue("category", v)}
            options={[
              { label: "headphone", value: "headphone" },
              { label: "keyboard", value: "keyboard" },
            ]}
            placeholder="Headphone, Keyboard"
          />
        </div>

        <UploadImg label="Miniatura" name="image" />

        <div className="mt-8 flex justify-end gap-4 lg:col-span-2">
          <Button className="rounded-full" size="sm" type="button" variant="outline">
            Cancelar
          </Button>
          <Button className="rounded-full" size="sm" type="submit">
            Criar produto
          </Button>
        </div>
      </form>
    </div>
  );
};

export default NewProductPage;
