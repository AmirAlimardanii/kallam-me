<template>
  <div>
    <div class="flex items-center justify-between">
      <Heading title="Categories" description="Manage Categories"> </Heading>
      <NuxtLink to="/admin/categories/new">
        <Button>
          <div>Add new +</div>
        </Button>
      </NuxtLink>
    </div>
    <DataTable
      class="mt-4"
      v-if="status !== 'pending'"
      column-to-search="name"
      :data="categories"
      :columns="columns"
    />
  </div>
</template>

<script setup>
import { columns } from "~/components/Admin/Category/column";
const { data: categories, status } = await useFetch("/api/admin/categories", {
  key: "categories",
  transform: (categories) => {
    return categories.map((Category) => {
      return {
        id: Category.id,
        name: Category.name,
        createdAt: useDateFormat(new Date(Category.createdAt), "MMMM D, YYYY")
          .value,
      };
    });
  },
});
</script>
