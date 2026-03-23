import React from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="bg-gray-50 mt-16 md:mt-24">
      <div className="max-w-7xl mx-auto">
        {/* Main Footer Content */}
        <div className="flex flex-col md:flex-row items-start justify-between px-6 md:px-8 lg:px-12 gap-12 md:gap-16 py-16 md:py-20">
          {/* Brand Column */}
          <div className="md:max-w-sm">
            <Image className="w-28 md:w-32" src={assets.logo} alt="logo" />
            <p className="mt-5 text-sm text-gray-500 leading-relaxed">
              Your one-stop destination for premium tech and electronics. We curate the best products to bring you quality, style, and innovation—all in one place.
            </p>
            {/* Social Links */}
            <div className="flex items-center gap-3 mt-6">
              {['Twitter', 'Instagram', 'Facebook', 'YouTube'].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="w-9 h-9 rounded-full bg-gray-200/70 flex items-center justify-center text-gray-500 hover:bg-orange-500 hover:text-white transition-all duration-300 text-xs font-bold"
                  aria-label={social}
                >
                  {social[0]}
                </a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          <div className="flex flex-wrap gap-16 md:gap-20">
            <div>
              <h3 className="text-sm font-bold tracking-wider uppercase text-gray-900 mb-5">Company</h3>
              <ul className="space-y-3.5">
                {['Home', 'About us', 'Careers', 'Privacy policy'].map((link) => (
                  <li key={link}>
                    <a className="text-sm text-gray-500 hover:text-orange-500 transition-colors duration-300" href="#">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-bold tracking-wider uppercase text-gray-900 mb-5">Support</h3>
              <ul className="space-y-3.5">
                {['Help Center', 'FAQs', 'Returns', 'Contact us'].map((link) => (
                  <li key={link}>
                    <a className="text-sm text-gray-500 hover:text-orange-500 transition-colors duration-300" href="#">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-sm font-bold tracking-wider uppercase text-gray-900 mb-5">Get in Touch</h3>
              <div className="space-y-3.5 text-sm text-gray-500">
                <p className="flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-orange-50 flex items-center justify-center text-orange-500 text-xs">📞</span>
                  +1-234-567-890
                </p>
                <p className="flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-orange-50 flex items-center justify-center text-orange-500 text-xs">✉️</span>
                  contact@greatstack.dev
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 px-6 md:px-8 lg:px-12">
          <div className="flex flex-col md:flex-row items-center justify-between py-5 gap-2">
            <p className="text-xs text-gray-400">
              © 2025 GreatStack.dev — All rights reserved.
            </p>
            <div className="flex items-center gap-4 text-xs text-gray-400">
              <a href="#" className="hover:text-gray-600 transition-colors">Terms</a>
              <a href="#" className="hover:text-gray-600 transition-colors">Privacy</a>
              <a href="#" className="hover:text-gray-600 transition-colors">Cookies</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
