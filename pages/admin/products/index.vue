<template>
  <div class="flex-col">
    <div class="p-8 pt-6">
      <AdminProductClient />
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: "admin",
});
</script>
