import React, { useState } from 'react';
import { Store, ChefHat, UtensilsCrossed, Smile, Star, Leaf, Heart, Award, Clock, Truck, ChevronRight } from 'lucide-react';

const Restuarant = () => {
    const [likedRestaurants, setLikedRestaurants] = useState({});

    const toggleLike = (id) => {
        setLikedRestaurants((prev) => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    const stats = [
        {
            icon: Store,
            number: "25+",
            label: "Restaurants"
        },
        {
            icon: ChefHat,
            number: "150+",
            label: "Expert Chefs"
        },
        {
            icon: UtensilsCrossed,
            number: "500+",
            label: "Delicious Dishes"
        },
        {
            icon: Smile,
            number: "50K+",
            label: "Happy Customers"
        },
        {
            icon: Star,
            number: "4.8",
            label: "Average Rating"
        }
    ];

    const storyFeatures = [
        {
            icon: Leaf,
            title: "Fresh Ingredients",
            desc: "We use only the freshest and highest quality ingredients."
        },
        {
            icon: ChefHat,
            title: "Expert Chefs",
            desc: "Our chefs are passionate experts dedicated to perfecting every dish."
        },
        {
            icon: Heart,
            title: "Made with Love",
            desc: "Every dish is prepared with care, passion and a touch of love."
        },
        {
            icon: Award,
            title: "Best Quality",
            desc: "We maintain the highest standards to deliver the best experience."
        }
    ];

    const topRestaurants = [
        {
            id: 1,
            name: "Bella Italia",
            category: "Italian",
            cuisine: "Italian, Pizza, Pasta",
            rating: 4.7,
            time: "30-45 mins",
            deliveryFee: "$2.00 Delivery",
            image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=80"
        },
        {
            id: 2,
            name: "Burger House",
            category: "American",
            cuisine: "Burgers, Fries, Drinks",
            rating: 4.6,
            time: "20-35 mins",
            deliveryFee: "$2.00 Delivery",
            image: "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=600&q=80"
        },
        {
            id: 3,
            name: "Wok & Roll",
            category: "Asian",
            cuisine: "Chinese, Thai, Sushi",
            rating: 4.8,
            time: "25-40 mins",
            deliveryFee: "$2.00 Delivery",
            image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80"
        },
        {
            id: 4,
            name: "Green Leaf Cafe",
            category: "Cafe",
            cuisine: "Salads, Sandwiches, Coffee",
            rating: 4.5,
            time: "20-30 mins",
            deliveryFee: "$1.50 Delivery",
            image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=600&q=80"
        },
        {
            id: 5,
            name: "Sweet Cravings",
            category: "Dessert",
            cuisine: "Cakes, Desserts, Ice Cream",
            rating: 4.9,
            time: "15-25 mins",
            deliveryFee: "$1.50 Delivery",
            image: "https://images.unsplash.com/photo-1578474846511-04ba529f0b88?auto=format&fit=crop&w=600&q=80"
        }
    ];

    return (
        <div className="w-full min-h-screen bg-black text-white !pt-32 !pb-24 !px-4 sm:!px-6 md:!px-8 max-w-7xl mx-auto space-y-16 animate-fade-in">

            {/* 1. HERO HEADER SECTION */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-10">
                {/* Left Text */}
                <div className="flex-1 space-y-4">
                    <span className="text-xs font-bold uppercase tracking-widest text-[#D89A2B] block">
                        OUR RESTAURANTS
                    </span>
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif leading-tight">
                        <span className="font-light text-white block">Exceptional Food,</span>
                        <span className="font-extrabold text-[#D89A2B] block mt-1">Extraordinary Experience</span>
                    </h1>

                    {/* Decorative Line */}
                    <div className="w-20 h-[2px] bg-gradient-to-r from-[#D89A2B] to-transparent !my-4" />

                    <p className="text-gray-400 text-sm sm:text-base leading-relaxed max-w-lg font-light">
                        Discover our network of premium restaurants where passion meets flavor. Each dish is crafted with the finest ingredients and a touch of love.
                    </p>
                </div>

                {/* Right Hero Image */}
                <div className="w-full md:w-1/2 h-72 sm:h-96 rounded-3xl overflow-hidden border border-[#222222] shadow-2xl relative group shrink-0">
                    <img
                        src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80"
                        alt="Luxury Restaurant Dining Room"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                </div>
            </div>

            {/* 2. STATS BAR CARD */}
            <div className="flex items-center justify-center gap-25 overflow-x-auto">
                {stats.map((stat, idx) => {
                    const Icon = stat.icon;
                    return (
                        <div key={idx} className={`!mt-8 flex flex-col items-center text-center transition-all duration-300 hover:-translate-y-1 shadow-lg ${idx !== 0 ? '!pt-4 md:!pt-0' : ''}`}>
                            <div className="w-12 h-12 rounded-full border border-[#D89A2B]/40 bg-[#1A1610] text-[#D89A2B] flex items-center justify-center !mb-3 shadow-md">
                                <Icon size={25} />
                            </div>
                            <span className="text-2xl sm:text-3xl font-extrabold text-[#D89A2B] tracking-tight">
                                {stat.number}
                            </span>
                            <span className="text-xs text-gray-400 font-medium !mt-1">
                                {stat.label}
                            </span>
                        </div>
                    );
                })}
            </div>

            {/* 3. OUR STORY SECTION */}
            <div className="w-4/5 mx-auto !pt-20 !pb-18 flex flex-col items-center animate-fade-in-up delay-100">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white text-center animate-fade-in-up">
                    OUR{" "}
                    <span className="text-[#D89A2B]">STORY</span>
                </h1>
                <h2 className="text-2xl sm:text-3xl font-serif text-white font-bold leading-snug !mt-3">
                    Crafting Moments Creating Memories
                </h2>
                <p className="text-center text-gray-400 text-base md:text-xl leading-8 max-w-2xl !mt-7 animate-fade-in-up delay-100 line-clamp-4">
                    At GoldFork, we believe food is more than just a meal—it's an experience to be shared. Our restaurants bring together the finest flavors, warm hospitality, and a cozy ambiance to make every moment special.
                </p>

                {/* Right Feature Cards (4 Cards Grid) */}
                <div className="!mt-5 lg:w-4/4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
                    {storyFeatures.map((feat, idx) => {
                        const Icon = feat.icon;
                        return (
                            <div
                                key={idx}
                                className="bg-[#0D0D0D] border border-[#222222] hover:border-[#D89A2B]/40 rounded-2xl !p-5 text-center flex flex-col items-center justify-between gap-3 transition-all duration-300 hover:-translate-y-1 shadow-lg"
                            >
                                <div className="text-[#D89A2B] !p-2 rounded-xl bg-[#1A1610] border border-[#D89A2B]/20">
                                    <Icon size={24} />
                                </div>
                                <h4 className="font-bold text-white text-sm">
                                    {feat.title}
                                </h4>
                                <p className="text-gray-400 text-xs leading-relaxed font-light line-clamp-3">
                                    {feat.desc}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* 4. TOP RESTAURANTS GRID SECTION */}
            <div className="space-y-6">
                {/* Header Row */}
                <div className="flex items-center justify-between !mb-5">
                    <h2 className="text-2xl sm:text-3xl font-bold text-white font-serif">
                        Top Restaurants
                    </h2>
                    <button className="text-xs font-bold text-[#D89A2B] hover:underline flex items-center gap-1 cursor-pointer transition">
                        View All Restaurants
                        <ChevronRight size={14}
                        />
                    </button>
                </div>

                {/* 5 Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    {topRestaurants.map((resto) => {
                        const isLiked = !!likedRestaurants[resto.id];

                        return (
                            <div
                                key={resto.id}
                                className="group bg-[#0D0D0D] border border-[#222222] hover:border-[#D89A2B]/40 rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 shadow-xl flex flex-col justify-between"
                            >
                                {/* Card Image Header */}
                                <div className="relative h-40 overflow-hidden">
                                    <img
                                        src={resto.image}
                                        alt={resto.name}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    />

                                    {/* Category Pill Badge */}
                                    <span className="absolute top-3 left-3 !px-2.5 !py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-white text-[10px] font-semibold">
                                        {resto.category}
                                    </span>

                                    {/* Heart Like Button */}
                                    <button
                                        onClick={() => toggleLike(resto.id)}
                                        className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center text-white hover:scale-110 active:scale-95 transition cursor-pointer shadow-md"
                                    >
                                        <Heart
                                            size={15}
                                            className={isLiked ? "fill-red-500 text-[#D89A2B]" : "text-[#D89A2B] hover:text-white"}
                                        />
                                    </button>
                                </div>

                                {/* Card Body */}
                                <div className="!p-4 space-y-2 flex-1 flex flex-col justify-between">
                                    <div>
                                        <div className="flex items-center justify-between gap-1">
                                            <h3 className="font-bold text-white text-base line-clamp-1 group-hover:text-[#D89A2B] transition-colors">
                                                {resto.name}
                                            </h3>
                                            <div className="flex items-center gap-1 text-xs font-bold text-white shrink-0">
                                                <Star size={13} className="fill-[#D89A2B] text-[#D89A2B]" />
                                                <span>{resto.rating}</span>
                                            </div>
                                        </div>

                                        <p className="text-xs text-gray-400 line-clamp-1 !mt-1 font-light">
                                            {resto.cuisine}
                                        </p>
                                    </div>

                                    {/* Card Footer Info */}
                                    <div className="!pt-3 border-t border-[#1C1C1C] flex items-center justify-between text-[11px] text-gray-400 font-medium">
                                        <div className="flex items-center gap-1">
                                            <Clock size={12} className="text-[#D89A2B]" />
                                            <span>{resto.time}</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <span>{resto.deliveryFee}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

        </div>
    );
};

export default Restuarant;