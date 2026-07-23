import React from 'react'
import { assets } from '../assets/assets'
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from 'react-icons/fa'
import { Phone, Mail, MapPin } from 'lucide-react'

const Footer = () => {
    return (
        <footer
            className="bg-[#080808] text-white border-t border-[#D89A2B]/20 !mt-16 md:mt-24 relative shadow-[0_-10px_30px_rgba(0,0,0,0.8)]"
            id="footer"
        >
            {/* Top ambient gold line */}
            <div className="bg-gradient-to-r from-transparent via-[#D89A2B]/25 to-transparent h-[1px] w-full absolute top-0 left-0" />

            <div className="w-4/5 mx-auto pt-12 pb-8 px-4 sm:px-6 md:px-8 grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-12 items-start">

                {/* Left Column - Brand & Socials (md:col-span-5) */}
                <div className="md:col-span-5 flex flex-col items-start gap-4">
                    <img
                        src={assets.logo}
                        alt="GoldFork Logo"
                        className="w-48 md:w-52 cursor-pointer object-contain hover:opacity-90 transition duration-300"
                    />

                    <p className="text-[#a3a3a3] text-sm leading-relaxed max-w-sm font-light">
                        Experience premium dining with freshly prepared dishes,
                        rich flavors, and exceptional service crafted to satisfy
                        every culinary craving.
                    </p>

                    <div className="flex items-center gap-3 pt-2">
                        <a
                            href="#"
                            aria-label="Facebook"
                            className="w-10 h-10 rounded-full bg-[#141414] border border-[#2A2116] flex items-center justify-center text-[#D89A2B] hover:text-black hover:bg-[#D89A2B] hover:border-[#D89A2B] transition-all duration-300 hover:scale-110 shadow-md"
                        >
                            <FaFacebook className="w-4 h-4" />
                        </a>
                        <a
                            href="#"
                            aria-label="Instagram"
                            className="w-10 h-10 rounded-full bg-[#141414] border border-[#2A2116] flex items-center justify-center text-[#D89A2B] hover:text-black hover:bg-[#D89A2B] hover:border-[#D89A2B] transition-all duration-300 hover:scale-110 shadow-md"
                        >
                            <FaInstagram className="w-4 h-4" />
                        </a>
                        <a
                            href="#"
                            aria-label="Twitter"
                            className="w-10 h-10 rounded-full bg-[#141414] border border-[#2A2116] flex items-center justify-center text-[#D89A2B] hover:text-black hover:bg-[#D89A2B] hover:border-[#D89A2B] transition-all duration-300 hover:scale-110 shadow-md"
                        >
                            <FaTwitter className="w-4 h-4" />
                        </a>
                        <a
                            href="#"
                            aria-label="Linkedin"
                            className="w-10 h-10 rounded-full bg-[#141414] border border-[#2A2116] flex items-center justify-center text-[#D89A2B] hover:text-black hover:bg-[#D89A2B] hover:border-[#D89A2B] transition-all duration-300 hover:scale-110 shadow-md"
                        >
                            <FaLinkedin className="w-4 h-4" />
                        </a>
                    </div>
                </div>

                {/* Center Column - Links (md:col-span-3) */}
                <div className="md:col-span-3 flex flex-col items-start">
                    <h2 className="text-[#D89A2B] text-base md:text-lg font-bold tracking-wider uppercase mb-4">
                        COMPANY
                    </h2>

                    <ul className="space-y-2.5 text-gray-300 text-sm font-medium">
                        <li className="hover:text-[#D89A2B] hover:translate-x-1.5 cursor-pointer transition-all duration-300 flex items-center gap-1.5 group">
                            <span className="text-[#D89A2B] opacity-0 group-hover:opacity-100 transition-opacity">›</span>
                            <span>Home</span>
                        </li>
                        <li className="hover:text-[#D89A2B] hover:translate-x-1.5 cursor-pointer transition-all duration-300 flex items-center gap-1.5 group">
                            <span className="text-[#D89A2B] opacity-0 group-hover:opacity-100 transition-opacity">›</span>
                            <span>About Us</span>
                        </li>
                        <li className="hover:text-[#D89A2B] hover:translate-x-1.5 cursor-pointer transition-all duration-300 flex items-center gap-1.5 group">
                            <span className="text-[#D89A2B] opacity-0 group-hover:opacity-100 transition-opacity">›</span>
                            <span>Delivery</span>
                        </li>
                        <li className="hover:text-[#D89A2B] hover:translate-x-1.5 cursor-pointer transition-all duration-300 flex items-center gap-1.5 group">
                            <span className="text-[#D89A2B] opacity-0 group-hover:opacity-100 transition-opacity">›</span>
                            <span>Privacy Policy</span>
                        </li>
                    </ul>
                </div>

                {/* Right Column - Contact (md:col-span-4) */}
                <div className="md:col-span-4 flex flex-col items-start">
                    <h2 className="text-[#D89A2B] text-base md:text-lg font-bold tracking-wider uppercase mb-4">
                        GET IN TOUCH
                    </h2>

                    <ul className="space-y-3.5 text-gray-300 text-sm font-light">
                        <li className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-[#141414] border border-[#2A2116] flex items-center justify-center shrink-0 text-[#D89A2B]">
                                <Phone className="w-3.5 h-3.5" />
                            </div>
                            <span>+91 471 827 364</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-[#141414] border border-[#2A2116] flex items-center justify-center shrink-0 text-[#D89A2B]">
                                <Mail className="w-3.5 h-3.5" />
                            </div>
                            <span>contact@goldfork.com</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-[#141414] border border-[#2A2116] flex items-center justify-center shrink-0 text-[#D89A2B]">
                                <MapPin className="w-3.5 h-3.5" />
                            </div>
                            <span>Downtown Avenue, Main City</span>
                        </li>
                    </ul>
                </div>

            </div>

            {/* Copyright Section */}
            <div className="border-t border-white/5 py-5 mt-6">
                <p className="text-center text-[#888888] text-xs sm:text-sm font-light">
                    © 2026 <span className="text-[#D89A2B] font-semibold">GoldFork</span>. All Rights Reserved.
                </p>
            </div>
        </footer>
    )
}

export default Footer