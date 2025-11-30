import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(
    JSON.parse(localStorage.getItem("cart")) ?? []
  );

  const addToCart = (productId, qty, price) => {
    let newProd = {};
    newProd[productId] = {
      qty: qty,
      price: price,
    };

    let getLocal = JSON.parse(localStorage.getItem("cart")) ?? [];
    if (getLocal && getLocal.length > 0) {
      getLocal.push(newProd);
      localStorage.setItem("cart", JSON.stringify(getLocal));
    } else {
      localStorage.setItem("cart", JSON.stringify([newProd]));
    }
    setCartItems((prevItems) => [...prevItems, { ...newProd }]);
  };

  // Update quantity manually (used in cart input)
  const updateQuantity = (productId, quantity) => {
    let cartValue = JSON.parse(localStorage.getItem("cart"));
    const newCart = cartValue.map((e) => {
      if (e[productId]) {
        return {
          [productId]: {
            ...e[productId],
            qty: Number(quantity),
          },
        };
      }
      return e
    });
    setTimeout(() => {
      localStorage.setItem("cart", JSON.stringify(newCart));
    }, 500);
    setCartItems(newCart);
  };

  // Remove from cart
  const removeFromCart = (productId) => {
    const cartValue = JSON.parse(localStorage.getItem("cart"));
    const newCart = cartValue.filter((e) => !e[productId]);
    setTimeout(() => {
      localStorage.setItem("cart", JSON.stringify(newCart));
    }, 500);
    setCartItems(newCart);
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, updateQuantity, removeFromCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;

export const useCart = () => useContext(CartContext);
