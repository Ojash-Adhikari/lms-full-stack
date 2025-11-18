import React from 'react';
import { assets } from '../../assets/assets';

const Footer = ({ isEducatorRoute = false }) => {
  // Educator Route: Only show minimal bottom bar
  if (isEducatorRoute) {
    return (
      <footer className="bg-gray-900 text-white w-full border-t border-white/10 bottom-1">
        <div className="flex flex-col md:flex-row items-center justify-between px-8 py-6 text-sm text-white/60">
          <div className="flex items-center gap-4 mb-4 md:mb-0">
            <img src={assets.logo} alt="Logo" className="hidden md:block w-16" />
            <div className="hidden md:block h-6 w-px bg-white/30"></div>
            <p>Copyright © 2025 GreatStack / LearnSphere. All Rights Reserved.</p>
          </div>
        </div>
      </footer>
    );
  }

  // Regular User Route: Show full rich footer
  return (
    <footer className="bg-gray-900 text-white w-full mt-10 bottom-1">
      {/* Main Footer Content */}
      <div className="flex flex-col md:flex-row items-start px-8 md:px-36 justify-between gap-10 md:gap-20 py-12 border-b border-white/20">

        {/* Left: Logo + Description */}
        <div className="flex flex-col items-center md:items-start w-full md:w-96">
          <img src={assets.logo_dark} alt="Logo" className="h-10 mb-6" />
          <p className="text-sm text-white/70 text-center md:text-left leading-relaxed">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
          </p>

          {/* Social Icons */}
          <div className="flex items-center gap-5 mt-8">
            <a href="#" aria-label="Facebook">
              <img src={assets.facebook_icon} alt="" className="w-6 h-6 opacity-80 hover:opacity-100 transition" />
            </a>
            <a href="#" aria-label="Twitter">
              <img src={assets.twitter_icon} alt="" className="w-6 h-6 opacity-80 hover:opacity-100 transition" />
            </a>
            <a href="#" aria-label="Instagram">
              <img src={assets.instagram_icon} alt="" className="w-6 h-6 opacity-80 hover:opacity-100 transition" />
            </a>
          </div>
        </div>

        {/* Center: Company Links */}
        <div className="flex flex-col items-center md:items-start">
          <h2 className="font-semibold text-lg mb-5">Company</h2>
          <ul className="space-y-3 text-white/70 text-sm">
            <li><a href="#" className="hover:text-white transition">Home</a></li>
            <li><a href="#" className="hover:text-white transition">About us</a></li>
            <li><a href="#" className="hover:text-white transition">Contact us</a></li>
            <li><a href="#" className="hover:text-white transition">Privacy policy</a></li>
          </ul>
        </div>

        {/* Right: Newsletter (desktop only) */}
        <div className="hidden md:flex flex-col items-start w-80">
          <h2 className="font-semibold text-lg mb-4">Subscribe to our newsletter</h2>
          <p className="text-sm text-white/70 mb-6">
            The latest news, articles, and resources, sent to your inbox weekly.
          </p>
          <div className="flex w-full gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 bg-gray-800 border border-gray-700 rounded px-4 py-2 text-sm placeholder-gray-500 focus:outline-none focus:border-gray-500 transition"
            />
            <button className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded text-white font-medium transition">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Bottom copyright for regular users */}
      <div className="flex items-center justify-center px-8 py-6 text-sm text-white/60 text-center">
        <p>Copyright © 2025 GreatStack / LearnSphere. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;