<template>
  <div>
    <div class="mx-auto max-w-6xl my-4">
      <div class="px-4 pb-24">
        <div class="lg:grid lg:grid-cols-5 lg:gap-x-8">
          <!-- Mobile filter -->
          <MobileFilter
            :colors="colors"
            :sizes="sizes"
            :categories="categories"
          />
          <div class="hidden lg:block">
            <!-- filters -->
            <Filter valueKey="sizeId" name="Sizes" :data="sizes" />
            <Filter valueKey="colorId" name="Colors" :data="colors" />
            <Filter
              valueKey="categoryId"
              name="Categories"
              :data="categories"
            />
          </div>

          <div class="mt-6 lg:col-span-4 lg:mt-0">
            <!-- No Product -->
            <NoResults v-if="!products?.length" />
            <div class="grid grid-cols-1 gap-4 lg:grid-cols-3 sm:grid-cols-2">
              <!-- Products -->
              <template
                v-if="status !== 'pending' && products && products.length"
              >
                <ProductCard
                  v-for="product in products"
                  :key="product.id"
                  :data="product"
                />
              </template>
              <!-- Loading state -->
              <template v-if="status === 'pending'">
                <CardLoader v-for="i in 5" :key="i" />
              </template>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ProductCard } from "~/types";
import Filter from "~/components/ui/Filter.vue";
import NoResults from "~/components/ui/NoResults.vue";
import CardLoader from "~/components/ui/CardLoader.vue";
import MobileFilter from "~/components/ui/MobileFilter.vue";

const route = useRoute();

const colorId = computed(() => route.query.colorId);
const sizeId = computed(() => route.query.sizeId);
const categoryId = computed(() => route.query.categoryId);

const { data: products, status } = await useFetch<ProductCard[]>(
  "/api/admin/products",
  {
    lazy: true,
    query: {
      colorId: colorId,
      sizeId: sizeId,
      categoryId: categoryId,
    },
  }
);

const { data: cachedSizes } = await useNuxtData("sizes");

const { data: sizes, status: sizeStatus } = await useFetch("/api/admin/sizes", {
  key: "sizes",
  default() {
    return cachedSizes.value;
  },
});

const { data: cachedColors } = await useNuxtData("colors");

const { data: colors, status: colorstatus } = await useFetch(
  "/api/admin/colors",
  {
    key: "colors",
    default() {
      return cachedColors.value;
    },
  }
);

const { data: cachedCategories } = await useNuxtData("categories");

const { data: categories, status: categoryStatus } = await useFetch(
  "/api/admin/categories",
  {
    key: "categories",
    default() {
      return cachedCategories.value;
    },
  }
);
</script>
