'use client'
import ProductCard from "@/components/ProductCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAppContext } from "@/context/AppContext";

const AllProducts = () => {

    const { products } = useAppContext();

    return (
        <>
            <Navbar />
            <div className="flex flex-col items-start px-6 md:px-16 lg:px-24 xl:px-32">
                <div className="w-full pt-12 md:pt-16 pb-4 flex flex-col md:flex-row md:items-end md:justify-between gap-5">
                    <div>
                        <p className="font-mono text-[10px] tracking-[0.18em] uppercase text-[var(--accent-deep)] mb-2">Streetwear Archive</p>
                        <h1 className="heading-display text-5xl md:text-7xl text-[var(--ink)]">All Fits</h1>
                    </div>
                    <p className="text-sm text-[var(--text-muted)] max-w-sm leading-relaxed">
                        Explore every piece from our anime-infused street collection.
                    </p>
                </div>
                <div className="h-px w-full bg-[var(--border)] mb-8" />
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 flex-col items-center gap-6 mt-4 pb-16 w-full">
                    {products.map((product, index) => <ProductCard key={index} product={product} />)}
                </div>
            </div>
            <Footer />
        </>
    );
};

export default AllProducts;
