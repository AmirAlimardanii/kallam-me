<template>
  <div>
    <h1 class="text-3xl font-bold text-gray-900">{{ data.name }}</h1>
    <div class="mt-3 felx items-center justify-between">
      <div class="text-2xl text-gray-900">
        <div class="flex items-center justify-between">
          <div class="font-semibold">
            {{ formatter.format(Number(data?.price)) }}
          </div>
        </div>
      </div>
    </div>
    <hr class="my-4" />
    <div class="flex flex-col gap-y-6">
      <div class="flex items-center gap-x-4">
        <h3 class="font-bold text-gray-900">Size:</h3>
        <div>{{ data?.size?.value }}</div>
      </div>
      <div class="flex items-center gap-x-4">
        <h3 class="font-bold text-gray-900">Color:</h3>
        <div
          class="h-6 w-6 rounded-full border border-gray-600"
          :style="`background-color: ${data?.color?.value};`"
        />
      </div>
    </div>
    <div class="mt-10 flex items-center gap-x-3">
      <Button
        class="rounded-full"
        @click.stop="
          () => {
            addItem(data);
          }
        "
      >
        <Icon name="lucide:shopping-bag" class="w-4 h-4 mr-2" />
        Add to Cart
      </Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ProductCard } from "~/types";
const { addItem } = useCart();

interface InfoProps {
  data: ProductCard;
}

defineProps<InfoProps>();
</script>
