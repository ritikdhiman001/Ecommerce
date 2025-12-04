import Navbar from "@/components/Navbar";
import Footer from "@/pages/Footer";
import HomeBanner from "@/pages/home/HomeBanner";
import React from "react";

const AppLayout = ({ children, isBannerVisible = false }) => {

  return (
    <>
      {isBannerVisible ? <HomeBanner /> : <Navbar isDark={true} />}
      {children}
      <Footer />
    </>
  );
};

export default AppLayout;
