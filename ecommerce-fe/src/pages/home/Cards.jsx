import { useCart } from "@/context/CartProvider";
import { formatter } from "@/utils";
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Button,
} from "@material-tailwind/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

export function Cards() {
    const [ValData, setValData] = useState([]);
    const { addToCart, cartItems } = useCart();
    const navigate = useNavigate();
    useEffect(() => {
        axios
            .get("http://localhost:3000/allproducts")
            .then((response) => setValData(response.data))
            .catch((error) => console.log(error.message));
    }, []);

    const handleAddToCart = (product) => {
        addToCart(product?._id, 1, product.price);
        if (addToCart) toast.success("Product Added to Cart");
    };
    return (
        <div className="min-h-screen bg-white dark:bg-zinc-900 px-6 py-8 ">
            <h1 className="text-3xl font-bold text-center mb-8 text-zinc-800 dark:text-white">
                Products
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
                {ValData.map((val, i) => {
                    {/* const existing = cartItems.find((item) => item._id === val._id); */ }
                    const existing = cartItems.find((item) => item[val._id]);

                    return (
                        <Card
                            key={i}
                            className="shadow-md rounded-lg overflow-hidden bg-gray-100 dark:bg-zinc-800"
                        >
                            <CardHeader className="h-60 p-0">
                                <img
                                    src={`http://localhost:3000/uploads/${val.image}`}
                                    alt={val.productName}
                                    className="w-full h-full object-cover"
                                />
                            </CardHeader>
                            <CardBody className="px-4 py-3">
                                <Typography
                                    variant="h6"
                                    className="text-lg font-semibold text-zinc-800 dark:text-white"
                                >
                                    {val.productName}
                                </Typography>
                                <Typography className="text-sm text-zinc-600 dark:text-zinc-300 mb-2">
                                    {val.category}
                                </Typography>
                                <Typography className="text-blue-700 dark:text-blue-400 font-bold text-xl mb-2">
                                    {formatter.format(val.price)}
                                </Typography>
                                <Typography className="text-sm text-zinc-600 dark:text-zinc-400 line-clamp-2">
                                    {val.description}
                                </Typography>
                            </CardBody>
                            <CardFooter className="px-4 pb-4 flex gap-2">
                                {existing ? (
                                    <Button
                                        onClick={() => navigate("/cart")}
                                        className="w-full bg-gray-800 cursor-pointer hover:bg-black border border-white text-white"
                                    >
                                        Go to Cart
                                    </Button>
                                ) : (
                                    <Button
                                        onClick={() => handleAddToCart(val)}
                                        className="w-full bg-blue-700 cursor-pointer hover:bg-blue-800 text-white"
                                    >
                                        Add to Cart
                                    </Button>
                                )}
                                <Button onClick={() => navigate(`/product/${val._id}`)} className="w-full bg-blue-700 cursor-pointer hover:bg-blue-800 text-white">View More   </Button>
                            </CardFooter>
                        </Card>
                    );
                })}
            </div>
        </div>
    );
}
