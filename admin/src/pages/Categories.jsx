import React, { useState } from 'react';
import Table from '../components/Table';
import { FolderKanban, Plus, CheckCircle2 } from 'lucide-react';

const initialCategories = [
    { id: 1, name: 'Salad', itemCount: 4, icon: '🥗' },
    { id: 2, name: 'Rolls', itemCount: 4, icon: '🌯' },
    { id: 3, name: 'Deserts', itemCount: 4, icon: '🧁' },
    { id: 4, name: 'Sandwich', itemCount: 4, icon: '🥪' },
    { id: 5, name: 'Cake', itemCount: 4, icon: '🍰' },
    { id: 6, name: 'Pure Veg', itemCount: 4, icon: '🥦' },
    { id: 7, name: 'Pasta', itemCount: 4, icon: '🍝' },
    { id: 8, name: 'Noodles', itemCount: 4, icon: '🍜' },
    { id: 9, name: 'Pizza', itemCount: 2, icon: '🍕' },
    { id: 10, name: 'Burger', itemCount: 2, icon: '🍔' },
    { id: 11, name: 'Drinks', itemCount: 2, icon: '🥤' },
    { id: 12, name: 'Sides', itemCount: 2, icon: '🍟' },
];

const Categories = () => {
    const [categories, setCategories] = useState(initialCategories);
    const [newCatName, setNewCatName] = useState('');
    const [feedback, setFeedback] = useState('');

    const handleAddCategory = (e) => {
        e.preventDefault();
        if (newCatName.trim()) {
            setCategories(prev => [
                ...prev,
                { id: Date.now(), name: newCatName.trim(), itemCount: 0, icon: '🍽️' }
            ]);
            setNewCatName('');
            setFeedback('New category added successfully!');
            setTimeout(() => setFeedback(''), 3000);
        }
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
            <Table headers={['Icon', 'Category Name', 'Item Count', 'Status']}>
                {categories.map((cat) => (
                    <tr key={cat.id} className="hover:bg-[#141414] transition">
                        <td className="px-6 py-4 text-xl">
                            {cat.icon}
                        </td>
                        <td className="px-6 py-4 font-bold text-white text-xs">
                            {cat.name}
                        </td>
                        <td className="px-6 py-4 text-gray-300 font-bold text-xs">
                            {cat.itemCount} Items
                        </td>
                        <td className="px-6 py-4">
                            <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                                Active
                            </span>
                        </td>
                    </tr>
                ))}
            </Table>
        </div>
    );
};

export default Categories;
