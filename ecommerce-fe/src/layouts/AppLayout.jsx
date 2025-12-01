import Navbar from "@/components/Navbar";
import HomeBanner from "@/pages/home/HomeBanner";
import React from "react";

const AppLayout = ({ children, isBannerVisible = false }) => {

  return (
    <>
      {isBannerVisible ? <HomeBanner /> : <Navbar isDark={true} />}
      {children}
    </>
  );
};

export default AppLayout;
