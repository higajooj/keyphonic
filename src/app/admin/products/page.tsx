"use client";

import { Filter, PlusCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { DataTable } from "@/components/admin/DataTable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { columns, Product } from "./columns";

const data: Product[] = [];

const ProductsPage = () => {
  const { push } = useRouter();
  return (
    <div className="flex grow flex-col gap-4">
      <div className="flex justify-between">
        <Input name="search" placeholder="Pesquisar" variant="search" />

        <div className="space-x-2">
          <Button className="font-semibold text-xs" size="sm" variant="outline">
            <Filter />
            Filtrar
          </Button>
          <Button className="font-semibold text-xs" onClick={() => push("products/new")} size="sm">
            <PlusCircle />
            Novo produto
          </Button>
        </div>
      </div>
      <DataTable columns={columns} data={data} onClickRow={(o) => push(`products/${o.id}`)} />
    </div>
  );
};

export default ProductsPage;
