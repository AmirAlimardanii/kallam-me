<template>
  <div class="px-4 py-16 sm:px-6 lg:px-8">
    <h1 class="text-3xl font-bold text-gray-900">Shopping Cart</h1>
    <div class="mt-12 lg:grid lg:grid-cols-12 lg:items-start gap-x-12">
      <div class="lg:col-span-7">
        <!-- Cart itmes -->
        <ul>
          <CartItem v-for="item in cartItems" :key="item.id" :data="item" />
        </ul>
        <!-- Empty cart -->
        <p class="text-neutral-500" v-if="!cartItems.length">
          Your cart is currently empty
        </p>
      </div>
      <!-- cart summary -->
      <CartSummary />
    </div>
  </div>
</template>

<script setup lang="ts">
const { items: cartItems } = useCart();
</script>
