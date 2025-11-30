import { useCart } from "@/context/CartProvider";
import { formatter } from "@/utils";
import axios from "axios";
import { X } from "lucide-react";
import React, { useEffect, useState } from "react";

const CartItem = ({ id, qty, setTotal }) => {
  const {  removeFromCart, updateQuantity } = useCart();
  const [ValData, setValData] = useState({});

  useEffect(() => {
    axios
      .get(`http://localhost:3000/product/${id}`)
      .then((res) => {
        setValData(res.data);
      })
      .catch((err) => console.error(err));
  }, [id, qty, setTotal]);


  return (
    <>
      <div className="border p-4 rounded-md relative">
        <div className="absolute top-2 right-2">
          <X className="cursor-pointer" onClick={() => removeFromCart(id)} />
        </div>
        <div className="flex gap-6 pt-4">
          <img
            src={`http://localhost:3000/uploads/${ValData.image}`}
            alt="card-image"
            className="w-32 h-38 object-cover"
          />
          <div className="flex-1">
            <div className="flex justify-between">
              <h2 className="text-xl font-semibold">{ValData.productName}</h2>
              <div className="font-bold text-[18px]">
                {formatter.format(ValData.price * qty)}
              </div>
            </div>
            <p>{ValData.category}</p>
            <div className="mt-2">
              <label className="mr-2">Quantity:</label>
              <select
                value={qty}
                onChange={(e) => updateQuantity(id, e.target.value)}
              >
                {Array.from({ length: ValData.quantity }).map((_, i) => (
                  <option value={i + 1} key={i}>
                    {i + 1}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartItem;
