import { useParams } from "react-router";
import ProductDetail from "./ProductDetails";
import { useEffect, useState } from "react";
import axios from "axios";
import AppLayout from "@/layouts/AppLayout";

export default function ProductPage() {
    const { id } = useParams();
    const [productData, setProductData] = useState({});

    useEffect(() => {
        axios.get(`http://localhost:3000/product/${id}`).then((e) => {
            setProductData(e.data)
        })
    }, [])

    return (
        <AppLayout>
            <ProductDetail product={productData} />
        </AppLayout>
    )
}
