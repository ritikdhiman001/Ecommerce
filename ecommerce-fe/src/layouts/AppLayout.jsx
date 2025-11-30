import Navbar from "@/components/Navbar";
import HomeBanner from "@/pages/home/HomeBanner";
import React from "react";

const AppLayout = ({ children }) => {
    return (
        <>
        <HomeBanner/>
            {children}
        </>
    );
};

export default AppLayout;
