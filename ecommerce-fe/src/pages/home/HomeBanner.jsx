import BgImg from "@/assets/images/Bg-Img.png"
import Navbar from '@/components/Navbar'
import React from 'react'

const HomeBanner = () => {
    return (
        <div className="w-full h-[730px] flex bg-no-repeat bg-cover" style={{ backgroundImage: `url(${BgImg})` }} >
            <Navbar  />
        </div>
    )
}

export default HomeBanner