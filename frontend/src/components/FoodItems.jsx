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
                <img src={image} alt={name} className="w-70 h-50 object-cover transition-transform duration-500 group-hover:scale-105" />

                <button onClick={() => setIsLiked(!isLiked)} className="absolute top-4 right-4 w-12 h-12 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center">
                    <Heart size={24} className={isLiked ? "fill-[#D89A2B] text-[#D89A2B]" : "text-white"} />
                </button>
            </div>

            {/* Content Section with Side Padding */}
            <div className="bg-[#171717] px-6 py-6 flex flex-col flex-1">
                <h5 className="text-white text-xl font-bold text-center line-clamp-1">
                    {name}
                </h5>
                <p className="text-gray-300 text-sm text-center mt-2 line-clamp-1">
                    {description}
                </p>
                <div className="flex justify-center mt-4 mb-5">
                    {[...Array(5)].map((_, i) => (
                        <Star key={i} size={15} className="fill-[#FFC107] text-[#FFC107]" />
                    ))}
                </div>
                <div className="!mt-3 w-full">
                    <hr className="border-t border-[#D89A2B]/30" />
                </div>
                <div className="!mt-3 flex items-center justify-center">
                    <span className="text-[#FFC107] text-2xl font-semibold hover:scale-105 transition duration-300">
                        ${price}
                    </span>

                    {itemCount === 0 ? (
                        <button
                            onClick={() => setItemCount(1)}
                            className="ml-2 w-20 h-8 rounded-full bg-gradient-to-r from-[#D89A2B] to-[#B8791D] w-[120px] text-black font-semibold hover:scale-105 transition duration-300 shadow-lg shadow-[#D89A2B]/20 cursor-pointer"
                        >
                            <Plus size={20} className="inline mr-2" />
                            Add
                        </button>
                    ) : (
                        <div className="flex items-center gap-5 bg-[#F39C12] px-5 py-3 rounded-2xl">

                            <button onClick={() => setItemCount(Math.max(0, itemCount - 1))} className="text-black">
                                <Minus size={18} strokeWidth={2.5} />
                            </button>
                            <span className="text-black text-2xl font-bold">
                                {itemCount}
                            </span>
                            <button onClick={() => setItemCount(itemCount + 1)} className="text-black">
                                <Plus size={18} strokeWidth={2.5} />
                            </button>

                        </div>
                    )}

                </div>

            </div>
        </div>
    );
};

export default FoodItems;