import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogHeader,
} from "@/components/ui/dialog";
import { Label } from "@radix-ui/react-label";
import React, { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

function AddCategory({ open, setOpen }) {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [Data, setData] = useState({ name: "" });
  function HandleChange(e) {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  }
  function subBtn(e) {
    e.preventDefault();
    if (Data.name === "") {
      toast.error("Fill the fields");
      return;
    }
    axios
      .post(`${apiUrl}/addcategory`, { name: Data.name })
      .then((response) => {
        toast.success("Category Add Successfully");
        setOpen(false);
        setData({
          name: "",
        });
      })
      .catch((error) => {
        toast.error("Failed to add Category");
      });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <form>
        <DialogContent className=" sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Category</DialogTitle>
            <DialogDescription>
              Please fill in the category details.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label>Category Name</Label>
              <Input id="categoryName" name="name" onChange={HandleChange} />
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

export default AddCategory;
