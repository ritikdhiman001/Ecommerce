import { z } from "zod";

export const updateProductSchema = z.object({
  ProductImg: z.union([z.instanceof(File), z.string().min(1)], {message: "Product image is required" }),
  ProductName: z.string().min(2, { message: "Product name is required." }),
  category: z.string().min(2, { message: "Product category is required." }),
  quantity: z.coerce.number().min(1, "Product quantity is Required"),
  price: z.coerce.number().min(1, { message: "Product price is required" }),
  description: z
    .string()
    .min(1, { message: "Product description is required" }),
  size: z.array(z.string()).min(1, { message: "Product size is required" }),
});
