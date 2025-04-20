"use client";

import { ColumnDef } from "@tanstack/react-table";


export type Order = {
  id: string;
  client: string;
  status: "pending" | "completed" | "refused";
  total: number;
  qty: number;
  date: string;
};

export const columns: ColumnDef<Order>[] = [
  {
    accessorKey: "id",
    header: "#Pedido",
  },
  {
    accessorKey: "client",
    header: "Cliente",
  },
  {
    accessorKey: "total",
    header: "Total",
  },
  {
    accessorKey: "qty",
    header: "qtd. Items",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "date",
    header: "Data",
  },
];
