import React, { useState } from "react";
import { X, Mail, Lock, User } from "lucide-react";

const Login = ({ setShowLogin }) => {
    const [currState, setCurrState] = useState("Sign Up");

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
            <div className="w-[90%] max-w-md rounded-3xl border border-[#D89A2B]/30 bg-[#111111]/90 p-8 shadow-2xl shadow-black/50">

                {/* Header */}
                <div className="mb-8 flex items-center justify-between">
                    <div>
                        <h2 className="text-3xl font-bold text-white">
                            {currState}
                        </h2>
                        <p className="mt-1 text-sm text-gray-400">
                            Welcome to Gourmet Restaurant
                        </p>
                    </div>

                    <button
                        onClick={() => setShowLogin(false)}
                        className="rounded-full bg-[#1E1E1E] p-2 text-gray-300 transition hover:bg-[#D89A2B] hover:text-black"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Form */}
                <form className="space-y-5">

                    {currState === "Sign Up" && (
                        <div className="relative">
                            <User
                                size={18}
                                className="absolute left-4 top-1/2 -translate-y-1/2 text-[#D89A2B]"
                            />
                            <input
                                type="text"
                                placeholder="Full Name"
                                required
                                className="w-full rounded-xl border border-gray-700 bg-[#1B1B1B] py-3 pl-12 pr-4 text-white outline-none transition focus:border-[#D89A2B]"
                            />
                        </div>
                    )}

                    <div className="relative">
                        <Mail
                            size={18}
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-[#D89A2B]"
                        />
                        <input
                            type="email"
                            placeholder="Email Address"
                            required
                            className="w-full rounded-xl border border-gray-700 bg-[#1B1B1B] py-3 pl-12 pr-4 text-white outline-none transition focus:border-[#D89A2B]"
                        />
                    </div>

                    <div className="relative">
                        <Lock
                            size={18}
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-[#D89A2B]"
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            required
                            className="w-full rounded-xl border border-gray-700 bg-[#1B1B1B] py-3 pl-12 pr-4 text-white outline-none transition focus:border-[#D89A2B]"
                        />
                    </div>

                    <div className="flex items-start gap-3 text-sm text-gray-400">
                        <input
                            type="checkbox"
                            required
                            className="mt-1 accent-[#D89A2B]"
                        />
                        <p>
                            I agree to the{" "}
                            <span className="text-[#D89A2B]">Terms of Service</span> &
                            <span className="text-[#D89A2B]"> Privacy Policy</span>.
                        </p>
                    </div>

                    <button
                        className="w-full rounded-xl bg-gradient-to-r from-[#D89A2B] to-[#B8791D] py-3 font-semibold text-black transition duration-300 hover:scale-[1.02]"
                    >
                        {currState === "Sign Up"
                            ? "Create Account"
                            : "Login"}
                    </button>

                    <div className="text-center text-gray-400">
                        {currState === "Login" ? (
                            <p>
                                Don't have an account?{" "}
                                <span
                                    onClick={() => setCurrState("Sign Up")}
                                    className="cursor-pointer font-semibold text-[#D89A2B]"
                                >
                                    Sign Up
                                </span>
                            </p>
                        ) : (
                            <p>
                                Already have an account?{" "}
                                <span
                                    onClick={() => setCurrState("Login")}
                                    className="cursor-pointer font-semibold text-[#D89A2B]"
                                >
                                    Login
                                </span>
                            </p>
                        )}
                    </div>

                </form>
            </div>
        </div>
    );
};

export default Login;