<template>
  <div class="flex-col">
    <div class="p-8 pt-6">
      <AdminSizeForm />
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: "admin",
});
</script>
