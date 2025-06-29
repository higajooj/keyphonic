"use client";
import { Select } from "@/components/forms/Select";
import { UploadImg } from "@/components/forms/uploadImg";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { Textarea } from "@/components/ui/textarea";
import { ProductCategory } from "@/entities/Product";
import { useProduct } from "@/hooks/useProduct";
import { formatMoney } from "@/lib/utils";
import ProductService from "@/services/ProductService";
import { zodResolver } from "@hookform/resolvers/zod/dist/zod.js";
import { CircleChevronLeft } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { newProductSchema, NewProductType } from "../new/page";

export default function Page() {
  const { back } = useRouter();
  const params = useParams();
  const productId = (params.productId || "") as string;
  const { product } = useProduct(productId);
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<NewProductType>({ resolver: zodResolver(newProductSchema) });

  useEffect(() => {
    if (product) {
      reset({
        ...product,
        price: formatMoney(product.price) as unknown as number,
      });
      setPreviews(product.galery || []);
    }
  }, [product, reset]);

  const onSubmit = async (data: NewProductType) => {
    console.log(data);
    try {
      await ProductService.updateProduct(productId, data);

      if (files.length > 0) {
        await Promise.all(
          files.map((file) =>
            ProductService.uploadProductPhoto(productId, file),
          ),
        );
      }

      toast.success("Produto atualizado com sucesso!");
      back();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(
        error.message ||
          "Erro ao atualizar o produto. Tente novamente mais tarde",
      );
    }
  };

  return (
    <div className="mx-auto max-w-6xl p-6">
      <span
        className="mb-6 flex cursor-pointer items-center gap-2"
        onClick={() => back()}
      >
        <CircleChevronLeft />
        <h1 className="text-2xl font-bold">Editar Produto</h1>
      </span>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-1 gap-8 lg:grid-cols-2"
      >
        <div className="flex flex-col gap-4">
          <Input
            value={productId}
            label="#"
            error={errors.id?.message}
            disabled
            {...register("id")}
          />

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
              mask={formatMoney}
              {...register("price")}
            />

            <Input
              label="Quantidade"
              placeholder="30"
              type="number"
              error={errors.qtd?.message}
              {...register("qtd")}
            />
          </div>

          <Select
            name="category"
            label="Categoria"
            placeholder="Headphone, Keyboard"
            error={errors.category?.message}
            onChange={(v) => setValue("category", v as ProductCategory)}
            defaultValue={product?.category}
            options={[
              { label: "headphone", value: "HEADPHONE" },
              { label: "keyboard", value: "KEYBOARD" },
            ]}
          />
        </div>

        <UploadImg
          name="image"
          label="Galeria"
          files={files}
          previews={previews}
          onFilesChange={setFiles}
          onPreviewRemove={(index) =>
            setPreviews((prev) => prev.filter((_, i) => i !== index))
          }
        />

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
            Atualizar produto
          </Button>
        </div>
      </form>
    </div>
  );
}
