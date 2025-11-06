<template>
  <div>
    <div class="flex items-center justify-between">
      <Heading title="Products" description="Manage Products"> </Heading>
      <NuxtLink to="/admin/products/new">
        <Button>
          <div>Add new +</div>
        </Button>
      </NuxtLink>
    </div>
    <DataTable
      class="mt-4"
      v-if="status !== 'pending'"
      column-to-search="name"
      :data="products ? products : []"
      :columns="columns"
    />
  </div>
</template>

<script setup>
import { columns } from "~/components/Admin/Product/column";
const { data: products, status } = await useFetch("/api/admin/products", {
  key: "products",
  transform: (products) => {
    return products.map((product) => {
      return {
        id: product.id,
        name: product.name,
        price: formatter.format(+product.price),
        isFeatured: product.isFeatured,
        isArchived: product.isArchived,
        category: product.category.name,
        color: product.color.value,
        size: product.size.value,
        createdAt: useDateFormat(new Date(product.createdAt), "MMMM D, YYYY")
          .value,
      };
    });
  },
});
</script>
