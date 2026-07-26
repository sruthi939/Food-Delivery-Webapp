import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AdminContext } from '../context/AdminContext';
import { updateFood } from '../services/foodService';
import { getImageUrl } from '../utils/imageHelper';
import { assets } from '../assets/assets';
import { Save, ArrowLeft, Loader2, CheckCircle2, Upload } from 'lucide-react';

const EditFood = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { foodList, token, fetchFoodList, url } = useContext(AdminContext);

    const targetFood = foodList.find(f => f._id === id);

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

    useEffect(() => {
        if (targetFood) {
            setData({
                name: targetFood.name || '',
                description: targetFood.description || '',
                price: targetFood.price || '',
                category: targetFood.category || 'Salad',
                isVeg: targetFood.isVeg !== undefined ? targetFood.isVeg : true
            });
        }
    }, [targetFood]);

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
        setData(prev => ({ ...prev, [name]: value }));
    };

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        setLoading(true);
        setMessage({ text: '', type: '' });

        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('description', data.description);
        formData.append('price', Number(data.price));
        formData.append('category', data.category);
        formData.append('isVeg', data.isVeg);
        if (image) {
            formData.append('image', image);
        }

        try {
            const res = await updateFood(id, formData, token);
            if (res.success) {
                setMessage({ text: 'Dish details updated successfully!', type: 'success' });
                fetchFoodList();
                setTimeout(() => navigate('/foods'), 1000);
            } else {
                setMessage({ text: res.message || 'Update failed', type: 'error' });
            }
        } catch (err) {
            setMessage({ text: err || 'Error updating food item', type: 'error' });
        } finally {
            setLoading(false);
        }
    };

    const currentImageSrc = image
        ? URL.createObjectURL(image)
        : getImageUrl(targetFood?.image, url);

    return (
        <div className="max-w-3xl mx-auto space-y-6 animate-fade-in">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <span className="text-xs font-bold uppercase tracking-widest text-[#D89A2B] block">
                        EDIT ITEM
                    </span>
                    <h1 className="text-2xl font-extrabold font-serif text-white">
                        Edit Dish Details
                    </h1>
                </div>
                <button
                    onClick={() => navigate('/foods')}
                    className="px-4 py-2 rounded-xl bg-[#161616] border border-[#2B2B2B] text-gray-300 hover:text-white text-xs font-semibold flex items-center gap-2 transition cursor-pointer"
                >
                    <ArrowLeft size={16} /> Back to Food List
                </button>
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
                        Dish Image Preview (Click to update)
                    </label>
                    <label htmlFor="image" className="w-full h-44 border-2 border-dashed border-[#333] hover:border-[#D89A2B] rounded-2xl flex flex-col items-center justify-center cursor-pointer overflow-hidden relative group transition bg-[#121212]">
                        <img
                            src={currentImageSrc}
                            alt="Dish Preview"
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = assets.food_1;
                            }}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center text-white transition">
                            <Upload size={24} className="text-[#D89A2B] mb-1" />
                            <span className="text-xs font-bold">Change Image</span>
                        </div>
                    </label>
                    <input
                        onChange={(e) => setImage(e.target.files[0])}
                        type="file"
                        id="image"
                        hidden
                        accept="image/*"
                    />
                </div>

                {/* Name */}
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
                            className="w-full bg-[#161616] border border-[#262626] focus:border-[#D89A2B] rounded-2xl px-4 py-3 text-xs text-white focus:outline-none transition font-medium"
                        />
                    </div>
                </div>

                {/* Veg Checkbox */}
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
                        Mark as Vegetarian dish
                    </label>
                </div>

                {/* Submit */}
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#D89A2B] to-[#B8791D] text-black font-extrabold text-xs hover:scale-[1.02] active:scale-95 transition-all duration-300 shadow-lg shadow-[#D89A2B]/20 cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
                >
                    {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <><Save size={16} /> Save Changes</>}
                </button>

            </form>
        </div>
    );
};

export default EditFood;
