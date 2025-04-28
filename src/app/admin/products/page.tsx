"use client";
import { DataTable } from "@/components/admin/DataTable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Filter, PlusCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { columns, Product } from "./columns";

const data: Product[] = [
  {
    id: "1234567890",
    name: "Teclado xyz",
    price: 170_00,
    qty: 3,
    status: "critic",
    category: "Keyboard",
  },
  {
    id: "2134567690",
    name: "Switch xyz red",
    price: 1150_00,
    qty: 6,
    status: "full",
    category: "Keyboard",
  },
  {
    id: "1731757890",
    name: "Switch xyz blue",
    price: 980_00,
    qty: 1,
    status: "empty",
    category: "Keyboard",
  },
  {
    id: "098567890",
    name: "Switch xyz black",
    price: 787_80,
    qty: 4,
    status: "critic",
    category: "Keyboard",
  },
  {
    id: "098567890",
    name: "Audio technica ath m50x",
    price: 787_80,
    qty: 4,
    status: "critic",
    category: "Headphone",
  },
  {
    id: "098567890",
    name: "Audio technica ath m40x",
    price: 787_80,
    qty: 4,
    status: "critic",
    category: "Headphone",
  },
  {
    id: "098567890",
    name: "Audio technica ath m60x",
    price: 787_80,
    qty: 4,
    status: "critic",
    category: "Headphone",
  },
  {
    id: "098567890",
    name: "Ear pads ath m series",
    price: 787_80,
    qty: 4,
    status: "critic",
    category: "Headphone",
  },
  {
    id: "098567890",
    name: "Teclado wxyz",
    price: 787_80,
    qty: 4,
    status: "critic",
    category: "Keyboard",
  },
  {
    id: "098567890",
    name: "Teclado wxyz v2",
    price: 787_80,
    qty: 4,
    status: "critic",
    category: "Keyboard",
  },
];

export default function Page() {
  const { push } = useRouter();
  return (
    <div className="flex grow flex-col gap-4">
      <div className="flex justify-between">
        <Input name="search" placeholder="Pesquisar" variant="search" />

        <div className="space-x-2">
          <Button variant="outline" size="sm" className="text-xs font-semibold">
            <Filter />
            Filtrar
          </Button>
          <Button size="sm" className="text-xs font-semibold" onClick={()=> push('products/new')}>
            <PlusCircle />
            Novo produto
          </Button>
        </div>
      </div>
      <DataTable onClickRow={(o) => push(`products/${o.id}`)} columns={columns} data={data} />
    </div>
  );
}
