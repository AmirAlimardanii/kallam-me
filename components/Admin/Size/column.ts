import { h } from "vue";
import type { ColumnDef } from "@tanstack/vue-table";
import actionMenu from "./CellAction.vue";

export interface Size {
  id: string;
  name: string;
  value: string;
  createdAt: string;
}

export const columns: ColumnDef<Size>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "value",
    header: "Size",
  },
  {
    accessorKey: "createdAt",
    header: "created At",
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const size = row.original;
      return h("div", { class: "relative ml-2" }, h(actionMenu, { size }));
    },
  },
];
