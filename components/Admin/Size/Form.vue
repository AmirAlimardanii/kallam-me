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

        <Button @click="onSubmit" :disabled="isLoading" size="lg">
          {{ action }}
        </Button>
      </div>
    </div>
    <Separator class="my-4" />

    <form class="space-y-8 w-full">
      <div class="md:grid md:grid-cols-3 gap-8">
        <FormField v-slot="{ componentField }" name="name">
          <FormItem>
            <FormLabel>Name</FormLabel>
            <FormControl>
              <Input placeholder="name" v-bind="componentField" />
            </FormControl>
            <FormDescription />
            <FormMessage />
          </FormItem>
        </FormField>
        <FormField v-slot="{ componentField }" name="value">
          <FormItem>
            <FormLabel>Size</FormLabel>
            <FormControl>
              <Input placeholder="size" v-bind="componentField" />
            </FormControl>
            <FormDescription />
            <FormMessage />
          </FormItem>
        </FormField>
      </div>
    </form>
  </div>
  <AlertModal
    @onConfirm="deleteSize"
    title="Delete size"
    :is-open="isAlertModalOpen"
    @on-close="isAlertModalOpen = false"
  />
</template>

<script setup lang="ts">
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";

const { isLoading, showError, showMessage, toggleLoading } = useStore();
const route = useRoute();

const title = ref("Edit Size");
const description = ref("Edit Size");
const toastMessage = ref("Size Updated");
const action = ref("Save changes");
const isEditing = ref(route.params.sizeId !== "new");
const isAlertModalOpen = ref(false);

//@ts-ignore
const { data: currentSize } = await useFetch(() =>
  isEditing.value ? `/api/admin/sizes/${route.params.sizeId}` : null
);

watchEffect(() => {
  if (!currentSize.value) {
    title.value = "Create Size";
    description.value = "Create a new Size";
    toastMessage.value = "Size Created";
    action.value = "Create Size";
  }
});

const formSchema = toTypedSchema(sizeSchema);

const form = useForm({
  validationSchema: formSchema,
  initialValues: currentSize.value || { name: "", value: "" },
});

const onSubmit = form.handleSubmit(async (values) => {
  try {
    toggleLoading(true);

    if (isEditing.value) {
      await $fetch(`/api/admin/sizes/${route.params.sizeId}`, {
        method: "PATCH",
        body: values,
      });
    } else {
      const data = await $fetch("/api/admin/sizes", {
        method: "POST",
        body: values,
      });
      console.log(data, "data");
    }

    showMessage({
      title: toastMessage.value,
      variant: "default",
    });
    await navigateTo("/admin/sizes");
  } catch (error) {
    const err = handleError(error);
    showError(err);
  } finally {
    toggleLoading(false);
  }
});

const deleteSize = async () => {
  try {
    toggleLoading(true);

    await $fetch(`/api/admin/sizes/${route.params.sizeId}`, {
      method: "DELETE",
    });
    showMessage({
      title: "Size Deleted",
      variant: "default",
    });
    navigateTo("/admin/sizes");
  } catch (error) {
    const err = handleError(error);
    showError(err);
  } finally {
    toggleLoading(false);
  }
};
</script>
