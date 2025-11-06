<template>
  <Modal
    :isModalOpen="isOpen"
    :title="title || 'Are you Sure?'"
    :description="description || 'This action cannot be undone'"
    @closeModal="emits('onClose')"
  >
    <div class="pt-6 space-x-2 flex justify-end items-center w-full">
      <Button :disabled="isLoading" @click="emits('onClose')" variant="outline">
        Cancel
      </Button>
      <Button
        :disabled="isLoading"
        @click="handleConfirm"
        variant="destructive"
      >
        Confirm
      </Button>
    </div>
  </Modal>
</template>

<script setup lang="ts">
interface alertModal {
  title?: string;
  description?: string;
  isOpen: boolean;
}

const props = defineProps<alertModal>();
const emits = defineEmits(["onConfirm", "onClose"]);

const { toggleAlertModal, isLoading } = useStore();

const isModalOpen = computed(() => props.isOpen);

const handleConfirm = () => {
  emits("onConfirm");
  emits("onClose");
};
</script>
