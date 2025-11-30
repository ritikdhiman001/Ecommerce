import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { toast } from "react-toastify";


function AddProduct({ open, setOpen }) {
    const [formData, setFormData] = useState({
        productName: "",
        category: "",
        quantity: "",
        description: "",
        price: "",
        image: ""
    });

    function HandleChange(e) {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    }

    function subBtn(e) {
        e.preventDefault();

        const form = new FormData();
        form.append("productName", formData.productName);
        form.append("category", formData.category);
        form.append("quantity", formData.quantity);
        form.append("description", formData.description);
        form.append("price", formData.price);
        form.append("image", formData.image);

        // Validation
        if (
            formData.productName.trim() === "" ||
            formData.category.trim() === "" ||
            formData.quantity.trim() === "" ||
            formData.description.trim() === "" ||
            formData.price.trim() === "" ||
            !formData.image
        ) {
            toast.error("Please fill all fields!");
            return;
        }

        axios.post("http://localhost:3000/addproduct", form)
            .then((response) => {
                console.log(response);
                toast.success("Product Added Successfully");
                setOpen(false);
                setFormData({
                    productName: "",
                    category: "",
                    quantity: "",
                    description: "",
                    price: "",
                    image: ""
                });
            })
            .catch((error) => {
                console.log(error);
                toast.error("Failed to Add Product");
            });
    }


    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <form >
                <DialogContent className=" sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Add Product</DialogTitle>
                        <DialogDescription>
                            Please fill in the product details to add a new product.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4">
                        <div className="grid gap-3">

                            <Label>Product Name</Label>
                            <Input
                                id="productName" name="productName" onChange={HandleChange}
                            />
                        </div>
                        <div className="grid gap-3">
                            <Label>Product Image</Label>
                            <Input
                                id="image"
                                name="image"
                                type="file"
                                accept="image/*"
                                onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })}
                            />

                        </div>

                        <div className="grid gap-3">
                            <Label>Category</Label>
                            <Input id="category" name="category" onChange={HandleChange} />
                        </div>
                        <div className="grid gap-3">
                            <Label>Quantity</Label>
                            <Input
                                id="quantity"
                                name="quantity"
                                onChange={HandleChange}
                                type="Number"
                            />
                        </div>
                        <div className="grid gap-3">
                            <Label>Description</Label>
                            <Input
                                id="description"
                                name="description"
                                onChange={HandleChange}
                            />
                        </div>
                        <div className="grid gap-3">
                            <Label>Price</Label>

                            <Input
                                id="price"
                                name="price"
                                onChange={HandleChange}
                                type="Number"
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button onClick={subBtn} className="cursor-pointer" type="submit">
                            Save
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </form>
        </Dialog>
    );
}

export default AddProduct;
