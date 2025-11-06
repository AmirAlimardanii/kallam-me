<template>
  <div
    class="flex flex-col justify-center items-center h-full w-full space-y-3"
  >
    <div class="flex items-center justify-center text-neutral-500">
      No results found.
    </div>
    <NuxtLink to="/products">
      <Button variant="outline">Clear filter</Button>
    </NuxtLink>
  </div>
</template>

<script setup lang="ts"></script>
