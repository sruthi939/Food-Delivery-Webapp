import React, { useState } from 'react';
import { Save, CheckCircle2 } from 'lucide-react';

const Settings = () => {
    const [settings, setSettings] = useState({
        restaurantName: 'GoldFork Luxury Dining',
        currency: 'USD ($)',
        deliveryFee: '2.00',
        supportEmail: 'admin@goldfork.com',
        phone: '+1 (555) 123-4567',
        address: '123 Food Street, Culinary City, FC 56789'
    });

    const [saved, setSaved] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSettings(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
    };

    return (
        <div className="max-w-3xl mx-auto space-y-6 animate-fade-in">
            <div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#D89A2B] block">
                    CONFIGURATION
                </span>
                <h1 className="text-2xl font-extrabold font-serif text-white">
                    Restaurant Settings
                </h1>
            </div>

            {saved && (
                <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 p-4 rounded-2xl text-xs font-semibold flex items-center gap-2">
                    <CheckCircle2 size={16} />
                    <span>Settings saved successfully!</span>
                </div>
            )}

            <form onSubmit={handleSubmit} className="bg-[#0D0D0D] border border-[#222222] rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
                <div>
                    <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">
                        Restaurant Name
                    </label>
                    <input
                        type="text"
                        name="restaurantName"
                        value={settings.restaurantName}
                        onChange={handleChange}
                        className="w-full bg-[#161616] border border-[#262626] focus:border-[#D89A2B] rounded-2xl px-4 py-3 text-xs text-white focus:outline-none transition font-medium"
                    />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">
                            Currency
                        </label>
                        <input
                            type="text"
                            name="currency"
                            value={settings.currency}
                            onChange={handleChange}
                            className="w-full bg-[#161616] border border-[#262626] focus:border-[#D89A2B] rounded-2xl px-4 py-3 text-xs text-white focus:outline-none transition font-medium"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">
                            Standard Delivery Fee ($)
                        </label>
                        <input
                            type="number"
                            step="0.01"
                            name="deliveryFee"
                            value={settings.deliveryFee}
                            onChange={handleChange}
                            className="w-full bg-[#161616] border border-[#262626] focus:border-[#D89A2B] rounded-2xl px-4 py-3 text-xs text-white focus:outline-none transition font-medium"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">
                            Support Email
                        </label>
                        <input
                            type="email"
                            name="supportEmail"
                            value={settings.supportEmail}
                            onChange={handleChange}
                            className="w-full bg-[#161616] border border-[#262626] focus:border-[#D89A2B] rounded-2xl px-4 py-3 text-xs text-white focus:outline-none transition font-medium"
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">
                            Phone Number
                        </label>
                        <input
                            type="text"
                            name="phone"
                            value={settings.phone}
                            onChange={handleChange}
                            className="w-full bg-[#161616] border border-[#262626] focus:border-[#D89A2B] rounded-2xl px-4 py-3 text-xs text-white focus:outline-none transition font-medium"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider mb-2">
                        Restaurant Physical Address
                    </label>
                    <input
                        type="text"
                        name="address"
                        value={settings.address}
                        onChange={handleChange}
                        className="w-full bg-[#161616] border border-[#262626] focus:border-[#D89A2B] rounded-2xl px-4 py-3 text-xs text-white focus:outline-none transition font-medium"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#D89A2B] to-[#B8791D] text-black font-extrabold text-xs hover:scale-[1.02] active:scale-95 transition-all duration-300 shadow-lg shadow-[#D89A2B]/20 cursor-pointer flex items-center justify-center gap-2"
                >
                    <Save size={16} /> Save Settings
                </button>
            </form>
        </div>
    );
};

export default Settings;
