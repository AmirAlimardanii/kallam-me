<template>
  <Modal :is-modal-open="isModalOpen" @close-modal="closeModal">
    <div
      class="grid w-full grid-cols-1 items-start gap-x-6 gap-y-8 sm:grid-cols-12 lg:gap-x-8"
      v-if="selectedProduct"
    >
      <div class="sm:col-span-4 lg:col-span-5">
        <Carousel class="relative w-full">
          <CarouselContent>
            <CarouselItem
              v-for="(image, index) in selectedProduct.images"
              :key="index"
            >
              <div
                class="flex aspect-square items-center justify-center border p-2 rounded"
              >
                <img
                  :src="image.url"
                  alt="image"
                  class="size-[150px] object-cover object-center"
                />
              </div>
            </CarouselItem>
          </CarouselContent>
          <CarouselPrevious class="previous-btn" />
          <CarouselNext class="next-btn" />
        </Carousel>
      </div>
      <div class="sm:col-span-8 lg:col-span-7">
        <ProductInfo :data="selectedProduct" />
      </div>
    </div>
  </Modal>
</template>

<script setup lang="ts">
import usePreviewModal from "~/composables/usePreviewModal";

const { onClose, selectedProduct } = usePreviewModal();

interface ProductCard {
  isModalOpen: boolean;
}

defineProps<ProductCard>();
const emits = defineEmits(["closeModal"]);

const closeModal = () => {
  emits("closeModal");
  onClose();
};
</script>

<style>
.previous-btn {
  left: calc(50% - 40px);
  top: calc(100% + 30px);
}

.next-btn {
  left: 50%;
  top: calc(100% + 30px);
}
</style>
