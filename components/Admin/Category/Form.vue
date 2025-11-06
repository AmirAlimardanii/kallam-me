<template>
  <div>
    <div class="flex items-center justify-between">
      <Heading :title="title" :description="description" />
      <div>
        <Button
          v-if="isEditing"
          variant="destructive"
          size="sm"
          class="mx-2 !h-10"
          @Click="isAlertModalOpen = !isAlertModalOpen"
        >
          <Icon name="lucide:trash" class="w-4 h-4" />
        </Button>
        <NuxtLink to="/admin/categories/new">
          <Button @click="onSubmit" :disabled="isLoading" size="lg">
            {{ action }}
          </Button>
        </NuxtLink>
      </div>
    </div>
    <Separator class="my-4" />

    <form class="space-y-8 w-full">
      <div class="md:grid md:grid-cols-3 gap-8">
        <FormField v-slot="{ componentField }" name="name">
          <FormItem>
            <FormLabel>Name</FormLabel>
            <FormControl>
              <Input placeholder="category name" v-bind="componentField" />
            </FormControl>
            <FormDescription />
            <FormMessage />
          </FormItem>
        </FormField>
      </div>
    </form>
  </div>
  <AlertModal
    @onConfirm="deleteCategory"
    title="Delete Category"
    :is-open="isAlertModalOpen"
    @on-close="isAlertModalOpen = false"
  />
</template>

<script setup lang="ts">
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";

const { isLoading, showError, showMessage, toggleLoading } = useStore();
const route = useRoute();

const title = ref("Edit Category");
const description = ref("Edit category");
const toastMessage = ref("Category Updated");
const action = ref("Save changes");
const isEditing = ref(route.params.categoryId !== "new");
const isAlertModalOpen = ref(false);

//@ts-ignore
const { data: currentCategory } = await useFetch(() =>
  isEditing.value ? `/api/admin/categories/${route.params.categoryId}` : null
);

watchEffect(() => {
  if (!currentCategory.value) {
    title.value = "Create Category";
    description.value = "Create a new category";
    toastMessage.value = "Category Created";
    action.value = "Create Category";
  }
});

const formSchema = toTypedSchema(categorySchema);

const form = useForm({
  validationSchema: formSchema,
  initialValues: currentCategory.value || { name: "" },
});

const onSubmit = form.handleSubmit(async (values) => {
  try {
    toggleLoading(true);

    if (isEditing.value) {
      await $fetch(`/api/admin/categories/${route.params.categoryId}`, {
        method: "PATCH",
        body: values,
      });
    } else {
      const data = await $fetch("/api/admin/categories", {
        method: "POST",
        body: values,
      });
      console.log(data, "data");
    }

    showMessage({
      title: toastMessage.value,
      variant: "default",
    });
    await navigateTo("/admin/categories");
  } catch (error) {
    const err = handleError(error);
    showError(err);
  } finally {
    toggleLoading(false);
  }
});

const deleteCategory = async () => {
  try {
    toggleLoading(true);

    await $fetch(`/api/admin/categories/${route.params.categoryId}`, {
      method: "DELETE",
    });
    showMessage({
      title: "Category Deleted",
      variant: "default",
    });
    navigateTo("/admin/categories");
  } catch (error) {
    const err = handleError(error);
    showError(err);
  } finally {
    toggleLoading(false);
  }
};
</script>
