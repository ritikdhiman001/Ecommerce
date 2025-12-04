import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartProvider";
import CartItem from "./CartItem";
import { useEffect, useState } from "react";
import { formatter } from "@/utils";
import AppLayout from "@/layouts/AppLayout";

const Cart = () => {
    const { cartItems } = useCart();
    const [total, setTotal] = useState(0);

    useEffect(() => {
        let total = 0;
        cartItems.map((cartItem) => {
            Object.keys(cartItem).map((e) => {
                if (cartItem[e].qty && cartItem[e].price) {
                    total += Number(cartItem[e].qty) * Number(cartItem[e].price);
                }
            });
        });
        setTotal(total);
    }, [cartItems, setTotal]);

    return (
        <AppLayout>
            <div className="min-h-screen bg-white dark:bg-zinc-900 text-black dark:text-white p-6 mt-15">
                <h1 className="text-center text-3xl font-bold mb-6">Your Cart</h1>

                <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
                    <div className="md:col-span-2 space-y-6">
                        {cartItems.map((val) => {
                            const id = Object.keys(val)[0];
                            const qty = val[id].qty;
                            return <CartItem key={id} id={id} qty={qty} setTotal={setTotal} />;
                        })}
                    </div>

                    {/* Order Summary */}
                    <div className="border p-6 rounded-md bg-gray-50 dark:bg-zinc-800 h-fit">
                        <h2 className="text-xl font-bold mb-4">Order Summary</h2>
                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                                <span>Subtotal</span>
                                <span>{formatter.format(total)}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Shipping</span>
                                <span className="text-green-600">Free</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Estimated Tax</span>
                                <span className="underline cursor-pointer">Calculate</span>
                            </div>
                            <hr />
                            <div className="flex justify-between font-semibold text-lg">
                                <span>Estimated Total</span>
                                <span>{formatter.format(total)}</span>
                            </div>
                        </div>

                        <Button className="w-full mt-6 bg-black text-white hover:bg-gray-800">
                            Checkout
                        </Button>
                        <Button className="w-full mt-4 bg-blue-600 hover:bg-blue-700">
                            Pay with PayPal
                        </Button>
                        <Button className="w-full mt-2 bg-yellow-400 hover:bg-yellow-500 text-black">
                            Pay with Amazon
                        </Button>

                        <p className="text-xs text-gray-600 dark:text-gray-400 mt-4">
                            You will be charged at the time of shipment...
                        </p>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
};

export default Cart;
