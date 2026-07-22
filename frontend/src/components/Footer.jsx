import React from 'react'
import { assets } from '../assets/assets'
import { Facebook, Instagram, Twitter, Linkedin } from 'lucide-react'

const Footer = () => {
    return (
        <footer
            className="bg-[#0B0B0B] text-white border-t border-[#D89A2B]/20 !mt-20"
            id="footer"
        >
            <div className="w-4/5 mx-auto py-16 px-4 sm:px-6 md:px-8 grid grid-cols-1 md:grid-cols-3 gap-12">

                {/* Left */}
                <div className="space-y-5">
                    <img
                        src={assets.logo}
                        alt="GoldFork Logo"
                        className="w-40"
                    />

                    <p className="text-gray-300 leading-7 text-sm">
                        Experience premium dining with freshly prepared dishes,
                        rich flavors, and exceptional service crafted to satisfy
                        every craving.
                    </p>

                    <div className="flex items-center gap-5 text-[#D89A2B]">
                        <Facebook className="w-6 h-6 cursor-pointer hover:text-white transition duration-300" />
                        <Instagram className="w-6 h-6 cursor-pointer hover:text-white transition duration-300" />
                        <Twitter className="w-6 h-6 cursor-pointer hover:text-white transition duration-300" />
                        <Linkedin className="w-6 h-6 cursor-pointer hover:text-white transition duration-300" />
                    </div>
                </div>

                {/* Center */}
                <div>
                    <h2 className="text-[#D89A2B] text-xl font-bold mb-5">
                        COMPANY
                    </h2>

                    <ul className="space-y-3 text-gray-300">
                        <li className="hover:text-[#D89A2B] cursor-pointer transition">
                            Home
                        </li>
                        <li className="hover:text-[#D89A2B] cursor-pointer transition">
                            About Us
                        </li>
                        <li className="hover:text-[#D89A2B] cursor-pointer transition">
                            Delivery
                        </li>
                        <li className="hover:text-[#D89A2B] cursor-pointer transition">
                            Privacy Policy
                        </li>
                    </ul>
                </div>

                {/* Right */}
                <div>
                    <h2 className="text-[#D89A2B] text-xl font-bold mb-5">
                        GET IN TOUCH
                    </h2>

                    <ul className="space-y-3 text-gray-300">
                        <li>📞 +91 471 827 364</li>
                        <li>✉️ contact@goldfork.com</li>
                    </ul>
                </div>

            </div>

            <div className="border-t border-[#D89A2B]/20 py-6">
                <p className="text-center text-gray-400 text-sm">
                    © 2026 <span className="text-[#D89A2B] font-semibold">GoldFork</span>. All Rights Reserved.
                </p>
            </div>
        </footer>
    )
}

export default Footer