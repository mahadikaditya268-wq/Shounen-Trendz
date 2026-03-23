import React from 'react'
import Image from 'next/image';
import { useAppContext } from '@/context/AppContext';

const ProductCard = ({ product }) => {
  const { currency, router, addToCart } = useAppContext();
  const productImage = typeof product.image?.[0] === 'string'
    ? product.image[0]
    : product.image?.[0]?.url;

  const discount = product.price > product.offerPrice
    ? Math.round(((product.price - product.offerPrice) / product.price) * 100)
    : 0;

  return (
    <div
      className="product-card group flex flex-col cursor-pointer"
      onClick={() => { router.push('/product/' + product._id); scrollTo(0, 0); }}
    >
      <div className="card-street relative overflow-hidden rounded-2xl aspect-square">
        <div className="absolute top-0 right-0 h-12 w-12 border-t-2 border-r-2 border-[var(--accent)]/45 rounded-tr-2xl" />
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/10 to-transparent pointer-events-none" />
        <Image
          src={productImage}
          alt={product.name}
          className="product-card-img w-full h-full object-contain p-4 mix-blend-multiply"
          width={800}
          height={800}
        />

        {discount > 0 && (
          <div className="absolute top-3 left-3 bg-[var(--accent)] text-white font-mono text-[9px] tracking-widest uppercase px-2 py-1 rounded-full">
            -{discount}%
          </div>
        )}

        <div className="absolute left-3 bottom-3 font-mono text-[9px] tracking-[0.14em] uppercase px-2.5 py-1 rounded-full border border-[var(--border)] bg-[var(--surface-card)]/90 text-[var(--text-secondary)]">
          street fit
        </div>

        <button
          onClick={(e) => { e.stopPropagation(); }}
          className="absolute top-3 right-3 w-8 h-8 bg-[var(--surface-card)] rounded-full flex items-center justify-center shadow-sm border border-[var(--border)] opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-300 hover:border-[var(--accent)]"
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-[var(--text-secondary)]">
            <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
          </svg>
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            addToCart(product._id);
          }}
          className="max-sm:hidden absolute bottom-3 left-3 right-3 py-2.5 bg-[var(--ink)] text-white text-[11px] font-semibold tracking-[0.12em] uppercase rounded-lg opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 hover:bg-[var(--accent)] flex items-center justify-center gap-2"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 5v14M5 12h14" strokeLinecap="round" />
          </svg>
          Quick Cop
        </button>
      </div>

      <div className="mt-3 space-y-1.5 px-0.5">
        <p className="font-mono text-[9px] tracking-[0.18em] uppercase text-[var(--text-muted)]">
          {product.category}
        </p>

        <p className="text-[14px] font-medium text-[var(--text-primary)] truncate leading-snug">
          {product.name}
        </p>

        <div className="flex items-center gap-1.5">
          <div className="flex items-center gap-0.5">
            {[1,2,3,4,5].map(i => (
              <svg key={i} width="10" height="10" viewBox="0 0 24 24" fill={i <= 4 ? "var(--accent)" : "none"} stroke="var(--accent)" strokeWidth="1.5">
                <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
              </svg>
            ))}
          </div>
          <span className="font-mono text-[9px] text-[var(--text-muted)]">(4.5)</span>
        </div>

        <div className="flex items-baseline gap-2 pt-0.5">
          <span className="text-[15px] font-semibold text-[var(--text-primary)]">
            {currency}{product.offerPrice}
          </span>
          {product.price > product.offerPrice && (
            <span className="text-[12px] text-[var(--text-ghost)] line-through">
              {currency}{product.price}
            </span>
          )}
        </div>

        <div className="flex items-center gap-1.5 pt-1">
          {['S', 'M', 'L'].map((size) => (
            <span key={size} className="font-mono text-[9px] px-1.5 py-0.5 border border-[var(--border)] rounded text-[var(--text-muted)]">
              {size}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
