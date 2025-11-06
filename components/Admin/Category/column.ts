import { h } from "vue";
import actionMenu from "./CellAction.vue";
import type { ColumnDef } from "@tanstack/vue-table";

export interface Category {
  id: string;
  name: string;
  createdAt: string;
}

export const columns: ColumnDef<Category>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "createdAt",
    header: "created At",
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const category = row.original;
      return h("div", { class: "relative ml-2" }, h(actionMenu, { category }));
    },
  },
];
