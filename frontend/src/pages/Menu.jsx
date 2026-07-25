import React, { useState, useContext } from 'react';
import { StoreContext } from '../context/StoreContext';
import { assets } from '../assets/assets';
import { Plus, Minus, Heart, ChevronDown, Sparkles, Pizza, Sandwich, Soup, IceCreamCone, CupSoda, Salad, Popcorn } from 'lucide-react';

export const menuCategories = [
    { menu_name: "All", icon: Sparkles },
    { menu_name: "Pizza", icon: Pizza },
    { menu_name: "Burger", icon: Sandwich },
    { menu_name: "Pasta", icon: Soup },
    { menu_name: "Dessert", icon: IceCreamCone },
    { menu_name: "Drinks", icon: CupSoda },
    { menu_name: "Salad", icon: Salad },
    { menu_name: "Sides", icon: Popcorn },
];

// Dedicated Menu Page Featured Dishes sourced directly from local assets
const customMenuDishes = [
    {
        _id: "m1",
        name: "Margherita Pizza",
        image: assets.food_9 || assets.food_1,
        price: 12.99,
        description: "Classic delight with fresh tomato, mozzarella & basil.",
        category: "Pizza",
        isVeg: true
    },
    {
        _id: "m2",
        name: "Cheese Burger",
        image: assets.food_17 || assets.food_2,
        price: 9.99,
        description: "Juicy grilled patty with cheese, lettuce, tomato & special sauce.",
        category: "Burger",
        isVeg: false
    },
    {
        _id: "m3",
        name: "Creamy Alfredo Pasta",
        image: assets.food_25 || assets.food_5,
        price: 11.99,
        description: "Rich and creamy Alfredo sauce with grilled chicken & herbs.",
        category: "Pasta",
        isVeg: false
    },
    {
        _id: "m4",
        name: "Chocolate Cake",
        image: assets.food_20 || assets.food_10,
        price: 6.99,
        description: "Moist chocolate cake with rich ganache frosting.",
        category: "Dessert",
        isVeg: true
    },
    {
        _id: "m5",
        name: "Mint Mojito",
        image: assets.food_31 || assets.food_12,
        price: 3.99,
        description: "Refreshing mint with lime, ice & soda.",
        category: "Drinks",
        isVeg: true
    },
    {
        _id: "m6",
        name: "Caesar Salad",
        image: assets.food_1,
        price: 7.99,
        description: "Crisp romaine lettuce with chicken, croutons & Caesar dressing.",
        category: "Salad",
        isVeg: false
    },
    {
        _id: "m7",
        name: "French Fries",
        image: assets.food_8,
        price: 2.99,
        description: "Crispy golden fries served with ketchup.",
        category: "Sides",
        isVeg: true
    },
    {
        _id: "m8",
        name: "Garlic Bread",
        image: assets.food_14,
        price: 3.49,
        description: "Toasted bread with garlic butter & herbs.",
        category: "Sides",
        isVeg: true
    }
];

const Menu = () => {
    const { food_list, cartItems, addToCart, removeFromCart, wishlist, toggleWishlist } = useContext(StoreContext);
    const [category, setCategory] = useState("All");
    const [displayLimit, setDisplayLimit] = useState(8);

    // Combine custom menu dishes with store food_list for a rich catalog
    const allMenuDishes = [...customMenuDishes, ...(food_list || [])];

    // Filter by selected category
    const filteredDishes = allMenuDishes.filter(
        (dish) => category === "All" || dish.category === category
    );

    return (
        <div className="w-full min-h-screen bg-black text-white !pt-28 !pb-20 animate-fade-in">
            <div className="max-w-7xl mx-auto !px-4 sm:!px-6 md:!px-8 space-y-10">

                {/* 1. HERO BANNER HEADER */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-6 !pb-4">

                    {/* Left: Title + Vertical Line + Description */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-8 flex-1">
                        <div>
                            <span className="text-2xl sm:text-3xl font-light text-white block">
                                Our Delicious
                            </span>
                            <h1 className="text-5xl sm:text-6xl font-extrabold text-[#D89A2B] font-serif leading-tight !mt-0.5">
                                Menu
                            </h1>
                        </div>

                        {/* Vertical Line Divider */}
                        <div className="h-16 w-[1px] bg-[#2A241C] hidden sm:block shrink-0" />

                        {/* Subtitle Description */}
                        <p className="text-gray-400 text-xs sm:text-sm leading-relaxed max-w-xs font-light">
                            Explore a wide range of mouth-watering dishes made with the finest ingredients and a touch of love.
                        </p>
                    </div>

                    {/* Right Floating Gourmet Bowl Image */}
                    <div className="relative shrink-0">
                        <div className="absolute inset-0 bg-[#D89A2B]/10 rounded-full blur-3xl pointer-events-none" />
                        <img
                            src={assets.menu_header}
                            alt="Delicious Dishes"
                            className="w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.9)] relative z-10 hover:scale-105 transition-transform duration-500"
                        />
                    </div>
                </div>

                {/* 2. CATEGORY FILTER TABS ROW */}
                <div className="flex items-center gap-3.5 overflow-x-auto pb-4 pt-2 scrollbar-none scroll-smooth">
                    {menuCategories.map((item, index) => {
                        const IconComponent = item.icon;
                        const isActive = category === item.menu_name;

                        return (
                            <button
                                key={index}
                                onClick={() => setCategory(item.menu_name === "All" ? "All" : (category === item.menu_name ? "All" : item.menu_name))}
                                className={`px-6 py-3 rounded-2xl text-xs sm:text-sm font-bold flex items-center gap-3 whitespace-nowrap transition-all duration-300 cursor-pointer ${isActive
                                    ? "bg-[#D89A2B] text-black shadow-lg shadow-[#D89A2B]/20 font-extrabold"
                                    : "bg-[#111111] border border-[#222222] text-gray-300 hover:text-white hover:border-[#D89A2B]/40"
                                    }`}
                            >
                                <IconComponent size={18} className={isActive ? "text-black" : "text-[#D89A2B]"} />
                                <span>{item.menu_name}</span>
                            </button>
                        );
                    })}
                </div>

                {/* 3. SECTION ORNAMENT DIVIDER */}
                <div className="flex items-center justify-center gap-4 my-8">
                    <div className="h-[1px] w-16 sm:w-28 bg-gradient-to-r from-transparent to-[#D89A2B]/50" />
                    <span className="text-[#D89A2B] font-serif text-sm sm:text-base font-bold tracking-widest flex items-center gap-2">
                        ❖ All Dishes ❖
                    </span>
                    <div className="h-[1px] w-16 sm:w-28 bg-gradient-to-l from-transparent to-[#D89A2B]/50" />
                </div>

                {/* 4. DISH CARDS GRID (4 Columns Horizontal Cards) */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                    {filteredDishes.slice(0, displayLimit).map((dish, index) => {
                        const dishId = dish._id;
                        const isLiked = !!(wishlist && wishlist[dishId]);
                        const quantity = cartItems ? (cartItems[dishId] || 0) : 0;
                        const isVeg = dish.isVeg !== undefined ? dish.isVeg : true;

                        return (
                            <div
                                key={dishId || index}
                                className="group bg-[#0D0D0D] border border-[#222222] hover:border-[#D89A2B]/40 rounded-2xl p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#D89A2B]/10 flex items-center gap-4 relative overflow-hidden"
                            >
                                {/* Left Image Thumbnail */}
                                <div className="relative shrink-0 overflow-hidden rounded-xl border border-[#222222]">
                                    <img
                                        src={dish.image}
                                        alt={dish.name}
                                        className="w-28 h-28 sm:w-32 sm:h-32 object-cover transition-transform duration-500 group-hover:scale-105"
                                    />

                                    {/* Wishlist Heart Icon Button */}
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            if (toggleWishlist) toggleWishlist(dishId);
                                        }}
                                        className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white hover:scale-110 active:scale-95 transition cursor-pointer z-10"
                                        aria-label="Wishlist"
                                    >
                                        <Heart
                                            size={14}
                                            className={`transition-colors ${isLiked ? "fill-[#D89A2B] text-[#D89A2B]" : "text-white/80 hover:text-white"}`}
                                        />
                                    </button>
                                </div>

                                {/* Right Content Section */}
                                <div className="flex flex-col justify-between flex-1 min-w-0 h-full py-0.5">
                                    <div>
                                        <div className="flex items-start justify-between gap-2">
                                            <h3 className="font-bold text-white text-base sm:text-lg line-clamp-1 group-hover:text-[#D89A2B] transition-colors">
                                                {dish.name}
                                            </h3>

                                            {/* Veg / Non-Veg Indicator Dot */}
                                            <div
                                                className={`w-4 h-4 rounded-sm border flex items-center justify-center shrink-0 mt-1 ${isVeg ? "border-emerald-500" : "border-red-500"
                                                    }`}
                                                title={isVeg ? "Vegetarian" : "Non-Vegetarian"}
                                            >
                                                <div className={`w-2 h-2 rounded-full ${isVeg ? "bg-emerald-500" : "bg-red-500"}`} />
                                            </div>
                                        </div>

                                        <p className="text-xs text-gray-400 line-clamp-2 mt-1 leading-relaxed font-light">
                                            {dish.description}
                                        </p>
                                    </div>

                                    {/* Price & Add to Cart */}
                                    <div className="flex items-center justify-between mt-3 pt-2 border-t border-[#1C1C1C]">
                                        <span className="text-[#D89A2B] font-bold text-base sm:text-lg">
                                            ${typeof dish.price === 'number' ? dish.price.toFixed(2) : dish.price}
                                        </span>

                                        {quantity === 0 ? (
                                            <button
                                                onClick={() => addToCart && addToCart(dishId)}
                                                className="w-8 h-8 rounded-full bg-[#D89A2B] hover:bg-[#c48922] text-black font-extrabold flex items-center justify-center cursor-pointer shadow-md hover:scale-110 active:scale-95 transition-all duration-200"
                                                aria-label="Add to cart"
                                            >
                                                <Plus size={16} className="stroke-[3]" />
                                            </button>
                                        ) : (
                                            <div className="flex items-center gap-2 bg-[#1C1A17] border border-[#D89A2B]/40 px-2 py-1 rounded-xl shadow-inner">
                                                <button
                                                    onClick={() => removeFromCart && removeFromCart(dishId)}
                                                    className="w-5 h-5 rounded-full bg-[#2A241C] flex items-center justify-center text-[#D89A2B] hover:bg-[#D89A2B] hover:text-black transition cursor-pointer"
                                                >
                                                    <Minus size={11} className="stroke-[3]" />
                                                </button>
                                                <span className="text-white font-bold text-xs min-w-[14px] text-center">{quantity}</span>
                                                <button
                                                    onClick={() => addToCart && addToCart(dishId)}
                                                    className="w-5 h-5 rounded-full bg-[#D89A2B] flex items-center justify-center text-black hover:bg-[#c48922] transition cursor-pointer"
                                                >
                                                    <Plus size={11} className="stroke-[3]" />
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* 5. LOAD MORE BUTTON */}
                {displayLimit < filteredDishes.length && (
                    <div className="flex justify-center pt-6">
                        <button
                            onClick={() => setDisplayLimit((prev) => prev + 4)}
                            className="px-8 py-3 rounded-xl bg-[#111111] border border-[#D89A2B]/40 text-[#D89A2B] hover:bg-[#1A1A1A] hover:border-[#D89A2B] font-bold text-sm transition-all duration-300 cursor-pointer flex items-center justify-center gap-2 shadow-lg shadow-black"
                        >
                            Load More <ChevronDown size={16} />
                        </button>
                    </div>
                )}

            </div>
        </div>
    );
};

export default Menu;