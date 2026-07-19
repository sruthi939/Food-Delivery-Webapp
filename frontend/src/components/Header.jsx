import React from "react";
import { assets } from "../assets/assets";

const Header = () => {
    return (
        <div
            className="relative w-full h-[38vw] min-h-[350px] bg-no-repeat bg-cover bg-center shadow-2xl"
            style={{ backgroundImage: `url(${assets.header_img})` }}
        >
            {/* Dark gradient overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/45 to-transparent z-0"></div>

            {/* Centered Content Wrapper aligned with Navbar */}
            <div className="w-4/5 mx-auto h-full relative z-10 flex flex-col justify-center items-start px-8 sm:px-12 md:px-16">
                <div className="flex flex-col items-start gap-[1.5vw] max-w-[55%]">
                    <h2 className="text-white font-bold text-[max(4vw,24px)] leading-[1.15]">
                        Order your <span className="text-[#D89A2B]">favourite food</span> here
                    </h2>
                    <p className="text-[#f3f4f6] text-[max(1.1vw,12px)] leading-relaxed font-light">
                        Choose from a diverse menu featuring a delectable array of dishes
                        crafted with the finest ingredients and culinary expertise. Our
                        mission is to satisfy your cravings and deliver a delicious meal on
                        time.
                    </p>
                    <button className="px-20 py-15 bg-gradient-to-r from-[#D89A2B] to-[#B8791D] text-black text-lg font-semibold rounded-full shadow-lg shadow-[#D89A2B]/30 hover:scale-105 hover:shadow-xl hover:shadow-[#D89A2B]/40 active:scale-95 transition-all duration-300">
                        View Menu
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Header;