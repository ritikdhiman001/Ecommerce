import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DialogClose, DialogDescription } from "@radix-ui/react-dialog";
import axios from "axios";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";

function AddUser({ open, setOpen, setIsFetch }) {
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
    const [showPass, setShowPass] = useState(false);

    function HandleChange(e) {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    }

    function subBtn(e) {
        e.preventDefault();
        let emailRegex = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;
        let passwordRegex =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&])[A-Za-z\d@$!%*?#&]{6,}$/;
        if (formData.firstName.trim() === "") {
            setErrors((prev) => ({ ...prev, firstName: "First Name is required" }));
        } else if (formData.lastName.trim() === "") {
            setErrors((prev) => ({ ...prev, lastName: "Last Name is required" }));
        } else if (formData.email.trim() === "") {
            setErrors((prev) => ({ ...prev, email: "Email is required" }));
        } else if (formData.password.trim() === "") {
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
            axios
                .post("http://localhost:3000/adduser", {
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    email: formData.email,
                    password: formData.password,
                })
                .then((response) => {
                    console.log(response);
                    setOpen(false)
                    setIsFetch(true)
                    toast.success("User Added Successfully");
                })
                .catch((errors) => {
                    console.log(errors);
                    toast.error("Failed to Add User");
                });
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="sm:max-w-[425px]">
                <form onSubmit={subBtn}>
                    <DialogHeader>
                        <DialogTitle className="text-center">Add User</DialogTitle>
                        <DialogDescription>
                            Please fill in the user details to add a new user.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4">
                        <div className="grid gap-3">
                            <Label>First Name</Label>
                            <Input
                                type="text"
                                id="firstName"
                                name="firstName"
                                onChange={HandleChange}
                            />
                            {errors.firstName && (
                                <p className="text-red-800">{errors.firstName}</p>
                            )}
                        </div>
                        <div className="grid gap-3">
                            <Label>Last Name</Label>
                            <Input
                                type="text"
                                id="lastName"
                                name="lastName"
                                onChange={HandleChange}
                            />
                            {errors.lastName && (
                                <p className="text-red-800">{errors.lastName}</p>
                            )}
                        </div>
                        <div className="grid gap-3">
                            <Label>Email</Label>
                            <Input
                                type="email"
                                id="email"
                                name="email"
                                onChange={HandleChange}
                            />
                            {errors.email && <p className="text-red-800">{errors.email}</p>}
                        </div>
                        <div className="grid gap-3 relative">
                            <Label>Password</Label>
                            <Input
                                id="password"
                                name="password"
                                type={showPass ? "text" : "password"}
                                onChange={HandleChange}
                            />
                            {showPass ? (
                                <EyeOff
                                    onClick={() => setShowPass(!showPass)}
                                    color="grey"
                                    className="absolute mt-8 right-2 cursor-pointer"
                                />
                            ) : (
                                <Eye
                                    onClick={() => setShowPass(!showPass)}
                                    color="grey"
                                    className="absolute mt-8 right-2 cursor-pointer"
                                />
                            )}
                            {errors.password && (
                                <p className="text-red-800">{errors.password}</p>
                            )}
                        </div>
                    </div>
                    <DialogFooter className="mt-2">
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button className={"cursor-pointer"} type="submit">
                            Save
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}

export default AddUser;
