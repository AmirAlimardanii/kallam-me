<template>
  <div>
    <div class="flex items-center justify-between">
      <Heading title="Sizes" description="Manage Sizes"> </Heading>
      <NuxtLink to="/admin/sizes/new">
        <Button>
          <div>Add new +</div>
        </Button>
      </NuxtLink>
    </div>
    <DataTable
      class="mt-4"
      v-if="status !== 'pending'"
      column-to-search="name"
      :data="sizes"
      :columns="columns"
    />
  </div>
</template>

<script setup>
import { columns } from "~/components/Admin/Size/column";
const { data: sizes, status } = await useFetch("/api/admin/sizes", {
  key: "sizes",
  transform: (sizes) => {
    return sizes.map((size) => {
      return {
        id: size.id,
        name: size.name,
        value: size.value,
        createdAt: useDateFormat(new Date(size.createdAt), "MMMM D, YYYY")
          .value,
      };
    });
  },
});
</script>
