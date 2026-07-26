import React, { useState, useContext } from 'react';
import { AdminContext } from '../context/AdminContext';
import { addFood } from '../services/foodService';
import { Upload, Plus, CheckCircle2, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AddFood = () => {
    const { token, fetchFoodList } = useContext(AdminContext);
    const navigate = useNavigate();

    const [image, setImage] = useState(false);
    const [data, setData] = useState({
        name: '',
        description: '',
        price: '',
        category: 'Salad',
        isVeg: true
    });

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ text: '', type: '' });

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
        setData(prev => ({ ...prev, [name]: value }));
    };

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        setMessage({ text: '', type: '' });

        if (!image) {
            setMessage({ text: 'Please upload a food image thumbnail', type: 'error' });
            return;
        }

        setLoading(true);
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('description', data.description);
        formData.append('price', Number(data.price));
        formData.append('category', data.category);
        formData.append('isVeg', data.isVeg);
        formData.append('image', image);

        try {
            const res = await addFood(formData, token);
            if (res.success) {
                setMessage({ text: 'Food item added successfully!', type: 'success' });
                setData({
                    name: '',
                    description: '',
                    price: '',
                    category: 'Salad',
                    isVeg: true
                });
                setImage(false);
                fetchFoodList();
                setTimeout(() => navigate('/foods'), 1000);
            } else {
                setMessage({ text: res.message || 'Failed to add item', type: 'error' });
            }
        } catch (err) {
            setMessage({ text: err || 'Server error uploading item', type: 'error' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto space-y-6 animate-fade-in">
            {/* Title Header */}
            <div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#D89A2B] block">
                    INVENTORY MANAGEMENT
                </span>
                <h1 className="text-2xl font-extrabold font-serif text-white">
                    Add New Food Dish
                </h1>
            </div>

            {/* Message Banner */}
            {message.text && (
                <div className={`p-4 rounded-2xl text-xs font-semibold border flex items-center gap-2 ${
                    message.type === 'success'
                        ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                        : 'bg-red-500/10 border-red-500/30 text-red-400'
                }`}>
                    <CheckCircle2 size={16} />
                    <span>{message.text}</span>
                </div>
            )}

            {/* Form */}
            <form onSubmit={onSubmitHandler} className="bg-[#0D0D0D] border border-[#222222] rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
                
                {/* Upload Image Field */}
                <div>
                    <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">
                        Upload Dish Image
                    </label>
                    <label htmlFor="image" className="w-full h-44 border-2 border-dashed border-[#333] hover:border-[#D89A2B] rounded-2xl flex flex-col items-center justify-center cursor-pointer overflow-hidden relative group transition bg-[#121212]">
                        {image ? (
                            <img
                                src={URL.createObjectURL(image)}
                                alt="Dish Preview"
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="flex flex-col items-center gap-2 text-gray-400 group-hover:text-[#D89A2B] transition">
                                <Upload size={28} />
                                <span className="text-xs font-semibold">Click to upload high-res image</span>
                            </div>
                        )}
                    </label>
                    <input
                        onChange={(e) => setImage(e.target.files[0])}
                        type="file"
                        id="image"
                        hidden
                        accept="image/*"
                    />
                </div>

                {/* Dish Name */}
                <div>
                    <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">
                        Dish Name
                    </label>
                    <input
                        required
                        type="text"
                        name="name"
                        onChange={onChangeHandler}
                        value={data.name}
                        placeholder="e.g. Margherita Pizza"
                        className="w-full bg-[#161616] border border-[#262626] focus:border-[#D89A2B] rounded-2xl px-4 py-3 text-xs text-white placeholder-gray-500 focus:outline-none transition font-medium"
                    />
                </div>

                {/* Description */}
                <div>
                    <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">
                        Dish Description
                    </label>
                    <textarea
                        required
                        rows={3}
                        name="description"
                        onChange={onChangeHandler}
                        value={data.description}
                        placeholder="Write a tempting description of ingredients and flavor profile..."
                        className="w-full bg-[#161616] border border-[#262626] focus:border-[#D89A2B] rounded-2xl px-4 py-3 text-xs text-white placeholder-gray-500 focus:outline-none transition font-medium resize-none"
                    />
                </div>

                {/* Category & Price Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">
                            Category
                        </label>
                        <select
                            name="category"
                            onChange={onChangeHandler}
                            value={data.category}
                            className="w-full bg-[#161616] border border-[#262626] focus:border-[#D89A2B] rounded-2xl px-4 py-3 text-xs text-white focus:outline-none transition font-medium"
                        >
                            <option value="Salad">Salad</option>
                            <option value="Rolls">Rolls</option>
                            <option value="Deserts">Desserts</option>
                            <option value="Sandwich">Sandwich</option>
                            <option value="Cake">Cake</option>
                            <option value="Pure Veg">Pure Veg</option>
                            <option value="Pasta">Pasta</option>
                            <option value="Noodles">Noodles</option>
                            <option value="Pizza">Pizza</option>
                            <option value="Burger">Burger</option>
                            <option value="Drinks">Drinks</option>
                            <option value="Sides">Sides</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">
                            Price ($)
                        </label>
                        <input
                            required
                            type="number"
                            step="0.01"
                            name="price"
                            onChange={onChangeHandler}
                            value={data.price}
                            placeholder="12.99"
                            className="w-full bg-[#161616] border border-[#262626] focus:border-[#D89A2B] rounded-2xl px-4 py-3 text-xs text-white placeholder-gray-500 focus:outline-none transition font-medium"
                        />
                    </div>
                </div>

                {/* Vegetarian Checkbox */}
                <div className="flex items-center gap-3 pt-2">
                    <input
                        type="checkbox"
                        id="isVeg"
                        name="isVeg"
                        checked={data.isVeg}
                        onChange={onChangeHandler}
                        className="w-4 h-4 accent-[#D89A2B] rounded cursor-pointer"
                    />
                    <label htmlFor="isVeg" className="text-xs font-semibold text-gray-300 cursor-pointer">
                        Mark as Vegetarian dish (Green Badge)
                    </label>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#D89A2B] to-[#B8791D] text-black font-extrabold text-xs hover:scale-[1.02] active:scale-95 transition-all duration-300 shadow-lg shadow-[#D89A2B]/20 cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
                >
                    {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <><Plus size={16} /> Add Dish to Menu</>}
                </button>

            </form>
        </div>
    );
};

export default AddFood;
