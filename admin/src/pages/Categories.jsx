import React, { useState, useEffect, useContext } from 'react';
import Table from '../components/Table';
import Loader from '../components/Loader';
import { Plus, CheckCircle2, Trash2 } from 'lucide-react';
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
            const response = await axios.get(`${url}/api/category/list`);
            if (response.data && response.data.data) {
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
    }, [url]);

    const handleAddCategory = async (e) => {
        e.preventDefault();
        if (newCatName.trim()) {
            try {
                const response = await axios.post(`${url}/api/category/add`, { name: newCatName.trim(), icon: '🍽️' });
                if (response.data.success) {
                    setFeedback('New category created in database!');
                    setNewCatName('');
                    fetchCategories();
                    setTimeout(() => setFeedback(''), 3000);
                }
            } catch (error) {
                alert('Failed to add category');
            }
        }
    };

    const handleRemoveCategory = async (id) => {
        if (window.confirm('Delete this category from database?')) {
            try {
                const response = await axios.post(`${url}/api/category/remove`, { id });
                if (response.data.success) {
                    setFeedback('Category removed from database');
                    fetchCategories();
                    setTimeout(() => setFeedback(''), 3000);
                }
            } catch (error) {
                alert('Failed to remove category');
            }
        }
    };

    const getItemCount = (categoryName) => {
        return (foodList || []).filter(f => f.category?.toLowerCase() === categoryName?.toLowerCase()).length;
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
                <Table headers={['Icon', 'Category Name', 'Live Dishes Count', 'Status', 'Actions']}>
                    {categories.length === 0 ? (
                        <tr>
                            <td colSpan={5} className="px-6 py-8 text-center text-gray-500 font-light">
                                No menu categories found in database.
                            </td>
                        </tr>
                    ) : (
                        categories.map((cat, idx) => (
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
                                <td className="px-6 py-4">
                                    {cat._id && (
                                        <button
                                            onClick={() => handleRemoveCategory(cat._id)}
                                            className="p-2 rounded-lg bg-[#1C1C1C] text-gray-300 hover:text-red-400 hover:bg-red-500/10 transition cursor-pointer"
                                            title="Remove Category"
                                        >
                                            <Trash2 size={14} />
                                        </button>
                                    )}
                                </td>
                            </tr>
                        ))
                    )}
                </Table>
            )}
        </div>
    );
};

export default Categories;
