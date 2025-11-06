<template>
  <div class="flex items-center gap-x-2">
    <div
      class="h-6 w-6 rounded-full border"
      :style="{ backgroundColor: colorCode }"
    ></div>
    {{ colorCode }}
  </div>
</template>

<script setup lang="ts">
interface Props {
  colorCode: string;
}
const props = defineProps<Props>();
</script>
