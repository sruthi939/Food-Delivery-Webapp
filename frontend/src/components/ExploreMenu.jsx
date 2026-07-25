import React from "react";
import { menu_list, assets } from "../assets/assets";

const ExploreMenu = ({ category, setCategory }) => {
    return (
        <section id="explore-menu" className="w-full max-w-full !px-4 sm:px-8 lg:px-16 !pt-4 !pb-6 flex flex-col overflow-hidden">

            {/* Top Hero Row */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-8 !mb-4 min-h-[350px]">

                {/* Left Group: Title + Vertical Divider Line + Description */}
                <div className="flex flex-col sm:flex-row items-center sm:items-right gap-6 sm:gap-8 flex-1 z-10 !pl-2 sm:!pl-4">
                    <div>
                        <span className="text-3xl sm:text-4xl lg:text-5xl font-light text-white block">
                            Our Delicious
                        </span>
                        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-[#D89A2B] font-serif leading-tight !mt-1">
                            Menu
                        </h1>
                    </div>

                    {/* Vertical Line Divider */}
                    <div className="h-16 w-[1px] bg-[#2A241C] hidden sm:block shrink-0" />

                    {/* Subtitle Description */}
                    <p className="text-gray-400 text-xs sm:text-sm leading-relaxed max-w-xs font-light">
                        Explore a wide range of mouth-watering dishes made with the finest ingredients and a touch of love.
                    </p>
                </div>

                {/* Right Hero Image (Seamlessly blended, full-bleed right layout) */}
                <div className="relative w-full md:w-1/2 lg:w-3/5 h-72 sm:h-96 md:h-[420px] flex items-center justify-end overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-black via-transparent to-transparent z-10 pointer-events-none" />
                    <div className="absolute inset-0 bg-[#D89A2B]/10 rounded-full blur-3xl pointer-events-none" />

                    <img
                        src={assets.menu_header}
                        alt="Delicious Noodles Dish"
                        className="w-full h-full object-cover md:object-right mix-blend-lighten [mask-image:linear-gradient(to_right,transparent_0%,black_20%,black_80%,transparent_100%)] relative z-0 hover:scale-105 transition-transform duration-700"
                    />
                </div>
            </div>

            {/* Category Filter Pills Bar */}
            <div className="flex items-center gap-3.5 overflow-x-auto pb-4 pt-2 scrollbar-none scroll-smooth max-w-7xl mx-auto w-full">
                {menu_list.map((item, index) => {
                    const isActive = category === item.menu_name || (category === "All" && item.menu_name === "All");

                    return (
                        <button
                            key={index}
                            onClick={() => setCategory(item.menu_name === "All" ? "All" : (category === item.menu_name ? "All" : item.menu_name))}
                            className={`!px-6 !py-3 rounded-2xl text-xs sm:text-sm font-bold flex items-center gap-3 whitespace-nowrap transition-all duration-300 cursor-pointer ${isActive
                                ? "bg-[#D89A2B] text-black shadow-lg shadow-[#D89A2B]/20 font-extrabold"
                                : "bg-[#111111] border border-[#222222] text-gray-300 hover:text-white hover:border-[#D89A2B]/40"
                                }`}
                        >
                            <span className="text-base">{item.icon}</span>
                            <span>{item.menu_name}</span>
                        </button>
                    );
                })}
            </div>

            {/* Section Ornament Divider */}
            <div className="flex items-center justify-center gap-4 my-8 max-w-7xl mx-auto w-full">
                <div className="h-[1px] w-16 sm:w-28 bg-gradient-to-r from-transparent to-[#D89A2B]/50" />
                <span className="text-[#D89A2B] font-serif text-sm sm:text-base font-bold tracking-widest flex items-center gap-2">
                    ❖ All Dishes ❖
                </span>
                <div className="h-[1px] w-16 sm:w-28 bg-gradient-to-l from-transparent to-[#D89A2B]/50" />
            </div>

        </section>
    );
};

export default ExploreMenu;