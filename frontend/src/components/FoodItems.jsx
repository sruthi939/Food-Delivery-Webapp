import React from "react";
import { Star, Plus } from "lucide-react";

const FoodItems = ({ name, price, description, image, index }) => {
    return (
        <div
            className="bg-[#111111] rounded-2xl overflow-hidden border border-[#262626] hover:border-[#D89A2B] transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-[#D89A2B]/20 flex flex-col"
            style={{ animationDelay: `${index * 100}ms` }}
        >
            {/* Image */}
            <div className="relative overflow-hidden">
                <img
                    src={image}
                    alt={name}
                    className="w-full h-60 object-cover transition-transform duration-500 group-hover:scale-110"
                />
            </div>

            {/* Content */}
            <div className="p-5 flex flex-col flex-1">
                {/* Title and Rating Info */}
                <div className="mb-3">
                    <h3 className="text-white text-xl font-semibold tracking-tight leading-snug line-clamp-1">
                        {name}
                    </h3>
                    <div className="flex gap-0.5 mt-1.5">
                        {[...Array(5)].map((_, i) => (
                            <Star
                                key={i}
                                size={14}
                                className="fill-[#D89A2B] text-[#D89A2B]"
                            />
                        ))}
                    </div>
                </div>

                <p className="text-[#a3a3a3] text-sm leading-relaxed flex-1 font-light">{description}</p>
                <p className="text-[#D89A2B] text-3xl font-bold mt-4">${price}</p>
            </div>
        </div>
    );
};

export default FoodItems;