"use client";
import { zodResolver } from "@hookform/resolvers/zod/dist/zod.js";
import { CircleChevronLeft } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Select } from "@/components/forms/Select";
import { UploadImg } from "@/components/forms/uploadImg";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ProductCategory } from "@/entities/Product";
import { useProduct } from "@/hooks/useProduct";
import { formatMoney } from "@/lib/utils";
import ProductService from "@/services/ProductService";
import { NewProductType, newProductSchema } from "../new/page";

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
        await Promise.all(files.map((file) => ProductService.uploadProductPhoto(productId, file)));
      }

      toast.success("Produto atualizado com sucesso!");
      back();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error.message || "Erro ao atualizar o produto. Tente novamente mais tarde");
    }
  };

  return (
    <div className="mx-auto max-w-6xl p-6">
      <span className="mb-6 flex cursor-pointer items-center gap-2" onClick={() => back()}>
        <CircleChevronLeft />
        <h1 className="text-2xl font-bold">Editar Produto</h1>
      </span>

      <form className="grid grid-cols-1 gap-8 lg:grid-cols-2" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-4">
          <Input disabled error={errors.id?.message} label="#" value={productId} {...register("id")} />

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
            defaultValue={product?.category}
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
          files={files}
          label="Galeria"
          name="image"
          onFilesChange={setFiles}
          onPreviewRemove={(index) => setPreviews((prev) => prev.filter((_, i) => i !== index))}
          previews={previews}
        />

        <div className="mt-8 flex justify-end gap-4 lg:col-span-2">
          <Button className="rounded-full" size="sm" type="button" variant="outline">
            Cancelar
          </Button>
          <Button className="rounded-full" size="sm" type="submit">
            Atualizar produto
          </Button>
        </div>
      </form>
    </div>
  );
}
