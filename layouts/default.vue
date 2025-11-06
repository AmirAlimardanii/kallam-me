<template>
  <div>
    <Navbar />
    <slot />
  </div>
</template>

<script setup lang="ts">
import Navbar from "~/components/ui/Navbar.vue";
</script>
