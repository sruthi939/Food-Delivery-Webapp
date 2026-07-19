import React from "react";
import { assets } from "../assets/assets";

const Header = () => {
    return (
        <div
            className="relative w-full aspect-[2.35/1] min-h-[240px] sm:min-h-[300px] md:min-h-[380px] lg:min-h-[450px] mt-8 bg-no-repeat bg-cover bg-center rounded-3xl overflow-hidden shadow-2xl"
            style={{ backgroundImage: `url(${assets.header_img})` }}
        >
            {/* Dark gradient overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent"></div>

            {/* Content Overlay */}
            <div className="absolute inset-0 z-10 flex flex-col justify-center items-start px-8 sm:px-12 md:px-16 lg:px-20 max-w-[75%] sm:max-w-[65%] gap-2 sm:gap-4 md:gap-5 lg:gap-6">
                <h2 className="text-white font-bold text-xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl tracking-tight leading-tight">
                    Order your favourite food here
                </h2>

                <p className="text-white/95 text-[10px] sm:text-xs md:text-sm lg:text-base xl:text-lg leading-relaxed font-light line-clamp-3 sm:line-clamp-none">
                    Choose from a diverse menu featuring a delectable array of dishes
                    crafted with the finest ingredients and culinary expertise. Our
                    mission is to satisfy your cravings and deliver a delicious meal on
                    time.
                </p>

                <button className="mt-1 sm:mt-2 px-5 py-2 sm:px-8 sm:py-3.5 bg-white text-gray-900 text-xs sm:text-sm md:text-base font-semibold rounded-full hover:bg-[#D89A2B] hover:text-white hover:scale-105 active:scale-95 transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-[#D89A2B]/20 cursor-pointer">
                    View Menu
                </button>
            </div>
        </div>
    );
};

export default Header;