import React from 'react';
import { Bell, User } from 'lucide-react';

const Navbar = ({ logout }) => {
    return (
        <header className="w-full h-20 bg-[#0D0D0D] border-b border-[#222222] px-6 flex items-center justify-between z-30">
            {/* Left Header */}
            <div>
                <h1 className="text-lg font-bold text-white font-serif">
                    Restaurant Dashboard
                </h1>
                <p className="text-xs text-gray-400 font-light">
                    Real-time management & live ordering oversight
                </p>
            </div>

            {/* Right Header Controls */}
            <div className="flex items-center gap-4">
                {/* Notification Bell */}
                <button className="w-10 h-10 rounded-full bg-[#161616] border border-[#333] flex items-center justify-center text-gray-300 hover:text-white hover:border-[#D89A2B] transition relative cursor-pointer">
                    <Bell size={18} />
                    <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#D89A2B]" />
                </button>

                {/* Profile Badge */}
                <div className="flex items-center gap-3 pl-4 border-l border-[#222222]">
                    <div className="w-10 h-10 rounded-full bg-[#1A1610] border border-[#D89A2B] text-[#D89A2B] flex items-center justify-center font-bold">
                        <User size={18} />
                    </div>
                    <div className="hidden sm:block">
                        <h4 className="text-xs font-bold text-white">GoldFork Admin</h4>
                        <span className="text-[10px] text-[#D89A2B] font-semibold">Super Administrator</span>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
