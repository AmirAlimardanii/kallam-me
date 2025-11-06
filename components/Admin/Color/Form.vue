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
              <Input placeholder="Color name" v-bind="componentField" />
            </FormControl>
            <FormDescription />
            <FormMessage />
          </FormItem>
        </FormField>
        <FormField v-slot="{ componentField }" name="value">
          <FormItem>
            <FormLabel>Color Code</FormLabel>
            <FormControl>
              <Input
                type="color"
                placeholder="#000000"
                v-bind="componentField"
              />
            </FormControl>
            <FormDescription />
            <FormMessage />
          </FormItem>
        </FormField>
      </div>
    </form>
  </div>
  <AlertModal
    @onConfirm="deleteColor"
    title="Delete Color"
    :is-open="isAlertModalOpen"
    @on-close="isAlertModalOpen = false"
  />
</template>

<script setup lang="ts">
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";

const { isLoading, showError, showMessage, toggleLoading } = useStore();
const route = useRoute();

const title = ref("Edit Color");
const description = ref("Edit Color");
const toastMessage = ref("Color Updated");
const action = ref("Save changes");
const isEditing = ref(route.params.colorId !== "new");
const isAlertModalOpen = ref(false);

//@ts-ignore
const { data: currentColor } = await useFetch(() =>
  isEditing.value ? `/api/admin/colors/${route.params.colorId}` : null
);

watchEffect(() => {
  if (!currentColor.value) {
    title.value = "Create Color";
    description.value = "Create a new Color";
    toastMessage.value = "Color Created";
    action.value = "Create Color";
  }
});

const formSchema = toTypedSchema(colorSchema);

const form = useForm({
  validationSchema: formSchema,
  initialValues: currentColor.value || { name: "", value: "#000000" },
});

const onSubmit = form.handleSubmit(async (values) => {
  try {
    toggleLoading(true);

    if (isEditing.value) {
      await $fetch(`/api/admin/colors/${route.params.colorId}`, {
        method: "PATCH",
        body: values,
      });
    } else {
      const data = await $fetch("/api/admin/colors", {
        method: "POST",
        body: values,
      });
      console.log(data, "data");
    }

    showMessage({
      title: toastMessage.value,
      variant: "default",
    });
    await navigateTo("/admin/colors");
  } catch (error) {
    const err = handleError(error);
    showError(err);
  } finally {
    toggleLoading(false);
  }
});

const deleteColor = async () => {
  try {
    toggleLoading(true);

    await $fetch(`/api/admin/colors/${route.params.colorId}`, {
      method: "DELETE",
    });
    showMessage({
      title: "Color Deleted",
      variant: "default",
    });
    navigateTo("/admin/colors");
  } catch (error) {
    const err = handleError(error);
    showError(err);
  } finally {
    toggleLoading(false);
  }
};
</script>
