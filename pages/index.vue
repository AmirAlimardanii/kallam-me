<template>
  <Hero />
  <div class="mx-auto max-w-5xl py-16 sm:py-32">
    <div class="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8">
      <ProductList
        title="Featured Products"
        :items="product"
        :is-loading="status === 'pending'"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ProductCard } from "~/types";

definePageMeta({
  middleware: "auth",
});

const { data: product, status } = await useFetch<ProductCard[]>(
  "/api/admin/products?isFeatured=true",
  {
    lazy: true,
  }
);
</script>
