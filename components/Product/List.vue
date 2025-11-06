<template>
  <div class="space-y-4">
    <h3 class="font-bold text-3xl">{{ title }}</h3>
    <!-- No Product -->
    <NoResults v-if="!items?.length" />
    <div class="grid grid-rows-1 md:grid-cols-3 gap-4">
      <!-- Products -->
      <template v-if="!isLoading">
        <ProductCard v-for="item in items" :key="item.id" :data="item" />
      </template>
      <!-- Loading state -->
      <template v-else>
        <CardLoader v-for="i in 3" :key="i" />
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ProductCard } from "~/types";
import NoResults from "../ui/NoResults.vue";
import CardLoader from "../ui/CardLoader.vue";

interface List {
  title: string;
  items: ProductCard[] | null;
  isLoading: boolean;
}

defineProps<List>();
</script>
