import React from 'react'
import { assets } from '@/assets/assets'
import Image from 'next/image';
import { useAppContext } from '@/context/AppContext';

const ProductCard = ({ product }) => {

    const { currency, router } = useAppContext()
    const productImage = typeof product.image?.[0] === 'string' ? product.image[0] : product.image?.[0]?.url

    return (
        <div
            onClick={() => { router.push('/product/' + product._id); scrollTo(0, 0) }}
            className="group flex flex-col items-start w-full cursor-pointer"
        >
            {/* Image Container */}
            <div className="relative bg-gray-50 rounded-2xl w-full aspect-square flex items-center justify-center overflow-hidden border border-gray-100 group-hover:border-gray-200 transition-colors duration-300">
                <Image
                    src={productImage}
                    alt={product.name}
                    className="object-contain w-[75%] h-[75%] group-hover:scale-110 transition-transform duration-500 ease-out"
                    width={800}
                    height={800}
                />

                {/* Wishlist Button */}
                <button
                  onClick={(e) => { e.stopPropagation(); }}
                  className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm p-2.5 rounded-full shadow-sm opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-300 hover:bg-red-50 hover:scale-110"
                >
                    <Image className="h-3.5 w-3.5" src={assets.heart_icon} alt="heart_icon" />
                </button>

                {/* Quick Buy - Desktop */}
                <button
                  onClick={(e) => { e.stopPropagation(); }}
                  className="max-sm:hidden absolute bottom-3 left-3 right-3 py-2.5 bg-gray-900 text-white text-xs font-semibold tracking-wider uppercase rounded-xl opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 hover:bg-orange-500"
                >
                    Quick Add
                </button>
            </div>

            {/* Product Info */}
            <div className="mt-3.5 w-full space-y-1">
                <p className="text-sm md:text-[15px] font-semibold text-gray-900 truncate leading-snug">{product.name}</p>
                <p className="text-xs text-gray-400 max-sm:hidden truncate leading-relaxed">{product.description}</p>

                {/* Rating */}
                <div className="flex items-center gap-1.5 pt-0.5">
                    <div className="flex items-center gap-[2px]">
                        {Array.from({ length: 5 }).map((_, index) => (
                            <Image
                                key={index}
                                className="h-3 w-3"
                                src={index < Math.floor(4) ? assets.star_icon : assets.star_dull_icon}
                                alt="star_icon"
                            />
                        ))}
                    </div>
                    <span className="text-[11px] text-gray-400 font-medium">(4.5)</span>
                </div>

                {/* Price */}
                <div className="flex items-center justify-between pt-1">
                    <p className="text-base md:text-lg font-bold text-gray-900">{currency}{product.offerPrice}</p>
                </div>
            </div>
        </div>
    )
}

export default ProductCard
