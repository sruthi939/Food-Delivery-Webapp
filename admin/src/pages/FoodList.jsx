import React, { useState, useContext } from 'react';
import { AdminContext } from '../context/AdminContext';
import { removeFood } from '../services/foodService';
import Table from '../components/Table';
import SearchBar from '../components/SearchBar';
import Loader from '../components/Loader';
import { Trash2, Edit, Plus, CheckCircle2 } from 'lucide-react';
import { formatPrice } from '../utils/formatPrice';
import { getImageUrl } from '../utils/imageHelper';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';

const FoodList = () => {
    const { foodList, fetchFoodList, token, loading, url } = useContext(AdminContext);
    const [searchQuery, setSearchQuery] = useState('');
    const [feedback, setFeedback] = useState('');
    const navigate = useNavigate();

    const handleRemoveFood = async (id) => {
        if (window.confirm('Are you sure you want to remove this food item from the menu?')) {
            try {
                const res = await removeFood(id, token);
                if (res.success) {
                    setFeedback('Food item removed successfully');
                    fetchFoodList();
                    setTimeout(() => setFeedback(''), 3000);
                }
            } catch (error) {
                alert(error || 'Failed to remove food item');
            }
        }
    };

    const filteredFood = foodList.filter((item) =>
        item.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="space-y-6 animate-fade-in">
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                    <span className="text-xs font-bold uppercase tracking-widest text-[#D89A2B] block">
                        CATALOG OVERVIEW
                    </span>
                    <h1 className="text-2xl font-extrabold font-serif text-white">
                        All Food Menu Items
                    </h1>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                    <SearchBar
                        value={searchQuery}
                        onChange={setSearchQuery}
                        placeholder="Search menu dishes..."
                    />
                    <button
                        onClick={() => navigate('/add')}
                        className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#D89A2B] to-[#B8791D] text-black font-extrabold text-xs flex items-center gap-1.5 shadow-lg shadow-[#D89A2B]/20 hover:scale-105 transition cursor-pointer whitespace-nowrap"
                    >
                        <Plus size={16} /> Add Food
                    </button>
                </div>
            </div>

            {/* Feedback Banner */}
            {feedback && (
                <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 p-3 rounded-xl text-xs font-semibold flex items-center gap-2">
                    <CheckCircle2 size={16} />
                    <span>{feedback}</span>
                </div>
            )}

            {/* Table */}
            {loading ? (
                <Loader />
            ) : (
                <Table headers={['Image', 'Name', 'Category', 'Price', 'Type', 'Actions']}>
                    {filteredFood.length === 0 ? (
                        <tr>
                            <td colSpan={6} className="px-6 py-8 text-center text-gray-500 font-light">
                                No food items found in catalog.
                            </td>
                        </tr>
                    ) : (
                        filteredFood.map((item) => {
                            const isVeg = item.isVeg !== undefined ? item.isVeg : true;
                            const imageSrc = getImageUrl(item.image, url);

                            return (
                                <tr key={item._id} className="hover:bg-[#141414] transition">
                                    <td className="px-6 py-3">
                                        <img
                                            src={imageSrc}
                                            alt={item.name}
                                            onError={(e) => {
                                                e.target.onerror = null;
                                                e.target.src = assets.food_1;
                                            }}
                                            className="w-12 h-12 rounded-xl object-cover border border-[#222222] bg-[#1A1A1A]"
                                        />
                                    </td>
                                    <td className="px-6 py-4 font-bold text-white">
                                        {item.name}
                                    </td>
                                    <td className="px-6 py-4 text-gray-400">
                                        {item.category}
                                    </td>
                                    <td className="px-6 py-4 font-bold text-[#D89A2B]">
                                        {formatPrice(item.price)}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase ${
                                            isVeg
                                                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                                                : 'bg-red-500/10 text-red-400 border border-red-500/30'
                                        }`}>
                                            {isVeg ? 'Veg' : 'Non-Veg'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => navigate(`/edit/${item._id}`)}
                                                className="p-2 rounded-lg bg-[#1C1C1C] text-gray-300 hover:text-[#D89A2B] hover:bg-[#252525] transition cursor-pointer"
                                                title="Edit Item"
                                            >
                                                <Edit size={14} />
                                            </button>
                                            <button
                                                onClick={() => handleRemoveFood(item._id)}
                                                className="p-2 rounded-lg bg-[#1C1C1C] text-gray-300 hover:text-red-400 hover:bg-red-500/10 transition cursor-pointer"
                                                title="Delete Item"
                                            >
                                                <Trash2 size={14} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })
                    )}
                </Table>
            )}
        </div>
    );
};

export default FoodList;
