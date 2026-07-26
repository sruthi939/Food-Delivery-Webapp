import React, { useState } from 'react';
import { Sparkles, ArrowRight, Tag, Copy, Check, Clock, Gift, Send, ChevronRight, Percent, Truck, UserCheck, CreditCard, Utensils } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Offers = () => {
    const navigate = useNavigate();
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [copiedCode, setCopiedCode] = useState(false);
    const [email, setEmail] = useState('');
    const [subscribed, setSubscribed] = useState(false);

    const handleCopyCode = (code) => {
        navigator.clipboard.writeText(code);
        setCopiedCode(true);
        setTimeout(() => setCopiedCode(false), 2000);
    };

    const handleSubscribe = (e) => {
        e.preventDefault();
        if (email) {
            setSubscribed(true);
            setTimeout(() => {
                setSubscribed(false);
                setEmail('');
            }, 3000);
        }
    };

    const filterCategories = [
        {
            id: 'All',
            label: 'All Offers',
            icon: Tag
        },
        {
            id: 'Combo',
            label: 'Combo Offers',
            icon: Utensils
        },
        {
            id: 'Discounts',
            label: 'Flat Discounts',
            icon: Percent
        },
        {
            id: 'Delivery',
            label: 'Free Delivery',
            icon: Truck
        },
        {
            id: 'NewUser',
            label: 'New User',
            icon: UserCheck
        },
        {
            id: 'Bank',
            label: 'Bank Offers',
            icon: CreditCard
        }
    ];

    const offerCards = [
        {
            id: 1,
            title: "Burger Bonanza",
            badge: "30% OFF",
            category: "Combo",
            desc: "Get 30% off on all burger combos above $20.",
            validTill: "20 May 2025",
            image: "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=600&q=80"
        },
        {
            id: 2,
            title: "Pizza Party",
            badge: "20% OFF",
            category: "Discounts",
            desc: "Enjoy 20% off on all pizzas. No minimum order.",
            validTill: "18 May 2025",
            image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80"
        },
        {
            id: 3,
            title: "Free Delivery",
            badge: "FREE DELIVERY",
            category: "Delivery",
            desc: "Free delivery on all orders above $15.",
            validTill: "31 May 2025",
            image: "https://images.unsplash.com/photo-1526367790999-0150786686a2?auto=format&fit=crop&w=600&q=80"
        },
        {
            id: 4,
            title: "Pasta Lovers",
            badge: "25% OFF",
            category: "Discounts",
            desc: "Flat 25% off on all pasta dishes above $18.",
            validTill: "22 May 2025",
            image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=80"
        },
        {
            id: 5,
            title: "Welcome Offer",
            badge: "NEW USER",
            category: "NewUser",
            desc: "Flat $10 off on your first order above $20.",
            validTill: "31 May 2025",
            image: "https://images.unsplash.com/photo-1578474846511-04ba529f0b88?auto=format&fit=crop&w=600&q=80"
        }
    ];

    const filteredOffers = selectedCategory === 'All'
        ? offerCards
        : offerCards.filter((item) => item.category === selectedCategory);

    return (
        <div className="w-full min-h-screen bg-black text-white !pt-32 !pb-24 !px-4 sm:!px-6 md:!px-8 max-w-7xl mx-auto space-y-12 animate-fade-in">

            {/* 1. HERO BANNER ROW */}
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8">

                {/* Left Header Info */}
                <div className="flex-1 space-y-4">
                    <div className="flex items-center gap-2 text-[#D89A2B] text-xs font-bold uppercase tracking-widest">
                        <span>→</span>
                        <span>SPECIAL OFFERS</span>
                        <Sparkles size={14} className="fill-[#D89A2B]" />
                    </div>

                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif leading-tight">
                        <span className="font-light text-white block">Delicious Deals</span>
                        <span className="font-extrabold text-[#D89A2B] block !mt-1">Just for You!</span>
                    </h1>

                    <p className="text-gray-400 text-sm leading-relaxed max-w-sm font-light">
                        Enjoy exclusive offers, exciting discounts and delicious combos on your favorite meals.
                    </p>

                    <button
                        onClick={() => navigate('/menu')}
                        className="!px-6 !py-3 rounded-xl bg-[#D89A2B] hover:bg-[#c48922] text-black font-extrabold text-sm transition cursor-pointer shadow-lg shadow-[#D89A2B]/20 flex items-center gap-2 !mt-4"
                    >
                        Explore Offers <ArrowRight size={16} />
                    </button>
                </div>

                {/* Right Hero Promo Card */}
                <div className="w-full lg:w-3/5 bg-gradient-to-br from-[#18140E] via-[#0E0C09] to-[#0A0907] border border-[#D89A2B]/40 rounded-3xl !p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl relative overflow-hidden group">
                    {/* Glowing Backdrop */}
                    <div className="absolute top-0 right-0 w-80 h-80 bg-[#D89A2B]/10 rounded-full blur-3xl pointer-events-none" />

                    <div className="space-y-4 relative z-10 flex-1">
                        <span className="text-[10px] font-extrabold text-[#D89A2B] tracking-widest uppercase flex items-center gap-1.5">
                            ❖ LIMITED TIME OFFER
                        </span>

                        <div>
                            <h2 className="text-4xl sm:text-5xl font-black font-serif text-[#D89A2B] tracking-tight">
                                FLAT 30% OFF
                            </h2>
                            <p className="text-xs sm:text-sm font-bold text-white tracking-wide !mt-1">
                                ON ALL ORDERS ABOVE <span className="text-[#D89A2B]">$25</span>
                            </p>
                        </div>

                        {/* Coupon Code Pill */}
                        <div className="!pt-2">
                            <div className="inline-flex items-center gap-3 bg-[#17140D] border border-[#D89A2B]/60 !px-4 !py-2 rounded-xl text-xs">
                                <span className="text-gray-400 font-medium">USE CODE:</span>
                                <span className="text-[#D89A2B] font-extrabold tracking-wider text-sm">GOLDFORK30</span>
                                <button
                                    onClick={() => handleCopyCode('GOLDFORK30')}
                                    className="!p-1 text-gray-400 hover:text-white transition cursor-pointer !ml-1"
                                    title="Copy Code"
                                >
                                    {copiedCode ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Promo Image */}
                    <div className="relative shrink-0 w-52 h-44 sm:w-60 sm:h-48 rounded-2xl overflow-hidden border border-[#222222]">
                        <img
                            src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=80"
                            alt="Special Dish Combo Offer"
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                    </div>
                </div>

            </div>

            {/* 2. CATEGORY FILTER TABS ROW */}
            <div className="!mt-7 flex items-center gap-3 overflow-x-auto !pb-3 !pt-2 scrollbar-none">
                {filterCategories.map((cat) => {
                    const Icon = cat.icon;
                    const isActive = selectedCategory === cat.id;

                    return (
                        <button
                            key={cat.id}
                            onClick={() => setSelectedCategory(cat.id)}
                            className={`!px-5 !py-2.5 rounded-xl text-xs font-extrabold flex items-center gap-2 whitespace-nowrap transition-all duration-300 cursor-pointer ${isActive
                                ? "bg-[#1C170E] border border-[#D89A2B] text-[#D89A2B] shadow-md shadow-[#D89A2B]/10"
                                : "bg-[#121212] border border-[#222222] text-gray-300 hover:text-white hover:border-[#D89A2B]/40"
                                }`}
                        >
                            <Icon size={14} className={isActive ? "text-[#D89A2B]" : "text-gray-400"} />
                            <span>{cat.label}</span>
                        </button>
                    );
                })}
            </div>

            {/* 3. BEST OFFERS FOR YOU GRID */}
            <div className="space-y-6">
                {/* Header Row */}
                <div className="!mt-5 flex items-center justify-between">
                    <h2 className="!mb-5 text-xl sm:text-2xl font-serif font-bold text-white flex items-center gap-2">
                        <Sparkles size={18} className="text-[#D89A2B] fill-[#D89A2B]" /> Best Offers for You
                    </h2>
                    <button
                        onClick={() => setSelectedCategory('All')}
                        className="text-xs font-bold text-[#D89A2B] hover:underline flex items-center gap-1 cursor-pointer"
                    >
                        View All Offers <ChevronRight size={14} />
                    </button>
                </div>

                {/* 5 Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    {filteredOffers.map((offer) => (
                        <div
                            key={offer.id}
                            className="group bg-[#0D0D0D] border border-[#222222] hover:border-[#D89A2B]/40 rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 shadow-xl flex flex-col justify-between relative"
                        >
                            {/* Top Ribbon Badge */}
                            <div className="absolute top-0 left-0 z-10">
                                <span className="bg-[#D89A2B] text-black font-black text-[10px] uppercase !px-3 !py-1 rounded-br-xl shadow-md tracking-wider block">
                                    {offer.badge}
                                </span>
                            </div>

                            {/* Offer Card Image */}
                            <div className="h-36 overflow-hidden relative">
                                <img
                                    src={offer.image}
                                    alt={offer.title}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D] via-transparent to-transparent" />
                            </div>

                            {/* Offer Card Body */}
                            <div className="!p-4 space-y-2 flex-1 flex flex-col justify-between">
                                <div>
                                    <h3 className="font-bold text-white text-base group-hover:text-[#D89A2B] transition-colors">
                                        {offer.title}
                                    </h3>
                                    <p className="text-xs text-gray-400 line-clamp-2 !mt-1 leading-relaxed font-light">
                                        {offer.desc}
                                    </p>
                                </div>

                                {/* Card Footer Row */}
                                <div className="!pt-3 border-t border-[#1C1C1C] flex items-center justify-between gap-1 !mt-auto">
                                    <div className="flex items-center gap-1 text-[10px] text-gray-400 font-medium">
                                        <Clock size={12} className="text-[#D89A2B]" />
                                        <span>Valid till {offer.validTill}</span>
                                    </div>
                                    <button
                                        onClick={() => navigate('/menu')}
                                        className="!px-3 !py-1.5 rounded-lg bg-[#D89A2B] hover:bg-[#c48922] text-black font-extrabold text-[11px] transition cursor-pointer shadow-md"
                                    >
                                        Order Now
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* 4. UNLOCK MORE SAVINGS NEWSLETTER BANNER */}
            <div className="!mt-5 bg-[#0F0E0B] border border-[#26221A] rounded-2xl !p-6 sm:!p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl relative overflow-hidden">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-[#1A160F] border border-[#D89A2B]/40 text-[#D89A2B] flex items-center justify-center shrink-0 shadow-md">
                        <Gift size={24} />
                    </div>
                    <div>
                        <h3 className="text-lg font-extrabold text-white font-serif">
                            Unlock More Savings!
                        </h3>
                        <p className="text-xs text-gray-400 font-light !mt-0.5">
                            Subscribe to our newsletter and get exclusive offers straight to your inbox.
                        </p>
                    </div>
                </div>

                <form onSubmit={handleSubscribe} className="flex items-center gap-4 w-full md:w-auto">
                    <input
                        required
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="bg-[#161616] border border-[#333] rounded-xl !px-4 !py-3 text-white text-xs placeholder-gray-500 focus:outline-none focus:border-[#D89A2B] transition w-full sm:w-64 font-medium"
                    />
                    <button
                        type="submit"
                        className="!px-6 !py-3 rounded-xl bg-gradient-to-r from-[#D89A2B] to-[#B8791D] text-black font-extrabold text-xs hover:scale-105 active:scale-95 transition cursor-pointer shadow-lg shadow-[#D89A2B]/20 whitespace-nowrap flex items-center gap-2"
                    >
                        {subscribed ? (
                            <>
                                <Check size={14} /> Subscribed!
                            </>
                        ) : (
                            <>
                                <Send size={14} /> Subscribe
                            </>
                        )}
                    </button>
                </form>
            </div>

        </div>
    );
};

export default Offers;