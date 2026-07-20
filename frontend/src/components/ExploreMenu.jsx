import React from "react";
import { menu_list } from "../assets/assets";

const ExploreMenu = ({ category, setCategory }) => {
    return (
        <section
            id="explore-menu"
            className="w-4/5 mx-auto py-24 flex flex-col items-center"
        >
            {/* Heading */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white text-center animate-fade-in-up">
                Explore our{" "}
                <span className="text-[#D89A2B]">Menu</span>
            </h1>

            {/* Description */}
            <p className="text-center text-gray-400 text-base md:text-lg leading-8 max-w-3xl mt-8 animate-fade-in-up delay-100">
                Explore our carefully curated menu featuring a wide variety of
                delicious dishes, from mouthwatering appetizers to irresistible
                desserts. Every meal is prepared with fresh, high-quality
                ingredients to deliver exceptional taste and satisfy every
                craving.
            </p>

            {/* Menu Categories */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-8 mt-20 w-full">
                {menu_list.map((item, index) => {
                    const isActive = category === item.menu_name;

                    return (
                        <div
                            key={index}
                            onClick={() =>
                                setCategory(
                                    isActive ? "All" : item.menu_name
                                )
                            }
                            className="flex flex-col items-center cursor-pointer group transition-all duration-300 hover:scale-105"
                        >
                            <div
                                className={`w-28 h-28 rounded-full overflow-hidden border-2 transition-all duration-300 ${isActive
                                        ? "border-[#D89A2B] shadow-lg shadow-[#D89A2B]/40"
                                        : "border-transparent hover:border-[#D89A2B]/50"
                                    }`}
                            >
                                <img
                                    src={item.menu_image}
                                    alt={item.menu_name}
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            <p
                                className={`mt-5 text-lg font-semibold transition-colors ${isActive
                                        ? "text-[#D89A2B]"
                                        : "text-[#E6D3A3] group-hover:text-white"
                                    }`}
                            >
                                {item.menu_name}
                            </p>
                        </div>
                    );
                })}
            </div>
        </section>
    );
};

export default ExploreMenu;