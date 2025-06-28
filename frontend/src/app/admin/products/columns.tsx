"use client";

import { Pill } from "@/components/admin/Pill";
import Status, { StatusEnum } from "@/components/admin/Status";
import { Product } from "@/entities/Product";
import { formatMoney } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: "id",
    header: () => <div className="text-center">#</div>,
    cell: (props) => (
      <div className="text-center">{props.getValue<string>()}</div>
    ),
  },
  {
    accessorKey: "name",
    header: () => <div className="text-center">Produto</div>,
    cell: (props) => (
      <div className="text-center">{props.getValue<string>()}</div>
    ),
  },
  {
    accessorKey: "price",
    header: () => <div className="text-center">Valor</div>,
    cell: (props) => (
      <div className="text-center">{formatMoney(props.getValue<number>())}</div>
    ),
  },
  {
    accessorKey: "qtd",
    header: () => <div className="text-center">qtd</div>,
    cell: (props) => (
      <div className="text-center">{props.getValue<string>()}</div>
    ),
  },
  {
    accessorKey: "status",
    header: () => <div className="text-center">Status</div>,
    cell: (props) => <Status status={props.getValue<StatusEnum>()} />,
  },
  {
    accessorKey: "category",
    header: () => <div className="text-center">Categoria</div>,
    cell: (props) => (
      <div className="text-center">
        <Pill>{props.getValue<string>()}</Pill>
      </div>
    ),
  },
];
