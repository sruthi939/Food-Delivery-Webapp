import React, { useContext } from "react";
import { StoreContext } from "../context/StoreContext";
import { useNavigate } from "react-router-dom";
import { ArrowRight, ShieldCheck } from "lucide-react";

const CartTotal = ({ showButton = true, buttonText = "Proceed to Checkout", onCheckout }) => {
    const { getTotalCartAmount } = useContext(StoreContext);
    const navigate = useNavigate();

    const subtotal = getTotalCartAmount();
    const deliveryFee = subtotal === 0 ? 0 : 2;
    const tax = subtotal * 0.05;
    const grandTotal = subtotal + deliveryFee + tax;

    const handleAction = () => {
        if (onCheckout) {
            onCheckout();
        } else {
            navigate('/order');
        }
    };

    return (
        <div className="w-full bg-[#111111] border border-[#222222] rounded-3xl !p-6 sm:p-8 shadow-2xl text-white">
            <h2 className="text-xl sm:text-2xl font-bold text-white border-b border-[#222222] !pt-4 !pb-4 !mb-6 tracking-tight">
                Cart <span className="text-[#D89A2B]">Totals</span>
            </h2>

            <div className="space-y-4 text-sm sm:text-base">
                <div className="flex justify-between !py-2 border-b border-[#1F1F1F] text-gray-300">
                    <span>Subtotal</span>
                    <span className="font-semibold text-white">${subtotal.toFixed(2)}</span>
                </div>

                <div className="flex justify-between !py-2 border-b border-[#1F1F1F] text-gray-300">
                    <span>Delivery Fee</span>
                    <span className="font-semibold text-white">
                        {deliveryFee === 0 ? "Free" : `$${deliveryFee.toFixed(2)}`}
                    </span>
                </div>

                <div className="flex justify-between !py-2 border-b border-[#1F1F1F] text-gray-300">
                    <span>Tax (5%)</span>
                    <span className="font-semibold text-white">${tax.toFixed(2)}</span>
                </div>

                <div className="flex justify-between !pt-3 text-lg sm:text-xl font-extrabold">
                    <span className="text-white">Total</span>
                    <span className="text-[#D89A2B]">${grandTotal.toFixed(2)}</span>
                </div>
            </div>

            <div className="!mt-4 flex items-center gap-2 text-xs text-gray-400 bg-[#161616] p-3 rounded-xl border border-[#222]">
                <ShieldCheck size={16} className="text-[#D89A2B] shrink-0" />
                <span>Secure Checkout with 256-bit Encryption</span>
            </div>

            {showButton && (
                <button
                    onClick={handleAction}
                    disabled={subtotal === 0}
                    className="!mt-6 w-full !py-4 rounded-2xl bg-gradient-to-r from-[#D89A2B] to-[#B8791D] text-black font-bold text-base hover:scale-[1.02] active:scale-95 transition-all duration-300 shadow-lg shadow-[#D89A2B]/20 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                    {buttonText} <ArrowRight size={20} />
                </button>
            )}
        </div>
    );
};

export default CartTotal;