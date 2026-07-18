import React from 'react'
import { assets } from '../assets/assets'
import { Search, ShoppingCart, User } from "lucide-react";

const Navbar = () => {
    return (
        <nav className="sticky top-0 z-50 bg-[#0B0B0B]/90 backdrop-blur-lg border-b border-[#2A2116]">
            <div className="max-w-7xl mx-auto flex items-center justify-between px-8 py-5">

                {/* Logo */}
                <img
                    src={assets.logo}
                    alt='logo'
                    className='w-36 cursor-pointer object-contain'
                />

                {/* Navigation */}
                <ul className="hidden lg:flex items-center gap-10 text-[#E6D3A3] font-medium">
                    <li className="cursor-pointer hover:text-[#D89A2B] transition duration-300 border-b-2 border-[#D89A2B] pb-1">Home</li>
                    <li className="cursor-pointer hover:text-[#D89A2B] transition duration-300">Menu</li>
                    <li className="cursor-pointer hover:text-[#D89A2B] transition duration-300">Restuarant</li>
                    <li className="cursor-pointer hover:text-[#D89A2B] transition duration-300">Offers</li>
                    <li className="cursor-pointer hover:text-[#D89A2B] transition duration-300">Contact</li>
                </ul>

                {/* Rights Side */}
                <div className="flex items-center gap-4">
                    <button className="w-11 h-11 rounded-full bg-[#161616] border border-[#333] flex items-center justify-center hover:border-[#D89A2B] transition">
                        <Search className="w-5 h-5 text-[#E6D3A3]" />
                    </button>
                    <div className="relative">
                        <button className="w-11 h-11 rounded-full bg-[#161616] border border-[#333] flex items-center justify-center hover:border-[#D89A2B] transition">
                            <ShoppingCart className='w-5 h-5 text-[#E6D3A3]' />
                        </button>
                        <span className="absolute top-2 right-2 w-2 h-2 bg-[#D89A2B] rounded-full"></span>
                    </div>
                    <button className='w-11 h-11 rounded-full bg-[#161616] border border-[#333] flex items-center justify-center hover:border-[#D89A2B] transition'>
                        <User className='w-5 h-5 text-[#E6D3A3]' />
                    </button>
                    <button className="ml-2 px-6 py-2 rounded-full bg-gradient-to-r from-[#D89A2B] to-[#B8791D] text-black font-semibold hover:scale-105 transition duration-300 shadow-lg shadow-[#D89A2B]/20">
                        Sign In
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar