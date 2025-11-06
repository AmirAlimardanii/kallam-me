<template>
  <Sheet>
    <SheetTrigger as-child>
      <Button class="rounded-full lg:hidden">
        <Icon name="lucide:filter" class="size-4 mr-2" />
        Filters
      </Button>
    </SheetTrigger>
    <SheetContent>
      <SheetHeader class="mb-6">
        <SheetTitle>Filters</SheetTitle>
      </SheetHeader>
      <Filter valueKey="sizeId" name="Sizes" :data="sizes" />
      <Filter valueKey="colorId" name="Colors" :data="colors" />
      <Filter valueKey="categoryId" name="Categories" :data="categories" />
    </SheetContent>
  </Sheet>
</template>

<script setup lang="ts">
import Filter from "./Filter.vue";
import type { Category, Color, Size } from "@prisma/client";

interface FilterProps {
  sizes: Size[];
  colors: Color[];
  categories: Category[];
}

defineProps<FilterProps>();
</script>
