import connectDB from '@/config/db'
import authSeller from '@/lib/authSeller'
import Product from '@/models/Product'
import { getAuth } from '@clerk/nextjs/server'
import mongoose from 'mongoose'
import { v2 as cloudinary } from 'cloudinary'
import { NextResponse } from 'next/server'

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

const getPublicIdFromCloudinaryUrl = (url) => {
    if (!url || typeof url !== 'string') {
        return null
    }

    const match = url.match(/\/upload\/(?:v\d+\/)?(.+)\.[a-zA-Z0-9]+(?:\?.*)?$/)
    return match ? match[1] : null
}

export async function DELETE(request) {
    try {
        const { userId } = getAuth(request)
        const isSeller = await authSeller(userId)

        if (!isSeller) {
            return NextResponse.json({ success: false, message: 'not authorized' })
        }

        const { id } = await request.json()

        if (!id) {
            return NextResponse.json({ success: false, message: 'product id is required' })
        }

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json({ success: false, message: 'invalid product id' })
        }

        await connectDB()

        const product = await Product.findById(id)

        if (!product) {
            return NextResponse.json({ success: false, message: 'product not found' })
        }

        if (product.userId !== userId) {
            return NextResponse.json({ success: false, message: 'not authorized' })
        }

        const imageList = Array.isArray(product.image) ? product.image : []

        await Promise.all(
            imageList.map(async (imageItem) => {
                const publicId = typeof imageItem === 'string'
                    ? getPublicIdFromCloudinaryUrl(imageItem)
                    : imageItem?.publicId

                if (publicId) {
                    await cloudinary.uploader.destroy(publicId)
                }
            })
        )

        await Product.findByIdAndDelete(id)

        return NextResponse.json({ success: true, message: 'Product deleted successfully' })
    } catch (error) {
        return NextResponse.json({ success: false, message: error.message })
    }
}