import type { Category, Color, Image, Product, Size } from "@prisma/client";

export type APIError = {
  statusCode: number;
  statusMessage: string;
  message: string;
  data?: Record<string, string>;
};

export type ProductCard = Product & {
  category: Category;
  size: Size;
  color: Color;
  images: Image[];
};

export type GraphData = {
  name: string;
  total: number;
};
