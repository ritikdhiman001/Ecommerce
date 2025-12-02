import AppLayout from "@/layouts/AppLayout";
import axios from "axios";
import { Eye, EyeOff } from "lucide-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { toast } from "react-toastify";

function Register() {
  const apiUrl = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  async function subBtn(e) {
    e.preventDefault();
    let emailRegex = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;
    let passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&])[A-Za-z\d@$!%*?#&]{6,}$/;
    if (formData.firstName.trim() == "") {
      setErrors((prev) => ({ ...prev, firstName: "First Name is required" }));
    } else if (formData.lastName.trim() == "") {
      setErrors((prev) => ({ ...prev, lastName: "Last Name is required" }));
    } else if (formData.email.trim() == "") {
      setErrors((prev) => ({ ...prev, email: "Email is required" }));
    } else if (formData.password.trim() == "") {
      setErrors((prev) => ({ ...prev, password: "Password is required" }));
    } else if (formData.email !== "" && !emailRegex.test(formData.email)) {
      setErrors((prev) => ({ ...prev, email: "Invalid Email" }));
    } else if (
      formData.password !== "" &&
      !passwordRegex.test(formData.password)
    ) {
      setErrors((prev) => ({
        ...prev,
        password:
          "Password must be at least 6 characters and include uppercase, lowercase, number, and special character",
      }));
    } else {
      setErrors({});
      console.log(formData);
      await axios
        .post(`${apiUrl}/adduser`, {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password,
        })
        .then((response) => {
          console.log(response);
          if (response.status === 200) {
            toast.success("User Added Successfully!");
            navigate("/login");
          }
        })
        .catch((error) => {
          console.log(error);
          toast.error("Failed to add user!");
        });
    }
  }

  return (
    <AppLayout>
      <div className="w-100 rounded-lg  p-6 bg-white dark:bg-zinc-900 relative overflow-hidden mt-[200px] ml-[550px] border-2 shadow-[0px_0px_100px_50px_rgba(8,_11,_14,_0.06)] ">
        <div className="flex flex-col justify-center items-center space-y-2">
          <h2 className="text-2xl font-medium">Register</h2>
        </div>
        <form onSubmit={subBtn} className="w-full mt-4 space-y-3">
          <div>
            <input
              className="outline-none border-2 rounded-md px-2 py-1 text-slate-500 w-full focus:border-blue-300"
              placeholder="First Name"
              id="firstName"
              name="firstName"
              type="text"
              onChange={handleChange}
            />

            {errors.firstName && (
              <p className="text-red-800">{errors.firstName}</p>
            )}
          </div>

          <div>
            <input
              className="outline-none border-2 rounded-md px-2 py-1 text-slate-500 w-full focus:border-blue-300"
              placeholder="Last Name"
              id="lastName"
              name="lastName"
              type="text"
              onChange={handleChange}
            />

            {errors.lastName && (
              <p className="text-red-800">{errors.lastName}</p>
            )}
          </div>
          <div>
            <input
              className="outline-none border-2 rounded-md px-2 py-1 text-slate-500 w-full focus:border-blue-300"
              placeholder="Email"
              id="username"
              name="email"
              type="text"
              onChange={handleChange}
            />
          </div>
          {errors.email && <p className="text-red-800">{errors.email}</p>}
          <div className="relative ">
            <input
              autoComplete="transaction-currency"
              className=" outline-none border-2 rounded-md px-2 py-1 text-slate-500 w-full focus:border-blue-300"
              placeholder="Password"
              id="password"
              name="password"
              type={showPass ? "text" : "password"}
              onChange={handleChange}
            />

            {showPass ? (
              <EyeOff
                onClick={() => {
                  setShowPass(!showPass);
                }}
                color="grey"
                className="absolute top-[17%] right-2 cursor-pointer"
              />
            ) : (
              <Eye
                onClick={() => {
                  setShowPass(!showPass);
                }}
                color="grey"
                className="absolute top-[17%] right-2 cursor-pointer"
              />
            )}

            {errors.password && (
              <p className="text-red-800">{errors.password}</p>
            )}
          </div>
          <button
            className="w-full justify-center py-1 bg-blue-500 hover:bg-blue-600 active:bg-blue-700 rounded-md text-white ring-2"
            id="login"
            name="login"
            type="submit"
          >
            Register
          </button>
          <p className="flex justify-center space-x-1">
            <span className="text-slate-700">
              If You Have already an account ?{" "}
            </span>
            <Link className="text-blue-500 hover:underline" to={"/login"}>
              Log in
            </Link>
          </p>
        </form>
      </div>
    </AppLayout>
  );
}

export default Register;
