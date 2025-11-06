import { h } from "vue";
import type { ColumnDef } from "@tanstack/vue-table";
import actionMenu from "./CellAction.vue";
import ColorValue from "../Color/Value.vue";

export interface Products {
  id: string;
  name: string;
  price: string;
  isFeatured: boolean;
  isArchived: boolean;
  category: string;
  size: string;
  color: string;
  createdAt: string;
}

export const columns: ColumnDef<Products>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "isFeatured",
    header: "Featured",
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "size",
    header: "Size",
  },
  {
    accessorKey: "color",
    header: "Color",
    cell: ({ row }) => {
      return h(ColorValue as any, {
        colorCode: row.original.color,
      });
    },
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const product = row.original;
      return h("div", { class: "relative ml-2" }, h(actionMenu, { product }));
    },
  },
];
