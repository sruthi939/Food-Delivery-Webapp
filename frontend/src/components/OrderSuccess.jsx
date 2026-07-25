import React from 'react';
import { CheckCircle2, Clock, MapPin, ArrowRight, Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const OrderSuccess = ({ orderId = 'GF-894120', estimatedTime = '25-35 mins', onHome }) => {
    const navigate = useNavigate();

    const handleHome = () => {
        if (onHome) onHome();
        else navigate('/');
    };

    return (
        <div className="flex flex-col items-center justify-center bg-[#111111] border border-[#222222] rounded-3xl !p-8 sm:!p-12 text-center shadow-2xl text-white max-w-lg mx-auto !my-12 animate-fade-in-up">
            {/* Success Icon Badge */}
            <div className="w-20 h-20 rounded-full bg-[#1C2619] border border-emerald-500/40 flex items-center justify-center text-emerald-400 !mb-6 shadow-lg shadow-emerald-500/10">
                <CheckCircle2 size={44} />
            </div>

            <span className="!px-4 !py-1.5 rounded-full bg-[#1C1A17] border border-[#D89A2B]/40 text-[#D89A2B] text-xs font-bold uppercase tracking-wider !mb-3">
                Order Confirmed
            </span>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-white !mb-2">
                Thank You For Your Order!
            </h1>

            <p className="text-gray-400 text-sm max-w-sm leading-relaxed !mb-6">
                Your order <span className="text-white font-semibold">#{orderId}</span> has been placed successfully and is now being prepared by our chefs.
            </p>

            {/* Delivery Info Pill */}
            <div className="w-full bg-[#1A1A1A] border border-[#262626] rounded-2xl !p-4 !mb-8 text-left space-y-3">
                <div className="flex items-center gap-3 text-sm">
                    <Clock className="text-[#D89A2B] shrink-0" size={18} />
                    <div>
                        <p className="text-xs text-gray-400">Estimated Delivery Time</p>
                        <p className="font-bold text-white">{estimatedTime}</p>
                    </div>
                </div>
                <div className="flex items-center gap-3 text-sm border-t border-[#262626] !pt-3">
                    <MapPin className="text-[#D89A2B] shrink-0" size={18} />
                    <div>
                        <p className="text-xs text-gray-400">Delivery Location</p>
                        <p className="font-bold text-white">Your Saved Address</p>
                    </div>
                </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 w-full">
                <button
                    onClick={handleHome}
                    className="flex-1 !py-3.5 rounded-2xl bg-gradient-to-r from-[#D89A2B] to-[#B8791D] text-black font-bold text-sm hover:scale-105 transition duration-300 shadow-lg shadow-[#D89A2B]/20 cursor-pointer flex items-center justify-center gap-2"
                >
                    <Home size={18} /> Back to Home
                </button>
            </div>
        </div>
    );
};

export default OrderSuccess;