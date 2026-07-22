import React, { useContext, useState } from "react";
import { Star, Heart, Plus, Minus } from "lucide-react";
import { StoreContext } from "../context/StoreContext";

const FoodItems = ({ id, name, price, description, image, index }) => {
    const [isLiked, setIsLiked] = useState(false);
    const [itemCount, setItemCount] = useState(0);
    const { cartItems, addToCart, removeFromCart } = useContext(StoreContext)
    return (
        <div
            className="group bg-[#111111] rounded-3xl overflow-hidden border border-[#222222] hover:border-[#D89A2B]/40 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-[#D89A2B]/10 flex flex-col"
            style={{ animationDelay: `${index * 60}ms` }}
        >
            {/* Image Container */}
            <div className="relative overflow-hidden">
                <img
                    src={image}
                    alt={name}
                    className="w-full h-52 object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Like Button */}
                <button
                    onClick={() => setIsLiked(!isLiked)}
                    className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/40 flex items-center justify-center text-white hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer shadow-md z-10"
                    aria-label="Like item"
                >
                    <Heart
                        size={20}
                        className={`transition-colors duration-300 ${isLiked ? "fill-red-500 text-red-500" : "text-white/80 hover:text-white"}`}
                    />
                </button>
            </div>

            {/* Content Section */}
            <div className="px-6 pt-5 pb-6 flex flex-col flex-1 gap-2 bg-[#111111]">
                {/* Title */}
                <h3 className="text-white font-bold text-xl text-center line-clamp-1">
                    {name}
                </h3>

                {/* Description */}
                <p className="text-[#a3a3a3] text-sm text-center leading-relaxed font-light line-clamp-2">
                    {description}
                </p>

                {/* Star Rating */}
                <div className="flex justify-center gap-1">
                    {[...Array(5)].map((_, i) => (
                        <Star
                            key={i}
                            size={15}
                            className="fill-[#D89A2B] text-[#D89A2B]"
                        />
                    ))}
                </div>

                {/* Divider Line */}
                <div className="w-full my-2">
                    <hr className="border-t border-[#262626]" />
                </div>

                {/* Price & Add to Cart Row */}
                <div className="flex items-center justify-center !mt-auto">
                    <span className="text-[#D89A2B] text-2xl font-bold">
                        ${price}
                    </span>

                    {itemCount === 0 ? (
                        <button
                            onClick={() => setItemCount(1)}
                            className="!px-9 !py-2 rounded-xl bg-[#D89A2B] hover:bg-[#c48922] text-black font-bold text-sm shadow-md hover:scale-105 active:scale-95 transition duration-300 cursor-pointer"
                        >
                            + Add
                        </button>
                    ) : (
                        <div className="flex items-center gap-2.5 bg-[#1C1A17] border border-[#D89A2B]/40 px-2.5 py-1.5 rounded-xl shadow-inner">
                            <button
                                onClick={() => setItemCount(prev => Math.max(0, prev - 1))}
                                className="w-6 h-6 rounded-full bg-[#2A241C] flex items-center justify-center text-[#D89A2B] hover:bg-[#D89A2B] hover:text-black transition cursor-pointer"
                            >
                                <Minus size={13} className="stroke-[3]" />
                            </button>
                            <span className="text-white font-bold text-xs min-w-[14px] text-center">{itemCount}</span>
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
        </div>
    );
};

export default FoodItems;