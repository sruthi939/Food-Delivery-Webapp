import React, { useState, useEffect, useContext } from 'react';
import Table from '../components/Table';
import Loader from '../components/Loader';
import { Plus, CheckCircle2 } from 'lucide-react';
import axios from 'axios';
import { AdminContext } from '../context/AdminContext';

const Categories = () => {
    const { url, foodList } = useContext(AdminContext);
    const [categories, setCategories] = useState([]);
    const [newCatName, setNewCatName] = useState('');
    const [loading, setLoading] = useState(true);
    const [feedback, setFeedback] = useState('');

    const fetchCategories = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${url}/api/category/list`);
            if (response.data.success) {
                setCategories(response.data.data);
            }
        } catch (error) {
            console.error('Error fetching categories:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const handleAddCategory = async (e) => {
        e.preventDefault();
        if (newCatName.trim()) {
            try {
                const response = await axios.post(`${url}/api/category/add`, { name: newCatName.trim() });
                if (response.data.success) {
                    setFeedback('New category created in database!');
                    setNewCatName('');
                    fetchCategories();
                    setTimeout(() => setFeedback(''), 3000);
                }
            } catch (error) {
                alert('Failed to add category to backend database');
            }
        }
    };

    // Calculate real item count for each category from live foodList
    const getItemCount = (categoryName) => {
        return foodList.filter(f => f.category?.toLowerCase() === categoryName?.toLowerCase()).length;
    };

    return (
        <div className="space-y-6 animate-fade-in">
            {/* Header */}
            <div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#D89A2B] block">
                    TAXONOMY MANAGEMENT
                </span>
                <h1 className="text-2xl font-extrabold font-serif text-white">
                    Food Menu Categories
                </h1>
            </div>

            {/* Add Category Form */}
            <form onSubmit={handleAddCategory} className="bg-[#0D0D0D] border border-[#222222] rounded-2xl p-4 flex flex-col sm:flex-row items-center gap-3">
                <input
                    required
                    type="text"
                    placeholder="Enter new category name..."
                    value={newCatName}
                    onChange={(e) => setNewCatName(e.target.value)}
                    className="flex-1 bg-[#141414] border border-[#222222] focus:border-[#D89A2B] rounded-xl px-4 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none transition font-medium w-full"
                />
                <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#D89A2B] to-[#B8791D] text-black font-extrabold text-xs flex items-center gap-1.5 shadow-lg shadow-[#D89A2B]/20 hover:scale-105 transition cursor-pointer whitespace-nowrap"
                >
                    <Plus size={16} /> Add Category
                </button>
            </form>

            {/* Feedback */}
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
                <Table headers={['Icon', 'Category Name', 'Live Dishes Count', 'Status']}>
                    {categories.map((cat, idx) => (
                        <tr key={cat._id || idx} className="hover:bg-[#141414] transition">
                            <td className="px-6 py-4 text-xl">
                                {cat.icon || '🍽️'}
                            </td>
                            <td className="px-6 py-4 font-bold text-white text-xs">
                                {cat.name || cat.menu_name}
                            </td>
                            <td className="px-6 py-4 text-gray-300 font-bold text-xs">
                                {getItemCount(cat.name || cat.menu_name)} Dishes
                            </td>
                            <td className="px-6 py-4">
                                <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                                    Active
                                </span>
                            </td>
                        </tr>
                    ))}
                </Table>
            )}
        </div>
    );
};

export default Categories;
