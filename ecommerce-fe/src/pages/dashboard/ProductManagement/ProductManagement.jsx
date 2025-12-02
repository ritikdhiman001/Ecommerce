import DashboardLayout from "@/layouts/DashboardLayout";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import axios from "axios";
import AddProduct from "./AddProduct";
import { Edit } from "lucide-react";
import { useNavigate } from "react-router";

function ProductManagement() {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [ValData, setValData] = useState([]);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getProducts();
  }, []);
  const getProducts = () => {
    axios
      .get(`${apiUrl}/allproducts`)
      .then((response) => {
        setValData(response.data);
      })
      .catch((error) => {
        console.log(error.message.data);
      });
  };

  return (
    <DashboardLayout>
      <h2 className="text-center text-4xl font-bold">Product List</h2>
      <button
        onClick={() => setOpen(true)}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
      >
        Add Product
      </button>
      <AddProduct open={open} setOpen={setOpen} />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Sr No</TableHead>
            <TableHead>Product Image</TableHead>
            <TableHead>Product Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {ValData.map((val, i) => (
            <TableRow key={i}>
              <TableCell>{i + 1}</TableCell>
              <TableCell>
                <img
                  src={`${apiUrl}/uploads/${val.image}`}
                  alt={val.productName}
                  width="80"
                  height="80"
                />
              </TableCell>
              <TableCell>{val.productName}</TableCell>
              <TableCell>{val.category}</TableCell>
              <TableCell>{val.quantity}</TableCell>
              <TableCell>{val.price}</TableCell>
              <TableCell>
                <Edit
                  className="cursor-pointer"
                  onClick={() => navigate(`/update-product/${val._id}`)}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </DashboardLayout>
  );
}

export default ProductManagement;
