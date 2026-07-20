import React from 'react';
import { assets } from '../assets/assets';

const Loader = () => {
    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-lg z-[99999] flex flex-col items-center justify-center transition-opacity duration-300">
            {/* Logo Container with Concentric Counter-Rotating Rings */}
            <div className="relative flex items-center justify-center w-72 h-72">
                
                {/* Outer Ring (Counter-Clockwise) */}
                <div className="absolute w-60 h-60 rounded-full border-2 border-transparent border-l-[#D89A2B] border-r-[#D89A2B] animate-[spin_6s_linear_infinite_reverse] opacity-80"></div>
                
                {/* Inner Ring (Clockwise) */}
                <div className="absolute w-48 h-48 rounded-full border-2 border-transparent border-t-[#B8791D] border-b-[#B8791D] animate-[spin_3s_linear_infinite] opacity-90"></div>
                
                {/* Centered Pulsing Logo */}
                <img 
                    src={assets.logo} 
                    alt="GoldFork Logo" 
                    className="w-32 md:w-36 object-contain relative z-10 animate-[pulse_2s_ease-in-out_infinite]"
                />
            </div>

            {/* Branded Loading Text */}
            <div className="mt-6 flex flex-col items-center justify-center relative z-10">
                <p className="text-[#E6D3A3] text-sm tracking-[0.3em] uppercase font-semibold animate-pulse drop-shadow-md">
                    Preparing Cravings
                </p>
            </div>
        </div>
    );
};

export default Loader;
