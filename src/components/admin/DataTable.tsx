"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  onClickRow?: (row: TData) => void;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  onClickRow,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow
              className="rounded-2xl border-0 bg-transparent"
              key={headerGroup.id}
              style={{ boxShadow: "inset 0 0 0 2px #E5E5E5" }}
            >
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead
                    className="py-5 font-semibold first:pl-8 last:pr-8"
                    key={header.id}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>

        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                className="border-0"
                data-state={row.getIsSelected() && "selected"}
                key={row.id}
                onClick={() => onClickRow && onClickRow(row.original)}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell
                    className="py-5 first:pl-8 last:pr-8"
                    key={cell.id}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell className="h-24 text-center" colSpan={columns.length}>
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
