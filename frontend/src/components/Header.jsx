import React from "react";
import { assets } from "../assets/assets";
import { ArrowRight } from "lucide-react";

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
                <div className="max-w-xl space-y-6 animate-fade-in-up">
                    <h1 className="text-5xl lg:text-7xl font-bold leading-tight text-white">
                        Order your {" "}

                        <span className="text-[#D89A2B]">favourite food</span>

                        <div className="flex items-center gap-4 mt-4">
                            <span>here</span>

                            <button className="w-14 h-14 rounded-full bg-[#D89A2B] flex items-center justify-center hover:scale-110 transition-all duration-300 shadow-lg shadow-[#D89A2B]/30 cursor-pointer">
                                <ArrowRight className="w-7 h-7 text-black" />
                            </button>
                        </div>
                    </h1>
                    <p className="text-gray-300 text-lg leading-8">
                        Choose from a diverse menu featuring a delectable array of dishes
                        crafted with the finest ingredients and culinary expertise. Our
                        mission is to satisfy your cravings.
                    </p>
                </div>
            </div>
        </div >
    );
};

export default Header;