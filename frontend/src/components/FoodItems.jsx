import React, { useContext } from "react";
import { Plus, Minus, Heart } from "lucide-react";
import { StoreContext } from "../context/StoreContext";

const FoodItems = ({ id, name, price, description, image, isVeg = true, index }) => {
    const { cartItems, addToCart, removeFromCart, wishlist, toggleWishlist } = useContext(StoreContext);
    const isLiked = !!(wishlist && wishlist[id]);
    const quantity = cartItems[id] || 0;

    return (
        <div
            className="group bg-[#0D0D0D] border border-[#222222] hover:border-[#D89A2B]/40 rounded-2xl !p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#D89A2B]/10 flex items-center gap-4 relative overflow-hidden"
            style={{ animationDelay: `${index * 50}ms` }}
        >
            {/* Image Thumbnail */}
            <div className="relative shrink-0 overflow-hidden rounded-xl border border-[#222222]">
                <img
                    src={image}
                    alt={name}
                    className="w-28 h-28 sm:w-32 sm:h-32 object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Wishlist Heart Icon */}
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        toggleWishlist(id);
                    }}
                    className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white hover:scale-110 active:scale-95 transition cursor-pointer z-10"
                    aria-label="Wishlist"
                >
                    <Heart
                        size={14}
                        className={`transition-colors ${isLiked ? "fill-[#D89A2B] text-[#D89A2B]" : "text-white/80 hover:text-white"}`}
                    />
                </button>
            </div>

            {/* Content Section */}
            <div className="flex flex-col justify-between flex-1 min-w-0 h-full !py-0.5">

                {/* Title & Veg/Non-Veg Badge Row */}
                <div>
                    <div className="flex items-start justify-between gap-2">
                        <h3 className="font-bold text-white text-base sm:text-lg line-clamp-1 group-hover:text-[#D89A2B] transition-colors">
                            {name}
                        </h3>

                        {/* Veg / Non-Veg Indicator Dot */}
                        <div
                            className={`w-4 h-4 rounded-sm border flex items-center justify-center shrink-0 !mt-1 ${isVeg ? "border-emerald-500" : "border-red-500"
                                }`}
                            title={isVeg ? "Vegetarian" : "Non-Vegetarian"}
                        >
                            <div className={`w-2 h-2 rounded-full ${isVeg ? "bg-emerald-500" : "bg-red-500"}`} />
                        </div>
                    </div>

                    {/* Description */}
                    <p className="text-xs text-gray-400 line-clamp-2 !mt-1 leading-relaxed font-light">
                        {description}
                    </p>
                </div>

                {/* Price & Add Button Row */}
                <div className="flex items-center justify-between !mt-3 !pt-2 border-t border-[#1C1C1C]">
                    <span className="text-[#D89A2B] font-bold text-base sm:text-lg">
                        ${typeof price === 'number' ? price.toFixed(2) : price}
                    </span>

                    {quantity === 0 ? (
                        <button
                            onClick={() => addToCart(id)}
                            className="w-8 h-8 rounded-full bg-[#D89A2B] hover:bg-[#c48922] text-black font-extrabold flex items-center justify-center cursor-pointer shadow-md hover:scale-110 active:scale-95 transition-all duration-200"
                            aria-label="Add to cart"
                        >
                            <Plus size={16} className="stroke-[3]" />
                        </button>
                    ) : (
                        <div className="flex items-center gap-2 bg-[#1C1A17] border border-[#D89A2B]/40 !px-2 !py-1 rounded-xl shadow-inner">
                            <button
                                onClick={() => removeFromCart(id)}
                                className="w-5 h-5 rounded-full bg-[#2A241C] flex items-center justify-center text-[#D89A2B] hover:bg-[#D89A2B] hover:text-black transition cursor-pointer"
                            >
                                <Minus size={11} className="stroke-[3]" />
                            </button>
                            <span className="text-white font-bold text-xs min-w-[14px] text-center">{quantity}</span>
                            <button
                                onClick={() => addToCart(id)}
                                className="w-5 h-5 rounded-full bg-[#D89A2B] flex items-center justify-center text-black hover:bg-[#c48922] transition cursor-pointer"
                            >
                                <Plus size={11} className="stroke-[3]" />
                            </button>
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
};

export default FoodItems;