import React, { useState, useContext } from 'react';
import { assets } from '../assets/assets';
import { Search, ShoppingCart, User, LogOut, Heart, X, Plus, Sparkles } from "lucide-react";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { StoreContext } from '../context/StoreContext';

const Navbar = ({ setShowLogin }) => {
    const location = useLocation();
    const [profileOpen, setProfileOpen] = useState(false);
    const [showSearch, setShowSearch] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const { token, logout, cartItems, addToCart, getWishlistCount, food_list } = useContext(StoreContext);
    const navigate = useNavigate();

    const getTotalCartCount = () => {
        let count = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) count += cartItems[item];
        }
        return count;
    };

    // Filter food items based on search query
    const searchResults = searchQuery.trim() === ''
        ? []
        : (food_list || []).filter((dish) =>
            dish.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            dish.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
            dish.description.toLowerCase().includes(searchQuery.toLowerCase())
        );

    return (
        <>
            <nav className="fixed top-0 left-0 w-full z-50 h-[90px] bg-[#0B0B0B]/90 backdrop-blur-lg border-b border-[#2A2116] flex items-center">
                <div className="w-4/5 mx-auto flex items-center justify-between px-4 sm:px-6 md:px-8">

                    {/* Logo */}
                    <Link to="/" className="animate-fade-in delay-100">
                        <img src={assets.logo} alt="GoldFork Logo" className="w-36 md:w-44 h-auto object-contain cursor-pointer transition hover:scale-105" />
                    </Link>

                    {/* Navigation Links */}
                    <ul className="hidden md:flex items-center gap-8 text-[#E6D3A3] font-medium text-sm lg:text-base tracking-wide animate-fade-in delay-200">
                        <Link
                            to="/"
                            className={`cursor-pointer transition duration-300 ${location.pathname === "/"
                                    ? "text-[#D89A2B] border-b-2 border-[#D89A2B] pb-1 font-bold"
                                    : "hover:text-[#D89A2B]"
                                }`}
                        >
                            Home
                        </Link>

                        <Link
                            to="/menu"
                            className={`cursor-pointer transition duration-300 ${location.pathname === "/menu"
                                    ? "text-[#D89A2B] border-b-2 border-[#D89A2B] pb-1 font-bold"
                                    : "hover:text-[#D89A2B]"
                                }`}
                        >
                            Menu
                        </Link>

                        <Link
                            to="/restaurant"
                            className={`cursor-pointer transition duration-300 ${location.pathname === "/restaurant"
                                    ? "text-[#D89A2B] border-b-2 border-[#D89A2B] pb-1 font-bold"
                                    : "hover:text-[#D89A2B]"
                                }`}
                        >
                            Restaurant
                        </Link>

                        <Link
                            to="/offers"
                            className={`cursor-pointer transition duration-300 ${location.pathname === "/offers"
                                    ? "text-[#D89A2B] border-b-2 border-[#D89A2B] pb-1 font-bold"
                                    : "hover:text-[#D89A2B]"
                                }`}
                        >
                            Offers
                        </Link>

                        <Link
                            to="/contact"
                            className={`cursor-pointer transition duration-300 ${location.pathname === "/contact"
                                    ? "text-[#D89A2B] border-b-2 border-[#D89A2B] pb-1 font-bold"
                                    : "hover:text-[#D89A2B]"
                                }`}
                        >
                            Contact
                        </Link>
                    </ul>

                    {/* Right Side Icons & Auth */}
                    <div className="flex items-center gap-4 animate-fade-in delay-300">
                        {/* Search Button */}
                        <button
                            onClick={() => setShowSearch(true)}
                            className="w-11 h-11 rounded-full bg-[#161616] border border-[#333] flex items-center justify-center hover:border-[#D89A2B] transition cursor-pointer"
                            aria-label="Search"
                        >
                            <Search className="w-5 h-5 text-[#E6D3A3]" />
                        </button>

                        {/* Wishlist Button */}
                        <Link to="/wishlist" className="relative">
                            <button className="w-11 h-11 rounded-full bg-[#161616] border border-[#333] flex items-center justify-center hover:border-[#D89A2B] transition cursor-pointer">
                                <Heart className='w-5 h-5 text-[#E6D3A3]' />
                            </button>
                            {getWishlistCount && getWishlistCount() > 0 && (
                                <span className="absolute -top-1 -right-1 min-w-[20px] h-[20px] px-1 bg-red-500 text-white font-extrabold text-[10px] rounded-full flex items-center justify-center shadow-md">
                                    {getWishlistCount()}
                                </span>
                            )}
                        </Link>

                        {/* Cart Button */}
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

                        {/* Sign In / Profile */}
                        {!token ? (
                            <button
                                onClick={() => setShowLogin(true)}
                                className="ml-2 !px-6 h-10 rounded-full bg-gradient-to-r from-[#D89A2B] to-[#B8791D] text-black font-extrabold text-sm hover:scale-105 active:scale-95 transition duration-300 shadow-lg shadow-[#D89A2B]/20 cursor-pointer"
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
                                                navigate('/wishlist');
                                            }}
                                            className="w-full text-left px-4 py-2.5 rounded-xl hover:bg-[#1C1C1C] hover:text-[#D89A2B] text-xs font-semibold flex items-center gap-2 transition cursor-pointer"
                                        >
                                            <Heart size={16} /> My Wishlist
                                        </button>
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
                                            className="w-full text-left px-4 py-2.5 rounded-xl hover:bg-red-500/10 text-red-400 text-xs font-semibold flex items-center gap-2 transition cursor-pointer"
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

            {/* SEARCH MODAL OVERLAY */}
            {showSearch && (
                <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-start justify-center pt-24 px-4 animate-fade-in">
                    <div className="w-full max-w-2xl bg-[#0F0E0D] border border-[#2A241C] rounded-3xl p-6 shadow-2xl space-y-6 relative overflow-hidden">

                        {/* Close Button */}
                        <button
                            onClick={() => {
                                setShowSearch(false);
                                setSearchQuery('');
                            }}
                            className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#1C1A17] text-gray-400 hover:text-white flex items-center justify-center cursor-pointer transition"
                        >
                            <X size={18} />
                        </button>

                        {/* Modal Header Title */}
                        <div className="flex items-center gap-2 text-[#D89A2B] font-bold text-xs uppercase tracking-widest">
                            <Sparkles size={14} /> Search Menu & Dishes
                        </div>

                        {/* Search Input Bar */}
                        <div className="relative flex items-center">
                            <Search className="absolute left-4 w-5 h-5 text-[#D89A2B]" />
                            <input
                                autoFocus
                                type="text"
                                placeholder="Search dishes, salad, pasta, pizza, cake..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full bg-[#1A1815] border border-[#3A3226] focus:border-[#D89A2B] rounded-2xl pl-12 pr-10 py-3.5 text-white placeholder-gray-500 text-sm focus:outline-none transition shadow-inner font-medium"
                            />
                            {searchQuery && (
                                <button
                                    onClick={() => setSearchQuery('')}
                                    className="absolute right-4 text-gray-400 hover:text-white"
                                >
                                    <X size={16} />
                                </button>
                            )}
                        </div>

                        {/* Quick Category Tags */}
                        {searchQuery === '' && (
                            <div className="space-y-2 pt-2">
                                <span className="text-xs text-gray-400 font-medium">Popular Searches:</span>
                                <div className="flex flex-wrap gap-2">
                                    {['Salad', 'Pasta', 'Rolls', 'Sandwich', 'Cake', 'Noodles'].map((tag) => (
                                        <button
                                            key={tag}
                                            onClick={() => setSearchQuery(tag)}
                                            className="px-3.5 py-1.5 rounded-xl bg-[#1A1815] border border-[#2A241C] text-xs font-semibold text-gray-300 hover:text-[#D89A2B] hover:border-[#D89A2B]/40 transition cursor-pointer"
                                        >
                                            {tag}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Search Results List */}
                        {searchQuery && (
                            <div className="max-h-80 overflow-y-auto space-y-3 pr-1 scrollbar-thin">
                                {searchResults.length === 0 ? (
                                    <div className="text-center py-8 text-gray-400 text-sm font-light">
                                        No dishes found matching "<span className="text-white font-bold">{searchQuery}</span>"
                                    </div>
                                ) : (
                                    searchResults.map((item) => (
                                        <div
                                            key={item._id}
                                            className="bg-[#171512] border border-[#26211A] hover:border-[#D89A2B]/40 rounded-2xl p-3 flex items-center justify-between gap-4 transition group"
                                        >
                                            <div className="flex items-center gap-3">
                                                <img
                                                    src={item.image}
                                                    alt={item.name}
                                                    className="w-14 h-14 rounded-xl object-cover border border-[#222]"
                                                />
                                                <div>
                                                    <h4 className="font-bold text-white text-sm group-hover:text-[#D89A2B] transition-colors">
                                                        {item.name}
                                                    </h4>
                                                    <span className="text-[11px] text-[#D89A2B] font-semibold">
                                                        ${typeof item.price === 'number' ? item.price.toFixed(2) : item.price}
                                                    </span>
                                                </div>
                                            </div>

                                            <button
                                                onClick={() => {
                                                    if (addToCart) addToCart(item._id);
                                                    setShowSearch(false);
                                                    setSearchQuery('');
                                                }}
                                                className="px-3 py-1.5 rounded-xl bg-[#D89A2B] hover:bg-[#c48922] text-black font-extrabold text-xs flex items-center gap-1 cursor-pointer transition shadow-md"
                                            >
                                                <Plus size={14} /> Add
                                            </button>
                                        </div>
                                    ))
                                )}
                            </div>
                        )}

                    </div>
                </div>
            )}
        </>
    );
};

export default Navbar;