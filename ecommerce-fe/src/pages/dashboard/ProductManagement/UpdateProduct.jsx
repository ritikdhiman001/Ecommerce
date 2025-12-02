import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import DashboardLayout from "@/layouts/DashboardLayout";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateProductSchema } from "../schema/update-product";
import { Textarea } from "@/components/ui/textarea";
import { useNavigate, useParams } from "react-router";
import axios from "axios";
import { toast } from "react-toastify";

const SIZES = ["M", "L", "XL", "XXL"];

export const UpdateProduct = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const { id } = useParams();
  const [productData, setProductData] = useState({});
  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(updateProductSchema),
    defaultValues: {
      ProductName: "",
      ProductImg: undefined,
      size: [],
      quantity: 0,
      category: "",
      description: "",
      price: 0,
    },
    mode: "onChange",
  });

  useEffect(() => {
    axios.get(`${apiUrl}/product/${id}`).then((data) => {
      setProductData(data.data);
    });
  }, [id]);

  useEffect(() => {

    form.reset({
      price: productData.price,
      ProductName: productData?.productName,
      ProductImg: productData.image,
      category: productData.category,
      quantity: productData.quantity,
      description: productData.description,
      size: productData.size,
    });
  }, [form, productData]);

  const submitBtn = (values) => {
    const formData = new FormData();
    formData.append("price", values.price);
    formData.append("quantity", values.quantity);
    formData.append("description", values.description);
    formData.append("productName", values.ProductName);
    values.size.forEach((s) => {
      formData.append("size[]", s);
    });
    formData.append("category", values.category);
    formData.append("image", values.ProductImg);
    axios.put(`${apiUrl}/update-product/${id}`, formData).then((e) => {
      toast.success("Product Update successfully");
      navigate("/product-management");
    });
  };

  return (
    <DashboardLayout>
      <h2 className="text-center text-4xl font-bold">Update Product</h2>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((values) => {
            submitBtn(values);
          })}
          className="space-y-8"
        >
          <FormField
            control={form.control}
            name="ProductImg"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product Image</FormLabel>
                <FormControl>
                  <div className="relative h-20 w-20">
                    <Input
                      id="productImg"
                      type="file"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          field.onChange(file);
                        }
                      }}
                    />

                    <label
                      htmlFor="productImg"
                      className="cursor-pointer block h-20 w-20"
                    >
                      {/* Preview if from DB */}
                      {typeof field.value === "string" && (
                        <img
                          src={field.value}
                          alt="Current Product"
                          className="h-20 w-20 object-cover rounded"
                        />
                      )}

                      {/* Preview if new file */}
                      {field.value instanceof File && (
                        <img
                          src={URL.createObjectURL(field.value)}
                          alt="New Product Preview"
                          className="h-20 w-20 object-cover rounded"
                        />
                      )}

                      {/* If no image yet */}
                      {!field.value && (
                        <div className="h-20 w-20 flex items-center justify-center border rounded text-xs text-gray-500">
                          Upload
                        </div>
                      )}
                    </label>
                  </div>
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="ProductName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="quantity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Quantity</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea maxLength={500} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="size"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Size</FormLabel>
                <FormControl className="flex gap-12.5">
                  <div>
                    {SIZES.map((size, i) => {
                      return (
                        <div key={i} className="flex gap-4 items-center">
                          <Input
                            type="checkbox"
                            value={size}
                            checked={field.value?.includes(size)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                field.onChange(
                                  [...(field.value || []), size].filter(
                                    (v, i, arr) => arr.indexOf(v) === i
                                  )
                                );
                              } else {
                                field.onChange(
                                  field.value?.filter((v) => v !== size)
                                );
                              }
                            }}
                          />
                          {size}
                        </div>
                      );
                    })}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </DashboardLayout>
  );
};
