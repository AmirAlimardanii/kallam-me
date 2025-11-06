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
      <FormField v-slot="{ componentField, resetField }" name="images">
        <FormItem>
          <FormLabel>Images</FormLabel>
          <FormControl>
            <ImageUploader
              @on-upload="
                (url) =>
                  resetField({ value: [...componentField.modelValue, { url }] })
              "
              @on-remove="
                (url : any) =>
                  resetField({ value: [...componentField.modelValue.filter((img : Image) => img.url !== url)] })
              "
              :image-id="componentField.modelValue.map((img : Image) => img.url) || []"
              :formats="['png', 'jpeg', 'jpg', 'gif']"
            />
          </FormControl>
          <FormDescription />
          <FormMessage />
        </FormItem>
      </FormField>
      <div class="md:grid md:grid-cols-3 gap-8">
        <FormField v-slot="{ componentField }" name="name">
          <FormItem>
            <FormLabel>Name</FormLabel>
            <FormControl>
              <Input placeholder="Product Name" v-bind="componentField" />
            </FormControl>
            <FormDescription />
            <FormMessage />
          </FormItem>
        </FormField>
        <FormField v-slot="{ componentField }" name="price">
          <FormItem>
            <FormLabel>Price</FormLabel>
            <FormControl>
              <Input
                type="number"
                placeholder="Product Price"
                v-bind="componentField"
              />
            </FormControl>
            <FormDescription />
            <FormMessage />
          </FormItem>
        </FormField>
        <FormField v-slot="{ componentField }" name="categoryId">
          <FormItem>
            <FormLabel>Category</FormLabel>
            <Select v-bind="componentField">
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectGroup>
                  <SelectItem
                    v-for="category in categories"
                    :value="category.id"
                    :key="category.id"
                  >
                    {{ category.name }}
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <FormDescription />
            <FormMessage />
          </FormItem>
        </FormField>
        <FormField v-slot="{ componentField }" name="colorId">
          <FormItem>
            <FormLabel>Color</FormLabel>
            <Select v-bind="componentField">
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select a color" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectGroup>
                  <SelectItem
                    v-for="color in colors"
                    :value="color.id"
                    :key="color.id"
                  >
                    {{ color.name }}
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <FormDescription />
            <FormMessage />
          </FormItem>
        </FormField>
        <FormField v-slot="{ componentField }" name="sizeId">
          <FormItem>
            <FormLabel>Size</FormLabel>
            <Select v-bind="componentField">
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select a size" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectGroup>
                  <SelectItem
                    v-for="size in sizes"
                    :value="size.id"
                    :key="size.id"
                  >
                    {{ size.name }}
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <FormDescription />
            <FormMessage />
          </FormItem>
        </FormField>
        <FormField v-slot="{ value, handleChange }" name="isArchived">
          <FormItem
            class="flex flex-row items-start gap-x-3 space-y-0 rounded-md border p-4 shadow"
          >
            <FormControl>
              <Checkbox :checked="value" @update:checked="handleChange" />
            </FormControl>
            <div class="space-y-1 leading-none">
              <FormLabel>Archived</FormLabel>
              <FormDescription>
                This product WILL NOT be appear anywhere in the shop
              </FormDescription>
              <FormMessage />
            </div>
          </FormItem>
        </FormField>
        <FormField v-slot="{ value, handleChange }" name="isFeatured">
          <FormItem
            class="flex flex-row items-start gap-x-3 space-y-0 rounded-md border p-4 shadow"
          >
            <FormControl>
              <Checkbox :checked="value" @update:checked="handleChange" />
            </FormControl>
            <div class="space-y-1 leading-none">
              <FormLabel>Featured</FormLabel>
              <FormDescription>
                This product will appear in the featured product section
              </FormDescription>
              <FormMessage />
            </div>
          </FormItem>
        </FormField>
      </div>
    </form>
  </div>
  <AlertModal
    @onConfirm="deleteProduct"
    title="Delete Product"
    :is-open="isAlertModalOpen"
    @on-close="isAlertModalOpen = false"
  />
</template>

<script setup lang="ts">
import type { Image } from "@prisma/client";
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";

const { isLoading, showError, showMessage, toggleLoading } = useStore();
const route = useRoute();

const title = ref("Edit Product");
const description = ref("Edit Product");
const toastMessage = ref("Product Updated");
const action = ref("Save changes");
const isEditing = ref(route.params.productId !== "new");
const isAlertModalOpen = ref(false);

//@ts-ignore
const { data: currentProduct } = await useFetch(() =>
  isEditing.value ? `/api/admin/products/${route.params.productId}` : null
);
const { data: categories } = await useFetch("/api/admin/categories");
const { data: colors } = await useFetch("/api/admin/colors");
const { data: sizes } = await useFetch("/api/admin/sizes");

watchEffect(() => {
  if (!currentProduct.value) {
    title.value = "Create Product";
    description.value = "Create a new Product";
    toastMessage.value = "Product Created";
    action.value = "Create Product";
  }
});

const formSchema = toTypedSchema(productSchema);

const form = useForm({
  validationSchema: formSchema,
  initialValues: currentProduct.value
    ? {
        ...currentProduct.value,
        //@ts-ignore
        price: parseFloat(String(currentProduct.value?.price)),
      }
    : {
        name: "",
        images: [],
        price: 0,
        categoryId: "",
        sizeId: "",
        colorId: "",
        isFeatured: false,
        isArchived: false,
      },
});

const onSubmit = form.handleSubmit(async (values) => {
  try {
    toggleLoading(true);
    if (isEditing.value) {
      await $fetch(`/api/admin/products/${route.params.productId}`, {
        method: "PATCH",
        body: values,
      });
    } else {
      const data = await $fetch("/api/admin/products", {
        method: "POST",
        body: values,
      });
    }
    showMessage({
      title: toastMessage.value,
      variant: "default",
    });
    await navigateTo("/admin/products");
  } catch (error) {
    const err = handleError(error);
    showError(err);
  } finally {
    toggleLoading(false);
  }
});

const deleteProduct = async () => {
  try {
    toggleLoading(true);
    await $fetch(`/api/admin/products/${route.params.productId}`, {
      method: "DELETE",
    });
    showMessage({
      title: "Product Deleted",
      variant: "default",
    });
    navigateTo("/admin/products");
  } catch (error) {
    const err = handleError(error);
    showError(err);
  } finally {
    toggleLoading(false);
  }
};
</script>
