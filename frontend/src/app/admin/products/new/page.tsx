"use client";

import { zodResolver } from "@hookform/resolvers/zod/dist/zod.js";
import { CircleChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import { Select } from "@/components/forms/Select";
import { UploadImg } from "@/components/forms/uploadImg";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ProductCategory, ProductCategoryValues } from "@/entities/Product";
import { formatMoney } from "@/lib/utils";
import ProductService from "@/services/ProductService";

export const newProductSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, "Nome do produto é obrigatório"),
  description: z.string().min(1, "Descrição é obrigatório").max(1500, "Descrição muito longa"),
  price: z.coerce
    .string()
    .min(1, "Valor é obrigatório")
    .transform((v) => +v.replace(/\D/g, "")),
  qtd: z.coerce.number().min(1, "Quantidade é obrigatória"),
  category: z.enum(ProductCategoryValues),
});

export type NewProductType = z.infer<typeof newProductSchema>;

const NewProductPage = () => {
  const { back } = useRouter();
  const [images, setImages] = useState<File[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<NewProductType>({ resolver: zodResolver(newProductSchema) });

  const onSubmit = async (data: NewProductType) => {
    console.log(data);
    try {
      const product = await ProductService.createProduct(data);

      if (images.length > 0) {
        await Promise.all(images.map((img) => ProductService.uploadProductPhoto(product.id, img)));
      }

      toast.success("Produto criado com sucesso!");
      back();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error.message || "Erro ao criar um novo produto. Tente novamente mais tarde");
    }
  };

  return (
    <div className="mx-auto max-w-6xl p-6">
      <span className="mb-6 flex cursor-pointer items-center gap-2" onClick={() => back()}>
        <CircleChevronLeft />
        <h1 className="text-2xl font-bold">Novo Produto</h1>
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
            <Input
              error={errors.price?.message}
              label="Valor"
              mask={formatMoney}
              placeholder="R$ 450,00"
              {...register("price")}
            />

            <Input error={errors.qtd?.message} label="Quantidade" placeholder="30" type="number" {...register("qtd")} />
          </div>

          <Select
            error={errors.category?.message}
            label="Categoria"
            name="category"
            onChange={(v) => setValue("category", v as ProductCategory)}
            options={[
              { label: "headphone", value: "HEADPHONE" },
              { label: "keyboard", value: "KEYBOARD" },
            ]}
            placeholder="Headphone, Keyboard"
          />
        </div>

        <UploadImg
          files={images}
          label="Galeria"
          name="image"
          onFilesChange={setImages}
          onPreviewRemove={() => {}}
          previews={[]}
        />

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
