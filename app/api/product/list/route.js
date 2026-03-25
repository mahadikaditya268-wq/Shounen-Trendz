import connectDB from '@/config/db'
import Product from '@/models/Product'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

const clothingCatalog = [
    {
        name: 'Neo Drift Oversized Tee',
        category: 'T-Shirt',
        description: 'Heavyweight cotton oversized tee with anime panel print and dropped shoulders for a clean street silhouette.',
        images: [
            'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1200&q=80'
        ]
    },
    {
        name: 'Shibuya Utility Cargo',
        category: 'Bottomwear',
        description: 'Relaxed-fit cargo pants with multiple utility pockets, adjustable hems, and all-day comfort for urban movement.',
        images: [
            'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1514996937319-344454492b37?auto=format&fit=crop&w=1200&q=80'
        ]
    },
    {
        name: 'Akira Shadow Hoodie',
        category: 'Hoodie',
        description: 'French-terry hoodie with bold back graphic, ribbed cuffs, and a roomy fit designed for layered street looks.',
        images: [
            'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1612423284934-2850a4ea6b0f?auto=format&fit=crop&w=1200&q=80'
        ]
    },
    {
        name: 'Tokyo Lane Varsity Jacket',
        category: 'Jacket',
        description: 'Statement varsity jacket with contrast sleeves and embroidered details inspired by late-night city racing scenes.',
        images: [
            'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1521223890158-f9f7c3d5d504?auto=format&fit=crop&w=1200&q=80'
        ]
    },
    {
        name: 'Manga Line Graphic Tee',
        category: 'T-Shirt',
        description: 'Premium jersey tee featuring monochrome manga-line artwork and reinforced neckline for everyday wear.',
        images: [
            'https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1200&q=80'
        ]
    },
    {
        name: 'District Tech Bomber',
        category: 'Jacket',
        description: 'Lightweight bomber with utility zip pockets, matte finish, and sleek panel construction for modern street style.',
        images: [
            'https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=80'
        ]
    },
    {
        name: 'Rebel Fit Denim',
        category: 'Bottomwear',
        description: 'Wide-leg denim with washed texture, stacked fall, and a street-ready cut that pairs with oversized tops.',
        images: [
            'https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1475178626620-a4d074967452?auto=format&fit=crop&w=1200&q=80'
        ]
    },
    {
        name: 'Kitsune Crossbody Sling',
        category: 'Accessories',
        description: 'Compact crossbody sling with tactical strap, internal organizers, and signature badge detailing.',
        images: [
            'https://images.unsplash.com/photo-1591561954557-26941169b49e?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=1200&q=80'
        ]
    },
    {
        name: 'Nightfall Co-ord Set',
        category: 'Co-ord',
        description: 'Matching top and bottom set in soft structured fabric for an effortless coordinated streetwear outfit.',
        images: [
            'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=1200&q=80'
        ]
    },
    {
        name: 'Street Core Layered Shirt',
        category: 'Shirt',
        description: 'Layer-friendly button-up with elongated hem and subtle contrast stitch work for elevated casual styling.',
        images: [
            'https://images.unsplash.com/photo-1516257984-b1b4d707412e?auto=format&fit=crop&w=1200&q=80',
            'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1200&q=80'
        ]
    }
]

const toClothingProduct = (product, index) => {
    const template = clothingCatalog[index % clothingCatalog.length]

    return {
        ...product.toObject(),
        name: template.name,
        category: template.category,
        description: template.description,
        image: template.images
    }
}

export async function GET(request) {
    try {

        await connectDB()

        const products = await Product.find({})
        const styledProducts = products.map((product, index) => toClothingProduct(product, index))

        return NextResponse.json({ success:true, products: styledProducts })

    } catch (error) {
        return NextResponse.json({ success: false, message: error.message })
    }
}