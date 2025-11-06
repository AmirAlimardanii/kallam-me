import { h } from "vue";
import type { ColumnDef } from "@tanstack/vue-table";
import actionMenu from "./CellAction.vue";
import ColorValue from "./Value.vue";

export interface Color {
  id: string;
  name: string;
  value: string;
  createdAt: string;
}

export const columns: ColumnDef<Color>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "value",
    header: "Color",
    cell: ({ row }) => {
      return h(ColorValue as any, {
        colorCode: row.original.value,
      });
    },
  },
  {
    accessorKey: "createdAt",
    header: "created At",
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const color = row.original;
      return h("div", { class: "relative ml-2" }, h(actionMenu, { color }));
    },
  },
];
