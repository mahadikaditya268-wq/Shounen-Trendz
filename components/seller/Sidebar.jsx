import React from 'react';
import Link from 'next/link';
import { assets } from '../../assets/assets';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

const SideBar = () => {
  const pathname = usePathname();

  const menuItems = [
    {
      name: 'Add Product',
      path: '/seller',
      icon: assets.add_icon,
      description: 'List a new item'
    },
    {
      name: 'Product List',
      path: '/seller/product-list',
      icon: assets.product_list_icon,
      description: 'Manage inventory'
    },
    {
      name: 'Orders',
      path: '/seller/orders',
      icon: assets.order_icon,
      description: 'View orders'
    },
  ];

  return (
    <aside className="md:w-64 w-16 border-r border-[var(--border)] min-h-screen py-6 flex flex-col bg-[var(--surface-card)]">
      {/* Title */}
      <div className="hidden md:block px-6 mb-8">
        <p className="font-mono text-[9px] tracking-[0.2em] uppercase text-[var(--text-muted)]">
          Seller Dashboard
        </p>
      </div>

      <nav className="flex-1 space-y-1 px-2">
        {menuItems.map((item) => {
          const isActive = pathname === item.path;
          return (
            <Link href={item.path} key={item.name} passHref>
              <div
                className={`flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition-all duration-200 group ${
                  isActive
                    ? 'bg-[var(--ink)] text-white'
                    : 'text-[var(--text-secondary)] hover:bg-[var(--surface-warm)] hover:text-[var(--text-primary)]'
                }`}
              >
                <div className={`flex-shrink-0 w-8 h-8 rounded-md flex items-center justify-center ${
                  isActive ? 'bg-white/10' : 'bg-[var(--surface-warm)] group-hover:bg-white'
                } transition-colors`}>
                  <Image
                    src={item.icon}
                    alt={item.name}
                    className={`w-4 h-4 ${isActive ? 'brightness-0 invert' : ''}`}
                  />
                </div>
                <div className="hidden md:block min-w-0">
                  <p className={`text-[13px] font-medium truncate ${isActive ? 'text-white' : ''}`}>
                    {item.name}
                  </p>
                  <p className={`text-[10px] truncate mt-0.5 ${isActive ? 'text-white/50' : 'text-[var(--text-ghost)]'}`}>
                    {item.description}
                  </p>
                </div>
              </div>
            </Link>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="hidden md:block px-4 mt-6">
        <div className="p-4 rounded-xl bg-[var(--accent-glow)] border border-[var(--accent)]/20">
          <p className="font-mono text-[9px] tracking-widest uppercase text-[var(--accent-deep)] mb-1">
            Pro Tip
          </p>
          <p className="text-[11px] text-[var(--text-secondary)] leading-relaxed">
            Add high-quality product images to increase conversions by up to 40%.
          </p>
        </div>
      </div>
    </aside>
  );
};

export default SideBar;
