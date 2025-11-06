import { string, z } from "zod";

export const authSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(4, { message: "Password must be at least 4 characters long" }),
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters long" })
    .default("")
    .optional(),
});

export const categorySchema = z.object({
  name: z
    .string()
    .min(2, { message: "Category name must be at least 2 characters long" }),
});

export const colorSchema = z.object({
  name: z
    .string()
    .min(2, { message: "color name must be at least 2 characters long" }),
  value: z
    .string()
    .min(1, { message: "color value must be at least 2 characters long" })
    .default("#000000"),
});

export const sizeSchema = z.object({
  name: z
    .string()
    .min(2, { message: "size name must be at least 2 characters long" }),
  value: z
    .string()
    .min(1, { message: "size value must be at least 2 characters long" }),
});

export const productSchema = z.object({
  name: z
    .string()
    .min(2, { message: "product name must be at least 2 characters long" }),
  images: z
    .object({
      url: z.string(),
    })
    .array()
    .min(1, { message: "Product must have at least one image" }),
  price: z.coerce.number().min(2, { message: "product price is required " }),
  categoryId: z.string().min(2, { message: "product Category is required " }),
  colorId: z.string().min(2, { message: "product Color is required " }),
  sizeId: z.string().min(2, { message: "product Size is required " }),
  isFeatured: z.boolean().default(false).optional(),
  isArchived: z.boolean().default(false).optional(),
});
