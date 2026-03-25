"use client"
import { useEffect, useState } from "react";
import { assets } from "@/assets/assets";
import ProductCard from "@/components/ProductCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import { useParams } from "next/navigation";
import Loading from "@/components/Loading";
import { useAppContext } from "@/context/AppContext";
import React from "react";

const Product = () => {

    const { id } = useParams();

    const { products, router, addToCart } = useAppContext()

    const [mainImage, setMainImage] = useState(null);
    const [productData, setProductData] = useState(null);

    const getImageUrl = (imageItem) => {
        if (typeof imageItem === 'string') {
            return imageItem
        }

        return imageItem?.url || ''
    }

    const productImages = productData?.image?.map((item) => getImageUrl(item)).filter(Boolean) || []

    const fetchProductData = async () => {
        const product = products.find(product => product._id === id);
        setProductData(product);
    }

    useEffect(() => {
        fetchProductData();
    }, [id, products.length])

    return productData ? (<>
        <Navbar />
        <div className="px-6 md:px-16 lg:px-24 xl:px-32 pt-12 md:pt-16 space-y-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
                <div className="px-0 md:px-4 lg:px-10">
                    <div className="card-street rounded-2xl overflow-hidden mb-4">
                        <Image
                            src={mainImage || productImages[0]}
                            alt="alt"
                            className="w-full h-auto object-cover mix-blend-multiply p-3"
                            width={1280}
                            height={720}
                        />
                    </div>

                    <div className="grid grid-cols-4 gap-4">
                        {productImages.map((image, index) => (
                            <div
                                key={index}
                                onClick={() => setMainImage(image)}
                                className={`cursor-pointer rounded-lg overflow-hidden border ${
                                    (mainImage || productImages[0]) === image ? 'border-[var(--accent)]' : 'border-[var(--border)]'
                                } bg-[var(--surface-card)]`}
                            >
                                <Image
                                    src={image}
                                    alt="alt"
                                    className="w-full h-auto object-cover mix-blend-multiply p-2"
                                    width={1280}
                                    height={720}
                                />
                            </div>

                        ))}
                    </div>
                </div>

                <div className="flex flex-col">
                    <p className="font-mono text-[10px] tracking-[0.16em] uppercase text-[var(--accent-deep)] mb-3">Streetwear Piece</p>
                    <h1 className="heading-display text-5xl md:text-6xl text-[var(--ink)] mb-4">
                        {productData.name}
                    </h1>
                    <div className="flex items-center gap-2">
                        <div className="flex items-center gap-0.5">
                            <Image className="h-4 w-4" src={assets.star_icon} alt="star_icon" />
                            <Image className="h-4 w-4" src={assets.star_icon} alt="star_icon" />
                            <Image className="h-4 w-4" src={assets.star_icon} alt="star_icon" />
                            <Image className="h-4 w-4" src={assets.star_icon} alt="star_icon" />
                            <Image
                                className="h-4 w-4"
                                src={assets.star_dull_icon}
                                alt="star_dull_icon"
                            />
                        </div>
                        <p className="font-mono text-xs text-[var(--text-muted)]">(4.5)</p>
                    </div>
                    <p className="text-[var(--text-secondary)] mt-4 leading-relaxed">
                        {productData.description}
                    </p>
                    <p className="text-3xl font-semibold mt-6 text-[var(--ink)]">
                        ${productData.offerPrice}
                        <span className="text-base font-normal text-[var(--text-muted)] line-through ml-2">
                            ${productData.price}
                        </span>
                    </p>
                    <hr className="bg-[var(--border)] my-6" />
                    <div className="overflow-x-auto">
                        <table className="table-auto border-collapse w-full max-w-80 text-sm">
                            <tbody>
                                <tr>
                                    <td className="text-[var(--text-secondary)] font-medium py-1.5">Brand</td>
                                    <td className="text-[var(--text-muted)] py-1.5">Shounen Trendz</td>
                                </tr>
                                <tr>
                                    <td className="text-[var(--text-secondary)] font-medium py-1.5">Fit</td>
                                    <td className="text-[var(--text-muted)] py-1.5">Oversized</td>
                                </tr>
                                <tr>
                                    <td className="text-[var(--text-secondary)] font-medium py-1.5">Category</td>
                                    <td className="text-[var(--text-muted)] py-1.5">
                                        {productData.category}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="flex items-center mt-10 gap-4">
                        <button onClick={() => addToCart(productData._id)} className="w-full py-3.5 border border-[var(--border-strong)] text-[var(--text-primary)] hover:bg-[var(--surface-alt)] transition font-medium tracking-[0.06em] uppercase text-sm rounded-lg">
                            Add to Cart
                        </button>
                        <button onClick={() => { addToCart(productData._id); router.push('/cart') }} className="w-full py-3.5 bg-[var(--ink)] text-white hover:bg-[var(--accent)] transition font-semibold tracking-[0.08em] uppercase text-sm rounded-lg">
                            Buy now
                        </button>
                    </div>
                </div>
            </div>
            <div className="flex flex-col items-center">
                <div className="flex flex-col items-center mb-4 mt-16">
                    <p className="heading-display text-5xl text-[var(--ink)]">Related Fits</p>
                    <div className="w-28 h-0.5 bg-[var(--accent)] mt-2"></div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6 pb-14 w-full">
                    {products.slice(0, 5).map((product, index) => <ProductCard key={index} product={product} />)}
                </div>
                <button className="btn-outline mb-16">
                    See more
                </button>
            </div>
        </div>
        <Footer />
    </>
    ) : <Loading />
};

export default Product;