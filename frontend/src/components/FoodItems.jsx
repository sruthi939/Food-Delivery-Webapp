import React from "react";
import { Star } from "lucide-react";

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
                <div className="flex items-center justify-between">
                    <h3 className="text-white font-bold text-xl">{name}</h3>

                    <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, index) => (
                            <Star
                                key={index}
                                className="w-4 h-4 fill-[#D89A2B] text-[#D89A2B]"
                            />
                        ))}
                    </div>
                </div>

                <p className="text-[#a3a3a3] text-l leading-relaxed flex-1 font-light">{description}</p>
                <p className="text-[#D89A2B] text-2xl font-bold mt-4">${price}</p>
            </div>
        </div>
    );
};

export default FoodItems;