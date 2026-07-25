import React from 'react';
import { Loader2 } from 'lucide-react';

const Loader = () => {
    return (
        <div className="flex flex-col items-center justify-center py-16 space-y-3">
            <Loader2 className="w-9 h-9 text-[#D89A2B] animate-spin" />
            <span className="text-xs text-gray-400 font-medium tracking-wide">
                Loading GoldFork Admin Data...
            </span>
        </div>
    );
};

export default Loader;
