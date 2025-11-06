<template>
  <div class="mb-8">
    <h3 class="text-lg font-semibold">
      {{ props.name }}
    </h3>
    <hr class="my-4" />
    <div class="flex flex-wrap gap-2">
      <Badge
        v-for="(filter, index) in props.data"
        :key="index"
        :variant="
          route.query[props.valueKey] === filter.id ? 'secondary' : 'outline'
        "
        @click="
          () => {
            onClick(filter?.id);
          }
        "
        class="cursor-pointer px-2 py-1 font-medium"
      >
        {{ filter.name }}
      </Badge>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Category, Size, Color } from "@prisma/client";

const route = useRoute();
const router = useRouter();

interface FilterProps {
  data: (Size | Color | Category)[];
  name: string;
  valueKey: string;
}

const props = defineProps<FilterProps>();

const onClick = (id: string) => {
  const query = new URLSearchParams(route.query as any);

  if (query.get(props.valueKey) === id) {
    query.delete(props.valueKey);
  } else {
    query.set(props.valueKey, id);
  }

  router.push({
    path: route.path,
    query: Object.fromEntries(query.entries()),
  });
};
</script>
