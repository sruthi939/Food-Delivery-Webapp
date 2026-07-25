import React from 'react';
import { User, Mail, MapPin, Phone, Building, Globe } from 'lucide-react';

const AddressForm = ({ formData, onChange }) => {
    return (
        <div className="bg-[#111111] border border-[#222222] rounded-3xl !p-6 sm:!p-8 shadow-2xl text-white">
            <h2 className="text-xl sm:text-2xl font-bold text-white border-b border-[#222222] !pb-4 !mb-6 tracking-tight flex items-center gap-2">
                <MapPin className="text-[#D89A2B]" size={24} />
                Delivery <span className="text-[#D89A2B]">Information</span>
            </h2>

            <form className="space-y-4">
                {/* First & Last Name */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="relative">
                        <User className="absolute left-3.5 top-3.5 text-gray-500" size={18} />
                        <input
                            required
                            type="text"
                            name="firstName"
                            placeholder="First Name"
                            value={formData?.firstName || ''}
                            onChange={onChange}
                            className="w-full bg-[#1A1A1A] border border-[#333] rounded-xl !pl-10 !pr-4 !py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#D89A2B] text-sm transition"
                        />
                    </div>
                    <div className="relative">
                        <User className="absolute left-3.5 top-3.5 text-gray-500" size={18} />
                        <input
                            required
                            type="text"
                            name="lastName"
                            placeholder="Last Name"
                            value={formData?.lastName || ''}
                            onChange={onChange}
                            className="w-full bg-[#1A1A1A] border border-[#333] rounded-xl !pl-10 !pr-4 !py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#D89A2B] text-sm transition"
                        />
                    </div>
                </div>

                {/* Email Address */}
                <div className="relative">
                    <Mail className="absolute left-3.5 top-3.5 text-gray-500" size={18} />
                    <input
                        required
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        value={formData?.email || ''}
                        onChange={onChange}
                        className="w-full bg-[#1A1A1A] border border-[#333] rounded-xl !pl-10 !pr-4 !py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#D89A2B] text-sm transition"
                    />
                </div>

                {/* Street Address */}
                <div className="relative">
                    <MapPin className="absolute left-3.5 top-3.5 text-gray-500" size={18} />
                    <input
                        required
                        type="text"
                        name="street"
                        placeholder="Street Address"
                        value={formData?.street || ''}
                        onChange={onChange}
                        className="w-full bg-[#1A1A1A] border border-[#333] rounded-xl !pl-10 !pr-4 !py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#D89A2B] text-sm transition"
                    />
                </div>

                {/* City & State */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="relative">
                        <Building className="absolute left-3.5 top-3.5 text-gray-500" size={18} />
                        <input
                            required
                            type="text"
                            name="city"
                            placeholder="City"
                            value={formData?.city || ''}
                            onChange={onChange}
                            className="w-full bg-[#1A1A1A] border border-[#333] rounded-xl !pl-10 !pr-4 !py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#D89A2B] text-sm transition"
                        />
                    </div>
                    <div className="relative">
                        <Building className="absolute left-3.5 top-3.5 text-gray-500" size={18} />
                        <input
                            required
                            type="text"
                            name="state"
                            placeholder="State / Province"
                            value={formData?.state || ''}
                            onChange={onChange}
                            className="w-full bg-[#1A1A1A] border border-[#333] rounded-xl !pl-10 !pr-4 !py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#D89A2B] text-sm transition"
                        />
                    </div>
                </div>

                {/* Zip Code & Country */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="relative">
                        <MapPin className="absolute left-3.5 top-3.5 text-gray-500" size={18} />
                        <input
                            required
                            type="text"
                            name="zipCode"
                            placeholder="Zip / Postal Code"
                            value={formData?.zipCode || ''}
                            onChange={onChange}
                            className="w-full bg-[#1A1A1A] border border-[#333] rounded-xl !pl-10 !pr-4 !py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#D89A2B] text-sm transition"
                        />
                    </div>
                    <div className="relative">
                        <Globe className="absolute left-3.5 top-3.5 text-gray-500" size={18} />
                        <input
                            required
                            type="text"
                            name="country"
                            placeholder="Country"
                            value={formData?.country || ''}
                            onChange={onChange}
                            className="w-full bg-[#1A1A1A] border border-[#333] rounded-xl !pl-10 !pr-4 !py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#D89A2B] text-sm transition"
                        />
                    </div>
                </div>

                {/* Phone Number */}
                <div className="relative">
                    <Phone className="absolute left-3.5 top-3.5 text-gray-500" size={18} />
                    <input
                        required
                        type="tel"
                        name="phone"
                        placeholder="Phone Number"
                        value={formData?.phone || ''}
                        onChange={onChange}
                        className="w-full bg-[#1A1A1A] border border-[#333] rounded-xl !pl-10 !pr-4 !py-3 text-white placeholder-gray-500 focus:outline-none focus:border-[#D89A2B] text-sm transition"
                    />
                </div>
            </form>
        </div>
    );
};

export default AddressForm;