import React from 'react'

const Loading = () => {
  return (
    <div className="flex flex-col justify-center items-center h-[60vh] gap-5">
      {/* Animated loader */}
      <div className="relative w-12 h-12">
        {/* Outer ring */}
        <div className="absolute inset-0 rounded-full border border-[var(--border-strong)]" />
        {/* Spinning arc */}
        <svg
          className="absolute inset-0 w-full h-full"
          style={{ animation: 'spin-slow 1.2s linear infinite' }}
          viewBox="0 0 48 48"
        >
          <circle
            cx="24"
            cy="24"
            r="22"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="1.5"
            strokeDasharray="100 40"
            strokeLinecap="round"
          />
        </svg>
        {/* Center dot */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
      </div>

      <div className="flex flex-col items-center gap-1">
        <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-[var(--text-muted)] animate-pulse">
          Loading
        </p>
        <div className="flex items-center gap-1">
          {[0, 1, 2].map(i => (
            <span
              key={i}
              className="w-1 h-1 rounded-full bg-[var(--text-ghost)]"
              style={{
                animation: `pulse 1.2s ease-in-out ${i * 0.2}s infinite`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Loading
