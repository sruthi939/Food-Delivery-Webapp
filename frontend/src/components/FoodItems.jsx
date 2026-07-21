import React, { useState } from "react";
import { Star, Heart, Plus, Minus } from "lucide-react";

const FoodItems = ({ id, name, price, description, image, index }) => {
    const [isLiked, setIsLiked] = useState(false);
    const [itemCount, setItemCount] = useState(0);

    return (
        <div
            className="group bg-[#111111] rounded-2xl overflow-hidden border border-[#262626] hover:border-[#D89A2B] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-[#D89A2B]/15 flex flex-col"
            style={{ animationDelay: `${index * 80}ms` }}
        >
            {/* Image Container with Floating Action Buttons */}
            <div className="relative overflow-hidden">
                <img
                    src={image}
                    alt={name}
                    className="w-full h-56 sm:h-60 object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Like Button (Top-Right) */}
                <button
                    onClick={() => setIsLiked(!isLiked)}
                    className="absolute top-3 right-3 w-9 h-9 rounded-full bg-black/60 border border-white/20 flex items-center justify-center text-white hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer shadow-md z-10"
                    aria-label="Like item"
                >
                    <Heart
                        size={17}
                        className={`transition-colors duration-300 ${isLiked ? "fill-red-500 text-red-500" : "text-white/80 hover:text-white"}`}
                    />
                </button>

                {/* Add to Cart Button / Counter (Bottom-Right of Image) */}
                <div className="absolute bottom-3 right-3 z-10">
                    {itemCount === 0 ? (
                        <button
                            onClick={() => setItemCount(1)}
                            className="flex items-center gap-1.5 px-5 py-3 rounded-full bg-[#D89A2B] hover:bg-[#c48922] text-black font-bold text-xs sm:text-sm shadow-lg hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
                        >
                            <Plus size={16} className="stroke-[3]" />
                            <span>Add</span>
                        </button>
                    ) : (
                        <div className="flex items-center gap-2 bg-[#111111]/90 border border-[#D89A2B] px-2.5 py-1 rounded-full shadow-lg backdrop-blur-sm">
                            <button
                                onClick={() => setItemCount(prev => Math.max(0, prev - 1))}
                                className="w-6 h-6 rounded-full bg-[#262626] flex items-center justify-center text-[#D89A2B] hover:bg-[#D89A2B] hover:text-black transition cursor-pointer"
                            >
                                <Minus size={13} className="stroke-[3]" />
                            </button>
                            <span className="text-white font-bold text-xs min-w-[16px] text-center">{itemCount}</span>
                            <button
                                onClick={() => setItemCount(prev => prev + 1)}
                                className="w-6 h-6 rounded-full bg-[#D89A2B] flex items-center justify-center text-black hover:bg-[#c48922] transition cursor-pointer"
                            >
                                <Plus size={13} className="stroke-[3]" />
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Content Section with Side Padding */}
            <div className="p-6 flex flex-col flex-1 gap-3">
                {/* Title & Rating */}
                <div className="flex items-center justify-between gap-2">
                    <h3 className="text-white font-bold text-lg sm:text-xl line-clamp-1">{name}</h3>

                    <div className="flex items-center gap-0.5 shrink-0">
                        {[...Array(5)].map((_, i) => (
                            <Star
                                key={i}
                                size={15}
                                className="fill-[#D89A2B] text-[#D89A2B]"
                            />
                        ))}
                    </div>
                </div>

                {/* Description Paragraph */}
                <p className="text-[#a3a3a3] text-xs sm:text-sm leading-relaxed font-light line-clamp-2 flex-1">
                    {description}
                </p>

                {/* Price */}
                <div className="mt-auto pt-2">
                    <p className="text-[#D89A2B] text-2xl font-bold">${price}</p>
                </div>
            </div>
        </div>
    );
};

export default FoodItems;