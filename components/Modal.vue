<template>
  <Dialog :open="props.isModalOpen" @update:open="emits('closeModal')">
    <DialogContent>
      <DialogHeader>
        <DialogTitle v-if="title">{{ title }}</DialogTitle>
        <DialogDescription v-if="description">
          {{ description }}
        </DialogDescription>
      </DialogHeader>
      <div>
        <slot></slot>
      </div>
    </DialogContent>
  </Dialog>
</template>

<script setup lang="ts">
interface modalProps {
  isModalOpen: boolean;
  title?: string;
  description?: string;
}

const props = defineProps<modalProps>();

const emits = defineEmits(["closeModal"]);
</script>
