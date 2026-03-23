"use client"
import React, { useState, useEffect } from "react";
import { assets, BagIcon, BoxIcon, CartIcon, HomeIcon } from "@/assets/assets";
import Link from "next/link"
import { useAppContext } from "@/context/AppContext";
import Image from "next/image";
import { useClerk, UserButton } from "@clerk/nextjs";

const Navbar = () => {

  const { isSeller, router, user } = useAppContext();
  const { openSignIn } = useClerk()
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/all-products", label: "Shop" },
    { href: "/", label: "About Us" },
    { href: "/", label: "Contact" },
  ];

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-500 ${scrolled ? "bg-white/80 backdrop-blur-xl shadow-[0_1px_0_0_rgba(0,0,0,0.05),0_4px_24px_-4px_rgba(0,0,0,0.08)]" : "bg-white/95 backdrop-blur-sm"}`}>
      <div className="max-w-7xl mx-auto flex items-center justify-between px-5 md:px-8 lg:px-12 py-3.5">

        {/* Logo */}
        <Image
          className="cursor-pointer w-28 md:w-32 hover:opacity-80 transition-opacity duration-300"
          onClick={() => router.push('/')}
          src={assets.logo}
          alt="logo"
        />

        {/* Desktop Navigation */}
        <div className="flex items-center gap-1 max-md:hidden">
          {navLinks.map(({ href, label }) => (
            <Link
              key={label}
              href={href}
              className="relative px-4 py-2 text-[13px] font-medium tracking-wide text-gray-500 uppercase hover:text-gray-900 transition-colors duration-300 after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:w-0 after:h-[2px] after:bg-orange-500 after:transition-all after:duration-300 hover:after:w-3/4"
            >
              {label}
            </Link>
          ))}

          {isSeller && (
            <button
              onClick={() => router.push('/seller')}
              className="ml-3 text-xs font-semibold tracking-wider uppercase border-2 border-gray-900 text-gray-900 px-5 py-2 rounded-full hover:bg-gray-900 hover:text-white transition-all duration-300"
            >
              Seller Dashboard
            </button>
          )}
        </div>

        {/* Desktop Actions */}
        <ul className="hidden md:flex items-center gap-5">
          <button className="group p-2 rounded-full hover:bg-gray-100 transition-colors duration-300">
            <Image className="w-[18px] h-[18px] opacity-60 group-hover:opacity-100 transition-opacity" src={assets.search_icon} alt="search icon" />
          </button>
          {
            user
              ? <>
                <UserButton>
                  <UserButton.MenuItems>
                    <UserButton.Action label="Cart" labelIcon={<CartIcon />} onClick={() => router.push('/cart')} />
                  </UserButton.MenuItems>
                  <UserButton.MenuItems>
                    <UserButton.Action label="My Orders" labelIcon={<BagIcon />} onClick={() => router.push('/my-orders')} />
                  </UserButton.MenuItems>
                </UserButton>
              </>
              : <button onClick={openSignIn} className="flex items-center gap-2.5 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors duration-300 group">
                <div className="p-2 rounded-full bg-gray-100 group-hover:bg-orange-50 transition-colors duration-300">
                  <Image src={assets.user_icon} alt="user icon" className="w-4 h-4" />
                </div>
                <span className="tracking-wide">Account</span>
              </button>
          }
        </ul>

        {/* Mobile Actions */}
        <div className="flex items-center md:hidden gap-3">
          {isSeller && <button onClick={() => router.push('/seller')} className="text-[10px] font-bold tracking-wider uppercase border-2 border-gray-900 px-4 py-1.5 rounded-full hover:bg-gray-900 hover:text-white transition-all duration-300">Seller</button>}
          {
            user
              ? <>
                <UserButton>
                <UserButton.MenuItems>
                    <UserButton.Action label="Home" labelIcon={<HomeIcon />} onClick={() => router.push('/')} />
                  </UserButton.MenuItems>
                  <UserButton.MenuItems>
                    <UserButton.Action label="Products" labelIcon={<BoxIcon />} onClick={() => router.push('/all-products')} />
                  </UserButton.MenuItems>
                  <UserButton.MenuItems>
                    <UserButton.Action label="Cart" labelIcon={<CartIcon />} onClick={() => router.push('/cart')} />
                  </UserButton.MenuItems>
                  <UserButton.MenuItems>
                    <UserButton.Action label="My Orders" labelIcon={<BagIcon />} onClick={() => router.push('/my-orders')} />
                  </UserButton.MenuItems>
                </UserButton>
              </>
              : <button onClick={openSignIn} className="flex items-center gap-2 hover:text-gray-900 transition">
                <Image src={assets.user_icon} alt="user icon" />
                Account
              </button>
          }
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
