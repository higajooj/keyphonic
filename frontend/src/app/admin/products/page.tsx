"use client";

import { DataTable } from "@/components/admin/DataTable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useProducts } from "@/hooks/useProducts";
import { Filter, PlusCircle } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { columns } from "./columns";

const ProductsPage = () => {
  const { push } = useRouter();
  const { products: data, handleSearch } = useProducts();
  return (
    <div className="flex grow flex-col gap-4">
      <div className="flex justify-between">
        <Input
          name="search"
          placeholder="Pesquisar"
          variant="search"
          onChange={(e) => handleSearch(e.currentTarget.value)}
        />

        <div className="space-x-2">
          <Button className="text-xs font-semibold" size="sm" variant="outline">
            <Filter />
            Filtrar
          </Button>
          <Link href={"products/new"}>
            <Button className="text-xs font-semibold" size="sm">
              <PlusCircle />
              Novo produto
            </Button>
          </Link>
        </div>
      </div>
      <DataTable
        columns={columns}
        data={data}
        onClickRow={(o) => push(`products/${o.id}`)}
      />
    </div>
  );
};

export default ProductsPage;
