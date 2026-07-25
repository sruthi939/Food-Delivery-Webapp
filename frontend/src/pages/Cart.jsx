import React, { useContext, useState } from "react";
import { StoreContext } from "../context/StoreContext";
import { useNavigate } from "react-router-dom";
import CartItems from "../components/CartItems";
import CartTotal from "../components/CartTotal";
import { Tag, CheckCircle2 } from "lucide-react";

const Cart = () => {
    const { cartItems } = useContext(StoreContext);
    const navigate = useNavigate();
    const [promoCode, setPromoCode] = useState("");
    const [promoApplied, setPromoApplied] = useState(false);

    const hasItems = Object.values(cartItems).some((count) => count > 0);

    return (
        <div className="w-4/5 mx-auto !pt-30 !pb-16 text-white min-h-[60vh]">
            {/* Header Banner */}
            <div className="!mb-8 text-center sm:text-left border-b border-[#222222] pb-5 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                    <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
                        Your <span className="text-[#D89A2B]">Cart</span>
                    </h1>
                    <p className="text-gray-400 text-lg !mt-1 font-light">
                        Review your selected items before proceeding to checkout
                    </p>
                </div>
                {hasItems && (
                    <button
                        onClick={() => navigate('/')}
                        className="text-[#D89A2B] hover:text-[#c48922] text-sm font-semibold flex items-center gap-1.5 transition cursor-pointer hover:underline"
                    >
                        + Add More Items
                    </button>
                )}
            </div>

            {/* Cart Items Table */}
            <CartItems />

            {/* Bottom Section: Cart Total & Promo Code */}
            {hasItems && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    {/* Cart Totals Component (7 cols) */}
                    <div className="lg:col-span-7">
                        <CartTotal />
                    </div>

                    {/* Promo Code Card (5 cols) */}
                    <div className="lg:col-span-5 bg-[#111111] border border-[#222222] rounded-3xl !p-6 sm:p-8 shadow-2xl flex flex-col justify-between h-full">
                        <div>
                            <h3 className="text-xl font-bold text-white !mb-2 flex items-center gap-2">
                                <Tag className="text-[#D89A2B]" size={20} />
                                Promo <span className="text-[#D89A2B]">Code</span>
                            </h3>
                            <p className="text-gray-400 text-sm !mb-6 leading-relaxed font-light">
                                Have a special discount code or voucher? Enter it below to apply your savings.
                            </p>

                            <div className="flex flex-col sm:flex-row items-center gap-3">
                                <div className="relative w-full flex-1">
                                    <input
                                        type="text"
                                        placeholder="Enter promo code (e.g. GOLD20)"
                                        value={promoCode}
                                        onChange={(e) => setPromoCode(e.target.value)}
                                        className="w-full bg-[#1A1A1A] border border-[#333] rounded-2xl !px-4 !py-3.5 text-white placeholder-gray-500 focus:outline-none focus:border-[#D89A2B] text-sm transition uppercase tracking-wider font-semibold"
                                    />
                                </div>
                                <button
                                    onClick={() => {
                                        if (promoCode.trim()) setPromoApplied(true);
                                    }}
                                    className="w-full sm:w-auto !px-7 !py-3.5 rounded-2xl bg-[#D89A2B] hover:bg-[#c48922] text-black font-bold text-sm transition cursor-pointer shrink-0 shadow-md shadow-[#D89A2B]/10 hover:scale-105 active:scale-95"
                                >
                                    Apply
                                </button>
                            </div>

                            {promoApplied && (
                                <div className="!mt-4 !p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-medium flex items-center gap-2">
                                    <CheckCircle2 size={16} />
                                    <span>Promo code <strong className="uppercase">{promoCode}</strong> applied successfully!</span>
                                </div>
                            )}
                        </div>

                        {/* Extra Perk Badge */}
                        <div className="!mt-8 !pt-4 border-t border-[#222222] text-xs text-gray-400 flex items-center justify-between">
                            <span>Free delivery on orders over $50</span>
                            <span className="text-[#D89A2B] font-semibold">GoldFork Club</span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;