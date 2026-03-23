import React from 'react'

const Loading = () => {
    return (
        <div className="flex flex-col justify-center items-center h-[70vh] gap-4">
            {/* Animated Loader */}
            <div className="relative w-16 h-16">
                <div className="absolute inset-0 rounded-full border-[3px] border-gray-200" />
                <div className="absolute inset-0 rounded-full border-[3px] border-transparent border-t-orange-500 animate-spin" />
                <div className="absolute inset-2 rounded-full border-[3px] border-transparent border-t-orange-300 animate-spin" style={{ animationDirection: 'reverse', animationDuration: '0.8s' }} />
            </div>
            <p className="text-sm text-gray-400 font-medium tracking-wide animate-pulse">Loading...</p>
        </div>
    )
}

export default Loading
