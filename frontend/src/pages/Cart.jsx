import React, { useContext, useState } from "react";
import { StoreContext } from "../context/StoreContext";
import { useNavigate } from "react-router-dom";
import CartItems from "../components/CartItems";
import CartTotal from "../components/CartTotal";

const Cart = () => {
    const { cartItems } = useContext(StoreContext);
    const navigate = useNavigate();
    const [promoCode, setPromoCode] = useState("");
    const [promoApplied, setPromoApplied] = useState(false);

    const hasItems = Object.values(cartItems).some((count) => count > 0);

    return (
        <div className="w-4/5 mx-auto pt-32 pb-24 text-white min-h-[75vh]">
            {/* Header */}
            <div className="mb-10 text-center sm:text-left border-b border-[#222222] pb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                        Your <span className="text-[#D89A2B]">Cart</span>
                    </h1>
                    <p className="text-gray-400 text-sm mt-1">
                        Review your selected items before proceeding to checkout
                    </p>
                </div>
                {hasItems && (
                    <button
                        onClick={() => navigate('/menu')}
                        className="text-[#D89A2B] hover:text-[#c48922] text-sm font-semibold flex items-center gap-1 transition cursor-pointer"
                    >
                        + Add More Items
                    </button>
                )}
            </div>

            {/* Cart Items List Component */}
            <CartItems />

            {/* Bottom Section: Cart Total & Promo Code */}
            {hasItems && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-14 items-start">
                    {/* Cart Totals Component (7 cols) */}
                    <div className="lg:col-span-7">
                        <CartTotal />
                    </div>

                    {/* Promo Code Card (5 cols) */}
                    <div className="lg:col-span-5 bg-[#111111] border border-[#222222] rounded-3xl p-6 sm:p-8 shadow-2xl">
                        <h3 className="text-lg font-bold text-white mb-2">
                            Promo Code
                        </h3>
                        <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                            If you have a promo code, enter it below to redeem your exclusive discount.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-3">
                            <input
                                type="text"
                                placeholder="Enter promo code"
                                value={promoCode}
                                onChange={(e) => setPromoCode(e.target.value)}
                                className="flex-1 bg-[#1A1A1A] border border-[#333] rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#D89A2B] text-sm transition"
                            />
                            <button
                                onClick={() => setPromoApplied(true)}
                                className="px-6 py-3 rounded-xl bg-[#D89A2B] hover:bg-[#c48922] text-black font-bold text-sm transition cursor-pointer shrink-0"
                            >
                                Apply
                            </button>
                        </div>

                        {promoApplied && (
                            <p className="text-emerald-400 text-xs mt-3 font-medium flex items-center gap-1">
                                ✓ Promo code applied successfully!
                            </p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;