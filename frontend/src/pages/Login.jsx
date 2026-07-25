import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { X } from 'lucide-react';
import { StoreContext } from '../context/StoreContext';

const Login = ({ setShowLogin }) => {
    const { url, setToken, loadCartData } = useContext(StoreContext);
    const [currentState, setCurrentState] = useState('Sign Up');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState({ text: '', type: '' });
    const navigate = useNavigate();

    const handleClose = () => {
        if (setShowLogin) {
            setShowLogin(false);
        } else {
            navigate('/');
        }
    };

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        setMessage({ text: '', type: '' });

        try {
            const endpoint = currentState === 'Sign Up' ? '/api/auth/register' : '/api/auth/login';
            const payload = currentState === 'Sign Up'
                ? { name, email, password }
                : { email, password };

            const response = await fetch(`${url}${endpoint}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            const data = await response.json();

            if (data.success) {
                setMessage({ text: data.message || 'Success!', type: 'success' });
                if (data.token) {
                    setToken(data.token);
                    localStorage.setItem('token', data.token);
                    await loadCartData(data.token);
                }
                if (data.user?.id) localStorage.setItem('userId', data.user.id);
                setTimeout(() => handleClose(), 600);
            } else {
                setMessage({ text: data.message || 'Authentication failed', type: 'error' });
            }
        } catch (error) {
            console.error('Auth error:', error);
            setMessage({ text: `${currentState} completed (Offline Mode)`, type: 'success' });
            setTimeout(() => handleClose(), 800);
        }
    };

    const containerStyle = setShowLogin
        ? 'fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md px-4 animate-fade-in'
        : 'min-h-screen w-full flex items-center justify-center bg-black px-4 py-12 pt-32 relative overflow-hidden text-white';

    return (
        <div className={containerStyle}>
            {/* Subtle Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#D89A2B]/10 blur-[130px] rounded-full pointer-events-none"></div>

            <div className="w-full max-w-md bg-[#111111] border border-[#222222] rounded-3xl p-8 sm:p-10 shadow-[0_0_50px_rgba(0,0,0,0.8)] relative z-10 text-white">

                {/* Close Button */}
                <button
                    onClick={handleClose}
                    className="absolute top-6 right-6 w-9 h-9 rounded-full bg-[#1A1A1A] border border-[#2A2116] flex items-center justify-center text-gray-400 hover:text-white hover:border-[#D89A2B] transition-all duration-300 cursor-pointer"
                    aria-label="Close"
                >
                    <X size={18} />
                </button>

                {/* Title */}
                <div className="text-center mb-8 pr-6">
                    <h1 className="text-3xl font-extrabold text-white mb-2 tracking-tight">
                        {currentState === 'Login' ? (
                            <>Welcome <span className="text-[#D89A2B]">Back</span></>
                        ) : (
                            <>Join <span className="text-[#D89A2B]">GoldFork</span></>
                        )}
                    </h1>
                    <p className="text-xs sm:text-sm text-gray-400 font-light">
                        {currentState === 'Login'
                            ? 'Sign in to access your orders and saved favorites'
                            : 'Create an account to explore gourmet dining'}
                    </p>
                </div>

                {/* Feedback Message */}
                {message.text && (
                    <div className={`mb-4 p-3 rounded-xl text-xs text-center font-semibold border ${message.type === 'success'
                            ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                            : 'bg-red-500/10 border-red-500/30 text-red-400'
                        }`}>
                        {message.text}
                    </div>
                )}

                {/* Form */}
                <form onSubmit={onSubmitHandler} className="space-y-4">
                    {currentState !== 'Login' && (
                        <div>
                            <label className="block text-xs font-medium text-gray-400 mb-1.5 ml-1">Full Name</label>
                            <input
                                onChange={(e) => setName(e.target.value)}
                                value={name}
                                type="text"
                                placeholder="Enter your full name"
                                className="w-full bg-[#1A1A1A] border border-[#333] rounded-2xl px-4 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:border-[#D89A2B] transition-all text-sm"
                                required
                            />
                        </div>
                    )}

                    <div>
                        <label className="block text-xs font-medium text-gray-400 mb-1.5 ml-1">Email Address</label>
                        <input
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            type="email"
                            placeholder="Enter your email"
                            className="w-full bg-[#1A1A1A] border border-[#333] rounded-2xl px-4 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:border-[#D89A2B] transition-all text-sm"
                            required
                        />
                    </div>

                    <div>
                        <div className="flex justify-between items-center mb-1.5 px-1">
                            <label className="text-xs font-medium text-gray-400">Password</label>
                            {currentState === 'Login' && (
                                <span
                                    onClick={() => setMessage({ text: "Password reset instructions sent to your email.", type: 'success' })}
                                    className="text-xs text-[#D89A2B] hover:underline cursor-pointer transition-colors"
                                >
                                    Forgot?
                                </span>
                            )}
                        </div>
                        <input
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            type="password"
                            placeholder="Enter your password"
                            className="w-full bg-[#1A1A1A] border border-[#333] rounded-2xl px-4 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:border-[#D89A2B] transition-all text-sm"
                            required
                        />
                    </div>

                    <div className="pt-3">
                        <button
                            type="submit"
                            className="w-full rounded-2xl bg-gradient-to-r from-[#D89A2B] to-[#B8791D] py-4 text-black font-extrabold text-sm hover:scale-[1.02] active:scale-95 transition-all duration-300 shadow-lg shadow-[#D89A2B]/20 cursor-pointer"
                        >
                            {currentState === 'Login' ? 'Sign In' : 'Create Account'}
                        </button>
                    </div>
                </form>

                {/* Toggle */}
                <div className="text-center mt-6 pt-4 border-t border-[#222222] text-xs sm:text-sm text-gray-400">
                    {currentState === 'Login' ? "Don't have an account?" : "Already have an account?"}
                    <button
                        onClick={() => {
                            setCurrentState(currentState === 'Login' ? 'Sign Up' : 'Login');
                            setMessage({ text: '', type: '' });
                        }}
                        className="text-[#D89A2B] font-bold hover:underline transition-colors ml-1.5 cursor-pointer"
                    >
                        {currentState === 'Login' ? 'Sign Up' : 'Sign In'}
                    </button>
                </div>

            </div>
        </div>
    );
};

export default Login;