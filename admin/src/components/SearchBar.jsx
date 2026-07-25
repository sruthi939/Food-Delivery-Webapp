import React from 'react';
import { Search, X } from 'lucide-react';

const SearchBar = ({ value, onChange, placeholder = 'Search...' }) => {
    return (
        <div className="relative flex items-center w-full sm:w-72">
            <Search size={16} className="absolute left-4 text-[#D89A2B]" />
            <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                className="w-full bg-[#141414] border border-[#222222] focus:border-[#D89A2B] rounded-xl pl-11 pr-9 py-2.5 text-xs text-white placeholder-gray-500 focus:outline-none transition font-medium"
            />
            {value && (
                <button
                    onClick={() => onChange('')}
                    className="absolute right-3 text-gray-400 hover:text-white"
                >
                    <X size={14} />
                </button>
            )}
        </div>
    );
};

export default SearchBar;
