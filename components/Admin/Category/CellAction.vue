<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button variant="ghost" class="h-8 w-8 p-0">
        <span class="sr-only">Open menu</span>
        <Icon name="lucide:more-horizontal" class="w-4 h-4" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      <DropdownMenuItem @click="navigateTo(`/admin/categories/${category.id}`)">
        <Icon name="lucide:pencil" class="mr-2 h-4 w-4" />
        <span class="mb-1">Edit</span>
      </DropdownMenuItem>
      <DropdownMenuItem @click="copy(category.id)">
        <Icon name="lucide:copy" class="mr-2 h-4 w-4" />
        <span class="mb-1">copy ID</span>
      </DropdownMenuItem>
      <DropdownMenuItem
        class="bg-red-500 hover:!bg-red-600"
        @click="isAlertModalOpen = !isAlertModalOpen"
      >
        <Icon name="lucide:trash" class="mr-2 h-4 w-4 text-white" />
        <span class="mb-1 text-white">Delete</span>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
  <AlertModal
    @onConfirm="deleteCategory"
    title="Delete Category"
    :is-open="isAlertModalOpen"
    @onClose="isAlertModalOpen = false"
  />
</template>

<script setup lang="ts">
const { showMessage, showError, toggleLoading } = useStore();
const isAlertModalOpen = ref(false);
interface Props {
  category: {
    id: string;
  };
}

const props = defineProps<Props>();

const copy = (id: string) => {
  navigator.clipboard.writeText(id);
  showMessage({
    title: "Category Id Copied",
    variant: "default",
  });
};

const deleteCategory = async () => {
  try {
    toggleLoading(true);

    await $fetch(`/api/admin/categories/${props.category.id}`, {
      method: "DELETE",
    });
    showMessage({
      title: "Category Deleted",
      variant: "default",
    });
    refreshNuxtData("categories");
  } catch (error) {
    const err = handleError(error);
    showError(err);
  } finally {
    toggleLoading(false);
  }
};
</script>
