import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Moon, ShoppingCart, Sun } from "lucide-react";
import { useCart } from "@/context/CartProvider";

function Navbar({ isDark = false }) {
  const [darkMode, setDarkMode] = useState(false);
  const { cartItems } = useCart();
  const [isControlled, setIsControlled] = useState(false);

  useEffect(() => {
    const savedMode = localStorage.getItem("theme");
    if (savedMode === "dark") {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    }
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsControlled(true);
      } else {
        setIsControlled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.addEventListener("scroll", handleScroll);
  }, []);

  const toggleDarkMode = () => {
    if (darkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
    setDarkMode(!darkMode);
  };

  return (
    <nav
      className={`fixed top-0 left-0 h-[70px] w-full  bg-transparent  shadow-md px-8 py-4 flex justify-between  transition-all duration-500 ease-in-out items-center ${
        isControlled
          ? "bg-white shadow-md text-black "
          : isDark
          ? "bg-black "
          : "bg-transparent text-white "
      } `}
    >
      <div className="text-2xl font-bold  ">
        <Link to="/">LOUIS VUITTON</Link>
      </div>

      <div className="flex items-center space-x-4 ">
        <button onClick={toggleDarkMode} className="p-2 rounded-full   ">
          {darkMode ? (
            <Sun className="text-yellow-400 cursor-pointer" />
          ) : (
            <Moon className=" cursor-pointer" />
          )}
        </button>

        <Link to="/cart" className="relative p-2 rounded-full ">
          <ShoppingCart className="" />
          {cartItems.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full px-1.5">
              {cartItems.length}
            </span>
          )}
        </Link>
        <Link
          to="/login"
          className={`px-4 py-2 border rounded  ${
            isControlled
              ? "text-black border-black hover:text-red-600"
              : isDark
              ? "hover:text-black"
              : "text-white "
          }`}
        >
          Login
        </Link>
        <Link
          to="/register"
          className={`px-4 py-2 border rounded  ${
            isControlled
              ? "text-black border-black "
              : isDark
              ? "hover:text-black "
              : "text-white"
          }`}
        >
          Register
        </Link>
        <Link target="_blank"
          to="/dashboard"
          className={`px-4 py-2 border rounded  ${
            isControlled
              ? "text-black border-black "
              : isDark
              ? "hover:text-black "
              : "text-white"
          }`}
        >
          Dashboard
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
