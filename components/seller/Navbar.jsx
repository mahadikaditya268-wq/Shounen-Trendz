import React from 'react'
import { assets } from '../../assets/assets'
import Image from 'next/image'
import { useAppContext } from '@/context/AppContext'

const Navbar = () => {
  const { router } = useAppContext()

  return (
    <header className="flex items-center px-5 md:px-8 py-4 justify-between border-b border-[var(--border)] bg-[var(--surface-card)]">
      <Image
        onClick={() => router.push('/')}
        className="w-28 lg:w-32 cursor-pointer hover:opacity-70 transition-opacity"
        src={assets.logo}
        alt="logo"
      />

      <div className="flex items-center gap-3">
        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--surface-warm)] border border-[var(--border)]">
          <div className="w-1.5 h-1.5 rounded-full bg-[var(--sage)] animate-pulse" />
          <span className="font-mono text-[9px] tracking-widest uppercase text-[var(--text-muted)]">
            Seller Portal
          </span>
        </div>
        <button
          onClick={() => router.push('/')}
          className="flex items-center gap-2 px-4 py-2 rounded-lg border border-[var(--border-strong)] text-[11px] font-medium tracking-[0.06em] text-[var(--text-secondary)] hover:bg-[var(--ink)] hover:text-white hover:border-[var(--ink)] transition-all duration-200"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="hidden sm:inline">Exit Dashboard</span>
        </button>
      </div>
    </header>
  )
}

export default Navbar
