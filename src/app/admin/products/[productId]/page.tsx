"use client";
import { Select } from "@/components/forms/Select";
import { UploadImg } from "@/components/forms/uploadImg";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod/dist/zod.js";
import { CircleChevronLeft } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

const newProductSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Nome do produto é obrigatório"),
  description: z.string().max(500, "Descrição muito longa").optional(),
  price: z.string().min(1, "Valor é obrigatório"),
  quantity: z.coerce.number().min(1, "Quantidade é obrigatória"),
  category: z.string().min(1, "Categoria é obrigatório"),
});

type NewProductType = z.infer<typeof newProductSchema>;

export default function Page() {
  const { back } = useRouter();
  const params = useParams();
  const productId = params.productId;
  const isEditing = productId !== "new";

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
      <span className="mb-6 flex items-center gap-2 cursor-pointer" onClick={() => back()}>
        <CircleChevronLeft />
        <h1 className="text-2xl font-bold">
          {isEditing ? "Editar Produto" : "Novo Produto"}
        </h1>
      </span>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 gap-8 lg:grid-cols-2"
      >
        <div className="flex flex-col gap-4">
          {isEditing && (
            <Input
              value={productId}
              label="#"
              error={errors.id?.message}
              disabled
              {...register("id")}
            />
          )}

          <Input
            label="Nome do produto"
            placeholder="Teclado xyz..."
            error={errors.name?.message}
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
            <Input
              label="Valor"
              placeholder="R$ 450,00"
              error={errors.price?.message}
              {...register("price")}
            />

            <Input
              label="Quantidade"
              placeholder="30"
              type="number"
              error={errors.quantity?.message}
              {...register("quantity")}
            />
          </div>

          <Select
            name="category"
            label="Categoria"
            placeholder="Headphone, Keyboard"
            error={errors.category?.message}
            onChange={(v) => setValue("category", v)}
            options={[
              { label: "headphone", value: "headphone" },
              { label: "keyboard", value: "keyboard" },
            ]}
          />
        </div>

        <UploadImg name="image" label="Miniatura" />

        <div className="mt-8 flex justify-end gap-4 lg:col-span-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="rounded-full"
          >
            Cancelar
          </Button>
          <Button type="submit" size="sm" className="rounded-full">
            Criar produto
          </Button>
        </div>
      </form>
    </div>
  );
}
