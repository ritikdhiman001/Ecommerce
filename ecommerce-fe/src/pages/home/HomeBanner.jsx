import BgImg from "@/assets/images/Bg-Img.png"
import Navbar from '@/components/Navbar'
import React from 'react'

const HomeBanner = () => {
    return (
        <div className="w-full md:h-[730px] h-[250px] flex bg-no-repeat bg-cover bg-center" style={{ backgroundImage: `url(${BgImg})` }} >
            <Navbar  />
        </div>
    )
}

export default HomeBanner