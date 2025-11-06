<template>
  <div class="flex-col">
    <div class="p-8 pt-6">
      <AdminCategoryForm />
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: "admin",
});
</script>
