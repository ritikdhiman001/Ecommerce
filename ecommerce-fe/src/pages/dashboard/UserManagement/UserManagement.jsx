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
import AddUser from "./AddUser";

function UserManagement() {
    const [ValData, setValData] = useState([]);
    const [open, setOpen] = useState(false);
    const [isFetch, setIsFetch] = useState(false)

    useEffect(() => {
        getUsers();
    }, [isFetch]);

    const getUsers = () => {
        axios
            .get("http://localhost:3000/allusers")
            .then((response) => {
                setValData(response.data);
            })
            .catch((error) => {
                console.log(error.message.data);
            });
    };

    return (
        <DashboardLayout>
            <h2 className="text-center text-4xl font-bold">User List</h2>
            <button
                onClick={() => {
                    setOpen(true);
                }}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
            >
                Add User
            </button>
            <AddUser open={open} setOpen={setOpen} setIsFetch={setIsFetch} />
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Sr No</TableHead>
                        <TableHead>First Name</TableHead>
                        <TableHead>Last Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Password</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {ValData.map((val, i) => (
                        <TableRow key={i}>
                            <TableCell className="font-medium">{i + 1}</TableCell>
                            <TableCell>{val.firstName}</TableCell>
                            <TableCell>{val.lastName}</TableCell>
                            <TableCell>{val.email}</TableCell>
                            <TableCell>{val.password}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </DashboardLayout>
    );
}

export default UserManagement;
