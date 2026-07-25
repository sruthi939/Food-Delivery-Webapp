import React, { useContext } from "react";
import { StoreContext } from "../context/StoreContext";
import { X, Plus, Minus, ShoppingBag } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CartItems = () => {
    const { cartItems, food_list, addToCart, removeFromCart } = useContext(StoreContext);
    const navigate = useNavigate();

    const hasItems = Object.values(cartItems).some((count) => count > 0);

    if (!hasItems) {
        return (
            <div className="flex flex-col items-center justify-center py-16 bg-[#111111] border border-[#222222] rounded-3xl p-8 text-center shadow-xl">
                <div className="w-20 h-20 rounded-full bg-[#1C1A17] border border-[#D89A2B]/30 flex items-center justify-center text-[#D89A2B] mb-6 shadow-inner">
                    <ShoppingBag size={36} />
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">
                    Your cart is empty
                </h2>
                <p className="text-gray-400 text-sm max-w-md mb-8 leading-relaxed">
                    Add your favorite dishes from our menu to see them listed here.
                </p>
                <button
                    onClick={() => navigate('/')}
                    className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-[#D89A2B] to-[#B8791D] text-black font-bold text-sm hover:scale-105 transition duration-300 shadow-lg shadow-[#D89A2B]/20 cursor-pointer"
                >
                    Browse Menu
                </button>
            </div>
        );
    }

    return (
        <div className="w-full">
            {/* Table Header (Desktop) */}
            <div className="hidden sm:grid grid-cols-6 items-center border-b border-[#262626] pb-4 px-4 text-[#D89A2B] font-bold text-sm tracking-wider uppercase">
                <p>Items</p>
                <p>Title</p>
                <p>Price</p>
                <p className="text-center">Quantity</p>
                <p>Total</p>
                <p className="text-center">Remove</p>
            </div>

            {/* Cart Items List */}
            <div className="divide-y divide-[#1F1F1F]">
                {food_list.map((item) => {
                    if (cartItems[item._id] > 0) {
                        const quantity = cartItems[item._id];
                        const total = item.price * quantity;

                        return (
                            <div
                                key={item._id}
                                className="grid grid-cols-2 sm:grid-cols-6 items-center gap-4 py-5 px-4 hover:bg-[#141414]/60 transition-all duration-200 rounded-2xl"
                            >
                                {/* Image & Mobile Title */}
                                <div className="flex items-center gap-3 col-span-2 sm:col-span-1">
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border border-[#2A2116] shadow-md shrink-0"
                                    />
                                    <span className="sm:hidden font-bold text-white text-base">
                                        {item.name}
                                    </span>
                                </div>

                                {/* Title (Desktop) */}
                                <p className="hidden sm:block font-bold text-white text-base lg:text-lg">
                                    {item.name}
                                </p>

                                {/* Price */}
                                <p className="text-gray-300 font-medium text-sm sm:text-base">
                                    ${item.price}
                                </p>

                                {/* Quantity Controls */}
                                <div className="flex justify-center">
                                    <div className="flex items-center gap-2.5 bg-[#1C1A17] border border-[#D89A2B]/40 px-3 py-1.5 rounded-xl shadow-inner">
                                        <button
                                            onClick={() => removeFromCart(item._id)}
                                            className="w-6 h-6 rounded-full bg-[#2A241C] flex items-center justify-center text-[#D89A2B] hover:bg-[#D89A2B] hover:text-black transition cursor-pointer"
                                            aria-label="Decrease quantity"
                                        >
                                            <Minus size={13} className="stroke-[3]" />
                                        </button>
                                        <span className="text-white font-bold text-xs min-w-[16px] text-center">
                                            {quantity}
                                        </span>
                                        <button
                                            onClick={() => addToCart(item._id)}
                                            className="w-6 h-6 rounded-full bg-[#D89A2B] flex items-center justify-center text-black hover:bg-[#c48922] transition cursor-pointer"
                                            aria-label="Increase quantity"
                                        >
                                            <Plus size={13} className="stroke-[3]" />
                                        </button>
                                    </div>
                                </div>

                                {/* Total */}
                                <p className="font-extrabold text-[#D89A2B] text-base sm:text-lg">
                                    ${total}
                                </p>

                                {/* Remove Button */}
                                <div className="flex justify-center">
                                    <button
                                        onClick={() => removeFromCart(item._id)}
                                        className="w-9 h-9 rounded-full bg-[#1A1A1A] border border-[#2A2116] flex items-center justify-center text-gray-400 hover:text-red-400 hover:bg-red-500/10 hover:border-red-500/30 transition-all duration-300 cursor-pointer"
                                        aria-label="Remove item"
                                    >
                                        <X size={18} />
                                    </button>
                                </div>
                            </div>
                        );
                    }
                    return null;
                })}
            </div>
        </div>
    );
};

export default CartItems;