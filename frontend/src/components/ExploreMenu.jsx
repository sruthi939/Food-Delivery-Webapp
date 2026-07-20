import React from 'react';
import { menu_list } from '../assets/assets';

const ExploreMenu = ({ category = "All", setCategory = () => {} }) => {
    return (
        <div className="w-4/5 mx-auto py-16 md:py-20 flex flex-col gap-8" id="explore-menu">
            <h1 className="text-white font-bold text-2xl md:text-3xl lg:text-4xl text-left tracking-tight pb-3 border-b border-white/5 animate-fade-in-up">
                Explore our menu
            </h1>
            <p className="text-[#a3a3a3] text-xs sm:text-sm md:text-base max-w-[650px] leading-relaxed font-light animate-fade-in-up delay-100">
                Explore our carefully curated menu featuring a wide variety of delicious dishes, 
                from mouthwatering appetizers to irresistible desserts. Every meal is prepared 
                with fresh, high-quality ingredients to deliver exceptional taste and satisfy every craving.
            </p>
            <div className="flex items-center gap-8 md:gap-12 overflow-x-auto py-8 px-4 scrollbar-none justify-start">
                {menu_list.map((item, index) => {
                    const isActive = category === item.menu_name;
                    return (
                        <div 
                            key={index} 
                            onClick={() => setCategory(prev => prev === item.menu_name ? "All" : item.menu_name)}
                            className="flex flex-col items-center gap-4 cursor-pointer min-w-[100px] sm:min-w-[120px] md:min-w-[140px] transition-all duration-300 hover:scale-105 active:scale-95 group flex-shrink-0 animate-fade-in-up"
                            style={{ animationDelay: `${index * 60 + 200}ms` }}
                        >
                            <img 
                                src={item.menu_image} 
                                alt={item.menu_name} 
                                className={`w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full object-cover transition-all duration-500 border-2 ${
                                    isActive 
                                        ? "border-[#D89A2B] p-1 bg-[#1A1A1A] shadow-lg shadow-[#D89A2B]/25 scale-105" 
                                        : "border-transparent hover:border-[#D89A2B]/40"
                                }`}
                            />
                            <p className={`text-xs sm:text-sm md:text-base font-semibold transition-colors duration-300 mt-2 ${
                                isActive ? "text-[#D89A2B]" : "text-[#E6D3A3] group-hover:text-white"
                            }`}>
                                {item.menu_name}
                            </p>
                        </div>
                    )
                })}
            </div>
        </div>
    );
};

export default ExploreMenu;