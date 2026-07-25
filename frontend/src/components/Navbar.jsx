import React, { useState, useContext } from 'react';
import { assets } from '../assets/assets';
import { Search, ShoppingCart, User, LogOut, Package } from "lucide-react";
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../context/StoreContext';

const Navbar = ({ setShowLogin }) => {
    const [menu, setMenu] = useState("home");
    const [profileOpen, setProfileOpen] = useState(false);
    const { token, logout, cartItems } = useContext(StoreContext);
    const navigate = useNavigate();

    const getTotalCartCount = () => {
        let count = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) count += cartItems[item];
        }
        return count;
    };

    return (
        <nav className="fixed top-0 left-0 w-full z-50 h-[90px] bg-[#0B0B0B]/90 backdrop-blur-lg border-b border-[#2A2116] flex items-center">
            <div className="w-4/5 mx-auto flex items-center justify-between px-4 sm:px-6 md:px-8">

                {/* Logo */}
                <Link to="/" onClick={() => setMenu("home")} className="animate-fade-in delay-100">
                    <img src={assets.logo} alt="GoldFork Logo" className="w-36 md:w-44 h-auto object-contain cursor-pointer transition hover:scale-105" />
                </Link>

                {/* Navigation Links */}
                <ul className="hidden md:flex items-center gap-8 text-[#E6D3A3] font-medium text-sm lg:text-base tracking-wide animate-fade-in delay-200">
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

                {/* Right Side Icons & Auth */}
                <div className="flex items-center gap-4 animate-fade-in delay-300">
                    <button className="w-11 h-11 rounded-full bg-[#161616] border border-[#333] flex items-center justify-center hover:border-[#D89A2B] transition cursor-pointer">
                        <Search className="w-5 h-5 text-[#E6D3A3]" />
                    </button>
                    <Link to="/cart" className="relative">
                        <button className="w-11 h-11 rounded-full bg-[#161616] border border-[#333] flex items-center justify-center hover:border-[#D89A2B] transition cursor-pointer">
                            <ShoppingCart className='w-5 h-5 text-[#E6D3A3]' />
                        </button>
                        {getTotalCartCount() > 0 && (
                            <span className="absolute -top-1 -right-1 min-w-[20px] h-[20px] px-1 bg-[#D89A2B] text-black font-extrabold text-[10px] rounded-full flex items-center justify-center shadow-md">
                                {getTotalCartCount()}
                            </span>
                        )}
                    </Link>

                    {!token ? (
                        <button
                            onClick={() => setShowLogin(true)}
                            className="ml-2 px-6 h-10 rounded-full bg-gradient-to-r from-[#D89A2B] to-[#B8791D] text-black font-extrabold text-sm hover:scale-105 active:scale-95 transition duration-300 shadow-lg shadow-[#D89A2B]/20 cursor-pointer"
                        >
                            Sign In
                        </button>
                    ) : (
                        <div className="relative">
                            <button
                                onClick={() => setProfileOpen(!profileOpen)}
                                className="w-11 h-11 rounded-full bg-[#161616] border border-[#D89A2B] flex items-center justify-center hover:bg-[#222] transition cursor-pointer"
                            >
                                <User className="w-5 h-5 text-[#D89A2B]" />
                            </button>

                            {profileOpen && (
                                <div className="absolute right-0 mt-3 w-48 bg-[#111111] border border-[#222222] rounded-2xl shadow-2xl p-2 z-50 animate-slide-down text-white">
                                    <button
                                        onClick={() => {
                                            setProfileOpen(false);
                                            navigate('/order');
                                        }}
                                        className="w-full text-left px-4 py-2.5 rounded-xl hover:bg-[#1C1C1C] hover:text-[#D89A2B] text-xs font-semibold flex items-center gap-2 transition cursor-pointer"
                                    >
                                        <Package size={16} /> My Orders
                                    </button>
                                    <button
                                        onClick={() => {
                                            setProfileOpen(false);
                                            logout();
                                            navigate('/');
                                        }}
                                        className="w-full text-left px-4 py-2.5 rounded-xl hover:bg-red-500/10 hover:text-red-400 text-xs font-semibold flex items-center gap-2 transition cursor-pointer text-gray-300 border-t border-[#222] mt-1 pt-2"
                                    >
                                        <LogOut size={16} /> Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;