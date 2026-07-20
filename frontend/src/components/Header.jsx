import React from "react";
import { assets } from "../assets/assets";

const Header = () => {
    return (
        <div
            className="relative w-full h-screen pt-[90px] bg-no-repeat bg-cover bg-top shadow-2xl"
            style={{ backgroundImage: `url(${assets.header_img})` }}
        >
            {/* Dark gradient overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/45 to-transparent z-0"></div>

            {/* Content Wrapper aligned with the w-4/5 site grid */}
            <div className="w-4/5 mx-auto h-full relative z-10 flex flex-col justify-center items-start px-4 sm:px-6 md:px-8">
                <div className="flex flex-col items-start gap-4 max-w-full sm:max-w-[85%] md:max-w-[75%] lg:max-w-[55%]">
                    <h2 className="text-white font-bold text-3xl sm:text-4xl md:text-5xl lg:text-[3.8vw] leading-[1.15] animate-fade-in-up delay-100">
                        Order your <span className="text-[#D89A2B]">favourite food</span> here
                    </h2>
                    <p className="text-gray-200 text-sm md:text-base lg:text-[1.05vw] leading-relaxed max-w-[500px] font-light mt-2 animate-fade-in-up delay-200">
                        Choose from a diverse menu featuring a delectable array of dishes
                        crafted with the finest ingredients and culinary expertise. Our
                        mission is to satisfy your cravings.
                    </p>
                    <button className="inline-block !px-10 !py-4 bg-gradient-to-r from-[#D89A2B] to-[#B8791D] text-black text-sm md:text-base font-bold rounded-full shadow-lg shadow-[#D89A2B]/30 hover:scale-105 hover:shadow-xl hover:shadow-[#D89A2B]/40 active:scale-95 transition-all duration-300 cursor-pointer border-none outline-none animate-fade-in-up delay-300 mt-2">
                        View Menu
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Header;