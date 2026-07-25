import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertCircle, ArrowLeft } from 'lucide-react';

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center py-24 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 flex items-center justify-center">
                <AlertCircle size={32} />
            </div>
            <h1 className="text-4xl font-extrabold font-serif text-white">404 - Page Not Found</h1>
            <p className="text-gray-400 text-xs max-w-sm font-light">
                The administrative page or section you are looking for does not exist or has been moved.
            </p>
            <button
                onClick={() => navigate('/dashboard')}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#D89A2B] to-[#B8791D] text-black font-extrabold text-xs flex items-center gap-2 shadow-lg shadow-[#D89A2B]/20 hover:scale-105 transition cursor-pointer mt-2"
            >
                <ArrowLeft size={16} /> Return to Dashboard
            </button>
        </div>
    );
};

export default NotFound;
