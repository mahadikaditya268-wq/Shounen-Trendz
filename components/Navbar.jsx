"use client"
import React, { useState, useEffect } from "react";
import { assets, BagIcon, BoxIcon, CartIcon, HomeIcon } from "@/assets/assets";
import Link from "next/link";
import { useAppContext } from "@/context/AppContext";
import Image from "next/image";
import { useClerk, UserButton } from "@clerk/nextjs";

const Navbar = () => {
  const { isSeller, router, user } = useAppContext();
  const { openSignIn } = useClerk();
  const [scrolled, setScrolled] = useState(false);
  const { getCartCount } = useAppContext();
  const cartCount = getCartCount();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/drop", label: "Drop" },
    { href: "/all-products", label: "Fits" },
    { href: "/my-orders", label: "Orders" },
  ];

  return (
    <nav
      className={`sticky top-0 z-50 transition-all duration-500 ${
        scrolled ? "navbar-glass shadow-md" : "bg-transparent"
      }`}
    >
      <div className="border-b border-[var(--border)] py-2 px-6 hidden md:block bg-[var(--ink)] text-white">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-6 overflow-hidden">
          <p className="font-mono text-[10px] tracking-[0.16em] uppercase text-white/75 whitespace-nowrap">
            Tokyo lane capsule live now
          </p>
          <div className="flex items-center gap-4">
            <span className="anime-badge font-mono text-[9px] tracking-[0.14em] uppercase px-2.5 py-1 rounded-full">
              manga inspired
            </span>
            <p className="font-mono text-[10px] tracking-[0.12em] uppercase text-white/60">
              free shipping over $99
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto flex items-center justify-between px-5 md:px-8 py-4">
        <div
          className="cursor-pointer flex items-center gap-3 group"
          onClick={() => router.push("/")}
        >
          <Image
            className="w-28 md:w-32 transition-transform duration-300 group-hover:scale-95"
            src={assets.logo}
            alt="logo"
          />
          <span className="hidden lg:inline-block font-mono text-[10px] tracking-[0.15em] uppercase text-[var(--text-muted)] border-l border-[var(--border)] pl-3">
            shounen trendz
          </span>
        </div>

        <div className="hidden md:flex items-center gap-1 bg-[var(--surface-card)] border border-[var(--border)] rounded-full px-2 py-1">
          {navLinks.map(({ href, label }) => (
            <Link
              key={label}
              href={href}
              className="relative px-4 py-2 text-[11px] font-semibold tracking-[0.12em] uppercase text-[var(--text-secondary)] hover:text-[var(--ink)] transition-colors duration-300 group"
            >
              {label}
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-px bg-[var(--accent)] transition-all duration-300 group-hover:w-3/5" />
            </Link>
          ))}

          {isSeller && (
            <button
              onClick={() => router.push("/seller")}
              className="ml-2 font-mono text-[10px] tracking-[0.15em] uppercase border border-[var(--ink)] text-[var(--ink)] px-4 py-2 rounded-full hover:bg-[var(--ink)] hover:text-white transition-all duration-300"
            >
              Seller
            </button>
          )}
        </div>

        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-3">
              <button
                onClick={() => router.push("/cart")}
                className="relative p-2.5 rounded-full border border-[var(--border)] bg-[var(--surface-card)] hover:border-[var(--accent)] transition-colors duration-200 group"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="text-[var(--text-secondary)] group-hover:text-[var(--text-primary)]"
                >
                  <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <path d="M16 10a4 4 0 01-8 0" />
                </svg>
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-[var(--accent)] text-white text-[9px] font-bold rounded-full flex items-center justify-center font-mono">
                    {cartCount}
                  </span>
                )}
              </button>
              <UserButton>
                <UserButton.MenuItems>
                  <UserButton.Action
                    label="Cart"
                    labelIcon={<CartIcon />}
                    onClick={() => router.push("/cart")}
                  />
                </UserButton.MenuItems>
                <UserButton.MenuItems>
                  <UserButton.Action
                    label="My Orders"
                    labelIcon={<BagIcon />}
                    onClick={() => router.push("/my-orders")}
                  />
                </UserButton.MenuItems>
              </UserButton>
            </div>
          ) : (
            <button
              onClick={openSignIn}
              className="flex items-center gap-2.5 text-[11px] font-semibold tracking-[0.1em] uppercase text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors group"
            >
              <div className="w-8 h-8 rounded-full border border-[var(--border-strong)] flex items-center justify-center group-hover:border-[var(--accent)] group-hover:bg-[var(--accent-soft)] transition-all duration-300">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </div>
              <span>Sign In</span>
            </button>
          )}
        </div>

        <div className="flex items-center md:hidden gap-3">
          <button
            onClick={() => router.push("/cart")}
            className="relative p-2 rounded-full border border-[var(--border)] bg-[var(--surface-card)]"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-[var(--text-secondary)]">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 01-8 0" />
            </svg>
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-[var(--accent)] text-white text-[9px] font-bold rounded-full flex items-center justify-center font-mono">
                {cartCount}
              </span>
            )}
          </button>
          {isSeller && (
            <button
              onClick={() => router.push("/seller")}
              className="font-mono text-[9px] tracking-widest uppercase border border-[var(--ink)] px-3 py-1.5 rounded-full"
            >
              Seller
            </button>
          )}
          {user ? (
            <UserButton>
              <UserButton.MenuItems>
                <UserButton.Action
                  label="Drop"
                  labelIcon={<HomeIcon />}
                  onClick={() => router.push("/drop")}
                />
              </UserButton.MenuItems>
              <UserButton.MenuItems>
                <UserButton.Action
                  label="Products"
                  labelIcon={<BoxIcon />}
                  onClick={() => router.push("/all-products")}
                />
              </UserButton.MenuItems>
              <UserButton.MenuItems>
                <UserButton.Action
                  label="Cart"
                  labelIcon={<CartIcon />}
                  onClick={() => router.push("/cart")}
                />
              </UserButton.MenuItems>
              <UserButton.MenuItems>
                <UserButton.Action
                  label="My Orders"
                  labelIcon={<BagIcon />}
                  onClick={() => router.push("/my-orders")}
                />
              </UserButton.MenuItems>
            </UserButton>
          ) : (
            <button
              onClick={openSignIn}
              className="p-2 rounded-full border border-[var(--border)] bg-[var(--surface-card)]"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="text-[var(--text-secondary)]"
              >
                <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
