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
      className={`fixed top-0 left-0 md:h-[70px] h-13 w-full  bg-transparent shadow-md px-2.5 md:px-8 md:py-4 p-2 flex justify-between  transition-all duration-500 ease-in-out items-center z-20 ${
        isControlled
          ? "bg-white shadow-md text-black "
          : isDark
          ? "bg-black "
          : "md:bg-transparent text-white bg-[#00000052]"
      } `}
    >
      <div className="md:text-[26px] font-bold text-[14px] lg:text-[30px]">
        <Link to="/">LOUIS VUITTON</Link>
      </div>

      <div className="flex items-center space-x-4 ">
        <button onClick={toggleDarkMode} className="p-2 rounded-full   ">
          {darkMode ? (
            <Sun className="text-yellow-400 cursor-pointer md:size-6 size-4" />
          ) : (
            <Moon className=" cursor-pointer md:size-6 size-4" />
          )}
        </button>
        <Link to="/cart" className="relative p-2 rounded-full ">
          <ShoppingCart className="md:size-6 size-4" />
          {cartItems.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white md:text-xs text-[10px] font-bold rounded-full py-[1px] px-[5px] md:px-1.5">
              {cartItems.length}
            </span>
          )}
        </Link>

        <div className="hidden md:flex gap-2">
          <Link
            to="/login"
            className={`px-4 py-2 border rounded  ${
              isControlled
                ? "text-black border-black "
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
          <Link
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
      </div>
    </nav>
  );
}

export default Navbar;
