import React, { useState } from 'react'
import { assets } from '../assets/assets'
import { Search, ShoppingCart, User } from "lucide-react";
import { Link } from 'react-router-dom';

const Navbar = () => {

    const [menu, setMenu] = useState("home");

    return (
        <nav className="sticky top-0 z-50 bg-[#0B0B0B]/90 backdrop-blur-lg border-b border-[#2A2116] animate-slide-down">
            <div className="w-4/5 mx-auto flex items-center justify-between py-5">

                {/* Logo */}
                <Link to="/" onClick={() => setMenu("home")} className="animate-fade-in delay-100">
                    <img src={assets.logo} alt='logo' className='w-36 cursor-pointer object-contain' />
                </Link>

                {/* Navigation */}
                <ul className="hidden lg:flex flex-1 justify-center items-center gap-10 text-[#E6D3A3] font-medium animate-fade-in delay-200">
                    <Link
                        to="/"
                        onClick={() => setMenu("home")}
                        className={`cursor-pointer transition duration-300 ${menu === "home"
                            ? "text-[#D89A2B] border-b-2 border-[#D89A2B] pb-1"
                            : "hover:text-[#D89A2B]"
                            }`}
                    >
                        Home
                    </Link>
                    <Link
                        to="/menu"
                        onClick={() => setMenu("menu")}
                        className={`cursor-pointer transition duration-300 ${menu === "menu"
                            ? "text-[#D89A2B] border-b-2 border-[#D89A2B] pb-1"
                            : "hover:text-[#D89A2B]"
                            }`}
                    >
                        Menu
                    </Link>
                    <Link
                        to="/restuarant"
                        onClick={() => setMenu("restaurant")}
                        className={`cursor-pointer transition duration-300 ${menu === "restaurant"
                            ? "text-[#D89A2B] border-b-2 border-[#D89A2B] pb-1"
                            : "hover:text-[#D89A2B]"
                            }`}
                    >
                        Restaurant
                    </Link>
                    <Link
                        to="/offers"
                        onClick={() => setMenu("offers")}
                        className={`cursor-pointer transition duration-300 ${menu === "offers"
                            ? "text-[#D89A2B] border-b-2 border-[#D89A2B] pb-1"
                            : "hover:text-[#D89A2B]"
                            }`}
                    >
                        Offers
                    </Link>
                    <Link
                        to="/contact"
                        onClick={() => setMenu("contact")}
                        className={`cursor-pointer transition duration-300 ${menu === "contact"
                            ? "text-[#D89A2B] border-b-2 border-[#D89A2B] pb-1"
                            : "hover:text-[#D89A2B]"
                            }`}
                    >
                        Contact
                    </Link>
                </ul>

                {/* Rights Side */}
                <div className="flex items-center gap-4 animate-fade-in delay-300">
                    <button className="w-11 h-11 rounded-full bg-[#161616] border border-[#333] flex items-center justify-center hover:border-[#D89A2B] transition cursor-pointer">
                        <Search className="w-5 h-5 text-[#E6D3A3]" />
                    </button>
                    <Link to="/cart" className="relative">
                        <button className="w-11 h-11 rounded-full bg-[#161616] border border-[#333] flex items-center justify-center hover:border-[#D89A2B] transition cursor-pointer">
                            <ShoppingCart className='w-5 h-5 text-[#E6D3A3]' />
                        </button>
                        <span className="absolute top-2 right-2 w-2 h-2 bg-[#D89A2B] rounded-full"></span>
                    </Link>
                    <button className='w-11 h-11 rounded-full bg-[#161616] border border-[#333] flex items-center justify-center hover:border-[#D89A2B] transition cursor-pointer'>
                        <User className='w-5 h-5 text-[#E6D3A3]' />
                    </button>
                    <button className="ml-2 w-20 h-10 rounded-full bg-gradient-to-r from-[#D89A2B] to-[#B8791D] text-black font-semibold hover:scale-105 transition duration-300 shadow-lg shadow-[#D89A2B]/20 cursor-pointer">
                        Sign In
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar