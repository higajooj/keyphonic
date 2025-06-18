"use client";

import Status, { StatusEnum } from "@/components/admin/Status";
import { formatMoney } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

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
    header: () => <div className="text-center">#Pedido</div>,
    cell: (props) => (
      <div className="text-center">{props.getValue<string>()}</div>
    ),
  },
  {
    accessorKey: "client",
    header: () => <div className="text-center">Cliente</div>,
    cell: (props) => (
      <div className="text-center">{props.getValue<string>()}</div>
    ),
  },
  {
    accessorKey: "total",
    header: () => <div className="text-center">Total</div>,
    cell: (props) => (
      <div className="text-center">{formatMoney(props.getValue<number>())}</div>
    ),
  },
  {
    accessorKey: "qty",
    header: () => <div className="text-center">qtd. Items</div>,
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
    accessorKey: "date",
    header: () => <div className="text-center">Data</div>,
    cell: (props) => (
      <div className="text-center">
        {format(props.getValue<string>(), "dd/MM/yyyy, HH:mm")}
      </div>
    ),
  },
];
