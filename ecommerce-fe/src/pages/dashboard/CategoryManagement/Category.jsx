import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import DashboardLayout from "@/layouts/DashboardLayout";
import axios from "axios";
import React, { useEffect, useState } from "react";
import AddCategory from "./AddCategory";
function Category() {
  const [categories, setCategories] = useState([])
  const [open, setOpen] = useState(false)
  useEffect(() => {
    axios.get("http://localhost:3000/allcategory")
      .then(res => setCategories(res.data))
      .catch(err => console.log(err)
      )
  }, [])
  return (

    <DashboardLayout>
      <h2 className="text-center text-4xl font-bold">Category List</h2>
      <button onClick={() => setOpen(true)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer">
        Add Category
      </button>
      <AddCategory open={open} setOpen={setOpen} />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Sr No</TableHead>
            <TableHead>Name</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categories.map((val, i) => (
            <TableRow key={i}>
              <TableCell>{i + 1}</TableCell>
              <TableCell>{val.name}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </DashboardLayout>
  )
}
export default Category;
