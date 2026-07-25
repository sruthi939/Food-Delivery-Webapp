import React, { useContext } from 'react';
import { StoreContext } from '../context/StoreContext';
import FoodItems from '../components/FoodItems';
import { Heart, ShoppingBag, ArrowRight, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Wishlist = () => {
    const { food_list, wishlist, toggleWishlist, setWishlist, addToCart } = useContext(StoreContext);
    const navigate = useNavigate();

    const wishlistProducts = food_list.filter((item) => {
        const itemId = item._id || item.id;
        return !!(wishlist && wishlist[itemId]);
    });

    const handleClearWishlist = () => {
        setWishlist({});
        localStorage.removeItem('wishlist');
    };

    const handleAddAllToCart = () => {
        wishlistProducts.forEach((item) => {
            const itemId = item._id || item.id;
            addToCart(itemId);
        });
    };

    return (
        <div className="w-full min-h-screen bg-black text-white !pt-36 !pb-24 !px-4 sm:px-8 max-w-7xl mx-auto">
            {/* Header Title Section */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#222222] !pb-6 !mb-8">
                <div>
                    <div className="inline-flex items-center gap-2 !px-3.5 !py-1 rounded-full bg-[#1F1910] border border-[#D89A2B]/40 text-[#D89A2B] text-xs font-bold uppercase tracking-wider !mb-2">
                        <Heart size={14} className="fill-[#D89A2B]" /> Favorites
                    </div>
                    <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                        Your <span className="text-[#D89A2B]">Wishlist</span>
                    </h1>
                </div>

                {wishlistProducts.length > 0 && (
                    <div className="flex items-center gap-3">
                        <button
                            onClick={handleClearWishlist}
                            className="!px-4 !py-2.5 rounded-xl bg-[#161616] border border-[#333] hover:border-red-500/50 text-gray-400 hover:text-red-400 text-xs font-bold transition flex items-center gap-2 cursor-pointer"
                        >
                            <Trash2 size={15} /> Clear All
                        </button>
                        <button
                            onClick={handleAddAllToCart}
                            className="!px-5 !py-2.5 rounded-xl bg-gradient-to-r from-[#D89A2B] to-[#B8791D] text-black font-extrabold text-xs shadow-lg shadow-[#D89A2B]/20 hover:scale-105 transition cursor-pointer flex items-center gap-2"
                        >
                            <ShoppingBag size={15} /> Add All to Cart
                        </button>
                    </div>
                )}
            </div>

            {/* Empty State */}
            {wishlistProducts.length === 0 ? (
                <div className="flex flex-col items-center justify-center bg-[#0D0D0D] border border-[#222222] rounded-3xl !p-10 sm:!p-16 text-center max-w-lg mx-auto !my-12 shadow-2xl">
                    <div className="w-20 h-20 rounded-full bg-[#1C160D] border border-[#D89A2B]/30 flex items-center justify-center text-[#D89A2B] !mb-6 shadow-lg shadow-[#D89A2B]/10">
                        <Heart size={40} className="fill-[#D89A2B]/20 stroke-[#D89A2B]" />
                    </div>
                    <h3 className="text-2xl font-extrabold text-white !mb-2">
                        Your Wishlist is Empty
                    </h3>
                    <p className="text-gray-400 text-sm max-w-xs leading-relaxed !mb-8">
                        Explore our gourmet culinary collection and save your favorite dishes here for later.
                    </p>
                    <button
                        onClick={() => navigate('/menu')}
                        className="!px-8 !py-3.5 rounded-2xl bg-gradient-to-r from-[#D89A2B] to-[#B8791D] text-black font-extrabold text-sm shadow-xl shadow-[#D89A2B]/20 hover:scale-105 active:scale-95 transition cursor-pointer flex items-center gap-2"
                    >
                        Explore Menu <ArrowRight size={18} />
                    </button>
                </div>
            ) : (
                /* Wishlist Items Grid */
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {wishlistProducts.map((item, index) => {
                        const itemId = item._id || item.id;
                        return (
                            <FoodItems
                                key={itemId}
                                id={itemId}
                                name={item.name}
                                price={item.price}
                                description={item.description}
                                image={item.image}
                                index={index}
                            />
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default Wishlist;
