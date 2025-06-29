"use client";

import Status, { StatusEnum } from "@/components/admin/Status";
import { formatMoney } from "@/lib/utils";
import { Address, Order } from "@/services/OrderService/types";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

export const columns: ColumnDef<Order>[] = [
  {
    accessorKey: "id",
    header: () => <div className="text-center">#Pedido</div>,
    cell: (props) => <div className="text-center">{props.getValue<string>()}</div>,
  },
  {
    accessorKey: "address",
    header: () => <div className="text-center">Endereço de entrega</div>,
    cell: (props) => {
      const { city, state } = props.getValue() as Address;

      return (
        <div className="text-center">
          {city} / {state}
        </div>
      );
    },
  },
  {
    accessorKey: "total",
    header: () => <div className="text-center">Total</div>,
    cell: (props) => <div className="text-center">{formatMoney(props.getValue<number>())}</div>,
  },
  {
    accessorKey: "qtd",
    header: () => <div className="text-center">qtd. Items</div>,
    cell: (props) => <div className="text-center">{props.getValue<string>()}</div>,
  },
  {
    accessorKey: "status",
    header: () => <div className="text-center">Status</div>,
    cell: (props) => <Status status={props.getValue<StatusEnum>()} />,
  },
  {
    accessorKey: "createdAt",
    header: () => <div className="text-center">Data</div>,
    cell: (props) => <div className="text-center">{format(props.getValue<string>(), "dd/MM/yyyy, HH:mm")}</div>,
  },
];
