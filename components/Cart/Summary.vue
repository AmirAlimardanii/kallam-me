<template>
  <div
    class="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8"
  >
    <h2 class="text-lg font-medium text-gray-900">Order Summery for this</h2>
    <div class="mt-6 space-y-4">
      <div
        class="flex items-center justify-between border-t border-gray-200 pt-4"
      >
        <div class="text-base font-medium text-gray-900">Order total</div>
        <div class="font-semibold">
          {{ formatter.format(Number(totalPrice)) }}
        </div>
      </div>
    </div>
    <Button
      :disabled="isLoading"
      @click="onCheckout"
      type="button"
      v-if="cartItems.length"
      class="mt-4 w-full"
      >Checkout</Button
    >
  </div>
</template>

<script setup lang="ts">
import Button from "../ui/button/Button.vue";

const route = useRoute();
const { isLoading, toggleLoading, showError, showMessage } = useStore();
const { items: cartItems, removeAllItems } = useCart();

const totalPrice = computed(() => {
  return cartItems.value.reduce((total, item) => {
    return total + Number(item.price);
  }, 0);
});

const onCheckout = async () => {
  try {
    toggleLoading(true);
    const checkoutItems = cartItems.value.map((item) => item.id);
    const data = await $fetch("/api/checkout", {
      method: "POST",
      body: checkoutItems,
    });
    console.log(data);
    if (data) {
      window.location.href = data;
    }
  } catch (error) {
    const err = handleError(error);
    showError(err);
  } finally {
    toggleLoading(false);
    return;
  }
};

onMounted(() => {
  if (route.query.success) {
    showMessage({ title: "Checkout Success", variant: "default" });
  }
  if (route.query.canceled) {
    showMessage({ title: "something went wrong", variant: "default" });
  }
});
</script>
